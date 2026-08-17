# NeonciteUI benchmark gap matrix

> Research snapshot: 2026-08-17. The five benchmark sites were opened in a live browser and their rendered headings, navigation, links, body copy, stylesheets, install/documentation affordances, and visible interaction inventory were inspected. This document records observable signals, not inferred implementation quality.

## Baseline used for comparison

- Repository: `brunopetrovic/NeonciteUI`, current branch base `main`, release surfaces identify `v0.2.0` as the current public release.
- Canonical inventory: `npm run validate` passed before this work: **84 UI items, 18 Blocks, 5 dark themes**; registry, generated outputs, lint, typecheck, unit tests, and production build all passed.
- Existing strengths: source-first registry, CLI, Radix-backed primitives, semantic dark tokens, live component/Block previews, theme builder, `llms.txt`, Playwright keyboard/a11y/visual coverage, and generated registry/package validation.
- Known baseline warnings: ESLint reports one existing `react-refresh/only-export-components` warning in `src/registry/featured-showcases.tsx`; Vite reports large chunks over 500 kB after minification. Neither was introduced by this upgrade.

## Live benchmark records

### 1. beUI — https://beui.dev/

**Rendered evidence.** The live homepage title is “Animated Components for React and Next.js · beUI”. It advertises **107 components · Tailwind 4 + React 19**, describes copy-paste React components built with Motion and Tailwind, says “Built on Framer Motion. Distributed via shadcn”, and exposes package-manager tabs with a `bunx --bun shadcn add @beui/tilt-card` example. The visible gallery includes Button/StatefulButton/MagneticButton, Morphing Modal, Animated Toast Stack, Action Swap, Dock, Tabs, Dynamic Island, Command Palette, Expandable Action Bar/Tabs, Tilt Card, Bottom Sheet, Switch, Tooltip, Text Animation, Number Animation, Bouncy Accordion, Range Slider, Theme Toggle, Drawer, OTP Input, Swipeable List, Bloom Menu, and other stateful/motion patterns.

**Comparison.**

- Breadth: larger motion-focused inventory than NeonciteUI's 84-item baseline, but narrower than a general product system.
- Motion: strongest benchmark for state morphing, shared-layout motion, drag/inertia, tactile feedback, and visible interaction variety.
- Tokens/theming: Tailwind 4 is explicit; the live page exposes implementation-oriented classes and Motion as the primitive. It does not expose a complete token contract on the homepage.
- Accessibility: keyboard/focus behavior is explicitly visible in the Combobox and Project Folder descriptions; reduced-motion-safe behavior is mentioned for Accordion and Slider. A full site-wide a11y guarantee was not claimed by the inspected page.
- Docs/install/registry/DX: excellent path from gallery to per-component page and shadcn-style install; public GitHub link points to `starc007/ui-components`. The package-manager switcher lowers copy/paste friction.
- Testing/package/performance: the live homepage did not establish a test matrix, bundle budget, or published package contract; those require a separate source audit. Do not infer absence from the homepage.
- Marketing: clear positioning, social proof, and a free-to-pro funnel; the component preview is the marketing surface.

**Neoncite gap.** Expose motion as a first-class, inspectable system: named recipes, tuned physics, CSS/React/prompt output, reduced-motion notes, and an interaction-led landing/documentation surface. The Motion Lab shipped in this branch addresses that gap without inflating the canonical registry with demo-only entries.

### 2. Amicro — https://amicro.vercel.app/

**Rendered evidence.** The live title is “Amicro — Premium React Micro-transitions & Interaction Components”. Navigation exposes Components, CLI Install, Skills, Mono Charts, Dither Charts, 3D Page, and Sponsors. The page calls itself a curated React + Motion micro-transition library and visibly lists Button, Card Spreads, 3D Carousels, Loaders, Dither Charts, A–Z, Slide Arrow, Sparkle, Morph, Pulse, Rotate, Shake, Ring, Color Morph, Glare, Text Reveal, Magnetic, Expand Ring, and Focus Blur interactions. No numeric component total was exposed in the inspected DOM.

**Comparison.**

- Breadth: very broad interaction motif catalog, intentionally organized around small transitions rather than product primitives.
- Motion: high variety of micro-interaction intent—morph, glare, magnetic, text reveal, color, focus, and tactile feedback.
- Tokens/theming: the page is visually cohesive but the live homepage did not expose a semantic token schema; the API appears oriented around copying an interaction.
- Accessibility: the inspected homepage did not make a complete keyboard/ARIA/reduced-motion contract visible; treat a11y as an audit item, not a marketing claim.
- Docs/install/registry/DX: navigation explicitly foregrounds a CLI install surface and “Skills”; per-example labels make browsing easy. Public source is `Subhan-code/Amicro--Micro-transitions-`.
- Testing/package/performance: the live page emphasizes lightweight/tree-shakeable behavior in its metadata, but the homepage did not establish test/CI/package release evidence.
- Marketing: premium positioning, sponsors, and a dense gallery make the value proposition immediate.

