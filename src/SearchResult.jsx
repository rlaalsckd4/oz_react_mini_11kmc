import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiToken from "../CallToken";
import MovieCard from "./component/MovieCard";

export default function SearchResult() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query")
    const [results, setResults] = useState([])

    useEffect(() => {
        if (!query) return

        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setResults(data.results || []))
            .catch((err) => {
                <div>검색 실패, {err}</div>
            }, [query])

        return (
            <div className="max-w-6xl mx-auto px-4 py-6 text-white">
                <h2 className="text-2xl mb-4 font-bold">검색결과: {query}</h2>
                <div className="gird grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((movie) => (
                        <MovieCard key={movie.id} {...movie} />
                    ))}
                </div>
            </div>
        )
    })
}