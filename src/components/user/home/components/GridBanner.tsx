import Image from "next/image";
import React from "react";

export default function GridBanner() {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="lg:grid lg:grid-cols-12 flex flex-col p-4 gap-4 h-auto lg:w-[85%] w-[95%] bg-pink-100 ">
        <div className=" w-full col-span-8 grid grid-cols-12 gap-4">
          <div className=" w-full h-full col-span-6">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="https://kalki.gumlet.io/cdn/shop/videos/c/vp/4dcaaaf548ab471caaa91bde03e76736/4dcaaaf548ab471caaa91bde03e76736.SD-480p-1.5Mbps-46542178.mp4"
            ></video>
          </div>

          <div className="w-full h-full grid grid-rows-2 col-span-6 gap-4">
            <div className=" w-full row-span-1">
              <Image src="https://kalki.gumlet.io/cdn/shop/files/new-arrival-banner-2-400x264-deaktop-25-04-25.jpg?w=400&" alt="img" height={530} width={530}  objectFit="cover" />
            </div>
            <div className="bg-gray-200 w-full row-span-1 flex gap-4">
              <div className="bg-green-800 w-full">
                <Image src="https://kalki.gumlet.io/cdn/shop/files/new-arrival-banner-3-200x281-deaktop-25-04-25.jpg?w=200&" height={250} width={250} alt=""/>

              </div>
              <div className="bg-blue-800 w-full">
                <Image src="https://kalki.gumlet.io/cdn/shop/files/new-arrival-banner-4-200x282-deaktop-25-04-25.jpg?w=200&" height={250} width={250} alt=""/>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-full lg:col-span-4 flex flex-col justify-center items-center">
             <h1 className="lg:text-3xl text-xl font-bold text-center app-text-color italic">Introducing</h1> <br />
             <p className="lg:text-5xl text-2xl font-bold text-center text-black font-serif ">INSTANT SAREE</p>
             <button className="app-color p-2 m-8">All Sarees</button>
             <p className="text-lg text-black text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. dolore!</p>
        </div>
      </div>
    </div>
  );
}
