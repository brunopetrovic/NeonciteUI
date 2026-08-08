import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronLeft, Copy, ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import * as React from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/registry/ui/button";
import { BLOCKS, getBlock, useBlockPreview } from "@/registry/block-loader";

export const Route = createFileRoute("/blocks/$slug")({
  head: ({ params }) => {
    const block = getBlock(params.slug);
    return {
      meta: [
        { title: block ? `${block.name} Block — Neoncite/UI` : "Block not found — Neoncite/UI" },
        {
          name: "description",
          content: block
            ? `Preview and install the ${block.name} Neoncite registry Block.`
            : "The requested Neoncite Block does not exist.",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const block = getBlock(params.slug);
    if (!block) throw notFound();
    return { block };
  },
  component: BlockDetailPage,
});

type Viewport = "desktop" | "tablet" | "mobile";

const widths: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

function BlockDetailPage() {
  const { block } = Route.useLoaderData();
  const Preview = useBlockPreview(block.slug);
  const [viewport, setViewport] = React.useState<Viewport>("desktop");
  const [copied, setCopied] = React.useState(false);
  const command = `npx neoncite add ${block.slug}`;
  const currentIndex = BLOCKS.findIndex((item) => item.slug === block.slug);
  const previous = currentIndex > 0 ? BLOCKS[currentIndex - 1] : null;
  const next = currentIndex < BLOCKS.length - 1 ? BLOCKS[currentIndex + 1] : null;

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-4 md:px-8 py-10 md:py-14">
        <Link
          to="/blocks"
          className="mb-6 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3 w-3" /> All Blocks
        </Link>

        <header className="mb-8 flex flex-col gap-5 border-b border-[color:var(--hairline)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] neon-cyan">
              registry:block
            </p>
            <h1 className="mt-2 font-mono text-[36px] font-bold tracking-tighter neon-white md:text-[52px]">
              {block.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Installable source Block composed from public Neoncite primitives. Preview data is
              illustrative and should be replaced with your product content.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[color:var(--neon-green)]" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy install"}
            </Button>
            <a
              href={`/r/${block.slug}.json`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-[color:var(--hairline)] px-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              Registry JSON <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={`https://github.com/brunopetrovic/NeonciteUI/blob/main/src/components/blocks/${block.source}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-[color:var(--hairline)] px-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              Source <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </header>

        <section className="mb-8">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <code className="font-mono text-[11px] text-muted-foreground">{command}</code>
            <div className="inline-flex self-start rounded-[9px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-1">
              {(
                [
                  ["desktop", Monitor, "Desktop"],
                  ["tablet", Tablet, "Tablet"],
                  ["mobile", Smartphone, "Mobile"],
                ] as const
              ).map(([id, Icon, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setViewport(id)}
                  aria-pressed={viewport === id}
                  className={`inline-flex h-7 items-center gap-1.5 rounded-[6px] px-2.5 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                    viewport === id
                      ? "bg-white/[.07] text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3 w-3" /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-3 md:p-5">
            <div
              className="mx-auto overflow-hidden rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] transition-[width] duration-200 motion-reduce:transition-none"
              style={{ width: widths[viewport], maxWidth: "100%" }}
            >
              {Preview ? (
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-[6px] border border-[color:var(--hairline)] bg-black/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur">
                    Demo content
                  </div>
                  <Preview />
                </div>
              ) : (
                <div className="flex min-h-[320px] items-center justify-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Loading preview…
                </div>
              )}
            </div>
          </div>
        </section>

        <nav className="grid grid-cols-2 gap-3 border-t border-[color:var(--hairline)] pt-8">
          {previous ? (
            <Link
              to="/blocks/$slug"
              params={{ slug: previous.slug }}
              className="rounded-[12px] border border-[color:var(--hairline)] p-4 text-sm text-muted-foreground hover:bg-white/[.03] hover:text-foreground"
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Previous
              </span>
              <span className="mt-1 block text-foreground">{previous.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/blocks/$slug"
              params={{ slug: next.slug }}
              className="col-start-2 rounded-[12px] border border-[color:var(--hairline)] p-4 text-right text-sm text-muted-foreground hover:bg-white/[.03] hover:text-foreground"
            >
              <span className="block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Next
              </span>
              <span className="mt-1 block text-foreground">{next.name}</span>
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
