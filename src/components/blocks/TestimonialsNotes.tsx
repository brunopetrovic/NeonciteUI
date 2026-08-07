import { Avatar, AvatarFallback } from "@/registry/ui/avatar";
import { Badge } from "@/registry/ui/badge";
import { Card, CardContent } from "@/registry/ui/card";

export function TestimonialsNotes() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Example customer · Platform",
      quote: "The interface stays readable even when the dashboard gets dense and operational.",
      initials: "AC",
      accent: "pink" as const,
    },
    {
      name: "Jordan Lee",
      role: "Example customer · Design",
      quote:
        "The machined surfaces give technical tools a strong identity without sacrificing clarity.",
      initials: "JL",
      accent: "cyan" as const,
    },
    {
      name: "Sam Rivera",
      role: "Example customer · Engineering",
      quote:
        "Source ownership makes it straightforward to compose the primitives around product needs.",
      initials: "SR",
      accent: "green" as const,
    },
  ];

  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Demo content · fictional names and quotes for layout preview only
      </p>
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
                  demo
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
