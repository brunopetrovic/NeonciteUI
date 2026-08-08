"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState, type ReactNode } from "react";

export function BlockFrame({ label, slug, children }: { label: string; slug: string; children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const command = `npx neoncite add ${slug}`;

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id={slug} className="scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <a href={`#${slug}`} className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
          {label}
        </a>
        <div className="h-px min-w-10 flex-1 bg-[color:var(--hairline)]" />
        <code className="hidden font-mono text-[10px] text-muted-foreground sm:block">{command}</code>
        <button type="button" onClick={copy} className="inline-flex h-7 items-center gap-1.5 rounded-[8px] border border-[color:var(--hairline)] px-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-foreground">
          {copied ? <Check className="h-3 w-3 text-[color:var(--neon-green)]" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Install"}
        </button>
        <a href={`/r/${slug}.json`} target="_blank" rel="noreferrer" aria-label={`Open ${slug} registry JSON`} className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] border border-[color:var(--hairline)] text-muted-foreground hover:bg-white/5 hover:text-foreground">
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-[6px] border border-[color:var(--hairline)] bg-black/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur">
          Demo content
        </div>
        {children}
      </div>
    </section>
  );
}
