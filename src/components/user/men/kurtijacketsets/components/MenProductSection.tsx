import React from "react";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import SectionHeading from "@/components/ui/Category/CategorySectionHeading";
import MenProductCard2 from "../../components/MenProductCard2";
import FilterBar from "@/components/user/women/bridallehanga/components/FilterBar";


export default function MenProductSection() {
  const data = [
    {
      image:
        "https://kalki.gumlet.io/cdn/shop/files/1-mens-highlight-desk-new-arrivals-all-countries-1-8-25.jpg?w=461&",
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, unde!",
      price: 2000
    },
    {
      image:
        "https://kalki.gumlet.io/cdn/shop/files/1-mens-highlight-desk-new-arrivals-all-countries-1-8-25.jpg?w=461&",
      name: "Saree",
      price: 2000
    },
    {
      image:
        "https://kalki.gumlet.io/cdn/shop/files/1-mens-highlight-desk-new-arrivals-all-countries-1-8-25.jpg?w=461&",
      name: "Saree",
      price: 2000
    },
    {
      image:
        "https://kalki.gumlet.io/cdn/shop/files/1-mens-highlight-desk-new-arrivals-all-countries-1-8-25.jpg?w=461&",
      name: "Saree",
      price: 2000
    }
  ];
  return (
    <div className="flex-1 text-black">
      <SectionHeading>Stylish Kurta Jacket Sets for Men</SectionHeading>
      <FilterBar/>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
        {data.map((item, index) => (
          <MenProductCard2 key={index}>
            <TitleWrapper title={item.name} price={item.price} />
          </MenProductCard2>
        ))}
      </div>
    </div>
  );
}