#!/usr/bin/env node
// Neoncite CLI — fetches components from the public registry and writes them
// into the user's project. Compatible with the shadcn-style registry-item schema.

import { Command } from "commander";
import prompts from "prompts";
import kleur from "kleur";
import { execa } from "execa";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const DEFAULT_REGISTRY = "https://ground-steeple-tq7q.here.now/public/r";

const RegistryFile = z.object({
  path: z.string(),
  content: z.string(),
  type: z.string().optional(),
  target: z.string().optional(),
});
const RegistryItem = z.object({
  name: z.string(),
  type: z.string(),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(RegistryFile),
});
type TRegistryItem = z.infer<typeof RegistryItem>;

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
program.name("neoncite").description("Neoncite UI design system CLI").version("0.1.0");

// ---------- helpers ----------
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
  if (await exists(path.join(cwd, "bun.lockb"))) return "bun";
  if (await exists(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (await exists(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}
async function exists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
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
  const cmd =
    pm === "npm" ? ["install", ...deps] : pm === "yarn" ? ["add", ...deps] : ["add", ...deps];
  console.log(kleur.dim(`  ${pm} ${cmd.join(" ")}`));
  await execa(pm, cmd, { cwd, stdio: "inherit" });
}

// ---------- commands ----------
program
  .command("init")
  .description("Initialize Neoncite in this project")
  .option("--registry <url>", "Registry URL", DEFAULT_REGISTRY)
  .action(async (opts: { registry: string }) => {
    const cwd = process.cwd();
    if (await readConfig(cwd)) {
      console.log(kleur.yellow("neoncite.json already exists."));
      return;
    }
    const answers = await prompts([
      { type: "text", name: "components", message: "Components alias", initial: "@/components" },
      { type: "text", name: "utils", message: "Utils alias", initial: "@/lib/utils" },
    ]);
    const config = {
      $schema: "https://ground-steeple-tq7q.here.now/public/r/schema.json",
      style: "neoncite",
      registry: opts.registry,
      aliases: { components: answers.components, utils: answers.utils },
    };
    await fs.writeFile(path.join(cwd, "neoncite.json"), JSON.stringify(config, null, 2));
    console.log(kleur.green("✓ ") + "Wrote neoncite.json");
    console.log(kleur.dim("  Next: ") + kleur.cyan("neoncite add button"));
  });
program
  .command("add [components...]")
  .description("Add one or more components from the Neoncite registry")
  .option("-a, --all", "Add all components from the registry")
  .option("-y, --yes", "Skip confirmation prompts")
  .option("-o, --overwrite", "Overwrite existing files")
  .action(async (names: string[], opts: { all?: boolean; yes?: boolean; overwrite?: boolean }) => {
    const cwd = process.cwd();
    const config = (await readConfig(cwd)) ?? ConfigSchema.parse({});
    const registry = config.registry || DEFAULT_REGISTRY;
    const pm = await detectPackageManager(cwd);

    let componentsToResolve = names;
    if (opts.all) {
      console.log(kleur.dim(`Fetching full registry index from ${registry}…`));
      const res = await fetch(`${registry.replace(/\/$/, "")}/index.json`);
      if (!res.ok) throw new Error(`Failed to fetch index: ${res.status}`);
      const index = await res.json();
      componentsToResolve = index.items.map((i: { name: string }) => i.name);
    }

    if (componentsToResolve.length === 0) {
      console.log(kleur.red("No components specified."));
      return;
    }

    console.log(
      kleur.dim(`Resolving ${componentsToResolve.length} component(s) and dependencies…`),
    );
    const items = await resolveAll(registry, componentsToResolve);

    console.log(kleur.cyan("\nResolved components:"));
    for (const item of items) {
      const deps = [...item.dependencies, ...item.registryDependencies];
      console.log(
        `  ${kleur.bold(item.name)} ${deps.length ? kleur.dim(`(requires: ${deps.join(", ")})`) : ""}`,
      );
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
        const target = path.join(cwd, f.path);
        if ((await exists(target)) && !opts.overwrite) {
          console.log(
            kleur.yellow("  skip ") +
              path.relative(cwd, target) +
              kleur.dim(" (exists, use --overwrite)"),
          );
          continue;
        }
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, f.content);
        console.log(kleur.green("  + ") + path.relative(cwd, target));
      }
    }
    console.log(kleur.green(`\n✓ Added ${items.length} component(s).`));
  });

program
  .command("list")
  .description("List every component available in the registry")
  .option("--registry <url>", "Registry URL", DEFAULT_REGISTRY)
  .action(async (opts: { registry: string }) => {
    const res = await fetch(`${opts.registry.replace(/\/$/, "")}/index.json`);
    const json = (await res.json()) as { items: { name: string }[] };
    for (const it of json.items) console.log("  " + kleur.cyan(it.name));
  });

program
  .command("diff <component>")
  .description("Show drift between local copy and the registry version")
  .action(async (name: string) => {
    const cwd = process.cwd();
    const config = (await readConfig(cwd)) ?? ConfigSchema.parse({});
    const item = await fetchItem(config.registry, name);
    for (const f of item.files) {
      const local = path.join(cwd, f.path);
      if (!(await exists(local))) {
        console.log(kleur.red("  missing ") + f.path);
        continue;
      }
      const localText = await fs.readFile(local, "utf8");
      if (localText === f.content) console.log(kleur.green("  same    ") + f.path);
      else console.log(kleur.yellow("  drifted ") + f.path);
    }
  });

program.parse();
