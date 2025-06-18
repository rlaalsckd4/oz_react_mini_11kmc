import { useEffect, useState } from "react";
import movieData from "./movieListData.json"
import MovieCard from "./component/MovieCard";
import MovieSlider from "./component/MovieSlider";
import apiToken from "../CallToken";


export default function App() {
    const [movies, setMovies] = useState(movieData.results);

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
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div className="w-full bg-black py-6 ">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-white"> 영화 목록</h1>
                <MovieSlider />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            poster_path={movie.poster_path}
                            vote_average={movie.vote_average}
                        />
                    ))}
                </div>
            </div >
        </div>
    );
}