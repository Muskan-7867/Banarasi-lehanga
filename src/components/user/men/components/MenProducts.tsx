import React from "react";
import MenProductCard from "./MenProductCard";
import MenHeader from "./MenHeader";

export default function MenProducts() {
  return (
    <div className="flex justify-around px-1 py-2">
      <div className="max-w-[85%]">
        <MenHeader />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mt-4 gap-6">
          <MenProductCard />
          <MenProductCard />
          <MenProductCard />
          <MenProductCard />
     
           

        </div>
      </div>
    </div>
  );
}
