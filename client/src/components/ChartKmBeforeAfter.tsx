"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useCarnetDeBord } from "@/hooks/useCarnetDeBord";
import type { CreateCarnetDeBord } from "@/@types/types";

export function ChartKmBeforeAfter() {
  const { getCarnets } = useCarnetDeBord();
  const [carnets, setCarnets] = React.useState<CreateCarnetDeBord[]>([]);

  React.useEffect(() => {
    (async () => {
      const data = await getCarnets();
      setCarnets(data || []);
    })();
  }, []);

  const chartData = React.useMemo(() => {
    const grouped: Record<string, { depart: number; arrive: number }> = {};

    carnets.forEach((item) => {
      const vehicle = item.matricule?.trim();
      if (!vehicle) return;

      const depart = Number(item.km_depart);
      const arrive = Number(item.km_arrive);

      if (Number.isNaN(depart) || Number.isNaN(arrive)) return;

      if (!grouped[vehicle]) {
        grouped[vehicle] = { depart: 0, arrive: 0 };
      }

      grouped[vehicle].depart += depart;
      grouped[vehicle].arrive += arrive;
    });

    return Object.entries(grouped).map(([vehicle, v]) => ({
      vehicle,
      depart: Number(v.depart) || 0,
      arrive: Number(v.arrive) || 0,
    }));
  }, [carnets]);

  const chartConfig: ChartConfig = {
    depart: {
      label: "Kilomètres départ",
      color: "var(--chart-1)",
    },
    arrive: {
      label: "Kilomètres arrivée",
      color: "var(--chart-2)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kilométrage avant / après</CardTitle>
        <CardDescription>
          Comparaison du compteur kilométrique par véhicule
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="vehicle" />
            <YAxis />

            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Legend />

            <Bar
              dataKey="depart"
              fill={chartConfig.depart.color}
              radius={4}
              minPointSize={3}
              isAnimationActive={false}
            />

            <Bar
              dataKey="arrive"
              fill={chartConfig.arrive.color}
              radius={4}
              minPointSize={3}
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
