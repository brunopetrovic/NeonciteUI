import * as React from "react";
import { cn } from "@/lib/utils";

export interface TerminalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  status?: React.ReactNode;
}

export function Terminal({
  title = "terminal",
  status,
  className,
  children,
  ...props
}: TerminalProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] shadow-[var(--recessed-shadow)]",
        className,
      )}
      {...props}
    >
      <div className="flex h-9 items-center gap-2 border-b border-[color:var(--hairline)] bg-[color:var(--surface-1)] px-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[color:var(--neon-red)]/80" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--neon-yellow)]/80" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--neon-green)]/80" />
        </div>
        <div className="ml-1 font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">
          {title}
        </div>
        {status && (
          <div className="ml-auto font-mono text-[10px] text-muted-foreground">{status}</div>
        )}
      </div>
      <div className="overflow-auto p-4 font-mono text-[12px] leading-relaxed text-foreground">
        {children}
      </div>
    </div>
  );
}

export function TerminalLine({
  prompt = "$",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { prompt?: React.ReactNode }) {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <span className="select-none text-[color:var(--neon-green)]">{prompt}</span>
      <span className="min-w-0 flex-1">{children}</span>
    </div>
  );
}

export function TerminalOutput({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre className={cn("mt-2 whitespace-pre-wrap text-muted-foreground", className)} {...props} />
  );
}
