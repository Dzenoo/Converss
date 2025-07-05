import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { createBot } from "@/lib/actions/bot.actions";
import { CreateBotDto } from "@/types";

enum BotMutationType {
  CREATE = "CREATE",
}

type BotMutationPayload = {
  type: BotMutationType.CREATE;
  data: {
    body: CreateBotDto;
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
