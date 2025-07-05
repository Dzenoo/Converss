import { createGenericQueryHook } from "./createGenericQueryHook";
import { getBotsByUser } from "@/lib/actions/bot.actions";
import { GetUserBotsDto } from "@/types";

const BotQueryFunctions = {
  GET_BOTS_BY_USER: (params: { query: GetUserBotsDto }) =>
    getBotsByUser({ query: params.query }),
} as const;

enum BotQueryType {
  GET_BOTS_BY_USER = "GET_BOTS_BY_USER",
}

const useBotQuery = createGenericQueryHook("bots", BotQueryFunctions);

export { useBotQuery, BotQueryType };
