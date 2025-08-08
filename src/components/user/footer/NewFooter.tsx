"use client"
import { useEffect } from "react";
import Image from "next/image";
import { indo, lehanga, saree, saree1, suit } from "@/app/constants/imagePath";
import Footer from "./Footer";

const NewFooter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-[30rem] flex items-end justify-center gap-0"> 
        <Image
          alt="JuicerJag"
          src={saree}
          className="w-[3rem] lg:w-[20rem] md:w-[8rem] aspect-auto cursor-pointer"
        />
        <Image
          alt="JuicerJag"
          src={lehanga}
          className="w-[3rem] lg:w-[15rem] md:w-[8rem] aspect-auto cursor-pointer"
        />
        <Image
          alt="JuicerJag"
          src={suit}
          className="w-[3rem] lg:w-[15rem] md:w-[8rem] aspect-auto cursor-pointer"
        />
        <Image
          alt="JuicerJag"
          src={indo}
          className="w-[3rem] lg:w-[15rem] md:w-[8rem] aspect-auto cursor-pointer"
        />
        <Image
          alt="JuicerJag"
          src={saree1}
          className="w-[3rem] lg:w-[16rem] md:w-[8rem] aspect-auto cursor-pointer"
        />
      </div>

      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default NewFooter;