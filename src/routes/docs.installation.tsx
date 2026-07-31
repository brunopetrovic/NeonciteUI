import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InstallTabs } from "@/components/docs/InstallTabs";

export const Route = createFileRoute("/docs/installation")({
  head: () => ({
    meta: [
      { title: "Installation — Neoncite/UI" },
      {
        name: "description",
        content: "Install Neoncite/UI in any React project with one command.",
      },
    ],
  }),
  component: InstallationPage,
});

function InstallationPage() {
  return (
    <article className="prose-invert max-w-none">
      <p className="font-mono text-[11px] uppercase tracking-widest neon-pink mb-3">Get started</p>
      <h1 className="text-[40px] font-mono font-bold tracking-tighter neon-white mb-4">
        Installation
      </h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Neoncite ships components as source files into your repo via a CLI — no runtime dependency,
        full ownership.
      </p>

      <section className="mb-10">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-3">1. Initialize</h2>
        <p className="text-[14px] text-muted-foreground mb-4">
          Bootstraps Tailwind v4 tokens, sets up a{" "}
          <code className="text-foreground">components.json</code>, and writes the Neoncite theme
          CSS.
        </p>
        <CodeBlock code="npx neoncite@latest init" language="bash" filename="terminal" />
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-3">2. Add a component</h2>
        <p className="text-[14px] text-muted-foreground mb-4">
          Resolves dependencies, installs npm packages, and writes the source into{" "}
          <code className="text-foreground">components/neoncite/</code>.
        </p>
        <InstallTabs slug="button" />
      </section>

      <section className="mb-10">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-3">3. Use it</h2>
        <CodeBlock
          language="tsx"
          filename="App.tsx"
          code={`import { Button } from "@/components/neoncite/button"\n\nexport default function App() {\n  return <Button variant="primary">Ship it</Button>\n}`}
        />
      </section>

      <section className="rounded-[14px] border border-[#00f0ff]/30 bg-[#00f0ff]/[0.04] p-5 mt-12">
        <p className="font-mono text-[11px] uppercase tracking-widest neon-cyan mb-2">
          Requirements
        </p>
        <ul className="text-[13px] text-muted-foreground space-y-1.5">
          <li>• React 18 or 19</li>
          <li>• Tailwind CSS v4</li>
          <li>• A bundler with TypeScript path aliases (Vite, Next.js, etc.)</li>
        </ul>
      </section>
    </article>
  );
}
