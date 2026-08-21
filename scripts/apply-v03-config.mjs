import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
const readJsonc = (file) => {
  const source = fs.readFileSync(path.join(ROOT, file), "utf8");
  const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, "");
  const withoutLineComments = withoutBlockComments.replace(/(^|[^:\\])\/\/.*$/gm, "$1");
  const withoutTrailingCommas = withoutLineComments.replace(/,\s*([}\]])/g, "$1");
  return JSON.parse(withoutTrailingCommas);
};
const writeJson = (file, value) =>
  fs.writeFileSync(path.join(ROOT, file), `${JSON.stringify(value, null, 2)}\n`);

const pkg = readJson("package.json");
pkg.engines = { node: ">=22.0.0", npm: ">=10.0.0" };
pkg.scripts["test:unit"] = "vitest run";
pkg.scripts["check:bundle"] = "node scripts/check-core-bundle.mjs";
pkg.scripts["build:analyze"] =
  "vite build --mode production && npx vite-bundle-visualizer --open false";
pkg.scripts["validate:registry"] =
  "node scripts/validate-registry-deps.mjs && node scripts/validate-registry-style.mjs && node scripts/validate-registry-accessibility.mjs";
pkg.scripts.validate =
  "npm run typecheck && npm run lint && npm run test && npm run test:unit && npm run validate:registry && npm run validate:generated && npm run build && npm run test:e2e && npm run check:bundle";

for (const name of ["framer-motion", "recharts", "@tanstack/react-start"]) {
  if (pkg.dependencies?.[name]) {
    pkg.devDependencies[name] = pkg.dependencies[name];
    delete pkg.dependencies[name];
  }
}
Object.assign(pkg.devDependencies, {
  "@testing-library/react": "^16.3.2",
  "@testing-library/user-event": "^14.6.5",
  "@testing-library/jest-dom": "^6.6.3",
  jsdom: "^26.1.0",
  vitest: "^4.1.10",
  esbuild: "^0.28.2",
  "vite-bundle-visualizer": "^1.2.1",
});
pkg.peerDependencies = {
  react: ">=18.0.0",
  "react-dom": ">=18.0.0",
  tailwindcss: ">=4.0.0",
  "framer-motion": ">=10.0.0",
  recharts: ">=2.0.0",
};
pkg.peerDependenciesMeta = {
  "framer-motion": { optional: true },
  recharts: { optional: true },
};
writeJson("package.json", pkg);

const tsconfig = readJsonc("tsconfig.json");
tsconfig.include = [
  "src/**/*.ts",
  "src/**/*.tsx",
  "tests/**/*.ts",
  "tests/**/*.tsx",
  "vite.config.ts",
  "eslint.config.js",
];
tsconfig.compilerOptions.noUnusedLocals = true;
tsconfig.compilerOptions.noUnusedParameters = true;
tsconfig.compilerOptions.verbatimModuleSyntax = true;
writeJson("tsconfig.json", tsconfig);

const eslintPath = path.join(ROOT, "eslint.config.js");
let eslint = fs.readFileSync(eslintPath, "utf8");
eslint = eslint.replace(
  '"@typescript-eslint/no-unused-vars": "off"',
  '"@typescript-eslint/no-unused-vars": ["warn", {\n          argsIgnorePattern: "^_",\n          varsIgnorePattern: "^_",\n          caughtErrorsIgnorePattern: "^_",\n          ignoreRestSiblings: true,\n        }]',
);
fs.writeFileSync(eslintPath, eslint);

const components = readJson("components.json");
components.tailwind.baseColor = "neutral";
components.neoncite = {
  ...(components.neoncite ?? {}),
  baseColorNote:
    "shadcn compatibility shim only; Neoncite surfaces are defined in packages/ui/tokens.css",
  chartPeerDependency: "Requires recharts >=2.0.0 as a peer dependency.",
};
writeJson("components.json", components);

const gitignorePath = path.join(ROOT, ".gitignore");
let gitignore = fs.readFileSync(gitignorePath, "utf8");
gitignore = gitignore.replace(/^package-lock\.json\n/m, "");
fs.writeFileSync(gitignorePath, gitignore);

const metadata = readJson("metadata.json");
for (const key of ["capabilities", "capabilityDeclarations", "majorCapabilities"]) {
  if (Array.isArray(metadata[key])) {
    metadata[key] = metadata[key].filter(
      (capability) => capability !== "MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API",
    );
  }
}
writeJson("metadata.json", metadata);

for (const manifestPath of ["src/registry/items.json", "src/registry/items-extra.json"]) {
  const items = readJson(manifestPath);
  for (const item of items) {
    if (["button", "badge"].includes(item.slug)) {
      item.dependencies = (item.dependencies ?? []).filter((dep) => dep !== "framer-motion");
    }
    if (item.slug === "form") {
      item.dependencies = [...new Set([...(item.dependencies ?? []), "@radix-ui/react-slot"])];
    }
    const sourcePath = path.join(ROOT, "src/registry/ui", `${item.slug}.tsx`);
    if (fs.existsSync(sourcePath)) {
      const source = fs.readFileSync(sourcePath, "utf8");
      if (/from\s+["']recharts["']/.test(source)) {
        item.dependencies = [...new Set([...(item.dependencies ?? []), "recharts"])];
        item.description = "Requires recharts >=2.0.0 as a peer dependency.";
      }
    }
  }
  writeJson(manifestPath, items);
}

console.log("[v0.3-config] package, strictness, registry, and security config updated");
