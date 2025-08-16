import { VideoCarousel }  from "@/components/ui/SwiperCard";
import React from "react";

export default function SwiperCards() {
  const videos = [
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video1_ioikue.mp4?resource_type=video",
      alt: "Video 1",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video2_wvh2ki.mp4",
      alt: "Video 2",
      poster: "https://example.com/poster2.jpg"
    },
     {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video3_jl9e4l.mp4",
      alt: "Video 3",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video4_aeauon.mp4",
      alt: "Video 4",
      poster: "https://example.com/poster2.jpg"
    },
      {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video6_gj7ikg.mp4",
      alt: "Video 5",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video5_ktqs7b.mp4",
      alt: "Video 6",
      poster: "https://example.com/poster2.jpg"
    },
     {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video8_rmp7fx.mp4",
      alt: "Video 7",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video7_iakpc5.mp4",
      alt: "Video 8",
      poster: "https://example.com/poster2.jpg"
    },
      {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video9_khkd9r.mp4",
      alt: "Video 9",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://res.cloudinary.com/debzdd4wk/video/upload/video10_yncqrk.mp4",
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