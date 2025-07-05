import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
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
  const { getToken } = useAuth();

  const mutationFn = async (payload: BotMutationPayload) => {
    const token = await getToken();
    if (!token) throw new Error("Unauthorized!");

    switch (payload.type) {
      case BotMutationType.CREATE:
        return createBot({ body: payload.data.body, token: token });
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
