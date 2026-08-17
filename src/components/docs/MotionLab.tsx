import * as React from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Check, Gauge, Keyboard, MousePointer2, Sparkles } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import {
  MOTION_RECIPES,
  getMotionRecipe,
  type MotionRecipe,
  type MotionView,
} from "@/lib/motion-recipes";

const VIEWS: readonly { id: MotionView; label: string }[] = [
  { id: "css", label: "CSS" },
  { id: "react", label: "React" },
  { id: "prompt", label: "AI prompt" },
];

const FOCUS_TABS = [
  { id: "overview", label: "Overview" },
  { id: "events", label: "Events" },
  { id: "logs", label: "Logs" },
] as const;

function formatPhysics(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

function PressedSurfacePreview({ transition }: { transition: object }) {
  return (
    <motion.button
      type="button"
      className="group relative inline-flex h-16 min-w-[220px] items-center justify-center gap-2 overflow-hidden rounded-[12px] border border-[color:var(--neon-cyan)]/40 bg-[color:var(--surface-3)] px-5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--neon-cyan)] shadow-[0_8px_0_rgba(0,240,255,0.14),0_0_28px_rgba(0,240,255,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-2)]"
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98, y: 1 }}
      transition={transition}
      data-testid="motion-pressed-demo"
    >
      <MousePointer2 size={15} aria-hidden="true" />
      <span>Deploy build</span>
      <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[color:var(--neon-cyan)] opacity-70 shadow-[0_0_12px_var(--neon-cyan)] transition-opacity group-hover:opacity-100" />
    </motion.button>
  );
}

