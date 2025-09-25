"use client";
import React, { useState } from "react";
import Image from "next/image";

const banners = [
  {
    id: "banner1",
    src: "/assets/bannerImage1.png",
    text: {
      h1: "On Sale",
    },
  },
  {
    id: "banner2",
    src: "/assets/bannerImage2.png", // Ensure this image exists in your public/assets directory
    text: {
      h1: "Summer Collection",
    },
  },
  {
    id: "banner3",
    src: "/assets/bannerImage3.png", // Ensure this image exists in your public/assets directory
    text: {
      h1: "Offer1",
    },
  },
  {
    id: "banner4",
    src: "/assets/bannerImage5.jpg", // Ensure this image exists in your public/assets directory
    text: {
      h1: "Offer2",
    },
  },
];

export default function Hero() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handlePrev = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  const handleNext = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const currentBanner = banners[currentBannerIndex];

  return (
    <section className="relative w-full h-[800px] bg-[#BDB4AB] flex items-center justify-center overflow-hidden hover:cursor-pointer">
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
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full text-gray-800 hover:bg-opacity-75 transition duration-300 z-30"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
}
