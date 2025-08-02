"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination
} from "swiper/modules";

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 80%; /* Default width for mobile */
    max-width: 30rem; /* Maximum width */
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: auto;
  }
  
  .swiper-3d .swiper-slide-shadow-left,
  .swiper-3d .swiper-slide-shadow-right {
    background: none;
  }

  /* Navigation buttons */
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    background: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: none; /* Hidden by default on mobile */
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: 1.2rem;
  }

  /* Pagination */
  .swiper-pagination-bullet {
    background: white;
    opacity: 0.5;
    width: 8px;
    height: 8px;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: white;
  }

  @media (min-width: 640px) {
    .swiper-slide {
      width: 60%;
    }
    .swiper-button-next,
    .swiper-button-prev {
      display: flex; /* Show navigation on tablet+ */
    }
  }

  @media (min-width: 1024px) {
    .swiper-slide {
      width: 40%;
    }
  }
  `;

  return (
    <section className="w-full px-4">
      <style>{css}</style>
      <div className="flex w-full items-center justify-center">
        <div className="w-full relative">
          <Swiper
            spaceBetween={30}
            autoplay={{
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={800}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            loopAdditionalSlides={2}
            slidesPerView={"auto"}
            breakpoints={{
              // when window width is >= 320px
              320: {
                spaceBetween: 20,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 50,
                  modifier: 1
                }
              },
              // when window width is >= 640px
              640: {
                spaceBetween: 30,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1.5
                }
              },
              // when window width is >= 1024px
              1024: {
                spaceBetween: 40,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 2.5
                }
              }
            }}
            pagination={showPagination ? { clickable: true } : false}
            navigation={
              showNavigation
                ? {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                  }
                : false
            }
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="h-[20rem] sm:h-[32rem] md:h-[36rem] lg:h-[38rem] w-full rounded-3xl">
                  <Image
                    src={image.src}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    className="h-full w-full rounded-xl object-cover"
                    alt={image.alt}
                    priority={index < 3}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons */}
          {showNavigation && (
            <>
              <div className="swiper-button-next hidden sm:flex"></div>
              <div className="swiper-button-prev hidden sm:flex"></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};