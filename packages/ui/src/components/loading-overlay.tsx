import * as React from "react";
import { cn } from "../lib/utils";
import { Spinner } from "./spinner";

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export function LoadingOverlay({
  label = "Loading",
  description,
  className,
  ...props
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-40 flex items-center justify-center bg-black/65 p-6 backdrop-blur-sm",
        className,
      )}
      aria-live="polite"
      aria-busy="true"
      {...props}
    >
      <div className="flex min-w-[180px] flex-col items-center rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] p-5 text-center shadow-[0_24px_48px_rgba(0,0,0,.65),var(--rim-light-shadow)]">
        <Spinner className="h-5 w-5" />
        <div className="mt-3 font-mono text-[11px] uppercase tracking-[.18em] text-foreground">
          {label}
        </div>
        {description && <div className="mt-1 text-xs text-muted-foreground">{description}</div>}
      </div>
    </div>
  );
}