**Neoncite gap.** Add a dedicated recipe explorer with “why this motion exists”, physics controls, source formats, and reduced-motion output. Avoid copying Amicro's volume-first catalog; use a small, governed set of high-signal contracts.

### 3. Beautiful UI — https://www.beautifului.dev/

**Rendered evidence.** The live title is “Beautiful UI — Crafted primitives for AI-native interfaces”. The navigation is a deliberately curated list of 19 AI/product patterns: Loading State, Thinking, Streaming Text, Approval Card, Tool Chips, Task Rows, Chat, Prompt Bar, Recommendation Card, Context Cards, Diff Table, Records Table, Filter Table, Sidebar Nav, Search, Insight Cards, Code Block, Fine-tune Card, and Selection Actions. The demos expose agent-oriented details such as elapsed time, reasoning/search/coding steps, sources and follow-ups, approval choices, tool-call counts, task statuses, confidence meters, retrieved context, tabular diffs, and CRM-like records.

**Comparison.**

- Breadth: narrow but deep; it targets AI-native states that broad libraries usually miss.
- Motion: transitions are present as part of status and streaming demos, but the inspected homepage does not lead with a physics/motion system.
- Tokens/theming: coherent, polished light/dark presentation is visible; a formal token export contract was not surfaced on the homepage.
- Accessibility: no complete public a11y claim was visible in the inspected homepage; approval, task, table, and composer states deserve explicit keyboard/live-region review before borrowing patterns.
- Docs/install/registry/DX: the page is excellent as a visual and product-pattern catalog. No package manager, CLI, registry, or public GitHub source link surfaced in the inspected homepage; source ownership/package status should remain marked unknown rather than guessed.
- Testing/package/performance: no test/package evidence was exposed by the homepage.
- Marketing: strongest benchmark for product storytelling through realistic, legible AI workflows rather than generic placeholder cards.

**Neoncite gap.** Add a second roadmap lane for agent-native primitives: approval, streaming/thinking, task status, tool/source context, recommendation confidence, and diff/table states. Keep examples clearly marked as demo data and pair each with a11y/state documentation.

### 4. Appica UI — https://appica.dev/ui

**Rendered evidence.** The live page labels itself **UI 1.1.0** and advertises **70+ free, polished components**. It exposes Docs, Components, Icons, Country Flags, Figma, and a GitHub link to `appica-dev/appica-ui`. It names Base UI, Tailwind, and Motion, and claims “Accessible by default”, “Theme it in minutes”, “AI-ready documentation”, “TypeScript-first”, “Loads only what you use”, “Beautiful motion built in”, and “RTL out of the box”. The visible inventory is organized into Actions & Inputs (30), Data Display & Layout (13), Decoration & Effects (4), Menus & Navigation (9), and Overlays (6), with examples such as Color Picker, Date Picker, OTP Field, Rating, Combobox, Table, and Switch.

**Comparison.**

- Breadth: closest general-product breadth benchmark; count is slightly below Neoncite's total but its production-oriented grouping is clear.
- Motion: integrated rather than the sole product story; polished examples and Motion are explicit.
- Tokens/theming: strong visible promise (“theme it in minutes”), plus Figma and RTL signals; inspect the package/docs for the actual token model before adopting claims.
- Accessibility: the clearest explicit accessibility claim among the five; Base UI foundation and RTL call out a broader contract than visual polish alone.
- Docs/install/registry/DX: dedicated docs/components/icons routes, version/changelog link, AI-ready docs, Figma, and GitHub make the discovery path strong.
- Testing/package/performance: the live page claims tree-shaking and TypeScript; public source is available for deeper package/test verification. A claim is not a measurement, so Neoncite should add measured checks rather than repeat wording.
- Marketing: realistic commerce, dashboard, team, media, and order examples make breadth concrete.

**Neoncite gap.** Make the existing registry/package strengths more visible: document a11y and RTL boundaries, add per-format installation/source guidance, and publish a lightweight performance/bundle evidence path. The Motion Lab is the first visible step toward the “beautiful motion built in” expectation.

### 5. Kinetics — https://kinetics.colorion.co/

**Rendered evidence.** The live title is “Kinetics — Spring-physics motion for web interfaces”. The page advertises **153 spring-driven interactions**, shows damping/stiffness/mass readouts, and says every effect ships three ways—CSS, React, and a copy-paste AI prompt—alongside tuned physics. The visible library is categorized into Interaction & Input, Feedback & State, and Surface & Motion; examples include Card Resize, Magnetic Button, Number Counter, Toast Overshoot, Tab Pill Glide, Drag to Dismiss, Ripple Feedback, Hold to Confirm, Rubber-band Slider, Like Burst, Cursor Trail, Star Rating, Floating Label, Copy Button, Quantity Stepper, Reorderable List, Command Palette Bloom, Prompt Composer, Filmstrip Scrubber, Focus Relay, and more. It explicitly frames performance as pure CSS/no layout thrash/GPU-composited.

**Comparison.**

