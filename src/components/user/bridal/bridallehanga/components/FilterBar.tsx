"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function FilterBar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [sortDropdown, setSortDropdown] = useState(false);
  console.log(sortDropdown)

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
    setSortDropdown(false);
  };


  const dropdownOptions: Record<string, string[]> = {
    Size: ["XS", "S", "M", "L", "XL"],
    Color: ["Red", "Blue", "Green", "Black", "White"],
    Price: ["Under $50", "$50 - $100", "$100 - $200", "Over $200"]
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2 md:p-4 border-b border-gray-200 gap-2 md:gap-0 relative">
      {/* Left section */}
      <div className="flex flex-wrap gap-2 relative">
        {["Size", "Color", "Price"].map((label) => (
          <div key={label} className="relative">
            <button
              onClick={() => toggleDropdown(label)}
              className="flex items-center gap-1 border border-black rounded-full px-2 py-1 text-xs md:text-sm hover:bg-gray-50"
            >
              <span>{label}</span>
              <ChevronDown size={14} />
            </button>

            {activeDropdown === label && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {dropdownOptions[label].map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      // Handle selection here
                      console.log(`Selected ${option} for ${label}`);
                      setActiveDropdown(null);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>


    </div>
  );
}
