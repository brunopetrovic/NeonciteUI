"use client";
import { Toaster as SonnerToaster, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[color:var(--surface-2)] group-[.toaster]:text-foreground group-[.toaster]:border-[color:var(--hairline)] group-[.toaster]:shadow-[var(--shadow-floating)] group-[.toaster]:rounded-[12px] font-mono",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-[12px]",
          actionButton:
            "group-[.toast]:bg-[color:var(--neon-pink)] group-[.toast]:text-[color:var(--surface-0)] group-[.toast]:rounded-[8px] group-[.toast]:font-mono group-[.toast]:text-[11px] group-[.toast]:uppercase group-[.toast]:tracking-wider group-[.toast]:shadow-[var(--glow-pink)]",
          cancelButton:
            "group-[.toast]:bg-[color:var(--surface-3)] group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[var(--neon-green)]",
          error: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[var(--neon-red)]",
          warning: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[var(--neon-yellow)]",
          info: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[var(--neon-cyan)]",
        },
      }}
      {...props}
    />
  );
}

export { toast };
