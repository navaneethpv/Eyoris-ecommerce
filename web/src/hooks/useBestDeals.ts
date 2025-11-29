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
  if (Array.isArray(imageField)) return String(imageField[0]);
  if (typeof imageField === "string") {
    // try parsing JSON string like '["url1","url2"]' or plain url
    try {
      const parsed = JSON.parse(imageField);
      if (Array.isArray(parsed)) return String(parsed[0]);
      if (typeof parsed === "string") return parsed;
    } catch {
      return imageField;
    }
  }
  return undefined;
}

export function useBestDeals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get<ApiResponse>(
          "http://localhost:4000/product"
        );
        const raw = response.data;
        console.log("Raw response data for products:", raw);

        // Resolve actual array from possible wrappers
        let data: SampleProductJson[] = [];
        if (Array.isArray(raw)) {
          data = raw;
        } else if (
          raw &&
          Array.isArray((raw as { data?: SampleProductJson[] }).data)
        ) {
          data = (raw as { data: SampleProductJson[] }).data;
        } else if (
          raw &&
          Array.isArray((raw as { products?: SampleProductJson[] }).products)
        ) {
          data = (raw as { products: SampleProductJson[] }).products;
        } else if (
          raw &&
          Array.isArray((raw as { items?: SampleProductJson[] }).items)
        ) {
          data = (raw as { items: SampleProductJson[] }).items;
        } else {
          console.warn("Unexpected response shape for products:", raw);
        }

        if (!data || data.length === 0) {
          console.warn("No products found after resolving response shape.");
        }

        // Start at index 8 and take 8 products (indexes 8..15)
        const startIndex = 8;
        const count = 8;
        if (data.length <= startIndex) {
          console.warn(
            `Requested startIndex ${startIndex} but only ${data.length} products available. No items will be shown.`
          );
        }
        const endIndex = Math.min(startIndex + count, data.length);

        const processedProducts = data
          .slice(startIndex, endIndex)
          .map((product: SampleProductJson) => {
            const parsedImage = parseFirstImage(product.image as unknown);
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
