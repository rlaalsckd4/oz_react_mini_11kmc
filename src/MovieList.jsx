import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "./component/MovieCard";
import MovieSlider from "./component/MovieSlider";
import SkeletonCard from "./component/SkeletonCard";
import { movieUrl } from "./constant/constant";
import useMovies from "./hooks/useMovies";

export default function App() {
  const { movies, isLoading, fetchMovies, hasMore } = useMovies();

  if (isLoading && movies.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-6 my-6">
        {Array(8)
          .fill()
          .map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-4">인기 영화</h1>
      <MovieSlider />
      <InfiniteScroll
        dataLength={movies.length} // 현재까지 불러온 데이터 개수
        next={fetchMovies} // 다음 페이지 불러오는 함수
        hasMore={hasMore} // 더 불러올 게 있는지 여부
        loader={
          <div className="grid grid-cols-4 gap-6 my-6">
            {Array(4)
              .fill()
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        }
        endMessage={
          <p className="text-center text-gray-400 mt-4">
            🎬 인기 영화를 모두 불러왔습니다.
          </p>
        }
      >
        {/* 영화 카드 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
