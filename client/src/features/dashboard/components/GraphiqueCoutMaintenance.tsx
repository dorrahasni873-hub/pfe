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
import type { Maintenance } from "@/shared/types/types";
import { DollarSign } from "lucide-react";

export function GraphiqueCoutMaintenance() {
  const { getMaintenances } = useMaintenance();
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
    const grouped: Record<string, number> = {};
    maintenances.forEach((m) => {
      const vehicle = m.matricule?.trim();
      if (!vehicle) return;
      const cost = Number(m.cout) || 0;
      grouped[vehicle] = (grouped[vehicle] || 0) + cost;
    });
    return Object.entries(grouped)
      .map(([vehicle, cout]) => ({ vehicle, cout: Math.round(cout * 100) / 100 }))
      .sort((a, b) => b.cout - a.cout);
  }, [maintenances]);

  const chartConfig: ChartConfig = {
    cout: { label: "Coût (DT)", color: "var(--chart-4)" },
  };

  return (
    <Card className="group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="text-center">
        <div className="justify-center gap-2 flex items-center">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Coût maintenance par véhicule</CardTitle>
        </div>
        <CardDescription>
          Total des dépenses de maintenance par véhicule
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="vehicle" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="cout"
              fill={chartConfig.cout.color}
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
