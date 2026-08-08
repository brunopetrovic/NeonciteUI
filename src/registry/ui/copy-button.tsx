"use client";
import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button, type ButtonProps } from "@/registry/ui/button";

export interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  value: string;
  copiedLabel?: string;
  idleLabel?: string;
  resetAfter?: number;
  onCopied?: () => void;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      copiedLabel = "Copied",
      idleLabel = "Copy",
      resetAfter = 1600,
      onCopied,
      children,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);
    async function copy() {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), resetAfter);
    }
    return (
      <Button ref={ref} type="button" variant="outline" size="sm" onClick={copy} {...props}>
        {children ?? (
          <>
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[color:var(--neon-green)]" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? copiedLabel : idleLabel}
          </>
        )}
      </Button>
    );
  },
);
CopyButton.displayName = "CopyButton";
