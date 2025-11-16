"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  description: string;
  measurements?: string;
  colors?: string[];
  selectedColor?: string;
  images?: string[];
  sku?: string;
  category?: string;
  additionalDetails?: { details: string; packaging: string };
  reviews?: { id: number; author: string; rating: number; comment: string }[];
};

const allProducts: Product[] = [
  {
    id: 13,
    name: "Tray Table",
    price: 199.0,
    originalPrice: 400.0,
    description:
      "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
    measurements: '17 1/2×20 5/8 "',
    colors: ["Black", "Brown", "Red", "White"],
    selectedColor: "Black",
    images: [
      "https://m.media-amazon.com/images/I/71XZMbAheZL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/81VBOV0tQ+L._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/71bhh7D1KZL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/81l+ps0DsZL._AC_UL320_.jpg",
    ],
    sku: "1117",
    category: "Living Room, Bedroom",
    additionalDetails: {
      details:
        "You can use the removable tray for serving. The design makes it easy to put the tray back after use since you place it directly on the table frame without having to fit it into any holes.",
      packaging: 'Width: 20 " Height: 1 ½ " Length: 21 ½ " Weight: 7 lb 8 oz Package(s): 1',
    },
    reviews: [
      { id: 1, author: "John Doe", rating: 5, comment: "Great product, very sturdy and stylish!" },
      { id: 2, author: "Jane Smith", rating: 4, comment: "Good quality, but a bit smaller than expected." },
    ],
  },
];

const StarRow: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span aria-hidden className="text-yellow-400" title={`${fullStars} out of 5`}>
      {"★".repeat(fullStars)}
      <span className="text-gray-300">{"★".repeat(5 - fullStars)}</span>
    </span>
  );
};

/* Sections for component extraction:
 - BreadcrumbsWithBack
 - Gallery
 - ThumbnailCarousel
 - ImageNavButtons
 - ProductHeader
 - PriceBlock
 - ColorSelector
 - QuantitySelector
 - PurchaseActions
 - AdditionalInfo
 - ReviewsList
 - ReviewForm
 - RelatedProducts
 - Shared: StarRow
*/

