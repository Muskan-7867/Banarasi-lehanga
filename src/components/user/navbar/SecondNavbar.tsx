"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Important for client-side navigation

export default function SecondNavbar() {
  const [activeCategory, setActiveCategory] = useState("BEST SELLERS");
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();

  const categories = [
    "BEST SELLERS",
    "BRIDAL",
    "WOMEN",
    "MEN",
    "WEDDING",
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

  const categoryRoutes: Record<string, string> = {
    "BEST SELLERS": "/bestsellers",
    "BRIDAL": "/bridal",
    "WOMEN": "/women",
    "MEN": "/men",
    "WEDDING": "/wedding",
    "GOWNS": "/gowns",
    "LEHENGAS": "/lehengas",
    "JEWELRY": "/jewelry/collections",
    "ACCESSORIES": "/accessories",
    "FOOTWEAR": "/footwear",
    "KIDS": "/kids",
    "HOME": "/home-decor",
    "SALE": "/offers/sale",

    "NEW ARRIVALS": "/products/new-arrivals"
  };

  const handleCategoryClick = (category: string) => {
    const path = categoryRoutes[category];
    if (path) {
      setActiveCategory(category);
      router.push(path); // Navigate to the correct page
    } else {
      console.warn("No path defined for:", category);
    }
  };

  const uniqueCategories = [...new Set(categories)];
  const visibleCategories = showMore ? uniqueCategories : uniqueCategories.slice(0, 5);

  return (
    <div className="border-b border-gray-300 bg-white">
      {/* Desktop View */}
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
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile View */}
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
                onClick={() => handleCategoryClick(category)}
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
                className={`px-2 py-2 text-sm font-medium cursor-pointer
                  ${
                    activeCategory === category
                      ? "app-text-color"
                      : "text-black"
                  }`}
                onClick={() => {
                  setShowMore(false);
                  handleCategoryClick(category);
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
