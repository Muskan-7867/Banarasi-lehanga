"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BridalJewellerySection() {
    const router = useRouter();
  return (
    <div className="w-screen h-[40rem] grid grid-cols-1 md:grid-cols-2 ">
      {/* Left Image */}
      <div className="relative w-full h-full">
        <Image
          src="https://kalki.gumlet.io/cdn/shop/files/Bridal-banner-desk-12-4-24.jpg?w=1920&"
          alt="Bridal Jewelry"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Content */}
      <div className="flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-6 text-black">
          BRIDAL JEWELRY FOR <br /> YOUR BIG DAY
        </h2>
        <button onClick={() => router.push("/women/artificialjewellery") } className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition cursor-pointer" >
          View Collection
        </button>
      </div>
    </div>
  );
}
