// ...existing code...
import {create} from "zustand";
import { persist } from "zustand/middleware";

export type cartItem = {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  imageUrl: string;
  color: string;
};

type CartState = {
  cartItems: cartItem[]; // <- use exported cartItem type
  addToCart: (item: Omit<cartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  emptyCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (itemToAdd) => {
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === itemToAdd.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === itemToAdd.id
                  ? { ...i, quantity: i.quantity + 1, discountPrice: itemToAdd.discountPrice ?? i.discountPrice }
                  : i
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...itemToAdd, quantity: 1 }] };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, amount) => {
        set((state) => ({
          cartItems: state.cartItems.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, i.quantity + amount) } : i
          ),
        }));
      },

      emptyCart: () => set({ cartItems: [] }),
      totalItems: () => get().cartItems.reduce((s, i) => s + i.quantity, 0),

      totalPrice: () =>
        get().cartItems.reduce((s, i) => s + (i.discountPrice ?? i.price) * i.quantity, 0),
    }),
    {
      name: "eyoris-cart",
    }
  )
);
// ...existing