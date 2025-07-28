import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import { HandleMessageDto } from "@/types";
import { handleMessage } from "@/lib/actions/chat.actions";

enum ChatMutationType {
  HANDLE_MESSAGE = "HANDLE_MESSAGE",
}

type ChatMutationPayload = {
  type: ChatMutationType.HANDLE_MESSAGE;
  data: {
    widgetId: string;
    body: HandleMessageDto;
  };
};

const useChatMutation = (
  options?: Omit<
    UseMutationOptions<any, any, ChatMutationPayload>,
    "mutationFn"
  >,
) => {
  const mutationFn = async (payload: ChatMutationPayload) => {
    switch (payload.type) {
      case ChatMutationType.HANDLE_MESSAGE:
        return handleMessage({
          widgetId: payload.data.widgetId,
          body: payload.data.body,
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

export { useChatMutation, ChatMutationType };
