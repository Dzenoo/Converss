import qs from "qs";

import { getApiHandler, postApiHandler } from "../api";

import { CreateBotDto, GetUserBotsDto, IBot } from "@/types";

export const createBot = async (data: {
  token: string;
  body: CreateBotDto;
}): Promise<ServerResponse> =>
  postApiHandler("bots/create", data.body, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const finishOnboarding = async (data: {
  token: string;
}): Promise<ServerResponse> =>
  postApiHandler(
    "bots/finish-onboarding",
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );

export const getBotsByUser = async (data: {
  token: string;
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

  return await getApiHandler(`bots/by-user?${queryString}`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
};
