import CategoryHeader from "@/components/ui/Category/CategoryHeader";
import React from "react";

export default function Header() {
  return (
    <div>
      <CategoryHeader
        title="Home / Bridal Lehanga"
        subtitle="Rakhi-Ready & Pooja-Perfect Looks"
        offerText="Shop for INR 11,999 get 7% off*"
        code="FEST7"
        tncLink="/terms-and-conditions"
      />
    </div>
  );
}
