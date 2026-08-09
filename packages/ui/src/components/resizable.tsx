"use client";
import * as React from "react";
import { Group, Panel, Separator, type GroupImperativeHandle } from "react-resizable-panels";
import { GripVertical } from "lucide-react";
import { cn } from "../lib/utils";

export const ResizablePanelGroup = React.forwardRef<
  GroupImperativeHandle,
  React.ComponentProps<typeof Group>
>(({ className, ...props }, ref) => (
  <Group
    {...props}
    className={cn("flex h-full w-full data-[orientation=vertical]:flex-col", className)}
    groupRef={ref}
  />
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

export const ResizablePanel = Panel;

export const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Separator> & { withHandle?: boolean }
>(({ className, withHandle, ...props }, ref) => (
  <Separator
    {...props}
    elementRef={ref}
    className={cn(
      "relative flex w-px items-center justify-center bg-[color:var(--hairline)] outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[color:var(--ring)] data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full [&[data-orientation=vertical]>div]:rotate-90",
      "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 hover:bg-[color:var(--primary)]/50",
      className,
    )}
  >
    {withHandle && (
      <div className="z-10 flex h-5 w-4 items-center justify-center rounded-[5px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] shadow-[var(--rim-light-shadow)]">
        <GripVertical className="h-3 w-3 text-muted-foreground" />
      </div>
    )}
  </Separator>
));
ResizableHandle.displayName = "ResizableHandle";
