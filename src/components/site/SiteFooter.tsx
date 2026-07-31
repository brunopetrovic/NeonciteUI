import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--hairline)] bg-[color:var(--surface-1)] mt-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[color:var(--neon-pink)] animate-pulse-glow">●</span>
            <span className="font-mono text-[14px] font-bold neon-white">neoncite/ui</span>
          </div>
          <p className="text-[13px] text-muted-foreground max-w-md leading-relaxed">
            A premium machined UI design system. OLED blacks, hardware rim lighting, vibrant neon
            accents. Open source, copy-paste, your code.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
            Resources
          </h4>
          <ul className="space-y-2 text-[13px]">
            <li>
              <Link
                to="/docs/installation"
                className="text-foreground hover:neon-cyan transition-colors"
              >
                Installation
              </Link>
            </li>
            <li>
              <Link
                to="/docs/theming"
                className="text-foreground hover:neon-cyan transition-colors"
              >
                Theming
              </Link>
            </li>
            <li>
              <Link to="/components" className="text-foreground hover:neon-cyan transition-colors">
                Components
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
            Community
          </h4>
          <ul className="space-y-2 text-[13px]">
            <li>
              <a
                href="https://github.com/brunopetrovic/NeonciteUI"
                target="_blank"
                rel="noreferrer"
                className="text-foreground hover:neon-cyan transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <Link to="/changelog" className="text-foreground hover:neon-cyan transition-colors">
                Changelog
              </Link>
            </li>
            <li>
              <Link to="/blocks" className="text-foreground hover:neon-cyan transition-colors">
                Blocks
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--hairline)]/60 py-4 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Built By <span className="neon-pink">●</span>{" "}
        <a
          href="https://thorus.ai"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:neon-pink transition-colors underline decoration-dotted underline-offset-4"
        >
          Thorus
        </a>
      </div>
    </footer>
  );
}
