import { KpiCard } from "@/registry/ui/kpi-card";

export function StatsStrip() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <KpiCard label="Requests" value="14.2K" delta="+12.3%" trend="up" accent="green" />
      <KpiCard label="Latency" value="84ms" delta="-4ms" trend="down" accent="cyan" />
      <KpiCard label="Errors" value="0.02%" delta="-0.1%" trend="down" accent="yellow" />
      <KpiCard label="Uptime" value="99.98%" delta="30d" trend="flat" accent="purple" />
    </div>
  );
}
