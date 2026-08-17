export type MotionView = "css" | "react" | "prompt";

export type MotionRecipe = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  physics: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  css: string;
  react: string;
  prompt: string;
  reducedMotion: string;
};

/**
 * Motion is documented as a contract, not as an afterthought:
 * each recipe has source-ready CSS, React, and prompt output plus its
 * reduced-motion behavior. The docs page consumes this single source.
 */
export const MOTION_RECIPES: readonly MotionRecipe[] = [
  {
    id: "pressed-surface",
    title: "Pressed surface",
    eyebrow: "PRESS / RELEASE",
    description:
      "A tactile press that gives the pointer a reliable down/up response without moving layout.",
    physics: { stiffness: 320, damping: 24, mass: 1 },
    css: `/* Press only the painted surface; layout stays stable. */
.motion-pressed {
  transition: transform 180ms var(--ease-out),
    box-shadow 180ms var(--ease-out);
}

.motion-pressed:hover {
  transform: translateY(-1px) scale(1.01);
}

.motion-pressed:active {
  transform: translateY(1px) scale(0.98);
  box-shadow: 0 1px 0 var(--hairline);
}

@media (prefers-reduced-motion: reduce) {
  .motion-pressed {
    transition: none;
  }

  .motion-pressed:hover,
  .motion-pressed:active {
    transform: none;
  }
}`,
    react: `import { motion } from "framer-motion";

<motion.button
  className="motion-pressed"
  whileHover={{ scale: 1.01, y: -1 }}
  whileTap={{ scale: 0.98, y: 1 }}
  transition={{ type: "spring", stiffness: 320, damping: 24, mass: 1 }}
>
  Deploy build
</motion.button>`,
    prompt:
      "Create a source-first React button with a restrained tactile press. Use a spring with stiffness 320, damping 24, mass 1; animate transform only; preserve a visible focus ring and collapse spatial motion under prefers-reduced-motion.",
    reducedMotion:
      "The CSS branch removes transform motion. Framer Motion's user setting resolves to an instant state change while focus remains visible.",
  },
  {
    id: "state-morph",
    title: "State morph",
    eyebrow: "IDLE → WORKING → DONE",
    description:
      "A compact async action that communicates progress, success, and the next available action.",
    physics: { stiffness: 280, damping: 22, mass: 1 },
    css: `/* Keep status changes understandable without a celebratory toast. */
.motion-state [data-state] {
  transition: opacity 160ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.motion-state[data-status="loading"] [data-state="idle"],
.motion-state[data-status="success"] [data-state="idle"] {
  display: none;
}

.motion-state[data-status="success"] [data-state="success"] {
  color: var(--neon-green);
}

@media (prefers-reduced-motion: reduce) {
  .motion-state [data-state] {
    transition: none;
  }
}`,
    react: `import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence mode="wait" initial={false}>
  <motion.span
    key={status}
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ type: "spring", stiffness: 280, damping: 22 }}
    aria-live="polite"
  >
    {status === "loading" ? "Deploying…" : status === "success" ? "Deployed" : "Deploy build"}
  </motion.span>
</AnimatePresence>`,
    prompt:
      "Build a compact async action with idle, loading, success, and error states. Morph only the label/icon region, announce status politely, prevent duplicate submits, and use a 280/22 spring that becomes an instant opacity change for reduced-motion users.",
    reducedMotion:
      "Status still changes and is announced through aria-live; only the label's spatial transition is removed.",
  },
  {
    id: "focus-relay",
    title: "Focus relay",
    eyebrow: "KEYBOARD / SELECTION",
    description:
      "A shared indicator that follows the active tab while keeping native tab semantics and focus visible.",
    physics: { stiffness: 360, damping: 28, mass: 1 },
    css: `/* The indicator is decoration; the tab remains the source of truth. */
.motion-tabs {
  position: relative;
}

.motion-tabs [role="tab"] {
  position: relative;
  z-index: 1;
}

.motion-tabs [role="tab"][aria-selected="true"] {
  color: var(--foreground);
}

.motion-tabs [role="tab"]:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .motion-tabs [data-indicator] {
    transition: none;
  }
}`,
    react: `import { motion } from "framer-motion";

<div role="tablist" aria-label="Deployment view">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      role="tab"
      aria-selected={active === tab.id}
      onClick={() => setActive(tab.id)}
    >
      {active === tab.id && (
        <motion.span layoutId="active-tab" data-indicator aria-hidden="true" />
      )}
      {tab.label}
    </button>
  ))}
</div>`,
    prompt:
      "Create an accessible tab strip with a shared active indicator. Keep button and tab semantics native, expose aria-selected, preserve :focus-visible, animate only the indicator transform, and disable the relay motion when reduced motion is requested.",
    reducedMotion:
      "Selection and keyboard behavior remain unchanged; the active indicator jumps to its new position without an animated relay.",
  },
] as const;

export function getMotionRecipe(id: string) {
  return MOTION_RECIPES.find((recipe) => recipe.id === id) ?? MOTION_RECIPES[0];
}
