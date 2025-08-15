const LoadingBotOverview: React.FC = () => {
  return (
    <div className="space-y-10 p-5">
      {/* Overview Stats Section */}
      <div className="space-y-5">
        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-100"></div>
        <ul className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
          {Array.from({ length: 3 }).map((_, idx) => (
            <li
              key={idx}
              className="space-y-4 rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-lg border bg-gray-100 p-3"></div>
                <div className="h-5 w-24 animate-pulse rounded-md bg-gray-100"></div>
              </div>
              <div className="h-8 w-16 animate-pulse rounded-md bg-gray-100"></div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bot Details Section */}
      <div className="space-y-5">
        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-100"></div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-6 animate-pulse rounded-md bg-gray-100"
              ></div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="h-6 animate-pulse rounded-md bg-gray-100"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Questions Section */}
      <div className="space-y-5">
        <div className="h-6 w-48 animate-pulse rounded-md bg-gray-100"></div>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-6 w-full animate-pulse rounded-md bg-gray-100"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingBotOverview;
