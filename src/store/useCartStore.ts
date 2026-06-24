import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "rank" | "key";
}

interface CartStore {
  items: CartItem[];
  coupon: { code: string; discount: number } | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  getTotal: () => number;
  getDiscountedTotal: () => number;
}

const VALID_COUPONS: Record<string, number> = {
  "MINE20": 0.2,
  "WELCOME10": 0.1,
  "FESTIVAL25": 0.25,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }),
      clearCart: () => set({ items: [], coupon: null }),
      applyCoupon: (code) => {
        const discount = VALID_COUPONS[code.toUpperCase()];
        if (discount) {
          set({ coupon: { code: code.toUpperCase(), discount } });
          return true;
        }
        return false;
      },
      getTotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      getDiscountedTotal: () => {
        const total = get().getTotal();
        const discount = get().coupon?.discount || 0;
        return total * (1 - discount);
      },
    }),
    {
      name: "minefuture-cart",
    }
  )
);
