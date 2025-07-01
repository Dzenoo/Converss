"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
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
} from "@/components/ui/info/chart";

type TopQuestionsProps = {
  topQuestions: { question: string; count: number; lastAsked: string }[];
};

const chartConfig = {
  count: { label: "Count" },
} as const;

export const TopQuestionsPieChart: React.FC<TopQuestionsProps> = ({
  topQuestions,
}) => {
  const chartData = React.useMemo(() => {
    return topQuestions.map((q, i) => ({
      question: q.question,
      fullQuestion: q.question,
      count: q.count,
      lastAsked: q.lastAsked,
      fill: `var(--chart-${(i % 5) + 1})`,
    }));
  }, [topQuestions]);

  return (
    <Card className="border border-gray-200 shadow-none">
      <CardHeader>
        <CardTitle>Top Questions Asked</CardTitle>
        <CardDescription>Most frequent questions from users</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Pie data={chartData} dataKey="count" nameKey="question" label />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          User Question Insights{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-muted-foreground leading-none">
          Displays the distribution and frequency of the most common user
          questions over the past month.
        </div>
      </CardFooter>
    </Card>
  );
};

export default TopQuestionsPieChart;
