import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { createBot, deleteBot, updateBot } from "@/lib/actions/bot.actions";
import { CreateBotDto, UpdateBotDto } from "@/types";

enum BotMutationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

type BotMutationPayload =
  | {
      type: BotMutationType.CREATE;
      data: {
        body: CreateBotDto;
      };
    }
  | {
      type: BotMutationType.UPDATE;
      data: {
        botId: string;
        body: UpdateBotDto;
      };
    }
  | {
      type: BotMutationType.DELETE;
      data: {
        botId: string;
      };
    };

const useBotMutation = (
  options?: Omit<
    UseMutationOptions<any, any, BotMutationPayload>,
    "mutationFn"
  >,
) => {
  const mutationFn = async (payload: BotMutationPayload) => {
    switch (payload.type) {
      case BotMutationType.CREATE:
        return createBot({ body: payload.data.body });
      case BotMutationType.UPDATE:
        return updateBot({
          botId: payload.data.botId,
          body: payload.data.body,
        });
      case BotMutationType.DELETE:
        return deleteBot({
          botId: payload.data.botId,
        });
      default:
        throw new Error("Invalid mutation type");
    }
  };

  const mutation = useMutation({
    mutationFn,
    onError: (error: any) => {
      toast(error?.response?.data?.message);
    },
    ...options,
  });

  return mutation;
};

export { useBotMutation, BotMutationType };
