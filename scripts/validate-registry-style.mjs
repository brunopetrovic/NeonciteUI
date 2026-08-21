import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE_ROOTS = [path.join(ROOT, "src/registry/ui"), path.join(ROOT, "src/components/blocks")];

const violations = [];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (/\.[cm]?[jt]sx?$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

function add(file, line, kind, detail) {
  violations.push({ file: path.relative(ROOT, file).replaceAll("\\", "/"), line, kind, detail });
}

for (const sourceRoot of SOURCE_ROOTS) {
  for (const file of walk(sourceRoot)) {
    const content = fs.readFileSync(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      if (/^\s*import\s.+\sfrom\s+["']framer-motion["']\s*;?\s*$/.test(line)) {
        add(
          file,
          lineNumber,
          "motion-import",
          "Static framer-motion imports are forbidden in registry sources; use an opt-in dynamic import.",
        );
      }

      for (const match of line.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
        add(file, lineNumber, "hardcoded-color", `Hardcoded hex color ${match[0]}`);
      }

      for (const match of line.matchAll(/\b(?:rgba?|hsla?)\([^)]*\)/gi)) {
        if (!match[0].includes("var(")) {
          add(file, lineNumber, "hardcoded-color", `Hardcoded color function ${match[0]}`);
        }
      }

      for (const match of line.matchAll(/<motion\.(button|a|div|span|input|textarea|select|form|label|section|article|aside|header|footer|main|nav|ul|ol|li|img|svg|path)\b/g)) {
        add(
          file,
          lineNumber,
          "motion-native-wrapper",
          `Direct ${match[0].slice(1)} JSX wrapper is forbidden in registry sources.`,
        );
      }
    });
  }
}

if (violations.length) {
  console.error(`[registry-style] found ${violations.length} violation(s):`);
  for (const violation of violations) {
    console.error(
      `- ${violation.file}:${violation.line} [${violation.kind}] ${violation.detail}`,
    );
  }
  process.exitCode = 1;
} else {
  console.log("[registry-style] registry UI and block sources pass motion/token style checks");
}
