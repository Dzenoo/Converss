import { createGenericQueryHook } from "./createGenericQueryHook";
import { getChat, getChats } from "@/lib/actions/chat.actions";

const ChatQueryFunctions = {
  GET_CHATS_BY_BOT: (params: { botId: string }) =>
    getChats({ botId: params.botId }),
  GET_CHAT_BY_BOT: (params: { botId: string }) =>
    getChat({ botId: params.botId }),
} as const;

enum ChatQueryType {
  GET_CHATS_BY_BOT = "GET_CHATS_BY_BOT",
  GET_CHAT_BY_BOT = "GET_CHAT_BY_BOT",
}

const useChatQuery = createGenericQueryHook("chats", ChatQueryFunctions);

export { useChatQuery, ChatQueryType };
