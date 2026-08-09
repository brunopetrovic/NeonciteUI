import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Zap, Hexagon, Code2, Palette, Layers, Terminal, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { REGISTRY } from "@/registry";
import { FEATURED_SHOWCASES, FEATURED_SLUGS } from "@/registry/featured-showcases";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neoncite/UI — A premium machined UI design system" },
      {
        name: "description",
        content:
          "OLED black surfaces, hardware rim lighting, vibrant neon accents. Source-first React components built on Radix and Tailwind CSS v4.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-grid-drift opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-32 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[color:var(--neon-pink)]/10 blur-[120px] pointer-events-none" />
        <div className="absolute left-1/4 top-64 h-[300px] w-[400px] rounded-full bg-[color:var(--neon-cyan)]/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-[1100px] px-4 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24 text-center">
          <h1 className="font-mono text-[40px] md:text-[72px] leading-[0.95] font-bold tracking-tighter mb-6 text-white">
            <span className="block">Machined components</span>
            <span className="block">for the modern web.</span>
          </h1>

          <p className="mx-auto max-w-[640px] text-[15px] md:text-[17px] text-muted-foreground leading-relaxed mb-10">
            Neoncite is an opinionated React component library with deep OLED blacks, hardware rim
            lighting, and nine vibrant neon accents. Built on Radix. Source-first, inspectable, and
            yours to customize.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
            <Link
              to="/docs/installation"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[10px] bg-[#d11a7d] text-white font-mono text-[13px] font-semibold uppercase tracking-wider shadow-[0_0_32px_rgba(255,42,157,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_48px_rgba(255,42,157,0.7)] transition-all"
            >
              Get started <ArrowRight size={14} />
            </Link>
            <Link
              to="/components"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-[10px] border border-[color:var(--hairline)] text-foreground font-mono text-[13px] font-semibold uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              Browse components
            </Link>
          </div>

          <div className="mx-auto max-w-[520px]">
            <CodeBlock code="npx neoncite@latest init -y" language="bash" filename="terminal" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest neon-cyan mb-3">
            Why Neoncite
          </p>
          <h2 className="text-[28px] md:text-[40px] font-mono font-bold tracking-tighter neon-white">
            Not another beige UI kit.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Palette,
              color: "neon-pink",
              title: "Neoncite & Neon identity",
              body: "Deep OLED surfaces, machined gradients, rim lighting, and a 9-color neon palette engineered for dark interfaces.",
            },
            {
              icon: Code2,
              color: "neon-cyan",
              title: "Copy-paste, your code",
              body: "Components ship as source files into your repo. No black-box dependency — own it, inspect it, customize it.",
            },
            {
              icon: Hexagon,
              color: "neon-purple",
              title: "Built on Radix",
              body: "Interactive primitives use Radix foundations for keyboard, focus, and ARIA behavior, with Neoncite-specific validation layered on top.",
            },
            {
              icon: Terminal,
              color: "neon-green",
              title: "First-class CLI",
              body: "Initialize tokens and utilities, add source components, resolve dependencies, list registry items, and inspect local drift.",
            },
            {
              icon: Layers,
              color: "neon-yellow",
              title: "Themeable tokens",
              body: "Dark-only CSS-variable theming with semantic surfaces and neon accents. Customize the system without forking every component.",
            },
            {
              icon: Zap,
              color: "neon-orange",
              title: "Motion with intent",
              body: "Scan-lines, ripples, and restrained micro-motion where they add feedback. Reduced-motion behavior is part of the token layer.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group relative rounded-[16px] border border-[color:var(--hairline)] bg-gradient-to-b from-[color:var(--surface-2)] to-[color:var(--surface-1)] p-6 hover:border-white/10 transition-all"
            >
              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <f.icon size={20} className={`${f.color} mb-4`} strokeWidth={2} />
              <h3 className="text-[15px] font-semibold mb-2 neon-white">{f.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 md:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest neon-yellow mb-3">
              Showcase
            </p>
            <h2 className="text-[28px] md:text-[40px] font-mono font-bold tracking-tighter neon-white">
              Featured components.
            </h2>
          </div>
          <Link
            to="/components"
            className="hidden md:inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            All components <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_SLUGS.map((slug) => REGISTRY.find((item) => item.slug === slug)!).map(
            (item) => {
              const Showcase = FEATURED_SHOWCASES[item.slug];
              return (
                <div
                  key={item.slug}
                  onClick={() => navigate({ to: "/components/$slug", params: { slug: item.slug } })}
                  className="group rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] overflow-hidden hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="relative h-[180px] flex items-center justify-center bg-grid bg-[color:var(--surface-2)]/40 overflow-hidden pointer-events-none">
                    <div className="scale-90">{Showcase ? <Showcase /> : null}</div>
                  </div>
                  <div className="border-t border-[color:var(--hairline)] p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <item.icon size={13} className={item.accent} strokeWidth={2.5} />
                        <Link
                          to="/components/$slug"
                          params={{ slug: item.slug }}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[14px] font-semibold neon-white hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <p className="text-[12px] text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <Link
                      to="/components/$slug"
                      params={{ slug: item.slug }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${item.name}`}
                    >
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground group-hover:translate-x-0.5 group-hover:text-foreground transition-all"
                      />
                    </Link>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 md:px-8 py-16 md:py-24">
        <div className="relative rounded-[24px] border border-[color:var(--hairline)] bg-gradient-to-br from-[color:var(--surface-3)] via-[color:var(--surface-1)] to-[color:var(--surface-1)] p-8 md:p-14 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-[color:var(--neon-pink)]/15 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[color:var(--neon-cyan)]/10 blur-[100px]" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest neon-pink mb-3">
                Start from source
              </p>
              <h2 className="text-[28px] md:text-[36px] font-mono font-bold tracking-tighter neon-white mb-4">
                Bootstrap it. Inspect it. Own it.
              </h2>
              <ul className="space-y-2 mb-6">
                {[
                  "Radix-based interactive foundations",
                  "Tailwind CSS v4 native",
                  "TypeScript first",
                  "shadcn-style registry schema",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <Check size={14} className="neon-green" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <CodeBlock
              filename="terminal"
              language="bash"
              code={`npx neoncite@latest init -y\nnpx neoncite add button card dialog`}
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
