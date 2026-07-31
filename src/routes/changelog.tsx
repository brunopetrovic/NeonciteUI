import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Badge } from "@/registry/ui/badge";
import { CheckCircle2, Sparkles, Wrench, Rocket } from "lucide-react";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — Neoncite/UI" },
      {
        name: "description",
        content: "Versioned release notes and roadmap for the Neoncite UI design system.",
      },
      { property: "og:title", content: "Changelog — Neoncite/UI" },
      { property: "og:description", content: "Release notes and roadmap." },
    ],
  }),
  component: ChangelogPage,
});

type Entry = {
  version: string;
  date: string;
  tag: "release" | "feature" | "fix";
  title: string;
  items: string[];
};

const ENTRIES: Entry[] = [
  {
    version: "1.1.0",
    date: "2026-05-15",
    tag: "feature",
    title: "Six new primitives",
    items: [
      "Added Switch — hardware-style toggle with neon-pink active glow",
      "Added Accordion — collapsible sections with neon-pink active triggers",
      "Added Hover Card — rich hover-triggered preview panel",
      "Added Breadcrumb — mono uppercase trail with chevron separators",
      "Added Sonner — themed toast notifications (success/error/warn/info)",
      "Added Command — keyboard-driven command palette built on cmdk",
      "Toaster wired into root layout — call toast.success() anywhere",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-05-14",
    tag: "release",
    title: "Initial public release",
    items: [
      "23 components shipped: Button, Card, Dialog, Input, Textarea, Label, Badge, Separator, Avatar, Toggle, Slider, Checkbox, Progress, Tabs, Tooltip, KPI Card, Skeleton, Alert, Popover, Radio Group, Select, Sheet, Dropdown Menu",
      "shadcn-compatible registry at /r/*.json with full source + dependency resolution",
      "@neoncite/cli — npx neoncite@latest init / add",
      "@neoncite/ui — npm package for direct dependency consumption",
      "Neoncite design tokens: 9-neon palette, OLED black surfaces, machined gradients, hairline rules",
      "Built on Radix UI primitives with WCAG-aware accessibility defaults",
    ],
  },
];

const ROADMAP = [
  { tag: "next", text: "Data Table — sortable, paginated, with virtualized rows" },
  { tag: "next", text: "Calendar + Date Picker — built on react-day-picker" },
  { tag: "next", text: "Form — react-hook-form integration with zod validation" },
  { tag: "soon", text: "Charts — Recharts wrappers themed to Neoncite tokens" },
  { tag: "soon", text: "Sidebar layout block — collapsible app shell" },
  { tag: "later", text: "MDX-powered docs with embedded live previews" },
  { tag: "later", text: "Figma library mirroring the registry 1:1" },
];

function ChangelogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[820px] px-4 md:px-8 py-12 md:py-16">
        <header className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest neon-cyan mb-3">
            Changelog
          </p>
          <h1 className="text-[36px] md:text-[52px] font-mono font-bold tracking-tighter neon-white mb-3">
            Releases
          </h1>
          <p className="text-[15px] text-muted-foreground max-w-xl">
            Every version of Neoncite/UI, with what changed and what's next.
          </p>
        </header>

        <ol className="relative space-y-10 border-l border-[color:var(--hairline)] pl-6 md:pl-8">
          {ENTRIES.map((e) => (
            <li key={e.version} className="relative">
              <span className="absolute -left-[33px] md:-left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[color:var(--neon-pink)]/40 bg-[color:var(--surface-1)] shadow-[0_0_12px_rgba(255,42,157,0.4)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon-pink)]" />
              </span>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="font-mono text-[20px] font-bold neon-white">v{e.version}</h2>
                <Badge
                  variant={e.tag === "release" ? "pink" : e.tag === "feature" ? "cyan" : "yellow"}
                >
                  {e.tag}
                </Badge>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {e.date}
                </span>
              </div>
              <p className="text-[15px] font-medium neon-white mb-3">{e.title}</p>
              <ul className="space-y-1.5">
                {e.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-[13px] text-muted-foreground leading-relaxed"
                  >
                    <CheckCircle2 size={14} className="neon-green mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <section className="mt-20">
          <div className="flex items-center gap-2 mb-6">
            <Rocket size={16} className="neon-pink" />
            <p className="font-mono text-[11px] uppercase tracking-widest neon-pink">Roadmap</p>
          </div>
          <h2 className="text-[28px] md:text-[36px] font-mono font-bold tracking-tighter neon-white mb-6">
            What's coming
          </h2>
          <div className="space-y-2">
            {ROADMAP.map((r) => (
              <div
                key={r.text}
                className="flex items-center gap-3 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4"
              >
                {r.tag === "next" ? (
                  <Wrench size={14} className="neon-cyan shrink-0" />
                ) : (
                  <Sparkles size={14} className="neon-purple shrink-0" />
                )}
                <span
                  className="font-mono text-[10px] uppercase tracking-widest min-w-[44px]"
                  style={{
                    color:
                      r.tag === "next"
                        ? "#00f0ff"
                        : r.tag === "soon"
                          ? "#b829ff"
                          : "var(--muted-foreground)",
                  }}
                >
                  {r.tag}
                </span>
                <span className="text-[13px] text-foreground">{r.text}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
