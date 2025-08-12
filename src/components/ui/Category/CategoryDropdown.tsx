import React from "react";
import { subcategories } from "./SubCategories";
import Image from "next/image"; // Using Next.js Image component for optimized images

interface CategoryDropdownProps {
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredCategory: string;
}

function CategoryDropdown({
  setShowDropdown,
  hoveredCategory
}: CategoryDropdownProps) {
  const sareeCategories = [
    {
      name: "Festive Saree",
      image:
        "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Festive Saree Collection"
    },
    {
      name: "Holdi Saree",
      image:
        "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Holi Saree Collection"
    },
    {
      name: "Mehendi Saree",
      image:
        "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Mehendi Saree Collection"
    },
    {
      name: "Partywear",
      image:
        "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Partywear Saree Collection"
    },
    {
      name: "Wedding Saree",
      image:
        "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Wedding Saree Collection"
    }
  ];

  return (
    <div
      className="absolute top-full left-0 right-0 z-10 h-auto bg-white px-4 "
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="mx-auto flex w-full gap-8">
        {/* Left side - categories list */}
        <div className="w-64 bg-pink-50 p-4 ">
          <h3 className="font-bold text-lg mb-4 text-gray-800">
            {hoveredCategory}
          </h3>
          <div className="space-y-2">
            {subcategories[hoveredCategory]?.map((subcategory: string) => (
              <div
                key={subcategory}
                className="text-gray-700 text-base hover:bg-pink-100 hover:text-pink-600 cursor-pointer p-2 rounded-md transition-colors"
              >
                {subcategory}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - image grid */}
        <div className="flex flex-col p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sareeCategories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden shadow-md w-50 h-50 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    width={100}
                    height={180}
                    quality={100}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;
