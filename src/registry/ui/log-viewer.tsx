import * as React from "react";
import { cn } from "@/lib/utils";

export type LogLevel = "debug" | "info" | "success" | "warn" | "error";
export interface LogEntry {
  id?: string;
  timestamp?: string;
  level?: LogLevel;
  message: React.ReactNode;
  source?: string;
}
export interface LogViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: LogEntry[];
  compact?: boolean;
}

const levelClass: Record<LogLevel, string> = {
  debug: "text-muted-foreground",
  info: "text-[color:var(--neon-cyan)]",
  success: "text-[color:var(--neon-green)]",
  warn: "text-[color:var(--neon-yellow)]",
  error: "text-[color:var(--neon-red)]",
};

export function LogViewer({ entries, compact = false, className, ...props }: LogViewerProps) {
  return (
    <div
      className={cn(
        "overflow-auto rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] font-mono shadow-[var(--recessed-shadow)]",
        className,
      )}
      role="log"
      aria-live="polite"
      {...props}
    >
      {entries.map((entry, index) => {
        const level = entry.level ?? "info";
        return (
          <div
            key={entry.id ?? index}
            className={cn(
              "grid grid-cols-[auto_auto_1fr] gap-3 border-b border-white/[.04] px-3 last:border-b-0",
              compact ? "py-1 text-[10px]" : "py-2 text-[11px]",
            )}
          >
            <span className="tabular-nums text-muted-foreground/70">{entry.timestamp ?? "—"}</span>
            <span className={cn("w-14 uppercase tracking-wider", levelClass[level])}>{level}</span>
            <span className="min-w-0 break-words text-foreground">
              <span>{entry.message}</span>
              {entry.source && <span className="ml-2 text-muted-foreground">[{entry.source}]</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}
