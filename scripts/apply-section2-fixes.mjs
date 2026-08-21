import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOTS = ["src/registry/ui", "src/components/blocks"];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(file));
    else if (/\.[cm]?[jt]sx?$/.test(entry.name)) files.push(file);
  }
  return files;
}

const replacements = [
  ["#1c1c1e", "var(--surface-3)"],
  ["shadow-[0_0_12px_rgba(255,42,157,0.4)]", "shadow-[var(--glow-pink)]"],
  ["shadow-[0_0_64px_rgba(0,0,0,0.8)]", "shadow-[var(--shadow-sheet)]"],
  ["shadow-[0_8px_24px_rgba(0,0,0,0.6)]", "shadow-[var(--shadow-floating)]"],
  ["rgba(255,42,157,0.5)", "var(--neon-pink-glow)"],
  ["rgba(0,240,255,0.5)", "var(--neon-cyan-glow)"],
  ["rgba(0,255,102,0.5)", "var(--neon-green-glow)"],
  ["rgba(255,204,0,0.5)", "var(--neon-yellow-glow)"],
  ["rgba(184,41,255,0.5)", "var(--neon-purple-glow)"],
];

for (const root of SOURCE_ROOTS) {
  for (const file of walk(path.join(ROOT, root))) {
    const before = fs.readFileSync(file, "utf8");
    let after = before;
    for (const [from, to] of replacements) after = after.split(from).join(to);
    if (after !== before) fs.writeFileSync(file, after);
  }
}

const tokensPath = path.join(ROOT, "packages/ui/tokens.css");
let tokens = fs.readFileSync(tokensPath, "utf8");
if (!tokens.includes("--shadow-sheet:")) {
  tokens = tokens.replace(
    "  --shadow-drawer: 0 -24px 64px color-mix(in oklab, black 75%, transparent), var(--rim-light-shadow);\n",
    "  --shadow-drawer: 0 -24px 64px color-mix(in oklab, black 75%, transparent), var(--rim-light-shadow);\n  --shadow-sheet: 0 0 64px color-mix(in oklab, black 80%, transparent);\n",
  );
}
fs.writeFileSync(tokensPath, tokens);

console.log("[section2] applied final semantic token replacements");
