import qs from "qs";

import { getApiHandler, postApiHandler } from "../api";

import { CreateBotDto, GetUserBotsDto, IBot, ITopQuestion } from "@/types";

export const createBot = async (data: {
  body: CreateBotDto;
}): Promise<ServerResponse> => postApiHandler("bots/create", data.body);

export const finishOnboarding = async (): Promise<ServerResponse> =>
  postApiHandler("bots/finish-onboarding", {});

export const getBotsByUser = async (data: {
  query: GetUserBotsDto;
}): Promise<
  ServerResponse<{
    data: {
      bots: IBot[];
      totalBots: number;
    };
  }>
> => {
  const queryString = qs.stringify(data.query, { skipNulls: true });
  return await getApiHandler(`bots/by-user?${queryString}`);
};

export const getBotDashboard = async (data: {
  botId: string;
}): Promise<
  ServerResponse<{
    data: {
      bot: IBot;
      stats: {
        totalConversations: number;
        messagesThisMonth: number;
        avgResponseTime: number;
        topQuestions: ITopQuestion;
      };
      recentChats: {
        id: string;
        messageCount: number;
        lastMessage: string;
        updatedAt: Date;
      }[];
    };
  }>
> => getApiHandler(`dashboard/bot/${data.botId}`);
