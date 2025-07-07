"use client";

import { useSearchParams } from "next/navigation";

import { BotQueryType, useBotQuery } from "@/hooks/queries/bot.query";

import SearchBots from "./filters/SearchBots";
import BotsList from "./BotsList";

import QueryParamController from "@/components/shared/QueryParamController";
import NotFound from "@/components/shared/NotFounds";
import PaginateList from "@/components/ui/pagination/paginate-list";

type BotsProps = {
  token: string;
};

const Bots: React.FC<BotsProps> = ({ token }) => {
  const searchParams = useSearchParams();

  const query = {
    page: Number(searchParams.get("page")) || 1,
    limit: Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 100),
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "",
  };

  const { data, isLoading } = useBotQuery({
    type: BotQueryType.GET_BOTS_BY_USER,
    params: { token, query },
  });

  if (isLoading) {
    return "Loading...";
  }

  if (!data) {
    return <NotFound href="/dashboard" />;
  }

  const totalBots = data.data.totalBots;

  return (
    <div className="space-y-5 p-5">
      <div>
        <h1 className="text-xl font-semibold">Your Bots</h1>
      </div>
      <div>
        <SearchBots />
      </div>
      <div>
        <BotsList bots={data.data.bots} />
      </div>
      {totalBots > query.limit && (
        <QueryParamController<string> paramKey="page" defaultValue="1">
          {({ value, onChange }) => (
            <PaginateList
              onPageChange={(value) => onChange(String(value))}
              totalItems={totalBots}
              itemsPerPage={query.limit}
              currentPage={Number(value)}
            />
          )}
        </QueryParamController>
      )}
    </div>
  );
};

export default Bots;
