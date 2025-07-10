"use client";

import Navigation from "./Navigation";
import BotTesting from "./tabs/BotTesting";
import Conversations from "./tabs/Conversations";
import CustomizeAi from "./tabs/CustomizeAi";
import Deployment from "./tabs/Deployment";
import FAQ from "./tabs/FAQ";
import Overview from "./tabs/Overview";
import Settings from "./tabs/Settings";

const BotDetails: React.FC<{ botId: string; activeTab: string }> = ({
  botId,
  activeTab,
}) => {
  return (
    <div className="space-y-5 p-5">
      <div>
        <Navigation botId={botId} activeTab={activeTab} />
      </div>
      <div>
        {activeTab === "overview" && <Overview />}
        {activeTab === "conversations" && <Conversations />}
        {activeTab === "faq" && <FAQ />}
        {activeTab === "customize-ai" && <CustomizeAi />}
        {activeTab === "bot-testing" && <BotTesting />}
        {activeTab === "deployment" && <Deployment />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default BotDetails;
