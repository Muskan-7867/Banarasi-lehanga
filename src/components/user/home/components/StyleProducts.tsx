"use client"
import ProductCard from "@/components/ui/ProductCard";
import React from "react";
import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";
import { useRouter } from "next/navigation";

export default function StyleProducts() {
  const router = useRouter();
  return (
    <div className="flex justify-around px-1 py-8">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          Curated Collections
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard
            images={[
              {
                src: "https://kalki.gumlet.io/cdn/shop/files/1-curated-collections-gen-z-400x533-28-07-25.jpg?w=380&",
                alt: "Image 1"
              }
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="The Zen Z Store"
                buttonText="Shop Now"
                onButtonClick={() => router.push("/women/indowestern")}
              />
            }
          ></ProductCard>
          <ProductCard
            images={[
              {
                src: "https://kalki.gumlet.io/cdn/shop/files/3-curated-collections-sequin-collection-400x533-28-07-25.jpg?w=380&",
                alt: "Image 1"
              }
            ]}
            imageOverlay={
              <ImageNamingOverlay title="Sequin Soiree" buttonText="Shop Now" onButtonClick={() => router.push("/women/partywear")}/>
            }
          ></ProductCard>
          <ProductCard
            images={[
              {
                src: "https://kalki.gumlet.io/cdn/shop/files/2-curated-collections-boho-styles-400x533-21-07-25.jpg?w=380&",
                alt: "Image 1"
              }
            ]}
            imageOverlay={
              <ImageNamingOverlay title="Boho Chic" buttonText="Shop Now" onButtonClick={() => router.push("/women/suits")}/>
            }
          ></ProductCard>
          <ProductCard
            images={[
              {
                src: "https://kalki.gumlet.io/cdn/shop/files/6-curated-collections-printed-collection-400x533-21-07-25.jpg?w=380&",
                alt: "Image 1"
              }
            ]}
            imageOverlay={
              <ImageNamingOverlay title="Printed" buttonText="Shop Now" onButtonClick={() => router.push("/women/phulkaries")}/>
            }
          ></ProductCard>
        </div>
      </div>
    </div>
  );
}
