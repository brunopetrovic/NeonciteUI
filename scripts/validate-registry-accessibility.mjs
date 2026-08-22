import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const roots = [path.join(ROOT, "src/registry/ui"), path.join(ROOT, "src/components/blocks")];
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.[cm]?[jt]sx?$/.test(entry.name)) files.push(full);
  }
}

for (const root of roots) walk(root);

const unnamed = [];
const browserApis = [];

function lineFor(source, offset) {
  return source.slice(0, offset).split("\n").length;
}

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const relative = path.relative(ROOT, file).replaceAll("\\", "/");

  const buttonPattern = /<(button|Button)\b([^>]*)>([\s\S]*?)<\/\1>/g;
  for (const match of source.matchAll(buttonPattern)) {
    const attrs = match[2] ?? "";
    const body = match[3] ?? "";
    if (/\baria-(?:label|labelledby)\s*=/.test(attrs)) continue;

    const readable = body
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/<[^>]+\/>/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/<\/[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    // Expressions such as {children} are content-dependent and may provide the
    // accessible name; static icon-only bodies collapse to an empty string.
    if (!readable) {
      unnamed.push(`${relative}:${lineFor(source, match.index ?? 0)} <${match[1]}>`);
    }
  }

  for (const match of source.matchAll(/\b(?:window|document|matchMedia)\b/g)) {
    browserApis.push(`${relative}:${lineFor(source, match.index ?? 0)} ${match[0]}`);
  }
}

if (browserApis.length) {
  console.log("[registry-a11y] browser-only API audit (inspect SSR placement):");
  for (const finding of browserApis) console.log(`- ${finding}`);
} else {
  console.log(
    "[registry-a11y] no direct window/document/matchMedia access in registry UI or blocks",
  );
}

if (unnamed.length) {
  console.error(
    `[registry-a11y] found ${unnamed.length} statically icon-only button(s) without an accessible name:`,
  );
  for (const finding of unnamed) console.error(`- ${finding}`);
  process.exitCode = 1;
} else {
  console.log("[registry-a11y] static icon-only button audit passed");
}
