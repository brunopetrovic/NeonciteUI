import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import { Separator } from "@/registry/ui/separator";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { chartConfig, chartData } from "@/routes/-blocks.data";

export function DashboardActivity() {
  return (
    <div className="rounded-[20px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] overflow-hidden">
      <header className="px-6 py-4 border-b border-[color:var(--hairline)] bg-[color:var(--surface-1)] flex items-center justify-between">
        <div>
          <h3 className="text-[16px] font-semibold neon-white">Network Activity</h3>
          <p className="text-[12px] text-muted-foreground">
            Requests and latency over the last 7 days
          </p>
        </div>
        <Badge variant="pink">Live</Badge>
      </header>

      <div className="grid lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[color:var(--hairline)]">
        {/* Sidebar Metrics */}
        <div className="p-6 space-y-6 lg:col-span-1 bg-[color:var(--surface-1)]/50">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Total Requests
            </span>
            <div className="text-[32px] font-mono font-bold neon-white tabular-nums tracking-tighter">
              19,550
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="text-[var(--neon-green)]">↑ 12%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </div>
          <Separator />
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Avg Latency
            </span>
            <div className="text-[32px] font-mono font-bold neon-cyan tabular-nums tracking-tighter">
              142ms
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="text-[var(--neon-green)]">↓ 8ms</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </div>
          <Separator />
          <div className="space-y-4 pt-2">
            <Button variant="primary" className="w-full">
              View Logs
            </Button>
            <Button variant="outline" className="w-full">
              Export Data
            </Button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="p-6 lg:col-span-3">
          <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--neon-pink)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--neon-pink)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--neon-cyan)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--neon-cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--hairline)" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                dx={-10}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="var(--neon-pink)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReq)"
              />
              <Area
                type="monotone"
                dataKey="latency"
                stroke="var(--neon-cyan)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLat)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
