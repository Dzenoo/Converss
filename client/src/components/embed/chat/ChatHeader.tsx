"use client";

import { Bot } from "lucide-react";

import { IBot, IMessage } from "@/types";

import { Button } from "@/components/ui/buttons/button";
import { useEffect } from "react";

const ChatHeader: React.FC<{
  data: {
    bot: IBot;
    widgetId: string;
    messages: IMessage[];
  };
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}> = ({ data: { bot, widgetId, messages }, setMessages }) => {
  const isEmptyChat = messages.length === 0;

  function clearChat() {
    if (isEmptyChat) return;
    localStorage.removeItem(`chatSessionId-${widgetId}`);
    setMessages([]);
  }

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <div>
          <Bot />
        </div>
        <div>
          <h1 className="font-semibold">{bot.businessName}</h1>
        </div>
      </div>
      <div>
        <Button onClick={clearChat} disabled={isEmptyChat}>
          Clear Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
