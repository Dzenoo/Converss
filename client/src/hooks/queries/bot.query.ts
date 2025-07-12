import { createGenericQueryHook } from "./createGenericQueryHook";
import { getBotDashboard, getBotsByUser } from "@/lib/actions/bot.actions";
import { GetUserBotsDto } from "@/types";

const BotQueryFunctions = {
  GET_BOTS_BY_USER: (params: { query: GetUserBotsDto }) =>
    getBotsByUser({ query: params.query }),
  GET_BOTS_DASHBOARD: (params: { botId: string }) =>
    getBotDashboard({ botId: params.botId }),
} as const;

enum BotQueryType {
  GET_BOTS_BY_USER = "GET_BOTS_BY_USER",
  GET_BOTS_DASHBOARD = "GET_BOTS_DASHBOARD",
}

const useBotQuery = createGenericQueryHook("bots", BotQueryFunctions);

export { useBotQuery, BotQueryType };
