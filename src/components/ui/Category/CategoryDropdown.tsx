import React, { useEffect, useState } from "react";
import { subcategories } from "./SubCategories";
import Image from "next/image";

interface CategoryDropdownProps {
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredCategory: string;
}


const subcategoryImages: Record<
  string,
  Array<{ name: string; image: string; alt: string }>
> = {
  "Bridal Jewellery": [
    {
      name: "Bridal Necklace Set",
      image:
        "https://res.cloudinary.com/dwgxfctju/image/upload/fl_preserve_transparency/v1756110087/Screenshot_20250825_134119_sjezbd.jpg?_s=public-apps",
      alt: "Elegant bridal necklace set"
    },
    {
      name: "Bridal Earrings",
      image: "https://example.com/earrings.jpg",
      alt: "Beautiful bridal earrings"
    }
  ],
  "Party Wear Set": [
    {
      name: "Party Wear Necklace",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOtdvr9I5fai5mSGUbJqk-EHtei7iqDX880JiSnvYTpUEzvfPA6LuLKuYJcYR-xwB0yLPY7rO2dHEdwiGlz9VWC_RpX3Lkw-p-B7xqwhvbLKuWo-NDDxUPd0ZAgvOD3frf4YZcukYfePN07lsueTe1YLw=w720-h663-s-no-gm?authuser=0",
      alt: "Sparkling party wear necklace"
    }
  ],
   "Chudas": [
    {
      name: "Party Wear Necklace",
      image: "https://res.cloudinary.com/dwgxfctju/image/upload/fl_preserve_transparency/v1756110110/Screenshot_20250825_134157_wew2fk.jpg?_s=public-apps",
      alt: "Sparkling party wear necklace"
    }
  ]

};

function CategoryDropdown({
  setShowDropdown,
  hoveredCategory
}: CategoryDropdownProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (hoveredCategory && subcategories[hoveredCategory]?.length > 0) {
      setSelectedSubcategory(subcategories[hoveredCategory][0]);
    }
  }, [hoveredCategory]);

  return (
    <div
      className="absolute top-full left-0 right-0 z-10 bg-white px-4 shadow-lg"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="mx-auto flex w-full gap-8 py-4">
        {/* Left side - subcategories list */}
        <div className="w-64 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-4 text-gray-800">
            {hoveredCategory}
          </h3>
          <div className="space-y-2">
            {subcategories[hoveredCategory]?.map((subcategory: string) => (
              <div
                key={subcategory}
                className={`text-gray-700 text-base hover:bg-gray-100 hover:text-gray-900 cursor-pointer p-2 rounded-md transition-colors ${
                  selectedSubcategory === subcategory
                    ? "bg-gray-100 font-medium"
                    : ""
                }`}
                onClick={() => setSelectedSubcategory(subcategory)}
              >
                {subcategory}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - image grid with names */}
        <div className="flex-1 p-4">
          <h3 className="font-bold text-lg mb-6 text-gray-800">
            {selectedSubcategory || subcategories[hoveredCategory]?.[0]}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {subcategoryImages[selectedSubcategory || subcategories[hoveredCategory]?.[0]]?.map((item, index) => (
              <div key={index} className="group flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-md mb-2">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-center text-gray-800 text-sm font-medium">
                  {item.name}
                </p>
              </div>
            )) || <p className="text-gray-500">No images available</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;