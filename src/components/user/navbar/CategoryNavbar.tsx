"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CategoryDropdown from "@/components/ui/Category/CategoryDropdown";
import { subcategories } from "@/components/ui/Category/SubCategories";

interface CategoryNavbarProps {
  categories: string[];
  categoryRoutes: Record<string, string>;
  activeColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
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
  dropdownComponent: DropdownComponent = CategoryDropdown,
  dropdownOnlyFor = ""
}) => {
  const [activeCategory, setActiveCategory] = useState("");
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
    width: 0
  });
  
  // Add a timer to handle dropdown hiding with a delay
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCategoryClick = (category: string) => {
    const path = categoryRoutes[category];
    if (path) {
      setActiveCategory(category);
      router.push(path);
    } else {
      console.warn("No path defined for:", category);
    }
  };

  // Check if a category has subcategories
  const hasSubcategories = (category: string): boolean => {
    return !!subcategories[category] && subcategories[category].length > 0;
  };

  const handleCategoryHover = (
    category: string,
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    // Clear any existing timeout
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    
    // Only show dropdown if category has subcategories
    if (
      hasSubcategories(category) &&
      (!dropdownOnlyFor || category === dropdownOnlyFor)
    ) {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      setHoveredCategory(category);
      setShowDropdown(true);
      setDropdownPosition({
        left: rect.left,
        width: rect.width
      });
    } else {
      setShowDropdown(false);
    }
  };

  const handleNavbarMouseLeave = () => {
    // Set a timeout before hiding the dropdown
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 300); // 300ms delay
    
    setDropdownTimeout(timeout);
  };

  const handleNavbarMouseEnter = () => {
    // Clear timeout when mouse enters navbar again
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const uniqueCategories = [...new Set(categories)];

  return (
    <div 
      className="border-b border-gray-300 bg-white relative"
      onMouseLeave={handleNavbarMouseLeave}
      onMouseEnter={handleNavbarMouseEnter}
    >
      {/* Desktop View */}
      <div className="hidden md:block relative">
        <div className="flex items-center justify-center px-6 py-3">
          <ul className="flex items-center lg:space-x-18 space-x-6 cursor-pointer">
            {uniqueCategories.map((category) => (
              <li
                key={category}
                className={`py-2 text-sm font-medium transition-colors duration-200 
                  ${
                    activeCategory === category
                      ? `${activeColor} border-b-2 ${borderColor}`
                      : `${textColor} ${hoverColor}`
                  }
                  ${
                    hasSubcategories(category)
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={(e) => handleCategoryHover(category, e)}
              >
                {category}
                {hasSubcategories(category) && (
                  <span className="ml-1 text-xs">▼</span>
                )}
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
      <div className="md:hidden relative">
        <div className="flex items-center justify-center px-4 py-3">
          <div className="flex overflow-x-auto hide-scrollbar space-x-4">
            {uniqueCategories.map((category) => (
              <div
                key={category}
                className={`px-2 py-1 text-xs font-medium whitespace-nowrap
                  ${
                    activeCategory === category
                      ? `${activeColor} border-b-2 ${borderColor}`
                      : textColor
                  }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
                {hasSubcategories(category) && (
                  <span className="ml-1 text-xs">▼</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;
