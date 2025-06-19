import { useState } from "react";
import apiToken from "../../CallToken";

export default function useEffect() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer${apiToken}`
            }
        }

        fetch(apiUrl, options)
            .then(res => res.json())
            .then(data => {
                const filtered = data.results
                    ? data.results.filter(movie => movie.adult === false)
                    : []
                setMovies(filtered.length ? filtered : [data])
                setIsLoading(false)
            })
            .catch(err => {
                setError(err)
                setIsLoading(false)
            })
    }, [apiUrl])

    return { movies, isLoading, error }
}