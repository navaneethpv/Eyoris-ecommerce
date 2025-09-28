"use client";
import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/data/cartData";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const handleIncreaseQuantity = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleRemoveClick = () => {
    onRemove(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0 w-40 h-40 sm:w-32 sm:h-32 relative mb-4 sm:mb-0 rounded-lg overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-grow sm:ml-6 text-center sm:text-left flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">Color: {item.color}</p>
        <button
          onClick={handleRemoveClick}
          className="text-sm text-red-500 hover:text-red-700 flex items-center justify-center sm:justify-start mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382a1.000 1 0 00-.894-.553H9zM7 7a1 1 0 001 1h.008c.008 0 .008.009.008.01v7a1 1 0 102 0v-7c0-.009 0-.01.008-.01H10a1 1 0 100-2H9.008a1 1 0 00-.008.01z"
              clipRule="evenodd"
            />
          </svg>
          Remove
        </button>
      </div>
      <div className="ml-auto flex flex-col items-center sm:items-end mt-4 sm:mt-0">
        <p className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">₹{(item.price * item.quantity).toFixed(2)}</p>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={handleDecreaseQuantity}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
