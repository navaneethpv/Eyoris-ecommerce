const mongoose = require('mongoose');
const Product = require('../models/productModel');

/**
 * parseImagesField: robustly parse image(s) stored as JSON/CSV/string
 */
function parseImagesField(imageField) {
  if (!imageField) return [];
  if (Array.isArray(imageField)) return imageField.map(String).filter(Boolean);
  const txt = String(imageField).trim();

  // JSON parse arrays
  try {
    const parsed = JSON.parse(txt);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch (e) {}

  // Extract urls
  const urls = Array.from(txt.matchAll(/https?:\/\/[^"'\]\s,}]+/g)).map((m) => m[0]);
  if (urls.length) return urls;

  if (/^https?:\/\//.test(txt)) return [txt];
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
  // Clamp to 0..5 and keep one decimal
  return Number(Math.max(0, Math.min(5, n)).toFixed(1));
}

function normalizeMostViewedDoc(d) {
  const images = parseImagesField(d.image ?? d.images ?? d.gallery ?? d.thumbnail ?? '');
  const thumbnail = images.length ? images[0] : (d.thumbnail ?? null);
  const oldPrice = toNumber(d.retail_price ?? d.original_price ?? d.mrp ?? d.oldPrice ?? d.price);
  const currentPrice = toNumber(d.discounted_price ?? d.discount_price ?? d.currentPrice ?? d.price);
  const discount = oldPrice && currentPrice && oldPrice > 0
    ? `${Math.round(((oldPrice - currentPrice) / oldPrice) * 100)}%`
    : null;

  // parse rating and review count robustly
  const ratingRaw = d.rating ?? d.product_rating ?? d.ratingValue ?? d.average_rating ?? d.ratings_avg ?? d.avg_rating ?? null;
  const rating = parseRating(ratingRaw);
  const reviews = Number(toNumber(d.reviews ?? d.reviewCount ?? d.reviews_count ?? d.review_count ?? d.num_reviews ?? 0)) || 0;

  return {
    _id: d._id?.toString?.() ?? String(d._id),
    uniq_id: d.uniq_id ?? d.pid ?? d._id?.toString?.(),
    name: d.product_name ?? d.name ?? '',
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
    const maxLimit = 200;
    const defaultLimit = Math.min(Math.max(limitQ, 1), 100);

    // support start & end (0-based inclusive):
    const hasStart = typeof req.query.start !== 'undefined';
    const hasEnd = typeof req.query.end !== 'undefined';
    const parsedStart = hasStart ? Math.max(0, parseInt(req.query.start, 10) || 0) : 0;
    const parsedEnd = hasEnd ? parseInt(req.query.end, 10) : undefined;

    let skip = 0;
    let take = defaultLimit;

    if (hasStart) {
      skip = parsedStart;
      if (typeof parsedEnd === 'number' && !Number.isNaN(parsedEnd) && parsedEnd >= parsedStart) {
        take = Math.min(maxLimit, parsedEnd - parsedStart + 1);
      } else {
        take = defaultLimit;
      }
    } else {
      // fallback: use limit
      take = defaultLimit;
    }

    // if take is 0 or invalid, return empty
    if (take <= 0) {
      return res.status(200).json({ products: [] });
    }

    // Build aggregation pipeline
    const pipeline = [
      {
        $addFields: {
          views_num: {
            $toInt: {
              $ifNull: [
                '$views',
                { $ifNull: ['$views_count', { $ifNull: ['$numViews', 0] }] },
              ],
            },
          },
        },
      },
      { $sort: { views_num: -1, rating: -1 } },
    ];

    if (skip > 0) pipeline.push({ $skip: skip });
    pipeline.push({ $limit: take });

    pipeline.push({
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
    });

    const docs = await Product.aggregate(pipeline).allowDiskUse(true).exec();
    const products = docs.map(normalizeMostViewedDoc);
    return res.status(200).json({ products });
  } catch (err) {
    console.error('getMostViewed error:', err);
    return res.status(500).json({ message: 'Error fetching most viewed products', error: String(err.message || err) });
  }
};

module.exports = { getMostViewed };