import { Activity, Box, Search, Settings } from "lucide-react";
import { CommandBar } from "@/registry/ui/command-bar";
import { KpiCard } from "@/registry/ui/kpi-card";
import { MetricGrid } from "@/registry/ui/metric-grid";
import { ServerCard } from "@/registry/ui/server-card";
import { StatusIndicator } from "@/registry/ui/status-indicator";

export function DashboardShell() {
  return (
    <div className="grid min-h-[520px] grid-cols-[72px_1fr] overflow-hidden rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)]">
      <aside className="flex flex-col items-center gap-3 border-r border-[color:var(--hairline)] bg-[color:var(--surface-1)] py-4">
        {[Box, Activity, Search, Settings].map((Icon, index) => (
          <div key={index} className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[color:var(--hairline)] text-muted-foreground first:border-[color:var(--neon-pink)]/40 first:text-[color:var(--neon-pink)]">
            <Icon className="h-4 w-4" />
          </div>
        ))}
      </aside>
      <div className="min-w-0 p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Control plane</div><h3 className="mt-1 font-mono text-xl font-bold text-foreground">Operations</h3></div>
          <StatusIndicator status="online">All systems nominal</StatusIndicator>
        </div>
        <CommandBar>Search systems, deploys, logs…</CommandBar>
        <MetricGrid className="mt-5">
          <KpiCard label="Requests" value="14.2K" delta="+8.4%" trend="up" accent="green" />
          <KpiCard label="Latency" value="84ms" delta="-7ms" trend="down" accent="cyan" />
          <KpiCard label="Errors" value="0.4%" delta="-0.1%" trend="down" accent="pink" />
          <KpiCard label="Regions" value="12" delta="+1" trend="up" accent="purple" />
        </MetricGrid>
        <div className="mt-5 grid gap-4 lg:grid-cols-2"><ServerCard name="edge-07" region="fra-1" cpu={34} memory={61} storage={48} /><ServerCard name="edge-11" region="iad-1" cpu={52} memory={44} storage={71} /></div>
      </div>
    </div>
  );
}
