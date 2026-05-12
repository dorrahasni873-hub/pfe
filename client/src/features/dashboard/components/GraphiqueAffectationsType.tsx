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

import { useAffectation } from "@/features/assignments/hooks/useAssignments";
import type { Affectation } from "@/shared/types/types";
import { ArrowLeftRight } from "lucide-react";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function GraphiqueAffectationsType() {
  const { getAffectations } = useAffectation();
  const [affectations, setAffectations] = React.useState<Affectation[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getAffectations();
        if (!cancelled) setAffectations(data || []);
      } catch {
        if (!cancelled) setAffectations([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const chartData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    affectations.forEach((a) => {
      const type = a.typeAffectation || "Inconnu";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([typeAffectation, total], index) => ({
      typeAffectation,
      total,
      fill: COLORS[index % COLORS.length],
    }));
  }, [affectations]);

  const totalAffectations = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.total, 0),
    [chartData],
  );

  const chartConfig: ChartConfig = {
    total: { label: "Total" },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.typeAffectation,
        { label: item.typeAffectation, color: item.fill },
      ]),
    ),
  };

  return (
    <Card className="flex flex-col group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="items-center pb-0">
        <div className="flex gap-2 items-center">
          <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Affectations par type</CardTitle>
        </div>
        <CardDescription>Répartition des types d&apos;affectation</CardDescription>
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
              nameKey="typeAffectation"
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
                          {totalAffectations}
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
