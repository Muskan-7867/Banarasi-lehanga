import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import React from "react";

export default function SecondProductSection() {
  return (
    <div className="flex justify-around px-1 py-2">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          Ready to Ship Styles
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard
            images={[
              {
                src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/black-embroidered-chinon-saree-with-cut-dana-work-sg317718-1.jpg?v=1753678308",
                alt: "Image 1"
              }
            ]}
          >
            <TitleWrapper
              title="Black Embroidered Chinon Saree With Cut Dana Work"
              price={5000}
            />
          </ProductCard>
          <ProductCard
            images={[
              {
                src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/sg264506_1.jpg?v=1746858444",
                alt: "Image 1"
              }
            ]}
          >
            <TitleWrapper
              title="Red Georgette Woven Saree With Bandhani Jaal Work"
              price={5000}
            />
          </ProductCard>
          <ProductCard
            images={[
              {
                src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/beige-crepe-saree-with-black-floral-print-and-embellished-border-sg319419-1.jpg?v=1754042943",
                alt: "Image 1"
              }
            ]}
          >
            <TitleWrapper
              title="Beige Crepe Saree With Black Floral Print And Embellished Border"
              price={5000}
            />
          </ProductCard>
          <ProductCard
            images={[
              {
                src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/yellow_lucknowi_chikankari_sequin_saree_with_unsti-sg217157_17.jpg?v=1746876893",
                alt: "Image 1"
              }
            ]}
          >
            <TitleWrapper
              title="Yellow Lucknowi Chikankari Sequin Saree With Unstitched Blouse Piece"
              price={5000}
            />
          </ProductCard>
        </div>
      </div>
    </div>
  );
}
