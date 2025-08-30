import React, { useEffect, useState } from "react";
import { subcategories } from "./SubCategories";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryDropdownProps {
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredCategory: string;
}

const subcategoryImages: Record<
  string,
  Array<{ name: string; image: string; alt: string; link?: string | undefined }>
> = {
  "Bridal Jewellery": [
    {
      name: "Bridal Necklace Set",
      image:
        "https://res.cloudinary.com/dwgxfctju/image/upload/fl_preserve_transparency/v1756110087/Screenshot_20250825_134119_sjezbd.jpg?_s=public-apps",
      alt: "Elegant bridal necklace set",
      link: "/women/artificialjewellery "
    },
    {
      name: "Bridal Set",
      image:
        "https://res.cloudinary.com/debzdd4wk/image/upload/v1756289253/set2_dxbykb.jpg",
      alt: "Beautiful bridal earrings",
      link: "/women/artificialjewellery"
    }
  ],
  "Party Wear Set": [
    {
      name: "Sparkling party wear necklace",
      image:
        "https://res.cloudinary.com/debzdd4wk/image/upload/v1756289253/set_kxexqc.jpg",
      alt: "necklace"
    },
    {
      name: "Party Wear Necklace",
      image:
        "https://lh3.googleusercontent.com/pw/AP1GczOtdvr9I5fai5mSGUbJqk-EHtei7iqDX880JiSnvYTpUEzvfPA6LuLKuYJcYR-xwB0yLPY7rO2dHEdwiGlz9VWC_RpX3Lkw-p-B7xqwhvbLKuWo-NDDxUPd0ZAgvOD3frf4YZcukYfePN07lsueTe1YLw=w720-h663-s-no-gm?authuser=0",
      alt: "Sparkling party wear necklace"
    },
    {
      name: "Silver Party Wear Necklace",
      image:
        "https://res.cloudinary.com/debzdd4wk/image/upload/v1756289252/set3_zmr6w7.jpg",
      alt: "Sparkling party wear necklace"
    }
  ],
  Chudas: [
    {
      name: "Party Wear Necklace",
      image:
        "https://res.cloudinary.com/dwgxfctju/image/upload/fl_preserve_transparency/v1756110110/Screenshot_20250825_134157_wew2fk.jpg?_s=public-apps",
      alt: "Sparkling party wear necklace"
    }
  ],
  Kalire: [
    {
      name: "Wedding Kalire",
      image:
        "https://swadeshiclick.com/api/assets/uploads/media/IMG_20200110_173148-scaled.webp",
      alt: "Sparkling party wear necklace"
    }
  ],

  "American Diamond Jewellery": [
    {
      name: "Diamond Jewellery",
      image:
        "https://res.cloudinary.com/debzdd4wk/image/upload/v1756289253/set_kxexqc.jpg",
      alt: "Sparkling party wear necklace"
    }
  ],
  "Maiyan Stuff": [
    {
      name: "Maiyan Stuff",

      image:
        "    https://slawawalczak.com/wp-content/uploads/2015/09/Maya-ceremony-sikh-wedding-photography_0001.jpg",
      alt: "Sparkling party wear necklace"
    }
  ],
  "Unstiched Suits": [
    {
      name: "Black Unstiched Suits",

      image:
        "https://res.cloudinary.com/debzdd4wk/image/upload/v1756290035/un-suit_wxtqfy.jpg",
      alt: "Sparkling party wear necklace",
      link: "/women/suits"
    }
  ],

  "Unstiched Partywear Anarkali Suits": [
    {
      name: "",

      image: "https://img.faballey.com/images/Product/ILK00008Z/z5.jpg",
      alt: "Sparkling party wear necklace",
      link: "/women/suits"
    }
  ],

  "Readymate Suits": [
    {
      name: "",

      image:
        "https://res.cloudinary.com/debzdd4wk/image/upload/v1756290035/un-suit2_ycdwep.jpg",
      alt: "Sparkling party wear necklace",
      link: "/women/suits"
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
  const router = useRouter();

  return (
    <div
      className="absolute top-full left-0 right-0 z-10 bg-white px-4 shadow-lg"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)} // Add this line
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
            {subcategoryImages[
              selectedSubcategory || subcategories[hoveredCategory]?.[0]
            ]?.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col cursor-pointer"
               onClick={() => {
  if (item.link) {
    router.push(item.link);
  }
}}
              >
                <div className="relative aspect-square w-42 h-42 overflow-hidden rounded-md mb-2">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-gray-800 text-sm font-medium">{item.name}</p>
              </div>
            )) || <p className="text-gray-500">No images available</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;
