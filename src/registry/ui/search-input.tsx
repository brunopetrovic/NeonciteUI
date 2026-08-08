import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> { onClear?: () => void; }
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({ className, value, defaultValue, onClear, ...props }, ref) => {
  const hasValue = value !== undefined ? String(value).length > 0 : defaultValue !== undefined ? String(defaultValue).length > 0 : false;
  return <div className={cn("flex h-10 items-center rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] px-3 shadow-[var(--recessed-shadow)] focus-within:border-[color:var(--ring)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_18px_color-mix(in_srgb,var(--ring)_20%,transparent)]", className)}><Search className="h-4 w-4 shrink-0 text-[color:var(--neon-cyan)]" /><input ref={ref} type="search" value={value} defaultValue={defaultValue} className="h-full min-w-0 flex-1 bg-transparent px-2 text-[13px] text-foreground outline-none placeholder:text-muted-foreground" {...props} />{hasValue && onClear && <button type="button" onClick={onClear} aria-label="Clear search" className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}</div>;
});
SearchInput.displayName = "SearchInput";
