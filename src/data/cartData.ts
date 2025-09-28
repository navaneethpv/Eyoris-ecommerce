export interface CartItem {
  id: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export const cartItems: CartItem[] = [
  {
    id: "1",
    name: "ZEBRONICS ZEB-BRO, With In-Line MIC",
    color: "Black",
    price: 299,
    quantity: 2,
    imageUrl: "/images/earphones-black.png", // Placeholder, will need actual image path
  },
  {
    id: "2",
    name: "TRIGGR Trinity 2 with Dual Pairing",
    color: "Red",
    price: 999,
    quantity: 1,
    imageUrl: "/images/headphones-red.png", // Placeholder, will need actual image path
  },
  {
    id: "3",
    name: "boAt BassHeads 100",
    color: "Gold",
    price: 399,
    quantity: 1,
    imageUrl: "/images/earphones-gold.png", // Placeholder, will need actual image path
  },
];
