
import ImageWrapper from "@/components/wrappers/productcard/ImageWrapper";
import React from "react";

interface MenProductCardProps {
  images: { src: string; alt: string }[]; 

  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
}

export default function MenProductCard({ children, imageOverlay, images }: MenProductCardProps) {
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

      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}
