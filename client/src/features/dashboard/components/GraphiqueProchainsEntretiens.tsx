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

import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import type { Maintenance } from "@/features/maintenance/types";
import { CalendarClock } from "lucide-react";

export function GraphiqueProchainsEntretiens() {
  const { getAll: getMaintenances } = useMaintenance();
  const [maintenances, setMaintenances] = React.useState<Maintenance[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getMaintenances();
        if (!cancelled) setMaintenances(data || []);
      } catch {
        if (!cancelled) setMaintenances([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const chartData = React.useMemo(() => {
    const grouped: Record<string, Date> = {};
    maintenances.forEach((m) => {
      const vehicle = m.matricule?.trim();
      if (!vehicle || !m.prochainEntretien) return;
      const date = new Date(m.prochainEntretien);
      if (!grouped[vehicle] || date < grouped[vehicle]) {
        grouped[vehicle] = date;
      }
    });
    return Object.entries(grouped)
      .map(([vehicle, date]) => ({
        vehicle,
        date: date.toLocaleDateString("fr-FR"),
        timestamp: date.getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [maintenances]);

  const chartConfig: ChartConfig = {
    date: { label: "Date", color: "var(--chart-2)" },
  };

  return (
    <Card className="group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="text-center">
        <div className="justify-center gap-2 flex items-center">
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Prochains entretiens</CardTitle>
        </div>
        <CardDescription>
          Dates des prochains entretiens prévus par véhicule
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="vehicle" tickLine={false} axisLine={false} />
            <YAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickFormatter={(ts) => new Date(ts).toLocaleDateString("fr-FR")}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="timestamp"
              fill={chartConfig.date.color}
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
