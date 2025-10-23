'use client';
import React from "react";
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
    name: "Classic Cotton Shirt",
    price: 1299,
    color: "White",
    image: "https://images.unsplash.com/photo-1520975922131-6ce46ef61ca3",
  },
  {
    id: 2,
    name: "Slim Fit Denim",
    price: 1899,
    color: "Blue",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
  },
  {
    id: 3,
    name: "Black Hoodie",
    price: 1599,
    color: "Black",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295",
  },
  {
    id: 4,
    name: "Beige Chinos",
    price: 1799,
    color: "Beige",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800b59",
  },
  {
    id: 5,
    name: "Olive Green Jacket",
    price: 2499,
    color: "Olive",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ef3",
  },
  {
    id: 6,
    name: "Red T-Shirt",
    price: 999,
    color: "Red",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  },
  {
    id: 7,
    name: "Grey Sweatpants",
    price: 1499,
    color: "Grey",
    image: "https://images.unsplash.com/photo-1618354691460-8a873b2b7c7e",
  },
  {
    id: 8,
    name: "Navy Blue Blazer",
    price: 3299,
    color: "Navy",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
  },
  {
    id: 9,
    name: "Brown Leather Belt",
    price: 799,
    color: "Brown",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    id: 10,
    name: "Yellow Polo Shirt",
    price: 1199,
    color: "Yellow",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
  {
    id: 11,
    name: "White Sneakers",
    price: 2199,
    color: "White",
    image: "https://images.unsplash.com/photo-1552346154-21d32818f23c",
  },
  {
    id: 12,
    name: "Blue Jeans",
    price: 1699,
    color: "Blue",
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68",
  },
  {
    id: 13,
    name: "Green T-Shirt",
    price: 899,
    color: "Green",
    image: "https://images.unsplash.com/photo-1576566529027-401779738270",
  },
  {
    id: 14,
    name: "Leather Jacket",
    price: 4999,
    color: "Black",
    image: "https://images.unsplash.com/photo-1594938307030-f8072979227f",
  },
  {
    id: 15,
    name: "Striped Sweater",
    price: 1999,
    color: "Navy",
    image: "https://images.unsplash.com/photo-1542272604-7678a9d45787",
  },
];

const ProductPage: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50 flex p-6 gap-6">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-3 text-lg">Filters</h2>

        {/* Price Filter */}
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

        {/* Colour Filter */}
        <div className="mb-4">
          <h3 className="font-medium text-sm mb-2">Colour</h3>
          <div className="grid grid-cols-5 gap-2">
            {["red", "blue", "green", "gray", "purple", "black", "white", "beige", "olive", "yellow", "navy", "brown"].map((color) => (
              <div
                key={color}
                onClick={() => toggleColor(color)}
                className={`w-6 h-6 rounded-full bg-${color}-500 cursor-pointer border-2 ${
                  selectedColors.includes(color) ? 'border-black' : 'border-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[100vh] overflow-y-auto flex-1">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-60 overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold truncate">{product.name}</h2>
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

export default ProductPage;
