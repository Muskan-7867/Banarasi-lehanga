import React from "react";
import MenProductCard2 from "./MenProductCard2";
import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";

export default function CollectionSection() {
  return (
    <div className="flex justify-around px-1 py-2">
      <div className="w-full max-w-[94rem]">
          <h1 className="text-2xl font-bold text-center text-black mb-4">
          Shop by Collection
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <MenProductCard2
                key={i}
                imageOverlay={
                  <ImageNamingOverlay
                    title="Mehandi Mastery"
                    buttonText="Shop Now"
                  />
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}
