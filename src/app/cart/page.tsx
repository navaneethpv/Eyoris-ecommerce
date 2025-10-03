"use client";
import React, { useState } from "react";
import CartPage from "@/components/cart/shopingCart/CartPage";
import CheckoutDetails from "@/components/cart/checkoutDetails/CheckoutDetails";
import OrderComplete from "@/components/cart/completed/OrderComplete";
import { useCart } from "@/context/CartContext"; // Import useCart

export default function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderComplete, setShowOrderComplete] = useState(false);
  const { addToCart } = useCart(); // Use the addToCart function

  // Temporary function to add items for testing
  const addDummyItems = () => {
    addToCart({
      id: "1",
      name: "Earpod",
      price: 100,
      discountPrice: 90,
      imageUrl: "/public/assets/Images/catergories/earpod.png",
      color: "Green",
    });
    addToCart({
      id: "2",
      name: "Speaker",
      price: 200,
      discountPrice: 180,
      imageUrl: "/public/assets/Images/catergories/speaker.png",
      color: "Gold",
    });
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    setShowOrderComplete(true);
    setShowCheckout(false); // Hide checkout details once order is complete
  };

  return (
    <div>
      {showOrderComplete ? (
        <OrderComplete />
      ) : showCheckout ? (
        <CheckoutDetails onOrderComplete={handleOrderComplete} />
      ) : (
        <>
          <CartPage onProceedToCheckout={handleProceedToCheckout} />
          {/* Temporary button to add items for testing */}
          <div className="text-center mt-4">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
              onClick={addDummyItems}
            >
              Add Dummy Items to Cart (for testing)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
