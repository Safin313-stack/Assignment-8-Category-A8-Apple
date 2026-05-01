"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TileCard from "./TileCard";

interface Tile {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  currency: string;
  dimensions: string;
  material: string;
  inStock: boolean;
  tags?: string[];
}

export default function FeaturedSwiper({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="featured-swiper">
      <style>{`
        .featured-swiper .swiper-button-next,
        .featured-swiper .swiper-button-prev {
          color: #c9a84c;
          width: 32px;
          height: 32px;
        }
        .featured-swiper .swiper-button-next::after,
        .featured-swiper .swiper-button-prev::after {
          font-size: 16px;
        }
        .featured-swiper .swiper-pagination-bullet {
          background: #c9a84c;
          opacity: 0.4;
        }
        .featured-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {tiles.map((tile) => (
          <SwiperSlide key={tile.id}>
            <TileCard tile={tile} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
