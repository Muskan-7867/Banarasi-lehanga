
import ImageWrapper  from "@/components/wrappers/productcard/ImageWrapper";
import React from "react";

interface MenProductCard2Props {
  images: { src: string; alt: string }[]; 
  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
}

export default function MenProductCard2({
  images,
  children,
  imageOverlay
}: MenProductCard2Props) {
   return (
    <div className="w-full relative p-1 sm:p-3">
      {images.map((image, index) => (
        <ImageWrapper
          key={index}
          src={image.src}
          alt={image.alt}
          quality={1000}
          className="w-full h-full object-cover"
        >
          {imageOverlay && imageOverlay}
        </ImageWrapper>
      ))}
      {children}
    </div>
  );
}

