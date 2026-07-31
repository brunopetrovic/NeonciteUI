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
      {
        name: "description",
        content:
          "Pre-built sections composed from Neoncite primitives: heroes, pricing, dashboards.",
      },
      { property: "og:title", content: "Blocks — Neoncite/UI" },
      { property: "og:description", content: "Pre-built sections: heroes, pricing, dashboards." },
    ],
  }),
  component: BlocksPage,
});

function BlocksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1200px] px-4 md:px-8 py-12 md:py-16 space-y-16">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-widest neon-cyan mb-3">Blocks</p>
          <h1 className="text-[36px] md:text-[56px] font-mono font-bold tracking-tighter neon-white mb-3">
            Composed sections
          </h1>
          <p className="text-[15px] text-muted-foreground max-w-2xl">
            Production-grade sections built from Neoncite primitives. Drop them in, swap copy, ship.
          </p>
        </header>

        <BlockFrame label="01 · Hero — Brutal Console">
          <HeroBrutal />
        </BlockFrame>

        <BlockFrame label="02 · Stats — Dashboard Strip">
          <StatsStrip />
        </BlockFrame>

        <BlockFrame label="03 · Pricing — Three Tiers">
          <PricingThreeTiers />
        </BlockFrame>

        <BlockFrame label="04 · Status — Service Health">
          <StatusHealth />
        </BlockFrame>

        <BlockFrame label="05 · Auth — Sign-in Console">
          <AuthSignin />
        </BlockFrame>

        <BlockFrame label="06 · Features — Iconic Grid">
          <FeaturesGrid />
        </BlockFrame>

        <BlockFrame label="07 · Testimonials — Operator Notes">
          <TestimonialsNotes />
        </BlockFrame>

        <BlockFrame label="08 · FAQ — Folded">
          <FaqFolded />
        </BlockFrame>

        <BlockFrame label="09 · Pricing — Three Tiers">
          <PricingTiersAlternative />
        </BlockFrame>

        <BlockFrame label="10 · CTA — Closing Banner">
          <CtaBanner />
        </BlockFrame>

        <BlockFrame label="11 · Dashboard — Activity Overview">
          <DashboardActivity />
        </BlockFrame>
      </main>
      <SiteFooter />
    </div>
  );
}
