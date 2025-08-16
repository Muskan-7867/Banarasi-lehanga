import React from "react";
import Features from "@/components/user/home/components/Features";
import Products from "@/components/user/home/components/Products";
import SwiperCards from "@/components/user/home/components/SwiperCards";
import StyleProducts from "@/components/user/home/components/StyleProducts";
import SecondBanner from "@/components/user/banners/SecondBanner";
import ImageSections from "@/components/user/home/components/ImageSections";
import GridBanner from "@/components/user/home/components/GridBanner";
import AppointmentBanner from "@/components/user/banners/AppointmentBanner";
import HomeBanner from "@/components/user/home/components/HomeBanner";
import SecondProductSection from "@/components/user/home/components/SecondProductSection";
import WishListProducts from "@/components/user/home/components/WishlistProducts";
import NewWeekProducts from "@/components/user/home/components/NewWeekProducts";
import BudgetProducts from "@/components/user/home/components/BudgetProducts";

export default function Homepage() {
  return (
    <div className=" w-full min-h-screen flex flex-col">
      <HomeBanner />
      <Features />
      <Products />
      <SwiperCards />

      <SecondProductSection />
      <StyleProducts />
      <SecondBanner />
      <WishListProducts />
      <ImageSections />
      <NewWeekProducts />
      <GridBanner />
      <BudgetProducts />

      <AppointmentBanner />
    </div>
  );
}
