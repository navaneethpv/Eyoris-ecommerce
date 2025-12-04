// eyoris/server/controller/productController.js
const mongoose = require('mongoose');
const Product = require('../models/productModel');

/* ----------------- helpers ----------------- */

// parse images helper (same approach used elsewhere)
function parseImagesField(imageField) {
  if (!imageField) return [];
  if (Array.isArray(imageField)) return imageField.map(String).filter(Boolean);

  const txt = String(imageField).trim();
  try {
    const parsed = JSON.parse(txt);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch (e) {}

  const urls = Array.from(txt.matchAll(/https?:\/\/[^"' \]\s,}]+/g)).map((m) => m[0]);
  if (urls.length) return urls;
  if (/^https?:\/\//i.test(txt)) return [txt];
  return [];
}

function toNumber(val) {
  if (val == null) return null;
  const n = Number(String(val).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function parseRating(val) {
  if (val == null) return null;
  const n = Number(String(val).replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(n)) return null;
  return Number(Math.max(0, Math.min(5, n)).toFixed(1));
}

function extractVariantOptions(doc) {
  const colors = new Set();
  const sizes = new Set();

  const addColor = (v) => {
    if (!v) return;
    if (Array.isArray(v)) v.forEach(addColor);
    else colors.add(String(v).trim());
  };
  const addSize = (v) => {
    if (!v) return;
    if (Array.isArray(v)) v.forEach(addSize);
    else sizes.add(String(v).trim());
  };

  const gather = (obj) => {
    if (!obj) return;
    if (Array.isArray(obj)) {
      for (const item of obj) gather(item);
      return;
    }
    if (typeof obj === 'object') {
      for (const k of Object.keys(obj)) {
        const key = String(k).toLowerCase();
        const v = obj[k];
        if (key.includes('color')) addColor(v);
        else if (key.includes('size')) addSize(v);
        else gather(v);
      }
      return;
    }
    if (typeof obj === 'string') {
      if (/^#?[0-9A-F]{3,6}$/i.test(obj) || obj.toLowerCase().match(/\b(black|white|red|blue|green|yellow|pink|gray|brown|orange|purple)\b/)) {
        addColor(obj.trim());
      } else if (obj.match(/\b(S|M|L|XL|XXL|XS|XXS|\d+(?:cm|mm|in)?)\b/i)) {
        addSize(obj.trim());
      }
    }
  };

  gather(doc.colors || doc.color || doc.available_colors || doc.availableColors);
  gather(doc.variants || doc.skus || doc.product_variants || doc.options || doc.attributes || doc.product_options);
  const variantsArr = Array.isArray(doc.variants) ? doc.variants : (Array.isArray(doc.skus) ? doc.skus : []);
  for (const v of variantsArr) gather(v);

  return { colors: Array.from(colors), sizes: Array.from(sizes) };
}

function normalizeProductDoc(d) {
  const images = parseImagesField(d.image ?? d.images ?? d.gallery ?? d.thumbnail ?? '');
  const thumbnail = images.length ? images[0] : (d.thumbnail ?? null);
  const oldPrice = toNumber(d.retail_price ?? d.original_price ?? d.mrp ?? d.oldPrice ?? d.price);
  const currentPrice = toNumber(d.discounted_price ?? d.discount_price ?? d.currentPrice ?? d.price);
  const discount = oldPrice && currentPrice && oldPrice > 0
    ? `${Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%`
    : null;
  const rating = parseRating(d.rating ?? d.product_rating ?? d.ratingValue ?? d.average_rating ?? null);
  const reviews = Number(toNumber(d.reviews ?? d.reviewCount ?? d.reviews_count ?? d.review_count ?? d.num_reviews ?? 0)) || 0;
  const { colors, sizes } = extractVariantOptions(d);

  return {
    _id: d._id?.toString?.() ?? String(d._id),
    pid: d.pid ?? null,
    uniq_id: d.uniq_id ?? d.pid ?? d._id?.toString?.(),
    name: d.product_name ?? d.name ?? '',
    description: d.description ?? d.long_description ?? d.short_description ?? null,
    images,
    thumbnail,
    oldPrice,
    currentPrice,
    discount,
    rating,
    reviews,
    brand: d.brand ?? null,
    colors,
    sizes,
    raw: d,
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
    const id = String(req.params.id || '');
    const orQuery = [{ pid: id }, { uniq_id: id }];
    if (mongoose.Types.ObjectId.isValid(id)) orQuery.push({ _id: new mongoose.Types.ObjectId(id) });

    const doc = await Product.findOne({ $or: orQuery }).lean();
    if (!doc) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = normalizeProductDoc(doc);
    return res.status(200).json({ product });
  } catch (err) {
    console.error('getProductById error:', err);
    return res.status(500).json({ message: 'Error fetching product', error: String(err.message || err) });
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

// export existing controllers and new one
module.exports = {
  addProduct,
  getProducts,
  getBestDeals,
  getProductById,
  getProductById,
};
