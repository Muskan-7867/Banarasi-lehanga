import Categories from "@/components/user/women/bridallehanga/components/Categories";

import React from "react";
import IndoWesternHeader from "@/components/user/men/partywearindowestern/IndoWesternHeader";
import MenPartyProducts from "@/components/user/men/partywearindowestern/MenPartyProducts";

export default function PartyWearIndoWesternpage() {
  return (
    <div className="min-h-screen">
      <IndoWesternHeader />
      <div className="flex flex-col lg:flex-row mt-12 lg:mt-20 md:mt-28 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="lg:sticky  lg: top-20 lg:h-screen lg:overflow-y-hidden lg:pr-8">
          <Categories />
        </div>

        <div className="flex-1 lg:overflow-y-auto">
          <MenPartyProducts />
        </div>
      </div>
    </div>
  );
}
