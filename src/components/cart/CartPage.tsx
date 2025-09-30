"use client";
import React, { useState, useEffect } from "react";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";
import PriceDetails from "./PriceDetails";
import Coupon from "./Coupon";
import {CartItem as CartItemType } from "@/data/cartData";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  // Function to handle quantity changes
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to handle item removal
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Recalculate total price and final amount whenever cartItems change
  const calculateTotalPrice = (items: CartItemType[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Placeholder values for discount, coupon, and fee
  // These would typically come from state or context and be updated by Coupon component
  const discount = 2000;
  const couponDiscount = 50;
  const platformFee = 5;

  const totalPrice = calculateTotalPrice(cartItems);
  const finalAmount = totalPrice - discount - couponDiscount + platformFee;

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <CartHeader />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <CartItemsList
              items={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
            <Coupon />
          </div>
          <div className="lg:w-1/3">
            <PriceDetails
              totalPrice={totalPrice}
              discount={discount}
              couponDiscount={couponDiscount}
              platformFee={platformFee}
              finalAmount={finalAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
