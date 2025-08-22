// import Categories from "@/components/user/bridal/bridallehanga/components/Categories";

import React from "react";
import PartyHeader from "../../../../components/user/women/partywear/PartyHeader";
import PartyWearProducts from "@/components/user/women/partywear/PartyWearProducts";

export default function PartyWearPage() {
  return (
    <div className="min-h-screen">
      <PartyHeader/>
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        {/* <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories/>
        </div> */}

        {/* Scrollable ProductsSection */}
        <div className="flex-1 lg:overflow-y-auto">
          <PartyWearProducts />
        </div>
      </div>
    </div>
  );
}
