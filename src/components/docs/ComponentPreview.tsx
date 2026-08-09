import * as React from "react";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  preview: React.ReactNode;
  code: string;
  filename?: string;
  className?: string;
}

export function ComponentPreview({ preview, code, filename, className }: ComponentPreviewProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");

  return (
    <div
      className={cn(
        "rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[color:var(--hairline)] px-3 h-11 bg-[color:var(--surface-2)]">
        <div className="flex h-full items-center gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "h-7 px-3 rounded-[8px] text-[12px] font-mono uppercase tracking-wider transition-colors",
                tab === t
                  ? "bg-white/[0.06] text-foreground border border-[color:var(--hairline)]"
                  : "text-muted-foreground hover:text-foreground border border-transparent",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      {tab === "preview" ? (
        <div
          data-preview-container
          className="relative min-h-[260px] flex items-center justify-center p-10 bg-grid"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--surface-1)]/40 pointer-events-none" />
          <div className="relative z-10">{preview}</div>
        </div>
      ) : (
        <CodeBlock
          code={code}
          language="tsx"
          filename={filename}
          className="rounded-none border-0 shadow-none"
        />
      )}
    </div>
  );
}
