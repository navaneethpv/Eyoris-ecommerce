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
