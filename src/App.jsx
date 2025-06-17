import { useState } from "react";
import movieData from "./movieListData.json"
import MovieCard from "./component/MovieCard";

export default function App() {
  const [movies, setMovies] = useState(movieData.results);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 ">
      <h1 className="text-3xl font-bold mb-6"> 영화 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
}