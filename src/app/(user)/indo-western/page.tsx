
import Categories from "@/components/user/bridallehanga/components/Categories";
import ProductsSection from "@/components/user/bridallehanga/components/ProductsSection";
import IndoHeader from "@/components/user/indowestern/components/IndoHeader";
import React from "react";

export default function Indowestern() {
  return (
    <div className="min-h-screen">
      <IndoHeader />
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories />
        </div>

        {/* Scrollable ProductsSection */}
        <div className="flex-1 lg:overflow-y-auto">
          <ProductsSection />
        </div>
      </div>
    </div>
  );
}
