const LoadingBotConversations: React.FC = () => {
  return (
    <div className="space-y-5 p-5">
      {/* Page Title */}
      <div className="h-6 w-48 animate-pulse rounded-md bg-gray-100"></div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: 5 }).map((_, idx) => (
                <th
                  key={idx}
                  className="h-5 w-24 animate-pulse rounded-md bg-gray-100"
                ></th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: 5 }).map((_, colIdx) => (
                  <td
                    key={colIdx}
                    className="h-6 w-24 animate-pulse rounded-md bg-gray-100"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadingBotConversations;