- Breadth: largest motion catalog; it is an interaction encyclopedia rather than a general component package.
- Motion: strongest physics vocabulary and parameter visibility; “two numbers, not a duration” is a memorable contract.
- Tokens/theming: physics parameters function as motion tokens; the site exposes them at the point of use rather than hiding them in implementation.
- Accessibility: focus, labels, and input examples are visible, but the homepage does not prove a complete a11y/reduced-motion matrix for 153 effects.
- Docs/install/registry/DX: CSS, React, and AI-prompt outputs make the copy-paste workflow unusually explicit. Public source is `ckissi/kinetics`.
- Testing/package/performance: performance rationale is prominent; test/package release proof was not established by the live homepage.
- Marketing: sharp thesis, strong numbering, live physics readout, and “copy tuned motion” language turn implementation detail into product value.

**Neoncite gap.** Publish named motion tokens and export recipes with an explicit performance/reduced-motion contract. The Motion Lab uses a governed three-recipe set rather than claiming Kinetics-scale breadth.

## Cross-benchmark matrix

| Capability | NeonciteUI baseline | Benchmark signal | Priority |
|---|---|---|---|
| Component breadth | 84 UI, 18 Blocks, 5 themes; generated and validated | beUI 107 motion components; Appica 70+ grouped components; Kinetics 153 interactions | P1 inventory metadata, not count inflation |
| Motion vocabulary | Existing `machinedSpring`, variants, micro-motion in components | Kinetics physics readouts; beUI/Amicro stateful and tactile galleries | **P0 Motion Lab (implemented)** |
| Source/DX | Source-first CLI + registry + live previews + `llms.txt` | beUI shadcn package tabs; Amicro CLI/Skills; Kinetics CSS/React/prompt; Appica docs/Figma | P0/P1 expose per-format recipes |
| AI-native states | AI agent Block exists; general component docs | Beautiful UI approval/thinking/streaming/tool/context/diff patterns | P1 agent-state primitives |
| Accessibility | Radix foundations, a11y/keyboard Playwright smoke, component docs contract | Appica explicitly accessible/RTL; beUI mentions keyboard/reduced motion in examples | P1 public a11y matrix and axe coverage |
| Tokens/theming | Semantic dark tokens, five official dark presets, Theme Builder | Appica “theme in minutes”; Kinetics spring parameters; beUI Tailwind 4 | P0 motion tokens + P1 theme/a11y docs |
| Reduced motion | `src/lib/motion.ts` and existing e2e assertion | beUI and Kinetics imply motion systems but do not prove a complete matrix on homepages | **P0 recipe-level evidence (implemented)** |
| Performance | Vite warning: large chunks remain; no dedicated budget | Appica tree-shaking claim; Kinetics no-layout-thrash story | P1 measure, split, and document |
| Testing/packaging | Canonical registry/generated/unit/type/build gates; Playwright | Benchmark homepages insufficient to prove tests/packages | P1 clean-room/axe/perf evidence |
| Marketing | Strong dark technical identity and source-first messaging | beUI/Amicro/Kinetics make motion the hero; Beautiful UI makes realistic AI states the hero; Appica makes production breadth the hero | P0 Motion Lab link; P1 agent-state demos |

## Prioritized roadmap

### P0 — shipped in `feat/benchmark-motion-lab`

**Motion Lab** at `/docs/motion`:

- Three governed recipes: Pressed Surface, State Morph, Focus Relay.
- Live previews with user-tunable stiffness/damping and stable layout behavior.
- CSS, React, and AI-prompt output from one typed recipe catalog.
- `MotionConfig reducedMotion="user"`, visible reduced-motion status, and recipe-specific reduced-motion notes.
- Native buttons/range inputs/tabs with focus-visible rings, `aria-selected`, `aria-controls`, and live status messaging.
- Documentation card, docs sidebar entry, and command-palette entry.
- Source contract tests and Playwright browser coverage (a11y, keyboard, reduced-motion, interaction).

### P1 — next coherent product lane

1. **Agent-native state primitives.** Add a small set of source-first patterns for approval, task rows, thinking/streaming, tool chips, context/source cards, recommendations, and diff tables. Each must document state, keyboard, live-region, data provenance, and demo-data boundaries.
2. **Public trust matrix.** Add a per-component capability table for keyboard, focus, reduced motion, RTL, SSR, and axe coverage; make unknown/not-applicable explicit rather than claiming universal compliance.
3. **Measured delivery.** Add clean-room install/import checks for CLI and `@neoncite/ui`, bundle-size budgets for representative routes, and a route-level code-splitting plan for the existing >500 kB chunks.

### P2 — ecosystem and packaging

1. Add per-item “CSS / React / prompt” or “source / registry / package” tabs where the format is meaningful.
2. Add package/export examples and generated metadata to `llms.txt` without hardcoding inventory counts.
3. Keep marketing claims derived from canonical metadata and verified test outputs; never copy benchmark counts or claims without independent evidence.

## Scope boundary

This upgrade does not publish npm, deploy production, add an unverified third-party dependency, or claim parity with a benchmark's full source/test system. The benchmark sites remain external references; NeonciteUI's release state is determined by its repository, validation output, and verified PR/CI state.
