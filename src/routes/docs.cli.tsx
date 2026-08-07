import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const Route = createFileRoute("/docs/cli")({
  head: () => ({
    meta: [
      { title: "CLI Reference — Neoncite/UI" },
      {
        name: "description",
        content: "The neoncite CLI: init, add, list, and diff. Full reference for CLI 0.2.0.",
      },
    ],
  }),
  component: CliPage,
});

const commands = [
  {
    cmd: "init",
    desc: "Bootstrap Neoncite in the current project: create neoncite.json, install the small shared utility dependencies, scaffold cn(), and wire the Neoncite Tailwind v4 theme into the detected global stylesheet.",
    example: "npx neoncite@latest init",
  },
  {
    cmd: "init -y",
    desc: "Run initialization non-interactively with the default @/components and @/lib/utils aliases.",
    example: "npx neoncite@latest init -y",
  },
  {
    cmd: "add <component...>",
    desc: "Add one or more components. Resolves registry dependencies recursively, installs npm packages, rewrites internal registry imports to your configured aliases, and writes source under your components alias.",
    example: "npx neoncite add button card dialog",
  },
  {
    cmd: "list",
    desc: "List every component currently available from the configured Neoncite registry.",
    example: "npx neoncite list",
  },
  {
    cmd: "diff <component>",
    desc: "Show local-vs-upstream drift for a component after applying the same alias rewriting used during installation.",
    example: "npx neoncite diff button",
  },
  {
    cmd: "--version",
    desc: "Print the installed Neoncite CLI version.",
    example: "npx neoncite --version",
  },
];

function CliPage() {
  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-widest neon-green mb-3">Reference</p>
      <h1 className="text-[40px] font-mono font-bold tracking-tighter neon-white mb-4">CLI</h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-3 max-w-2xl">
        The <code className="text-foreground">neoncite</code> CLI manages your local copy of the
        design system. Its registry format follows the same source-install model used by shadcn-style
        registries, while Neoncite keeps its own configuration and visual system.
      </p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">
        Current release target: CLI 0.2.0
      </p>

      <div className="space-y-8">
        {commands.map((c) => (
          <section key={c.cmd} className="border-b border-[color:var(--hairline)] pb-8">
            <h3 className="text-[18px] font-mono font-bold mb-2 neon-white">{c.cmd}</h3>
            <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">{c.desc}</p>
            <CodeBlock code={c.example} language="bash" />
          </section>
        ))}
      </div>
    </article>
  );
}
