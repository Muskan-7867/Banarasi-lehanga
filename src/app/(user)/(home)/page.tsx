import React from "react";
import Banner from "@/components/user/home/components/Banner";
import Features from "@/components/user/home/components/Features";
import Products from "@/components/user/home/components/Products";
import SwiperCards from "@/components/user/home/components/SwiperCards";
import StyleProducts from "@/components/user/home/components/StyleProducts";
import SecondBanner from "@/components/user/home/components/SecondBanner";
import ImageSections from "@/components/user/home/components/ImageSections";

export default function Homepage() {
  return (
    <div className=" w-full min-h-screen flex flex-col">
      <Banner />
      <Features />
      <Products />
      <SwiperCards />
      <StyleProducts />
      <Products />
      <SecondBanner />
      <StyleProducts />
      <ImageSections />
      <StyleProducts />
    </div>
  );
}
