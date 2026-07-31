import { Avatar, AvatarFallback } from "@/registry/ui/avatar";
import { Badge } from "@/registry/ui/badge";
import { Card, CardContent } from "@/registry/ui/card";

export function TestimonialsNotes() {
  const testimonials = [
    {
      name: "Mira Voss",
      role: "Staff Eng · Helix",
      quote:
        "Finally a kit that doesn't look like every other dashboard. Shipped a console in a weekend.",
      initials: "MV",
      accent: "pink" as const,
    },
    {
      name: "Ari Tanaka",
      role: "Design Lead · Fold",
      quote: "The OLED + neon thing sounds gimmicky until you actually use it. It's just… correct.",
      initials: "AT",
      accent: "cyan" as const,
    },
    {
      name: "Jules Mörk",
      role: "Founder · Stratum",
      quote: "Copy-paste ownership beats yet another peer dependency. The CLI just works.",
      initials: "JM",
      accent: "green" as const,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-3">
      {testimonials.map((t) => (
        <Card key={t.name}>
          <CardContent className="pt-6 space-y-4">
            <p className="text-[13.5px] text-foreground leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{t.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-[13px] font-semibold neon-white">{t.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.role}
                </div>
              </div>
              <Badge variant={t.accent} className="ml-auto">
                verified
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
