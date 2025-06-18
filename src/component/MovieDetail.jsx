import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiToken from "../../CallToken";

export default function MovieDetail() {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const { id } = useParams()
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setMovie(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error(err)
                setIsLoading(false)
            });
    }, [id])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96 text-white">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!movie) return (<div className="text-white text-center"> 로딩 중... </div>)

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">

            {/* 전체 레이아웃: Flex */}
            <div className="flex flex-wrap gap-6">

                {/* 포스터 영역 */}
                <div className="flex-1 min-w-[300px]">
                    <img
                        src={`${baseUrl}${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
                    />
                </div>

                {/* 정보 영역: Grid */}
                <div className="flex-1 min-w-[300px] grid gap-4">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-lg text-gray-500 italic">{movie.tagline}</p>
                    <p className="text-base"><strong>평점:</strong> {movie.vote_average}</p>

                    <div>
                        <strong>장르:</strong>{" "}
                        {movie.genres?.map((genre) => (
                            <span key={genre.id} className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <p><strong>줄거리:</strong><br />{movie.overview}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <p><strong>개봉일:</strong> {movie.release_date}</p>
                        <p><strong>상영시간:</strong> {movie.runtime}분</p>
                        <p><strong>제작비:</strong> ${movie.budget?.toLocaleString()}</p>
                        <p><strong>수익:</strong> ${movie.revenue?.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}