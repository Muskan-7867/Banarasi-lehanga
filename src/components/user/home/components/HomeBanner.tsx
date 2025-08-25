import React from "react";
import Banner from "../../banners/Banner";
import { homebanner1, homebanner3 } from "@/app/constants/imagePath";

export default function HomeBanner() {
  const bannerImage = [
    {
      src: homebanner1,
      alt: "banner"
    },

    {
      src: homebanner3,
      alt: "banner"
    }
  ];

  return (
    <div>
      <Banner image={bannerImage} />
    </div>
  );
}
