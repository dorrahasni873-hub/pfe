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

import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import type { Vehicule } from "@/features/vehicles/types";
import { Calendar } from "lucide-react";

export function GraphiqueVehiculesAnnee() {
  const { getAll: getVehicules } = useVehicles();
  const [vehicules, setVehicules] = React.useState<Vehicule[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getVehicules();
        if (!cancelled) setVehicules(data || []);
      } catch {
        if (!cancelled) setVehicules([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const chartData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    vehicules.forEach((v) => {
      if (!v.dateCirculation) return;
      const year = new Date(v.dateCirculation).getFullYear();
      const key = year.toString();
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([annee, total]) => ({ annee, total }))
      .sort((a, b) => parseInt(a.annee) - parseInt(b.annee));
  }, [vehicules]);

  const chartConfig: ChartConfig = {
    total: { label: "Nombre de véhicules", color: "var(--chart-5)" },
  };

  return (
    <Card className="group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="text-center">
        <div className="justify-center gap-2 flex items-center">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Véhicules par année</CardTitle>
        </div>
        <CardDescription>
          Répartition des véhicules par année de mise en circulation
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="annee" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="total"
              fill={chartConfig.total.color}
              radius={[4, 4, 0, 0]}
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
