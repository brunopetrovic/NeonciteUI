import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — Neoncite/UI" },
      {
        name: "description",
        content:
          "Accessibility constraints and support guidance for Neoncite/UI's dark-only component system.",
      },
    ],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <article className="max-w-3xl space-y-10 pb-16">
      <header>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[color:var(--neon-green)]">
          Foundations
        </p>
        <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Accessibility
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          Neoncite/UI targets keyboard, focus, naming, contrast, reduced-motion, and semantic
          accessibility while preserving an intentionally dark visual system.
        </p>
      </header>

      <section className="rounded-[14px] border border-[color:var(--neon-yellow)]/40 bg-[color:var(--neon-yellow)]/5 p-5">
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[color:var(--neon-yellow)]">
          Dark-only constraint
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          Neoncite/UI is intentionally dark-mode only. It does not support light mode. Projects with
          accessibility requirements for light interfaces or high-contrast modes should evaluate
          whether this constraint is compatible with their needs. prefers-contrast: more is
          partially supported through increased glow intensity.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          In the current token implementation, high-contrast preference strengthens hairlines and
          muted text while reducing non-essential glows to limit visual noise. The sentence above is
          retained verbatim as the public compatibility notice requested for the project.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-xl font-semibold text-foreground">Interaction baseline</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            • Interactive controls must expose an accessible name, including icon-only buttons.
          </li>
          <li>• Focus-visible indication must remain perceptible on OLED-black surfaces.</li>
          <li>• Radix-backed composites preserve their documented keyboard and focus behavior.</li>
          <li>• Non-essential animation respects prefers-reduced-motion.</li>
          <li>• Neon accents used as body-size text are checked against the OLED-black surface.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-mono text-xl font-semibold text-foreground">Contrast preferences</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Under prefers-contrast: more, the token layer raises hairline visibility to approximately
          40%, increases muted-text contrast, and suppresses decorative glow shadows. This is
          partial high-contrast support rather than a promise of a separate high-contrast theme.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-xl font-semibold text-foreground">Testing</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The repository combines React Testing Library behavior tests with Playwright and axe
          checks. Automated checks supplement manual keyboard, screen-reader, zoom, forced-colors,
          and platform accessibility testing; they do not replace it.
        </p>
      </section>
    </article>
  );
}
