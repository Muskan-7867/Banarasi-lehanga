"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  images: { src: string; alt: string }[];
}

export default function ProductImage({ images }: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-20">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`relative w-full h-20 border rounded-lg overflow-hidden cursor-pointer ${
              selectedImage.src === img.src ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={500}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <div className="relative overflow-hidden rounded-lg shadow-lg flex-1">
        <div
          className={`relative w-full h-[40rem] md:h-[700px] ${
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={selectedImage.src}
            alt={selectedImage.alt}
            width={500}
            height={1000}
            className="object-cover w-full h-full"
            style={{
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: isZoomed ? "scale(2)" : "scale(1)",
              transition: "transform 0.2s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}
