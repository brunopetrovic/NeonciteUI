import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const roots = ["src", "README.md", "public/llms.txt"];
const forbidden = [
  { pattern: /v1\.0\.0\s*[—-]\s*Initial release/i, reason: "false stable 1.0 release claim" },
  { pattern: /@Lovable\b/i, reason: "starter-project social metadata" },
  { pattern: /\b29 components\b/i, reason: "stale hard-coded component count" },
  { pattern: /\b60\+ Pro blocks\b/i, reason: "unsupported commercial Block claim" },
  { pattern: /Figma (kit|library).*(included|access)/i, reason: "unsupported Figma entitlement claim" },
  { pattern: /\bSLA support\b/i, reason: "unsupported support entitlement claim" },
];
const allowedExtensions = new Set([".ts", ".tsx", ".md", ".txt", ".json", ".css"]);
const errors = [];

function inspect(file) {
  const content = fs.readFileSync(file, "utf8");
  for (const rule of forbidden) {
    if (rule.pattern.test(content)) {
      errors.push(`${path.relative(root, file)}: ${rule.reason}`);
    }
  }
}

function walk(target) {
  const absolute = path.join(root, target);
  if (!fs.existsSync(absolute)) return;
  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    inspect(absolute);
    return;
  }
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const child = path.join(absolute, entry.name);
    if (entry.isDirectory()) walk(path.relative(root, child));
    else if (allowedExtensions.has(path.extname(entry.name))) inspect(child);
  }
}

for (const target of roots) walk(target);

if (errors.length) {
  console.error("Public-claim validation failed:\n");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log("[claims] public project claims passed stale/unsupported-claim guard");
