"use client";

import React, { useState } from "react";

export default function SecondNavbar() {
  const [activeCategory, setActiveCategory] = useState("BRIDAL");
  const [showMore, setShowMore] = useState(false);

  const categories = [
    "BRIDAL",
    "WOMEN",
    "MEN",
    "WEDDING",
    "BEST SELLERS",
    "GOWNS",
    "LEHENGAS", 
    "JEWELRY",
    "ACCESSORIES",
    "FOOTWEAR",
    "KIDS",
    "HOME",
    "SALE",
    "NEW ARRIVALS"
  ];

  // Deduplicate categories
  const uniqueCategories = [...new Set(categories)];

  // For mobile, we'll show a condensed version with "More" dropdown
  const visibleCategories = showMore ? uniqueCategories : uniqueCategories.slice(0, 5);

  return (
    <div className="border-b border-gray-300">
      {/* Desktop View (hidden on mobile) */}
      <div className="hidden md:block">
        <div className="flex overflow-x-auto hide-scrollbar">
          <ul className="flex w-full justify-around cursor-pointer">
            {uniqueCategories.map((category) => (
              <li
                key={category}
                className={`px-3 py-3 text-sm font-medium transition-colors duration-200 
                  ${
                    activeCategory === category
                      ? "app-text-color border-b-2 border-app-color"
                      : "text-black hover:text-app-color"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile View (hidden on desktop) */}
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex overflow-x-auto hide-scrollbar space-x-4">
            {visibleCategories.map((category) => (
              <div
                key={category}
                className={`px-2 py-1 text-sm font-medium whitespace-nowrap
                  ${
                    activeCategory === category
                      ? "app-text-color border-b-2 border-app-color"
                      : "text-black"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
          
          {!showMore && uniqueCategories.length > 5 && (
            <button 
              onClick={() => setShowMore(true)}
              className="ml-2 text-sm font-medium app-text-color whitespace-nowrap"
            >
              More ▼
            </button>
          )}
          
          {showMore && (
            <button 
              onClick={() => setShowMore(false)}
              className="ml-2 text-sm font-medium app-text-color whitespace-nowrap"
            >
              Less ▲
            </button>
          )}
        </div>

        {/* Dropdown for mobile when "More" is clicked */}
        {showMore && (
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            {uniqueCategories.slice(5).map((category) => (
              <div
                key={category}
                className={`px-2 py-2 text-sm font-medium
                  ${
                    activeCategory === category
                      ? "app-text-color"
                      : "text-black"
                  }`}
                onClick={() => {
                  setActiveCategory(category);
                  setShowMore(false);
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}