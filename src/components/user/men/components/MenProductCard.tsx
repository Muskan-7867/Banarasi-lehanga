import ImageWrapper from "@/components/wrappers/productcard/ImageWrapper";
import React from "react";

interface MenProductCardProps {
  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
}

export default function MenProductCard({ children, imageOverlay }: MenProductCardProps) {
  return (
    <div className="w-full relative p-1 sm:p-3">
      <ImageWrapper
        src="https://kalki.gumlet.io/cdn/shop/files/1-mens-highlight-desk-new-arrivals-all-countries-1-8-25.jpg?w=461&"
        alt="Wedding Wardrobe"
        quality={1000}
        className="w-full h-auto aspect-[4/3] object-cover" 
        // aspect-[4/3] keeps consistent ratio on all devices
      >
        {imageOverlay}
      </ImageWrapper>

      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
