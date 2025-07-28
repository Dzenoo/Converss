import { getApiHandler, postApiHandler } from "../api";

import { HandleMessageDto, IChat, IMessage } from "@/types";

export const handleMessage = async (data: {
  widgetId: string;
  body: HandleMessageDto;
}): Promise<
  ServerResponse<{
    data: {
      response: string;
      responseTime: number;
    };
  }>
> => postApiHandler(`chat/${data.widgetId}`, data.body);

export const getChatBySessionId = async (data: {
  widgetId: string;
  chatSessionId: string;
}): Promise<
  ServerResponse<{
    data: { messages: IMessage[] };
  }>
> => {
  return await getApiHandler(
    `chat/${data.widgetId}/session/${data.chatSessionId}`,
  );
};

export const getChats = async (data: {
  botId: string;
}): Promise<
  ServerResponse<{
    data: {
      chats: Array<IChat>;
    };
  }>
> => {
  return await getApiHandler(`chat/${data.botId}/all`);
};

export const getChat = async (data: {
  botId: string;
}): Promise<
  ServerResponse<{
    data: {
      chat: IChat;
    };
  }>
> => {
  return await getApiHandler(`chat/${data.botId}`);
};
