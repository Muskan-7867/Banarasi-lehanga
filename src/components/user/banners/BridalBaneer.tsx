import Image from "next/image";
import React from "react";

export default function BridalBaneer() {
  return (
    <>
    <h1 className="app-text-color text-2xl md:text-4xl font-bold text-center mt-6">Bridal World</h1>
    <div className="flex justify-center">
        
      <div className="w-[95%] h-74 md:h-auto md:w-[85%] md:aspect-[16/6] relative mt-6">
        <Image
          src="https://kalki.gumlet.io/cdn/shop/files/bridal-banner-desk-30-06-25.jpg?w=1438&"
          alt="banner"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
        />
      </div>
    </div>
    </>
  );
}