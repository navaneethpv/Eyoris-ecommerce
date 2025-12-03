require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db_connection");

const productRoute = require("./router/porductRoute");
const profileRoute = require("./router/profileRoute");


const { clerkMiddleware } = require("@clerk/express");

const app = express();
const port = process.env.PORT || 5000;

// Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Clerk Authentication Middleware — validates Clerk token
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.json({ msg: "Backend running…" });
});

// Product Routes (public)
app.use("/product", productRoute);

// Profile Routes (protected — requires token)
app.use("/api/profile", profileRoute);

// Example protected order route
// app.use("/api/orders", orderRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
