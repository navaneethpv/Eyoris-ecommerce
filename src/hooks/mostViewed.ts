import { useState, useEffect } from 'react';
import { Product} from '@/types';

interface EyoristProduct {
  uniq_id: string;
  product_name: string;
  retail_price: string;
  discounted_price: string;
  image: string[];
  overall_rating: string;
  product_rating: string;
}

const mostViewed = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
      async function fetchProducts() {
        try {
          const response = await fetch('/sample_products.json');
          const data: EyoristProduct[] = await response.json();
  
          const processedProducts: Product[] = data.slice(19, 30).map((product) => {
            const rating = product.product_rating === 'No rating available' ? 0 : parseFloat(product.product_rating);
            const imageUrl = Array.isArray(product.image) ? product.image[0] : (typeof product.image === 'string' ? JSON.parse(product.image)[0] : '');
            return {
              uniq_id: product.uniq_id,
              name: product.product_name,
              rating: rating,
              reviews: 1000,
              currentPrice: product.discounted_price ? product.discounted_price : 'N/A',
              oldPrice: product.retail_price ? product.retail_price : 'N/A',
              image: imageUrl,
              discount: product.discounted_price && product.retail_price ? `${Math.round(((parseFloat(product.retail_price) - parseFloat(product.discounted_price)) / parseFloat(product.retail_price)) * 100)}%` : undefined,
            } as Product;
          });
  
          setProducts(processedProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
  
      fetchProducts();
    }, []);
  return (
    products
  )
}

export default mostViewed