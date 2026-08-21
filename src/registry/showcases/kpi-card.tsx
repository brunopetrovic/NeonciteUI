import { KpiCard } from "@/registry/ui/kpi-card";

export const usage = `import { KpiCard } from "@/components/neoncite/kpi-card"

export function Demo() {
  return (
    <div className="grid grid-cols-2 gap-3 w-[320px]">
      <KpiCard label="Requests" value="14.2K" delta="+12.3%" trend="up" accent="green" />
      <KpiCard label="Latency" value="84ms" delta="-4ms" trend="down" accent="cyan" />
    </div>
  )
}`;

export const preview = (
  <div className="grid grid-cols-2 gap-3 w-[320px]">
    <KpiCard label="Requests" value="14.2K" delta="+12.3%" trend="up" accent="green" />
    <KpiCard label="Latency" value="84ms" delta="-4ms" trend="down" accent="cyan" />
  </div>
);
