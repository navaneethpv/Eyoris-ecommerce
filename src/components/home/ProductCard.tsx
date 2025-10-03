"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext"; // Import useCart hook

// Define ProductCardProps interface
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
  const { addToCart} = useCart(); // Get addToCart and emptyCart from context

  const imageUrl = getImageUrl(product.image);

  const oldPrice = parseFloat(product.oldPrice);
  const currentPrice = parseFloat(product.currentPrice);
  let discountPercentage = 0;
  if (!isNaN(oldPrice) && !isNaN(currentPrice) && oldPrice > 0) {
    discountPercentage = Math.round(
      ((oldPrice - currentPrice) / oldPrice) * 100
    );
  }

  // Handler for adding item to cart, which also clears the cart first as per user request
  const handleAddToCart = () => {
    // emptyCart(); // Clear the cart first
    const itemToAdd = {
      id: product.uniq_id,// Convert uniq_id to a number, as CartItem expects a number for id
      name: product.name,
      price: oldPrice, // Using oldPrice as the original item price
      discountPrice: currentPrice < oldPrice ? currentPrice : undefined, // discounted price if applicable
      imageUrl: imageUrl, // Changed 'image' to 'imageUrl' to match CartItem type
      // Providing a default color as it's required by CartItem, assuming 'color' is not directly available on Product.
      // If 'color' is a critical field, the Product type and CartItem interface might need to be adjusted.
      color: "default",
      quantity: 1, // Initial quantity is 1 when adding from product card
    };
    addToCart(itemToAdd);
  };

  return (
    <div
      key={product.uniq_id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:cursor-pointer hover:scale-104 duration-150 gap-5"
    >
      <div className="relative h-48">
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
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <p className="text-gray-500 text-sm line-through">
              ₹{product.oldPrice}
            </p>
            <p className="text-green-600 font-medium text-sm">
              ₹{product.currentPrice}
            </p>
          </div>
          <div className="mt-auto pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 hover:cursor-pointer"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
