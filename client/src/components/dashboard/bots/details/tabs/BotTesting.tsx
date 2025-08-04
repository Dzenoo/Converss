import { IBot } from "@/types";

import ChatInterface from "@/components/embed/chat/ChatInterface";

const BotTesting: React.FC<{ data: { bot: IBot } }> = ({ data: { bot } }) => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Test your bot</h1>
        <p className="text-sm text-[var(--primary-gray)]">
          Interact with your bot here to ensure it responds as expected before
          deploying it to users.
        </p>
      </div>

      <div>
        <ChatInterface
          data={{ widgetId: bot.widgetId }}
          className="max-h-[725px] min-h-[725px] rounded-lg border shadow-lg"
        />
      </div>
    </div>
  );
};

export default BotTesting;
