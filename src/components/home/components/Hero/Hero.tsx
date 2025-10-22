"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { banners } from "@/data/banners";

export default function Hero() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const switchBanner = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentBannerIndex(newIndex);
      setIsFading(false);
    }, 300);
  };

  const handlePrev = () => {
    const newIndex = (currentBannerIndex - 1 + banners.length) % banners.length;
    switchBanner(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentBannerIndex + 1) % banners.length;
    switchBanner(newIndex);
  };

  const currentBanner = banners[currentBannerIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentBannerIndex + 1) % banners.length;
      switchBanner(newIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentBannerIndex]);

  return (
    <section className="relative w-full h-[800px] flex items-center justify-center overflow-hidden hover:cursor-pointer">
      {currentBanner.src.endsWith(".mp4") ? (
        <video
          src={currentBanner.src}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        />
      ) : (
        <Image
          src={currentBanner.src}
          alt={currentBanner.text.h1}
          layout="fill"
          objectFit="contain"
          quality={100}
          className={`z-0 transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
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
