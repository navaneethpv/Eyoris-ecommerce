import React from "react";
import Image from "next/image";

interface ThumbnailCarouselProps {
    product: {
        name: string;
        images: string[];
    };
    setActiveImageIndex: (index: number) => void;
    activeImageIndex: number;
}

const ThumbnailCarousel:React.FC <ThumbnailCarouselProps> = ({product,setActiveImageIndex,activeImageIndex}) => {
  return (
    <div>
      <div className="mt-4 flex gap-3 overflow-x-auto">
        {product.images?.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 ${
              activeImageIndex === idx
                ? "border-blue-500"
                : "border-transparent"
            } shadow-sm`}
            aria-label={`View image ${idx + 1}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
