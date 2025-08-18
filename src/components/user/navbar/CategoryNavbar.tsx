"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryDropdown from "@/components/ui/Category/CategoryDropdown";

interface CategoryNavbarProps {
  categories: string[];
  categoryRoutes: Record<string, string>;
  activeColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
  maxVisibleItems?: number;
  dropdownComponent?: React.ComponentType<{
    setShowDropdown: (show: boolean) => void;
    hoveredCategory: string;
  }>;
   dropdownOnlyFor?: string;
}

const CategoryNavbar: React.FC<CategoryNavbarProps> = ({
  categories = [],
  categoryRoutes = {},
  activeColor = "text-app-color",
  borderColor = "border-app-color",
  textColor = "text-black",
  hoverColor = "hover:text-app-color",
  maxVisibleItems = 5,
  dropdownComponent: DropdownComponent = CategoryDropdown,
  dropdownOnlyFor = ""
}) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
    width: 0
  });
  console.log(dropdownPosition)

  const handleCategoryClick = (category: string) => {
    const path = categoryRoutes[category];
    if (path) {
      setActiveCategory(category);
      router.push(path);
    } else {
      console.warn("No path defined for:", category);
    }
  };

  const handleCategoryHover = (
    category: string,
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    if (!dropdownOnlyFor || category === dropdownOnlyFor) {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      setHoveredCategory(category);
      setShowDropdown(true);
      setDropdownPosition({
        left: rect.left,
        width: rect.width
      });
    }
  };

  const uniqueCategories = [...new Set(categories)];
  const visibleCategories = showMore
    ? uniqueCategories
    : uniqueCategories.slice(0, maxVisibleItems);

  return (
    <div className="border-b border-gray-300 bg-white relative">
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
                      ? `${activeColor} border-b-2 ${borderColor}`
                      : `${textColor} ${hoverColor}`
                  }`}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={(e) => handleCategoryHover(category, e)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showDropdown && hoveredCategory && DropdownComponent && (
        <DropdownComponent
          setShowDropdown={setShowDropdown}
          hoveredCategory={hoveredCategory}
        />
      )}

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
                      ? `${activeColor} border-b-2 ${borderColor}`
                      : textColor
                  }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>

          {!showMore && uniqueCategories.length > maxVisibleItems && (
            <button
              onClick={() => setShowMore(true)}
              className={`ml-2 text-sm font-medium ${activeColor} whitespace-nowrap`}
            >
              More ▼
            </button>
          )}

          {showMore && (
            <button
              onClick={() => setShowMore(false)}
              className={`ml-2 text-sm font-medium ${activeColor} whitespace-nowrap`}
            >
              Less ▲
            </button>
          )}
        </div>

        {/* Dropdown for mobile when "More" is clicked */}
        {showMore && (
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            {uniqueCategories.slice(maxVisibleItems).map((category) => (
              <div
                key={category}
                className={`px-2 py-2 text-sm font-medium cursor-pointer
                  ${activeCategory === category ? activeColor : textColor}`}
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
};

export default CategoryNavbar;