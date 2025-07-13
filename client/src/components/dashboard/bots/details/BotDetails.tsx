"use client";

import { BotQueryType, useBotQuery } from "@/hooks/queries/bot.query";

import Navigation from "./Navigation";
import BotTesting from "./tabs/BotTesting";
import Conversations from "./tabs/Conversations";
import CustomizeAi from "./tabs/CustomizeAi";
import Deployment from "./tabs/Deployment";
import FAQ from "./tabs/FAQ";
import Overview from "./tabs/Overview";
import Settings from "./tabs/Settings";
import NotFound from "@/components/shared/NotFound";

const BotDetails: React.FC<{ botId: string; activeTab: string }> = ({
  botId,
  activeTab,
}) => {
  const { data, isLoading } = useBotQuery({
    type: BotQueryType.GET_BOTS_DASHBOARD,
    params: { botId },
  });

  console.log(data);

  return (
    <>
      <Navigation botId={botId} activeTab={activeTab} />

      <div className="p-5">
        {isLoading && "Loading..."}

        {!data && !isLoading ? (
          <NotFound href="/dashboard" />
        ) : (
          data && (
            <>
              {activeTab === "overview" && <Overview />}
              {activeTab === "conversations" && <Conversations />}
              {activeTab === "faq" && <FAQ />}
              {activeTab === "customize-ai" && <CustomizeAi />}
              {activeTab === "bot-testing" && <BotTesting />}
              {activeTab === "deployment" && <Deployment />}
              {activeTab === "settings" && <Settings />}
            </>
          )
        )}
      </div>
    </>
  );
};

export default BotDetails;
