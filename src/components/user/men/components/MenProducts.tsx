import React from "react";
import MenProductCard from "./MenProductCard";
import MenHeader from "./MenHeader";

export default function MenProducts() {
  return (
    <div className="flex justify-center px-2 py-4">
      <div className="w-full max-w-[90rem]">
        <MenHeader />

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 sm:gap-6">
          <MenProductCard />
          <MenProductCard />
          <MenProductCard />
          <MenProductCard />
        </div>
      </div>
    </div>
  );
}
