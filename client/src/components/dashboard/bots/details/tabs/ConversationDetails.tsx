"use client";

import { Bot, User } from "lucide-react";

import { ChatQueryType, useChatQuery } from "@/hooks/queries/chat.query";
import { formatDate } from "@/lib/utils";

const ConversationDetails: React.FC<{ botId: string }> = ({ botId }) => {
  const { data, isLoading } = useChatQuery({
    type: ChatQueryType.GET_CHAT_BY_BOT,
    params: { botId },
  });

  if (isLoading) return "Loading...";
  if (!data) return;

  const isUser = (role: string) => (role === "user" ? true : false);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Chat</h1>
        <p className="text-sm text-[var(--primary-gray)]">
          Explore all messages exchanged in this conversation.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {data.data.chat.messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col gap-2.5 ${
                isUser(message.role) && "items-end"
              }`}
            >
              <div className="w-fit">
                {isUser(message.role) ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div
                className={`border-input w-fit rounded-xl border p-4 text-sm ${
                  isUser(message.role) ? "bg-muted ml-5" : "mr-5"
                }`}
              >
                {message.content}
              </div>
              <div className="text-sm text-[var(--primary-gray)]">
                {formatDate(message.timestamp, "dd/MM/yyyy HH:mm:ss")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationDetails;
