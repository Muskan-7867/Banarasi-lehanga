"use client";
import React, { useEffect, useState } from "react";
import { BannerProps, CommonBanner } from "./CommonMenNavbar";
import { menbanner1, menbanner2 } from "@/app/constants/imagePath";
import { useRouter } from "next/navigation";

export default function BannerCarousel() {
  const router = useRouter();
  const banners: BannerProps[] = [
    {
      title: "Menswear Fits",
      subtitle: "Serving Looks This Diwali",
      buttonText: "SHOP NOW",
      imageUrl: menbanner1,
      highlightText: "NEW ARRIVAL",
      onclick: () => router.push("/men/designercoatpents") // Make sure this is correctly defined
    },
    {
      title: "Festive Collection",
      subtitle: "Grab an EXTRA discount on our entire range",
      buttonText: "EXPLORE NOW",
      imageUrl: menbanner2,
      highlightText: "LIMITED TIME OFFER",
      onclick: () => router.push("/men/partywearindowestern") // Make sure this is correctly defined
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 relative" : "opacity-0 pointer-events-none"
          }`}
        >
          <CommonBanner 
            title={banner.title}
            subtitle={banner.subtitle}
            buttonText={banner.buttonText}
            imageUrl={banner.imageUrl}
            highlightText={banner.highlightText}
            onclick={banner.onclick} // Make sure this is passed correctly
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}