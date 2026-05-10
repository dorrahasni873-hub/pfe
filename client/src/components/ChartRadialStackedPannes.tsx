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
import { CheckCircle } from "lucide-react";

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
    <Card
      className="
        relative flex flex-col overflow-hidden
        shadow-xl
        border border-white/10
        bg-linear-to-br from-indigo-100 via-indigo-200 to-indigo-300
        w-[200px] h-[200px]
        p-1
      "
    >
      <CardHeader className="items-center pb-0 pt-2 space-y-0">
        <CardTitle className="text-[11px] font-semibold text-slate-900">
          <div className="flex gap-2 justify-center">
            <CheckCircle />
            <p>État des véhicules</p>
          </div>
        </CardTitle>

        <CardDescription className="text-[9px] text-center text-slate-600 leading-tight">
          Répartition globale des véhicules
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center p-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[95px] w-[95px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={30}
            outerRadius={45}
          >
            <RadialBar dataKey="value" cornerRadius={4} background />

            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;

                return (
                  <div className="rounded-md border bg-background p-1 text-[10px] shadow">
                    {payload.map((entry: any) => (
                      <div
                        key={entry.payload.name}
                        className="flex items-center gap-1"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: entry.payload.fill,
                          }}
                        />

                        <span>{entry.payload.name}</span>

                        <strong>{entry.value}</strong>
                      </div>
                    ))}
                  </div>
                );
              }}
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 3}
                          className="fill-foreground text-sm font-bold"
                        >
                          {totalVehicles}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 10}
                          className="fill-muted-foreground text-[7px]"
                        >
                          Véhicules
                        </tspan>
                      </text>
                    );
                  }

                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-center gap-1 pt-0 pb-1 text-[8px]">
        <Badge className="flex items-center gap-1 px-1 py-0 text-[8px] font-normal">
          <span className="h-1 w-1 rounded-full bg-[var(--chart-1)]" />
          Disponible
          <strong className="text-[8px]">{chartData[0].value}</strong>
        </Badge>

        <Badge className="flex items-center gap-1 px-1 py-0 text-[8px] font-normal">
          <span className="h-1 w-1 rounded-full bg-[var(--chart-2)]" />
          En service
          <strong className="text-[8px]">{chartData[1].value}</strong>
        </Badge>

        <Badge className="flex items-center gap-1 px-1 py-0 text-[8px] font-normal">
          <span className="h-1 w-1 rounded-full bg-[var(--chart-3)]" />
          En panne
          <strong className="text-[8px]">{chartData[2].value}</strong>
        </Badge>
      </CardFooter>
    </Card>
  );
}
