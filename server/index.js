// ensure env is loaded before any Clerk require
require('dotenv').config();

const productRoute = require("./router/porductRoute");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db_connection");




const app = express();
const port = process.env.PORT || 5000;

// Database
connectDB();

// Middleware
app.use(cors())

app.use(express.json());
// Test route
app.get("/", (req, res) => {
  res.json({ msg: "Backend running…" });
});

// Product Routes (public)
app.use("/product", productRoute);


// Example protected order route
// app.use("/api/orders", orderRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
