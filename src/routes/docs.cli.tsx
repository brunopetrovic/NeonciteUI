import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const Route = createFileRoute("/docs/cli")({
  head: () => ({
    meta: [
      { title: "CLI Reference — Neoncite/UI" },
      {
        name: "description",
        content:
          "The neoncite CLI: initialize projects and install UI components, Blocks, and dark themes from the Neoncite registry.",
      },
    ],
  }),
  component: CliPage,
});

const commands = [
  {
    cmd: "init",
    desc: "Bootstrap Neoncite in the current project: create neoncite.json, install shared utility dependencies, scaffold cn(), and wire the Neoncite Tailwind v4 theme into the detected global stylesheet.",
    example: "npx neoncite@latest init",
  },
  {
    cmd: "init -y",
    desc: "Run initialization non-interactively with the default @/components and @/lib/utils destinations.",
    example: "npx neoncite@latest init -y",
  },
  {
    cmd: "add <item...>",
    desc: "Install UI components, registry Blocks, or dark theme items. Neoncite resolves registry dependencies recursively, installs npm dependencies, preserves nested Block paths, and rewrites internal imports to local relative paths.",
    example:
      "npx neoncite add button combobox terminal\nnpx neoncite add telemetry-dashboard\nnpx neoncite add theme-ocean",
  },
  {
    cmd: "add --all",
    desc: "Install every registry:ui component. Blocks and themes remain explicit installs so --all never writes an unexpected page/template or changes your chosen theme.",
    example: "npx neoncite add --all -y",
  },
  {
    cmd: "list",
    desc: "List every available registry item and its type (registry:ui, registry:block, or registry:theme).",
    example: "npx neoncite list",
  },
  {
    cmd: "diff <item>",
    desc: "Compare a locally installed registry item against upstream after applying the same path/import rewriting used during installation.",
    example: "npx neoncite diff server-card",
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
        The <code className="text-foreground">neoncite</code> CLI installs inspectable source into
        your application. Components, Blocks, and dark themes share the same registry transport;
        there is no hidden runtime renderer.
      </p>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-10">
        Coordinated release candidate: 0.2.0
      </p>

      <div className="space-y-8">
        {commands.map((command) => (
          <section key={command.cmd} className="border-b border-[color:var(--hairline)] pb-8">
            <h3 className="text-[18px] font-mono font-bold mb-2 neon-white">{command.cmd}</h3>
            <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">{command.desc}</p>
            <CodeBlock code={command.example} language="bash" />
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-5">
        <h2 className="font-mono text-[11px] uppercase tracking-widest neon-cyan">Inspect before you trust</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Registry installs write source into your repository. You can inspect any item at
          <code className="mx-1 text-foreground">/r/&lt;item&gt;.json</code> before installing it,
          and use <code className="text-foreground">diff</code> later to see local drift.
        </p>
      </section>
    </article>
  );
}
