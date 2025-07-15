import { formatDistanceToNowStrict, parseISO } from "date-fns";

import { Badge } from "@/components/ui/info/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/info/table";
import Link from "next/link";

type BotPerformanceProps = {
  botPerformance: {
    id: string;
    name: string;
    isActive: boolean;
    conversations: number;
    lastActive: string | null;
    widgetId: string;
  }[];
};

const BotPerformance: React.FC<BotPerformanceProps> = ({ botPerformance }) => {
  return (
    <Table>
      <TableCaption>
        Summary of bot activity and usage across the last 30 days
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Bot</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Conversations</TableHead>
          <TableHead>Last Active</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {botPerformance.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-muted-foreground py-8 text-center"
            >
              No bot activity recorded in the last 30 days.
            </TableCell>
          </TableRow>
        ) : (
          botPerformance.map((bot) => (
            <TableRow key={bot.id}>
              <TableCell className="font-medium">
                <Link href={`/dashboard/my-bots/${bot.id}/overview`}>
                  {bot.name}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant={bot.isActive ? "success" : "outline"}>
                  {bot.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{bot.conversations}</TableCell>
              <TableCell>
                {bot.lastActive
                  ? formatDistanceToNowStrict(parseISO(bot.lastActive), {
                      addSuffix: true,
                    })
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default BotPerformance;
