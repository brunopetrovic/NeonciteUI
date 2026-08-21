import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (/\.[cm]?[jt]sx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

for (const relativeRoot of ["src/registry/showcases", "tests/unit"]) {
  const root = path.join(ROOT, relativeRoot);
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    const before = fs.readFileSync(file, "utf8");
    const after = before.replace(/^import \* as React from ["']react["'];\n/, "");
    if (after !== before) fs.writeFileSync(file, after);
  }
}

const replacements = new Map([
  [
    "src/components/docs/CodeBlock.tsx",
    [["import { Highlight, themes, type PrismTheme } from \"prism-react-renderer\";", "import { Highlight, type PrismTheme } from \"prism-react-renderer\";"]],
  ],
  [
    "src/components/docs/InstallTabs.tsx",
    [["{ id: \"npm\", label: \"npm\", cmd: (slug: string) => `npm install @neoncite/ui` }", "{ id: \"npm\", label: \"npm\", cmd: (_slug: string) => `npm install @neoncite/ui` }"]],
  ],
  [
    "src/components/site/CommandPalette.tsx",
    [["import { BookOpen, Layers, Palette, Sparkles, Terminal, Home, ScrollText } from \"lucide-react\";", "import { BookOpen, Layers, Palette, Sparkles, Terminal, Home } from \"lucide-react\";"]],
  ],
  [
    "src/routes/components.$slug.tsx",
    [["import { getRegistryItem, REGISTRY, type RegistryItem } from \"@/registry\";", "import { getRegistryItem, REGISTRY } from \"@/registry\";"]],
  ],
]);

for (const [relative, pairs] of replacements) {
  const file = path.join(ROOT, relative);
  let source = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) source = source.replace(from, to);
  fs.writeFileSync(file, source);
}

console.log("[v0.3-strict] removed dead imports and intentionally-unused parameter warnings");
