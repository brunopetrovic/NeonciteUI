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
      name: "Hobby",
      price: "0",
      tag: null,
      cta: "Start free",
      features: ["All components", "MIT license", "Community support"],
    },
    {
      name: "Pro",
      price: "29",
      tag: "Popular",
      cta: "Upgrade",
      features: ["Everything in Hobby", "Pro blocks", "Figma kit", "Email support"],
    },
    {
      name: "Studio",
      price: "99",
      tag: null,
      cta: "Contact",
      features: ["Everything in Pro", "Custom themes", "Slack channel", "Priority issues"],
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={
            tier.tag
              ? "border-[color:var(--neon-pink)]/40 shadow-[0_0_32px_rgba(255,42,157,0.15)]"
              : ""
          }
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
                  <Check size={14} className="text-[#00ff66]" strokeWidth={3} />
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
  );
}
