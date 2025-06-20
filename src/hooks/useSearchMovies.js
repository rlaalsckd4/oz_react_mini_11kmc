import { useEffect, useState } from "react";
import apiToken from "../../CallToken";
import { data } from "react-router-dom";
import { movieUrl } from "../constant/constant";

export default function useSearchMovies(query) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    fetch(
      `${movieUrl}/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=ko-KR`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.results
          ? data.results.filter((movie) => movie.adult === false)
          : [];
        setResults(filtered);
        setIsLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [query]);

  return { results, isLoading, error };
}
