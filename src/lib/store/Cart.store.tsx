// store/Cart.store.ts
import { create } from "zustand";

type CartType = {
  cartCount: number;
  cartItems: string[];
  increaseCartCount: () => void;
  decreaseCartCount: () => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  syncCartFromStorage: () => void;
};

const useCartStore = create<CartType>()((set) => ({
  cartCount: 0,
  cartItems: [],
  
  increaseCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decreaseCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
  
  addToCart: (id: string) => {
    // Update localStorage
    const prevProductId = localStorage.getItem("productIds");
    if (prevProductId) {
      const arrayProductId = JSON.parse(prevProductId);
      const updated = [...arrayProductId, id];
      localStorage.setItem("productIds", JSON.stringify(updated));
      set({ cartItems: updated, cartCount: updated.length });
    } else {
      localStorage.setItem("productIds", JSON.stringify([id]));
      set({ cartItems: [id], cartCount: 1 });
    }
  },
  
  removeFromCart: (id: string) => {
    // Update localStorage
    const storedIds = localStorage.getItem("productIds");
    if (!storedIds) return;
    
    const ids = JSON.parse(storedIds);
    const newIds = ids.filter((itemId: string) => itemId !== id);
    localStorage.setItem("productIds", JSON.stringify(newIds));
    set({ cartItems: newIds, cartCount: newIds.length });
  },
  
  syncCartFromStorage: () => {
    if (typeof window !== 'undefined') {
      const prodIds = localStorage.getItem("productIds");
      if (!prodIds) {
        set({ cartItems: [], cartCount: 0 });
      } else {
        const ids = JSON.parse(prodIds);
        set({ cartItems: ids, cartCount: ids.length });
      }
    }
  }
}));

export default useCartStore;