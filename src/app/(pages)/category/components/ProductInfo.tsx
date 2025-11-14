import React from "react";

interface ProductProps {
  product: {
    name: string;
    price: number;
    color: string;
  };
}

const ProductInfo: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="flex flex-col justify-between h-full"> {/* Added h-full and justify-between */}
      <div className="mt-4">
        <h2 className="text-sm font-light">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1">
          ₹{product.price.toLocaleString()}
        </p>

        {/* Color Indicator */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: product.color.toLowerCase() }}
          ></div>
          <span className="text-sm text-gray-700">{product.color}</span>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition hover:cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
