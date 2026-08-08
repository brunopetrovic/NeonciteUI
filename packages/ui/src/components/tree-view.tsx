"use client";
import * as React from "react";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { cn } from "../lib/utils";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  children?: TreeNode[];
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  nodes: TreeNode[];
  selectedId?: string;
  defaultExpanded?: string[];
  onSelect?: (node: TreeNode) => void;
}

export function TreeView({
  nodes,
  selectedId,
  defaultExpanded = [],
  onSelect,
  className,
  ...props
}: TreeViewProps) {
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded));

  const renderNode = (node: TreeNode, depth: number): React.ReactNode => {
    const open = expanded.has(node.id);
    const hasChildren = Boolean(node.children?.length);

    return (
      <div key={node.id} role="treeitem" aria-expanded={hasChildren ? open : undefined}>
        <button
          type="button"
          disabled={node.disabled}
          onClick={() => {
            if (hasChildren) {
              setExpanded((current) => {
                const next = new Set(current);
                if (next.has(node.id)) next.delete(node.id);
                else next.add(node.id);
                return next;
              });
            }
            onSelect?.(node);
          }}
          className={cn(
            "flex h-8 w-full items-center gap-1.5 rounded-[8px] pr-2 text-left text-[12px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] disabled:opacity-40",
            selectedId === node.id && "bg-[color:var(--primary)]/10 text-[color:var(--primary)]",
          )}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
        >
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 transition-transform",
              open && "rotate-90",
              !hasChildren && "opacity-0",
            )}
          />
          {node.icon ??
            (hasChildren ? (
              open ? (
                <FolderOpen className="h-3.5 w-3.5 text-[color:var(--neon-cyan)]" />
              ) : (
                <Folder className="h-3.5 w-3.5 text-[color:var(--neon-cyan)]" />
              )
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            ))}
          <span className="truncate">{node.label}</span>
        </button>
        {open && node.children?.length ? (
          <div role="group">{node.children.map((child) => renderNode(child, depth + 1))}</div>
        ) : null}
      </div>
    );
  };

  return (
    <div role="tree" className={cn("font-mono", className)} {...props}>
      {nodes.map((node) => renderNode(node, 0))}
    </div>
  );
}
