import ProductCard from "@/components/ui/ProductCard";
import TitleWrapper from "@/components/wrappers/productcard/TitleWrapper";
import React from "react";

export default function WishListProducts() {
  return (
    <div className="flex justify-around px-1 py-8">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
       Most WishList Styles
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/red-silk-kurta-set-with-bandhani-print-sg318063-1.jpg?v=1750671587", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Red Silk Kurta Set With Bandhani Print"
              price={5000}
            /> 
          </ProductCard>
               <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/orange-crop-top-skirt-with-floral-cape-and-embroidery-accents-sg324411-1.jpg?v=1752561583", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Orange Crop Top Skirt With Floral Cape And Embroidery Accents"
              price={5000}
            />
          </ProductCard>
               <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/yellow_dola_silk_leheriya_woven_saree_with-sg257763_2.jpg?v=1746858537", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Yellow Dola Silk Leheriya Woven Saree With Gotta Patti Border"
              price={5000}
            />
          </ProductCard>
               <ProductCard   images={[
              { src: "https://cdn.shopify.com/s/files/1/0636/0134/4666/files/black-silk-kurta-set-with-floral-print-sg320398-2.jpg?v=1752928269", alt: "Image 1" },
             
            ]}>
            <TitleWrapper
              title="Black Silk Kurta Set With Floral Print"
              price={5000}
            />
          </ProductCard>
        </div>
      </div>
    </div>
  );
}
