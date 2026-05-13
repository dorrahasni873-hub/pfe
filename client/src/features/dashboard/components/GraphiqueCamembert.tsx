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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import type { Vehicule } from "@/features/vehicles/types";
import { Car } from "lucide-react";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function GraphiqueCamembert() {
  const id = "pie-interactive";
  const { getAll: getVehicules } = useVehicles();
  const [vehicules, setVehicules] = React.useState<Vehicule[]>([]);
  const [activeBrand, setActiveBrand] = React.useState("");

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
    vehicules.forEach((vehicule) => {
      const marque = vehicule.marqueVoiture || "Unknown";
      counts[marque] = (counts[marque] || 0) + 1;
    });
    return Object.entries(counts).map(([marque, total], index) => ({
      marque,
      total,
      fill: COLORS[index % COLORS.length],
    }));
  }, [vehicules]);

  React.useEffect(() => {
    if (chartData.length > 0 && !activeBrand) {
      setActiveBrand(chartData[0].marque);
    }
  }, [chartData, activeBrand]);

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.marque === activeBrand),
    [chartData, activeBrand],
  );

  const brands = React.useMemo(() => chartData.map((item) => item.marque), [chartData]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};
    chartData.forEach((item) => {
      config[item.marque] = { label: item.marque, color: item.fill };
    });
    return config;
  }, [chartData]);

  return (
    <Card data-chart={id} className="flex flex-col group transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <div className="flex gap-2 items-center">
            <Car className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Répartition des véhicules</CardTitle>
          </div>
          <CardDescription>Nombre de véhicules par marque</CardDescription>
        </div>

        <Select value={activeBrand} onValueChange={setActiveBrand}>
          <SelectTrigger
            className="ml-auto h-8 w-[160px] rounded-lg pl-2.5"
            aria-label="Select brand"
          >
            <SelectValue placeholder="Choisir marque" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {brands.map((brand, index) => (
              <SelectItem
                key={brand}
                value={brand}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {brand}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[350px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="marque"
              innerRadius={70}
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
                          {chartData[activeIndex]?.total || 0}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartData[activeIndex]?.marque || ""}
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
