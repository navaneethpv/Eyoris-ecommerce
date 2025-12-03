// ensure env is loaded before any Clerk require
require('dotenv').config();

// fail-fast with a clear message if keys are missing
const required = ['CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error('Missing env vars:', missing.join(', '));
  console.error('Set them in server/.env or export them in the shell. See: https://dashboard.clerk.com/api-keys');
  process.exit(1);
}

console.log('CLERK_SECRET_KEY present?', !!process.env.CLERK_SECRET_KEY);
console.log('CLERK_PUBLISHABLE_KEY present?', !!process.env.CLERK_PUBLISHABLE_KEY);

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
