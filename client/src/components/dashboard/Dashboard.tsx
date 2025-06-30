"use client";

import { UserQueryType, useUserQuery } from "@/hooks/queries/user.query";

import Summary from "./analytics/Summary";
import RecentActivity from "./analytics/RecentActivity";
import BotPerformance from "./analytics/BotPerformance";
import TopQuestions from "./analytics/TopQuestions";

type DashboardProps = {
  token: string;
};

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const { data, isLoading } = useUserQuery({
    type: UserQueryType.GET_DASHBOARD,
    params: { token: token },
  });

  if (isLoading) {
    return "Loading...";
  }

  if (!data) {
    return;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold">Overview</h1>
      </div>

      <div>
        <Summary summary={data.data.summary} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <RecentActivity recentActivity={data.data.recentActivity} />
        </div>
        <div>
          <BotPerformance botPerformance={data.data.botPerformance} />
        </div>
        <div className="col-span-2">
          <TopQuestions topQuestions={data.data.topQuestions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
