"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaInstagram } from "react-icons/fa";
import {
  instapost3,
  poster,
  poster1,
  poster2,
  poster3
} from "@/app/constants/imagePath";

type VideoPost = {
  type: "video";
  videoSrc: string;
  thumbnail: string | StaticImageData;
};

type ImagePost = {
  type: "image";
  src: string | StaticImageData;
};

const InstaSection = () => {
  const videosLeft: VideoPost[] = [
    {
      type: "video",
      videoSrc:
        "https://res.cloudinary.com/debzdd4wk/video/upload/v1756106538/lehngavideo_qtjd0z.mp4",
      thumbnail: poster
    },
    {
      type: "video",
      videoSrc:
        "https://res.cloudinary.com/debzdd4wk/video/upload/v1756107277/lehangavideo3_i6wlhv.mp4",
      thumbnail: poster1
    }
  ];

  const videosRight: VideoPost[] = [
    {
      type: "video",
      videoSrc:
        "https://res.cloudinary.com/debzdd4wk/video/upload/v1756107745/lehngavid4_bvzbad.mp4",
      thumbnail: poster2
    },
    {
      type: "video",
      videoSrc:
        "https://res.cloudinary.com/debzdd4wk/video/upload/v1756107277/lehngavideo2_ai4xa5.mp4",
      thumbnail: poster3
    }
  ];

  const centerImage: ImagePost = {
    type: "image",
    src: instapost3
  };

  const [hoverIndex, setHoverIndex] = useState<string | null>(null);

  const renderVideo = (post: VideoPost, id: string) => (
    <div
      key={id}
      className="relative w-full aspect-square overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHoverIndex(id)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {hoverIndex === id ? (
        <video
          src={post.videoSrc}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={post.thumbnail}
          alt="Video thumbnail"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
    </div>
  );

  return (
    <div className="px-4 md:px-8 py-8  min-h-screen md:min-h-0 md:h-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl text-black md:text-3xl font-bold uppercase mb-4">
          VISIT OUR INSTAGRAM DIARIES
        </h2>
        <p className="text-lg md:text-xl text-black">
          Follow To Know More{" "}
          <span className="text-pink-500">@banarasilehngahouse</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {videosLeft.map((v, i) => renderVideo(v, `left-${i}`))}
        </div>

        {/* Center image - hidden on mobile */}
        <div className="hidden md:flex relative aspect-square md:aspect-1/2 items-center justify-center overflow-hidden group">
          <Image
            src={centerImage.src}
            alt="Instagram post"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <FaInstagram className="text-white text-4xl drop-shadow-lg" />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {videosRight.map((v, i) => renderVideo(v, `right-${i}`))}
        </div>
      </div>

      {/* Mobile call to action */}
      <div className="mt-8 text-center md:hidden">
        <a
          href="https://www.instagram.com/banarsi_lehnga_house.in?igsh=M2RqODB6eG43bGl0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          <FaInstagram className="text-xl" />
          Follow Us on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstaSection;
