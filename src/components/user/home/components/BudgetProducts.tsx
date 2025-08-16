import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";
import ProductCard from "@/components/ui/ProductCard";
import React from "react";

export default function BudgetProducts() {
  return (
    <div className="flex justify-around px-1 py-2">
      <div className="w-full max-w-[94rem]">
        <h1 className="text-2xl font-bold text-center text-black mb-4">
          Styles Under Budget
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
          <ProductCard
            images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/04-styles-under-budget-lehengas-400x533-21-07-25.jpg?w=380&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="Lehanga Twirls"
                subtitle="Under ₹23,999"
                buttonText="Shop Now"
              />
            }
          />
          <ProductCard  images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/01-styles-under-budget-suits-400x533-21-07-25.jpg?w=380&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="Shop Now Salwar Suits"
                  subtitle="Under ₹11,999"
                buttonText="Shop Now"
              />
            }
          />
          <ProductCard images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/02-styles-under-budget-sarees-400x533-21-07-25.jpg?w=380&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="Saree Edit "
                subtitle="Under ₹11,999"
                buttonText="Shop Now"
              />
            }
          />
          <ProductCard images={[
              { src: "https://kalki.gumlet.io/cdn/shop/files/03-styles-under-budget-mens-400x533-21-07-25.jpg?w=380&", alt: "Image 1" },
             
            ]}
            imageOverlay={
              <ImageNamingOverlay
                title="MensWear Fits"
                subtitle="Under ₹11,999"

                buttonText="Shop Now"
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
