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
