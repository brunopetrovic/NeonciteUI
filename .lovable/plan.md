# Neoncite UI — Design System Plan

A premium, opinionated component library distributed three ways:

1. **CLI** (`npx neoncite add button`) — copies source into the user's repo, shadcn-style
2. **npm package** (`@neoncite/ui`) — install + import for users who prefer it
3. **Docs site** — this Lovable project, the marketing front door + live showcase + install instructions

All three share one identity: **Neoncite & Neon** — OLED-black surfaces, machined gradients, rim lighting, and 9 neon accents (pink, cyan, blue, yellow, orange, green, purple, red, lime). Inter for UI, JetBrains Mono for code/labels.

---

## What gets built (in this Lovable repo)

This Lovable project becomes the **source of truth**. It hosts the docs site AND contains the registry/CLI/package source so everything stays in sync. We'll mirror a monorepo with top-level folders rather than true workspaces (see Technical notes).

```text
src/                       ← docs site (TanStack Start)
  routes/                  ← / docs / components / themes / installation / cli
  components/showcase/     ← live previews of every component
  registry-ui/             ← Neoncite components used BY the docs site itself
registry/                  ← canonical component sources (what CLI ships)
  ui/button.tsx, dialog.tsx, ...
  blocks/pricing-01.tsx, hero-01.tsx, ...
  themes/neoncite.css, neoncite-light.css, ...
  registry.json            ← machine-readable index (shadcn-compatible schema)
packages/
  cli/                     ← `neoncite` CLI (init, add, diff)
  ui/                      ← npm-installable wrapper that re-exports registry/ui
public/r/                  ← static-served registry JSON (what the CLI fetches)
```

---

## Phased build

### Phase 1 — Foundation & Docs Shell (this Lovable project)

- Port the Neoncite & Neon design tokens from your uploaded file into `src/styles.css` as proper CSS custom properties (oklch where possible, raw hex for the neons). Tailwind v4 `@theme` mapping for `bg-neoncite-*`, `text-neon-*`, etc.
- Custom keyframes: `radar-spin`, `pulse-glow`, `ripple`, `scan`, `glitch`.
- Fonts: Inter + JetBrains Mono, self-hosted via `@fontsource`.
- Docs shell routes:
  - `/` — landing (hero, "what makes it different", install snippet, featured components)
  - `/docs` — getting started, theming, dark mode, CLI usage
  - `/docs/installation` — CLI + manual + npm
  - `/docs/cli` — full command reference
  - `/docs/theming` — token system, custom themes, neon palette
  - `/components` — index grid of every component
  - `/components/$slug` — individual component page (preview, props table, install command, source)
  - `/blocks` — full-section patterns (hero, pricing, testimonials, etc.)
  - `/themes` — visual theme switcher
- Reusable docs primitives: `<ComponentPreview>`, `<CodeBlock>` (with copy button + tab switcher for tsx/css/cli), `<PropsTable>`, `<InstallTabs>` (CLI / npm / pnpm / bun / yarn).

### Phase 2 — Component Registry (the actual library)

Build out `registry/ui/` with Radix-based components, every one styled in Neoncite & Neon. Target list (from your uploaded showcase + shadcn parity):

- **Primitives:** Button, Input, Textarea, Label, Select, Checkbox, Radio, Switch, Slider, Toggle, Toggle-group, Tabs, Accordion, Dialog, Sheet, Popover, Tooltip, Hover-card, Dropdown-menu, Context-menu, Command, Combobox, Calendar, Date-picker, Form (RHF + Zod), Avatar, Badge, Alert, Card, Separator, Progress, Skeleton, Scroll-area, Pagination, Breadcrumb, Table, Sonner toast, Drawer.
- **Neoncite signature components:** Neon Toggle, Machined Card, Hardware Slider, Radar Chart, Glitch Heading, TUI Mockup, Scan-line container, Code Block, Terminal Pane, Stat Tile, Audio Waveform, Voice List Item, Memory Sector grid.
- **Blocks:** Hero bands (3 variants), Pricing tiers, Feature compare, Testimonials, Logo wall, Footer (3 variants), Navigation (3 variants), Contact card, Doc layout.
- **Charts:** wrappers around Recharts themed for the system (line, bar, area, radial, sparkline).

Each component lives at `registry/ui/<name>.tsx` and is referenced from `registry.json` with its dependencies, registry-deps, and target file path — exactly the shape `shadcn` and `shadcn/ui registry` use, so existing tooling stays compatible.

### Phase 3 — CLI (`packages/cli`)

Commands:

- `neoncite init` — installs Tailwind v4 config, copies `styles.css` tokens, sets up `components.json`, picks a theme.
- `neoncite add <component...>` — fetches from `https://neoncite.dev/r/<name>.json`, writes files, installs npm deps, resolves registry-deps recursively.
- `neoncite diff <component>` — shows local-vs-upstream drift.
- `neoncite theme <name>` — swaps the active theme CSS file.

