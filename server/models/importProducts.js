// importProducts.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./productModel'); // adjust path if needed

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
const JSON_PATH = process.env.JSON_PATH || path.join(__dirname, 'sample_200_products.json'); //

function normalizeColors(colors) {
  if (!colors) return [];
  if (Array.isArray(colors)) return colors.map(c => String(c).trim()).filter(Boolean);
  if (typeof colors === 'string') {
    return colors.split(/[;,|]/).map(s => s.trim()).filter(Boolean);
  }
  return [];
}

function normalizeImages(item) {
  if (!item) return [];
  const vals = [];

  // common possible fields in JSON sources
  if (item.image) vals.push(item.image);
  if (item.image_url) vals.push(item.image_url);
  if (item.image_urls) vals.push(item.image_urls);
  if (item.images) vals.push(item.images);
  if (item.images_list) vals.push(item.images_list);
  if (item.thumbnails) vals.push(item.thumbnails);
  if (item.thumbnail) vals.push(item.thumbnail);

  const flattened = [];
  vals.forEach(v => {
    if (Array.isArray(v)) {
      flattened.push(...v);
      return;
    }

    if (v && typeof v === 'object') {
      if (v.url) flattened.push(v.url);
      else flattened.push(JSON.stringify(v));
      return;
    }

    if (typeof v === 'string') {
      const s = v.trim();

      // try parsing JSON string like '["url1","url2"]'
      if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) {
            flattened.push(...parsed);
            return;
          } else {
            flattened.push(parsed);
            return;
          }
        } catch (e) {
          // fall through to regex extraction
        }
      }

      // fallback: extract http(s) urls from string
      const urls = s.match(/https?:\/\/[^\s"'\]]+/g);
      if (urls && urls.length) {
        flattened.push(...urls);
      } else {
        // no urls found — keep raw string (will be filtered later)
        flattened.push(s);
      }
      return;
    }

    if (v != null) flattened.push(String(v));
  });

  return flattened
    .map(x => (typeof x === 'object' && x.url) ? x.url : String(x))
    .map(s => s.trim())
    .filter(Boolean);
}

async function main() {
  try {
    console.log('Connecting to MongoDB:', MONGO_URI);
    // <<< simple connect without legacy options >>>
    await mongoose.connect(MONGO_URI);

    console.log('Loading JSON file from:', JSON_PATH);
    const raw = fs.readFileSync(JSON_PATH, 'utf8');
    let items;
    try {
      items = JSON.parse(raw);
      if (!Array.isArray(items)) {
        throw new Error('JSON file must contain an array of objects');
      }
    } catch (err) {
      console.error('Failed to parse JSON:', err.message);
      process.exit(1);
    }

    console.log(`Loaded ${items.length} items. Preparing bulk operations...`);

    const operations = items.map(item => {
      const doc = {
        uniq_id: String(item.uniq_id).trim(),
        product_name: item.product_name || item.title || null,
        brand: item.brand || null,
        product_url: item.product_url || null,
        product_category_tree: Array.isArray(item.product_category_tree)
          ? item.product_category_tree
          : (typeof item.product_category_tree === 'string'
              ? item.product_category_tree.split('>>').map(s => s.trim()).filter(Boolean)
              : []),
        primary_category: item.primary_category || null,
        retail_price: item.retail_price != null ? Number(item.retail_price) : null,
        discounted_price: item.discounted_price != null ? Number(item.discounted_price) : null,
        description: item.description || null,
        product_specifications: Array.isArray(item.product_specifications) ? item.product_specifications : [],
        colors_specified: normalizeColors(item.colors_specified),
        color_primary_specified: item.color_primary_specified || null,
        rating: item.rating != null ? Number(item.rating) : null,
        image: normalizeImages(item)
      };

      return {
        updateOne: {
          filter: { uniq_id: doc.uniq_id },
          update: { $set: doc },
          upsert: true
        }
      };
    });

    const CHUNK_SIZE = 500;
    for (let i = 0; i < operations.length; i += CHUNK_SIZE) {
      const chunk = operations.slice(i, i + CHUNK_SIZE);
      console.log(`Writing chunk ${i / CHUNK_SIZE + 1} (${chunk.length} ops) ...`);
      try {
        const res = await Product.bulkWrite(chunk);
        console.log('Chunk result:', {
          matchedCount: res.matchedCount,
          modifiedCount: res.modifiedCount,
          upsertedCount: res.upsertedCount ?? 0
        });
      } catch (err) {
        console.error('Error during bulkWrite:', err);
      }
    }

    console.log('Import finished. Disconnecting...');
    await mongoose.disconnect();
    console.log('Disconnected. Done.');
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

main();
