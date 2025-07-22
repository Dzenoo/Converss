"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useCreateBotStore } from "@/stores/create-bot-store";
import { CreateBotSchema, CreateBotValues } from "@/lib/zod/bots";
import { cn } from "@/lib/utils";
import {
  useBotMutation,
  BotMutationType,
} from "@/hooks/mutations/useBot.mutation";

import BasicInfo from "./BasicInfo";
import Details from "./Details";
import AssistantCustomizer from "./AssistantCustomizer";

import { Button } from "@/components/ui/buttons/button";
import { Form } from "@/components/ui/form/form";
import { Loader } from "@/components/ui/info/loader";

const CreateBotForm: React.FC<{ isOnboarding: boolean }> = ({
  isOnboarding,
}) => {
  const { currentStep, nextStep, prevStep } = useCreateBotStore();
  const router = useRouter();

  const form = useForm<CreateBotValues>({
    mode: "all",
    resolver: zodResolver(CreateBotSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      businessWebsite: "",
      industry: "",
      faqs: [],
      tone: "",
      primaryRole: "",
      greetingMessage: "",
      fallbackMessage: "",
    },
  });

  const botMutation = useBotMutation({
    onSuccess: (response) => {
      form.reset();
      toast.success(response.message);
      router.push(`/dashboard/my-bots/${response.botId}/deployment`);
    },
    onError: (error: any) => {
      toast(error.response.data.message);
    },
  });

  const isLoading = botMutation.status === "pending";

  async function handleNext() {
    const fields = stepFields[currentStep];
    const valid = await form.trigger(fields as any, { shouldFocus: true });
    if (!valid) return;
    nextStep();
  }

  function renderComponent() {
    const components = [
      <BasicInfo control={form.control} />,
      <Details control={form.control} />,
      <AssistantCustomizer control={form.control} />,
    ];
    return components[currentStep];
  }

  async function handleCreateBot(values: CreateBotValues) {
    return await botMutation.mutateAsync({
      type: BotMutationType.CREATE,
      data: { body: values },
    });
  }

  return (
    <div
      className={cn(
        "relative flex h-full flex-col justify-between",
        isOnboarding && "gap-5 p-12",
      )}
    >
      <div
        className={cn(
          "space-y-12",
          isOnboarding &&
            "hide-scrollbar max-h-[75vh] min-h-[75vh] overflow-auto",
        )}
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold max-md:text-2xl">
            {stepDetails[currentStep].title}
          </h1>
          <p className="text-[var(--primary-gray)]">
            {stepDetails[currentStep].description}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateBot)}
            className="space-y-10"
          >
            {renderComponent()}
            {currentStep === 2 && (
              <div
                className={cn(
                  "absolute right-0 bottom-0 flex justify-end gap-3",
                  isOnboarding && "right-10 bottom-10",
                )}
              >
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={!form.formState.isValid}
                >
                  {isLoading ? (
                    <Loader type="ScaleLoader" height={10} color="#ffffff" />
                  ) : (
                    "Create Assistant"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>

      <div className="flex gap-2 self-end">
        {currentStep != 0 && (
          <Button
            onClick={prevStep}
            size="lg"
            variant="outline"
            className={
              currentStep === 2
                ? "relative right-44 max-md:right-48 max-md:bottom-5"
                : ""
            }
          >
            Back
          </Button>
        )}
        {currentStep <= 1 && (
          <Button onClick={handleNext} size="lg">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

const stepDetails = [
  {
    title: "Tell us about your business",
    description:
      "This helps your assistant talk about your business naturally.",
  },
  {
    title: "What questions do people often ask?",
    description: "Add 3-5 questions your customers often ask.",
  },
  {
    title: "Choose your assistant tone",
    description:
      "Select the personality or tone the assistant uses to respond.",
  },
];

const stepFields = [
  ["businessName", "businessDescription", "businessWebsite", "industry"],
  ["faqs"],
  ["assistantTone", "primaryRole", "greetingMessage", "fallbackMessage"],
];

export default CreateBotForm;