function StateMorphPreview({ transition }: { transition: object }) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const timer = React.useRef<number | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const deploy = () => {
    if (status === "loading") return;
    setStatus("loading");
    timer.current = window.setTimeout(() => setStatus("success"), 850);
  };

  return (
    <motion.button
      type="button"
      onClick={deploy}
      disabled={status === "loading"}
      className="inline-flex h-16 min-w-[220px] items-center justify-center rounded-[12px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--surface-3)] px-5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-foreground shadow-[0_0_26px_rgba(255,42,157,0.16)] transition-colors hover:border-[color:var(--neon-pink)]/70 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-2)]"
      whileTap={{ scale: 0.98 }}
      transition={transition}
      aria-label={status === "success" ? "Deployed successfully" : "Deploy build"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          className="inline-flex items-center gap-2"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={transition}
          aria-live="polite"
        >
          {status === "loading" ? (
            <>
              <span
                className="h-3 w-3 animate-spin rounded-full border border-[color:var(--neon-yellow)] border-t-transparent motion-reduce:animate-none"
                aria-hidden="true"
              />
              Deploying…
            </>
          ) : status === "success" ? (
            <>
              <Check size={15} className="neon-green" aria-hidden="true" />
              Deployed
            </>
          ) : (
            "Deploy build"
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function FocusRelayPreview({ transition }: { transition: object }) {
  const [active, setActive] = React.useState<(typeof FOCUS_TABS)[number]["id"]>("overview");
  const activeTab = FOCUS_TABS.find((tab) => tab.id === active) ?? FOCUS_TABS[0];

  return (
    <div className="w-full max-w-[420px]">
      <div
        className="motion-tabs flex items-center gap-1 rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-3)] p-1"
        role="tablist"
        aria-label="Deployment view"
      >
        {FOCUS_TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="motion-focus-panel"
              onClick={() => setActive(tab.id)}
              className="relative flex-1 rounded-[9px] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
            >
              {isActive && (
                <motion.span
                  layoutId="motion-lab-indicator"
                  className="absolute inset-0 rounded-[9px] border border-[color:var(--neon-purple)]/40 bg-[color:var(--neon-purple)]/10 shadow-[0_0_16px_rgba(184,41,255,0.18)]"
                  transition={transition}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-[1]">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div
        id="motion-focus-panel"
        role="tabpanel"
        className="mt-3 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] px-4 py-3 text-[12px] text-muted-foreground"
      >
        <span className="font-mono uppercase tracking-wider text-muted-foreground">
          Active view
        </span>
        <span className="ml-2 text-foreground">{activeTab.label}</span>
      </div>
    </div>
  );
}

function RecipePreview({ recipe, transition }: { recipe: MotionRecipe; transition: object }) {
  if (recipe.id === "pressed-surface") return <PressedSurfacePreview transition={transition} />;
  if (recipe.id === "state-morph") return <StateMorphPreview transition={transition} />;
  return <FocusRelayPreview transition={transition} />;
}

export function MotionLab() {
  const [activeId, setActiveId] = React.useState(MOTION_RECIPES[0].id);
  const [view, setView] = React.useState<MotionView>("react");
  const [stiffness, setStiffness] = React.useState(MOTION_RECIPES[0].physics.stiffness);
  const [damping, setDamping] = React.useState(MOTION_RECIPES[0].physics.damping);
  const reducedMotion = useReducedMotion();
  const recipe = getMotionRecipe(activeId);
  const transition = React.useMemo(
    () =>
      reducedMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness, damping, mass: recipe.physics.mass },
    [damping, reducedMotion, recipe.physics.mass, stiffness],
  );
  const output = recipe[view];

  const chooseRecipe = (next: MotionRecipe) => {
    setActiveId(next.id);
    setStiffness(next.physics.stiffness);
    setDamping(next.physics.damping);
  };

  return (
    <MotionConfig reducedMotion="user">
      <article>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest neon-cyan">
          Motion system
        </p>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="mb-4 text-[40px] font-mono font-bold tracking-tighter neon-white">
              Motion Lab
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Tune the spring, inspect the source, and copy a recipe that respects interruption,
              keyboard focus, and reduced motion. These are small interaction contracts—not motion
              for motion&apos;s sake.
            </p>
          </div>
          <div
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface-1)] px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${reducedMotion ? "bg-[color:var(--neon-yellow)]" : "bg-[color:var(--neon-green)]"}`}
              aria-hidden="true"
            />
            {reducedMotion ? "Reduced motion active" : "Full motion preview"}
          </div>
        </div>

        <section className="mt-10" aria-labelledby="motion-recipes-heading">
          <div className="mb-4 flex items-center gap-3">
            <h2
              id="motion-recipes-heading"
              className="font-mono text-[12px] uppercase tracking-widest text-foreground"
            >
              Recipes
            </h2>
            <div className="h-px flex-1 bg-[color:var(--hairline)]" />
            <span className="font-mono text-[11px] text-muted-foreground">
              {MOTION_RECIPES.length.toString().padStart(2, "0")}
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {MOTION_RECIPES.map((item) => {
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  data-testid={`motion-recipe-${item.id}`}
                  onClick={() => chooseRecipe(item)}
                  className={`rounded-[12px] border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] ${selected ? "border-[color:var(--neon-cyan)]/50 bg-[color:var(--neon-cyan)]/[0.06]" : "border-[color:var(--hairline)] bg-[color:var(--surface-1)] hover:border-white/15"}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] neon-cyan">
                    {item.eyebrow}
                  </span>
                  <span className="mt-2 block text-[14px] font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[12px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section
          className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
          aria-label="Live motion preview"
        >
          <div className="rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Live preview
                </p>
                <h2
                  className="mt-1 text-[18px] font-semibold text-foreground"
                  data-testid="motion-recipe-title"
                >
                  {recipe.title}
                </h2>
              </div>
              <Sparkles size={18} className="neon-purple" aria-hidden="true" />
            </div>
            <div className="flex min-h-[220px] items-center justify-center rounded-[12px] border border-dashed border-[color:var(--hairline)] bg-[color:var(--surface-2)] p-6">
              <RecipePreview recipe={recipe} transition={transition} />
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
              {recipe.description}
            </p>
          </div>

          <div className="rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-5">
            <div className="mb-5 flex items-center gap-2">
              <Gauge size={16} className="neon-yellow" aria-hidden="true" />
              <h2 className="font-mono text-[12px] uppercase tracking-widest text-foreground">
                Physics
              </h2>
            </div>
            <div className="space-y-5">
              <label className="block" htmlFor="motion-stiffness">
                <span className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>Stiffness</span>
                  <strong className="text-foreground">{formatPhysics(stiffness)}</strong>
                </span>
                <input
                  id="motion-stiffness"
                  type="range"
                  min="160"
                  max="500"
                  step="10"
                  value={stiffness}
                  onChange={(event) => setStiffness(Number(event.target.value))}
                  className="w-full accent-[color:var(--neon-cyan)]"
                />
              </label>
              <label className="block" htmlFor="motion-damping">
                <span className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>Damping</span>
                  <strong className="text-foreground">{formatPhysics(damping)}</strong>
                </span>
                <input
                  id="motion-damping"
                  type="range"
                  min="12"
                  max="40"
                  step="1"
                  value={damping}
                  onChange={(event) => setDamping(Number(event.target.value))}
                  className="w-full accent-[color:var(--neon-pink)]"
                />
              </label>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-wider">
              <div className="rounded-[9px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] p-3">
                <span className="block text-muted-foreground">Mass</span>
                <strong className="mt-1 block text-foreground">
                  {recipe.physics.mass.toFixed(1)}
                </strong>
              </div>
              <div className="rounded-[9px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] p-3">
                <span className="block text-muted-foreground">Layout</span>
                <strong className="mt-1 block neon-green">Stable</strong>
              </div>
            </div>
            <p className="mt-5 text-[12px] leading-relaxed text-muted-foreground">
              Tune the response, not a duration. Transform and opacity stay on the compositor; no
              layout properties are animated.
            </p>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="motion-source-heading">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Keyboard size={16} className="neon-green" aria-hidden="true" />
              <h2
                id="motion-source-heading"
                className="font-mono text-[12px] uppercase tracking-widest text-foreground"
              >
                Copy-ready source
              </h2>
            </div>
            <div
              className="flex items-center gap-1 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-1"
              role="tablist"
              aria-label="Motion source format"
            >
              {VIEWS.map((item) => {
                const selected = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="motion-source-panel"
                    onClick={() => setView(item.id)}
                    className={`rounded-[7px] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] ${selected ? "bg-[color:var(--surface-3)] text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div id="motion-source-panel" role="tabpanel" className="relative">
            <CodeBlock
              code={output}
              language={view === "prompt" ? "text" : view}
              filename={`${recipe.id}.${view === "react" ? "tsx" : view === "css" ? "css" : "prompt"}`}
            />
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Reduced motion:</span>{" "}
            {recipe.reducedMotion}
          </p>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Motion lab principles">
          {[
            ["01", "Feedback", "Every transition explains a state or a target."],
            ["02", "Interruption", "Springs settle naturally when the user changes direction."],
            ["03", "Respect", "Reduced motion, focus, and semantics survive the visual layer."],
          ].map(([number, title, body]) => (
            <div
              key={number}
              className="rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4"
            >
              <span className="font-mono text-[10px] neon-pink">{number}</span>
              <h3 className="mt-2 text-[13px] font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>
      </article>
    </MotionConfig>
  );
}
