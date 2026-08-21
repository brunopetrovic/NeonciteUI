#!/usr/bin/env node
// Neoncite CLI — fetches registry items from the public registry and writes them
// into the user's project. Compatible with the shadcn-style registry-item schema.

import { Command } from "commander";
import prompts from "prompts";
import kleur from "kleur";
import { execa } from "execa";
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { createHash } from "node:crypto";
import { createHash } from "node:crypto";
import { z } from "zod";

const CLI_VERSION = "0.2.0";
const DEFAULT_REGISTRY = "https://neoncite-ui.brunopetrovic33.workers.dev/r";
const BOOTSTRAP_DEPS = ["clsx", "tailwind-merge", "tw-animate-css"];

const RegistryFile = z.object({
  path: z.string(),
  content: z.string(),
  integrity: z.string().regex(/^sha256-[A-Za-z0-9+/=]+$/),
  type: z.string().optional(),
  target: z.string().optional(),
});
const RegistryItem = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(RegistryFile),
});
type TRegistryItem = z.infer<typeof RegistryItem>;

type NeonciteConfig = z.infer<typeof ConfigSchema>;

const ConfigSchema = z.object({
  $schema: z.string().optional(),
  style: z.string().default("neoncite"),
  registry: z.string().default(DEFAULT_REGISTRY),
  aliases: z
    .object({
      components: z.string().default("@/components"),
      utils: z.string().default("@/lib/utils"),
    })
    .default({ components: "@/components", utils: "@/lib/utils" }),
});

const program = new Command();
program.name("neoncite").description("Neoncite UI design system CLI").version(CLI_VERSION);

async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJson(p: string) {
  return JSON.parse(await fs.readFile(p, "utf8")) as Record<string, unknown>;
}

