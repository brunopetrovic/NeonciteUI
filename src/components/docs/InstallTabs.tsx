import * as React from "react";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "cli", label: "CLI", cmd: (slug: string) => `npx neoncite@latest add ${slug}` },
  { id: "npm", label: "npm", cmd: (_slug: string) => `npm install @neoncite/ui` },
  { id: "pnpm", label: "pnpm", cmd: (_: string) => `pnpm add @neoncite/ui` },
  { id: "bun", label: "bun", cmd: (_: string) => `bun add @neoncite/ui` },
] as const;

export function InstallTabs({ slug, className }: { slug: string; className?: string }) {
  const [active, setActive] = React.useState<(typeof tabs)[number]["id"]>("cli");
  const current = tabs.find((t) => t.id === active)!;
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-1 p-1 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "h-7 px-3 rounded-[7px] text-[11px] font-mono uppercase tracking-wider transition-colors",
              active === t.id
                ? "bg-[#d11a7d] text-white shadow-[0_0_12px_rgba(255,42,157,0.4)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <CodeBlock code={current.cmd(slug)} language="bash" />
    </div>
  );
}
