import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { InstallTabs } from "@/components/docs/InstallTabs";
import { getRegistryItem, REGISTRY, type RegistryItem } from "@/registry";
import { getComponentDocs } from "@/registry/component-docs";
import { SHOWCASES } from "@/registry/showcases";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

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
        <Link to="/components" className="mt-4 inline-block text-[13px] text-muted-foreground hover:text-foreground">← Back to all components</Link>
      </div>
    </div>
  ),
});

function SectionTitle({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "pink" | "yellow" | "green" | "purple" }) {
  const toneClass = { cyan: "neon-cyan", pink: "neon-pink", yellow: "neon-yellow", green: "neon-green", purple: "neon-purple" }[tone];
  return <h2 className={`font-mono text-[12px] uppercase tracking-widest mb-4 ${toneClass}`}>{children}</h2>;
}

function ComponentPage() {
  const { item } = Route.useLoaderData() as { item: RegistryItem };
  const showcase = SHOWCASES[item.slug];
  const docs = getComponentDocs(item);
  const idx = REGISTRY.findIndex((registryItem) => registryItem.slug === item.slug);
  const prev = idx > 0 ? REGISTRY[idx - 1] : null;
  const next = idx < REGISTRY.length - 1 ? REGISTRY[idx + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1100px] px-4 md:px-8 py-10 md:py-14">
        <Link to="/components" className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ChevronLeft size={12} /> All components
        </Link>

        <header className="mb-10 pb-8 border-b border-[color:var(--hairline)]">
          <div className="flex items-center gap-2 mb-3">
            <item.icon size={16} className={item.accent} strokeWidth={2.5} />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{item.category}</span>
          </div>
          <h1 className="text-[40px] md:text-[56px] font-mono font-bold tracking-tighter neon-white mb-3">{item.name}</h1>
          <p className="text-[15px] text-muted-foreground max-w-2xl leading-relaxed">{item.description}</p>
          <a
            href={`https://github.com/brunopetrovic/NeonciteUI/blob/main/src/registry/ui/${item.slug}.tsx`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Canonical source <ExternalLink className="h-3 w-3" />
          </a>
        </header>

        {showcase ? (
          <section className="mb-12">
            <SectionTitle>Preview</SectionTitle>
            <ComponentPreview preview={showcase.preview} code={showcase.usage} filename={`${item.slug}-demo.tsx`} />
          </section>
        ) : (
          <section className="mb-12 rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
            <SectionTitle>Preview</SectionTitle>
            <p className="text-sm text-muted-foreground">
              This newly registered component is fully installable and documented. Its dedicated interactive showcase is generated in the extended preview pass; use the canonical source and API contract below in the meantime.
            </p>
          </section>
        )}

        {showcase?.variations?.map((variation) => (
          <section key={variation.name} className="mb-12">
            <h2 className="font-mono text-[12px] uppercase tracking-widest mb-4 text-muted-foreground">{variation.name}</h2>
            <ComponentPreview preview={variation.preview} code={variation.usage} filename={`${item.slug}-${variation.name.toLowerCase()}.tsx`} />
          </section>
        ))}

        <section className="mb-12">
          <SectionTitle tone="pink">Installation</SectionTitle>
          <InstallTabs slug={item.slug} />
        </section>

        {(item.dependencies.length > 0 || item.registryDeps.length > 0) && (
          <section className="mb-12">
            <SectionTitle tone="yellow">Dependencies</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {item.dependencies.map((dependency) => (
                <code key={dependency} className="px-2.5 py-1 rounded-[8px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] text-[12px] font-mono">{dependency}</code>
              ))}
              {item.registryDeps.map((dependency) => (
                <Link key={dependency} to="/components/$slug" params={{ slug: dependency }} className="px-2.5 py-1 rounded-[8px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/10 text-[12px] font-mono neon-pink hover:bg-[color:var(--neon-pink)]/20 transition-colors">{dependency}</Link>
              ))}
            </div>
          </section>
        )}

        {showcase && (
          <section className="mb-12">
            <SectionTitle tone="green">Usage</SectionTitle>
            <CodeBlock code={showcase.usage} language="tsx" filename={`example-${item.slug}.tsx`} />
          </section>
        )}

        <section className="mb-12">
          <SectionTitle tone="purple">API Reference</SectionTitle>
          <div className="overflow-x-auto rounded-[14px] border border-[color:var(--hairline)]">
            <table className="w-full min-w-[680px] border-collapse text-left text-[12px]">
              <thead className="bg-[color:var(--surface-2)] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr><th className="px-4 py-3">Prop</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Default</th><th className="px-4 py-3">Description</th></tr>
              </thead>
              <tbody>
                {docs.props.map((prop) => (
                  <tr key={prop.name} className="border-t border-[color:var(--hairline)] align-top">
                    <td className="px-4 py-3 font-mono text-foreground">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-[color:var(--neon-cyan)]">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{prop.default ?? "—"}</td>
                    <td className="px-4 py-3 leading-relaxed text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-5">
            <SectionTitle>States</SectionTitle>
            <ul className="space-y-2 text-sm text-muted-foreground">{docs.states.map((state) => <li key={state}>• {state}</li>)}</ul>
          </div>
          <div className="rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-5">
            <SectionTitle tone="green">Accessibility</SectionTitle>
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">{docs.accessibility.map((note) => <li key={note}>• {note}</li>)}</ul>
          </div>
        </section>

        {docs.keyboard.length > 0 && (
          <section className="mb-12">
            <SectionTitle tone="yellow">Keyboard interactions</SectionTitle>
            <div className="overflow-hidden rounded-[14px] border border-[color:var(--hairline)]">
              {docs.keyboard.map((entry) => (
                <div key={entry.key} className="grid gap-2 border-b border-[color:var(--hairline)] px-4 py-3 last:border-b-0 sm:grid-cols-[180px_1fr]">
                  <kbd className="font-mono text-[11px] text-foreground">{entry.key}</kbd>
                  <span className="text-sm text-muted-foreground">{entry.behavior}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12 grid gap-6 md:grid-cols-2">
          <div>
            <SectionTitle tone="pink">Composition</SectionTitle>
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">{docs.composition.map((note) => <li key={note}>• {note}</li>)}</ul>
          </div>
          <div>
            <SectionTitle tone="purple">Token contract</SectionTitle>
            <div className="flex flex-wrap gap-2">{docs.tokens.map((token) => <code key={token} className="rounded-[7px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] px-2 py-1 font-mono text-[10px] text-muted-foreground">{token}</code>)}</div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[14px] border border-[color:var(--hairline)] p-5"><SectionTitle>SSR / hydration</SectionTitle><p className="text-sm leading-relaxed text-muted-foreground">{docs.ssr}</p></div>
          <div className="rounded-[14px] border border-[color:var(--hairline)] p-5"><SectionTitle>RTL</SectionTitle><p className="text-sm leading-relaxed text-muted-foreground">{docs.rtl}</p></div>
        </section>

        <nav className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-[color:var(--hairline)]">
          {prev ? (
            <Link to="/components/$slug" params={{ slug: prev.slug }} className="group flex items-center gap-3 p-4 rounded-[12px] border border-[color:var(--hairline)] hover:bg-white/[0.03] transition-colors">
              <ChevronLeft size={18} className="text-muted-foreground group-hover:-translate-x-0.5 transition-transform" />
              <div className="text-right ml-auto"><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Previous</div><div className="text-[14px] font-semibold neon-white">{prev.name}</div></div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/components/$slug" params={{ slug: next.slug }} className="group flex items-center gap-3 p-4 rounded-[12px] border border-[color:var(--hairline)] hover:bg-white/[0.03] transition-colors col-start-2">
              <div><div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Next</div><div className="text-[14px] font-semibold neon-white">{next.name}</div></div>
              <ChevronRight size={18} className="text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : <div />}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
