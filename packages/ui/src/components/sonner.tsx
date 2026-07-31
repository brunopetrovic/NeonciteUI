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
            "group toast group-[.toaster]:bg-[color:var(--surface-2)] group-[.toaster]:text-foreground group-[.toaster]:border-[color:var(--hairline)] group-[.toaster]:shadow-[0_24px_48px_rgba(0,0,0,0.6)] group-[.toaster]:rounded-[12px] font-mono",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-[12px]",
          actionButton:
            "group-[.toast]:bg-[color:var(--neon-pink)] group-[.toast]:text-white group-[.toast]:rounded-[8px] group-[.toast]:font-mono group-[.toast]:text-[11px] group-[.toast]:uppercase group-[.toast]:tracking-wider group-[.toast]:shadow-[0_0_16px_rgba(255,42,157,0.5)]",
          cancelButton:
            "group-[.toast]:bg-[color:var(--surface-3)] group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[#00ff66]",
          error: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[#ff3355]",
          warning: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[#ffd400]",
          info: "group-[.toaster]:border-l-2 group-[.toaster]:border-l-[#00f0ff]",
        },
      }}
      {...props}
    />
  );
}

export { toast };
