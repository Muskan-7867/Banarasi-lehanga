"use client";
import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useCartSync } from "@/lib/hooks/useCartSync"; 

interface CartProps {
  onClose: () => void;
  onViewCart?: () => void; 
}

export default function CartOverlay({ onClose, onViewCart }: CartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { cartItems, handleRemoveItem } = useCartSync(); 

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
        } `}
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
                <h2 className="text-lg font-medium text-gray-900">Your Wishlist</h2>
                <button
                  type="button"
                  className="-mr-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={handleClose}
                >
                  <HiX className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500 py-10">
                    <p className="text-lg font-medium">No items found</p>
                    <p className="text-sm">Your wishlist is empty.</p>
                  </div>
                ) : (
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
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <CartSummary
                subtotal={formattedSubtotal}
                onViewCart={onViewCart || (() => {})} // fallback
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
