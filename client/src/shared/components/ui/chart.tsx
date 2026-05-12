/* eslint-disable react-refresh/only-export-components */
"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/shared/utils/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within ChartContainer");
  return context;
}

export function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, c]) => c.theme || c.color,
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, item]) => {
    const color = item.theme?.[theme as keyof typeof item.theme] || item.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

export const ChartTooltip = RechartsPrimitive.Tooltip;
export const ChartLegend = RechartsPrimitive.Legend;

export function ChartTooltipContent({
  active,
  payload,
  className,
  label,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div className={cn("rounded border bg-background p-2 text-xs", className)}>
      <div className="font-medium mb-1">{label}</div>

      {payload.map((item: any, index: number) => {
        const key = item.name || item.dataKey || `item-${index}`;
        const itemConfig = config[key];

        return (
          <div key={`${key}-${index}`} className="flex justify-between gap-4">
            <span className="text-muted-foreground">
              {itemConfig?.label || item.name}
            </span>
            <span className="font-mono">
              {Number(item.value).toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================
   LEGEND CONTENT (FIXED KEYS)
========================= */

export function ChartLegendContent({ payload, className }: any) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {payload
        .filter((item: any) => item.type !== "none")
        .map((item: any, index: number) => {
          const key = item.value || item.dataKey || `legend-${index}`;
          const itemConfig = config[key];

          return (
            <div
              key={`${key}-${index}`} // ✅ FIX: unique key
              className="flex items-center gap-2"
            >
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span>{itemConfig?.label || item.value}</span>
            </div>
          );
        })}
    </div>
  );
}
