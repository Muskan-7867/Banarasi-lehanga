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
            src="https://www.samyakk.com/blog/wp-content/uploads/2024/04/Wedding-Lehenga-Collection-by-Samyakk.jpg"
            alt="banner"
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        <div className="w-full h-48 md:h-auto relative">
          <Image
            src="https://clothsvilla.com/cdn/shop/articles/SeductiveMaroonThreadAndSequinsEmbroideredGeorgettePartyWearLehenga_4_885x610.jpg?v=1746706589"
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
