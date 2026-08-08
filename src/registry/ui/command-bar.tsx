import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Kbd } from "@/registry/ui/kbd";

export interface CommandBarProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { shortcut?: React.ReactNode; }
export const CommandBar = React.forwardRef<HTMLButtonElement, CommandBarProps>(({ className, children = "Search commands…", shortcut = <><Kbd>⌘</Kbd><Kbd>K</Kbd></>, ...props }, ref) => (
  <button ref={ref} type="button" className={cn("flex h-10 w-full items-center gap-2 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] px-3 text-left text-sm text-muted-foreground shadow-[var(--recessed-shadow)] transition-all hover:border-white/15 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]", className)} {...props}>
    <Search className="h-4 w-4 text-[color:var(--neon-cyan)]" /><span className="min-w-0 flex-1 truncate">{children}</span><span className="flex items-center gap-1">{shortcut}</span>
  </button>
));
CommandBar.displayName = "CommandBar";
