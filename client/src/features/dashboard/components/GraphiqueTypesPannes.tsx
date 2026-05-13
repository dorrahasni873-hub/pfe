"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";

import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";
import type { Panne } from "@/features/breakdowns/types";
import { List } from "lucide-react";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function GraphiqueTypesPannes() {
  const { getAll: getPannes } = useBreakdowns();
  const [pannes, setPannes] = React.useState<Panne[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getPannes();
        if (!cancelled) setPannes(data || []);
      } catch {
        if (!cancelled) setPannes([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const chartData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    pannes.forEach((p) => {
      const type = p.typePanne || "Inconnu";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([typePanne, total], index) => ({
        typePanne,
        total,
        fill: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [pannes]);

  const chartConfig: ChartConfig = {
    total: { label: "Nombre" },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.typePanne,
        { label: item.typePanne, color: item.fill },
      ]),
    ),
  };

  return (
    <Card className="group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="text-center">
        <div className="justify-center gap-2 flex items-center">
          <List className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Types de pannes fréquents</CardTitle>
        </div>
        <CardDescription>
          Les pannes les plus récurrentes
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              dataKey="typePanne"
              type="category"
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="total"
              radius={[0, 4, 4, 0]}
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
