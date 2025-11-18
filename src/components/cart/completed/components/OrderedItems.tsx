"use client";
import React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import type { cartItem } from "@/store/useCartStore";

const OrderedItems: React.FC = () => {
  const cartItems: cartItem[] = useCartStore((s) => s.cartItems);

  return (
    <div>
      <div className="flex justify-center space-x-6 mb-8">
        {cartItems.map((item) => (
          <div key={item.id} className="relative">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={100}
              height={100}
              className="border rounded-lg"
            />
            <span className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs -mt-2 -mr-2">
              {item.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderedItems;