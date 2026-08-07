import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Blocks, Braces, Palette, Terminal } from "lucide-react";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Documentation — Neoncite/UI" },
      {
        name: "description",
        content:
          "Learn how to install, customize, and use Neoncite/UI components and its source-first registry.",
      },
    ],
  }),
  component: DocsOverview,
});

const cards = [
  {
    to: "/docs/installation" as const,
    icon: Terminal,
    accent: "neon-pink",
    title: "Installation",
    description: "Bootstrap the Neoncite tokens, aliases, utilities, and your first source component.",
  },
  {
    to: "/docs/cli" as const,
    icon: Braces,
    accent: "neon-cyan",
    title: "CLI reference",
    description: "Use init, add, list, diff, and version inspection without hidden registry behavior.",
  },
  {
    to: "/docs/theming" as const,
    icon: Palette,
    accent: "neon-purple",
    title: "Theming",
    description: "Understand Neoncite's dark-only semantic tokens, accents, surfaces, glow, and presets.",
  },
  {
    to: "/components" as const,
    icon: Blocks,
    accent: "neon-green",
    title: "Components",
    description: "Browse every registered component, live preview, install command, and usage example.",
  },
];

function DocsOverview() {
  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-widest neon-pink mb-3">Documentation</p>
      <h1 className="text-[40px] font-mono font-bold tracking-tighter neon-white mb-4">
        Build with Neoncite.
      </h1>
      <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground mb-10">
        Neoncite/UI is a dark-only, source-first React component system for technical products. Start
        with the CLI, inspect the registry source, then compose the primitives directly in your app.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="group rounded-[16px] border border-[color:var(--hairline)] bg-gradient-to-b from-[color:var(--surface-2)] to-[color:var(--surface-1)] p-5 transition-all hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-0)]"
          >
            <card.icon size={18} className={`${card.accent} mb-4`} strokeWidth={2} />
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-mono text-[15px] font-bold neon-white">{card.title}</h2>
              <ArrowRight
                size={14}
                className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {card.description}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest neon-yellow mb-2">
          Project status
        </p>
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Neoncite is under active pre-1.0 development. Public APIs and installation workflows are
          being hardened before a stable 1.0 release; migration notes will accompany intentional
          breaking changes.
        </p>
      </section>
    </article>
  );
}
