import Image from "next/image";
import React from "react";

export default function VideoSection() {
  return (
    <div className="w-screen overflow-hidden">
      {/* Fullscreen Video */}
      <div className="w-screen h-screen relative">
        <video
          src="https://kalki.gumlet.io/cdn/shop/videos/c/vp/acb9a72d676c446bb3823aaaebf78c89/acb9a72d676c446bb3823aaaebf78c89.HD-1080p-3.3Mbps-54959162.mp4?"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

              <div className="absolute bottom-10 inset-x-0 flex justify-center">
          <button className="px-6 py-2 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition">
            See All
          </button>
        </div>
      </div>

      {/* Fullscreen Image with Button at Bottom */}
      <div className="w-screen h-screen relative">
        <Image
          src="https://kalki.gumlet.io/cdn/shop/files/Bridal-banner-desk-12-4-24.jpg?w=1920&"
          alt="img"
          fill
          className="object-cover"
          priority
        />

        {/* Button at Bottom */}
        <div className="absolute bottom-10 inset-x-0 flex justify-center">
          <button className="px-6 py-2 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition">
            See All
          </button>
        </div>
      </div>

         <div className="w-screen h-screen relative">
        <video
          src="https://kalki.gumlet.io/cdn/shop/videos/c/vp/acb9a72d676c446bb3823aaaebf78c89/acb9a72d676c446bb3823aaaebf78c89.HD-1080p-3.3Mbps-54959162.mp4?"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

              <div className="absolute bottom-10 inset-x-0 flex justify-center">
          <button className="px-6 py-2 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition">
            Discover Bridal World
          </button>
        </div>
      </div>
    </div>
  );
}
