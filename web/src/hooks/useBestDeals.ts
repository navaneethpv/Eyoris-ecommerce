import { useState, useEffect } from "react";
import axios from "axios";
import { Product, SampleProductJson } from "@/types";

type ApiResponse =
  | SampleProductJson[]
  | { data: SampleProductJson[] }
  | { products: SampleProductJson[] }
  | { items: SampleProductJson[] };

function parseFirstImage(imageField: unknown): string | undefined {
  if (!imageField) return undefined;
  // If it's already an array, take first truthy entry
  if (Array.isArray(imageField)) {
    const first = imageField.map(String).find(Boolean);
    if (!first) return undefined;
    // normalize protocol-less or relative
    if (first.startsWith('//')) return `https:${first}`;
    if (first.startsWith('/')) return typeof window !== 'undefined' ? `${window.location.origin}${first}` : first;
    return first;
  }

  if (typeof imageField === 'string') {
    const s = imageField.trim();

    // Try JSON parse for stringified array or string
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) {
        const first = parsed.map(String).find(Boolean);
        if (!first) return undefined;
        if (first.startsWith('//')) return `https:${first}`;
        if (first.startsWith('/')) return typeof window !== 'undefined' ? `${window.location.origin}${first}` : first;
        return first;
      }
      if (typeof parsed === 'string' && parsed.trim()) {
        if (parsed.startsWith('//')) return `https:${parsed}`;
        if (parsed.startsWith('/')) return typeof window !== 'undefined' ? `${window.location.origin}${parsed}` : parsed;
        return parsed;
      }
    } catch {
      // not JSON, continue
    }

    // handle simple comma-separated lists like 'url1,url2'
    const cleaned = s.replace(/^\[|\]$/g, '').replace(/^"|"$/g, '');
    const parts = cleaned.split(',').map(p => p.trim().replace(/^"|"$/g, '')).filter(Boolean);
    const first = parts[0] ?? cleaned;
    if (!first) return undefined;
    if (first.startsWith('//')) return `https:${first}`;
    if (first.startsWith('/')) return typeof window !== 'undefined' ? `${window.location.origin}${first}` : first;
    return first;
  }

  return undefined;
}

export function useBestDeals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get<ApiResponse>("http://localhost:4000/product/best-deals?limit=12");


        const raw = response.data;
        console.log("Raw response data for products:", raw);

        // Resolve actual array from possible wrappers
        let data: SampleProductJson[] = [];

        // Treat raw as unknown and narrow safely to an object we can index
        const rawUnknown: unknown = raw;
        if (Array.isArray(rawUnknown)) {
          data = rawUnknown as SampleProductJson[];
        } else if (rawUnknown && typeof rawUnknown === "object") {
          const obj = rawUnknown as Record<string, unknown>;
          if (Array.isArray(obj["deals"])) {
            data = obj["deals"] as SampleProductJson[];
          } else if (Array.isArray(obj["data"])) {
            data = obj["data"] as SampleProductJson[];
          } else if (Array.isArray(obj["products"])) {
            data = obj["products"] as SampleProductJson[];
          } else if (Array.isArray(obj["items"])) {
            data = obj["items"] as SampleProductJson[];
          } else {
            console.warn("Unexpected response shape for products:", raw);
          }
        } else {
          console.warn("Unexpected response shape for products:", raw);
        }

        if (!data || data.length === 0) {
          console.warn("No products found after resolving response shape.");
        }

        // Take only the first 8 products
        const count = 8;
        const endIndex = Math.min(count, data.length);

        // helper to read potentially unknown fields without using `any`
        const getField = (obj: unknown, key: string): unknown => {
          return (obj as Record<string, unknown>)[key];
        };

        const processedProducts = data
          .slice(0, endIndex)
          .map((product: SampleProductJson) => {
            // try several fields that might contain images
            const candidates = [
              getField(product, 'image'),
              getField(product, 'images'),
              getField(product, 'image_url'),
              getField(product, 'imageUrl'),
              getField(product, 'thumbnail'),
              getField(product, 'media'),
            ];

            let parsedImage: string | undefined;
            for (const c of candidates) {
              parsedImage = parseFirstImage(c);
              if (parsedImage) break;
            }

            parsedImage = parsedImage ?? '/next.svg';
            // If parsedImage is a remote absolute URL, proxy it through our API to avoid hotlinking issues
            try {
              const isRemote = typeof parsedImage === 'string' && /^https?:\/\//i.test(parsedImage);
              if (isRemote) {
                parsedImage = `/api/image?url=${encodeURIComponent(parsedImage)}`;
              }
            } catch {
              // ignore
            }
            if (parsedImage === '/next.svg') {
              console.warn('No valid image found for product:', product.uniq_id, { candidates });
            }

            console.log('Parsed image for', product.uniq_id, parsedImage);
            return {
              uniq_id: product.uniq_id,
              name: product.product_name,
              rating: parseFloat(product.product_rating || "0"),
              reviews: 0, // The data does not contain reviews
              currentPrice: product.discounted_price
                ? product.discounted_price
                : "N/A", // Handle potential nulls
              oldPrice: product.retail_price ? product.retail_price : "N/A", // Handle potential nulls
              image: parsedImage,
              discount:
                product.discounted_price && product.retail_price
                  ? `${Math.round(
                      ((parseFloat(product.retail_price) -
                        parseFloat(product.discounted_price)) /
                        parseFloat(product.retail_price)) *
                        100
                    )}%`
                  : undefined,
            } as Product;
          });

        console.log("Processed products count:", processedProducts.length);
        setProducts(processedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return products;
}
