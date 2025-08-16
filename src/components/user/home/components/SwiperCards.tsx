import { VideoCarousel } from "@/components/ui/SwiperCard";
import React from "react";

export default function SwiperCards() {
  const videos = [
    {
      src: "https://cdn3.fireworktv.com/medias/2025/6/4/1749025509-cdjfqivs/transcoded/720/SG276471.mp4",
      alt: "Video 1",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://cdn3.fireworktv.com/medias/2025/6/4/1749025509-luvkmgxj/transcoded/720/SG276473.mp4",
      alt: "Video 2",
      poster: "https://example.com/poster2.jpg"
    },
     {
      src: "https://cdn5.fireworktv.com/medias/2024/11/18/1731936047-jygaiotn/transcoded/720/SG273096.mp4",
      alt: "Video 3",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://cdn3.fireworktv.com/medias/2025/6/4/1749025509-hdpnqbmj/transcoded/720/SG275395.mp4",
      alt: "Video 4",
      poster: "https://example.com/poster2.jpg"
    },
      {
      src: "https://cdn4.fireworktv.com/medias/2025/6/4/1749025509-oqykzaht/transcoded/720/SG275568.mp4",
      alt: "Video 5",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://cdn5.fireworktv.com/medias/2025/6/4/1749025509-iemzbjca/transcoded/720/SG300573.mp4",
      alt: "Video 6",
      poster: "https://example.com/poster2.jpg"
    },
     {
      src: "https://cdn7.fireworktv.com/medias/2025/6/4/1749025509-nlrtoayi/transcoded/720/SG276464.mp4",
      alt: "Video 7",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://cdn7.fireworktv.com/medias/2025/6/4/1749025509-rgxazoqh/transcoded/720/SG285279.mp4",
      alt: "Video 8",
      poster: "https://example.com/poster2.jpg"
    },
      {
      src: "https://cdn1.fireworktv.com/medias/2025/6/4/1749025509-jnlsbtei/transcoded/720/SG285392.mp4",
      alt: "Video 9",
      poster: "https://example.com/poster1.jpg"
    },
    {
      src: "https://cdn6.fireworktv.com/medias/2025/6/4/1749025509-wuvpmcrh/transcoded/720/SG291260.mp4",
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