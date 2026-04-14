export default function JobCardSkeleton() {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-md animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>

      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>

      <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>

      <div className="flex gap-2">
        <div className="h-8 bg-gray-300 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}
