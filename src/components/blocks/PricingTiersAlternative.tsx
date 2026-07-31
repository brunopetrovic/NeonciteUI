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
      name: "Free",
      price: "$0",
      tag: "default",
      accent: "default" as const,
      desc: "Everything you need to ship a serious side project.",
      features: ["29 components", "MIT licensed", "CLI installer", "Community support"],
      cta: "Start building",
      variant: "ghost" as const,
    },
    {
      name: "Studio",
      price: "$29",
      tag: "popular",
      accent: "pink" as const,
      desc: "For teams shipping client work and production apps.",
      features: [
        "Everything in Free",
        "60+ Pro blocks",
        "Figma kit",
        "Priority Discord",
        "Commercial license",
      ],
      cta: "Upgrade to Studio",
      variant: "primary" as const,
    },
    {
      name: "Foundry",
      price: "$99",
      tag: "scale",
      accent: "cyan" as const,
      desc: "For agencies and product teams that need it all.",
      features: [
        "Everything in Studio",
        "Unlimited seats",
        "Private theme registry",
        "SLA support",
        "Roadmap input",
      ],
      cta: "Talk to sales",
      variant: "neon" as const,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={
            tier.tag === "popular"
              ? "ring-1 ring-[#ff2a9d]/40 shadow-[0_0_32px_rgba(255,42,157,0.12)]"
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
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#00ff66]" strokeWidth={2.5} />
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
  );
}
