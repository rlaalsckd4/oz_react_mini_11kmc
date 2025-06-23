import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import useMovies from "../hooks/useMovies";
import { baseUrl, movieUrl } from "../constant/constant";

export default function MovieSlider() {
  const navigate = useNavigate();
  const { movies, isLoading } = useMovies(`${movieUrl}/popular`);

  return (
    <div className="w-full bg-black py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4">🍿오늘의 추천🍿</h2>

        <Swiper
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={3}
          navigation
          breakpoints={{
            100: { slidesPerView: 1 },
            350: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {isLoading
            ? Array(3)
                .fill()
                .map((_, i) => (
                  <SwiperSlide key={i} role="button">
                    <SkeletonCard />
                  </SwiperSlide>
                ))
            : movies.map((movie) => (
                <SwiperSlide
                  key={movie.id}
                  onClick={() => navigate(`/details/${movie.id}`)}
                >
                  <img
                    src={`${baseUrl}${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md shadow-lg w-full"
                  />
                  <p className="mt-2 text-center text-white text-sm">
                    {movie.title}
                  </p>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
