export default function UserButtonShimmer() {
  return (
    <button className="w-full p-3 rounded-lg flex items-start gap-3 animate-pulse bg-white">
      {/* Avatar placeholder */}
      <span className="relative flex h-10 w-10 shrink-0 rounded-full bg-gray-300" />

      <div className="flex-1 min-w-0 space-y-2">
        {/* Name and time */}
        <div className="flex items-center justify-between">
          <span className="h-4 w-1/2 rounded bg-gray-300"></span>
          <span className="h-3 w-12 rounded bg-gray-200"></span>
        </div>

        {/* Message and badge */}
        <div className="flex items-center justify-between">
          <span className="h-3 w-3/4 rounded bg-gray-200"></span>
          <span className="h-5 w-6 rounded bg-gray-300 ml-2"></span>
        </div>
      </div>
    </button>
  );
}
