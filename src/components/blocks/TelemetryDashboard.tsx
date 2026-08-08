import { Gauge } from "@/registry/ui/gauge";
import { LatencyIndicator } from "@/registry/ui/latency-indicator";
import { SparklineMetric } from "@/registry/ui/sparkline-metric";
import { SystemHealth } from "@/registry/ui/system-health";
import { TelemetryHeader, TelemetryPanel, TelemetryRow } from "@/registry/ui/telemetry-panel";

export function TelemetryDashboard() {
  return (
    <div className="rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] p-5">
      <div className="mb-5 flex items-end justify-between"><div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Telemetry</div><h3 className="mt-1 font-mono text-xl font-bold text-foreground">Runtime overview</h3></div><LatencyIndicator value={84} /></div>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.25fr]">
        <div className="grid gap-4 sm:grid-cols-2"><SparklineMetric label="Requests/s" value="14.2k" delta="+8.4%" data={[8,12,10,16,18,15,24]} /><SparklineMetric label="Errors" value="0.4%" delta="-0.1%" data={[4,3,3,2,4,2,1]} accent="var(--neon-red)" /><div className="flex items-center justify-center rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4"><Gauge value={72} label="CPU" unit="%" /></div><SystemHealth checks={[{ label: "API", status: "online", value: "42ms" }, { label: "Queue", status: "warning", value: "1.2s" }, { label: "Database", status: "online", value: "18ms" }]} /></div>
        <TelemetryPanel><TelemetryHeader><span>Service</span><span>Value</span></TelemetryHeader><TelemetryRow label="Throughput" value="8.4 GB/s" tone="cyan" /><TelemetryRow label="Connections" value="2,482" tone="green" /><TelemetryRow label="Cache hit" value="96.8%" tone="purple" /><TelemetryRow label="Queue depth" value="184" tone="yellow" /></TelemetryPanel>
      </div>
    </div>
  );
}
