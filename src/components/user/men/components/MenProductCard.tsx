import ImageWrapper from "@/components/wrappers/productcard/ImageWrapper";
import React from "react";

interface MenProductCardProps {
  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
}

export default function MenProductCard({
  children,
  imageOverlay
}: MenProductCardProps) {
  return (
    <div className="w-full relative p-1 sm:p-3">
      {/* Add aspect-w-4 aspect-h-3 to control the aspect ratio */}
      <div className="h-[22rem] w-[23rem] overflow-hidden">
        <ImageWrapper
          src="https://kalki.gumlet.io/cdn/shop/files/1-mens-highlight-desk-new-arrivals-all-countries-1-8-25.jpg?w=461&"
          alt="Wedding Wardrobe"
          quality={1000}
          className="w-full h-full object-cover"
          
        >
          {imageOverlay && imageOverlay}
        </ImageWrapper>
      </div>
      {/* for title */}
      {children}
    </div>
  );
}