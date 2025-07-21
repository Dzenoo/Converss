"use client";

import { BotQueryType, useBotQuery } from "@/hooks/queries/bot.query";
import { DashboardBotDetailsTab, GetBotDashboardResponse } from "@/types";

import Navigation from "./Navigation";
import BotTesting from "./tabs/BotTesting";
import Conversations from "./tabs/Conversations";
import ConversationDetails from "./tabs/ConversationDetails";
import CustomizeAi from "./tabs/CustomizeAi";
import Deployment from "./tabs/Deployment";
import FAQ from "./tabs/FAQ";
import Overview from "./tabs/Overview";
import Settings from "./tabs/Settings";
import NotFound from "@/components/shared/NotFound";

const BotDetails: React.FC<{
  botId: string;
  activeTab: DashboardBotDetailsTab | null;
  slug?: string[];
}> = ({ botId, activeTab, slug }) => {
  const { data, isLoading } = useBotQuery({
    type: BotQueryType.GET_BOTS_DASHBOARD,
    params: { botId },
  });

  const isChatDetail =
    activeTab === "conversations" && slug && slug.length === 2;
  const chatId = isChatDetail ? slug[1] : null;

  const components: Record<
    DashboardBotDetailsTab,
    (props: { data: GetBotDashboardResponse }) => React.JSX.Element
  > = {
    overview: ({ data }) => (
      <Overview data={{ bot: data.data.bot, stats: data.data.stats }} />
    ),
    conversations: ({ data }) =>
      isChatDetail && chatId ? (
        <ConversationDetails botId={data.data.bot._id} />
      ) : (
        <Conversations botId={data.data.bot._id} />
      ),
    faq: ({ data }) => <FAQ />,
    "customize-ai": ({ data }) => <CustomizeAi />,
    "bot-testing": ({ data }) => <BotTesting />,
    deployment: ({ data }) => <Deployment />,
    settings: ({ data }) => <Settings />,
  };

  return (
    <>
      <Navigation botId={botId} activeTab={activeTab} />

      <div className="p-5">
        {isLoading && "Loading..."}

        {!data && !isLoading ? (
          <NotFound href="/dashboard" />
        ) : !activeTab || !(activeTab in components) ? (
          <NotFound href={`/dashboard/my-bots`} />
        ) : (
          data && components[activeTab]({ data })
        )}
      </div>
    </>
  );
};

export default BotDetails;
