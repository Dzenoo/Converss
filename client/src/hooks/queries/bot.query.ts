import { createGenericQueryHook } from "./createGenericQueryHook";
import { getBotsByUser } from "@/lib/actions/bot.actions";
import { GetUserBotsDto } from "@/types";

const BotQueryFunctions = {
  GET_BOTS_BY_USER: (params: { token: string; query: GetUserBotsDto }) =>
    getBotsByUser({ token: params.token, query: params.query }),
} as const;

enum BotQueryType {
  GET_BOTS_BY_USER = "GET_BOTS_BY_USER",
}

const useBotQuery = createGenericQueryHook("bots", BotQueryFunctions);

export { useBotQuery, BotQueryType };
