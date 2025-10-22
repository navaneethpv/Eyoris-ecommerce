import React from "react";
import Image from "next/image";

interface BannersProps {
  currentBanner: {
    id: string;
    src: string;
    text: {
      h1: string;
    };
  };
  isFading: boolean;
}

const Banners: React.FC<BannersProps> = ({ currentBanner, isFading }) => {
  return (
    <div>
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
    </div>
  );
};

export default Banners;
