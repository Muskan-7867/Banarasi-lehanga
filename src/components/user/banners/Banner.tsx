import Image from "next/image";
import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Banner() {
  return (
    <div className="w-full aspect-[16/6] relative">
      <Image
        src="https://www.cbazaar.com/blog/wp-content/uploads/2020/01/WP_BLog_Jan21.jpg"
        alt="banner"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
      />
      <div className="absolute top-1/2 left-4 -translate-y-1/2 ">
        <SlArrowLeft size={28} />
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 ">
        <SlArrowRight size={28} />
      </div>
    </div>
  );
}
