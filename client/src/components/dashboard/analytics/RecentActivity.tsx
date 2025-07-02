"use client";

import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/info/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/info/card";

type RecentActivityProps = {
  recentActivity: {
    _id: string;
    date: string;
    user: number;
    assistant: number;
  }[];
};

const chartConfig = {
  user: {
    label: "User",
    color: "var(--chart-1)",
  },
  assistant: {
    label: "Assistant",
    color: "var(--chart-2)",
  },
} as const;

export const RecentActivity: React.FC<RecentActivityProps> = ({
  recentActivity,
}) => {
  return (
    <Card className="border border-gray-200 shadow-none">
      <CardHeader>
        <CardTitle>User vs Assistant Activity (All Bots)</CardTitle>
        <CardDescription>
          Messages sent daily over the last 30 days
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={recentActivity}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(val) => val.slice(5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={20}
              tickFormatter={(val) => String(Math.round(val))}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar dataKey="user" fill="var(--chart-1)" radius={10} />
            <Bar dataKey="assistant" fill="var(--chart-2)" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Interaction trends over the last 30 days{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Counts of messages from users and assistants per day
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecentActivity;
