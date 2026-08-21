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

function replaceAll(content, replacements) {
  let next = content;
  for (const [from, to] of replacements) next = next.split(from).join(to);
  return next;
}

const commonReplacements = [
  [
    "shadow-[0_50px_100px_rgba(0,0,0,0.9),var(--rim-light-shadow)]",
    "shadow-[var(--shadow-dialog)]",
  ],
  [
    "shadow-[0_50px_100px_rgba(0,0,0,1),inset_0_1px_1px_rgba(255,255,255,0.08)]",
    "shadow-[var(--shadow-dialog)]",
  ],
  [
    "shadow-[0_-24px_64px_rgba(0,0,0,.75),var(--rim-light-shadow)]",
    "shadow-[var(--shadow-drawer)]",
  ],
  [
    "shadow-[0_24px_48px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]",
    "shadow-[var(--shadow-floating)]",
  ],
  [
    "shadow-[0_24px_48px_rgba(0,0,0,.65),var(--rim-light-shadow)]",
    "shadow-[var(--shadow-floating)]",
  ],
  ["shadow-[0_24px_48px_rgba(0,0,0,0.6)]", "shadow-[var(--shadow-floating)]"],
  [
    "shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]",
    "shadow-[var(--machined-shadow)]",
  ],
  [
    "shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]",
    "shadow-[var(--machined-shadow)]",
  ],
  [
    "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_12px_rgba(0,0,0,0.5)]",
    "shadow-[var(--shadow-avatar)]",
  ],
  ["shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]", "shadow-[var(--shadow-recessed-compact)]"],
  ["shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]", "shadow-[var(--shadow-recessed-compact)]"],
  [
    "shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_0_16px_rgba(255,42,157,0.5)]",
    "shadow-[var(--shadow-switch-checked)]",
  ],
  [
    "shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)]",
    "shadow-[var(--shadow-control-thumb)]",
  ],
  [
    "shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)]",
    "shadow-[var(--shadow-control-thumb)]",
  ],
  [
    "shadow-[0_2px_0_rgba(0,0,0,.65),inset_0_1px_1px_rgba(255,255,255,.08)]",
    "shadow-[var(--shadow-keycap)]",
  ],
  [
    "shadow-[inset_0_8px_24px_rgba(0,0,0,.7),var(--rim-light-shadow)]",
    "shadow-[var(--recessed-shadow)]",
  ],
  ["shadow-[inset_0_0_32px_rgba(0,240,255,.025)]", "shadow-[var(--shadow-hud)]"],
  ["shadow-[0_0_12px_rgba(255,42,157,0.5)]", "shadow-[var(--glow-pink)]"],
  ["shadow-[0_0_12px_rgba(255,42,157,0.6)]", "shadow-[var(--glow-pink-strong)]"],
  ["shadow-[0_0_16px_rgba(255,42,157,0.4)]", "shadow-[var(--glow-pink)]"],
  ["shadow-[0_0_16px_rgba(255,42,157,0.5)]", "shadow-[var(--glow-pink)]"],
  ["shadow-[0_0_32px_rgba(255,42,157,0.15)]", "shadow-[var(--glow-pink)]"],
  ["shadow-[0_0_32px_rgba(255,42,157,0.12)]", "shadow-[var(--glow-pink)]"],
  ["#d11a7d", "var(--neon-pink)"],
  ["#ff2a9d", "var(--neon-pink)"],
  ["#00f0ff", "var(--neon-cyan)"],
  ["#3399ff", "var(--neon-blue)"],
  ["#ffcc00", "var(--neon-yellow)"],
  ["#ff6600", "var(--neon-orange)"],
  ["#00ff66", "var(--neon-green)"],
  ["#b829ff", "var(--neon-purple)"],
  ["#ff003c", "var(--neon-red)"],
  ["#ccff00", "var(--neon-lime)"],
  ["#ff3355", "var(--neon-red)"],
  ["#ffd400", "var(--neon-yellow)"],
  ["#8e8e93", "var(--muted-foreground)"],
  ["#2c2c2e", "var(--hairline)"],
  ["#121214", "var(--surface-2)"],
  ["#0a0a0c", "var(--card)"],
  ["#0a0a0a", "var(--surface-1)"],
  ["#161618", "var(--surface-2)"],
  ["#48484a", "var(--hairline-strong)"],
  ["#e5e5ea", "var(--foreground)"],
  ["#f5f5f7", "var(--foreground)"],
  ["#a8a8ad", "var(--muted-foreground)"],
];

