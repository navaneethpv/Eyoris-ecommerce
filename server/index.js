const express = require("express");
const connectDB = require("./config/db_connection");
const route  = require("./router/porductRoute");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

connectDB()
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/product', route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
