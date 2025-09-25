"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const getImageUrl = (imageString: string) => {
  if (!imageString) return "/next.svg";
  const imageUrls = imageString
    .replace(/^\[|\]/g, "")
    .split(",")
    .map((url) => url.trim().replace(/^"|"$/g, ""));
  return imageUrls.length > 0 ? imageUrls[0] : "/next.svg";
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getImageUrl(product.image);

  const oldPrice = parseFloat(product.oldPrice);
  const currentPrice = parseFloat(product.currentPrice);
  let discountPercentage = 0;
  if (!isNaN(oldPrice) && !isNaN(currentPrice) && oldPrice > 0) {
    discountPercentage = Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  }

  return (
    <div
      key={product.uniq_id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:cursor-pointer hover:scale-104 duration-150 gap-5"
    >
      <div className="relative h-47">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          objectFit="contain"
          className="rounded-t-lg"
          onError={(e) => ((e.target as HTMLImageElement).src = "/next.svg")}
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <p className="text-gray-500 text-sm line-through">
            ₹{product.oldPrice}
          </p>
          <p className="text-green-600 font-medium text-sm">
            ₹{product.currentPrice}
          </p>
        </div>
        <div className="mt-auto pt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
