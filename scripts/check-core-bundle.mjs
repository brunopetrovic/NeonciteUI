import path from "node:path";
import { gzipSync } from "node:zlib";
import { build } from "esbuild";

const ROOT = process.cwd();
// Core budget: Button + Input + cn utilities must stay below 20 KiB gzipped,
// excluding framework/peer packages that consumers already provide.
const MAX_GZIP_BYTES = 20 * 1024;

const result = await build({
  stdin: {
    contents: [
      'export * from "@/registry/ui/button";',
      'export * from "@/registry/ui/input";',
      'export * from "@/lib/utils";',
    ].join("\n"),
    resolveDir: ROOT,
    sourcefile: "neoncite-core-entry.ts",
  },
  absWorkingDir: ROOT,
  alias: { "@": path.join(ROOT, "src") },
  bundle: true,
  format: "esm",
  minify: true,
  treeShaking: true,
  write: false,
  external: [
    "react",
    "react-dom",
    "@radix-ui/react-slot",
    "class-variance-authority",
    "framer-motion",
    "clsx",
    "tailwind-merge",
  ],
});

const bytes = result.outputFiles.reduce(
  (total, file) => total + gzipSync(file.contents).byteLength,
  0,
);
const kib = (bytes / 1024).toFixed(2);
console.log(`[bundle] core Button + Input + utils: ${kib} KiB gzipped (budget 20.00 KiB)`);
if (bytes > MAX_GZIP_BYTES) {
  throw new Error(`Core bundle budget exceeded: ${kib} KiB gzipped > 20.00 KiB`);
}
