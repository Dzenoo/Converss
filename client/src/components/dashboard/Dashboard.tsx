"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";

import { UserQueryType, useUserQuery } from "@/hooks/queries/user.query";

import Summary from "./analytics/Summary";
import RecentActivity from "./analytics/RecentActivity";
import BotPerformance from "./analytics/BotPerformance";
import TopQuestions from "./analytics/TopQuestions";
import NotFound from "../shared/NotFounds";

const Dashboard = () => {
  const { data, isLoading } = useUserQuery({
    type: UserQueryType.GET_DASHBOARD,
    params: { token: "" },
  });

  if (isLoading) {
    return "Loading...";
  }

  if (!data) {
    return <NotFound href="/dashboard" />;
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
          <TopQuestions topQuestions={data.data.topQuestions} />
        </div>
        <div className="col-span-2">
          <BotPerformance botPerformance={data.data.botPerformance} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
