import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const Route = createFileRoute("/docs/cli")({
  head: () => ({
    meta: [
      { title: "CLI Reference — Neoncite/UI" },
      {
        name: "description",
        content: "The neoncite CLI: init, add, diff, theme. Full reference.",
      },
    ],
  }),
  component: CliPage,
});

const commands = [
  {
    cmd: "init",
    desc: "Set up Neoncite in a project. Writes tokens, theme, and components.json.",
    example: "npx neoncite@latest init",
  },
  {
    cmd: "add <component...>",
    desc: "Add one or more components. Resolves registry dependencies recursively and installs npm packages.",
    example: "npx neoncite add button card dialog",
  },
  {
    cmd: "diff <component>",
    desc: "Show local-vs-upstream drift. Useful before upgrading.",
    example: "npx neoncite diff button",
  },
  {
    cmd: "theme <name>",
    desc: "Switch the active theme. Built-in: neoncite, neoncite-mono.",
    example: "npx neoncite theme neoncite-mono",
  },
];

function CliPage() {
  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-widest neon-green mb-3">Reference</p>
      <h1 className="text-[40px] font-mono font-bold tracking-tighter neon-white mb-4">CLI</h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        The <code className="text-foreground">neoncite</code> CLI manages your local copy of the
        design system. It's schema-compatible with shadcn registries, so it works with any registry
        that follows the same format.
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
