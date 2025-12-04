export interface Product {
  uniq_id?: string;
  pid?: string;
  _id?: string;
  name?: string;
  product_name?: string;
  image?: string;
  images?: string[];
  thumbnail?: string;
  currentPrice?: number | string;
  oldPrice?: number | string;
  discount?: string;
  rating?: number | string;
  reviews?: number | string;
  brand?: string;
  color?: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
  // include other fields used by controllers
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
