"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useVehicule } from "@/hooks/useVehicule";
import type { Vehicule } from "@/@types/types";
import { Car } from "lucide-react";

export const description = "Interactive pie chart for vehicle brands";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function ChartPieInteractive() {
  const id = "pie-interactive";

  const { getVehicules } = useVehicule();

  const [vehicules, setVehicules] = React.useState<Vehicule[]>([]);
  const [activeBrand, setActiveBrand] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const data = await getVehicules();

      setVehicules(data || []);
    })();
  }, [getVehicules]);

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

  const brands = React.useMemo(
    () => chartData.map((item) => item.marque),
    [chartData],
  );

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {};

    chartData.forEach((item) => {
      config[item.marque] = {
        label: item.marque,
        color: item.fill,
      };
    });

    return config;
  }, [chartData]);

  return (
    <Card data-chart={id} className="flex flex-col">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1 text-center">
          <div className="flex gap-2   justify-center">
            <Car />
            <CardTitle>Répartition des véhicules</CardTitle>
          </div>

          <CardDescription>Nombre de véhicules par marque</CardDescription>
        </div>

        <Select value={activeBrand} onValueChange={setActiveBrand}>
          <SelectTrigger
            className="ml-auto h-7 w-[140px] rounded-lg pl-2.5"
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
                    className="flex h-3 w-3 shrink-0 rounded-xs"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
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
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="total"
              nameKey="marque"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              isAnimationActive={false}
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
