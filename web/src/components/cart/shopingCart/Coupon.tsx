"use client";
import React, { useState } from "react";

export default function Coupon() {
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code.");
      setSuccess("");
      return;
    }

    // TODO: Implement actual coupon validation and application logic
    console.log("Applying coupon:", couponCode);
    setSuccess("Coupon applied successfully!");
    setError("");
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Have a coupon?</h3>
      <p className="text-sm text-gray-500 mb-4">Add your code for an instant cart discount</p>
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
        <div className="grow relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
        </div>
        <button
          onClick={handleApplyCoupon}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300 w-full sm:w-auto"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
