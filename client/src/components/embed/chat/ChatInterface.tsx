"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { BotQueryType, useBotQuery } from "@/hooks/queries/bot.query";
import { IMessage } from "@/types";

import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const ChatInterface: React.FC<{
  data: { widgetId: string };
  className?: string;
}> = ({ data, className }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { data: botData } = useBotQuery(
    {
      type: BotQueryType.GET_BOT_BY_WIDGET_ID,
      params: { widgetId: data.widgetId },
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  if (!botData) {
    return;
  }

  return (
    <div className={cn("flex h-full min-h-96 flex-col gap-4 p-5", className)}>
      <div className="hide-scrollbar overflow-auto whitespace-nowrap">
        <ChatHeader
          data={{ bot: botData.data.bot, widgetId: data.widgetId, messages }}
          setMessages={setMessages}
        />
      </div>
      <div className="hide-scrollbar flex-grow overflow-y-auto">
        <ChatContent
          data={{ widgetId: data.widgetId, bot: botData.data.bot, messages }}
          setMessages={setMessages}
        />
      </div>
      <div>
        <ChatInput
          data={{ widgetId: data.widgetId }}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
