import { useEffect, useState } from "react";
import MovieCard from "./component/MovieCard";
import MovieSlider from "./component/MovieSlider";
import apiToken from "../CallToken";
import SkeletonCard from "./component/SkeletonCard";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

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
                if (err) return( <div className="text-white">데이터를 불러오지 못 했습니다...</div>)
                setIsLoading(false)
            });
    }, [])

    return (
        <div className="w-full bg-black py-6 ">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-white"> 영화 목록</h1>
                <MovieSlider />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
                    {
                        isLoading
                            ? Array(8).fill().map((_, i) => <SkeletonCard key={i} />)
                            : movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.title}
                                    poster_path={movie.poster_path}
                                    vote_average={movie.vote_average}
                                />
                            ))
                    }
                </div>
            </div >
        </div>
    );
}