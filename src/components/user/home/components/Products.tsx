"use client"
import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";
import ProductCard from "@/components/ui/ProductCard";
import { useRouter } from "next/navigation";

import React from "react";

export default function Products() {
  const router = useRouter();
  return (
    <div className="flex justify-around px-1 py-2">
      <div className="w-full max-w-[94rem]">
        {/* <h1 className="text-2xl font-bold text-center text-black mb-4">
          Ready to Ship Styles
        </h1> */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard
            images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/1-mini-banner-desk-festive-ready-to-ship-india-06-08-25.jpg?w=350&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="24 Hr dispatch"
                buttonText="Shop Now"
                onButtonClick={() => router.push("/women/partywear")}
              />
            }
          />
          <ProductCard  images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/2-mini-banner-desk-wedding-styles-india-uk-global-06-08-25.jpg?w=380&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="Wedding Wardrobe '25"
                buttonText="Shop Now"
                onButtonClick={() => router.push("/women/gowns")}

              />
            }
          />
          <ProductCard images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/3-mini-banner-desk-independence_day-india-06-08-25.jpg?w=380&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="Independence Specials"
                buttonText="Shop Now"
                onButtonClick={() => router.push("/women/suits")}

              />
            }
          />
          <ProductCard images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/4-mini-banner-desk-bestsellers-30-07-25.jpg?w=380&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="Bestsellers"
                buttonText="Shop Now"
                onButtonClick={() => router.push("/women/indowestern")}

              />
            }
          />
        </div>
      </div>
    </div>
  );
}
