// eyoris/server/router/porductRoute.js
const { addProduct, getProducts, getProductById, getBestDeals } = require("../controller/productController");
const express = require("express");
const router = express.Router();

// Add a new product (existing)
router.post("/add", addProduct);

// Best deals
router.get("/best-deals", getBestDeals);

// List with cursor pagination
router.get("/", getProducts);

// Single product by _id or pid
router.get("/:id", getProductById);

module.exports = router;
