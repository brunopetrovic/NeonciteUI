import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-[16px] border border-dashed border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-8 text-center",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      {icon && (
        <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[color:var(--primary)]/30 bg-[color:var(--primary)]/5 text-[color:var(--primary)] shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_18%,transparent)]">
          {icon}
        </div>
      )}
      <h3 className="relative font-mono text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      {description && (
        <p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="relative mt-5">{action}</div>}
    </div>
  );
}
