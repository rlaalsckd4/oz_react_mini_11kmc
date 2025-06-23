import { useEffect, useState } from "react";
import apiToken from "../../CallToken";
import { movieUrl } from "../constant/constant";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async () => {
    if (isLoading || !hasMore) return; // 중복 방지
    setIsLoading(true);

    try {
      const res = await fetch(
        `${movieUrl}/movie/popular?page=${page}&language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      const data = await res.json();

      if (data.page >= data.total_pages) {
        setHasMore(false); // 더 이상 불러올 페이지가 없다면
      }

      // 성인영화 제외 후 누적
      const filtered = data.results
        ? data.results.filter((movie) => movie.adult === false)
        : [];

      setMovies((prev) => [...prev, ...filtered]);
      setPage((prev) => prev + 1); // 페이지 +1
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false); // 무조건 로딩 종료
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, isLoading, error, hasMore, fetchMovies };
}
