'use client'
import React, { useState } from 'react';
import Image from 'next/image';

export default function BestDeals() {
  const products = [
    {
      id: 1,
      name: 'TRIGGR Trinity 2 with Dual Pairing, ENC, Fast Charge, 5....',
      rating: 4,
      reviews: 1400,
      currentPrice: '₹999',
      oldPrice: '₹2,999',
      image: '/assets/product1.png', // Placeholder image
    },
    {
      id: 2,
      name: 'T800 Digital Watch - For Boys & Girls I22I',
      rating: 3,
      reviews: 900,
      currentPrice: '₹799',
      oldPrice: '₹1,999',
      image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Product2', // Placeholder image
    },
    {
      id: 3,
      name: 'Samsung Galaxy F05 (Twilight Blue, 64 GB) (4 GB RAM)',
      rating: 5,
      reviews: 2000,
      currentPrice: '₹29,999',
      oldPrice: '₹50,000',
      image: 'https://via.placeholder.com/150/008000/FFFFFF?text=Product3', // Placeholder image
    },
    {
      id: 4,
      name: 'Product 4',
      rating: 4,
      reviews: 1200,
      currentPrice: '₹1,299',
      oldPrice: '₹2,499',
      image: 'https://via.placeholder.com/150/FFFF00/000000?text=Product4', // Placeholder image
    },
    {
      id: 5,
      name: 'Product 5',
      rating: 5,
      reviews: 2500,
      currentPrice: '₹499',
      oldPrice: '₹999',
      image: 'https://via.placeholder.com/150/00FFFF/000000?text=Product5', // Placeholder image
    },
    {
      id: 6,
      name: 'Product 6',
      rating: 3,
      reviews: 800,
      currentPrice: '₹899',
      oldPrice: '₹1,799',
      image: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Product6', // Placeholder image
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Today's Best Deal for you</h2>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 5)}%)` }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-1/5 flex-shrink-0 px-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <div className="relative h-44 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 min-h-[40px]">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {Array(5).fill(0).map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-baseline space-x-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">{product.currentPrice}</span>
                      <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 mt-auto">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 shadow-md">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} disabled={currentIndex >= products.length - 5} className="p-2 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 shadow-md">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
      </div>
    </section>
  );
}
