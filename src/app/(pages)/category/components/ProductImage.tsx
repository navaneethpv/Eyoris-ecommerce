import React from "react";
import Image from "next/image";// Import the Image component

interface ProductImageProps {
    product: {
        name: string;
        image: string;
    };
}

const ProductImage:React.FC <ProductImageProps> = ({product}) => {
  return (
    <div>
      <div className="relative w-full h-60 overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          objectFit="contain"
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default ProductImage;
