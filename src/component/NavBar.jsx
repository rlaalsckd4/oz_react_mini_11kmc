import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar({onSearch}) {
    return (
        <nav className="bg-gray-600 text-white px-5 py-4 flex justify-between">
            <Link to="/" className="text-xl font-bold">
                MovieApp
            </Link>
            <SearchBar onSearch={onSearch} />
            <div className="flex gap-4">
                <Link to="/">☰</Link>
            </div>
        </nav>
    );
}