const ProductPage: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const productId = params.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const foundProduct = allProducts.find((p) => p.id === Number(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImageIndex(0);
      setSelectedColor(foundProduct.selectedColor || foundProduct.colors?.[0] || "");
    }
  }, [productId]);

  if (!product) return <div className="container mx-auto p-6 text-black">Product not found.</div>;

  const incomingCategory = searchParams?.get("category") || undefined;
  const primaryCategory = incomingCategory
    ? incomingCategory.replace(/-/g, " ")
    : product.category
    ? product.category.split(",")[0].trim()
    : "shop";
  const primaryCategorySlug = (incomingCategory || primaryCategory)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const activeImage = product.images?.[activeImageIndex] || product.image || "";

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") setQuantity((prev) => prev + 1);
    else if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddReview = () => {
    if (!comment.trim() || rating === 0) {
      alert("Please provide a rating and a comment.");
      return;
    }
    const newReview = { id: (product.reviews?.length || 0) + 1, author: "Anonymous", rating, comment };
    setProduct((prev) => (prev ? { ...prev, reviews: [...(prev.reviews || []), newReview] } : prev));
    setRating(0);
    setComment("");
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setProduct((prev) => (prev ? { ...prev, selectedColor: color } : prev));
  };

  const prevImage = () => setActiveImageIndex((i) => (product.images && product.images.length ? (i - 1 + product.images.length) % product.images.length : 0));
  const nextImage = () => setActiveImageIndex((i) => (product.images && product.images.length ? (i + 1) % product.images.length : 0));

  const avgRating = product.reviews && product.reviews.length ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen text-black">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          {/* BreadcrumbsWithBack */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Home &gt; <Link href="/shop" className="hover:underline">Shop</Link> &gt;{' '}
              <Link href={`/products/category/${primaryCategorySlug}`} className="text-gray-700 font-medium hover:underline">{primaryCategory}</Link>
              &nbsp;&gt; <span className="font-medium text-gray-700">{product.name}</span>
            </div>
            <div>
              <Link href={`/products/category/${primaryCategorySlug}`} className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:shadow">← Back to {primaryCategory}</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Gallery (Gallery + ThumbnailCarousel + ImageNavButtons) */}
            <div>
              <div className="relative bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative w-full h-[520px] bg-white">
                  {activeImage ? (
                    <Image src={activeImage} alt={product.name} fill style={{ objectFit: 'contain' }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                  )}
                </div>

                <button aria-label="Previous image" onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>

                <button aria-label="Next image" onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* ThumbnailCarousel */}
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {product.images?.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 ${activeImageIndex === idx ? 'border-blue-500' : 'border-transparent'} shadow-sm`} aria-label={`View image ${idx + 1}`}>
                    <div className="relative w-full h-full">
                      <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details (ProductHeader + PriceBlock + ColorSelector + QuantitySelector + PurchaseActions + AdditionalInfo) */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500">SKU: <span className="text-gray-700 font-medium">{product.sku}</span></div>
                  <div className="text-sm text-gray-500 mt-1">Category: <span className="text-gray-700 font-medium">{product.category}</span></div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <StarRow rating={avgRating} />
                  <span className="text-sm text-gray-500">({product.reviews?.length || 0})</span>
                </div>
                {product.originalPrice && <div className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded">Sale</div>}
              </div>

              <p className="text-gray-700 mt-4">{product.description}</p>

              <div className="mt-6 flex items-baseline gap-4">
                <div className="text-2xl font-extrabold text-gray-900">${product.price.toFixed(2)}</div>
                {product.originalPrice && <div className="text-sm line-through text-gray-400">${product.originalPrice.toFixed(2)}</div>}
                {product.originalPrice && <div className="ml-2 text-sm text-green-600 font-medium">Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</div>}
              </div>

              <div className="mt-6">
                {product.measurements && <div className="text-sm text-gray-600">Measurements: {product.measurements}</div>}

                {product.colors && product.colors.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700">Choose Color</div>
                    <div className="flex gap-3 mt-3">
                      {product.colors.map((color, idx) => {
                        const lower = color.toLowerCase();
                        return (
                          <button key={idx} onClick={() => handleColorSelect(color)} aria-pressed={selectedColor === color} className={`flex items-center justify-center w-10 h-10 rounded-md border ${selectedColor === color ? 'ring-2 ring-blue-400 border-transparent' : 'border-gray-200'} focus:outline-none`} title={color}>
                            <span className="w-6 h-6 rounded-sm" style={{ backgroundColor: lower === 'white' ? '#f8f8f8' : lower }} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <button aria-label="Decrease quantity" className="px-4 py-2 text-gray-700" onClick={() => handleQuantityChange('decrement')}>-</button>
                  <div className="px-6 py-2 font-medium">{quantity}</div>
                  <button aria-label="Increase quantity" className="px-4 py-2 text-gray-700" onClick={() => handleQuantityChange('increment')}>+</button>
                </div>

                <button className="px-5 py-3 bg-white border border-gray-200 rounded-md hover:shadow-lg transition" aria-label="Add to wishlist">♡ Wishlist</button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Add to Cart</button>
                <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-900 transition">Buy Now</button>
              </div>

              {/* AdditionalInfo */}
              {product.additionalDetails && (
                <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-100">
                  <h3 className="font-semibold">Additional Info</h3>
                  <p className="text-sm text-gray-700 mt-2"><strong>Details:</strong> {product.additionalDetails.details}</p>
                  <p className="text-sm text-gray-700 mt-1"><strong>Packaging:</strong> {product.additionalDetails.packaging}</p>
                </div>
              )}
            </div>
          </div>

          {/* Reviews (ReviewsList + ReviewForm) */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {product.reviews && product.reviews.length === 0 ? (
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                ) : (
                  product.reviews?.map((review) => (
                    <div key={review.id} className="mb-4 p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="font-semibold">{review.author}</div>
                          <div className="text-sm text-gray-500">•</div>
                          <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
                        </div>
                        <div><StarRow rating={review.rating} /></div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              <div>
                <div className="p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
                  <h3 className="font-semibold mb-3">Leave a Review</h3>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setRating(star)} className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} aria-label={`${star} star`}>★</button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                    <textarea id="comment" rows={4} className="block w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review here..." />
                  </div>

                  <div className="flex gap-2">
                    <button onClick={handleAddReview} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit Review</button>
                    <button onClick={() => { setComment(""); setRating(0); }} className="px-4 py-2 border rounded-md">Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RelatedProducts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <Image src="/images/similar-product1.jpg" alt="Similar Product" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 className="text-sm font-semibold">Loveseat Sofa</h3>
                <p className="text-sm text-gray-500">$199.00 <span className="line-through text-gray-300">$400.00</span></p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <Image src="/images/similar-product2.jpg" alt="Similar Product" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 className="text-sm font-semibold">Table Lamp</h3>
                <p className="text-sm text-gray-500">$24.99</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <Image src="/images/similar-product3.jpg" alt="Similar Product" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 className="text-sm font-semibold">Bamboo basket</h3>
                <p className="text-sm text-gray-500">$24.99</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                <div className="relative w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <Image src="/images/similar-product4.jpg" alt="Similar Product" fill style={{ objectFit: 'cover' }} />
                </div>
                <h3 className="text-sm font-semibold">Toasted</h3>
                <p className="text-sm text-gray-500">$224.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
