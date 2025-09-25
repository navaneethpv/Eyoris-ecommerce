
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 'banner1',
    src: '/assets/bannerImage.png',
    text: {
      p1: 'Looks We Love:',
      h1: 'On Sale',
      p2: 'Your favorite, most loved, most wanted looks are up to',
      p3: '65% Off',
      button: 'Shop now'
    }
  },
  {
    id: 'banner2',
    src: '/assets/bannerImage2.png', // Ensure this image exists in your public/assets directory
    text: {
      p1: 'New Arrivals:',
      h1: 'Summer Collection',
      p2: 'Discover the latest trends and styles, up to',
      p3: '30% Off',
      button: 'Explore now'
    }
  }
];

export default function Hero() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handlePrev = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const currentBanner = banners[currentBannerIndex];

  return (
    <section className="relative w-full h-[600px] bg-[#BDB4AB] flex items-center justify-center overflow-hidden hover:cursor-pointer">
      <Image
        src={currentBanner.src}
        alt={currentBanner.text.h1}
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 outline-none bg-white bg-opacity-50 p-2 rounded-full text-gray-800 hover:bg-opacity-75 transition duration-300 z-30"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-gray-800 hover:bg-opacity-75 transition duration-300 z-30"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  );
}
