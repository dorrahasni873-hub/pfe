"use client";

import * as React from "react";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartContainer } from "@/shared/components/ui/chart";
import { cn } from "@/shared/utils/utils";

type Props = {
  title: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  value: number;
  color?: string;
  bg?: string;
  className?: string;
  small?: boolean;
};

export function GraphiqueRadialText({
  title,
  icon: Icon,
  description,
  value,
  color,
  bg,
  className,
  small = false,
}: Props) {
  const chartData = [{ name: "total", value }];
  const maxValue = Math.max(value, 100);
  const angle = Math.min((value / maxValue) * 250, 250);

  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all duration-500",
        "hover:scale-[1.02] hover:shadow-2xl",
        "bg-linear-to-br",
        bg || "from-card to-card",
        className,
      )}
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-500" />

      <CardHeader className={small ? "items-center pb-0 pt-2 space-y-0 relative z-10" : "items-center pb-0 pt-4 space-y-0 relative z-10"}>
        <CardTitle className={small ? "flex items-center gap-1 text-[11px] font-semibold text-foreground" : "flex items-center gap-1.5 text-sm font-semibold text-foreground"}>
          {Icon && <Icon className={small ? "h-3 w-3 text-muted-foreground" : "h-4 w-4 text-muted-foreground"} />}
          {title}
        </CardTitle>
        {description && (
          <CardDescription className={small ? "text-[10px] text-muted-foreground text-center" : "text-xs text-muted-foreground text-center"}>
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center relative z-10 p-1">
        <ChartContainer config={{}} className={small ? "mx-auto h-[80px] w-[80px]" : "mx-auto h-[110px] w-[110px]"}>
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={angle}
            outerRadius={small ? 40 : 55}
            innerRadius={small ? 30 : 42}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={small ? [40, 30] : [55, 42]}
            />
            <RadialBar
              dataKey="value"
              fill={color || "var(--chart-1)"}
              cornerRadius={8}
              background={{ fill: "var(--border)" }}
              animationBegin={150}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={small ? "fill-foreground text-base font-bold" : "fill-foreground text-2xl font-bold"}
                        >
                          {Number.isFinite(value) ? value : 0}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + (small ? 12 : 16)}
                          className="fill-muted-foreground text-[9px]"
                        >
                          Total
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
    </Card>
  );
}
