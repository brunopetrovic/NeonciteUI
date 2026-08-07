import { Link } from "@tanstack/react-router";
import { Github, Hexagon, Menu } from "lucide-react";
import { CommandPaletteTrigger } from "@/components/site/CommandPalette";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";

const nav = [
  { to: "/docs", label: "Docs" },
  { to: "/components", label: "Components" },
  { to: "/blocks", label: "Blocks" },
  { to: "/themes", label: "Themes" },
  { to: "/changelog", label: "Changelog" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[color:var(--hairline)] bg-[color:var(--surface-0)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-[10px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_16px_rgba(255,42,157,0.25)] transition-all group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_0_24px_rgba(255,42,157,0.5)]">
            <Hexagon size={16} className="neon-pink" strokeWidth={2.5} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[14px] font-bold tracking-tight neon-white">neoncite</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
              /ui
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-[10px] px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              activeProps={{
                className:
                  "rounded-[10px] border border-[color:var(--hairline)] bg-white/[0.06] px-3 py-1.5 text-[13px] font-medium text-foreground",
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
            className="hidden h-8 w-8 items-center justify-center rounded-[10px] border border-transparent text-muted-foreground transition-colors hover:border-[color:var(--hairline)] hover:bg-white/5 hover:text-foreground sm:flex"
            aria-label="Open NeonciteUI on GitHub"
          >
            <Github size={15} strokeWidth={2} />
          </a>
          <Link
            to="/docs/installation"
            className="hidden h-8 items-center gap-1.5 rounded-[10px] bg-[color:var(--neon-pink)] px-3.5 font-mono text-[12px] font-semibold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(255,42,157,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_32px_rgba(255,42,157,0.6)] sm:inline-flex"
          >
            Install
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-transparent text-muted-foreground transition-colors hover:border-[color:var(--hairline)] hover:bg-white/5 hover:text-foreground md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu size={18} strokeWidth={2} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] bg-[color:var(--surface-0)] p-0 sm:max-w-[320px]"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate Neoncite documentation, components, Blocks, themes, and project updates.
              </SheetDescription>

              <div className="flex h-14 items-center border-b border-[color:var(--hairline)] px-4">
                <SheetClose asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/5">
                      <Hexagon size={14} className="neon-pink" strokeWidth={2.5} />
                    </div>
                    <span className="font-mono text-[13px] font-bold neon-white">neoncite/ui</span>
                  </Link>
                </SheetClose>
              </div>

              <nav className="flex flex-col gap-0.5 p-3" aria-label="Mobile navigation">
                {nav.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      className="rounded-[10px] px-3 py-2.5 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                      activeProps={{
                        className:
                          "rounded-[10px] border border-[color:var(--hairline)] bg-white/[0.06] px-3 py-2.5 text-[14px] font-medium text-foreground",
                      }}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="space-y-2 border-t border-[color:var(--hairline)] p-3">
                <SheetClose asChild>
                  <Link
                    to="/docs/installation"
                    className="flex h-9 items-center justify-center rounded-[10px] bg-[color:var(--neon-pink)] font-mono text-[12px] font-semibold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(255,42,157,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                  >
                    Install
                  </Link>
                </SheetClose>
                <a
                  href="https://github.com/brunopetrovic/NeonciteUI"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 items-center justify-center gap-2 rounded-[10px] border border-[color:var(--hairline)] font-mono text-[12px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <Github size={14} /> GitHub
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
