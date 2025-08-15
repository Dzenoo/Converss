"use client";

import { UserQueryType, useUserQuery } from "@/hooks/queries/user.query";

import Summary from "./analytics/Summary";
import RecentActivity from "./analytics/RecentActivity";
import BotPerformance from "./analytics/BotPerformance";
import TopQuestions from "./analytics/TopQuestions";
import NotFound from "../shared/NotFound";

const Dashboard = () => {
  const { data, isLoading } = useUserQuery({
    type: UserQueryType.GET_DASHBOARD,
  });

  if (isLoading) {
    return <LoadingDashboard />;
  }

  if (!data) {
    return <NotFound href="/dashboard" />;
  }

  return (
    <div className="space-y-5 p-5">
      <div>
        <h1 className="text-xl font-semibold">Overview</h1>
      </div>

      <div>
        <Summary summary={data.data.summary} />
      </div>

      <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
        <div>
          <RecentActivity recentActivity={data.data.recentActivity} />
        </div>
        <div>
          <TopQuestions topQuestions={data.data.topQuestions} />
        </div>
        <div className="xl:col-span-2">
          <BotPerformance botPerformance={data.data.botPerformance} />
        </div>
      </div>
    </div>
  );
};

export const LoadingDashboard = () => {
  return (
    <div className="space-y-5 p-5">
      <div className="h-5 w-52 animate-pulse rounded-xl bg-gray-100"></div>
      <div className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
        <div className="h-32 w-full animate-pulse rounded-xl bg-gray-100"></div>
        <div className="h-32 w-full animate-pulse rounded-xl bg-gray-100"></div>
        <div className="h-32 w-full animate-pulse rounded-xl bg-gray-100"></div>
        <div className="h-32 w-full animate-pulse rounded-xl bg-gray-100"></div>
      </div>
      <div className="grid grid-cols-2 gap-5 max-xl:grid-cols-1">
        <div className="h-72 w-full animate-pulse rounded-xl bg-gray-100"></div>
        <div className="h-72 w-full animate-pulse rounded-xl bg-gray-100"></div>
        <div className="h-96 w-full animate-pulse rounded-xl bg-gray-100 xl:col-span-2"></div>
      </div>
    </div>
  );
};

export default Dashboard;
