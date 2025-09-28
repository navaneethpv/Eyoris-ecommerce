// src/types.ts

// Interface for the raw data from sample_products.json
export interface SampleProductJson {
  uniq_id: string;
  product_name: string;
  product_rating: string;
  discounted_price: string | null;
  retail_price: string | null;
  image: string; // This is a JSON string representing an array of strings
  // Add other fields if they are present in sample_products.json and might be relevant
}

// Interface for the processed product data used in the application
export interface Product {
  uniq_id: string;
  name: string;
  rating: number;
  reviews: number;
  currentPrice: string;
  oldPrice: string;
  image: string;
  discount: string | undefined;
}

// Interface for items stored in the cart
// Note: 'id' is number here, while 'uniq_id' in Product is string.
// 'price' is number here, while 'currentPrice'/'oldPrice' in Product are strings.
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string; // Assuming color might be added later or is part of product details
}

// Interface for the Cart Context
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
  emptyCart: () => void;
}
