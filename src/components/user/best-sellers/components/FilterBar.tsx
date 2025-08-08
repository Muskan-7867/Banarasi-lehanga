"use client";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function FilterBar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 md:p-4 border-b border-gray-200 gap-2 md:gap-0">
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-1 border border-black rounded-full px-2 py-1 text-xs md:text-sm hover:bg-gray-50">
          <span>Size</span>
          <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-1 border border-black rounded-full px-2 py-1 text-xs md:text-sm hover:bg-gray-50">
          <span>Color</span>
          <ChevronDown size={14} />
        </button>
        <button className="flex items-center gap-1 border border-black rounded-full px-2 py-1 text-xs md:text-sm hover:bg-gray-50">
          <span>Price</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="w-full md:w-auto">
        <select className="w-full md:w-[16rem] border border-black rounded-full px-3 py-1 md:py-2 text-xs md:text-sm">
          <option className="text-black">Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  );
}