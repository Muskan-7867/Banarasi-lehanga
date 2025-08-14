import React from "react";
import VideoCard from "./VideoCard";
import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";

export default function VideoCardSection() {
  const videos = [
    {
      src: "https://cdn4.fireworktv.com/medias/2024/11/13/1731479887-xsqezpry/watermarked/720/SG273152.mp4",
      title: "Mehandi Mastery",
    },
    {
      src: "https://cdn4.fireworktv.com/medias/2024/11/13/1731479887-xsqezpry/watermarked/720/SG273152.mp4",
      title: "Bridal Bliss",
    },
    {
      src: "https://cdn4.fireworktv.com/medias/2024/11/13/1731479887-xsqezpry/watermarked/720/SG273152.mp4",
      title: "Festive Glam",
    },
    {
      src: "https://cdn4.fireworktv.com/medias/2024/11/13/1731479887-xsqezpry/watermarked/720/SG273152.mp4",
      title: "Royal Elegance",
    },
    
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center text-black ">
        Shop The Look
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {videos.map((video, i) => (
          <VideoCard
            key={i}
            videoSrc={video.src}
            imageOverlay={<ImageNamingOverlay title={video.title} />}
          />
        ))}
      </div>
    </div>
  );
}
