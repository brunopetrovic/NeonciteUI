import { Link } from "@tanstack/react-router";
import { Hexagon, Github, Menu, X } from "lucide-react";
import { CommandPaletteTrigger } from "@/components/site/CommandPalette";
import * as React from "react";

const nav = [
  { to: "/docs/installation", label: "Docs" },
  { to: "/components", label: "Components" },
  { to: "/blocks", label: "Blocks" },
  { to: "/themes", label: "Themes" },
  { to: "/changelog", label: "Changelog" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("theme-light");
      localStorage.removeItem("neoncite-theme");
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[color:var(--hairline)] bg-[color:var(--surface-0)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-[10px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_16px_rgba(255,42,157,0.25)] transition-all group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_0_24px_rgba(255,42,157,0.5)]">
              <Hexagon size={16} className="neon-pink" strokeWidth={2.5} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[14px] font-bold tracking-tight neon-white">
                neoncite
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:inline">
                /ui
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                activeProps={{
                  className:
                    "px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-foreground bg-white/[0.06] border border-[color:var(--hairline)]",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPaletteTrigger />
            <a
              href="https://github.com/brunopetrovic/NeonciteUI"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-[10px] border border-transparent text-muted-foreground hover:text-foreground hover:border-[color:var(--hairline)] hover:bg-white/5 transition-colors"
              aria-label="GitHub"
            >
              <Github size={15} strokeWidth={2} />
            </a>
            <Link
              to="/docs/installation"
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3.5 rounded-[10px] text-[12px] font-mono font-semibold uppercase tracking-wider bg-[color:var(--neon-pink)] text-white shadow-[0_0_24px_rgba(255,42,157,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_32px_rgba(255,42,157,0.6)] transition-all"
            >
              Install
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-[10px] border border-transparent text-muted-foreground hover:text-foreground hover:border-[color:var(--hairline)] hover:bg-white/5 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute inset-y-0 left-0 w-[280px] bg-[color:var(--surface-0)] border-r border-[color:var(--hairline)] shadow-[4px_0_24px_rgba(0,0,0,0.6)] animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between h-14 px-4 border-b border-[color:var(--hairline)]">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/5">
                  <Hexagon size={14} className="neon-pink" strokeWidth={2.5} />
                </div>
                <span className="font-mono text-[13px] font-bold neon-white">neoncite/ui</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-[8px] text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-col gap-0.5 p-3">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-[10px] text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                  activeProps={{
                    className:
                      "px-3 py-2.5 rounded-[10px] text-[14px] font-medium text-foreground bg-white/[0.06] border border-[color:var(--hairline)]",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-[color:var(--hairline)] p-3 space-y-2">
              <Link
                to="/docs/installation"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-9 rounded-[10px] text-[12px] font-mono font-semibold uppercase tracking-wider bg-[color:var(--neon-pink)] text-white shadow-[0_0_24px_rgba(255,42,157,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]"
              >
                Install
              </Link>
              <a
                href="https://github.com/brunopetrovic/NeonciteUI"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 h-9 rounded-[10px] text-[12px] font-mono uppercase tracking-wider text-muted-foreground border border-[color:var(--hairline)] hover:bg-white/5 transition-colors"
              >
                <Github size={14} /> GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
