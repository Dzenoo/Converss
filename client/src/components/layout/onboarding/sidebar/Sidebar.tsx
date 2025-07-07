import Link from "next/link";
import { CirclePower } from "lucide-react";

import { cn } from "@/lib/utils";

import Steps from "@/components/dashboard/bots/create-bot/Steps";

import { Button } from "@/components/ui/buttons/button";

const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <aside
      className={cn(
        "flex min-w-[350px] basis-[25%] flex-col justify-between gap-10 border-l border-[var(--tertiary-gray)] p-10 max-lg:hidden",
        className,
      )}
    >
      <Steps />

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
