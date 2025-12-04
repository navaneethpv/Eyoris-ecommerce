import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  imageUrl: string; // made required to match types
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, diff: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => {
    console.log('[Cart] addToCart called with', item);
    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
        console.log('[Cart] incremented quantity', newItems[existingIndex]);
        return { items: newItems };
      }
      const newItem: CartItem = { ...item, quantity: 1, imageUrl: item.imageUrl || '/next.svg', color: item.color ?? 'default' } as CartItem;
      console.log('[Cart] added new item', newItem);
      return { items: [...state.items, newItem] };
    });
  },
  removeFromCart: (id) => {
    console.log('[Cart] removeFromCart', id);
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },
  updateQuantity: (id, diff) => {
    console.log('[Cart] updateQuantity', id, diff);
    set((state) => {
      const idx = state.items.findIndex((i) => i.id === id);
      if (idx === -1) return state;
      const newItems = [...state.items];
      const newQty = (newItems[idx].quantity || 0) + diff;
      if (newQty <= 0) {
        newItems.splice(idx, 1);
      } else {
        newItems[idx] = { ...newItems[idx], quantity: newQty };
      }
      return { items: newItems };
    });
  },
  clearCart: () => {
    console.log('[Cart] clearCart');
    set({ items: [] });
  },
}));

export default useCartStore;