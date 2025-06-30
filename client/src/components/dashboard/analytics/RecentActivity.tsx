"use client";

import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/info/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/info/chart";

type RecentActivityProps = {
  recentActivity: {
    _id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    botName: string;
    botId: string;
    widgetId: string;
  }[];
};

const chartConfig = {
  messageCount: {
    label: "Messages",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const RecentActivity: React.FC<RecentActivityProps> = ({
  recentActivity,
}) => {
  const chartData = Object.values(
    recentActivity.reduce<
      Record<string, { botName: string; messageCount: number }>
    >((acc, activity) => {
      const botName = activity.botName;
      acc[botName] = acc[botName] || { botName, messageCount: 0 };
      acc[botName].messageCount += 1;
      return acc;
    }, {}),
  );

  const isSingleBot = chartData.length === 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Messages sent per bot</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            width={isSingleBot ? 150 : undefined}
            height={300}
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="botName"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="messageCount"
              fill="var(--color-messageCount)"
              radius={8}
              barSize={isSingleBot ? 40 : undefined}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up this week
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on most recent messages by bot
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecentActivity;
