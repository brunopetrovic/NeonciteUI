import { Badge } from "@/registry/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/registry/ui/card";
import { Progress } from "@/registry/ui/progress";

export function StatusHealth() {
  const services = [
    { name: "API", pct: 99, color: "green" as const },
    { name: "Database", pct: 96, color: "cyan" as const },
    { name: "CDN", pct: 78, color: "yellow" as const },
    { name: "Workers", pct: 100, color: "green" as const },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>System Status</CardTitle>
          <Badge variant="green">All Operational</Badge>
        </div>
        <CardDescription>Updated 14 seconds ago</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((s) => (
          <div key={s.name} className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
              <span className="text-foreground">{s.name}</span>
              <span className="text-muted-foreground tabular-nums">{s.pct}%</span>
            </div>
            <Progress value={s.pct} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
