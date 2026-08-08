import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BlockFrame } from "@/components/blocks/BlockFrame";
import { HeroBrutal } from "@/components/blocks/HeroBrutal";
import { StatsStrip } from "@/components/blocks/StatsStrip";
import { PricingThreeTiers } from "@/components/blocks/PricingThreeTiers";
import { StatusHealth } from "@/components/blocks/StatusHealth";
import { AuthSignin } from "@/components/blocks/AuthSignin";
import { FeaturesGrid } from "@/components/blocks/FeaturesGrid";
import { TestimonialsNotes } from "@/components/blocks/TestimonialsNotes";
import { FaqFolded } from "@/components/blocks/FaqFolded";
import { PricingTiersAlternative } from "@/components/blocks/PricingTiersAlternative";
import { CtaBanner } from "@/components/blocks/CtaBanner";
import { DashboardActivity } from "@/components/blocks/DashboardActivity";

export const Route = createFileRoute("/blocks")({
  head: () => ({
    meta: [
      { title: "Blocks — Neoncite/UI" },
      { name: "description", content: "Installable Neoncite application and marketing sections composed from canonical primitives." },
      { property: "og:title", content: "Blocks — Neoncite/UI" },
      { property: "og:description", content: "Installable Neoncite sections for dashboards, auth, status and product surfaces." },
    ],
  }),
  component: BlocksPage,
});

const blocks = [
  { slug: "hero-console", label: "01 · Hero — Console", component: HeroBrutal },
  { slug: "stats-strip", label: "02 · Stats — Dashboard Strip", component: StatsStrip },
  { slug: "pricing-three-tiers", label: "03 · Pricing — Three Tiers", component: PricingThreeTiers },
  { slug: "status-health", label: "04 · Status — Service Health", component: StatusHealth },
  { slug: "auth-console", label: "05 · Auth — Sign-in Console", component: AuthSignin },
  { slug: "features-grid", label: "06 · Features — Iconic Grid", component: FeaturesGrid },
  { slug: "testimonials", label: "07 · Testimonials — Demo Notes", component: TestimonialsNotes },
  { slug: "faq-folded", label: "08 · FAQ — Folded", component: FaqFolded },
  { slug: "pricing-tiers-alternative", label: "09 · Pricing — Alternative", component: PricingTiersAlternative },
  { slug: "cta-banner", label: "10 · CTA — Closing Banner", component: CtaBanner },
  { slug: "dashboard-activity", label: "11 · Dashboard — Activity Overview", component: DashboardActivity },
];

function BlocksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1200px] px-4 md:px-8 py-12 md:py-16 space-y-16">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-widest neon-cyan mb-3">Blocks</p>
          <h1 className="text-[36px] md:text-[56px] font-mono font-bold tracking-tighter neon-white mb-3">Installable composed sections</h1>
          <p className="text-[15px] text-muted-foreground max-w-2xl leading-relaxed">
            Every Block below is a real <code className="font-mono text-foreground">registry:block</code> item. Copy the install command, inspect its registry JSON, then replace the clearly labeled demo data with your product content.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {blocks.map((block) => <a key={block.slug} href={`#${block.slug}`} className="rounded-[8px] border border-[color:var(--hairline)] px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:bg-white/5 hover:text-foreground">{block.slug}</a>)}
          </div>
        </header>

        {blocks.map((block) => {
          const Preview = block.component;
          return <BlockFrame key={block.slug} slug={block.slug} label={block.label}><Preview /></BlockFrame>;
        })}
      </main>
      <SiteFooter />
    </div>
  );
}
