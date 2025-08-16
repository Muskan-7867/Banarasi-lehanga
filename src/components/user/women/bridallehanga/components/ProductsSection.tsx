import React from "react";
import FilterBar from "./FilterBar";
import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import SectionHeading from "@/components/ui/Category/CategorySectionHeading";


export default function ProductsSection() {
  const data = [
    {
      image:
        "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, unde!",
      price: 2000
    },
    {
      image:
        "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      name: "Saree",
      price: 2000
    },
    {
      image:
        "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      name: "Saree",
      price: 2000
    },
    {
      image:
        "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      name: "Saree",
      price: 2000
    }
  ];
  return (
    <div className="flex-1 text-black">
      <SectionHeading>Indian Ethnic Wear Bestsellers</SectionHeading>
      <FilterBar />
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
        {data.map((item, index) => (
          <ProductCard key={index} images={[{src: item.image, alt: item.name}]}>
            <TitleWrapper title={item.name} price={item.price} />
          </ProductCard>
        ))}
      </div>
    </div>
  );
}