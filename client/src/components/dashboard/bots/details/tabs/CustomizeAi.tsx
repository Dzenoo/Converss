"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  BotMutationType,
  useBotMutation,
} from "@/hooks/mutations/useBot.mutation";
import { UpdateBotSchema, UpdateBotValues } from "@/lib/zod/bots";
import { IBot } from "@/types";

import AssistantCustomizer from "../../create-bot/forms/AssistantCustomizer";

import { Form } from "@/components/ui/form/form";
import { Button } from "@/components/ui/buttons/button";
import { Loader } from "@/components/ui/info/loader";

const CustomizeAi: React.FC<{
  data: { bot: IBot };
}> = ({ data: { bot } }) => {
  const botMutation = useBotMutation({
    onSuccess: (response) => {
      toast.success(response.message);
    },
  });
  const isLoading = botMutation.status === "pending";

  const form = useForm<UpdateBotValues>({
    resolver: zodResolver(UpdateBotSchema),
    defaultValues: {
      tone: bot.tone,
      primaryRole: bot.primaryRole,
      greetingMessage: bot.greetingMessage,
      fallbackMessage: bot.fallbackMessage,
    },
  });

  async function handleUpdateAssistant(values: UpdateBotValues) {
    await botMutation.mutateAsync({
      type: BotMutationType.UPDATE,
      data: { botId: bot._id, body: values },
    });
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Customize AI</h1>
        <p className="text-sm text-[var(--primary-gray)]">
          Adjust your AI assistant’s behavior and responses to better fit your
          needs.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateAssistant)}
          className="space-y-10"
        >
          <AssistantCustomizer control={form.control} />
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={
              !form.formState.isDirty || !form.formState.isValid || isLoading
            }
          >
            {isLoading ? (
              <Loader type="ScaleLoader" height={10} color="#ffffff" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CustomizeAi;
