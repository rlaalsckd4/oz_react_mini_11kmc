
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import apiToken from "../../CallToken";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieSlider() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular', options)
            .then(res => res.json())
            .then(res => {
                const childMovies = res.results.filter((movie) => movie.adult === false)
                setMovies(childMovies)
                setIsLoading(false)
            })
            .catch(err => {
                if (err) return (<div className="text-white">데이터를 불러오지 못 했습니다...</div>)
                setIsLoading(false)
            });
    }, [])

    return (
        <div className="w-full bg-black py-6">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-xl font-bold text-white mb-4">🍿오늘의 추천🍿</h2>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={25}
                    slidesPerView={3}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {
                        isLoading
                            ? Array(3).fill().map((_, i) => (
                                <SwiperSlide key={i}>
                                    <SkeletonCard />
                                </SwiperSlide>))
                            : movies.map((movie) => (
                                <SwiperSlide
                                    key={movie.id}
                                    onClick={() => navigate(`/details/${movie.id}`)}>
                                    <img
                                        src={`${baseUrl}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="rounded-md shadow-lg w-full"
                                    />
                                    <p className="mt-2 text-center text-white text-sm">{movie.title}</p>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </div>
        </div>
    );
}
