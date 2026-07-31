import type * as React from "react";

export function BlockFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <div className="flex-1 h-px bg-[color:var(--hairline)]" />
      </div>
      {children}
    </section>
  );
}
