import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";

export function CtaBanner() {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-10 md:p-16">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div
        className="absolute -inset-px opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 200px at 80% 0%, rgba(255,42,157,0.18), transparent 60%), radial-gradient(500px 180px at 0% 100%, rgba(0,240,255,0.14), transparent 60%)",
        }}
      />
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-xl">
          <Badge variant="pink" className="mb-4">
            Ready when you are
          </Badge>
          <h2 className="text-[32px] md:text-[44px] font-mono font-bold tracking-tighter neon-white leading-tight mb-3">
            Build the interface
            <br />
            you actually want.
          </h2>
          <p className="text-[14px] text-muted-foreground">
            One CLI command. Plain TSX into your project. No runtime, no lock-in, no apologies.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg">
              Get started
            </Button>
            <Button variant="ghost" size="lg">
              Read docs →
            </Button>
          </div>
          <code className="font-mono text-[11px] text-muted-foreground bg-[color:var(--surface-2)] border border-[color:var(--hairline)] rounded-[8px] px-3 py-1.5">
            npx neoncite add button
          </code>
        </div>
      </div>
    </div>
  );
}
