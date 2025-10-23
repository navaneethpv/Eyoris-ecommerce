"use client";
import React, { useState } from "react";
import CartPage from "@/components/cart/shopingCart/CartPage";
import CheckoutDetails from "@/components/cart/checkoutDetails/CheckoutDetails";
import OrderComplete from "@/components/cart/completed/page";
import { useCart } from "@/context/CartContext"; // Import useCart

export default function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderComplete, setShowOrderComplete] = useState(false);
  const [orderPaymentMethod, setOrderPaymentMethod] = useState<string>("");
  const { cartItems } = useCart();


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
        </>
      )}
    </div>
  );
}
