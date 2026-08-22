import { AreaChart, Area, XAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/ui/chart";

export const usage = `import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/neoncite/chart"
import { AreaChart, Area, XAxis, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 420 },
]

const config = { value: { label: "Requests", color: "#ff2a9d" } }

export function Demo() {
  return (
    <ChartContainer config={config} className="h-[200px] w-full">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2e" />
        <XAxis dataKey="month" stroke="#8e8e93" fontSize={12} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="value" stroke="#ff2a9d" fill="#ff2a9d" fillOpacity={0.15} />
      </AreaChart>
    </ChartContainer>
  )
}`;

export const preview = (
  <div className="w-[320px] h-[180px]">
    <ChartContainer
      config={{
        requests: { label: "Requests", color: "#ff2a9d" },
        latency: { label: "Latency", color: "#00f0ff" },
      }}
      className="h-full w-full"
    >
      <AreaChart
        data={[
          { m: "Jan", requests: 186, latency: 80 },
          { m: "Feb", requests: 305, latency: 72 },
          { m: "Mar", requests: 237, latency: 91 },
          { m: "Apr", requests: 420, latency: 65 },
          { m: "May", requests: 380, latency: 58 },
        ]}
      >
        <defs>
          <linearGradient id="chartPink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff2a9d" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ff2a9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2e" vertical={false} />
        <XAxis dataKey="m" stroke="#8e8e93" fontSize={10} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="requests"
          stroke="#ff2a9d"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#chartPink)"
        />
        <Area type="monotone" dataKey="latency" stroke="#00f0ff" strokeWidth={2} fillOpacity={0} />
      </AreaChart>
    </ChartContainer>
  </div>
);
