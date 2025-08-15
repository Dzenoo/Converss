"use client";

import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

import { IBot, IMessage } from "@/types";
import { ChatQueryType, useChatQuery } from "@/hooks/queries/chat.query";
import { getOrCreateChatSessionId } from "@/lib/utils";

import MarkdownRenderer from "@/components/shared/MarkdownRenderer";

import { Loader } from "@/components/ui/info/loader";

const ChatContent: React.FC<{
  data: {
    bot: IBot;
    widgetId: string;
    messages: IMessage[];
  };
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}> = ({ data: { bot, widgetId, messages }, setMessages }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatSessionId = getOrCreateChatSessionId(widgetId);

  const { data: chatData } = useChatQuery({
    type: ChatQueryType.GET_CHAT_BY_SESSION_ID,
    params: { widgetId, chatSessionId },
  });

  useEffect(() => {
    if (chatData && messages.length === 0) {
      setMessages([
        {
          content: bot.greetingMessage,
          role: "assistant",
          timestamp: new Date(),
        },
        ...chatData.data.messages,
      ]);
    }
  }, [chatData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function isUser(role: string) {
    return role === "user" ? true : false;
  }

  return (
    <div className="flex flex-col gap-8 py-5">
      {messages.map((message, index) => {
        const isUserMessage = isUser(message.role);
        const isLoading = message.content === "__LOADING__";

        return (
          <div
            key={index}
            className={`flex flex-col gap-2.5 ${isUserMessage && "items-end"}`}
          >
            <div className="w-fit">
              {isUserMessage ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div
              className={`markdown border-input w-fit rounded-xl border p-2.5 text-sm ${
                isUserMessage ? "bg-muted ml-5" : "mr-5"
              }`}
            >
              {isLoading ? (
                <Loader type="ScaleLoader" height={10} />
              ) : (
                <MarkdownRenderer content={message.content} />
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatContent;
