"use client";
import React from "react";
import { saree } from "@/app/constants/imagePath";
import Image from "next/image";
import { useCartSync } from "@/lib/hooks/useCartSync"; // Import the sync hook

export default function Wishlist() {
  const { cartItems, handleRemoveItem } = useCartSync(); 

  return (
    <div className="min-h-screen bg-white   py-6 px-4 sm:px-8 lg:px-16">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8  justify-center">
        <div className="lg:col-span-2 bg-white rounded-lg ">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your wishlist is empty</p>
            </div>
          ) : (
            cartItems.map((product) => (
              <div key={product.id} className="flex items-start p-6 space-x-6 border-b">
                {/* Product Image */}
                <Image
                  src={product.images[0]?.url || saree}
                  alt={product.name}
                  width={112}
                  height={160}
                  className="w-28 h-40 object-cover rounded"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h1 className="text-lg font-medium text-gray-800">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    MRP ₹{product.price}
                  </p>

                  <div className="mt-4 flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">
                      Size: Fabric Only
                    </label>
                  </div>

                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleRemoveItem(product.id)} // Use the sync handler
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}