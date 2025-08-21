"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

export interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string | StaticImageData;
  highlightText?: string;
  onclick?: () => void;
}

export const CommonBanner: React.FC<BannerProps> = ({
  title,
  subtitle,
  buttonText,
  imageUrl,
  highlightText,
  onclick
}) => {
  return (
    <section className="w-full relative bg-white px-28 transition-all duration-700">
      {/* Image Container */}
      <div className="w-full relative h-64 sm:h-80 md:h-96 lg:h-[630px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          quality={100}
          className="object-cover"
          priority
        />
        
        {/* Dark Overlay for Better Text Visibility */}
        <div className="absolute inset-0  bg-opacity-30 md:bg-opacity-20 pointer-events-none"></div>
        
        {/* Text Overlay - Positioned on Left Side */}
        <div className="absolute inset-0 flex items-center justify-start z-10">
          <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-start text-left p-6 md:p-8 lg:p-12 text-white">
            {highlightText && (
              <p className="text-sm md:text-base mb-2 tracking-wider font-medium bg-black bg-opacity-50 px-3 py-1 rounded">
                {highlightText}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide drop-shadow-md">
              {title}
            </h2>
            <p className="mt-3 md:mt-4 text-base md:text-lg font-medium max-w-md drop-shadow-md">
              {subtitle}
            </p>
            <button 
              onClick={onclick} 
              className="mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-3 bg-white text-black font-semibold text-sm tracking-widest hover:bg-gray-200 transition uppercase cursor-pointer z-20 relative"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};