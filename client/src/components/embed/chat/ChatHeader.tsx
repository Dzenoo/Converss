import { Bot } from "lucide-react";

import { IBot } from "@/types";

const ChatHeader: React.FC<{ data: { bot: IBot } }> = ({ data: { bot } }) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <Bot />
      </div>
      <div>
        <h1 className="font-semibold">{bot.businessName}</h1>
      </div>
    </div>
  );
};

export default ChatHeader;
