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
import { Separator } from "@/registry/ui/separator";
import { Check } from "lucide-react";

export function PricingThreeTiers() {
  const tiers = [
    {
      name: "Starter",
      price: "0",
      tag: null,
      cta: "Start free",
      features: ["3 projects", "Core analytics", "Community workspace"],
    },
    {
      name: "Team",
      price: "29",
      tag: "Popular",
      cta: "Choose Team",
      features: ["Unlimited projects", "Team roles", "Audit history"],
    },
    {
      name: "Scale",
      price: "99",
      tag: null,
      cta: "Contact sales",
      features: ["Advanced controls", "Custom retention", "Priority routing"],
    },
  ];

  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Demo pricing · example product copy, not Neoncite plans
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={tier.tag ? "border-[color:var(--neon-pink)]/40 shadow-[var(--glow-pink)]" : ""}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[18px]">{tier.name}</CardTitle>
                {tier.tag && <Badge variant="pink">{tier.tag}</Badge>}
              </div>
              <CardDescription>
                <span className="text-[36px] font-mono font-bold neon-white tabular-nums">
                  ${tier.price}
                </span>
                <span className="text-muted-foreground"> /mo</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <Check size={14} className="text-[color:var(--neon-green)]" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={tier.tag ? "primary" : "outline"} className="w-full">
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
