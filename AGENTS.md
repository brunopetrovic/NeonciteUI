# Neoncite/UI Agent Contract

Neoncite/UI is a dark-only React design system for developer tools, AI products, infrastructure, observability, and technical dashboards. Preserve its OLED-black, machined-surface, neon-accent identity.

## Non-negotiable design law

- No light mode, beige/pastel SaaS restyling, generic shadcn appearance, or unrelated visual systems.
- Core surfaces: `#000000`, `#09090b`, `#121214`, `#1c1c1e`; hairline `#2c2c2e`.
- Foreground `#f2f2f7`; muted foreground `#8e8e93`.
- Neon palette: pink `#ff2a9d`, cyan `#00f0ff`, blue `#3399ff`, yellow `#ffcc00`, orange `#ff6600`, green `#00ff66`, purple `#b829ff`, red `#ff003c`, lime `#ccff00`.
- Inter for UI; JetBrains Mono for code, metadata, compact labels, and technical readouts.
- Motion is restrained and must respect `prefers-reduced-motion`.

## Canonical architecture

- Canonical component source: `src/registry/ui/*.tsx`.
- Canonical UI metadata: `src/registry/items.json` plus `src/registry/items-extra.json`.
- Canonical Block metadata: `src/registry/blocks.json`.
- Canonical dark-theme metadata: `src/registry/themes.json`.
- `public/r` and `packages/ui/src/components` are generated outputs; do not hand-maintain divergent implementations.
- Use `npm run build:dist` to regenerate registry/package outputs.
- `scripts/validate-registry-deps.mjs` must pass for every public UI item.

## Component rules

- Prefer native HTML semantics and Radix primitives for interactive behavior.
- Use `cn()` from `@/lib/utils`, CVA for meaningful variants, Lucide for icons, and Framer Motion only where micro-motion justifies it.
- Consume semantic tokens instead of scattering raw design constants through new components.
- Preserve visible focus, keyboard behavior, ARIA relationships, disabled semantics, and reduced-motion behavior.
- Compose existing Neoncite primitives before creating duplicate behavior.
- `Toggle` means pressed/unpressed action state; `Switch` means an on/off setting.

## Distribution rules

- Every public component must be registered with correct npm and registry dependencies.
- Blocks are `registry:block`; official presets are `registry:theme`.
- CLI installs must remain inspectable source installs and preserve nested Block paths.
- Do not introduce hidden consumer alias requirements; generated source imports must resolve after CLI rewriting.
- Never publish or claim an npm release unless publication is actually verified.

## Documentation and claims

- Every registered component page needs a live preview, installation, API/props, states, accessibility, keyboard guidance where applicable, token notes, SSR/RTL notes, and canonical source link.
- Fictional UI data must be clearly demo content. Never invent customers, testimonials, stars, SLAs, Figma kits, pricing entitlements, or adoption metrics.
- Do not hardcode component/Block counts in marketing copy; derive inventories from canonical metadata.

## Required validation before merging

Run or satisfy CI equivalents for:

- version parity
- registry dependency validation
- generated-artifact validation
- TypeScript
- ESLint/Prettier
- registry/unit tests
- docs production build
- CLI build
- `@neoncite/ui` build
- fresh Vite + React + TypeScript + Tailwind v4 clean-room install/build
- browser accessibility/keyboard smoke tests
- visual regression tests

Treat source drift, undeclared dependencies, broken clean-room installs, inaccessible interactions, unsupported documentation claims, and light-mode drift as release-blocking bugs.
