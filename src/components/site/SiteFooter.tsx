import { Link } from "@tanstack/react-router";
import { PUBLIC_VERSION } from "@/lib/release-status";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[color:var(--hairline)] bg-[color:var(--surface-1)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <span aria-hidden="true" className="animate-pulse-glow text-[color:var(--neon-pink)]">
              ●
            </span>
            <span className="font-mono text-[14px] font-bold neon-white">neoncite/ui</span>
          </div>
          <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
            A dark-only machined React component system with OLED surfaces, hardware rim lighting,
            and neon accents. Open source, source-first, and built for technical products.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            v{PUBLIC_VERSION} · Current public release
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Resources
          </h4>
          <ul className="space-y-2 text-[13px]">
            <li>
              <Link to="/docs" className="text-foreground transition-colors hover:neon-cyan">
                Documentation
              </Link>
            </li>
            <li>
              <Link
                to="/docs/installation"
                className="text-foreground transition-colors hover:neon-cyan"
              >
                Installation
              </Link>
            </li>
            <li>
              <Link to="/components" className="text-foreground transition-colors hover:neon-cyan">
                Components
              </Link>
            </li>
            <li>
              <Link to="/themes" className="text-foreground transition-colors hover:neon-cyan">
                Themes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Project
          </h4>
          <ul className="space-y-2 text-[13px]">
            <li>
              <Link to="/blocks" className="text-foreground transition-colors hover:neon-cyan">
                Blocks
              </Link>
            </li>
            <li>
              <Link to="/changelog" className="text-foreground transition-colors hover:neon-cyan">
                Changelog
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/brunopetrovic/NeonciteUI"
                target="_blank"
                rel="noreferrer"
                className="text-foreground transition-colors hover:neon-cyan"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--hairline)]/60 py-4 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Built by <span className="neon-pink">●</span>{" "}
        <a
          href="https://thorus.ai"
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline decoration-dotted underline-offset-4 transition-colors hover:neon-pink"
        >
          Thorus
        </a>
      </div>
    </footer>
  );
}
