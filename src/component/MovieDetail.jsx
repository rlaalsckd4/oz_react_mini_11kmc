import movie from "../movieDetailData.json";

export default function MovieDetail() {
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">

            {/* 전체 레이아웃: Flex */}
            <div className="flex flex-wrap gap-6">

                {/* 포스터 영역 */}
                <div className="flex-1 min-w-[300px]">
                    <img
                        src={`${baseUrl}${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
                    />
                </div>

                {/* 정보 영역: Grid */}
                <div className="flex-1 min-w-[300px] grid gap-4">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-lg text-gray-500 italic">{movie.tagline}</p>
                    <p className="text-base"><strong>평점:</strong> {movie.vote_average}</p>

                    <div>
                        <strong>장르:</strong>{" "}
                        {movie.genres?.map((genre) => (
                            <span key={genre.id} className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <p><strong>줄거리:</strong><br />{movie.overview}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <p><strong>개봉일:</strong> {movie.release_date}</p>
                        <p><strong>상영시간:</strong> {movie.runtime}분</p>
                        <p><strong>제작비:</strong> ${movie.budget.toLocaleString()}</p>
                        <p><strong>수익:</strong> ${movie.revenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}