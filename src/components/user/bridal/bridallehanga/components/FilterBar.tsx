"use client";
import { staticColors, staticSizes } from "@/components/data/categories";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import ReactSlider from "react-slider";

type FilterBarProps = {
  onFilterChange?: (filters: {
    size?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
};

export default function FilterBar({
  onFilterChange = () => {}
}: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    size?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
  }>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  // ✅ Deduplicate size names
  const uniqueSizes = Array.from(new Set(staticSizes.map((s) => s.name)));

  const dropdownOptions: Record<string, string[]> = {
    Size: uniqueSizes,
    Color: staticColors.map((c) => c.name)
  };

  const handleSelect = useCallback(
    (label: string, option: string) => {
      const updated = { ...filters, [label.toLowerCase()]: option };
      setFilters(updated);
      onFilterChange(updated);
      setActiveDropdown(null);
    },
    [filters, onFilterChange]
  );

  const handlePriceChange = useCallback(
    (value: [number, number]) => {
      setPriceRange(value);
      const updated = { ...filters, minPrice: value[0], maxPrice: value[1] };
      setFilters(updated);
      onFilterChange(updated);
    },
    [filters, onFilterChange]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange(filters);
    }, 300);

    return () => clearTimeout(handler);
  }, [filters, onFilterChange]);

  return (
    <div className="flex flex-col gap-4 hide-scrollbar">
      <div className="flex flex-wrap gap-2 relative hide-scrollbar">
        {Object.keys(dropdownOptions).map((label) => (
          <div key={label} className="relative hide-scrollbar">
            <button
              onClick={() => toggleDropdown(label)}
              className="flex items-center gap-1 border border-black rounded-full px-3 py-1 text-xs md:text-sm hover:bg-gray-50"
            >
              <span>{label}</span>
              <ChevronDown size={14} />
            </button>

            {activeDropdown === label && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10 hide-scrollbar">
                {dropdownOptions[label].map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm hide-scrollbar"
                    onClick={() => handleSelect(label, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* ✅ Price Filter */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Price")}
            className="flex items-center gap-1 border border-black rounded-full px-3 py-1 text-xs md:text-sm hover:bg-gray-50 "
          >
            <span>Price</span>
            <ChevronDown size={14} />
          </button>

          {activeDropdown === "Price" && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4 hide-scrollbar">
              <p className="text-sm font-semibold mb-2">
                ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
              </p>
              <ReactSlider
                className="h-2 bg-gray-200 rounded-md"
                thumbClassName="h-4 w-4 bg-red-500 rounded-full cursor-pointer"
                trackClassName="h-2 bg-red-300 rounded-md"
                min={0}
                max={200000}
                step={1000}
                value={priceRange}
                onChange={handlePriceChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
