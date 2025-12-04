"use client";
import React, { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from '@/store/useWishlistStore';
import type { CartItem } from '@/store/useCartStore';

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
  const addToCart = useCartStore((s) => s.addToCart); // use zustand store
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const productId = String(product.uniq_id ?? product.name ?? '');
  const hasInWishlist = useWishlistStore((s) => s.has(productId));

  const [imgError, setImgError] = useState(false);
  const imageUrl = getImageUrl(product.image);
  const displayUrl = imgError ? "/next.svg" : imageUrl;

  // ensure Image gets a string src
  const safeSrc = typeof displayUrl === "string" && displayUrl.trim() ? displayUrl.trim() : "/next.svg";

  const parsePrice = (v?: string | number) => {
    if (v == null) return NaN;
    if (typeof v === 'number') return v;
    const cleaned = String(v).replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : NaN;
  };
  const oldPrice = parsePrice(product.oldPrice);
  const currentPrice = parsePrice(product.currentPrice);
  let discountPercentage = 0;
  if (!isNaN(oldPrice) && !isNaN(currentPrice) && oldPrice > 0) {
    discountPercentage = Math.round(
      ((oldPrice - currentPrice) / oldPrice) * 100
    );
  }

  // Handler for adding item to cart
  const handleAddToCart = () => {
    const itemToAdd: Omit<CartItem, 'quantity'> = {
      id: productId,
      name: product.name ?? 'Product',
      price: !isNaN(oldPrice) && oldPrice > 0 ? oldPrice : (!isNaN(currentPrice) ? currentPrice : 0),
      discountPrice: !isNaN(currentPrice) && currentPrice < oldPrice ? currentPrice : undefined,
      imageUrl: safeSrc,
      color: (product as any).color ?? 'default',
    };

    console.log('[ProductCard] Add to cart', itemToAdd);
    addToCart(itemToAdd);
    // debug: log cart items after adding
    setTimeout(() => {
      // read the store items directly for debug
      try {
        const items = (useCartStore as any).getState?.()?.items ?? null;
        console.log('[Cart] items after add', items);
      } catch (e) {
        console.warn('[Cart] could not read store items for debug', e);
      }
    }, 10);
  };

 const wishlistToggleHandler = () => {
    const item = {
      id: productId,
      name: product.name ?? product.name ?? 'Product',
      price: Number(product.currentPrice ?? product.discount ?? product.currentPrice ?? 0) || 0,
      color: (product as any).color ?? 'default',
      image: imageUrl || '/next.svg',
    };
    toggleWishlist(item);
  };
   

  return (
    <div
      key={product.uniq_id}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:cursor-pointer hover:scale-104 duration-150 gap-5"
    >
      <div className="relative h-48">
        {/* Wishlist button */}
        <button
          onClick={(e) => { e.stopPropagation(); wishlistToggleHandler(); }}
          className="absolute top-2 right-2 z-10 bg-white/80 p-1 rounded-full shadow"
          aria-label="Toggle wishlist"
        >
          {hasInWishlist ? (
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
            </svg>
          )}
        </button>

        <img
          src={safeSrc}
          alt={product.name}
          loading="eager"
          crossOrigin="anonymous"
          className="w-full h-full object-contain rounded-t-lg"
          onError={(e) => {
            setImgError(true);
            const target = e.currentTarget as HTMLImageElement;
            if (target.src !== "/next.svg") target.src = "/next.svg";
          }}
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col grow">
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
              onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
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
