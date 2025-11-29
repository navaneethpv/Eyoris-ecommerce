// Importing the product model
const products = require("../models/newModel");

const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    console.log(productData);

    const newProduct = new products(productData);
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await products.find();
    res.status(200).json({ products: allProducts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};
module.exports = { addProduct, getProducts };
