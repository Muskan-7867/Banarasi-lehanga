import NewFooter from "@/components/user/footer/NewFooter";
import Header from "@/components/user/navbar/Header";
import Navbar from "@/components/user/navbar/Navbar";
import SecondNavbar from "@/components/user/navbar/SecondNavbar";
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
      <NewFooter/>
    </div>
  );
}
