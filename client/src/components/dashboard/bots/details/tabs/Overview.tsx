import Link from "next/link";
import { MessageCircle, MessageSquare, Timer } from "lucide-react";

import { formatDate } from "@/lib/utils";
import { IBot, ITopQuestion } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/info/table";
import { Badge } from "@/components/ui/info/badge";

const Overview: React.FC<{
  data: {
    bot: IBot;
    stats: {
      totalConversations: number;
      messagesThisMonth: number;
      avgResponseTime: number;
      topQuestions: ITopQuestion[];
    };
  };
}> = ({ data }) => {
  const OverviewStatsData = [
    {
      id: 1,
      title: "Total conversations",
      icon: MessageSquare,
      data: data.stats.totalConversations,
    },
    {
      id: 2,
      title: "Messages this month",
      icon: MessageCircle,
      data: data.stats.messagesThisMonth,
    },
    {
      id: 3,
      title: "Average response time",
      icon: Timer,
      data: data.stats.avgResponseTime,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h1 className="text-xl font-semibold">Overview</h1>
        <ul className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
          {OverviewStatsData.map((card) => (
            <li
              key={card.id}
              className="space-y-4 rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg border p-3">
                  <card.icon size={20} />
                </div>
                <div>
                  <h2 className="whitespace-nowrap text-[var(--primary-gray)]">
                    {card.title}
                  </h2>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold">{card.data}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-5">
        <h1 className="text-xl font-semibold">Bot Details</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bot Name</TableHead>
              <TableHead>Bot Description</TableHead>
              <TableHead>Business Website</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Tone</TableHead>
              <TableHead>Primary Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 1 }).map(() => (
              <TableRow key={data.bot._id}>
                <TableCell className="font-bold">
                  {data.bot.businessName}
                </TableCell>
                <TableCell className="truncate">
                  {data.bot.businessDescription}
                </TableCell>
                <TableCell className="cursor-pointer text-[var(--primary-blue)]">
                  <Link target="_blank" href={data.bot.businessWebsite}>
                    Website
                  </Link>
                </TableCell>
                <TableCell className="capitalize">
                  {data.bot.industry}
                </TableCell>
                <TableCell className="capitalize">{data.bot.tone}</TableCell>
                <TableCell className="capitalize">
                  {data.bot.primaryRole}
                </TableCell>
                <TableCell>
                  <Badge variant={data.bot.isActive ? "success" : "outline"}>
                    {data.bot.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(data.bot.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-5">
        <h1 className="text-xl font-semibold">Top Questions</h1>
        {data.stats.topQuestions.length !== 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.stats.topQuestions.map((q, idx) => (
                <TableRow key={idx}>
                  <TableCell>{q.question}</TableCell>
                  <TableCell>{q.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-[var(--primary-gray)]">
            No top questions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Overview;
