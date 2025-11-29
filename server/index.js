const express = require("express");
const connectDB = require("./config/db_connection");
const route  = require("./router/porductRoute");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

connectDB()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/product', route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
