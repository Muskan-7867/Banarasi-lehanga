"use client";
import React, { useState } from "react";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import SectionHeading from "@/components/ui/Category/CategorySectionHeading";
import MenProductCard2 from "../components/MenProductCard2";
import Link from "next/link";
import FilterBar from "../../bridal/bridallehanga/components/FilterBar";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useProducts } from "@/lib/query/tagProductQuery";


export default function CoatPentProducts() {
  const tag = "Designer Coat Pents"; // 

  const [filters, setFilters] = useState<{
    size?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
  }>({});
  const debouncedFilters = useDebounce(filters, 500);

  const {
    data = [],
    isLoading,
    isError,
    error
  } = useProducts(tag, debouncedFilters);

  const isRateLimitError = error?.message?.includes("Rate limit");

  if (isRateLimitError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">
          Too many requests. Please wait a moment and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isError)
    return <p className="text-center text-red-500">Failed to load products</p>;
  return (
    <div className="flex-1 text-black overflow-y-auto hide-scrollbar h-screen">
      <SectionHeading>Stylish Coat Pents for Men</SectionHeading>
      <FilterBar onFilterChange={setFilters}/>
        {isLoading && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded"></div>
              <div className="bg-gray-200 h-4 mt-2 rounded"></div>
              <div className="bg-gray-200 h-4 mt-1 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && data.length > 0 && (
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
        {data?.map((item) => (
            <Link key={item.id} href={`/products/${item.id}`}>

          <MenProductCard2
            key={item.id}
            images={[
              {
                src: item.images?.[0].url || "/placeholder.png",
                alt: item.name
              }
            ]}
          >
            <TitleWrapper title={item.name} price={item.price} />
          </MenProductCard2>
          </Link>
        ))}
      </div>
      )}
       {!isLoading && data.length === 0 && (
        <p className="col-span-full text-center text-gray-500 mt-6">
          No products found
        </p>
      )}
    </div>
  );
}
