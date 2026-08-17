"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useNavigate } from "@tanstack/react-router";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/ui/command";
import { REGISTRY } from "@/registry";
import { BookOpen, Layers, Palette, Sparkles, Terminal, Home, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const PaletteCtx = React.createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = React.useContext(PaletteCtx);
  if (!ctx) throw new Error("useCommandPalette must be used within <CommandPaletteProvider>");
  return ctx;
}

const PAGES = [
  { to: "/", label: "Home", icon: Home },
  { to: "/components", label: "Components", icon: Layers },
  { to: "/blocks", label: "Blocks", icon: Sparkles },
  { to: "/themes", label: "Themes", icon: Palette },
  { to: "/docs/installation", label: "Installation", icon: BookOpen },
  { to: "/docs/cli", label: "CLI", icon: Terminal },
  { to: "/docs/theming", label: "Theming", icon: Palette },
  { to: "/docs/motion", label: "Motion Lab", icon: Sparkles },
] as const;

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = React.useCallback(
    (to: string, params?: Record<string, string>) => {
      setOpen(false);
      navigate({ to, params } as never);
    },
    [navigate],
  );

  return (
    <PaletteCtx.Provider value={{ open, setOpen }}>
      {children}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            )}
          />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-1/2 top-[20%] z-50 w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2",
              "rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)]",
              "shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,42,157,0.15),0_0_64px_rgba(255,42,157,0.12)]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            )}
          >
            <DialogPrimitive.Title className="sr-only">Command palette</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Search components, pages, and documentation.
            </DialogPrimitive.Description>
            <Command className="border-0 bg-transparent">
              <CommandInput placeholder="Search components, pages, docs…" />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup heading="Pages">
                  {PAGES.map((p) => (
                    <CommandItem key={p.to} value={`page ${p.label}`} onSelect={() => go(p.to)}>
                      <p.icon size={14} className="text-muted-foreground" />
                      {p.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Components">
                  {REGISTRY.map((item) => (
                    <CommandItem
                      key={item.slug}
                      value={`component ${item.name} ${item.description}`}
                      onSelect={() => go("/components/$slug", { slug: item.slug })}
                    >
                      <item.icon size={14} className={item.accent} strokeWidth={2.5} />
                      {item.name}
                      <CommandShortcut>{item.category}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              <div className="flex items-center justify-between border-t border-[color:var(--hairline)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>Neoncite/UI</span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-[color:var(--hairline)] bg-[color:var(--surface-3)] px-1.5 py-0.5">
                    ↵
                  </kbd>
                  to open
                </span>
              </div>
            </Command>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </PaletteCtx.Provider>
  );
}

export function CommandPaletteTrigger({ className }: { className?: string }) {
  const { setOpen } = useCommandPalette();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group inline-flex h-8 items-center gap-2 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)]/60 px-2.5 text-muted-foreground hover:text-foreground hover:border-white/10 transition-colors",
        className,
      )}
      aria-label="Open command palette"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">
        Search
      </span>
      <kbd className="hidden sm:inline-flex items-center rounded border border-[color:var(--hairline)] bg-[color:var(--surface-3)] px-1.5 py-0.5 font-mono text-[10px] tracking-widest">
        ⌘K
      </kbd>
    </button>
  );
}
