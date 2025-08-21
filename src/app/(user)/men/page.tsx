// import CategorySection from "@/components/user/men/components/CategorySection";
import MenBanner from "@/components/user/men/banners/MenBanner";
import MenProducts from "@/components/user/men/components/MenProducts";
import React from "react";
// import MenBanner2 from "@/components/user/men/banners/MenBanner2";
import CollectionSection from "@/components/user/men/components/CollectionSection";
import MenDescription from "@/components/user/men/components/MenDescription";
import VideoCardSection from "@/components/user/men/components/VideoCardSection";

export default function MenPage() {
  return (
    <>
      <MenProducts />
      <MenBanner />

      <CollectionSection />
      <VideoCardSection />
      <MenDescription />
    </>
  );
}
