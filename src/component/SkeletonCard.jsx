export default function SkeletonCard () {
    return(
        <div className="bg-gray-800 p-4 rounded-lg animate-pulse">
            <div className="bg-gray-700 h-60 w-full mb-4 rounded"/>
            <div className="bg-gray-700 h-4 mb-2 rounded w-3/4"/>
            <div className="bg-gray-700 h-4 rounded w-1/2"/>
        </div>
    )
}