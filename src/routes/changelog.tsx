import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — Neoncite/UI" },
      {
        name: "description",
        content: "Release notes and notable changes for Neoncite/UI and the Neoncite CLI.",
      },
    ],
  }),
  component: ChangelogPage,
});

const releases = [
  {
    version: "Neoncite/UI 0.3.0",
    status: "current release",
    textAccent: "neon-cyan",
    dotAccent: "bg-[color:var(--neon-cyan)]",
    summary:
      "Hardening release: dependency boundaries, centralized design tokens, opt-in motion, supply-chain integrity, unit test coverage, and stricter CI policy.",
    changes: [
      "Centralized the neon palette and glow effects into canonical design tokens; registry components no longer hardcode raw color values.",
      "Button and Badge micro-motion is now strictly opt-in via explicit motion variants, with reduced-motion behavior preserved.",
      "Registry generation embeds SHA-256 integrity digests, and the CLI verifies each digest before writing files.",
      "Added Vitest + React Testing Library coverage for Button, Input, Dialog, Select, Command, Sonner, Data Table, and Form foundations.",
      "Enabled stricter TypeScript flags (noUnusedLocals, noUnusedParameters, verbatimModuleSyntax) across source and tests.",
      "Enforced a core bundle size budget in CI and kept framer-motion and chart peers optional for tree-shaking.",
      "Added Renovate weekly updates, CODEOWNERS, structured issue templates, a pull request checklist, accessibility guidance docs, and Theme Builder compatibility documentation.",
    ],
  },
  {
    version: "Neoncite/UI 0.2.0",
    status: "previous release",
    textAccent: "neon-pink",
    dotAccent: "bg-[color:var(--neon-pink)]",
    summary: "Complete Neoncite/UI component, Block, theme, CLI, and package system.",
    changes: [
      "Expanded the canonical registry to 84 UI components, including the Neoncite Signature family for technical products.",
      "Published 18 application-grade Blocks and five installable dark themes.",
      "Published neoncite@0.2.0 and @neoncite/ui@0.2.0 to npm with root and component subpath exports.",
      "CLI init, add, list, and diff workflows now resolve registry dependencies and rewrite internal imports for consuming projects.",
      "Documentation now covers live previews, installation, APIs, states, accessibility, keyboard behavior, tokens, SSR, RTL, and canonical source.",
      "Read-only CI validates registry integrity, generated parity, TypeScript, tests, builds, clean-room installation, accessibility, and visual regression before Cloudflare deployment.",
    ],
  },
  {
    version: "0.1.0",
    status: "public preview",
    textAccent: "neon-cyan",
    dotAccent: "bg-[color:var(--neon-cyan)]",
    summary: "Initial Neoncite/UI component and registry preview.",
    changes: [
      "Introduced the dark-only OLED surface system and nine-color neon token palette.",
      "Published the initial source-first component registry and Neoncite CLI workflow.",
      "Added the component showcase, Blocks gallery, Theme Builder, and core documentation routes.",
    ],
  },
];

function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[900px] px-4 py-16 md:px-8 md:py-24">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest neon-pink">Project</p>
        <h1 className="font-mono text-[40px] font-bold tracking-tighter neon-white md:text-[52px]">
          Changelog
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Published Neoncite/UI releases and their coordinated CLI, package, registry, and
          documentation changes.
        </p>

        <div className="mt-12 space-y-8">
          {releases.map((release) => (
            <section
              key={release.version}
              className="rounded-[16px] border border-[color:var(--hairline)] bg-gradient-to-b from-[color:var(--surface-2)] to-[color:var(--surface-1)] p-6 shadow-[var(--rim-light-shadow)]"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-mono text-[20px] font-bold neon-white">{release.version}</h2>
                <span
                  className={`rounded-full border border-[color:var(--hairline)] bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${release.textAccent}`}
                >
                  {release.status}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                {release.summary}
              </p>
              <ul className="mt-5 space-y-3">
                {release.changes.map((change) => (
                  <li
                    key={change}
                    className="flex gap-3 text-[13px] leading-relaxed text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${release.dotAccent}`}
                    />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
