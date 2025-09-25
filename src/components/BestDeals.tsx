'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

export default function BestDeals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/sample_products.json');
        const data: Product[] = await response.json();
        // Take only products with valid images
        const processedProducts = data.slice(0, 8).filter(product => product.image && product.image.length > 0);
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.uniq_id} product={product} />
        ))}
      </div>
    </section>
  );
}
