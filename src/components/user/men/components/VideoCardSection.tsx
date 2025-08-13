
import React from "react";
import VideoCard from "./VideoCard";
import ImageNamingOverlay from "@/components/ui/ImageNamingOverlay";



export default function VideoCardSection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-black">Shop The Look</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <VideoCard
            key={i}
            videoSrc="https://cdn4.fireworktv.com/medias/2024/11/13/1731479887-xsqezpry/watermarked/720/SG273152.mp4"
          
            imageOverlay={
              <ImageNamingOverlay
                title="Mehandi Mastery" 
             
              />
            }
          />
        ))}
      </div>
    </div>
  );
}