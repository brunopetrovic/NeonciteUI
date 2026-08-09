import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const Spinner = React.forwardRef<SVGSVGElement, React.ComponentProps<typeof LoaderCircle>>(
  ({ className, ...props }, ref) => (
    <LoaderCircle
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        "h-4 w-4 animate-spin text-[color:var(--primary)] motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  ),
);
Spinner.displayName = "Spinner";
