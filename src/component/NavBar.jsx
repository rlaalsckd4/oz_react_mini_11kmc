import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-gray-600 text-white px-5 py-4 flex justify-between">
            <Link to="/" className="text-xl font-bold">
                MovieApp
            </Link>
            <div className="flex gap-4">
                <Link to="/">☰</Link>
            </div>
        </nav>
    );
}