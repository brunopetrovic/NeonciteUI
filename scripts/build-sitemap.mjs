import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ITEMS_PATH = path.join(ROOT, "src/registry/items.json");
const OUT_PATH = path.join(ROOT, "public/sitemap.xml");
const ORIGIN = "https://neoncite-ui.brunopetrovic33.workers.dev";

const items = JSON.parse(fs.readFileSync(ITEMS_PATH, "utf8"));

const staticRoutes = [
  "/",
  "/components",
  "/blocks",
  "/themes",
  "/changelog",
  "/docs",
  "/docs/installation",
  "/docs/cli",
  "/docs/theming",
];

const componentRoutes = items.map((item) => `/components/${item.slug}`);
const routes = [...new Set([...staticRoutes, ...componentRoutes])];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${ORIGIN}${route}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(OUT_PATH, xml);
console.log(`[sitemap] wrote ${path.relative(ROOT, OUT_PATH)} (${routes.length} routes)`);
