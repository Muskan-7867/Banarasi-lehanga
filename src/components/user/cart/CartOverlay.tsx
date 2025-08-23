"use client";
import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import { ProductT } from "@/types";
import axios from "axios";
import { base_url } from "@/lib/services";

interface CartProps {
  onClose: () => void;
  onViewCart?: () => void; // optional
}

export default function CartOverlay({ onClose, onViewCart }: CartProps) {
  const [cartItems, setCartItems] = useState<ProductT[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("productIds") || "[]");
    if (storedIds.length > 0) {
      fetchCartProducts(storedIds);
    }
  }, []);

  const fetchCartProducts = async (ids: string[]) => {
    try {
      const res = await axios.post(`${base_url}/product/cartproducts`, { ids });
      setCartItems(res.data.products);
      console.log("Fetched cart products:", res.data.products);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem(
      "productIds",
      JSON.stringify(updatedItems.map((item) => item.id))
    );
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0),
    0
  );
  const formattedSubtotal = subtotal.toLocaleString();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          isVisible ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={handleClose}
      ></div>

      <div className="absolute inset-y-0 right-0 top-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div
            className={`h-full flex flex-col bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
              isVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
                <button
                  type="button"
                  className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={handleClose}
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <CartSummary
              subtotal={formattedSubtotal}
              onClose={handleClose}
              onViewCart={onViewCart || (() => {})} // fallback
            />
          </div>
        </div>
      </div>
    </div>
  );
}
