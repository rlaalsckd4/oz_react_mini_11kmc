import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedInput = useDebounce(input, 500);
  const navigate = useNavigate();

  //입력 값 변경 핸들러
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //돋보기 클릭 시 작동 코드
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); // 데스크탑 전환 시 검색창 항상 보이도록 초기화
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //디바운스된 값이 있을 때 searchPage로 이동
  useEffect(() => {
    const trimmed = debouncedInput.trim();

    if (trimmed) {
      navigate({
        pathname: "/search",
        search: createSearchParams({ query: trimmed }).toString(),
      });
    } else {
      navigate({
        pathname: "/",
      });
    }
  }, [debouncedInput]);

  return (
    <div className="relative flex flex-row-reverse items-center">
      <button
        onClick={handleToggle}
        className=" md:hidden p-2 rounded-full text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray700 transition"
        aria-label="검색 열기"
      >
        🔍
      </button>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search Here..."
        className={`
          transition-all duration-300 ease-in-out
          bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm text-black dark:text-white px-4 py-2 rounded-full
          ${isOpen ? "w-48 opacity-100 visible" : "w-0 opacity-0 invisible"}
          md:w-64 md:opacity-100 md:visible
        `}
      />
    </div>
  );
}
