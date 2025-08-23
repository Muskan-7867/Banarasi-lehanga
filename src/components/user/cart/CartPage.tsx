"use client";
import { saree } from "@/app/constants/imagePath";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "@/lib/services";

type Product = {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
};

export default function CartPage() {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get IDs from localStorage
    const storedIds = JSON.parse(localStorage.getItem("productIds") || "[]");
    setProductIds(storedIds);
  }, []);

  useEffect(() => {
    if (productIds.length > 0) {
      fetchCartProducts(productIds);
    }
  }, [productIds]);

  const fetchCartProducts = async (ids: string[]) => {
    try {
      const res = await axios.post(`${base_url}/product/cartproducts`, { ids });
      setCartProducts(res.data.products);
      console.log("Fetched products:", res.data.products);
    } catch (err) {
      console.error("Failed to fetch cart products:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 px-4 sm:px-8 lg:px-16">
      <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-lg">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-start p-6 space-x-6 border-b"
            >
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

                {/* Quantity */}
                <div className="mt-4 flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Size: Fabric Only
                  </label>
                  <div className="flex items-center border rounded">
                    <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                      -
                    </button>
                    <span className="px-3">1</span>
                    <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
