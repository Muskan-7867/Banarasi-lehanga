"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaInstagram } from "react-icons/fa";
import {
  emptypost,
  instapost1,
  instapost2,
  instapost3,
  instapost4,
  instapost5,
  post1,
  post2,
  post3,
  post4
} from "@/app/constants/imagePath";

const InstaSection = () => {
  const posts = [
    {
      type: "video",
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video1_hmfuqg.mp4",
      thumbnail: post1
    },
    {
      type: "video",
      thumbnail: emptypost,
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video2_leyclq.mp4"
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video4_cenrlo.mp4",
      thumbnail: post2
    },
    {
      type: "video",
      thumbnail: post3,
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video5_mmopix.mp4"
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video6_kkiphh.mp4",
      thumbnail: post4
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video3_buz0y9.mp4",
      thumbnail: emptypost
    },
    { type: "image", src: instapost1 },
    { type: "image", src: instapost2 },
    { type: "image", src: instapost3 },
    { type: "image", src: instapost4 },
    { type: "image", src: instapost5 }
  ];

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <div className="px-18 py-8 bg-white">
      {/* Instagram Call-to-Action */}
      <div className="text-center mb-12">
        <h2 className="text-2xl text-black md:text-3xl font-bold uppercase tracking-wider mb-4">
          VISIT OUR INSTAGRAM DIARIES
        </h2>
        <p className="text-lg md:text-xl text-black">
          Follow To Know More{" "}
          <span className="text-pink-500">@banaraslehangahouse</span>
        </p>
      </div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {posts.map((post, idx) => {
          const isLastFive = idx >= posts.length - 5;

          return (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden group"
            >
              {post.type === "image" ? (
                // For images
                <div className="w-full h-full relative cursor-pointer">
                  <Image
                    src={post.src}
                    alt={`Insta post ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Show Insta icon on hover for last 5 */}
                  {isLastFive && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaInstagram className="text-white text-3xl drop-shadow-lg" />
                    </div>
                  )}
                </div>
              ) : playingIndex === idx ? (
                // Video when clicked
                <video
                  src={post.src}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                // Video thumbnail with play icon
                <div
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => setPlayingIndex(idx)}
                >
                  <Image
                    src={post.thumbnail}
                    alt={`Video post ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlay className="text-white text-lg drop-shadow-lg" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstaSection;
