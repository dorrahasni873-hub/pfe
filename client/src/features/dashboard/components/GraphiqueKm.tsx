"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

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

import { useLogbooks } from "@/features/logbooks/hooks/useLogbooks";
import type { CreateCarnetDeBord } from "@/features/logbooks/types";
import { Gauge } from "lucide-react";

export function GraphiqueKm() {
  const { getAll: getCarnets } = useLogbooks();
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
      if (!grouped[vehicle]) grouped[vehicle] = { depart: 0, arrive: 0 };
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
    depart: { label: "Kilomètres départ", color: "var(--chart-1)" },
    arrive: { label: "Kilomètres arrivée", color: "var(--chart-2)" },
  };

  return (
    <Card className="group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="text-center">
        <div className="justify-center gap-2 flex items-center">
          <Gauge className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Kilométrage avant / après</CardTitle>
        </div>
        <CardDescription>
          Comparaison du compteur kilométrique par véhicule
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="vehicle" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Legend />
            <Bar
              dataKey="depart"
              fill={chartConfig.depart.color}
              radius={[4, 4, 0, 0]}
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="arrive"
              fill={chartConfig.arrive.color}
              radius={[4, 4, 0, 0]}
              animationBegin={200}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
