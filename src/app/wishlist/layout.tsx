import Footer from "@/components/user/footer/Footer";
import MainNavbar from "@/components/user/navbar/MainNavbar";
import React from "react";

export default function WishlistLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}
