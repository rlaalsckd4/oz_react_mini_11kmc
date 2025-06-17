import { useState } from "react";
import movieData from "./movieListData.json"
import MovieCard from "./component/MovieCard";

export default function App() {
  const [movies, setMovies] = useState(movieData.results);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
        />
      ))}
    </div>
  );
}