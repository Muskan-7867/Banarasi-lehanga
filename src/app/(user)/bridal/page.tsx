
import BridalDescription from "@/components/user/bridal/BridalDescription";
import BridalJewellerySection from "@/components/user/bridal/BridalJewellerySection";
import VideoSection from "@/components/user/bridal/VideoSection";
import React from "react";



export default function BridalPage() {
  return (
    <div className="hide-horizontal-scrollbar">
      <VideoSection />
      <BridalJewellerySection />
      <BridalDescription />
    </div>
  );
}
