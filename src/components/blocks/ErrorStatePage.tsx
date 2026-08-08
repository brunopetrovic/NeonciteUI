import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { DiagnosticPanel } from "@/registry/ui/diagnostic-panel";

export function ErrorStatePage() {
  return (
    <div className="rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] p-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] border border-[color:var(--neon-red)]/35 bg-[color:var(--neon-red)]/10 text-[color:var(--neon-red)]">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="mt-4 font-mono text-[10px] uppercase tracking-[.22em] text-[color:var(--neon-red)]">
          Runtime fault
        </div>
        <h3 className="mt-2 font-mono text-2xl font-bold text-foreground">
          Unable to reach the control plane
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          The interface is intact, but the upstream service did not respond. Retry or inspect
          diagnostics before continuing.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button variant="primary">
            <RotateCcw className="h-4 w-4" /> Retry
          </Button>
          <Button variant="outline">
            <Home className="h-4 w-4" /> Dashboard
          </Button>
        </div>
        <DiagnosticPanel
          className="mt-7 text-left"
          items={[
            {
              severity: "error",
              title: "API gateway unavailable",
              detail: "Connection timed out after 8s.",
            },
            { severity: "pass", title: "Client configuration valid" },
            { severity: "info", title: "Last successful heartbeat", detail: "42 seconds ago" },
          ]}
        />
      </div>
    </div>
  );
}
