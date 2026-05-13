"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { AlertTriangle } from "lucide-react";

const COLORS = [
  "var(--chart-3)",
  "var(--chart-5)",
  "var(--chart-2)",
  "var(--chart-1)",
];

const STATUS_LABELS: Record<string, string> = {
  en_attente: "En attente",
  en_cours: "En cours",
  résolue: "Résolue",
  resolue: "Résolue",
  terminee: "Terminée",
};

export function GraphiquePannesStatut() {
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
      const status = p.status || "en_attente";
      counts[status] = (counts[status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, total], index) => ({
      status,
      total,
      fill: COLORS[index % COLORS.length],
    }));
  }, [pannes]);

  const totalPannes = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.total, 0),
    [chartData],
  );

  const chartConfig: ChartConfig = {
    total: { label: "Total" },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.status,
        { label: STATUS_LABELS[item.status] || item.status, color: item.fill },
      ]),
    ),
  };

  return (
    <Card className="flex flex-col group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="items-center pb-0">
        <div className="flex gap-2 items-center">
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Pannes par statut</CardTitle>
        </div>
        <CardDescription>Répartition des pannes selon leur état</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              animationBegin={200}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPannes}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
