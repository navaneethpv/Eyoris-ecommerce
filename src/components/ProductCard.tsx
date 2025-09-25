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

  return (
    <div
      key={product.uniq_id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
    >
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={product.product_name}
          fill
          objectFit="contain"
          className="rounded-t-lg"
          onError={(e) => ((e.target as HTMLImageElement).src = "/next.svg")}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.product_name}
        </h3>
        <p className="text-gray-500 text-sm">
          Retail Price: ₹{product.retail_price}
        </p>
        <p className="text-green-600 font-medium text-sm">
          Discounted Price: ₹{product.discounted_price}
        </p>
        <div className="mt-auto">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
