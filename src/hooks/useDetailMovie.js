import { useEffect, useState } from "react";
import apiToken from "../../CallToken";

export default function useMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;

    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  return { movie, isLoading, error };
}
