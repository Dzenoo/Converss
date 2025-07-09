"use client";

import { useSearchParams } from "next/navigation";

import { BotQueryType, useBotQuery } from "@/hooks/queries/bot.query";

import SearchBots from "./filters/SearchBots";
import BotsList from "./BotsList";

import QueryParamController from "@/components/shared/QueryParamController";
import NotFound from "@/components/shared/NotFound";
import PaginateList from "@/components/ui/pagination/paginate-list";

const Bots = () => {
  const searchParams = useSearchParams();

  const query = {
    page: Number(searchParams.get("page")) || 1,
    limit: Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 100),
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "",
  };

  const { data, isLoading } = useBotQuery({
    type: BotQueryType.GET_BOTS_BY_USER,
    params: { query },
  });

  return (
    <div className="space-y-5 p-5">
      <div>
        <h1 className="text-xl font-semibold">Your Bots</h1>
      </div>

      <div>
        <SearchBots />
      </div>

      <div className="relative">
        {isLoading && "Loading..."}

        {!data && !isLoading ? (
          <NotFound href="/dashboard" />
        ) : (
          data && (
            <div className="space-y-5">
              <BotsList bots={data.data.bots} />

              {data.data.totalBots > query.limit && (
                <QueryParamController<string> paramKey="page" defaultValue="1">
                  {({ value, onChange }) => (
                    <PaginateList
                      onPageChange={(value) => onChange(String(value))}
                      totalItems={data.data.totalBots}
                      itemsPerPage={query.limit}
                      currentPage={Number(value)}
                    />
                  )}
                </QueryParamController>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Bots;
