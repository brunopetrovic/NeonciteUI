// Generates the public Neoncite registry from canonical component, block, and theme metadata.

import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REG_SRC = path.join(ROOT, "src/registry/ui");
const BLOCK_SRC = path.join(ROOT, "src/components/blocks");
const OUT = path.join(ROOT, "public/r");
const ITEMS_PATH = path.join(ROOT, "src/registry/items.json");
const EXTRA_ITEMS_PATH = path.join(ROOT, "src/registry/items-extra.json");
const BLOCKS_PATH = path.join(ROOT, "src/registry/blocks.json");
const THEMES_PATH = path.join(ROOT, "src/registry/themes.json");

const ItemSchema = z.object({
  slug: z.string(),
  dependencies: z.array(z.string()).default([]),
  registryDeps: z.array(z.string()).default([]),
  targetPath: z.string(),
  description: z.string().optional(),
});
const BlockSchema = z.object({ slug: z.string(), source: z.string(), name: z.string() });
const ThemeSchema = z.object({
  slug: z.string(),
  name: z.string(),
  primary: z.string(),
  accent: z.string(),
  surface0: z.string(),
  surface1: z.string(),
  surface2: z.string(),
  surface3: z.string(),
  hairline: z.string(),
  foreground: z.string(),
  mutedFg: z.string(),
  radius: z.number(),
});

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const ITEMS = z.array(ItemSchema).parse([...readJson(ITEMS_PATH), ...readJson(EXTRA_ITEMS_PATH)]);
const BLOCKS = z.array(BlockSchema).parse(readJson(BLOCKS_PATH));
const THEMES = z.array(ThemeSchema).parse(readJson(THEMES_PATH));
const ITEM_SLUGS = new Set(ITEMS.map((item) => item.slug));

fs.mkdirSync(OUT, { recursive: true });

function integrity(content) {
  return `sha256-${createHash("sha256").update(content, "utf8").digest("base64")}`;
}

