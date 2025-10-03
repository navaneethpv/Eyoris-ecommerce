"use client";
import React, { useState } from "react";
import CartPage from "@/components/cart/shopingCart/CartPage";
import CheckoutDetails from "@/components/cart/checkoutDetails/CheckoutDetails";

export default function Cart() {
  const [showCheckout, setShowCheckout] = useState(false); // State to manage showing checkout details

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <div>
      {showCheckout ? (
        <CheckoutDetails />
      ) : (
        <CartPage onProceedToCheckout={handleProceedToCheckout} />
      )}
    </div>
  );
}
