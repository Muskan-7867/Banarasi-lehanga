import Categories from "@/components/user/bridal/bridallehanga/components/Categories";
import JewelleryHeader from "@/components/user/women/artificialjewellery/JewelleryHeader";
import JewelleryProducts from "@/components/user/women/artificialjewellery/JewelleryProducts";


import React from "react";

export default function JewelleryPage() {
  return (
    <div className="min-h-screen">
      <JewelleryHeader/>
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories/>
        </div>

        {/* Scrollable ProductsSection */}
        <div className="flex-1 lg:overflow-y-auto">
          <JewelleryProducts />
        </div>
      </div>
    </div>
  );
}
