import React from "react";

interface TitleProps {
  title: string;
  price: number;
}

export default function TitleWrapper({ title, price }: TitleProps) {
  return (
    <div className="flex flex-col ">
      <h2 className="lg:text-lg text-md font-serif font-medium text-black truncate">{title}</h2>
      <p className="text-md font-light text-black ">₹{price} /-</p>
    </div>
  );
}
