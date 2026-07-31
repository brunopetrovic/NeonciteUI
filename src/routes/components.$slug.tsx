import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InstallTabs } from "@/components/docs/InstallTabs";
import { getRegistryItem, REGISTRY, type RegistryItem } from "@/registry";
import { SHOWCASES } from "@/registry/showcases";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/components/$slug")({
  head: ({ params }) => {
    const item = getRegistryItem(params.slug);
    if (!item) return { meta: [{ title: "Not found" }] };
    return {
      meta: [
        { title: `${item.name} — Neoncite/UI` },
        { name: "description", content: item.description },
        { property: "og:title", content: `${item.name} — Neoncite/UI` },
        { property: "og:description", content: item.description },
      ],
    };
  },
  loader: ({ params }) => {
    const item = getRegistryItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  component: ComponentPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--surface-0)]">
      <div className="text-center">
        <h1 className="text-2xl font-mono font-bold neon-white">Component not found</h1>
        <Link
          to="/components"
          className="mt-4 inline-block text-[13px] text-muted-foreground hover:text-foreground"
        >
          ← Back to all components
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-[color:var(--surface-0)]">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
});

function ComponentPage() {
  const { item } = Route.useLoaderData() as { item: RegistryItem };
  const showcase = SHOWCASES[item.slug];

  const idx = REGISTRY.findIndex((r) => r.slug === item.slug);
  const prev = idx > 0 ? REGISTRY[idx - 1] : null;
  const next = idx < REGISTRY.length - 1 ? REGISTRY[idx + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1100px] px-4 md:px-8 py-10 md:py-14">
        <Link
          to="/components"
          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft size={12} /> All components
        </Link>

        <header className="mb-10 pb-8 border-b border-[color:var(--hairline)]">
          <div className="flex items-center gap-2 mb-3">
            <item.icon size={16} className={item.accent} strokeWidth={2.5} />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {item.category}
            </span>
          </div>
          <h1 className="text-[40px] md:text-[56px] font-mono font-bold tracking-tighter neon-white mb-3">
            {item.name}
          </h1>
          <p className="text-[15px] text-muted-foreground max-w-2xl">{item.description}</p>
        </header>

        {showcase && (
          <section className="mb-12">
            <h2 className="font-mono text-[12px] uppercase tracking-widest mb-4 neon-cyan">
              Preview
            </h2>
            <ComponentPreview
              preview={showcase.preview}
              code={showcase.usage}
              filename={`${item.slug}-demo.tsx`}
            />
          </section>
        )}

        {showcase?.variations?.map((v) => (
          <section key={v.name} className="mb-12">
            <h2 className="font-mono text-[12px] uppercase tracking-widest mb-4 text-muted-foreground">
              {v.name}
            </h2>
            <ComponentPreview
              preview={v.preview}
              code={v.usage}
              filename={`${item.slug}-${v.name.toLowerCase()}.tsx`}
            />
          </section>
        ))}

        <section className="mb-12">
          <h2 className="font-mono text-[12px] uppercase tracking-widest mb-4 neon-pink">
            Installation
          </h2>
          <InstallTabs slug={item.slug} />
        </section>

        {item.dependencies.length > 0 && (
          <section className="mb-12">
            <h2 className="font-mono text-[12px] uppercase tracking-widest mb-4 neon-yellow">
              Dependencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {item.dependencies.map((d: string) => (
                <code
                  key={d}
                  className="px-2.5 py-1 rounded-[8px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] text-[12px] font-mono"
                >
                  {d}
                </code>
              ))}
              {item.registryDeps.map((d: string) => (
                <Link
                  key={d}
                  to="/components/$slug"
                  params={{ slug: d }}
                  className="px-2.5 py-1 rounded-[8px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/10 text-[12px] font-mono neon-pink hover:bg-[color:var(--neon-pink)]/20 transition-colors"
                >
                  {d}
                </Link>
              ))}
            </div>
          </section>
        )}

        {showcase && (
          <section className="mb-12">
            <h2 className="font-mono text-[12px] uppercase tracking-widest mb-4 neon-green">
              Usage
            </h2>
            <CodeBlock code={showcase.usage} language="tsx" filename={`example-${item.slug}.tsx`} />
          </section>
        )}

        <nav className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-[color:var(--hairline)]">
          {prev ? (
            <Link
              to="/components/$slug"
              params={{ slug: prev.slug }}
              className="group flex items-center gap-3 p-4 rounded-[12px] border border-[color:var(--hairline)] hover:bg-white/[0.03] transition-colors"
            >
              <ChevronLeft
                size={18}
                className="text-muted-foreground group-hover:-translate-x-0.5 transition-transform"
              />
              <div className="text-right ml-auto">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Previous
                </div>
                <div className="text-[14px] font-semibold neon-white">{prev.name}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/components/$slug"
              params={{ slug: next.slug }}
              className="group flex items-center gap-3 p-4 rounded-[12px] border border-[color:var(--hairline)] hover:bg-white/[0.03] transition-colors col-start-2"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Next
                </div>
                <div className="text-[14px] font-semibold neon-white">{next.name}</div>
              </div>
              <ChevronRight
                size={18}
                className="text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
