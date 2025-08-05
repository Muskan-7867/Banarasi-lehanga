import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import React from "react";

export default function StyleProducts() {
  return (
    <div className="flex justify-around px-1 py-8">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center app-text-color mb-4">
          Curated Collections
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard>
            <TitleWrapper
              title="Lehanga gfjhurfffffffffffffffffffffffffffffffffffffffffffffffggggggggggg"
              price={5000}
            />
          </ProductCard>
               <ProductCard>
            <TitleWrapper
              title="Lehanga gfjhurfffffffffffffffffffffffffffffffffffffffffffffffggggggggggg"
              price={5000}
            />
          </ProductCard>
               <ProductCard>
            <TitleWrapper
              title="Lehanga gfjhurfffffffffffffffffffffffffffffffffffffffffffffffggggggggggg"
              price={5000}
            />
          </ProductCard>
               <ProductCard>
            <TitleWrapper
              title="Lehanga gfjhurfffffffffffffffffffffffffffffffffffffffffffffffggggggggggg"
              price={5000}
            />
          </ProductCard>
        </div>
      </div>
    </div>
  );
}