for (const root of SOURCE_ROOTS) {
  for (const file of walk(path.join(ROOT, root))) {
    const before = fs.readFileSync(file, "utf8");
    let after = replaceAll(before, commonReplacements);

    // Recharts defaults are implementation details, so target semantic Recharts classes
    // rather than hardcoding their current SVG stroke attributes.
    after = after
      .replaceAll(
        "[&_.recharts-cartesian-grid_line[stroke='var(--neon-cyan)']]",
        "[&_.recharts-cartesian-grid_line]",
      )
      .replaceAll(
        "[&_.recharts-cartesian-grid_line[stroke='#ccc']]",
        "[&_.recharts-cartesian-grid_line]",
      )
      .replaceAll("[&_.recharts-dot[stroke='#fff']]", "[&_.recharts-dot]")
      .replaceAll("[&_.recharts-polar-grid_[stroke='#ccc']]", "[&_.recharts-polar-grid_line]")
      .replaceAll(
        "[&_.recharts-reference-line_[stroke='#ccc']]",
        "[&_.recharts-reference-line_line]",
      )
      .replaceAll("[&_.recharts-sector[stroke='#fff']]", "[&_.recharts-sector]");

    // Remaining non-shadow raw colors are inline CSS values or special visual recipes.
    after = after
      .replaceAll("rgba(255,255,255,.08)", "color-mix(in oklab, white 8%, transparent)")
      .replaceAll("rgba(255,255,255,.1)", "color-mix(in oklab, white 10%, transparent)")
      .replaceAll("rgba(255,42,157,0.18)", "color-mix(in oklab, var(--neon-pink) 18%, transparent)")
      .replaceAll("rgba(0,240,255,0.14)", "color-mix(in oklab, var(--neon-cyan) 14%, transparent)");

    // Bright accent backgrounds need OLED-black foregrounds to meet AA contrast.
    after = after
      .replaceAll(
        "data-[state=checked]:text-white",
        "data-[state=checked]:text-[color:var(--surface-0)]",
      )
      .replaceAll("aria-selected:text-white ", "aria-selected:text-[color:var(--surface-0)] ")
      .replaceAll(
        "data-[state=active]:text-white",
        "data-[state=active]:text-[color:var(--surface-0)]",
      )
      .replaceAll("group-[.toast]:text-white", "group-[.toast]:text-[color:var(--surface-0)]");

    if (after !== before) fs.writeFileSync(file, after);
  }
}

const tokensPath = path.join(ROOT, "packages/ui/tokens.css");
let tokens = fs.readFileSync(tokensPath, "utf8");
const shadowAnchor =
  "  --shadow-inset-hairline: inset 0 1px 0 color-mix(in oklab, white 5%, transparent);\n";
if (!tokens.includes("--shadow-floating:")) {
  tokens = tokens.replace(
    shadowAnchor,
    `${shadowAnchor}  --shadow-floating: 0 24px 48px color-mix(in oklab, black 60%, transparent), 0 0 0 1px color-mix(in oklab, white 4%, transparent);\n  --shadow-dialog: 0 50px 100px color-mix(in oklab, black 90%, transparent), var(--rim-light-shadow);\n  --shadow-drawer: 0 -24px 64px color-mix(in oklab, black 75%, transparent), var(--rim-light-shadow);\n  --shadow-avatar: 0 0 0 1px color-mix(in oklab, white 4%, transparent), 0 4px 12px color-mix(in oklab, black 50%, transparent);\n  --shadow-recessed-compact: inset 0 2px 6px color-mix(in oklab, black 80%, transparent);\n  --shadow-control-thumb: 0 4px 8px color-mix(in oklab, black 60%, transparent), inset 0 1px 1px color-mix(in oklab, white 50%, transparent);\n  --shadow-switch-checked: inset 0 1px 2px color-mix(in oklab, black 40%, transparent), var(--glow-pink);\n  --shadow-keycap: 0 2px 0 color-mix(in oklab, black 65%, transparent), inset 0 1px 1px color-mix(in oklab, white 8%, transparent);\n  --shadow-hud: inset 0 0 32px color-mix(in oklab, var(--neon-cyan) 2.5%, transparent);\n`,
  );
}
fs.writeFileSync(tokensPath, tokens);

console.log("[section2] applied semantic token replacements");
