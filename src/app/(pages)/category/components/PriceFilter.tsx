import React from "react";

interface PriceFilterProps {
    price: number;
    setPrice: (price: number) => void;
}
const PriceFilter : React.FC <PriceFilterProps>= ({price,setPrice}) => {
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-medium text-sm mb-1">Price</h3>
        <input
          type="range"
          min={0}
          max={3300}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-gray-600 text-sm mt-1">Up to ₹{price}</p>
      </div>
    </div>
  );
};

export default PriceFilter;
