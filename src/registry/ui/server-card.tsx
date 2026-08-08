import * as React from "react";
import { Cpu, HardDrive, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResourceMeter } from "@/registry/ui/resource-meter";
import { StatusLed } from "@/registry/ui/status-led";

export interface ServerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode;
  region?: React.ReactNode;
  status?: "online" | "warning" | "error" | "idle";
  cpu?: number;
  memory?: number;
  storage?: number;
}

export function ServerCard({
  name,
  region,
  status = "online",
  cpu,
  memory,
  storage,
  className,
  ...props
}: ServerCardProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-[color:var(--hairline)] bg-gradient-to-b from-[color:var(--surface-2)] to-[color:var(--surface-1)] p-5 shadow-[var(--machined-shadow)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] shadow-[var(--recessed-shadow)]">
          <Server className="h-4 w-4 text-[color:var(--neon-cyan)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-mono text-sm font-semibold text-foreground">{name}</div>
          {region && (
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">
              {region}
            </div>
          )}
        </div>
        <StatusLed status={status} pulse={status === "warning"} label={status} />
      </div>
      <div className="mt-5 space-y-4">
        {cpu !== undefined && (
          <ResourceMeter
            label={
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="h-3 w-3" />
                CPU
              </span>
            }
            ariaLabel="CPU"
            value={cpu}
          />
        )}
        {memory !== undefined && <ResourceMeter label="Memory" value={memory} />}
        {storage !== undefined && (
          <ResourceMeter
            label={
              <span className="inline-flex items-center gap-1.5">
                <HardDrive className="h-3 w-3" />
                Storage
              </span>
            }
            ariaLabel="Storage"
            value={storage}
          />
        )}
      </div>
    </div>
  );
}
