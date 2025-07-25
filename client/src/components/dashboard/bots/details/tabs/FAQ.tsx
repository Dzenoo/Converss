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

import Details from "../../create-bot/forms/Details";

import { Form } from "@/components/ui/form/form";
import { Button } from "@/components/ui/buttons/button";
import { Loader } from "@/components/ui/info/loader";

const FAQ: React.FC<{
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
      faqs: bot.faqs,
    },
  });

  async function handleUpdateFaqs(values: UpdateBotValues) {
    await botMutation.mutateAsync({
      type: BotMutationType.UPDATE,
      data: { botId: bot._id, body: values },
    });
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-5 max-md:items-start">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">FAQ</h1>
          <p className="text-sm text-[var(--primary-gray)]">
            Manage and update the frequently asked questions your bot can
            answer.
          </p>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateFaqs)}>
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={!form.formState.isValid || isLoading}
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
      </div>

      <div>
        <Details control={form.control} />
      </div>
    </div>
  );
};

export default FAQ;
