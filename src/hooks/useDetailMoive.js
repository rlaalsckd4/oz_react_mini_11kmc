import { useEffect, useState } from "react";
import apiToken from "../../CallToken";

export default function useMovieDetail(url) {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiToken}`
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, [url]);

    return { movie, isLoading, error };
}