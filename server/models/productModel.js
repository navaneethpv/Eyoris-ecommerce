const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  uniq_id: {
    type: String,
    required: true,
    unique: true
  },

  product_name: {
    type: String,
    required: true
  },

  brand: String,
  product_url: String,

  product_category_tree: [String],   // array of categories
  primary_category: String,

  retail_price: Number,
  discounted_price: Number,

  description: String,

  // simple array of { key, value }
  product_specifications: [{
    key: String,
    value: String
  }],

  // colors
  colors_specified: [String],
  color_primary_specified: String,

  rating: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
