import NewFooter from "@/components/user/footer/NewFooter";

import MainNavbar from "@/components/user/navbar/MainNavbar";

import React from "react";

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <MainNavbar />
      {children}
      <NewFooter />
    </div>
  );
}
