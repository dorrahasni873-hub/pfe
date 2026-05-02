/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";

import type { Vehicule } from "@/@types/types";
import { useVehicule } from "@/hooks/useVehicule";
import { Badge } from "./ui/badge";

export const description = "Radial chart showing vehicle status distribution";

const chartConfig: ChartConfig = {
  disponible: {
    label: "Disponible",
    color: "var(--chart-1)",
  },
  en_service: {
    label: "En service",
    color: "var(--chart-2)",
  },
  en_panne: {
    label: "En panne",
    color: "var(--chart-3)",
  },
};

export function ChartRadialStackedPannes() {
  const { getVehicules } = useVehicule();
  const [vehicles, setVehicles] = React.useState<Vehicule[]>([]);

  React.useEffect(() => {
    (async () => {
      const data = await getVehicules();
      setVehicles(data || []);
    })();
  }, [getVehicules]);

  // ✅ FIXED DATA STRUCTURE
  const chartData = React.useMemo(() => {
    const counts = {
      disponible: 0,
      en_service: 0,
      en_panne: 0,
    };

    vehicles.forEach((v) => {
      const etat = v.etat?.toLowerCase();

      if (etat in counts) {
        counts[etat as keyof typeof counts]++;
      }
    });

    return [
      {
        name: "Disponible",
        value: counts.disponible,
        fill: chartConfig.disponible.color,
      },
      {
        name: "En service",
        value: counts.en_service,
        fill: chartConfig.en_service.color,
      },
      {
        name: "En panne",
        value: counts.en_panne,
        fill: chartConfig.en_panne.color,
      },
    ];
  }, [vehicles]);

  const totalVehicles = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>État des véhicules</CardTitle>
        <CardDescription>Répartition globale des véhicules</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={110}
          >
            <RadialBar dataKey="value" cornerRadius={5} background />

            {/* ✅ Tooltip FIXED */}
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;

                return (
                  <div className="rounded-md border bg-background p-2 text-sm shadow">
                    {payload.map((entry: any) => (
                      <div
                        key={entry.payload.name}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: entry.payload.fill }}
                        />
                        <span>{entry.payload.name}</span>:
                        <strong>{entry.value}</strong>
                      </div>
                    ))}
                  </div>
                );
              }}
            />

            {/* Center Label */}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVehicles}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          className="fill-muted-foreground"
                        >
                          Véhicules
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--chart-1)]" />
          <Badge>
            Disponible
            <strong className="ml-1">{chartData[0].value}</strong>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--chart-2)]" />
          <Badge>
            En service
            <strong className="ml-1">{chartData[1].value}</strong>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--chart-3)]" />
          <Badge>
            En panne
            <strong className="ml-1">{chartData[2].value}</strong>
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
