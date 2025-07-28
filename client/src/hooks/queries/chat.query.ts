import { createGenericQueryHook } from "./createGenericQueryHook";
import {
  getChat,
  getChatBySessionId,
  getChats,
} from "@/lib/actions/chat.actions";

const ChatQueryFunctions = {
  GET_CHAT_BY_SESSION_ID: (params: {
    widgetId: string;
    chatSessionId: string;
  }) =>
    getChatBySessionId({
      widgetId: params.widgetId,
      chatSessionId: params.chatSessionId,
    }),
  GET_CHATS_BY_BOT: (params: { botId: string }) =>
    getChats({ botId: params.botId }),
  GET_CHAT_BY_BOT: (params: { botId: string }) =>
    getChat({ botId: params.botId }),
} as const;

enum ChatQueryType {
  GET_CHAT_BY_SESSION_ID = "GET_CHAT_BY_SESSION_ID",
  GET_CHATS_BY_BOT = "GET_CHATS_BY_BOT",
  GET_CHAT_BY_BOT = "GET_CHAT_BY_BOT",
}

const useChatQuery = createGenericQueryHook("chats", ChatQueryFunctions);

export { useChatQuery, ChatQueryType };
