import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function SearchBar() {
    const [input, setInput] = useState("")
    const debouncedInput = useDebounce(input, 500)
    const navigate = useNavigate()

    //입력 변화 할 때
    const handleChange = (e) => {
        setInput(e.target.value)
    }

    //디바운스된 값이 있을 때 searchPage로 이동
    useEffect(() => {
        if(debouncedInput.trim()) {
            navigate({
                pathname: "/search",
                search: createSearchParams({query:debouncedInput}).toString(),
            })
        }
    }, [debouncedInput])

    return(
        <input type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search Here..."
        className="p-2 rounded border border-gray-400"/>
    )
}