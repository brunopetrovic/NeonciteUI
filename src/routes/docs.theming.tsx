import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const Route = createFileRoute("/docs/theming")({
  head: () => ({
    meta: [
      { title: "Theming — Neoncite/UI" },
      {
        name: "description",
        content: "How Neoncite tokens work. Customize colors, neon palette, surfaces, and motion.",
      },
    ],
  }),
  component: ThemingPage,
});

const palette = [
  { name: "Neon Pink", hex: "#ff2a9d", cls: "neon-pink" },
  { name: "Neon Cyan", hex: "#00f0ff", cls: "neon-cyan" },
  { name: "Neon Blue", hex: "#3399ff", cls: "neon-blue" },
  { name: "Neon Yellow", hex: "#ffcc00", cls: "neon-yellow" },
  { name: "Neon Orange", hex: "#ff6600", cls: "neon-orange" },
  { name: "Neon Green", hex: "#00ff66", cls: "neon-green" },
  { name: "Neon Purple", hex: "#b829ff", cls: "neon-purple" },
  { name: "Neon Red", hex: "#ff003c", cls: "neon-red" },
  { name: "Neon Lime", hex: "#ccff00", cls: "neon-lime" },
];

function ThemingPage() {
  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-widest neon-purple mb-3">
        Foundations
      </p>
      <h1 className="text-[40px] font-mono font-bold tracking-tighter neon-white mb-4">Theming</h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Every Neoncite component reads from CSS variables. Override them in your global stylesheet
        to retheme the entire system without touching a single component.
      </p>

      <section className="mb-12">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-4">Neon palette</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {palette.map((c) => (
            <button
              key={c.hex}
              onClick={() => navigator.clipboard.writeText(c.hex)}
              className="group flex items-center gap-3 p-3 rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] hover:bg-[color:var(--surface-2)] transition-colors text-left"
            >
              <div
                className="h-10 w-10 rounded-[8px] shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                style={{
                  background: c.hex,
                  boxShadow: `0 0 16px ${c.hex}66, inset 0 1px 1px rgba(255,255,255,0.15)`,
                }}
              />
              <div className="min-w-0">
                <div className="text-[12px] font-semibold neon-white truncate">{c.name}</div>
                <div className={`font-mono text-[11px] ${c.cls}`}>{c.hex}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="text-[12px] text-muted-foreground mt-3 font-mono">Click a swatch to copy.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-4">Override tokens</h2>
        <CodeBlock
          language="css"
          filename="globals.css"
          code={`:root {\n  --background: #0a0a0c;\n  --foreground: #f2f2f7;\n  --primary: #ff2a9d;            /* swap to your brand */\n  --accent: #00f0ff;\n  --hairline: #1c1c1e;\n  --ring: var(--primary);\n}`}
        />
      </section>

      <section>
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-4">Built-in themes</h2>
        <ul className="text-[13px] text-muted-foreground space-y-2">
          <li>
            • <code className="text-foreground">neoncite</code> — default, OLED black + neon
          </li>
          <li>
            • <code className="text-foreground">neoncite-mono</code> — high-contrast, no neon
          </li>
        </ul>
      </section>
    </article>
  );
}
