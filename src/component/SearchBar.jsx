import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [input, setInput] = useState("")
    const debouncedValue = useDebounce(input, 500)
    const navigate = useNavigate()

    //입력 값 변경 핸들러
    const handleChange = (e) => {
        setInput(e.target.value)
    }

    //디바운스된 값이 있을 때 searchPage로 이동
    useEffect(() => {
        const trimmed = debouncedValue.trim()
        if(trimmed) {
            navigate({
                pathname: "/search",
                search: createSearchParams({query:trimmed}).toString(),
            })
        }
    }, [debouncedValue, navigate])

    return(
        <input type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search Here..."
        className="p-2 rounded border border-gray-400"/>
    )
}