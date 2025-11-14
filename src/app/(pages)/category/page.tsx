'use client';
import React from "react";
import Image from "next/image"; // Import the Image component
import PriceFilter from "./components/PriceFilter";
import ColourFilter from "./components/ColourFilter";
type Product = {
  id: number;
  name: string;
  price: number;
  color: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Status Contract Anti Slip Front Door Mat|(38x58cm) Living Room Rug for....",
    price: 1299,
    color: "Blue",
    image: "https://m.media-amazon.com/images/I/81rubH-VPtL._AC_UL320_.jpg",
  },
  {
    id: 2,
    name: "Cortina Premium Silicon Floor Mat, Bath Mat, Doormat, Bathroom...",
    price: 1899,
    color: "Blue",
    image: "https://m.media-amazon.com/images/I/61AnrlMQpSL._AC_UL320_.jpg",
  },
  {
    id: 3,
    name: "Lifelong LLYM92 Yoga mat for Women & Men EVA Material 4mm...",
    price: 1599,
    color: "Black",
    image: "https://m.media-amazon.com/images/I/612K2lgbyIL._AC_UL320_.jpg",
  },
  {
    id: 4,
    name: "VERVENIX 2 Pcs Kitchen Mats Set – Waterproof Memory Foam Anti-..",
    price: 1799,
    color: "Beige",
    image: "https://m.media-amazon.com/images/I/51eG2i8WIdL._AC_UL320_.jpg",
  },
  {
    id: 5,
    name: "VERVENIX Doormat (Pack of 2) Quick-Dry Anti-Slip Bathroom Mat | Non-Slip Home Print Bathroom Mat | Water-Absorbing Rubber Doormat, for ...",
    price: 2499,
    color: "Olive",
    image: "https://m.media-amazon.com/images/I/51A0sU7cCYL._AC_UL320_.jpg",
  },
  {
    id: 6,
    name: "Purav Light 35mm Artificial Green Grass Carpet Mat for Balcony| Grass Mat for Floor, Home Decoration| Perfect for Indoor and Outdoor Use| Entrace ..",
    price: 999,
    color: "Green",
    image: "https://m.media-amazon.com/images/I/71XZMbAheZL._AC_UL320_.jpg",
  },
  {
    id: 7,
    name: "SARAL HOME EASY LIVING Microfiber Soft Anti Slip Rectangular Door Mat|Bath Mat Set of 2 (Grey, 35X50 CM) ",
    price: 1499,
    color: "Grey",
    image: "https://m.media-amazon.com/images/I/81VBOV0tQ+L._AC_UL320_.jpg",
  },
  {
    id: 8,
    name: "Roseate Flower Super Soft (40x60 cm) Microfiber 2000 GSM Bath Mat",
    price: 3299,
    color: "Navy",
    image: "https://m.media-amazon.com/images/I/71bhh7D1KZL._AC_UL320_.jpg",
  },
  {
    id: 9,
    name: "JAYTOP Kitchen Mats for Floor Anti Slip, 2 Pcs Kitchen Mats, Waterproof",
    price: 799,
    color: "Brown",
    image: "https://m.media-amazon.com/images/I/81l+ps0DsZL._AC_UL320_.jpg",
  },
  {
    id: 10,
    name: "Saral Home Solid & Striped Microfiber Anti-Skid Bath Mats (Brown,35X50 cm, Set of 2) ",
    price: 1199,
    color: "Yellow",
    image: "https://m.media-amazon.com/images/I/81BGLJI8OCL._AC_UL320_.jpg",
  },
  {
    id: 11,
    name: "Roseate Flower Super Soft (40x60 cm) Microfiber 2000 GSM Bath Mat",
    price: 3299,
    color: "Navy",
    image: "https://m.media-amazon.com/images/I/71amrUS1MWL._AC_UL320_.jpg",
  },
  {
    id: 12,
    name: "JAYTOP Kitchen Mats for Floor Anti Slip, 2 Pcs Kitchen Mats, Waterproof",
    price: 799,
    color: "Brown",
    image: "https://m.media-amazon.com/images/I/71O+xX3UL6L._AC_UL320_.jpg",
  },
];

const Category: React.FC = () => {
  const [price, setPrice] = React.useState(3300);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const filteredProducts = products.filter(product =>
    product.price <= price &&
    (selectedColors.length === 0 || selectedColors.includes(product.color.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex p-6 gap-6 items-start text-black">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-3 text-lg">Filters</h2>

        {/* Price Filter */}
        <PriceFilter price={price} setPrice={setPrice} />

        {/* Colour Filter */}
        <ColourFilter toggleColor={toggleColor} selectedColors = {selectedColors}/>
      </aside>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-60 overflow-hidden rounded-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                objectFit="contain"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
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

              {/* Button */}
              <button className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
