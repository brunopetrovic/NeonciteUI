import * as React from "react";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "../lib/utils";
import { StatusLed } from "./status-led";

export interface ConnectionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  state: "connected" | "connecting" | "disconnected";
  endpoint?: React.ReactNode;
  latency?: number;
}

export function ConnectionStatus({
  state,
  endpoint,
  latency,
  className,
  ...props
}: ConnectionStatusProps) {
  const connected = state === "connected";
  const status = connected ? "online" : state === "connecting" ? "warning" : "error";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] px-3 py-2 font-mono text-[11px] shadow-[var(--rim-light-shadow)]",
        className,
      )}
      {...props}
    >
      <StatusLed status={status} pulse={state === "connecting"} label={state} />
      {connected ? (
        <Wifi className="h-3.5 w-3.5 text-[color:var(--neon-green)]" />
      ) : (
        <WifiOff className="h-3.5 w-3.5 text-muted-foreground" />
      )}
      <span className="uppercase tracking-wider text-foreground">{state}</span>
      {endpoint && <span className="text-muted-foreground">{endpoint}</span>}
      {latency !== undefined && (
        <span className="ml-auto tabular-nums text-muted-foreground">{latency}ms</span>
      )}
    </div>
  );
}
