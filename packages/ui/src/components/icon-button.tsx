import * as React from "react";
import { Button, type ButtonProps } from "./button";

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  label: string;
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, size = "md", ...props }, ref) => {
    const dimensions = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
    return <Button ref={ref} size="icon" aria-label={label} className={dimensions} {...props} />;
  },
);
IconButton.displayName = "IconButton";
