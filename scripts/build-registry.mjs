// Reads canonical source files in src/registry/ui/* plus shared metadata from
// src/registry/items.json and emits public/r/<slug>.json.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const REG_SRC = path.join(ROOT, "src/registry/ui");
const OUT = path.join(ROOT, "public/r");
const ITEMS_PATH = path.join(ROOT, "src/registry/items.json");

// Define schema for validation
const ItemSchema = z.object({
  slug: z.string(),
  dependencies: z.array(z.string()).default([]),
  registryDeps: z.array(z.string()).default([]),
  targetPath: z.string(),
});

const ITEMS = z.array(ItemSchema).parse(JSON.parse(fs.readFileSync(ITEMS_PATH, "utf8")));

fs.mkdirSync(OUT, { recursive: true });

const index = [];
for (const itemMeta of ITEMS) {
  const srcPath = path.join(REG_SRC, `${itemMeta.slug}.tsx`);
  if (!fs.existsSync(srcPath)) {
    throw new Error(`[registry] missing canonical source ${srcPath}`);
  }

  const content = fs.readFileSync(srcPath, "utf8");

  // Basic validation of the content (ensure it's not empty and looks like a component)
  if (!content.includes("export") || content.length < 10) {
    throw new Error(`[registry] component ${itemMeta.slug} seems empty or invalid`);
  }

  const item = {
    $schema: "https://neoncite.dev/schema/registry-item.json",
    name: itemMeta.slug,
    type: "registry:ui",
    dependencies: itemMeta.dependencies,
    registryDependencies: itemMeta.registryDeps,
    files: [{ path: itemMeta.targetPath, content, type: "registry:ui", target: "" }],
  };

  fs.writeFileSync(path.join(OUT, `${itemMeta.slug}.json`), JSON.stringify(item, null, 2));
  index.push({
    name: itemMeta.slug,
    type: "registry:ui",
    dependencies: itemMeta.dependencies,
    registryDependencies: itemMeta.registryDeps,
  });
  console.log(`[registry] validated and wrote ${itemMeta.slug}.json`);
}

fs.writeFileSync(
  path.join(OUT, "index.json"),
  JSON.stringify(
    { $schema: "https://neoncite.dev/schema/registry.json", name: "neoncite", items: index },
    null,
    2,
  ),
);
console.log(`[registry] wrote index.json (${index.length} items)`);
