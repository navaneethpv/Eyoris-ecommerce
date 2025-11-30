// eyoris/server/migrations/createIndexes.js
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("../models/productModel");

async function run() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/eyoris";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB for index creation");

    // create indexes used by controllers
    await Product.collection.createIndex({ pid: 1 });
    await Product.collection.createIndex({ clean_category: 1 });
    await Product.collection.createIndex({ discounted_price: 1 });
    await Product.collection.createIndex({ retail_price: 1 });
    console.log("Indexes created");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Index creation failed", err);
    process.exit(1);
  }
}

run();
