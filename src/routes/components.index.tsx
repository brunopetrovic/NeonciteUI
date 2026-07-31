import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { REGISTRY, CATEGORIES } from "@/registry";
import { SHOWCASES } from "@/registry/showcases";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/components/")({
  head: () => ({
    meta: [
      { title: "Components — Neoncite/UI" },
      {
        name: "description",
        content:
          "Browse every component in the Neoncite design system. Live previews, source, and one-line install.",
      },
    ],
  }),
  component: ComponentsIndex,
});

function ComponentsIndex() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1300px] px-4 md:px-8 py-12 md:py-16">
        <header className="mb-10 md:mb-14">
          <p className="font-mono text-[11px] uppercase tracking-widest neon-pink mb-3">Library</p>
          <h1 className="text-[36px] md:text-[56px] font-mono font-bold tracking-tighter neon-white mb-3">
            Components
          </h1>
          <p className="text-[15px] text-muted-foreground max-w-2xl">
            Every component below is built on Radix primitives and styled with the Neoncite & Neon
            system. Copy-paste or install via the CLI.
          </p>
        </header>

        {CATEGORIES.map((cat) => {
          const items = REGISTRY.filter((r) => r.category === cat.id);
          if (items.length === 0) return null;
          return (
            <section key={cat.id} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-mono text-[12px] uppercase tracking-widest text-foreground">
                  {cat.label}
                </h2>
                <div className="flex-1 h-px bg-[color:var(--hairline)]" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  {items.length.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => {
                  const showcase = SHOWCASES[item.slug];
                  return (
                    <div
                      key={item.slug}
                      onClick={() =>
                        navigate({ to: "/components/$slug", params: { slug: item.slug } })
                      }
                      className="group block rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] overflow-hidden hover:border-white/10 hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <div className="relative h-[200px] flex items-center justify-center bg-grid bg-[color:var(--surface-2)]/30 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[color:var(--surface-1)]/60" />
                        <div className="relative scale-90">{showcase?.preview}</div>
                      </div>
                      <div className="border-t border-[color:var(--hairline)] p-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <item.icon size={14} className={item.accent} strokeWidth={2.5} />
                            <Link
                              to="/components/$slug"
                              params={{ slug: item.slug }}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[14px] font-semibold neon-white hover:underline"
                            >
                              {item.name}
                            </Link>
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
                        <p className="text-[12px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </div>
  );
}
