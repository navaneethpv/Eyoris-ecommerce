'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product, SampleProductJson } from '@/types';

export default function BestDeals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/sample_products.json');
        const data: SampleProductJson[] = await response.json(); // Use the new interface for raw data
        // Take only products with valid images and map to Product type
        const processedProducts = data.slice(9, 17)
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

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Best Deals</h2>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.uniq_id} product={product}/>
        ))}
      </div>
    </section>
  );
}
