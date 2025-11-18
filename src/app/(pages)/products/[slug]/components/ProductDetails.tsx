import React from "react";

interface ProductDetailsProps {
    product: {
        name: string;
        sku: string;
        category: string;
        description: string;
        price: number;
        originalPrice?: number;
        measurements?: string;
        colors?: string[];
        reviews?: { rating: number }[];
        additionalDetails?: {
            details: string;
            packaging: string;
        };
    };
    StarRow: React.FC<{ rating: number }>;
    avgRating: number;
    handleColorSelect: (color: string) => void;
    selectedColor: string | null;
    handleQuantityChange: (action: "increment" | "decrement") => void;
    quantity: number;
}

const ProductDetails:React.FC <ProductDetailsProps> = ({product,StarRow,avgRating,handleColorSelect,selectedColor,handleQuantityChange,quantity}) => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">
              SKU:{" "}
              <span className="text-gray-700 font-medium">{product.sku}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Category:{" "}
              <span className="text-gray-700 font-medium">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <StarRow rating={avgRating} />
            <span className="text-sm text-gray-500">
              ({product.reviews?.length || 0})
            </span>
          </div>
          {product.originalPrice && (
            <div className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>

        <p className="text-gray-700 mt-4">{product.description}</p>

        <div className="mt-6 flex items-baseline gap-4">
          <div className="text-2xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </div>
          {product.originalPrice && (
            <div className="text-sm line-through text-gray-400">
              ${product.originalPrice.toFixed(2)}
            </div>
          )}
          {product.originalPrice && (
            <div className="ml-2 text-sm text-green-600 font-medium">
              Save{" "}
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              %
            </div>
          )}
        </div>

        <div className="mt-6">
          {product.measurements && (
            <div className="text-sm text-gray-600">
              Measurements: {product.measurements}
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700">
                Choose Color
              </div>
              <div className="flex gap-3 mt-3">
                {product.colors.map((color, idx) => {
                  const lower = color.toLowerCase();
                  return (
                    <button
                      key={idx}
                      onClick={() => handleColorSelect(color)}
                      aria-pressed={selectedColor === color}
                      className={`flex items-center justify-center w-10 h-10 rounded-md border ${
                        selectedColor === color
                          ? "ring-2 ring-blue-400 border-transparent"
                          : "border-gray-200"
                      } focus:outline-none`}
                      title={color}
                    >
                      <span
                        className="w-6 h-6 rounded-sm"
                        style={{
                          backgroundColor:
                            lower === "white" ? "#f8f8f8" : lower,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
            <button
              aria-label="Decrease quantity"
              className="px-4 py-2 text-gray-700"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>
            <div className="px-6 py-2 font-medium">{quantity}</div>
            <button
              aria-label="Increase quantity"
              className="px-4 py-2 text-gray-700"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
          </div>

          <button
            className="px-5 py-3 bg-white border border-gray-200 rounded-md hover:shadow-lg transition"
            aria-label="Add to wishlist"
          >
            ♡ Wishlist
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
          <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-900 transition">
            Buy Now
          </button>
        </div>

        {/* AdditionalInfo */}
        {product.additionalDetails && (
          <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-100">
            <h3 className="font-semibold">Additional Info</h3>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Details:</strong> {product.additionalDetails.details}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <strong>Packaging:</strong> {product.additionalDetails.packaging}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
