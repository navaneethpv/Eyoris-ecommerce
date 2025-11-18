"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import BreadcrumbsWithBack from "./components/BreadcrumbsWithBack";
import Gallery from "./components/Gallery";
import ThumbnailCarousel from "./components/ThumbnailCarousel";
import ProductDetails from "./components/ProductDetails";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";

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
  sku: string;
  category: string;
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
      packaging:
        'Width: 20 " Height: 1 ½ " Length: 21 ½ " Weight: 7 lb 8 oz Package(s): 1',
    },
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        comment: "Great product, very sturdy and stylish!",
      },
      {
        id: 2,
        author: "Jane Smith",
        rating: 4,
        comment: "Good quality, but a bit smaller than expected.",
      },
    ],
  },
];

const StarRow: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span
      aria-hidden
      className="text-yellow-400"
      title={`${fullStars} out of 5`}
    >
      {"★".repeat(fullStars)}
      <span className="text-gray-300">{"★".repeat(5 - fullStars)}</span>
    </span>
  );
};
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
      setSelectedColor(
        foundProduct.selectedColor || foundProduct.colors?.[0] || ""
      );
    }
  }, [productId]);

  if (!product)
    return (
      <div className="container mx-auto p-6 text-black">Product not found.</div>
    );

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
    else if (type === "decrement" && quantity > 1)
      setQuantity((prev) => prev - 1);
  };

  const handleAddReview = () => {
    if (!comment.trim() || rating === 0) {
      alert("Please provide a rating and a comment.");
      return;
    }
    const newReview = {
      id: (product.reviews?.length || 0) + 1,
      author: "Anonymous",
      rating,
      comment,
    };
    setProduct((prev) =>
      prev ? { ...prev, reviews: [...(prev.reviews || []), newReview] } : prev
    );
    setRating(0);
    setComment("");
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setProduct((prev) => (prev ? { ...prev, selectedColor: color } : prev));
  };

  const prevImage = () =>
    setActiveImageIndex((i) =>
      product.images && product.images.length
        ? (i - 1 + product.images.length) % product.images.length
        : 0
    );
  const nextImage = () =>
    setActiveImageIndex((i) =>
      product.images && product.images.length
        ? (i + 1) % product.images.length
        : 0
    );

  const avgRating =
    product.reviews && product.reviews.length
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen text-black">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          {/* BreadcrumbsWithBack */}

          <BreadcrumbsWithBack
            primaryCategorySlug={primaryCategorySlug}
            primaryCategory={primaryCategory}
            product={product}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Gallery (Gallery + ThumbnailCarousel + ImageNavButtons) */}
            <div>
              <Gallery
                activeImage={activeImage}
                product={product}
                nextImage={nextImage}
                prevImage={prevImage}
              />

              {/* ThumbnailCarousel */}
              <ThumbnailCarousel
                product={{ name: product.name, images: product.images || [] }}
                setActiveImageIndex={setActiveImageIndex}
                activeImageIndex={activeImageIndex}
              />
            </div>

            {/* Product Details (ProductHeader + PriceBlock + ColorSelector + QuantitySelector + PurchaseActions + AdditionalInfo) */}
            <ProductDetails
              product={product}
              StarRow={StarRow}
              avgRating={avgRating}
              handleColorSelect={handleColorSelect}
              selectedColor={selectedColor}
              handleQuantityChange={handleQuantityChange}
              quantity={quantity}
            />
          </div>

          {/* Reviews (ReviewsList + ReviewForm) */}
          <Reviews
            product={product}
            StarRow={StarRow}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            handleAddReview={handleAddReview}
          />

          {/* RelatedProducts */}
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
