import React from "react";
import ImageWrapper from "../wrappers/productcard/ImageWrapper";

interface ProductCardProps {
  images: { src: string; alt: string }[]; 
  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
}

export default function ProductCard({
  images,
  children,
  imageOverlay
}: ProductCardProps) {
  return (
    <div className="w-full relative p-1 sm:p-3">
     
        {images?.map((img, index) => (
          <ImageWrapper
            key={index}
            src={img.src}
            alt={img.alt}
            quality={1000}
          >
            {imageOverlay && imageOverlay}
          </ImageWrapper>
        ))}
   

      {/* for title/description */}
      {children}
    </div>
  );
}
