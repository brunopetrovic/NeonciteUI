import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { THEME_PRESETS } from "@/hooks/use-theme-builder";

export const Route = createFileRoute("/docs/theming")({
  head: () => ({
    meta: [
      { title: "Theming — Neoncite/UI" },
      {
        name: "description",
        content:
          "Customize Neoncite's dark-only token system, install official presets, and export CSS, JSON, or DTCG tokens.",
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
      <p className="font-mono text-[11px] uppercase tracking-widest neon-purple mb-3">Foundations</p>
      <h1 className="text-[40px] font-mono font-bold tracking-tighter neon-white mb-4">Theming</h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Neoncite is intentionally dark-only. Components read semantic CSS variables, so you can
        change accents, OLED surfaces, text, radius, glow, and other dark-theme tokens without
        forking component behavior.
      </p>

      <section className="mb-12">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-4">Official dark presets</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {THEME_PRESETS.map((preset) => (
            <div key={preset.slug} className="rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {[preset.primary, preset.accent, preset.surface2].map((color) => (
                    <span key={color} className="h-5 w-5 rounded-full border border-white/10" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <strong className="font-mono text-[12px] text-foreground">{preset.name}</strong>
              </div>
              <CodeBlock language="bash" filename="terminal" code={`npx neoncite add ${preset.slug}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-4">Neon palette</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {palette.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => navigator.clipboard.writeText(color.hex)}
              className="group flex items-center gap-3 p-3 rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] hover:bg-[color:var(--surface-2)] transition-colors text-left"
            >
              <div className="h-10 w-10 rounded-[8px] shrink-0" style={{ background: color.hex, boxShadow: `0 0 16px ${color.hex}66, inset 0 1px 1px rgba(255,255,255,.15)` }} />
              <div className="min-w-0">
                <div className="text-[12px] font-semibold neon-white truncate">{color.name}</div>
                <div className={`font-mono text-[11px] ${color.cls}`}>{color.hex}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-4">Override semantic tokens</h2>
        <CodeBlock
          language="css"
          filename="globals.css"
          code={`:root, .dark {\n  --surface-0: #000000;\n  --surface-1: #09090b;\n  --surface-2: #121214;\n  --surface-3: #1c1c1e;\n  --background: var(--surface-0);\n  --foreground: #f2f2f7;\n  --primary: #ff2a9d;\n  --accent: #00f0ff;\n  --ring: var(--primary);\n}`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-[20px] font-mono font-bold neon-cyan mb-4">Theme Builder workflow</h2>
        <div className="space-y-2 text-[13px] leading-relaxed text-muted-foreground">
          <p>Use the Theme Builder to preview production Neoncite components while editing the same tokens shipped to users.</p>
          <p>It supports named local themes, validated JSON import/export, CSS export, DTCG-compatible token JSON, contrast checks, and shareable URL state.</p>
          <p>Imported surface colors are validated as dark surfaces; the Theme Builder does not create a light-mode variant.</p>
        </div>
        <Link to="/themes" className="mt-4 inline-flex rounded-[9px] border border-[color:var(--neon-purple)]/40 bg-[color:var(--neon-purple)]/10 px-3 py-2 font-mono text-[11px] uppercase tracking-wider neon-purple">
          Open Theme Builder
        </Link>
      </section>
    </article>
  );
}
