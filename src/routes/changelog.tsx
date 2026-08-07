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
    version: "CLI 0.2.0",
    status: "release candidate",
    accent: "neon-pink",
    summary: "Production-readiness foundation for installation, registry integrity, and trust.",
    changes: [
      "`init -y` now bootstraps Neoncite configuration, cn(), utility dependencies, and the Tailwind v4 theme layer.",
      "Component installation rewrites internal registry imports to the consuming project's configured aliases.",
      "Registry dependency declarations are validated automatically across every registered component.",
      "Generated registry and @neoncite/ui package artifacts are checked for drift from canonical source.",
      "Toggle now uses pressed/unpressed action semantics instead of duplicating Switch behavior, with temporary migration aliases.",
      "CI validates registry integrity, generated parity, lint, TypeScript, tests, site build, CLI build, and UI-package build.",
    ],
  },
  {
    version: "0.1.0",
    status: "public preview",
    accent: "neon-cyan",
    summary: "Initial pre-1.0 Neoncite/UI component and registry preview.",
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
          Release notes for Neoncite/UI. Until stable 1.0, entries distinguish shipped public-preview
          work from release candidates so the site never implies a package has been published before
          it actually has.
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
                  className={`rounded-full border border-[color:var(--hairline)] bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${release.accent}`}
                >
                  {release.status}
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                {release.summary}
              </p>
              <ul className="mt-5 space-y-3">
                {release.changes.map((change) => (
                  <li key={change} className="flex gap-3 text-[13px] leading-relaxed text-foreground">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${release.accent}`} />
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
