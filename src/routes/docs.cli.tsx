import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const Route = createFileRoute("/docs/cli")({
  head: () => ({
    meta: [
      { title: "CLI Reference — Neoncite/UI" },
      {
        name: "description",
        content: "The neoncite CLI: init, add, list, and diff. Full reference.",
      },
    ],
  }),
  component: CliPage,
});

const commands = [
  {
    cmd: "init",
    desc: "Create neoncite.json for the current project and configure the registry plus local aliases.",
    example: "npx neoncite@latest init",
  },
  {
    cmd: "add <component...>",
    desc: "Add one or more components. Resolves registry dependencies recursively and installs npm packages.",
    example: "npx neoncite add button card dialog",
  },
  {
    cmd: "list",
    desc: "List every component currently available from the configured Neoncite registry.",
    example: "npx neoncite list",
  },
  {
    cmd: "diff <component>",
    desc: "Show local-vs-upstream drift for a component so you can inspect changes before updating it.",
    example: "npx neoncite diff button",
  },
];

function CliPage() {
  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-widest neon-green mb-3">Reference</p>
      <h1 className="text-[40px] font-mono font-bold tracking-tighter neon-white mb-4">CLI</h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        The <code className="text-foreground">neoncite</code> CLI manages your local copy of the
        design system. Its registry format follows the same source-install model used by shadcn-style
        registries, while Neoncite keeps its own configuration and visual system.
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
