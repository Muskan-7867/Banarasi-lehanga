// lib/hooks/useCartSync.ts
import { useState, useEffect } from "react";
import useCart from "./useCart";
import axios from "axios";
import { base_url } from "../services";

export const useCartSync = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);
  const { RemoveProductFromCart } = useCart();

  // Sync cart from localStorage on mount and when cart changes
  useEffect(() => {
    const syncCart = () => {
      const storedIds = JSON.parse(localStorage.getItem("productIds") || "[]");
      setProductIds(storedIds);
    };

    syncCart();

    // Listen for storage events (changes from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "productIds") {
        syncCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Fetch products when productIds change
  useEffect(() => {
    const fetchCartProducts = async (ids: string[]) => {
      try {
        const res = await axios.post(`${base_url}/product/cartproducts`, {
          ids
        });
        setCartItems(res.data.products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    if (productIds.length > 0) {
      fetchCartProducts(productIds);
    } else {
      setCartItems([]);
    }
  }, [productIds]);

  const handleRemoveItem = (itemId: string) => {
    // Update localStorage
    const updatedIds = productIds.filter((id) => id !== itemId);
    localStorage.setItem("productIds", JSON.stringify(updatedIds));
    setProductIds(updatedIds);

    // Update cart store
    RemoveProductFromCart(itemId);

    // Trigger storage event to sync across components
    window.dispatchEvent(new Event("storage"));
  };

  return {
    cartItems,
    productIds,
    handleRemoveItem,
    refreshCart: () => {
      const storedIds = JSON.parse(localStorage.getItem("productIds") || "[]");
      setProductIds(storedIds);
    }
  };
};
