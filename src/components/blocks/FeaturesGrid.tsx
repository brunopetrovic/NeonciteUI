import { Zap, Shield, Layers, Cpu, Workflow, Sparkles } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      icon: Zap,
      color: "neon-pink",
      title: "Instant install",
      body: "One CLI command writes typed source into your repo. No black box.",
    },
    {
      icon: Shield,
      color: "neon-cyan",
      title: "Accessible by default",
      body: "Radix primitives ship with focus, ARIA, and keyboard wired in.",
    },
    {
      icon: Layers,
      color: "neon-purple",
      title: "Composable tokens",
      body: "CSS variable tokens cascade — theme without forking a single component.",
    },
    {
      icon: Cpu,
      color: "neon-green",
      title: "Tailwind v4 native",
      body: "Built on the new engine. No PostCSS plugin gymnastics.",
    },
    {
      icon: Workflow,
      color: "neon-yellow",
      title: "Registry compatible",
      body: "shadcn-style registry schema. Works with existing tooling.",
    },
    {
      icon: Sparkles,
      color: "neon-orange",
      title: "Motion with intent",
      body: "Restraint by default, kinetic when it matters. Reduced-motion respected.",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {features.map((f) => (
        <div
          key={f.title}
          className="rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-5 hover:border-white/10 transition-colors"
        >
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] mb-3">
            <f.icon size={16} className={f.color} strokeWidth={2} />
          </div>
          <h3 className="text-[14px] font-semibold neon-white mb-1">{f.title}</h3>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed">{f.body}</p>
        </div>
      ))}
    </div>
  );
}
