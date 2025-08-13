import ImageWrapper from "@/components/wrappers/productcard/ImageWrapper";
import React from "react";

interface MenProductCard2Props {
  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
}

export default function MenProductCard2({
  children,
  imageOverlay
}: MenProductCard2Props) {
  return (
    <div className="w-full relative p-1 sm:p-3">
      <ImageWrapper
        src="https://kalki.gumlet.io/cdn/shop/files/1-shop-by-collation-mehendi-23-07-25.jpg?w=380&"
        alt="Wedding Wardrobe"
        quality={1000}
        className="w-full h-full object-cover"
      >
        {imageOverlay && imageOverlay}
      </ImageWrapper>

      {children}
    </div>
  );
}
