"use client";
import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProductsByTagQuery } from "@/lib/query"; // make sure you added this
import { ProductT } from "@/types";

export default function WishListProducts() {
  const tag = "Most WishList Styles"; // 👈 matches the tag in your DB

  const { data, isLoading, isError } = useQuery(getProductsByTagQuery(tag));

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load wishlist products
      </p>
    );
  }

  return (
    <div className="flex justify-around px-1 py-8">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          {tag}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1">
          {data?.map((product: ProductT) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard
                images={[
                  {
                    src: product.images?.[0]?.url || "/placeholder.png",
                    alt: product.name,
                  },
                ]}
              >
                <TitleWrapper title={product.name} price={product.price} />
              </ProductCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
