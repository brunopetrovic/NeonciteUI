# Neoncite UI

<p align="center">
  <img src="https://raw.githubusercontent.com/brunopetrovic/NeonciteUI/main/public/og-image.png" alt="Neoncite UI Banner" width="100%" />
</p>

<p align="center">
  <strong>Machined React components for the modern web.</strong><br>
  Deep OLED blacks, hardware rim lighting, and vibrant neon accents built on Radix UI & Tailwind CSS.
</p>

<p align="center">
  <a href="https://ground-steeple-tq7q.here.now/">Live Demo</a> •
  <a href="https://thorus.ai">Built By Thorus</a> •
  <a href="#installation">Installation</a> •
  <a href="#components">Components</a>
</p>

---

## Overview

**Neoncite UI** is an opinionated, dark-mode-first React component library designed for high-density developer tools, futuristic dashboards, AI interfaces, and modern web applications. 

Unlike standard "beige" component kits, Neoncite UI focuses on:
- **OLED Surface Hierarchy:** Pure black backgrounds (`#050507`), recessed layers (`#0c0d12`), and elevated glass surfaces (`#12131a`).
- **Hardware Rim Lighting:** Dual-shadow top bevels and hairline borders mimicking machined metallic hardware.
- **9-Color Neon Palette:** Tuned glowing accents (`neon-pink`, `neon-cyan`, `neon-blue`, `neon-yellow`, `neon-orange`, `neon-green`, `neon-purple`, `neon-red`, `neon-lime`).
- **Copy-Paste Architecture:** Zero lock-in. Component source files live inside your codebase (shadcn registry schema compatible).

---

## Key Features

- ⚡ **30+ Primitives & Blocks:** Buttons, Inputs, Cards, Dialogs, Charts, Data Tables, Command Palettes, Sonner Toasts, Selects, and Tabs.
- 🎨 **Tokenized CSS Variables:** Pure Tailwind CSS v4 variables with hardware rim light shadows and neon glow keyframes.
- 🛠️ **Radix UI Core:** Full accessibility, ARIA wiring, keyboard navigation, and focus management out of the box.
- 📦 **First-Class CLI:** Easily initialize and add components to your project with `npx neoncite@latest init`.
- 📐 **TanStack Router & Vite:** Built for high performance and full-stack React routing.

---

## Installation

### 1. Initialize Neoncite in your project

Run the Neoncite CLI tool to set up tokens and dependencies automatically:

```bash
npx neoncite@latest init
```

### 2. Manual Setup (Tailwind CSS v4)

If you prefer setting up manually, add the Neoncite token tokens file (`packages/ui/tokens.css`) to your CSS entry point:

```css
/* src/styles.css */
@import "./tokens.css";

@source "./**/*.{ts,tsx,html}";
```

### 3. Adding Components

Use the CLI to add components directly to your `@/components/ui` directory:

```bash
npx neoncite add button card dialog
```

Or copy the source code directly from our [Component Registry](https://ground-steeple-tq7q.here.now/public/r).

---

## Usage Example

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardWidget() {
  return (
    <Card className="machined-surface border-[color:var(--hairline)]">
      <CardHeader>
        <CardTitle className="neon-white font-mono">System Telemetry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Real-time node cluster monitoring initialized.
        </p>
        <Button variant="neon" size="sm">
          Run Diagnostics
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Project Structure

```
├── packages/
│   ├── cli/              # Neoncite CLI installer (`npx neoncite`)
│   └── ui/               # Monorepo UI package & token declarations
├── src/
│   ├── components/       # Showcase site components & interactive playground
│   ├── registry/         # Component source registry & json manifests
│   ├── routes/           # TanStack router page views & documentation
│   └── styles.css        # Global CSS entry importing Neoncite tokens
├── scripts/
│   └── build-registry.mjs # Script for compiling registry items to JSON
└── package.json
```

---

## Authors & Credits

- Created and maintained by **[Thorus](https://thorus.ai)**.
- Built with React, Vite, Tailwind CSS, Radix UI, and Lucide Icons.

---

## License

Licensed under the [MIT License](LICENSE).
