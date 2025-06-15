import Link from "next/link";
import { CirclePower } from "lucide-react";

import OnboardingSteps from "./OnboardingSteps";

import { Button } from "@/components/ui/buttons/button";

const Sidebar = () => {
  return (
    <aside className="flex basis-[25%] flex-col justify-between gap-10 border-l border-[var(--tertiary-gray)] p-10">
      <OnboardingSteps />

      <div className="space-y-2">
        <div>
          <CirclePower />
        </div>
        <div>
          <h2 className="font-semibold">Having trouble?</h2>
        </div>
        <div>
          <p className="text-sm text-[var(--primary-gray)]">
            Feel free to contact us and we will always help you with the
            process.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
