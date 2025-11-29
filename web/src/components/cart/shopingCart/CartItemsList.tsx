"use client";
import React from "react";
import { CartItem as CartItemType } from "@/types";
import CartItem from "./CartItem";

interface CartItemsListProps {
  items: CartItemType[];
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItemsList({ items, onQuantityChange, onRemove }: CartItemsListProps) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
