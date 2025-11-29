require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./productModel'); // adjust path if needed

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
const JSON_PATH = process.env.JSON_PATH || path.join(__dirname, 'flipkart_sample_500_by_category.json');
const CHUNK_SIZE = Number(process.env.CHUNK_SIZE || 500);

// --- Helpers ---------------------------------------------------------------

function normalizeColors(colors) {
  if (!colors) return [];
  if (Array.isArray(colors)) return colors.map(c => String(c).trim()).filter(Boolean);
  if (typeof colors === 'string') {
    // common separators
    return colors
      .split(/[,;|\/\n]/)
      .map(s => s.trim())
      .filter(Boolean);
  }
  // fallback for objects with color-like fields
  if (typeof colors === 'object') {
    const vals = [];
    for (const k of ['color','colors','colour','colours','color_primary']) {
      if (colors[k]) {
        if (Array.isArray(colors[k])) vals.push(...colors[k]);
        else vals.push(String(colors[k]));
      }
    }
    return normalizeColors(vals);
  }
  return [];
}

function normalizeImages(item) {
  if (!item) return [];
  const vals = [];

  // collect candidate fields
  const candidates = [
    'image','image_url','image_urls','images','images_list','thumbnails','thumbnail','photos','photo'
  ];
  for (const key of candidates) {
    if (item[key]) vals.push(item[key]);
  }

  // sometimes the whole object *is* an image or array
  if (typeof item === 'string') vals.push(item);
  if (Array.isArray(item)) vals.push(...item);

  const flattened = [];
  vals.forEach(v => {
    if (v == null) return;

    // arrays
    if (Array.isArray(v)) {
      flattened.push(...v);
      return;
    }

    // plain object that may contain url fields
    if (typeof v === 'object') {
      // common subkeys
      if (v.url) flattened.push(v.url);
      else if (v.src) flattened.push(v.src);
      else if (v.path) flattened.push(v.path);
      else flattened.push(JSON.stringify(v));
      return;
    }

    // string: try parse JSON, then extract urls
    if (typeof v === 'string') {
      const s = v.trim();

      // try parse JSON (e.g., '["url1","url2"]' or '{"url":"..."}')
      if ((s.startsWith('[') && s.endsWith(']')) || (s.startsWith('{') && s.endsWith('}'))) {
        try {
          const parsed = JSON.parse(s);
          if (Array.isArray(parsed)) {
            flattened.push(...parsed);
            return;
          } else if (parsed && typeof parsed === 'object') {
            // pick url/src if available
            if (parsed.url) flattened.push(parsed.url);
            else if (parsed.src) flattened.push(parsed.src);
            else flattened.push(JSON.stringify(parsed));
            return;
          }
        } catch (e) {
          // ignore parse error, fallback to regex
        }
      }

      // extract http(s) urls
      const urls = s.match(/https?:\/\/[^\s"'\\\]\)]+/g);
      if (urls && urls.length) {
        flattened.push(...urls);
      } else {
        // no urls: still keep the string (maybe a single filename)
        flattened.push(s);
      }
      return;
    }

    // fallback
    flattened.push(String(v));
  });

  return Array.from(new Set(
    flattened
      .map(x => (typeof x === 'object' && x.url) ? x.url : String(x))
      .map(s => s.trim())
      .filter(Boolean)
  ));
}

function parseNumericRating(val) {
  if (val == null) return null;
  if (typeof val === 'number') return val;
  const s = String(val);
  const m = s.match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const v = parseFloat(m[1]);
  // clamp reasonable values (0-5)
  if (v <= 0 || v > 5) return null;
  return Math.round(v * 10) / 10; // one decimal
}

function normalizeProductSpecifications(val) {
  if (val == null) return [];
  if (Array.isArray(val)) {
    // Ensure each item in the array has 'key' and 'value'
    return val.map(item => {
      if (typeof item === 'object' && item !== null && item.key != null && item.value != null) {
        return { key: String(item.key), value: String(item.value) };
      }
      // If not in expected format, try to convert it or return a default
      return { key: 'unknown', value: String(item) };
    });
  }
  if (typeof val === 'object') {
    // If it's an object, check if it contains a 'product_specification' key
    if (val.product_specification && Array.isArray(val.product_specification)) {
      return normalizeProductSpecifications(val.product_specification);
    }
    if (val.product_specifications && Array.isArray(val.product_specifications)) {
      return normalizeProductSpecifications(val.product_specifications);
    }
    // If it's an object like { key: "...", value: "..." }, return it in an array
    if (val.key != null && val.value != null) {
      return [{ key: String(val.key), value: String(val.value) }];
    }
    // Fallback for other objects
    return [{ key: 'raw_object', value: JSON.stringify(val) }];
  }

  if (typeof val === 'string') {
    let s = val.trim();
    // Replace Ruby hash rockets "=>" with colons ":"
    s = s.replace(/=>/g, ':');
    // Replace Ruby 'nil' with 'null'
    s = s.replace(/\bnil\b/g, 'null');
    // Attempt to quote unquoted keys (simple heuristic)
    s = s.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');

    try {
      const parsed = JSON.parse(s);
      // Recursively call to handle nested parsing
      return normalizeProductSpecifications(parsed);
    } catch (e) {
      // JSON parsing failed, try to extract array from string
      const match = s.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (match) {
        try {
          const arrayFromString = JSON.parse(match[0].replace(/=>/g, ':').replace(/\bnil\b/g, 'null').replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":'));
          return normalizeProductSpecifications(arrayFromString);
        } catch (e) {
          // Failed to parse extracted array string
        }
      }
    }
    // If all parsing attempts fail, return an array with the original string as a single spec
    return [{ key: 'raw_string', value: s }];
  }
  return [];
}

// --- Main ------------------------------------------------------------------

async function main() {
  try {
    console.log('Connecting to MongoDB:', MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      // use default options; let mongoose choose best defaults for your version
    });

    console.log('Loading JSON file from:', JSON_PATH);
    const raw = fs.readFileSync(JSON_PATH, 'utf8');
    let items;
    try {
      items = JSON.parse(raw);
      if (!Array.isArray(items)) {
        throw new Error('JSON must be an array of product objects');
      }
    } catch (err) {
      console.error('Failed to parse JSON:', err.message);
      process.exit(1);
    }

    console.log(`Loaded ${items.length} items — preparing bulk operations...`);

    // Pre-calc median rating if dataset has numeric ratings (helps fill missing)
    const parsedRatings = items
      .map(i => parseNumericRating(i.rating ?? i.product_rating ?? i.overall_rating))
      .filter(v => v != null)
      .sort((a,b) => a-b);

    let medianRating = null;
    if (parsedRatings.length) {
      const mid = Math.floor(parsedRatings.length / 2);
      medianRating = parsedRatings.length % 2 === 1
        ? parsedRatings[mid]
        : Math.round(((parsedRatings[mid-1] + parsedRatings[mid]) / 2) * 10) / 10;
      console.log('Median rating computed from input:', medianRating);
    } else {
      medianRating = 4.0; // sensible default
      console.log('No numeric ratings found in input — using default median:', medianRating);
    }

    const operations = items.map((item, index) => {
      // safety for uniq_id
      const uniq = item.uniq_id != null ? String(item.uniq_id).trim() : (item.pid ? String(item.pid) : null);
      const prodSpecs = normalizeProductSpecifications(item.product_specifications);
      const colorsFromField = normalizeColors(item.extracted_color || item.colors_specified || item.color_primary_specified || item.colors || item.colours);
      const ratingParsed = parseNumericRating(item.rating ?? item.product_rating ?? item.overall_rating);
      const finalRating = ratingParsed != null ? ratingParsed : medianRating;

      const doc = {
        uniq_id: uniq,
        product_name: item.product_name || item.title || item.name || null,
        brand: item.brand || null,
        product_url: item.product_url || item.url || null,
        // normalize category to array of levels if it's a string with '>>'
        product_category_tree: Array.isArray(item.product_category_tree)
          ? item.product_category_tree
          : (typeof item.product_category_tree === 'string'
              ? item.product_category_tree.split('>>').map(s => s.trim()).filter(Boolean)
              : (item.category_tree || item.categories || [])),
        primary_category: item.primary_category || (item.product_category_tree && typeof item.product_category_tree === 'string' ? item.product_category_tree.split('>>')[0] : null),
        retail_price: item.retail_price != null ? Number(item.retail_price) : (item.price != null ? Number(item.price) : null),
        discounted_price: item.discounted_price != null ? Number(item.discounted_price) : null,
        description: item.description || item.desc || null,
        product_specifications: prodSpecs, // prodSpecs is already an array
        colors_specified: colorsFromField,
        color_primary_specified: (colorsFromField.length ? colorsFromField[0] : null), // Ensure this is correctly set
        extracted_color: (colorsFromField.length ? colorsFromField.join(', ') : null), // Ensure this is correctly set
        rating: finalRating,
        image: normalizeImages(item)
      };

      // ensure uniq_id exists to prevent upserting many junk docs
      const filter = doc.uniq_id ? { uniq_id: doc.uniq_id } : { product_url: doc.product_url || doc.product_name };

      return {
        updateOne: {
          filter,
          update: { $set: doc },
          upsert: true
        }
      };
    });

    console.log(`Prepared ${operations.length} bulk operations. Writing in chunks of ${CHUNK_SIZE}...`);

    for (let i = 0; i < operations.length; i += CHUNK_SIZE) {
      const chunk = operations.slice(i, i + CHUNK_SIZE);
      console.log(`Writing chunk ${Math.floor(i / CHUNK_SIZE) + 1} (${chunk.length} ops)...`);
      try {
        const res = await Product.bulkWrite(chunk);
        // bulkWrite result shape may vary; print whole object for debugging if needed
        console.log('Chunk write result:', {
          matchedCount: res.matchedCount ?? null,
          modifiedCount: res.modifiedCount ?? null,
          upsertedCount: res.upsertedCount ?? (res.nUpserted ?? null),
          insertedCount: res.insertedCount ?? null,
          ok: res.result ? res.result.ok : (res.ok ?? 'unknown')
        });
      } catch (err) {
        console.error('Error during bulkWrite:', err && err.message ? err.message : err);
      }
    }

    console.log('Import finished. Disconnecting...');
    await mongoose.disconnect();
    console.log('Disconnected. Done.');
  } catch (err) {
    console.error('Fatal error:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
}

main();