function packageName(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

function sourceImports(content) {
  const imports = [];
  const matcher = /(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g;
  for (const match of content.matchAll(matcher)) imports.push(match[1]);
  return imports;
}

function blockDependencies(content, slug) {
  const dependencies = new Set();
  const registryDependencies = new Set();
  for (const specifier of sourceImports(content)) {
    const uiMatch = specifier.match(/^@\/registry\/ui\/([a-z0-9-]+)$/);
    if (uiMatch) {
      if (!ITEM_SLUGS.has(uiMatch[1]))
        throw new Error(`[registry] block ${slug} imports unknown UI item ${uiMatch[1]}`);
      registryDependencies.add(uiMatch[1]);
      continue;
    }
    if (specifier === "react" || specifier.startsWith("react/")) continue;
    if (specifier.startsWith("@/") || specifier.startsWith(".") || specifier.startsWith("/"))
      continue;
    dependencies.add(packageName(specifier));
  }
  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

function themeCss(theme) {
  return `/* Neoncite ${theme.name} — dark-only registry theme */
:root, .dark {
  --primary: ${theme.primary};
  --ring: ${theme.primary};
  --accent: ${theme.accent};
  --radius: ${theme.radius}rem;
  --surface-0: ${theme.surface0};
  --surface-1: ${theme.surface1};
  --surface-2: ${theme.surface2};
  --surface-3: ${theme.surface3};
  --hairline: ${theme.hairline};
  --background: ${theme.surface0};
  --foreground: ${theme.foreground};
  --card: ${theme.surface1};
  --card-foreground: ${theme.foreground};
  --popover: ${theme.surface2};
  --popover-foreground: ${theme.foreground};
  --secondary: ${theme.surface3};
  --secondary-foreground: ${theme.foreground};
  --muted: ${theme.surface2};
  --muted-foreground: ${theme.mutedFg};
  --input: ${theme.surface3};
  --border: ${theme.surface3};
}`;
}

const index = [];
for (const itemMeta of ITEMS) {
  const srcPath = path.join(REG_SRC, `${itemMeta.slug}.tsx`);
  if (!fs.existsSync(srcPath)) throw new Error(`[registry] missing canonical source ${srcPath}`);
  const content = fs.readFileSync(srcPath, "utf8");
  if (!content.includes("export") || content.length < 10)
    throw new Error(`[registry] component ${itemMeta.slug} seems empty or invalid`);
  const sourceIntegrity = integrity(content);
  const item = {
    $schema: "https://neoncite-ui.thorus.workers.dev/r/schema.json",
    name: itemMeta.slug,
    type: "registry:ui",
    ...(itemMeta.description ? { description: itemMeta.description } : {}),
    dependencies: itemMeta.dependencies,
    registryDependencies: itemMeta.registryDeps,
    integrity: sourceIntegrity,
    files: [
      {
        path: itemMeta.targetPath,
        content,
        integrity: sourceIntegrity,
        type: "registry:ui",
        target: "",
      },
    ],
  };
  fs.writeFileSync(path.join(OUT, `${itemMeta.slug}.json`), JSON.stringify(item, null, 2));
  index.push({
    name: itemMeta.slug,
    type: "registry:ui",
    ...(itemMeta.description ? { description: itemMeta.description } : {}),
    dependencies: itemMeta.dependencies,
    registryDependencies: itemMeta.registryDeps,
    integrity: sourceIntegrity,
  });
  console.log(`[registry] validated and wrote ${itemMeta.slug}.json`);
}

for (const blockMeta of BLOCKS) {
  const sourcePath = path.join(BLOCK_SRC, blockMeta.source);
  if (!fs.existsSync(sourcePath)) throw new Error(`[registry] missing block source ${sourcePath}`);
  const content = fs.readFileSync(sourcePath, "utf8");
  const { dependencies, registryDependencies } = blockDependencies(content, blockMeta.slug);
  const targetPath = `components/neoncite/blocks/${blockMeta.slug}.tsx`;
  const sourceIntegrity = integrity(content);
  const description = dependencies.includes("recharts")
    ? "Requires recharts >=2.0.0 as a peer dependency."
    : undefined;
  const item = {
    $schema: "https://neoncite-ui.thorus.workers.dev/r/schema.json",
    name: blockMeta.slug,
    type: "registry:block",
    ...(description ? { description } : {}),
    dependencies,
    registryDependencies,
    integrity: sourceIntegrity,
    files: [
      {
        path: targetPath,
        content,
        integrity: sourceIntegrity,
        type: "registry:block",
        target: "",
      },
    ],
  };
  fs.writeFileSync(path.join(OUT, `${blockMeta.slug}.json`), JSON.stringify(item, null, 2));
  index.push({
    name: blockMeta.slug,
    type: "registry:block",
    ...(description ? { description } : {}),
    dependencies,
    registryDependencies,
    integrity: sourceIntegrity,
  });
  console.log(`[registry] validated and wrote block ${blockMeta.slug}.json`);
}

for (const theme of THEMES) {
  const content = themeCss(theme);
  const sourceIntegrity = integrity(content);
  const item = {
    $schema: "https://neoncite-ui.thorus.workers.dev/r/schema.json",
    name: theme.slug,
    type: "registry:theme",
    dependencies: [],
    registryDependencies: [],
    integrity: sourceIntegrity,
    files: [
      {
        path: `src/styles/${theme.slug}.css`,
        content,
        integrity: sourceIntegrity,
        type: "registry:theme",
        target: "",
      },
    ],
  };
  fs.writeFileSync(path.join(OUT, `${theme.slug}.json`), JSON.stringify(item, null, 2));
  index.push({
    name: theme.slug,
    type: "registry:theme",
    dependencies: [],
    registryDependencies: [],
    integrity: sourceIntegrity,
  });
  console.log(`[registry] validated and wrote theme ${theme.slug}.json`);
}

fs.writeFileSync(
  path.join(OUT, "index.json"),
  JSON.stringify(
    {
      $schema: "https://neoncite-ui.thorus.workers.dev/r/schema.json",
      name: "neoncite",
      items: index,
    },
    null,
    2,
  ),
);
console.log(
  `[registry] wrote index.json (${ITEMS.length} UI, ${BLOCKS.length} blocks, ${THEMES.length} themes)`,
);
