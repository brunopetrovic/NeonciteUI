import * as React from "react";
import { CheckCircle2, CircleDashed, GitCommitHorizontal, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DeploymentStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode;
  environment?: React.ReactNode;
  status: "queued" | "building" | "ready" | "failed";
  commit?: React.ReactNode;
  duration?: React.ReactNode;
}

export function DeploymentStatus({
  name,
  environment,
  status,
  commit,
  duration,
  className,
  ...props
}: DeploymentStatusProps) {
  const meta = {
    queued: { label: "Queued", icon: CircleDashed, tone: "text-muted-foreground" },
    building: { label: "Building", icon: CircleDashed, tone: "text-[color:var(--neon-yellow)]" },
    ready: { label: "Ready", icon: CheckCircle2, tone: "text-[color:var(--neon-green)]" },
    failed: { label: "Failed", icon: XCircle, tone: "text-[color:var(--neon-red)]" },
  }[status];
  const Icon = meta.icon;
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4 shadow-[var(--rim-light-shadow)]",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-[10px] border border-current/25 bg-current/5",
          meta.tone,
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            status === "building" && "animate-spin motion-reduce:animate-none",
          )}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{name}</div>
        <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground">
          {environment && <span className="uppercase tracking-wider">{environment}</span>}
          {commit && (
            <span className="inline-flex items-center gap-1">
              <GitCommitHorizontal className="h-3 w-3" />
              {commit}
            </span>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className={cn("font-mono text-[10px] uppercase tracking-[.16em]", meta.tone)}>
          {meta.label}
        </div>
        {duration && (
          <div className="mt-1 font-mono text-[10px] tabular-nums text-muted-foreground">
            {duration}
          </div>
        )}
      </div>
    </div>
  );
}
