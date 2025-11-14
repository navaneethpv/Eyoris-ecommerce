// Imports
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/index';
import { useCart } from '@/context/CartContext';
import mostViewed from '@/hooks/mostViewed';

// Component definition
export default function MostViewed() {
  // State management
  const {addToCart} = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const products = mostViewed();

  // Carousel navigation handlers
  const handleNext = () => {
    if (currentIndex < products.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Add to cart handler
  const handleAddtoCart = (product: Product) => {
    let oldPrice = 0;
    let currentPrice = 0;
    if (product.oldPrice && product.oldPrice !== 'N/A') {
      oldPrice = parseFloat(product.oldPrice);
      if (isNaN(oldPrice)) {
        console.error(`Failed to parse old price for product ${product.name}: ${product.oldPrice}`);
        oldPrice = 0;
      }
    }
    if (product.currentPrice && product.currentPrice !== 'N/A') {
      currentPrice = parseFloat(product.currentPrice);
      if (isNaN(currentPrice)) {
        console.error(`Failed to parse current price for product ${product.name}: ${product.currentPrice}`);
        currentPrice = 0;
      }
    }

      const itemToAdd = {
        id: product.uniq_id,
        name: product.name,
        price: oldPrice,
        discountPrice: currentPrice < oldPrice ? currentPrice : undefined,
        imageUrl: product.image,
        color:'default',
        quantity: 1,
      };
    addToCart(itemToAdd);
    console.log(itemToAdd);
    console.log('added successfully');
  };

  // Render section
  return (
    // Main container
    <section className="container mx-auto py-12 px-4">
      {/* Header section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Most Viewed Products</h2>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Products display area */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
          >
            {/* Product cards */}
            {products.map((product: Product) => (
              <div key={product.uniq_id} className="w-1/5 flex-shrink-0 px-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  {/* Product image */}
                  <div className="relative h-44 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-t-lg"
                    />
                  </div>
                  {/* Product details */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 min-h-[40px]">{product.name}</h3>
                    {/* Rating and reviews */}
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {Array(5).fill(0).map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({String(product.reviews)})</span>
                    </div>
                    {/* Pricing */}
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.currentPrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>
                      {product.discount && <span className="text-sm text-green-600">{product.discount}</span>}
                    </div>
                    {/* Add to cart button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 mt-auto hover:cursor-pointer" onClick={()=>handleAddtoCart(product)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 shadow-md hover:cursor-pointer">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} disabled={currentIndex >= products.length - 5} className="p-2 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 shadow-md hover:cursor-pointer">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
      </div>
    </section>
  );
}
