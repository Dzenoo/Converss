import { postApiHandler } from "../api";

import { CreateBotDto } from "@/types";

export const createBot = async (data: {
  body: CreateBotDto;
  token: string;
}): Promise<ServerResponse<{}>> =>
  postApiHandler("bots/create", data.body, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const finishOnboarding = async (data: {
  token: string;
}): Promise<ServerResponse<{}>> =>
  postApiHandler(
    "bots/finish-onboarding",
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
