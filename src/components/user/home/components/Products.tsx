import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";
import ProductCard from "@/components/ui/ProductCard";
import React from "react";

export default function Products() {
  return (
    <div className="flex justify-around px-1 py-2">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center app-text-color mb-4">
          Ready to Ship Styles
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard imageOverlay={<ImageNamingOverlay title="24 Hr dispatch" buttonText="Shop Now"/>} />
          <ProductCard imageOverlay={<ImageNamingOverlay title="24 Hr dispatch" buttonText="Shop Now"/>} />
          <ProductCard imageOverlay={<ImageNamingOverlay title="24 Hr dispatch" buttonText="Shop Now"/>} />
          <ProductCard imageOverlay={<ImageNamingOverlay title="24 Hr dispatch" buttonText="Shop Now"/>} />
        </div>
      </div>
    </div>
  );
}
