import { useSearchParams } from "react-router-dom";
import MovieCard from "./component/MovieCard";
import useSearchMovies from "./hooks/useSearchMovies";
import SkeletonCard from "./component/SkeletonCard";

export default function SearchResult() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query")
    const { results, isLoading, error } = useSearchMovies(query)
    return (
        <div className="max-w-6xl mx-auto px-4 py-6 text-white">
            <h2 className="text-2xl mb-4 font-bold">검색결과: {query}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white">
                {
                    isLoading
                        ? Array(8).fill().map((_, i) => <SkeletonCard key={i} />)
                        : results.map((movie) => (
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
        </div>
    )
}