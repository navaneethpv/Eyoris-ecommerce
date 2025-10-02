"use client";
import React from "react";
// import { cartItems as initialCartItems, CartItem as CartItemType } from "@/data/cartData";

interface PriceDetailsProps {
  totalPrice: number;
  discount: number;
  couponDiscount: number;
  platformFee: number;
  finalAmount: number;
}

export default function PriceDetails({ totalPrice, discount, couponDiscount, platformFee, finalAmount }: PriceDetailsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Price (3 item)</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Discount</span>
          <span>- ₹{discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-red-500">
          <span>Coupons for you</span>
          <span>- ₹{couponDiscount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Platform Fee</span>
          <span>₹{platformFee.toFixed(2)}</span>
        </div>
        <hr className="my-3 border-gray-200" />
        <div className="flex justify-between font-bold text-gray-800 text-lg">
          <span>Total Amount</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>
      </div>
      <button className="w-full bg-black text-white py-3 px-4 rounded-lg mt-6 hover:bg-gray-800 transition duration-300">
        Checkout
      </button>
    </div>
  );
}
