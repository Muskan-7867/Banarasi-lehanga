"use client";
import React from "react";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import SectionHeading from "@/components/ui/Category/CategorySectionHeading";


import { useQuery } from "@tanstack/react-query";
import { getProductsByTagQuery } from "@/lib/query";
import { ProductT } from "@/types"; // <- make sure you have Product type
import MenProductCard2 from "../components/MenProductCard2";
import Link from "next/link";
import FilterBar from "../../bridal/bridallehanga/components/FilterBar";


export default function MenPartyProducts() {
  const tag = "Party Wear Indo Western"; // 🔑 change this tag as per your backend

  const { data, isLoading, error } = useQuery<ProductT[]>(
    getProductsByTagQuery(tag)
  );

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load products</p>;

  return (
    <div className="flex-1 text-black">
      <SectionHeading>Stylish Kurta Jacket Sets for Men</SectionHeading>
      <FilterBar />
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
    </div>
  );
}
