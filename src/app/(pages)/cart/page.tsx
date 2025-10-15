"use client";
import React, { useState } from "react";
import CartPage from "@/components/cart/shopingCart/CartPage";
import CheckoutDetails from "@/components/cart/checkoutDetails/CheckoutDetails";
import OrderComplete from "@/components/cart/completed/OrderComplete";
import { useCart } from "@/context/CartContext"; // Import useCart

export default function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderComplete, setShowOrderComplete] = useState(false);
  const [orderPaymentMethod, setOrderPaymentMethod] = useState<string>("");
  const { cartItems, addToCart } = useCart(); // Use cartItems and addToCart

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



  return (
    <div>
      {showOrderComplete ? (
        <OrderComplete orderData={{
          cartItems: cartItems,
          total: cartItems.reduce((acc, item) => acc + (item.discountPrice ?? item.price) * item.quantity, 0),
          paymentMethod: orderPaymentMethod,
          orderCode: "#0123_45678", // You can generate or fetch this dynamically
          orderDate: new Date().toLocaleDateString(),
        }} />
      ) : showCheckout ? (
        <CheckoutDetails onOrderComplete={(data) => {
          setOrderPaymentMethod(data.paymentMethod);
          setShowOrderComplete(true);
          setShowCheckout(false);
        }} />
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
