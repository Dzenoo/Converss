"use client";

import { z } from "zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChatSchema } from "@/lib/zod/chat";
import { getOrCreateChatSessionId } from "@/lib/utils";
import {
  ChatMutationType,
  useChatMutation,
} from "@/hooks/mutations/useChat.mutation";
import { IMessage } from "@/types";

import { Loader } from "@/components/ui/info/loader";
import { Button } from "@/components/ui/buttons/button";
import { Textarea } from "@/components/ui/form/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form/form";

const ChatInput: React.FC<{
  data: {
    widgetId: string;
    setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  };
}> = ({ data: { widgetId, setMessages } }) => {
  const form = useForm<z.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {
      question: "",
    },
  });

  const chatMutation = useChatMutation({});

  const chatSessionId = getOrCreateChatSessionId(widgetId);

  const onSubmit = async (values: z.infer<typeof ChatSchema>) => {
    const userMessage: IMessage = {
      role: "user",
      content: values.question,
      timestamp: new Date(),
    };

    const loadingMessage: IMessage = {
      role: "assistant",
      content: "__LOADING__", // placeholder
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    form.reset();

    try {
      const res = await chatMutation.mutateAsync({
        type: ChatMutationType.HANDLE_MESSAGE,
        data: { widgetId, body: { chatSessionId, message: values.question } },
      });

      const aiMessage: IMessage = {
        role: "assistant",
        content: res.data.response,
        timestamp: new Date(),
      };

      setMessages(
        (prev) => [...prev.slice(0, -1), aiMessage], // replace loading message
      );
    } catch (err) {}
  };

  return (
    <Form {...form}>
      <form className="relative" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  placeholder="Type here..."
                  className="hide-scrollbar max-h-28 resize-none pr-10"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="ghost"
          disabled={!form.formState.isValid || chatMutation.isPending}
          type="submit"
          className="absolute right-1.5 bottom-1.5 h-8 w-8 rounded-full p-2"
        >
          <Send className="h-8 w-8" />
        </Button>
      </form>
    </Form>
  );
};

export default ChatInput;
