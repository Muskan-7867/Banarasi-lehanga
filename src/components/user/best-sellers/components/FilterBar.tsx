"use client";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function FilterBar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 md:p-4 border-b border-gray-200 gap-2 md:gap-0">
      {/* Left section */}
      <div className="flex flex-wrap gap-2">
        {["Size", "Color", "Price"].map((label) => (
          <button
            key={label}
            className="flex items-center gap-1 border border-black rounded-full px-2 py-1 text-xs md:text-sm hover:bg-gray-50"
          >
            <span>{label}</span>
            <ChevronDown size={14} />
          </button>
        ))}
      </div>

      {/* Right section */}
      <div className="w-full md:w-72 flex justify-start md:justify-end">
        <button className="flex justify-between w-full items-center border border-black rounded-full px-3 py-2 text-xs md:text-sm hover:bg-gray-50">
          <span>Sort by Featured</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
