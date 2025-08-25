"use client"
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface BannerProps {
  image: {
    src: string | StaticImageData;
    alt: string;
  }[];
  aspectRatio?: string;
  autoPlay?: boolean;
  interval?: number; 
  showNavigation?: boolean;
  priority?: boolean;
}

export default function Banner({
  image,
  aspectRatio = "16/6",
  autoPlay = true,
  interval = 2000,
  showNavigation = true,
  priority = false,
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? image.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === image.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  React.useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, );

  if (image.length === 0) return null;

  return (
    <div className="w-full" style={{ aspectRatio }}>
      <div className="relative w-full h-full">
        <Image
          src={image[currentIndex].src}
          alt={image[currentIndex].alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
        />

        {showNavigation && image.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              aria-label="Previous image"
            >
              <SlArrowLeft size={28} />
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              aria-label="Next image"
            >
              <SlArrowRight size={28} />
            </button>
          </>
        )}

        {/* Indicator dots */}
        {image.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {image.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}