import { ActivityStream } from "@/registry/ui/activity-stream";
import { DeploymentStatus } from "@/registry/ui/deployment-status";
import { DiagnosticPanel } from "@/registry/ui/diagnostic-panel";

export function DeploymentDashboard() {
  return (
    <div className="grid gap-4 rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] p-5 lg:grid-cols-[1.1fr_.9fr]">
      <div><div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Deployments</div><div className="space-y-3"><DeploymentStatus name="api-edge" environment="production" status="ready" commit="9f31a2c" duration="52s" /><DeploymentStatus name="worker-sync" environment="production" status="building" commit="5a7d104" duration="18s" /><DeploymentStatus name="console" environment="preview" status="queued" commit="83bb0d2" /></div><div className="mt-5"><ActivityStream items={[{ title: "api-edge deployed", detail: "12 regions updated", time: "2m", status: "online" }, { title: "worker-sync build started", detail: "cache restored", time: "now", status: "info" }]} /></div></div>
      <DiagnosticPanel title="Release diagnostics" items={[{ severity: "pass", title: "Typecheck" }, { severity: "pass", title: "Registry integrity" }, { severity: "warning", title: "p95 latency", detail: "184ms, target 180ms" }, { severity: "pass", title: "Artifact parity" }]} />
    </div>
  );
}
