# Changelog

## 0.3.0 (unreleased)

### Dependency boundaries and bundle health

- Button and Badge now render native elements by default and lazily load Framer Motion only when `animated={true}` is requested.
- Framer Motion and Recharts are optional peer dependencies of the direct-consumption UI package rather than covert heavyweight core dependencies.
- Chart registry items that actually import Recharts declare the peer explicitly so the CLI installs it only when required.
- Added a <20 KiB gzipped core Button + Input + utils bundle budget and a production bundle-analysis command.

### Design tokens and accessibility

- Removed hardcoded registry UI/Block color values in favor of canonical surface, neon, glow, and shadow tokens.
- Documented contrast ratios for all nine neon accents on OLED black and corrected bright accent foregrounds.
- Added `prefers-contrast: more` treatment for stronger hairlines/muted text and reduced decorative glow noise.
- Added accessible names to icon-only pagination controls and improved Form control ARIA forwarding.
- Added the `/docs/accessibility` accessibility-constraint documentation and a `/theme-builder` compatibility route.

### Type safety and testing

- Enabled `noUnusedLocals`, `noUnusedParameters`, and `verbatimModuleSyntax`.
- Enabled warning-level TypeScript unused-variable linting with underscore escape conventions.
- Added Vitest + React Testing Library coverage for Button, Input, Dialog, Select, Command, Sonner, Data Table, and Form foundations.
- Expanded Playwright/axe checks for control naming and Theme Builder token updates.

### Registry and supply-chain security

- Registry generation now embeds SHA-256 integrity digests for downloaded source files.
- The CLI verifies each digest before writing files and aborts on mismatch.
- Removed the unused Gemini server capability declaration after auditing the Worker implementation.
- GitHub Actions are pinned to immutable action SHAs.
- Upgraded the TanStack/Lovable build integration, removed the vulnerable Miniflare/Undici dependency chain, aligned workflows with the lockfile runtime, and moved Cloudflare deployment to generated Nitro Worker output.

### Repository operations

- Added deterministic npm lockfiles and Node/npm engine requirements.
- Added CODEOWNERS, branch-protection guidance, Renovate configuration, structured issue forms, and a pull-request checklist.
- CI uses the full validation gate and retains Playwright diagnostics on failure.
- Added a manual npm publish workflow with provenance, environment gating, dry-run support, idempotent version checks, and post-publish verification.

### Migration from v0.2.x

- `Button` and `Badge` motion is now opt-in. Add `animated={true}` where hover/tap scale animation is desired and ensure `framer-motion >=10` is installed in that application.
- Consumers of Recharts-backed chart registry items must make `recharts >=2` available; the Neoncite CLI installs it automatically for those items.
- Code that imported types as runtime values may need `import type { ... }` under `verbatimModuleSyntax`.
- Custom themes should override the canonical `--neon-*`, semantic surface, and glow/shadow tokens rather than relying on former hardcoded component colors.

## 0.2.0

### Components

- Expanded the canonical UI inventory from 33 to 84 registered items.
- Added Alert Dialog, Aspect Ratio, Collapsible, Context Menu, Menubar, Navigation Menu, Scroll Area, Toggle Group, Resizable Panels, Input OTP, Drawer, Carousel, Pagination, Combobox, Date Picker, File Upload, Empty State, Loading Overlay, Spinner, Stepper, Timeline, Tree View, Data List, Search Input, Password Input, Number Field, Time Picker, Button Group, Input Group, Icon Button, Copy Button, Code, Inline Code, Kbd, and more.
- Added the Neoncite Signature family for technical products: Terminal, Log Viewer, Status LED, Connection Status, Telemetry Panel, Gauge, Sparkline Metric, Resource Meter, Latency Indicator, System Health, Deployment Status, Activity Stream, Server Card, HUD Panel, Diagnostic Panel, Command Bar, and Metric Grid.

### Blocks

- Expanded the Block catalog from 11 to 18 installable `registry:block` items.
- New application-grade patterns: Dashboard Shell, Telemetry Dashboard, Deployment Dashboard, AI Agent Console, Settings, Onboarding, and Runtime Error State.
- Block detail routes (`/blocks/$slug`) with live preview, desktop/tablet/mobile viewport modes, install command, registry JSON link, canonical source link, and previous/next navigation.

### Themes

- Five canonical dark presets: Neoncite, Ocean, Ember, Forest, Ultraviolet.
- Each preset is installable as `registry:theme`.
- Theme Builder upgraded with named local saves, persistence, validated JSON import/export, CSS export, DTCG token export, shareable URL state, contrast checks, and dark-only validation.

### CLI / Registry

- Registry now publishes `registry:ui`, `registry:block`, and `registry:theme` item types.
- CLI installs UI components, Blocks, and themes; preserves nested Block paths; rewrites internal source imports to local relative paths.
- Version parity is executable CI policy.

### Documentation / SEO

- Component docs include live preview, installation, dependencies, API/props, states, accessibility, keyboard guidance, composition, token contract, SSR/hydration, RTL notes, and canonical source.
- Neoncite SVG favicon, web manifest, 1200×630 social artwork, Open Graph metadata.
- Generated sitemap includes component and Block detail routes.
- Real `AGENTS.md` and `public/llms.txt` for AI/agent consumers.

### Release gates

- Registry dependency integrity validation.
- Generated artifact coverage validation.
- Public-claim truthfulness guards.
- TypeScript, ESLint/Prettier, unit/registry/docs-coverage tests.
- Fresh Vite + React + TypeScript + Tailwind v4 clean-room installation test.
- Playwright browser smoke tests with axe accessibility checks.
- Visual regression baselines.

### Migration from v0.1.0

- Registry installs expanded beyond the original 33 components to include Blocks and installable themes; automation should consume item `type` rather than assuming every registry entry is `registry:ui`.
- Theme customization moved to the canonical token/theme-preset workflow. Prefer `packages/ui/tokens.css` and registry themes over component-local color overrides.
- Component documentation and install paths are now slug-based (`/components/$slug`, `/blocks/$slug`), and the CLI resolves nested Block paths automatically.
- The direct-consumption `@neoncite/ui` package gained generated component subpath exports; code that previously copied internal package files should import public exports or use the CLI registry workflow.

## 0.1.0

- Initial Neoncite/UI release.
- 33 dark-mode React components with OLED surfaces, machined lighting, and neon accents.
- `neoncite` CLI for component installation from a shadcn-style registry.
- Cloudflare Workers deployment.
