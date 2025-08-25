import React from "react";

import {
  delivery,
  EasyReturn,
  quality,
  support
} from "@/app/constants/imagePath";
import Image from "next/image";

export default function Features() {
  const features = [
    {
      icon: (
        <Image
          src={delivery}
          alt="Easy Return"
          className="lg:w-14 lg:h-14 w-6 h-6 object-contain"
        />
      ),
      title: "Fast Delivery"
    },
    {
      icon: (
        <Image
          src={EasyReturn}
          alt="Easy Return"
          className="lg:w-14 lg:h-14 w-6 h-6 object-contain"
        />
      ),
      title: "Easy Return"
    },
    {
      icon: (
        <Image
          src={quality}
          alt="Easy Return"
          className="lg:w-14 lg:h-14 w-6 h-6 object-contain"
        />
      ),
      title: "Quality Assurance"
    },
    {
      icon: (
        <Image
          src={support}
          alt="Easy Return"
          className="lg:w-14 lg:h-14 w-6 h-6 object-contain"
        />
      ),
      title: "Customer Support"
    }
  ];

  return (
    <div className="w-full bg-white py-10 px-4 flex justify-center">
      <div className="max-w-[70rem] w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:gap-6 gap-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2  lg:space-y-3"
          >
            <div>{feature.icon}</div>
            <h2 className=" text-xs lg:text-lg font-medium text-gray-800">
              {feature.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
