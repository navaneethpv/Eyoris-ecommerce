"use client";
import React from "react";

export default function CartHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Cart</h1>
      <div className="flex items-center justify-center space-x-20 mt-3">
        {/* Step 1: Shopping cart */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg mb-1">
            1
          </div>
          <span className="text-sm font-semibold text-blue-500">Shopping cart</span>
        </div>

        {/* Step 2: Checkout details */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-1">
            2
          </div>
          <span className="text-sm text-gray-600">Checkout details</span>
        </div>

        {/* Step 3: Order complete */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-lg mb-1">
            3
          </div>
          <span className="text-sm text-gray-600">Order complete</span>
        </div>
      </div>
    </div>
  );
}
