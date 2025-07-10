"use client";

import Navigation from "./Navigation";

const BotDetails: React.FC<{ botId: string; activeTab: string }> = ({
  botId,
  activeTab,
}) => {
  return (
    <div className="space-y-5 p-5">
      <div>
        <Navigation botId={botId} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default BotDetails;
