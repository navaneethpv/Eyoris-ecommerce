"use client";
import React from "react";
import CartHeader from "./Header"; // Corrected import path
import CartItemsList from "./CartItemsList";
import PriceDetails from "./PriceDetails";
import Coupon from "./Coupon";
import { useCartStore } from "@/store/useCartStore";

interface CartPageProps {
  onProceedToCheckout: () => void;
}

export default function CartPage({ onProceedToCheckout }: CartPageProps) {
  const { cartItems, updateQuantity, removeFromCart } = useCartStore();

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
        <CartHeader activeStep="cart" />
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <p className="text-md text-gray-500 mt-2">Please add some products to proceed.</p>
            {/* Optionally, add a button to navigate to shop page */}
            {/* <Link href="/shop">
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md">
                Go to Shop
              </button>
            </Link> */}
          </div>
        ) : (
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
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold mt-4"
                onClick={onProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
