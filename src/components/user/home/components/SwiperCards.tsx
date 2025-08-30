import { VideoCarousel }  from "@/components/ui/SwiperCard";
import React from "react";

export default function SwiperCards() {
  const videos = [
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehngavideo_qtjd0z.mp4",
      alt: "Video 1",
      poster: "https://example.com/poster1.jpg"
    },
   
     {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehangavideo3_i6wlhv.mp4",
      alt: "Video 2",
      poster: "https://example.com/poster1.jpg"
    },
     {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehngavideo2_ai4xa5.mp4",
      alt: "Video 3",
      poster: "https://example.com/poster2.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehngavid4_bvzbad.mp4",
      alt: "Video 4",
      poster: "https://example.com/poster2.jpg"
    },
      {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehngavideo_qtjd0z.mp4",
      alt: "Video 5",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/dwgxfctju/video/upload/v1756108770/VID_20250825_003909_447_jofwcq.mp4?_s=public-apps",
      alt: "Video 6",
      poster: "https://example.com/poster2.jpg"
    },
     {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehangavideo3_i6wlhv.mp4",
      alt: "Video 7",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehngavid4_bvzbad.mp4",
      alt: "Video 8",
      poster: "https://example.com/poster2.jpg"
    },
      {
      src: "https://res.cloudinary.com/dwgxfctju/video/upload/v1756108770/VID_20250825_003909_447_jofwcq.mp4?_s=public-apps",
      alt: "Video 9",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/lehngavideo2_ai4xa5.mp4",
      alt: "Video 10",
      poster: "https://example.com/poster2.jpg"
    },

    
   
  ];

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold text-black text-center mb-2">
        Trending Looks To Watch
      </h1>

      <VideoCarousel
        videos={videos}
        autoplayDelay={2000}
        showPagination={false}
        showNavigation={true}
      />
    </div>
  );
}