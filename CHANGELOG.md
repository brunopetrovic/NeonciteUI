# Changelog

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

## 0.1.0

- Initial Neoncite/UI release.
- 33 dark-mode React components with OLED surfaces, machined lighting, and neon accents.
- `neoncite` CLI for component installation from a shadcn-style registry.
- Cloudflare Workers deployment.
