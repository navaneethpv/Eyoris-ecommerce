export interface Product {
  uniq_id: string;
  name: string;
  rating: number;
  reviews: number;
  currentPrice: string;
  oldPrice: string;
  discount?: string;
  image: string;
}

export interface SampleProductJson {
  uniq_id: string;
  product_name: string;
  product_rating: string;
  discounted_price: string | null;
  retail_price: string | null;
  image: string; // JSON string of an array of URLs
  crawl_timestamp: string;
  product_url: string;
  product_category_tree: string;
  pid: string;
  is_FK_Advantage_product: string;
  description: string;
  overall_rating: string;
  brand: string | null;
  product_specifications: string;
}

// Interface for items stored in the cart
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  color: string;
  discountPrice?: number; // discounted price, made optional
}

// Interface for the Cart Context
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  emptyCart: () => void;
}
export interface CartItem {
  id: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

