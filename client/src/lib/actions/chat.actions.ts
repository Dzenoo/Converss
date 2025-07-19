import { getApiHandler } from "../api";

import { IChat } from "@/types";

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
