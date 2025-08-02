import { CardCarousel } from "@/components/ui/SwiperCard";
import React from "react";

export default function SwiperCards() {
  const images = [
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 1"
    },
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 2"
    },
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 3"
    },
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 4"
    },
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 1"
    },
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 2"
    },
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 3"
    },
    {
      src: "http://5.imimg.com/data5/SELLER/Default/2022/2/MD/QV/DK/83545762/g-500x500.jpeg",
      alt: "Image 3"
    }
  ];

  return (
    <div className="pt-40">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={false}
        showNavigation={true}
      />
    </div>
  );
}
