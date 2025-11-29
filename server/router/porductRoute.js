const {addProduct,getProducts} = require("../controller/productController");
const express = require("express");
const router = express.Router();

// Route to add a new product
router.post("/add", addProduct);
router.get("/", getProducts);
module.exports = router;