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
  gradient?: string;
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
        text-white
        shadow-xl
        border border-white/10
    bg-linear-to-br ${bg}
      `}
    >
      {/* soft glow overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none" />

      <CardHeader className="items-center pb-0 pt-4 space-y-1 relative">
        <CardTitle className="text-sm flex items-center gap-2 text-slate-900">
          {" "}
          {Icon && <Icon className="h-4 w-4 text-slate-700" />}
          {title}
        </CardTitle>

        {description && (
          <CardDescription className="text-xs text-slate-600 text-center">
            {" "}
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center p-2 relative">
        <ChartContainer config={{}} className="mx-auto h-[160px] w-[160px]">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            outerRadius={60}
            innerRadius={48}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[60, 48]}
            />

            <RadialBar dataKey="value" fill={color} cornerRadius={10} />

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
                          className="fill-slate-900 text-2xl font-bold"
                        >
                          {Number.isFinite(value) ? value : 0}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="fill-slate-600 text-[11px]"
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
