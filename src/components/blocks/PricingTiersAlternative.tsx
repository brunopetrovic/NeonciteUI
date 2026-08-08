import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/ui/card";
import { Check } from "lucide-react";

export function PricingTiersAlternative() {
  const tiers = [
    {
      name: "Launch",
      price: "$0",
      tag: "starter",
      accent: "default" as const,
      desc: "A compact example tier for a new technical product.",
      features: ["1 workspace", "Core metrics", "7-day history", "Community access"],
      cta: "Start building",
      variant: "ghost" as const,
    },
    {
      name: "Operate",
      price: "$29",
      tag: "popular",
      accent: "pink" as const,
      desc: "Example team tier for production operations and collaboration.",
      features: ["Unlimited workspaces", "Team roles", "90-day history", "Alert routing"],
      cta: "Choose Operate",
      variant: "primary" as const,
    },
    {
      name: "Control",
      price: "$99",
      tag: "scale",
      accent: "cyan" as const,
      desc: "Example advanced tier for organizations with stricter controls.",
      features: ["Advanced permissions", "Custom retention", "Audit exports", "Priority routing"],
      cta: "Talk to sales",
      variant: "neon" as const,
    },
  ];

  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Demo pricing · example product copy, not Neoncite plans
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={
              tier.tag === "popular"
                ? "ring-1 ring-[color:var(--neon-pink)]/40 shadow-[0_0_32px_rgba(255,42,157,0.12)]"
                : ""
            }
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-[20px]">{tier.name}</CardTitle>
                <Badge variant={tier.accent}>{tier.tag}</Badge>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[40px] font-mono font-bold neon-white tracking-tighter leading-none">
                  {tier.price}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  /mo
                </span>
              </div>
              <CardDescription className="mt-2">{tier.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-foreground">
                    <Check
                      className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--neon-green)]"
                      strokeWidth={2.5}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={tier.variant} className="w-full">
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
