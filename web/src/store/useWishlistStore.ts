import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  color?: string;
  image?: string;
};

type WishlistState = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  toggle: (item: WishlistItem) => void;
  clear: () => void;
  has: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item: WishlistItem) => set((s) => ({ items: [...s.items.filter((i) => i.id !== item.id), item] })),
      remove: (id: string) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      toggle: (item: WishlistItem) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) get().remove(item.id);
        else get().add(item);
      },
      clear: () => set({ items: [] }),
      has: (id: string) => get().items.some((i) => i.id === id),
    }),
    {
      name: 'eyoris-wishlist',
    }
  )
);

export default useWishlistStore;
