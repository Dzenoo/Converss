"use client";

import { BotQueryType, useBotQuery } from "@/hooks/queries/bot.query";

import BotsList from "./BotsList";
import NotFound from "@/components/shared/NotFounds";

const Bots = () => {
  const { data, isLoading } = useBotQuery({
    type: BotQueryType.GET_BOTS_BY_USER,
    params: { query: {} },
  });

  if (isLoading) {
    return "Loading...";
  }

  if (!data) {
    return <NotFound href="/dashboard" />;
  }

  return (
    <div className="space-y-10">
      <div>Filters</div>
      <div>
        <BotsList bots={data.data.bots} />
      </div>
    </div>
  );
};

export default Bots;
