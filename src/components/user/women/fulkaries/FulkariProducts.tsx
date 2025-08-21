"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import SectionHeading from "@/components/ui/Category/CategorySectionHeading";
import { getProductsByTagQuery } from "@/lib/query";
import { ProductT } from "@/types";
import Link from "next/link";
import FilterBar from "../bridallehanga/components/FilterBar";

export default function FulkariProducts() {
  const tag = "Fulkaries";

  const { data, isLoading, isError } = useQuery(getProductsByTagQuery(tag));

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <div className="flex-1 text-black">
      <SectionHeading>Indian Ethnic Wear Bestsellers</SectionHeading>
      <FilterBar/>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
        {data?.map((product: ProductT) => (
            <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard
            key={product.id}
            images={[
              {
                src: product.images?.[0]?.url,
                alt: product.name
              }
            ]}
          >
            <TitleWrapper title={product.name} price={product.price} />
          </ProductCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
