// components/VideoCard.tsx
import React from "react";

interface VideoCardProps {
  videoSrc: string;
  posterSrc?: string;
  imageOverlay?: React.ReactNode;
  children?: React.ReactNode;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export default function VideoCard({
  videoSrc,
  posterSrc,
  imageOverlay,
  children,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
}: VideoCardProps) {
  return (
    <div className="w-full relative h-[35rem]  overflow-hidden">
      <video
        className="w-full  object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        poster={posterSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      
      {imageOverlay && (
        <div className="absolute inset-0 flex items-end p-4">
          {imageOverlay}
        </div>
      )}
      
      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
}