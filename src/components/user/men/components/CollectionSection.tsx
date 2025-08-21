"use client"
import React from "react";

import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";
import MenProductCard2 from "./MenProductCard2";
import { useRouter } from "next/navigation";



export default function CollectionSection() {
  const router = useRouter();
  const collections = [
  {
    id: 1,
    title: "Wedding Vibes",
    buttonText: "Shop Now",
    onClick: () => router.push("/men/weddingsherwanis"),
    
    image:
      "https://kalki.gumlet.io/cdn/shop/files/faun-silk-groom-sherwani-set-with-gota-and-zardosi-work-sg269967-1.jpg?w=370&"
  },
  {
    id: 2,
    title: "Indo Western",
    buttonText: "Shop Now",
    onClick: () => router.push("/men/partywearindowestern"),

    image:
      "https://kalki.gumlet.io/cdn/shop/files/1-shop-by-collation-mehendi-23-07-25.jpg?w=380&"
  },
  {
    id: 3,
    title: "Party Wear",
    buttonText: "Shop Now",
    onClick: () => router.push("/men/designercoatpents"),

    image:
      "https://kalki.gumlet.io/cdn/shop/files/pink_linen_ombre_kurta_set_with_abstract_print-sg300557_4.jpg?w=370&"
  },
  {
    id: 4,
    title: "Classic Ethnic",
    buttonText: "Shop Now",
    onClick: () => router.push("/men/partywearindowestern"),

    image:
      "https://kalki.gumlet.io/cdn/shop/files/sg315895-1_c5c5cc54-6369-4c24-b9e7-a91f6adb9a4f.jpg?w=370&"
  }
];
  return (
    <div className="flex justify-around px-1 py-2">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          Shop by Collection
        </h1>

        {/* Grid of collections */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
          {collections.map((item) => (
            <MenProductCard2
              key={item.id}
              images={[
                {
                  src: item.image || "/placeholder.png",
                  alt: item.title
                }
              ]} 
              imageOverlay={
                <ImageNamingOverlay
                  title={item.title}
                  buttonText={item.buttonText}
                  onButtonClick={item.onClick}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
