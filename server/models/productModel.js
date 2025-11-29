// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    uniq_id: { type: String, required: true, unique: true },
    crawl_timestamp: { type: String },

    product_url: { type: String },
    product_name: { type: String, required: true },

    product_category_tree: { type: [String] }, // since the data is an array

    pid: { type: String },

    retail_price: { type: Number },
    discounted_price: { type: Number },

    image: { type: [String] }, // array of images

    is_FK_Advantage_product: { type: Boolean },

    description: { type: String },

    product_rating: { type: Number },
    overall_rating: { type: Number },

    brand: { type: String },

    product_specifications: { type: mongoose.Schema.Types.Mixed }, // stores any object
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
