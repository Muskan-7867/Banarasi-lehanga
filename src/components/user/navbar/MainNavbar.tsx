"use client";
import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { WomenCategoryNavbar } from "./WomenCategoryNavbar";
import { MenCategoryNavbar } from "./MenCategoryNavbar";
import { BridalNavbar } from "./BridalNavbar";

export default function MainNavbar() {
  const pathname = usePathname();

  // Determine which category navbar to show
  const showWomenNavbar = pathname === "/" || pathname.startsWith("/women");
  const showMenNavbar = pathname.startsWith("/men");
  const commonNavbar = pathname.startsWith("/bridal");

  return (
    <div>
      <Header />
      <Navbar />
      {showWomenNavbar && <WomenCategoryNavbar />}
      {showMenNavbar && <MenCategoryNavbar />}
      {commonNavbar && <BridalNavbar />}
    </div>
  );
}