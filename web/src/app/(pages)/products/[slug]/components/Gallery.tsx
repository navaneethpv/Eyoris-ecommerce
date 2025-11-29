import React from "react";
import Image from "next/image";

interface GalleryProps {
    activeImage: string | null;
    product: {
        name: string;
    };
    nextImage: () => void;
    prevImage: () => void;
    }

const Gallery:React.FC <GalleryProps> = ({activeImage,product,nextImage,prevImage}) => {
  return (
    <div>
      {" "}
      <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="relative w-full h-[520px] bg-white">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <button
          aria-label="Previous image"
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
          aria-label="Next image"
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Gallery;
