import Image from "next/image";
import React from "react";

export default function ImageSections() {
  return (
    <>
  <h1 className="text-center font-bold app-text-color text-2xl mb-6">Editor Picks</h1>
    <div className="flex justify-center mb-8 md:mb-14 px-4 sm:px-6">
    
      <div className="w-full max-w-screen-2xl aspect-[16/6] grid grid-cols-2 gap-4 md:gap-6">
        <div className="w-full h-48 md:h-auto relative grid grid-cols-2">
          <Image
            src="https://kalki.gumlet.io/cdn/shop/files/1-editors-picks-blouse-all-country-420x568-desk-21-07-25.jpg?w=710&"
            alt="banner"
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div className="w-full h-48 md:h-auto relative">
          <Image
            src="https://kalki.gumlet.io/cdn/shop/files/2-editors-picks-indowestern-all-country-420x568-desk-23-07-25.jpg?w=710&"
            alt="banner"
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        </div>
      </div>
    </>
  );
}
