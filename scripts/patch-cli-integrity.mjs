import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "packages/cli/src/index.ts");
let source = fs.readFileSync(file, "utf8");

source = source.replace(
  'import path from "node:path";\n',
  'import path from "node:path";\nimport { createHash } from "node:crypto";\n',
);
source = source.replace(
  '  content: z.string(),\n  type: z.string().optional(),',
  '  content: z.string(),\n  integrity: z.string().regex(/^sha256-[A-Za-z0-9+/=]+$/),\n  type: z.string().optional(),',
);
source = source.replace(
  '  type: z.string(),\n  dependencies: z.array(z.string()).default([]),',
  '  type: z.string(),\n  description: z.string().optional(),\n  dependencies: z.array(z.string()).default([]),',
);

const marker = 'async function fetchItem(registry: string, name: string): Promise<TRegistryItem> {';
if (!source.includes("function verifyRegistryIntegrity(")) {
  source = source.replace(
    marker,
    `function verifyRegistryIntegrity(itemName: string, file: z.infer<typeof RegistryFile>) {\n  const actual = \`sha256-\${createHash("sha256").update(file.content, "utf8").digest("base64")}\`;\n  if (actual !== file.integrity) {\n    throw new Error(\n      \`Registry integrity check failed for \${itemName}. Do not use the downloaded file. Report this at https://github.com/brunopetrovic/NeonciteUI/issues.\`,\n    );\n  }\n}\n\n${marker}`,
  );
}

source = source.replace(
  '    for (const item of items) {\n      for (const f of item.files) {\n        const target = registryTarget(cwd, f, config);',
  '    for (const item of items) {\n      for (const f of item.files) {\n        verifyRegistryIntegrity(item.name, f);\n        const target = registryTarget(cwd, f, config);',
);
source = source.replace(
  '    for (const f of item.files) {\n      const local = registryTarget(cwd, f, config);',
  '    for (const f of item.files) {\n      verifyRegistryIntegrity(item.name, f);\n      const local = registryTarget(cwd, f, config);',
);
source = source.replace(
  '      console.log(\n        `  ${kleur.bold(item.name)} ${kleur.dim(`[${item.type}]`)} ${deps.length ? kleur.dim(`(requires: ${deps.join(", ")})`) : ""}`,\n      );',
  '      console.log(\n        `  ${kleur.bold(item.name)} ${kleur.dim(`[${item.type}]`)} ${deps.length ? kleur.dim(`(requires: ${deps.join(", ")})`) : ""}`,\n      );\n      if (item.description) console.log(kleur.dim(`    ${item.description}`));',
);

fs.writeFileSync(file, source);
console.log("[cli-integrity] patched registry integrity verification");
