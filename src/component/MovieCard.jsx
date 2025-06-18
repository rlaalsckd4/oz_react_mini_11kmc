import { useNavigate } from "react-router-dom";

export default function MovieCard({ title, poster_path, vote_average }) {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate("/details")}>
            <img src={`${baseUrl}${poster_path}`} alt={title} />
            <h3>{title}</h3>
            <p>평점: {vote_average}</p>
        </div>
    );
}