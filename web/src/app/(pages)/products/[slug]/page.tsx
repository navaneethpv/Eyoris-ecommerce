import React from "react";
import { notFound } from "next/navigation";
import BreadcrumbsWithBack from "./components/BreadcrumbsWithBack";
import ProductMediaClient from "./components/ProductMediaClient";
import ProductDetailClient from "./components/ProductDetailClient";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export default async function ProductPage({ params, searchParams }: { params: any; searchParams: any }) {
  const slug = params?.slug ?? "";

  // If no slug, return not found
  if (!slug) return notFound();

  // fetch product from backend
  try {
    const res = await fetch(`${API_BASE}/product/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return notFound();
    const json = await res.json();
    const product = json?.product ?? null;
    if (!product) return notFound();

    const incomingCategory = searchParams?.category ?? undefined;
    const primaryCategory = incomingCategory
      ? incomingCategory.replace(/-/g, " ")
      : product.category
      ? String(product.category).split(",")[0].trim()
      : "shop";

    const primaryCategorySlug = (incomingCategory || primaryCategory)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen text-black">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <BreadcrumbsWithBack
              primaryCategorySlug={primaryCategorySlug}
              primaryCategory={primaryCategory}
              product={product}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <ProductMediaClient product={product} initialIndex={0} />
              </div>

              <div className="p-4 bg-white rounded-lg">
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <div className="mb-4">
                  <div className="text-xl font-semibold">
                    ₹{product.currentPrice ?? product.oldPrice ?? 0}
                  </div>
                  {product.discount && (
                    <div className="text-sm text-green-600">{product.discount}</div>
                  )}
                  {product.brand && (
                    <div className="text-sm text-gray-500">
                      Brand: {product.brand}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <strong>Description</strong>
                  <p className="mt-2 text-gray-700">
                    {product.description ?? "No description"}
                  </p>
                </div>

                <ProductDetailClient product={product} />
              </div>
            </div>

            <Reviews product={product} />

            <RelatedProducts />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Error fetching product", err);
    return notFound();
  }
}
