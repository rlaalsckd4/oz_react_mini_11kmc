import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiToken from "../CallToken";
import MovieCard from "./component/MovieCard";

export default function SearchResult() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query")
    const { results, isLoading, error } = useSearchParams(query)

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 text-white">
            <h2 className="text-2xl mb-4 font-bold">검색결과: {query}</h2>

            {isLoading && <p>로딩 중...</p>}
            {error && <p>오류 발생: {error.message}</p>}
            {!isLoading && !results.length && <p>검색 결과가 없습니다.</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </div>
    )
}