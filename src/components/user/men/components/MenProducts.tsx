import React from "react";
import MenProductCard from "./MenProductCard";
import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";

import MenHeader from "./MenHeader";

export default function MenProducts() {
  return (
    <div className="flex justify-center px-2 py-4">
      <div className="w-full max-w-[90rem]">
        <MenHeader />

        {/* Responsive grid */}
        <div className="flex justify-around px-1 py-2">
          <div className="w-full max-w-[94rem]">
            {/* <h1 className="text-2xl font-bold text-center text-black mb-4">
                 Ready to Ship Styles
               </h1> */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4  gap-1">
              <MenProductCard
                images={[
                  {
                    src: "https://kalki.gumlet.io/cdn/shop/files/wine-sherwani-set-with-minimalist-design-sg270039-2_c907a2b9-dde1-401b-bcc9-944322a24398.jpg?w=370&",
                    alt: "Image 1"
                  }
                ]}
                imageOverlay={<ImageNamingOverlay title="24 Hr dispatch" />}
              />
              <MenProductCard
                images={[
                  {
                    src: "https://media.istockphoto.com/id/1201026026/photo/stylish-man-wearing-sunglasses-and-white-shirt-city-life.jpg?s=612x612&w=0&k=20&c=Lw3M3Eq3Cwwc7OqR4z3xVqEQvRBrGvQXbUDY8jB7eOE=",
                    alt: "Image 1"
                  }
                ]}
                imageOverlay={
                  <ImageNamingOverlay title="Wedding Wardrobe '25" />
                }
              />
              <MenProductCard
                images={[
                  {
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1WmQVCapJnUp_8f1RfsC2uZ2WglkXf5jCf1fgWvQT4ZAf9p-D1Y7PpiZeyd3vKey2PQ&usqp=CAU",
                    alt: "Image 1"
                  }
                ]}
                imageOverlay={
                  <ImageNamingOverlay title="Independence Specials" />
                }
              />
              <MenProductCard
                images={[
                  {
                    src: "https://t3.ftcdn.net/jpg/02/50/84/98/360_F_250849890_qxH2MudfMq5AFSqHrOp5oA9NqykT14Ti.jpg",
                    alt: "Image 1"
                  }
                ]}
                imageOverlay={<ImageNamingOverlay title="Bestsellers" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
