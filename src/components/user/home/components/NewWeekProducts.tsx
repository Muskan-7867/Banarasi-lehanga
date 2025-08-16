import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import React from "react";

export default function NewWeekProducts() {
  return (
    <div className="flex justify-around px-1 py-8">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          New This Week
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/purple-printed-sharara-set-sg339515-1.jpg?v=1754302229", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Black Floral Printed Anarkali Set"
              price={5000}
            /> 
          </ProductCard>
               <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/pastel-blue-kurta-set-with-mirror-embroidery-sg335692-1.jpg?v=1754139319", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Pastel Blue Kurta Set With Mirror Embroidery

"
              price={5000}
            />
          </ProductCard>
               <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/bottle-green-tissue-lehenga-choli-with-floral-print-sg336658-1.jpg?v=1754907281", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Bottle Green Tissue Lehenga Choli With Floral Print"
              price={5000}
            />
          </ProductCard>
               <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/yellow-chinon-indo-western-set-with-embroidered-jacket-sg329648-1.jpg?v=1754907281", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Yellow Chinon Indo Western Set With Embroidered Jacket"
              price={5000}
            />
          </ProductCard>
        </div>
      </div>
    </div>
  );
}
