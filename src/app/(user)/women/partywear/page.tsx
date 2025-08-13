

import Categories from "@/components/user/women/bridallehanga/components/Categories";
import Header from "@/components/user/women/bridallehanga/components/Header";
import ProductsSection from "@/components/user/women/bridallehanga/components/ProductsSection";
import React from "react";

export default function BridalLehanga() {
  return (
    <div className="min-h-screen">
      <Header/>
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories/>
        </div>

        {/* Scrollable ProductsSection */}
        <div className="flex-1 lg:overflow-y-auto">
          <ProductsSection />
        </div>
      </div>
    </div>
  );
}
