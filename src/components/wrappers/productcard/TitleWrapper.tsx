import React from "react";

interface TitleProps {
  title: string;
  price: number;
}

export default function TitleWrapper({ title, price }: TitleProps) {
  return (
    <div className="flex flex-col ">
    <h2 className="lg:text-xl text-md font-semibold text-gray-900 tracking-wide truncate">
        {title}
      </h2>
      <p className="text-md font-light app-text-color ">₹{price} /-</p>
    </div>
  );
}
