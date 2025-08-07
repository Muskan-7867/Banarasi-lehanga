import Image from "next/image";
import React from "react";

export default function SecondBanner() {
  return (
    <div className="flex justify-center px-2 sm:px-6">
      <div className="w-full max-w-[1600px] aspect-[16/8] lg:aspect-[16/4] md:aspect-[16/4] relative mt-4 ">
        <Image
          src="https://www.samyakk.com/blog/wp-content/uploads/2023/10/Lehenga-Banner.gif"
          alt="banner"
          fill
          className="object-cover rounded-lg"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
        />
      </div>
    </div>
  );
}
