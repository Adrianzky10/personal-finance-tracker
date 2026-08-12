"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface TransactionChartData {
  month: string;
  income: number;
  expense: number;
}

interface TransactionChartProps {
  data: TransactionChartData[];
}

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function TransactionChart({ data }: TransactionChartProps) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>Income & Expense Overview</CardTitle>

        <CardDescription>
          Your income and expenses over the last 6 months
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-75 w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `Rp.${value}`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />

            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.15}
              stroke="var(--color-expense)"
              strokeWidth={2}
            />

            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.2}
              stroke="var(--color-income)"
              strokeWidth={2}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>Financial activity</span>
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
