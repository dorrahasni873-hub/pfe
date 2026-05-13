"use client";

import React from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";

import { ChartContainer, ChartTooltip, type ChartConfig } from "@/shared/components/ui/chart";

import type { Vehicule } from "@/features/vehicles/types";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { Badge } from "@/shared/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";

const chartConfig: ChartConfig = {
  disponible: { label: "Disponible", color: "var(--chart-1)" },
  en_service: { label: "En service", color: "var(--chart-2)" },
  en_panne: { label: "En panne", color: "var(--chart-3)" },
};

export function GraphiquePannes({ className, small = false }: { className?: string; small?: boolean }) {
  const { getAll: getVehicules } = useVehicles();
  const [vehicles, setVehicles] = React.useState<Vehicule[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const data = await getVehicules();
        if (!cancelled) setVehicles(data || []);
      } catch {
        if (!cancelled) setVehicles([]);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const chartData = React.useMemo(() => {
    const counts = { disponible: 0, en_service: 0, en_panne: 0 };
    vehicles.forEach((v) => {
      const etat = v.etat?.toLowerCase();
      if (etat in counts) counts[etat as keyof typeof counts]++;
    });
    return [
      { name: "Disponible", value: counts.disponible, fill: chartConfig.disponible.color },
      { name: "En service", value: counts.en_service, fill: chartConfig.en_service.color },
      { name: "En panne", value: counts.en_panne, fill: chartConfig.en_panne.color },
    ];
  }, [vehicles]);

  const totalVehicles = React.useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData]);

  return (
    <Card className={cn("group relative flex flex-col overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl", className)}>
      <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-500" />

      <CardHeader className={small ? "items-center pb-0 pt-2 space-y-0" : "items-center pb-0 pt-4 space-y-0"}>
        <CardTitle className={small ? "text-[11px] font-semibold" : "text-sm font-semibold"}>
          <div className="flex gap-1 justify-center items-center">
            <CheckCircle className={small ? "h-3 w-3 text-muted-foreground" : "h-4 w-4 text-muted-foreground"} />
            État des véhicules
          </div>
        </CardTitle>
        <CardDescription className={small ? "text-[10px] text-center" : "text-xs text-center"}>Répartition globale des véhicules</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center p-1">
        <ChartContainer config={chartConfig} className={small ? "mx-auto h-[90px] w-[90px]" : "mx-auto h-[120px] w-[120px]"}>
          <RadialBarChart data={chartData} startAngle={180} endAngle={0} innerRadius={small ? 28 : 38} outerRadius={small ? 42 : 56}>
            <RadialBar
              dataKey="value"
              cornerRadius={4}
              background={{ fill: "var(--border)" }}
              animationBegin={300}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;
                return (
                  <div className="rounded-lg border bg-background/95 backdrop-blur-sm p-2 text-xs shadow-lg">
                    {payload.map((entry: any) => (
                      <div key={entry.payload.name} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: entry.payload.fill }} />
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
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 4} className="fill-foreground text-xl font-bold">
                          {totalVehicles}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 12} className="fill-muted-foreground text-[9px]">
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

      <CardFooter className="flex flex-wrap items-center justify-center gap-1 pt-0 pb-2">
        {chartData.map((item) => (
          <Badge
            key={item.name}
            variant="secondary"
            className={
              small ? "flex items-center gap-1 px-1.5 py-0 text-[9px] font-normal" : "flex items-center gap-1.5 px-2 py-0.5 text-xs font-normal"
            }
          >
            <span className={small ? "h-1.5 w-1.5 rounded-full" : "h-2 w-2 rounded-full"} style={{ backgroundColor: item.fill }} />
            {item.name}
            <strong className={small ? "text-[9px]" : "text-xs"}>{item.value}</strong>
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