Built with Commander + Prompts + Execa + Zod, distributed via npm as `neoncite` (binary) and `create-neoncite`. The CLI is **schema-compatible with shadcn's registry format** so it works with any shadcn-style registry too.

### Phase 4 — npm package (`packages/ui`)

- Re-exports `registry/ui/*` as `@neoncite/ui`.
- Ships compiled CSS (`@neoncite/ui/styles.css`) plus per-theme CSS files.
- Tree-shakeable ESM, types included, peer-deps on react/react-dom/tailwindcss.

### Phase 5 — Quality & DX layer (the things that make it shadcn-tier)

- **Accessibility:** every interactive component built on Radix; axe-tested previews; visible focus rings using a neon ring token; reduced-motion variants for all keyframes.
- **Theming:** CSS-variable based, light + dark + 3 starter themes (Neoncite Default, Neoncite Light, Neoncite Mono). Theme switcher on docs site persists to localStorage.
- **Dark mode:** `class="dark"` strategy, `next-themes`-equivalent hook for TanStack.
- **RTL support:** logical properties throughout.
- **i18n-ready docs:** English first, structure ready for translations.
- **MDX content:** docs pages authored in MDX with auto TOC, anchor links, prev/next nav.
- **Search:** `cmdk`-powered ⌘K palette indexing every component, block, and doc page.
- **Copy-to-clipboard everywhere:** one-click on every code block and color swatch (hex copies on click — your file shows this intent).
- **Versioned registry:** `/r/v1/<name>.json` with semver, changelog page.
- **SEO:** unique `<title>` / meta / og-image per route, sitemap, robots, JSON-LD for SoftwareApplication.
- **Open Graph:** auto-generated OG image per component using a server route that renders the preview.
- **Analytics-ready:** plausible/posthog hooks behind a single env flag.
- **Examples gallery:** real apps built with Neoncite (dashboard, marketing site, music player, terminal — leaning into the aesthetic).
- **Figma kit link** placeholder + community section (Discord/GitHub).

### Phase 6 — Publishing & infra

- GitHub Actions workflow (described in docs only, not run from Lovable): typecheck, lint, build registry JSON from sources, publish CLI + package on tag.
- Registry JSON generated by a `scripts/build-registry.ts` step that walks `registry/ui` and emits `public/r/*.json`. Runs in `prebuild`.
- The Lovable preview itself acts as the live registry endpoint — `npx neoncite add button --registry https://<preview-url>/r` works during development.

---

## Initial deliverable for Phase 1 (what you'll see first)

A complete, polished docs site shell with:

- Landing page in full Neoncite & Neon glory
- Working theme switcher (dark/light/3 themes)
- `/components` index showing 6 finished components (Button, Input, Card, Dialog, Toggle, Slider) as live previews with copy-able source
- `/docs/installation` with working install instructions
- ⌘K search
- `registry.json` schema in place + 6 components published to `/r/`
- The CLI source skeleton in `packages/cli/` (not yet published)

Then we expand the registry component-by-component in subsequent passes.

---

## Technical notes

- **Single repo, monorepo-shaped folders.** Lovable runs one TanStack Start app on Cloudflare Workers. We won't use bun/pnpm workspaces inside Lovable; instead `packages/cli` and `packages/ui` are plain folders with their own `package.json` that you publish from outside Lovable (or via GitHub Actions). The docs site imports component sources directly from `registry/ui/` so previews are always in sync with what the CLI ships.
- **TanStack Start specifics:** all routes flat under `src/routes/` (no `src/pages/`); component pages use dynamic params `components.$slug.tsx`; OG-image generation lives at `src/routes/api/og/$slug.ts` as a server route.
- **Tailwind v4** via `@import "tailwindcss"` already in `src/styles.css` — extend the `@theme` block with neoncite tokens. No `tailwind.config.js`.
- **Radix UI** for behavior; the existing `src/components/ui/*` shadcn files are kept as the docs site's internal building blocks but the **shipped** registry lives separately under `registry/ui/` so we control the styling 100%.
- **MDX**: `@mdx-js/rollup` plugin for Vite, content under `src/content/docs/*.mdx`.
- **Code highlighting**: `shiki` with the `night-owl` or a custom neoncite theme.
- **No backend required for Phase 1** — registry is static JSON. Lovable Cloud only enabled later if we add favoriting / GitHub-connected component installs.
- **Server runtime constraint:** OG image generation must use `@vercel/og` / `satori` (WASM-friendly), not `sharp`/`canvas`, to work on Cloudflare Workers.

---

## Out of scope for now (can be added later)

- Pro/paid blocks tier
- Visual theme editor UI
- VS Code extension
- React Native variant
- Authenticated user dashboards / starring components

---

If this looks right, hit **Implement plan** and I'll start with Phase 1: tokens, fonts, docs shell, landing page, and the first 6 components wired into the registry.
