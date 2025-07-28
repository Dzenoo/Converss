import qs from "qs";

import { getApiHandler, patchApiHandler, postApiHandler } from "../api";

import {
  CreateBotDto,
  GetBotDashboardResponse,
  GetUserBotsDto,
  IBot,
  UpdateBotDto,
} from "@/types";

export const getBotByWidgetId = async (data: {
  widgetId: string;
}): Promise<
  ServerResponse<{
    data: { bot: IBot };
  }>
> => getApiHandler(`bots/${data.widgetId}`, { skipAuth: true });

export const createBot = async (data: {
  body: CreateBotDto;
}): Promise<
  ServerResponse<{
    botId: string;
  }>
> => postApiHandler("bots/create", data.body);

export const updateBot = async (data: {
  botId: string;
  body: UpdateBotDto;
}): Promise<ServerResponse> =>
  patchApiHandler(`bots/by-user/${data.botId}/update`, data.body);

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
