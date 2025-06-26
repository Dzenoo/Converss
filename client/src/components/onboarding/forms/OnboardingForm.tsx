"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { useOnboardingStore } from "@/stores/onboarding-store";
import { OnboardingCreateAssistantSchema } from "@/lib/zod/onboarding";
import {
  useBotMutation,
  BotMutationType,
} from "@/hooks/mutations/useBot.mutation";

import BasicInfo from "../BasicInfo";
import Details from "../Details";
import AssistantCustomizer from "../AssistantCustomizer";

import { Button } from "@/components/ui/buttons/button";
import { Form } from "@/components/ui/form/form";
import { Loader } from "@/components/ui/info/loader";

export type OnboardingValues = z.infer<typeof OnboardingCreateAssistantSchema>;

const OnboardingForm = () => {
  const { currentStep, nextStep, prevStep } = useOnboardingStore();

  const form = useForm<OnboardingValues>({
    mode: "all",
    resolver: zodResolver(OnboardingCreateAssistantSchema),
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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

  async function handleFinishOnboarding(values: OnboardingValues) {
    return await botMutation.mutateAsync({
      type: BotMutationType.CREATE,
      data: { body: values },
    });
  }

  return (
    <div className="relative flex h-full flex-col justify-between p-10 max-md:p-5">
      <div className="hide-scrollbar max-h-[75vh] min-h-[75vh] space-y-12 overflow-auto px-52 max-[1480px]:px-16 max-xl:px-8 max-lg:px-4 max-sm:px-1">
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
            onSubmit={form.handleSubmit(handleFinishOnboarding)}
            className="space-y-10"
          >
            {renderComponent()}
            {currentStep === 2 && (
              <div className="absolute right-10 bottom-10 flex justify-end gap-3">
                <Button type="submit" variant="default" size="lg">
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

export default OnboardingForm;
