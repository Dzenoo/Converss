import { cn } from "@/lib/utils";

import CreateBotForm from "@/components/dashboard/bots/create-bot/forms/CreateBotForm";
import Steps from "@/components/dashboard/bots/create-bot/Steps";

const CreateBotPage = () => {
  return (
    <div className="flex h-full">
      <div className="grow basis-full overflow-hidden p-10">
        <CreateBotForm isOnboarding={false} />
      </div>
      <div
        className={cn(
          "flex min-w-[350px] basis-[25%] flex-col justify-between gap-10 border-l border-[var(--tertiary-gray)] p-10 max-lg:hidden",
        )}
      >
        <Steps />
      </div>
    </div>
  );
};

export default CreateBotPage;
