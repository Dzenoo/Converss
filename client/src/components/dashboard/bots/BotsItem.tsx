import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { IBot } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/info/card";
import { Badge } from "@/components/ui/info/badge";

type BotsItemProps = {
  bot: IBot;
};

const BotsItem: React.FC<BotsItemProps> = ({ bot }) => {
  return (
    <Card className="border border-gray-200 shadow-none">
      <CardHeader className="gap-4">
        <CardTitle className="flex items-center justify-between gap-2">
          <Link href={`/dashboard/my-bots/${bot._id}`}>{bot.businessName}</Link>
          {bot.isActive && <Badge variant="default">Active</Badge>}
        </CardTitle>

        <CardDescription className="flex items-center justify-between gap-2">
          <p className="text-sm text-[var(--primary-gray)] capitalize">
            {bot.industry}
          </p>
          <p className="text-sm text-[var(--primary-gray)]">
            Created at {formatDate(new Date(bot.createdAt))}
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 text-sm">
        <p>{bot.businessDescription}</p>
        <div className="space-y-2">
          <p>
            <strong>Role:</strong> {bot.primaryRole}
          </p>
          <p className="capitalize">
            <strong>Tone:</strong> {bot.tone}
          </p>
          <p>
            <strong>Greeting:</strong> {bot.greetingMessage}
          </p>
          <p>
            <strong>Fallback:</strong> {bot.fallbackMessage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotsItem;
