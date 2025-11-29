"use client";
import React from "react";
import Image from "next/image";

const RelatedProducts: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
            <Image src="/assets/Images/product1.png" alt="Loveseat Sofa" fill style={{ objectFit: "cover" }} />
          </div>
          <h3 className="text-sm font-semibold">Loveseat Sofa</h3>
          <p className="text-sm text-gray-500">$199.00 <span className="line-through text-gray-300">$400.00</span></p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
            <Image src="/assets/Images/product1.png" alt="Table Lamp" fill style={{ objectFit: "cover" }} />
          </div>
          <h3 className="text-sm font-semibold">Table Lamp</h3>
          <p className="text-sm text-gray-500">$24.99</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
            <Image src="/assets/Images/product1.png" alt="Bamboo basket" fill style={{ objectFit: "cover" }} />
          </div>
          <h3 className="text-sm font-semibold">Bamboo basket</h3>
          <p className="text-sm text-gray-500">$24.99</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
          <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
            <Image src="/assets/Images/product1.png" alt="Toasted" fill style={{ objectFit: "cover" }} />
          </div>
          <h3 className="text-sm font-semibold">Toasted</h3>
          <p className="text-sm text-gray-500">$224.99</p>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
