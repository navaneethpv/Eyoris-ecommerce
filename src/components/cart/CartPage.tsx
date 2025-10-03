"use client";
import React from "react";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";
import PriceDetails from "./PriceDetails";
import Coupon from "./Coupon";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Function to handle quantity changes
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const currentItem = cartItems.find(item => item.id === itemId);
    if (!currentItem) return;
    const diff = newQuantity - currentItem.quantity;
    updateQuantity(itemId, diff);
  };

  // Function to handle item removal
  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  // Recalculate total price and final amount whenever cartItems change
  const calculateTotalPrice = (items: typeof cartItems) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscountPrice = (items: typeof cartItems) => {
    return items.reduce((total, item) => total + (item.price - (item.discountPrice || item.price)) * item.quantity, 0);
  };

  // Set couponDiscount and platformFee to 0 if no products in cart
  const couponDiscount = cartItems.length > 0 ? 50 : 0;
  const platformFee = cartItems.length > 0 ? 5 : 0;

  const totalPrice = calculateTotalPrice(cartItems);
  const discount = calculateDiscountPrice(cartItems);
  const finalAmountRaw = totalPrice - discount - couponDiscount + platformFee;
  const finalAmount = isNaN(finalAmountRaw) ? 0 : finalAmountRaw;

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
