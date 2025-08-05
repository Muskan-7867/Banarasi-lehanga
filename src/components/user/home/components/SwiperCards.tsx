import { CardCarousel } from "@/components/ui/SwiperCard";
import React from "react";

export default function SwiperCards() {
  const images = [
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/rani_pink_saree_with_bandhani_jaal_and_cutdana-sg264507_2.jpg?w=1000&",
      alt: "Image 1"
    },
    {
      src: "https://kalki.gumlet.io/cdn/shop/files/blue-silk-kurta-sharara-suit-with-cutdana-sequins-work-sg247642-1.jpg?w=1000&",
      alt: "Image 1"
    }
  ];

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold app-text-color text-center mb-2">
        Trending Looks To Watch
      </h1>

      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={false}
        showNavigation={true}
      />
    </div>
  );
}
