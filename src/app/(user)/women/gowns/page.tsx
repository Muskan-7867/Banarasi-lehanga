// import Categories from "@/components/user/bridal/bridallehanga/components/Categories";

import GownHeader from "@/components/user/women/gowns/GownHeader";
import GownProducts from "@/components/user/women/gowns/GownProducts";
import React from "react";

export default function GownsPage() {
  return (
    <div className="min-h-screen">
      <GownHeader/>
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        {/* <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories/>
        </div> */}

        {/* Scrollable ProductsSection */}
        <div className="flex-1 lg:overflow-y-auto">
          <GownProducts />
        </div>
      </div>
    </div>
  );
}
