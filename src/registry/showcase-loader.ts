import * as React from "react";
import extraItems from "./items-extra.json";
import type { Showcase } from "./showcases";

const showcaseModules = import.meta.glob("./showcases/*.tsx");
const phase2Slugs = new Set(extraItems.map((item) => item.slug));

type ShowcaseModule = {
  usage: string;
  preview: React.ReactNode;
  variations?: { name: string; preview: React.ReactNode; usage: string }[];
};

function normalize(showcase: ShowcaseModule, slug: string): Showcase {
  return {
    usage: showcase.usage,
    preview: showcase.preview,
    variations: showcase.variations,
    source: `// canonical source at src/registry/ui/${slug}.tsx`,
  };
}

async function loadShowcase(slug: string): Promise<Showcase | null> {
  if (phase2Slugs.has(slug)) {
    const module = await import("./showcases/phase2");
    const showcase = module.PHASE2_SHOWCASES[slug];
    return showcase ? normalize(showcase, slug) : null;
  }

  const loader = showcaseModules[`./showcases/${slug}.tsx`];
  if (!loader) return null;
  const module = (await loader()) as ShowcaseModule;
  return normalize(module, slug);
}

export function useComponentShowcase(slug: string) {
  const [showcase, setShowcase] = React.useState<Showcase | null>(null);

  React.useEffect(() => {
    let active = true;
    setShowcase(null);
    loadShowcase(slug).then((value) => {
      if (active) setShowcase(value);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  return showcase;
}