async function readConfig(cwd: string) {
  const p = path.join(cwd, "neoncite.json");
  try {
    const raw = await fs.readFile(p, "utf8");
    return ConfigSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function detectPackageManager(cwd: string): Promise<"bun" | "pnpm" | "yarn" | "npm"> {
  if ((await exists(path.join(cwd, "bun.lock"))) || (await exists(path.join(cwd, "bun.lockb")))) {
    return "bun";
  }
  if (await exists(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (await exists(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

async function readProjectPackage(cwd: string) {
  const packagePath = path.join(cwd, "package.json");
  if (!(await exists(packagePath))) {
    throw new Error("No package.json found. Run Neoncite from the root of a React project.");
  }
  return readJson(packagePath);
}

function dependencyVersion(pkg: Record<string, unknown>, name: string) {
  const dependencies = (pkg.dependencies ?? {}) as Record<string, string>;
  const devDependencies = (pkg.devDependencies ?? {}) as Record<string, string>;
  return dependencies[name] ?? devDependencies[name];
}

function tailwindMajor(version?: string) {
  if (!version) return null;
  const match = version.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function aliasToFsPath(cwd: string, alias: string, fallback: string) {
  const normalized = alias.replace(/\\/g, "/").replace(/\/$/, "");
  if (normalized.startsWith("@/")) return path.join(cwd, "src", normalized.slice(2));
  if (normalized.startsWith("~/")) return path.join(cwd, "src", normalized.slice(2));
  if (normalized.startsWith("./")) return path.join(cwd, normalized.slice(2));
  if (normalized.startsWith("src/")) return path.join(cwd, normalized);
  return path.join(cwd, fallback);
}

function withTsExtension(filePath: string) {
  return /\.[cm]?[jt]sx?$/.test(filePath) ? filePath : `${filePath}.ts`;
}

function relativeImport(fromFile: string, toFile: string) {
  const withoutExtension = toFile.replace(/\.[cm]?[jt]sx?$/, "");
  const relative = path.relative(path.dirname(fromFile), withoutExtension).replace(/\\/g, "/");
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function verifyRegistryIntegrity(itemName: string, file: z.infer<typeof RegistryFile>) {
  const actual = `sha256-${createHash("sha256").update(file.content, "utf8").digest("base64")}`;
  if (actual !== file.integrity) {
    throw new Error(
      `Registry integrity check failed for ${itemName}. Do not use the downloaded file. Report this at https://github.com/brunopetrovic/NeonciteUI/issues.`,
    );
  }
}

async function fetchItem(registry: string, name: string): Promise<TRegistryItem> {
  const url = `${registry.replace(/\/$/, "")}/${name}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return RegistryItem.parse(await res.json());
}

async function resolveAll(registry: string, names: string[]) {
  const items = new Map<string, TRegistryItem>();

  async function visit(name: string) {
    if (items.has(name)) return;
    const item = await fetchItem(registry, name);
    items.set(name, item);
    if (item.registryDependencies?.length) {
      await Promise.all(item.registryDependencies.map((dep) => visit(dep)));
    }
  }

  await Promise.all(names.map((n) => visit(n)));
  return Array.from(items.values());
}

async function installDeps(deps: string[], pm: string, cwd: string) {
  if (deps.length === 0) return;
  const cmd = pm === "npm" ? ["install", ...deps] : ["add", ...deps];
  console.log(kleur.dim(`  ${pm} ${cmd.join(" ")}`));
  await execa(pm, cmd, { cwd, stdio: "inherit" });
}

function rewriteRegistrySource(
  content: string,
  cwd: string,
  config: NeonciteConfig,
  target: string,
) {
  const utilsPath = withTsExtension(aliasToFsPath(cwd, config.aliases.utils, "src/lib/utils"));
  const utilsImport = relativeImport(target, utilsPath);
  const componentsDir = aliasToFsPath(cwd, config.aliases.components, "src/components");

  return content
    .replace(/@\/registry\/ui\/([a-z0-9-]+)/g, (_match, slug: string) =>
      relativeImport(target, path.join(componentsDir, "neoncite", `${slug}.tsx`)),
    )
    .replace(/@\/lib\/utils/g, utilsImport);
}

function registryTarget(cwd: string, file: z.infer<typeof RegistryFile>, config: NeonciteConfig) {
  const marker = "components/neoncite/";
  const markerIndex = file.path.replace(/\\/g, "/").indexOf(marker);
  if (markerIndex >= 0) {
    const componentsDir = aliasToFsPath(cwd, config.aliases.components, "src/components");
    const nestedPath = file.path.replace(/\\/g, "/").slice(markerIndex + marker.length);
    return path.join(componentsDir, "neoncite", nestedPath);
  }
  if (file.type === "registry:ui") {
    const componentsDir = aliasToFsPath(cwd, config.aliases.components, "src/components");
    return path.join(componentsDir, "neoncite", path.basename(file.path));
  }
  return path.join(cwd, file.path);
}

async function findCssEntry(cwd: string) {
  const candidates = [
    "src/index.css",
    "src/styles.css",
    "src/globals.css",
    "src/app.css",
    "app/globals.css",
    "styles/globals.css",
  ];

  let firstExisting: string | null = null;
  for (const candidate of candidates) {
    const absolute = path.join(cwd, candidate);
    if (!(await exists(absolute))) continue;
    firstExisting ??= absolute;
    const content = await fs.readFile(absolute, "utf8");
    if (content.includes("tailwindcss")) return { path: absolute, created: false };
  }

  if (firstExisting) return { path: firstExisting, created: false };

  const created = path.join(cwd, "src/globals.css");
  await fs.mkdir(path.dirname(created), { recursive: true });
  await fs.writeFile(created, '@import "tailwindcss";\n');
  return { path: created, created: true };
}

async function ensureUtils(cwd: string, config: NeonciteConfig) {
  const utilsPath = withTsExtension(aliasToFsPath(cwd, config.aliases.utils, "src/lib/utils"));
  if (await exists(utilsPath)) {
    console.log(kleur.dim(`  exists ${path.relative(cwd, utilsPath)}`));
    return;
  }

  const source = `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`;
  await fs.mkdir(path.dirname(utilsPath), { recursive: true });
  await fs.writeFile(utilsPath, source);
  console.log(kleur.green("  + ") + path.relative(cwd, utilsPath));
}

async function ensureThemeCss(cwd: string) {
  const cssEntry = await findCssEntry(cwd);
  const themePath = path.join(path.dirname(cssEntry.path), "neoncite.css");

  if (!(await exists(themePath))) {
    const themeUrl = new URL("../theme.css", import.meta.url);
    const themeCss = await fs.readFile(themeUrl, "utf8");
    await fs.writeFile(themePath, themeCss);
    console.log(kleur.green("  + ") + path.relative(cwd, themePath));
  } else {
    console.log(kleur.dim(`  exists ${path.relative(cwd, themePath)}`));
  }

  const relativeTheme = `./${path.basename(themePath)}`;
  const importLine = `@import "${relativeTheme}";`;
  let entryContent = await fs.readFile(cssEntry.path, "utf8");

  if (!entryContent.includes(importLine)) {
    const lines = entryContent.split("\n");
    let insertAt = 0;
    while (
      insertAt < lines.length &&
      (lines[insertAt].trim() === "" || lines[insertAt].trim().startsWith("@import "))
    ) {
      insertAt += 1;
    }
    lines.splice(insertAt, 0, importLine);
    entryContent = lines.join("\n");
    await fs.writeFile(cssEntry.path, entryContent);
    console.log(
      kleur.green("  ~ ") + `${path.relative(cwd, cssEntry.path)} (imported Neoncite theme)`,
    );
  }

  if (!entryContent.includes("tailwindcss")) {
    console.log(
      kleur.yellow("  ! ") +
        `${path.relative(cwd, cssEntry.path)} does not appear to import Tailwind CSS. Add @import "tailwindcss"; before the Neoncite import.`,
    );
  }

  if (cssEntry.created) {
    console.log(
      kleur.yellow("  ! ") +
        `Created ${path.relative(cwd, cssEntry.path)}. Import this stylesheet from your application entry point.`,
    );
  }
}

program
  .command("init")
  .description("Initialize Neoncite in this project")
  .option("--registry <url>", "Registry URL", DEFAULT_REGISTRY)
  .option("-y, --yes", "Use non-interactive defaults")
  .action(async (opts: { registry: string; yes?: boolean }) => {
    const cwd = process.cwd();
    const pkg = await readProjectPackage(cwd);
    const pm = await detectPackageManager(cwd);
    const tailwindVersion = dependencyVersion(pkg, "tailwindcss");
    const major = tailwindMajor(tailwindVersion);

    if (major !== null && major < 4) {
      throw new Error(
        `Neoncite requires Tailwind CSS v4. Detected ${tailwindVersion}. Upgrade Tailwind before running init.`,
      );
    }
    if (!tailwindVersion) {
      console.log(
        kleur.yellow(
          "! Tailwind CSS was not found in package.json. Neoncite requires Tailwind CSS v4.",
        ),
      );
    }

    const existing = await readConfig(cwd);
    let config: NeonciteConfig;

    if (existing) {
      config = existing;
      console.log(kleur.dim("  exists neoncite.json"));
    } else {
      const answers = opts.yes
        ? { components: "@/components", utils: "@/lib/utils" }
        : await prompts([
            {
              type: "text",
              name: "components",
              message: "Components alias",
              initial: "@/components",
            },
            { type: "text", name: "utils", message: "Utils alias", initial: "@/lib/utils" },
          ]);

      config = ConfigSchema.parse({
        $schema: "https://neoncite-ui.brunopetrovic33.workers.dev/r/schema.json",
        style: "neoncite",
        registry: opts.registry,
        aliases: {
          components: answers.components || "@/components",
          utils: answers.utils || "@/lib/utils",
        },
      });
      await fs.writeFile(path.join(cwd, "neoncite.json"), `${JSON.stringify(config, null, 2)}\n`);
      console.log(kleur.green("  + ") + "neoncite.json");
    }

    const missingBootstrapDeps = BOOTSTRAP_DEPS.filter((dep) => !dependencyVersion(pkg, dep));
    if (missingBootstrapDeps.length) await installDeps(missingBootstrapDeps, pm, cwd);

    await ensureUtils(cwd, config);
    await ensureThemeCss(cwd);

    console.log(kleur.green("\n✓ Neoncite initialized."));
    console.log(kleur.dim("  Next: ") + kleur.cyan("npx neoncite add button"));
  });

program
  .command("add [items...]")
  .description("Add one or more components, blocks, or themes from the Neoncite registry")
  .option("-a, --all", "Add all UI components from the registry")
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-o, --overwrite", "Overwrite existing files")
  .action(async (names: string[], opts: { all?: boolean; yes?: boolean; overwrite?: boolean }) => {
    const cwd = process.cwd();
    const config = (await readConfig(cwd)) ?? ConfigSchema.parse({});
    const registry = config.registry || DEFAULT_REGISTRY;
    const pm = await detectPackageManager(cwd);

    let itemsToResolve = names;
    if (opts.all) {
      console.log(kleur.dim(`Fetching full registry index from ${registry}…`));
      const res = await fetch(`${registry.replace(/\/$/, "")}/index.json`);
      if (!res.ok) throw new Error(`Failed to fetch index: ${res.status}`);
      const index = (await res.json()) as { items: { name: string; type?: string }[] };
      itemsToResolve = index.items.filter((item) => item.type === "registry:ui").map((i) => i.name);
    }

    if (itemsToResolve.length === 0) {
      console.log(kleur.red("No registry items specified."));
      return;
    }

    console.log(kleur.dim(`Resolving ${itemsToResolve.length} registry item(s) and dependencies…`));
    const items = await resolveAll(registry, itemsToResolve);

    console.log(kleur.cyan("\nResolved registry items:"));
    for (const item of items) {
      const deps = [...item.dependencies, ...item.registryDependencies];
      console.log(
        `  ${kleur.bold(item.name)} ${kleur.dim(`[${item.type}]`)} ${deps.length ? kleur.dim(`(requires: ${deps.join(", ")})`) : ""}`,
      );
      if (item.description) console.log(kleur.dim(`    ${item.description}`));
      if (item.description) console.log(kleur.dim(`    ${item.description}`));
      if (item.description) console.log(kleur.dim(`    ${item.description}`));
    }

    const allDeps = [...new Set(items.flatMap((i) => i.dependencies))];
    if (allDeps.length) {
      if (!opts.yes) {
        const { ok } = await prompts({
          type: "confirm",
          name: "ok",
          message: `Install ${allDeps.length} npm dep(s)?`,
          initial: true,
        });
        if (!ok) return;
      }
      await installDeps(allDeps, pm, cwd);
    }

    for (const item of items) {
      for (const f of item.files) {
        verifyRegistryIntegrity(item.name, f);
        const target = registryTarget(cwd, f, config);
        if ((await exists(target)) && !opts.overwrite) {
          console.log(
            kleur.yellow("  skip ") +
              path.relative(cwd, target) +
              kleur.dim(" (exists, use --overwrite)"),
          );
          continue;
        }
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, rewriteRegistrySource(f.content, cwd, config, target));
        console.log(kleur.green("  + ") + path.relative(cwd, target));
      }
    }
    console.log(kleur.green(`\n✓ Added ${items.length} registry item(s).`));
  });

program
  .command("list")
  .description("List every item available in the registry")
  .option("--registry <url>", "Registry URL", DEFAULT_REGISTRY)
  .action(async (opts: { registry: string }) => {
    const res = await fetch(`${opts.registry.replace(/\/$/, "")}/index.json`);
    if (!res.ok) throw new Error(`Failed to fetch registry index: ${res.status}`);
    const json = (await res.json()) as { items: { name: string; type?: string }[] };
    for (const it of json.items) {
      console.log("  " + kleur.cyan(it.name) + kleur.dim(`  ${it.type ?? "registry:item"}`));
    }
  });

program
  .command("diff <item>")
  .description("Show drift between a local registry item and the upstream version")
  .action(async (name: string) => {
    const cwd = process.cwd();
    const config = (await readConfig(cwd)) ?? ConfigSchema.parse({});
    const item = await fetchItem(config.registry, name);
    for (const f of item.files) {
      verifyRegistryIntegrity(item.name, f);
      const local = registryTarget(cwd, f, config);
      if (!(await exists(local))) {
        console.log(kleur.red("  missing ") + path.relative(cwd, local));
        continue;
      }
      const localText = await fs.readFile(local, "utf8");
      const upstream = rewriteRegistrySource(f.content, cwd, config, local);
      if (localText === upstream) {
        console.log(kleur.green("  same    ") + path.relative(cwd, local));
      } else {
        console.log(kleur.yellow("  drifted ") + path.relative(cwd, local));
      }
    }
  });

program.parseAsync().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(kleur.red(`\nNeoncite error: ${message}`));
  process.exitCode = 1;
});
