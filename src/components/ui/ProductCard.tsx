import React from "react";
import ImageWrapper from "../wrappers/productcard/ImageWrapper";

interface ProductCardProps {
  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
}
export default function ProductCard({
  children,
  imageOverlay
}: ProductCardProps) {
  return (
    <div className="w-full relative p-1 sm:p-3">
      <ImageWrapper
        src="http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg"
        alt="Wedding Wardrobe"
        quality={1000}
      >
        {imageOverlay && imageOverlay}
      </ImageWrapper>
      {/* for title */}
      {children}
    </div>
  );
}
