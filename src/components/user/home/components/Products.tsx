import ProductCard from "@/components/ui/ProductCard";
import React from "react";

export default function Products() {
  return (
    <div className="flex justify-around px-4 py-8">
  <div className="w-full max-w-[94rem]">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-6">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
</div>

  );
}
