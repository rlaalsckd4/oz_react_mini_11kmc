import MovieCard from "./component/MovieCard";
import MovieSlider from "./component/MovieSlider";
import SkeletonCard from "./component/SkeletonCard";
import { movieUrl } from "./constant/constant";
import useMovies from "./hooks/useMovies";

export default function App() {
  const { movies, isLoading } = useMovies(`${movieUrl}}/movie/popular`);

  return (
    <div className="w-full bg-black py-6 ">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-white"> 영화 목록</h1>
        <MovieSlider />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
          {isLoading
            ? Array(8)
                .fill()
                .map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
