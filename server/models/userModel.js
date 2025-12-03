const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    meta: Object,
    addresses: [
      {
        label: String,
        street: String,
        city: String,
        postcode: String,
        country: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
