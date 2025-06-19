export default function RatingBar({ score }) {
  const percentage = (score / 10) * 100;

  const getColor = (value) => {
    if (value >= 7) return "#facc15";
    if (value >= 4) return "#f97316"; // orange
    return "#ef4444";
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-400 mb-1">⭐ 평점: {score}/10</p>

      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: getColor(score),
          }}
        />
      </div>
    </div>
  );
}
