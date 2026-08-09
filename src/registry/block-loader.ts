import * as React from "react";
import blocks from "./blocks.json";

export interface BlockMetadata {
  slug: string;
  source: string;
  name: string;
}

export const BLOCKS = blocks as BlockMetadata[];

const blockModules = import.meta.glob("../components/blocks/*.tsx");

export function getBlock(slug: string) {
  return BLOCKS.find((block) => block.slug === slug);
}

export function useBlockPreview(slug: string) {
  const [Preview, setPreview] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    let active = true;
    setPreview(null);
    const block = getBlock(slug);
    if (!block)
      return () => {
        active = false;
      };
    const loader = blockModules[`../components/blocks/${block.source}`];
    if (!loader)
      return () => {
        active = false;
      };

    loader().then((module) => {
      if (!active) return;
      const component = Object.values(module as Record<string, unknown>).find(
        (value): value is React.ComponentType => typeof value === "function",
      );
      if (component) setPreview(() => component);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  return Preview;
}
