"use client";

import { LucideCheck } from "lucide-react";

import { useCreateBotStore } from "@/stores/create-bot-store";
import { cn } from "@/lib/utils";

const StepsData = [
  {
    id: 0,
    title: "Business Info",
    description: "Basic info about your business",
  },
  {
    id: 1,
    title: "FAQs & Common Questions",
    description: "Frequently asked questions ",
  },
  {
    id: 2,
    title: "Tone & Personality",
    description: "Select the personality",
  },
];

const Steps = () => {
  const { currentStep } = useCreateBotStore();

  return (
    <div className="space-y-8">
      {StepsData.map((step, i) => (
        <Step
          key={step.id}
          title={step.title}
          description={step.description}
          index={i + 1}
          status={
            currentStep === i
              ? "active"
              : currentStep > i
                ? "finished"
                : "inactive"
          }
        />
      ))}
    </div>
  );
};

const Step = ({
  title,
  description,
  index,
  status,
  ...props
}: {
  title: string;
  description: string;
  index: number;
  status: "inactive" | "active" | "finished";
} & Omit<React.ComponentProps<"div">, "className">) => {
  const isInactive = status === "inactive";
  const isActive = status === "active";
  const isFinished = status === "finished";

  return (
    <div className="flex items-center gap-5" {...props}>
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full p-3",
          isInactive &&
            "border border-[var(--secondary-gray)] text-[var(--secondary-gray)]",
          isActive &&
            "border border-[var(--primary-blue)] text-[var(--primary-blue)]",
          isFinished && "bg-[var(--primary-green)]",
        )}
      >
        {isFinished ? <LucideCheck color="#ffffff" /> : index}
      </div>
      <div className="space-y-1">
        <div>
          <h2
            className={cn(
              "text-base",
              !isActive && "text-[var(--secondary-gray)]",
            )}
          >
            {title}
          </h2>
        </div>
        <div>
          <p
            className={cn(
              "text-sm text-[var(--primary-gray)]",
              !isActive && "text-[var(--secondary-gray)]",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
