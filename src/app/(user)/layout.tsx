import Footer from "@/components/user/home/components/Footer";
import Header from "@/components/user/home/components/Header";
import Navbar from "@/components/user/home/components/Navbar";
import SecondNavbar from "@/components/user/home/components/SecondNavbar";
import React from "react";

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      <Navbar />
      <SecondNavbar />
      {children}
      <Footer />
    </div>
  );
}
