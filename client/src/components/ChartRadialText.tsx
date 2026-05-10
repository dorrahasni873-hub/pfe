"use client";

import * as React from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer } from "@/components/ui/chart";

type Props = {
  title: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  value: number;
  color?: string;
  bg?: string;
};

export function ChartRadialText({
  title,
  icon,
  description,
  value,
  color,
  bg,
}: Props) {
  const chartData = [
    {
      name: "total",
      value,
    },
  ];

  const Icon = icon;

  return (
    <Card
      className={`
        relative flex flex-col overflow-hidden
        shadow-xl
        border border-white/10
        bg-linear-to-br ${bg}
        w-[200px] h-[200px]
        p-1
      `}
    >
      {/* soft glow overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none" />

      <CardHeader className="items-center pb-0 pt-2 space-y-0 relative z-10">
        <CardTitle className="flex items-center gap-1 text-[11px] font-semibold text-slate-900 text-center">
          {Icon && <Icon className="h-3 w-3 text-slate-700" />}
          {title}
        </CardTitle>

        {description && (
          <CardDescription className="text-[9px] leading-tight text-slate-600 text-center">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center p-1 relative z-10">
        <ChartContainer config={{}} className="mx-auto h-[90px] w-[90px]">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            outerRadius={45}
            innerRadius={35}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[45, 35]}
            />

            <RadialBar
              dataKey="value"
              fill={color}
              cornerRadius={8}
              background
            />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-slate-900 text-lg font-bold"
                        >
                          {Number.isFinite(value) ? value : 0}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 14}
                          className="fill-slate-600 text-[8px]"
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
