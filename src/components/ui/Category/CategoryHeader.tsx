"use client";

import React from "react";


interface FestiveBannerProps {
  title: string;
  subtitle: string;
  offerText: string;
 
}

const CategoryHeader: React.FC<FestiveBannerProps> = ({
  title,
  subtitle,
  offerText,

}) => {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-full md:w-[85%] bg-gradient-to-r from-[#f6f0f5] to-[#f6f0f5] text-black text-sm flex flex-col md:flex-row items-center justify-between p-4 font-light tracking-wide">
        {/* Left Section */}
        <div className="flex items-center md:border-r border-black pb-2 md:pb-0 md:pr-6 w-full md:w-auto">
          <div className="text-center w-full md:w-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{title}</h2>
            <p className="text-xs md:text-sm mt-1">{subtitle}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:pl-6 text-sm w-full md:w-auto">
          <span>{offerText}</span>
          <span className="hidden md:inline">|</span>
      
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;