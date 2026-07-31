import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";

export function HeroBrutal() {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-10 md:p-16">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative max-w-2xl">
        <Badge variant="cyan" className="mb-5">
          v0.1 — alpha
        </Badge>
        <h2 className="text-[44px] md:text-[64px] font-mono font-bold tracking-tighter neon-white leading-none mb-5">
          Ship faster.
          <br />
          <span className="neon-pink">Look sharper.</span>
        </h2>
        <p className="text-[15px] text-muted-foreground mb-8 max-w-lg">
          A design system for builders who think interfaces should feel like instruments, not lobby
          art.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="lg">
            Get started
          </Button>
          <Button variant="neon" size="lg">
            View components →
          </Button>
        </div>
      </div>
    </div>
  );
}
