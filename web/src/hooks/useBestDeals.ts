import { useState, useEffect } from 'react';
import { Product, SampleProductJson } from '../types';

export function useBestDeals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/sample_products.json');
        const data: SampleProductJson[] = await response.json(); // Use the new interface for raw data
        // Take only products with valid images and map to Product type
        const processedProducts = data.slice(10, 18)
          .filter((product: SampleProductJson) => product.image && product.image.length > 0)
          .map((product: SampleProductJson) => ({
            uniq_id: product.uniq_id,
            name: product.product_name,
            rating: parseFloat(product.product_rating),
            reviews: 0, // The data does not contain reviews
            currentPrice: product.discounted_price ? product.discounted_price : 'N/A', // Handle potential nulls
            oldPrice: product.retail_price ? product.retail_price : 'N/A', // Handle potential nulls
            image: JSON.parse(product.image)[0], // Take the first image
            discount: (product.discounted_price && product.retail_price)
              ? `${Math.round(((parseFloat(product.retail_price) - parseFloat(product.discounted_price)) / parseFloat(product.retail_price)) * 100)}%`
              : undefined,
          }));
        setProducts(processedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return products;
}
