const mongoose = require("mongoose");
const Product = require("../models/productModel");

/**
 * parseImagesField: same robust parsing used in productController
 */
function parseImagesField(imageField) {
  if (!imageField) return [];
  if (Array.isArray(imageField)) return imageField.map(String).filter(Boolean);

  const txt = String(imageField).trim();

  // try JSON parse
  try {
    const parsed = JSON.parse(txt);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch (e) {}

  // fallback: extract urls
  const urls = Array.from(txt.matchAll(/https?:\/\/[^"'\]\s,}]+/g)).map((m) => m[0]);
  if (urls.length) return urls;

  // final fallback: string itself is a url
  if (/^https?:\/\//.test(txt)) return [txt];

  return [];
}

function toNumber(val) {
  if (val == null) return null;
  const n = Number(String(val).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function normalizeMostViewedDoc(d) {
  const images = parseImagesField(d.image ?? d.images ?? d.gallery ?? d.thumbnail ?? "");
  const thumbnail = images.length ? images[0] : (d.thumbnail ?? null);
  const oldPrice = toNumber(d.retail_price ?? d.original_price ?? d.mrp ?? d.oldPrice ?? d.price);
  const currentPrice = toNumber(d.discounted_price ?? d.discount_price ?? d.currentPrice ?? d.price);
  const discount =
    oldPrice && currentPrice && oldPrice > 0 ? `${Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%` : null;
  const rating = d.rating ?? d.product_rating ?? null;
  const reviews = d.reviews ?? d.reviewCount ?? d.reviews_count ?? 0;

  return {
    _id: d._id?.toString?.() ?? String(d._id),
    uniq_id: d.uniq_id ?? d.pid ?? d._id?.toString?.(),
    name: d.product_name ?? d.name ?? "",
    image: thumbnail,
    oldPrice,
    currentPrice,
    discount,
    rating,
    reviews,
    brand: d.brand ?? null,
    pid: d.pid ?? null,
    raw: d,
  };
}

const getMostViewed = async (req, res) => {
  try {
    const limitQ = parseInt(req.query.limit, 10) || 12;
    const limit = Math.min(Math.max(limitQ, 1), 100);

    // choose common view fields and sort by them
    const pipeline = [
      {
        $addFields: {
          views_num: {
            $toInt: {
              $ifNull: ["$views", { $ifNull: ["$views_count", { $ifNull: ["$numViews", 0] }] }],
            },
          },
        },
      },
      { $sort: { views_num: -1, rating: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          pid: 1,
          uniq_id: 1,
          product_name: 1,
          name: 1,
          image: 1,
          images: 1,
          gallery: 1,
          thumbnail: 1,
          retail_price: 1,
          discounted_price: 1,
          oldPrice: 1,
          currentPrice: 1,
          rating: 1,
          reviews: 1,
          brand: 1,
          clean_category: 1,
          views_num: 1,
        },
      },
    ];

    const docs = await Product.aggregate(pipeline).allowDiskUse(true).exec();
    const products = docs.map(normalizeMostViewedDoc);
    res.status(200).json({ products });
  } catch (err) {
    console.error("getMostViewed error:", err);
    res.status(500).json({ message: "Error fetching most viewed products", error: err.message });
  }
};

module.exports = { getMostViewed };