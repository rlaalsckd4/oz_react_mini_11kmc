import { useEffect, useState } from "react";
import apiToken from "../../CallToken";

export default function useSearchMovies(query) {
    const [results, setResults] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!query) return

        setIsLoading(true)
        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setResults(data.results || []);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [query]);

    return { results, isLoading, error };
}

