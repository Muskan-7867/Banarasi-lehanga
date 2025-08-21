
import Categories from "@/components/user/bridal/bridallehanga/components/Categories";
import FulkariHeader from "@/components/user/women/fulkaries/FulkariHeader";
import FulkariProducts from "@/components/user/women/fulkaries/FulkariProducts";
import React from "react";

export default function FulkariesPage() {
  return (
    <div className="min-h-screen">
      <FulkariHeader/>
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories/>
        </div>

        {/* Scrollable ProductsSection */}
        <div className="flex-1 lg:overflow-y-auto">
          <FulkariProducts />
        </div>
      </div>
    </div>
  );
}
