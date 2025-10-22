"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { banners } from "@/data/banners";
import Indicator from "./Indicator";
import Banners from "./Banners";
import NavigationArrows from "./NavigationArrows";

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
      <Banners currentBanner={currentBanner} isFading={isFading} />
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
      {/* Navigation arrows */}
      <NavigationArrows handlePrev = {handlePrev} handleNext = {handleNext}/>
      {/* Dot indicators */}
      <Indicator
        total={banners.length}
        current={currentBannerIndex}
        onChange={switchBanner}
      />
    </section>
  );
}
