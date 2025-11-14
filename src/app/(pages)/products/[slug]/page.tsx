"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation"; // For App Router

// Define the Product type
type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Optional original price
  color?: string; // Made optional
  image?: string; // Made optional
  description: string;
  measurements?: string;
  colors?: string[];
  selectedColor?: string;
  images?: string[];
  sku?: string;
  category?: string;
  additionalDetails?: {
    details: string;
    packaging: string;
  };
  reviews?: { id: number; author: string; rating: number; comment: string }[];
};


const ProductPage: React.FC = () => {
  const params = useParams();
  const productId = params.slug; // Get the slug (product ID) from the URL

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/products.json");
        const data: Product[] = await response.json();
        const foundProduct = data.find((p) => p.id === Number(productId));
        if (foundProduct) {
          setProduct(foundProduct);
          setActiveImage(foundProduct.images?.[0] || foundProduct.image || "");
        } else {
          setProduct(null); // Product not found
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setProduct(null);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <div className="container mx-auto p-6 text-black">Product not found.</div>;
  }

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddReview = () => {
    // Logic to add review (e.g., send to API, update state)
    console.log("New Review:", { rating, comment });
    // For now, just clear the form
    setComment("");
    setRating(0);
    // In a real application, you would likely add the new review to the product.reviews array
    // setProduct(prevProduct => {
    //   if (!prevProduct) return null;
    //   const newReview = { id: prevProduct.reviews.length + 1, author: "Anonymous", rating, comment };
    //   return { ...prevProduct, reviews: [...(prevProduct.reviews || []), newReview] };
    // });
  };

  return (
    <div className="container mx-auto p-6 text-black">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 mb-4">
        Home &gt; Shop &gt; {product.category} &gt; {product.name}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              objectFit="cover"
              className="object-center"
            />
            {/* Assuming 'NEW' and '-50%' are dynamic based on product data */}
            {/* <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-md">NEW</div>
            <div className="absolute top-12 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-md">-50%</div> */}
            {/* Navigation arrows - placeholder */}
            <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">&gt;</button>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">&gt;</button>
          </div>
          <div className="flex gap-2">
            {product.images?.map((img, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 cursor-pointer border-2 ${activeImage === img ? "border-blue-500" : "border-transparent"} rounded-md overflow-hidden`}
                onClick={() => setActiveImage(img)}
              >
                <Image src={img} alt={`Thumbnail ${index + 1}`} fill objectFit="cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center text-yellow-500 mb-2">
            {"★".repeat(product.reviews?.length ? Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length) : 0)} <span className="text-gray-600 ml-2">{product.reviews?.length || 0} Reviews</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl font-semibold mb-4">
            ${product.price.toFixed(2)}{" "}
            {product.originalPrice && (
              <span className="text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="mb-4">
            {product.measurements && <p className="text-gray-700">Measurements: {product.measurements}</p>}
            {product.colors && product.colors.length > 0 && (
              <>
                <p className="text-gray-700 mt-2">Choose Color &gt;</p>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 border-2 ${product.selectedColor === color ? "border-blue-500" : "border-gray-300"} rounded-md cursor-pointer flex items-center justify-center`}
                      // onClick={() => handleColorSelect(color)} // Implement color selection
                    >
                      <div className="w-8 h-8 rounded-sm" style={{ backgroundColor: color.toLowerCase() }}></div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button className="px-3 py-1" onClick={() => handleQuantityChange("decrement")}>-</button>
              <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
              <button className="px-3 py-1" onClick={() => handleQuantityChange("increment")}>+</button>
            </div>
            <button className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              ♡ Wishlist
            </button>
          </div>

          <button className="w-full py-3 bg-gray-800 text-white rounded-md mb-2 hover:bg-gray-700">
            Add to Cart
          </button>
          <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-900">
            Buy Now
          </button>

          {product.sku && product.category && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="font-semibold mb-2">SKU: <span className="font-normal">{product.sku}</span></h3>
              <h3 className="font-semibold">CATEGORY: <span className="font-normal">{product.category}</span></h3>
            </div>
          )}

          {/* Additional Info Section */}
          {product.additionalDetails && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-lg mb-4">Additional Info</h3>
              <div className="mb-4">
                <h4 className="font-medium">Details</h4>
                <p className="text-gray-700">{product.additionalDetails.details}</p>
              </div>
              <div>
                <h4 className="font-medium">Packaging</h4>
                <p className="text-gray-700">{product.additionalDetails.packaging}</p>
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {product.reviews && product.reviews.length === 0 ? (
              <p>No reviews yet. Be the first to review!</p>
            ) : (
              product.reviews?.map((review) => (
                <div key={review.id} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                    <span className="ml-2 font-semibold">{review.author}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}

            {/* Comment Box */}
            <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Your Rating</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Comment</label>
                <textarea
                  id="comment"
                  rows={4}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your review here..."
                ></textarea>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* You might also like section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">You might also like</h2>
        {/* Placeholder for similar products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Example similar product card */}
          <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image src="/images/similar-product1.jpg" alt="Similar Product" fill objectFit="cover" />
            </div>
            <h3 className="text-lg font-semibold">Loveseat Sofa</h3>
            <p className="text-gray-600">$199.00 <span className="line-through">$400.00</span></p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image src="/images/similar-product2.jpg" alt="Similar Product" fill objectFit="cover" />
            </div>
            <h3 className="text-lg font-semibold">Table Lamp</h3>
            <p className="text-gray-600">$24.99</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image src="/images/similar-product3.jpg" alt="Similar Product" fill objectFit="cover" />
            </div>
            <h3 className="text-lg font-semibold">Bamboo basket</h3>
            <p className="text-gray-600">$24.99</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image src="/images/similar-product4.jpg" alt="Similar Product" fill objectFit="cover" />
            </div>
            <h3 className="text-lg font-semibold">Toasted</h3>
            <p className="text-gray-600">$224.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
