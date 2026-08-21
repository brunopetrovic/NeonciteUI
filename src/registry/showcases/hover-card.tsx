import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card";

export const usage = `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/neoncite/hover-card"

export function Demo() {
  return (
    <HoverCard>
      <HoverCardTrigger className="underline">@neoncite</HoverCardTrigger>
      <HoverCardContent>Premium machined UI components.</HoverCardContent>
    </HoverCard>
  )
}`;

export const preview = (
  <HoverCard openDelay={0}>
    <HoverCardTrigger asChild>
      <span className="font-mono text-[13px] underline decoration-dotted underline-offset-4 cursor-pointer neon-pink">
        @neoncite
      </span>
    </HoverCardTrigger>
    <HoverCardContent>
      <p className="font-mono text-[10px] uppercase tracking-widest neon-cyan mb-1">Neoncite/UI</p>
      <p>Premium machined UI components.</p>
    </HoverCardContent>
  </HoverCard>
);
