// eyoris/server/controller/productController.js
const mongoose = require("mongoose");
const Product = require("../models/productModel"); // matches your repo

/* ----------------- helpers ----------------- */

/**
 * parseImagesField
 * Accepts:
 *  - actual array
 *  - JSON-string like '["http://..."]'
 *  - plain string that contains one or more URLs
 * Returns array of URLs (may be empty)
 */
function parseImagesField(imageField) {
  if (!imageField) return [];
  if (Array.isArray(imageField)) return imageField.map(String).filter(Boolean);

  const txt = String(imageField).trim();

  // try JSON parse: '["http://...","..."]'
  try {
    const parsed = JSON.parse(txt);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch (e) {
    // ignore parse errors
  }

  // extract URLs with regex as fallback
  const urls = Array.from(txt.matchAll(/https?:\/\/[^"\]\s,}]+/g)).map(m => m[0]);
  if (urls.length) return urls;

  // final fallback: if the string itself looks like a url
  if (/^https?:\/\//.test(txt)) return [txt];

  return [];
}

/**
 * normalizeProductDoc
 * Map DB document fields to lightweight shape for frontend
 */
function normalizeProductDoc(doc) {
  if (!doc) return null;
  const images = parseImagesField(doc.image ?? doc.images ?? doc.gallery ?? "");
  const price = doc.discounted_price ?? doc.discount_price ?? doc.retail_price ?? doc.price ?? null;
  const originalPrice = doc.retail_price ?? doc.original_price ?? doc.mrp ?? null;

  return {
    _id: doc._id?.toString?.() ?? String(doc._id),
    product_name: doc.product_name ?? doc.name ?? "",
    pid: doc.pid ?? null,
    price,
    originalPrice,
    retail_price: doc.retail_price ?? null,
    discounted_price: doc.discounted_price ?? null,
    thumbnail: images.length ? images[0] : (doc.thumbnail ?? null),
    images,
    description: doc.description ?? "",
    brand: doc.brand ?? null,
    clean_category: doc.clean_category ?? doc.product_category_tree ?? null,
    rating: doc.rating ?? doc.product_rating ?? doc.parsed_rating ?? null,
    raw: doc // full raw doc if frontend wants additional fields
  };
}

/* ----------------- controllers ----------------- */

/**
 * POST /product/add
 * Keep your existing add product route compatible
 */
const addProduct = async (req, res) => {
  try {
    const payload = req.body;
    const newProduct = new Product(payload);
    await newProduct.save();
    return res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    console.error("addProduct error:", err);
    return res.status(500).json({ message: "Error adding product", error: err.message });
  }
};

/**
 * GET /product?limit=50&after=<lastId>
 * Cursor-based pagination using _id (safe for large collections)
 */
const getProducts = async (req, res) => {
  try {
    const limitQ = parseInt(req.query.limit, 10) || 50;
    const limit = Math.min(Math.max(limitQ, 1), 200); // allow up to 200, default 50

    const after = req.query.after;
    const q = (req.query.q || "").toString().trim();

    const query = {};

    // cursor pagination
    if (after && mongoose.Types.ObjectId.isValid(after)) {
      query._id = { $gt: mongoose.Types.ObjectId(after) };
    }

    // optional simple search by q (product_name, brand, category, description)
    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      query.$or = [
        { product_name: { $regex: regex } },
        { brand: { $regex: regex } },
        { clean_category: { $regex: regex } },
        { description: { $regex: regex } }
      ];
    }

    const docs = await Product
      .find(query)
      .sort({ _id: 1 })
      .limit(limit)
      .select("product_name discounted_price retail_price image pid clean_category brand description")
      .lean()
      .exec();

    const products = docs.map(normalizeProductDoc);
    const lastId = products.length ? products[products.length - 1]._id : null;

    res.status(200).json({ products, lastId });

  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};

/**
 * GET /product/:id
 * Lookup by Mongo _id or fallback to pid (your Flipkart pid)
 */
const getProductById = async (req, res) => {
  try {
    const idOrPid = req.params.id;
    let doc = null;

    // try _id first
    if (mongoose.Types.ObjectId.isValid(idOrPid)) {
      doc = await Product.findById(idOrPid).lean();
    }

    // fallback to pid
    if (!doc) {
      doc = await Product.findOne({ pid: idOrPid }).lean();
    }

    if (!doc) {
      return res.status(404).json({ message: "Product not found" });
    }

    const normalized = normalizeProductDoc(doc);
    return res.status(200).json({ product: normalized });
  } catch (err) {
    console.error("getProductById error:", err);
    return res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

/**
 * GET /product/best-deals?limit=12
 * Aggregation: compute discount percent and return top deals
 */
const getBestDeals = async (req, res) => {
  try {
    const limitQ = parseInt(req.query.limit, 10) || 12;
    const limit = Math.min(Math.max(limitQ, 1), 50);

    const pipeline = [
      {
        $addFields: {
          retail_price_num: { $toDouble: "$retail_price" },
          discounted_price_num: { $toDouble: "$discounted_price" }
        }
      },
      {
        $match: {
          retail_price_num: { $gt: 0 },
          discounted_price_num: { $gt: 0 },
          $expr: { $lt: ["$discounted_price_num", "$retail_price_num"] }
        }
      },
      {
        $addFields: {
          discountAmount: { $subtract: ["$retail_price_num", "$discounted_price_num"] },
          discountPercent: {
            $multiply: [
              { $divide: [{ $subtract: ["$retail_price_num", "$discounted_price_num"] }, "$retail_price_num"] },
              100
            ]
          }
        }
      },
      { $sort: { discountPercent: -1, discounted_price_num: 1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          pid: 1,
          product_name: 1,
          retail_price: 1,
          discounted_price: 1,
          image: 1,
          clean_category: 1,
          brand: 1,
          discountPercent: 1,
          discountAmount: 1
        }
      }
    ];

    const docs = await Product.aggregate(pipeline).allowDiskUse(true).exec();

    const deals = docs.map(d => {
      const images = parseImagesField(d.image);
      return {
        _id: d._id.toString(),
        pid: d.pid ?? null,
        product_name: d.product_name ?? "",
        retail_price: d.retail_price ?? null,
        discounted_price: d.discounted_price ?? null,
        thumbnail: images.length ? images[0] : null,
        images,
        clean_category: d.clean_category ?? null,
        brand: d.brand ?? null,
        discountPercent: Math.round((d.discountPercent ?? 0) * 100) / 100,
        discountAmount: d.discountAmount ?? null
      };
    });

    return res.status(200).json({ deals });
  } catch (err) {
    console.error("getBestDeals error:", err);
    return res.status(500).json({ message: "Error fetching best deals", error: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  getBestDeals
};
