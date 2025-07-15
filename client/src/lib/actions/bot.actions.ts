import qs from "qs";

import { getApiHandler, postApiHandler } from "../api";

import {
  CreateBotDto,
  GetBotDashboardResponse,
  GetUserBotsDto,
  IBot,
} from "@/types";

export const createBot = async (data: {
  body: CreateBotDto;
}): Promise<
  ServerResponse<{
    botId: string;
  }>
> => postApiHandler("bots/create", data.body);

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
}): Promise<ServerResponse<GetBotDashboardResponse>> =>
  getApiHandler(`dashboard/bot/${data.botId}`);
