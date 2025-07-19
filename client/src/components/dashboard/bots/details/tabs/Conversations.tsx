"use client";

import { ChatQueryType, useChatQuery } from "@/hooks/queries/chat.query";

const Conversations: React.FC<{ botId: string }> = ({ botId }) => {
  const { data, isLoading } = useChatQuery({
    type: ChatQueryType.GET_CHATS_BY_BOT,
    params: { botId },
  });

  console.log(data);

  return <div>Conversations</div>;
};

export default Conversations;
