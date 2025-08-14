import React, { useEffect, useState } from "react";
import { subcategories } from "./SubCategories";
import Image from "next/image";

interface CategoryDropdownProps {
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredCategory: string;
}

// Define image collections for each subcategory
const subcategoryImages: Record<string, Array<{name: string, image: string, alt: string}>> = {
  "Red Lehenga": [
    {
      name: "Red Bridal Lehenga 1",
      image: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Red Bridal Lehenga with heavy embroidery"
    },
    {
      name: "Red Bridal Lehenga 2",
      image: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Red Designer Lehenga with sequins"
    }
  ],
  "White Lehenga": [
    {
      name: "White Bridal Lehenga 1",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "White Bridal Lehenga with pearl work"
    },
    {
      name: "White Bridal Lehenga 2",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "White Designer Lehenga with lace"
    }
  ],
  "Designer Lehenga": [
    {
      name: "Designer Lehenga 1",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Designer Lehenga by Sabyasachi"
    },
    {
      name: "Designer Lehenga 2",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Designer Lehenga by Manish Malhotra"
    }
  ],
    "Custom Lehenga": [
    {
      name: "Designer Lehenga 1",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Designer Lehenga by Sabyasachi"
    },
    {
      name: "Designer Lehenga 2",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Designer Lehenga by Manish Malhotra"
    }
  ],
  // Add more subcategories and their images as needed
  "Cocktail Dresses": [
    {
      name: "Black Cocktail Dress",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Elegant black cocktail dress"
    }
  ],
    "Evening Gowns": [
    {
      name: "Black Cocktail Dress",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Elegant black cocktail dress"
    }
  ],
    "Party Sarees": [
    {
      name: "Black Cocktail Dress",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Elegant black cocktail dress"
    }
  ],
  "Sequinned Outfits" : [
     {
      name: "Red Bridal Lehenga 1",
      image: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Red Bridal Lehenga with heavy embroidery"
    },
  ],
     "Bridal Gowns": [
    {
      name: "Black Cocktail Dress",
      image: "https://in.kalkifashion.com/cdn/shop/files/saree-under-inr-8999-menu.jpg?v=10076191457294965183",
      alt: "Elegant black cocktail dress"
    }
  ],

};


function CategoryDropdown({
  setShowDropdown,
  hoveredCategory
}: CategoryDropdownProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

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
                  selectedSubcategory === subcategory ? "bg-gray-100 font-medium" : ""
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
            {(selectedSubcategory 
              ? subcategoryImages[selectedSubcategory] || []
              : subcategoryImages[subcategories[hoveredCategory]?.[0]] || []
            ).map((item, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;