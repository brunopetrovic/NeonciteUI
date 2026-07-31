import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion";

export function FaqFolded() {
  const faqs = [
    {
      id: "q1",
      q: "Is Anthracite/UI free?",
      a: "Yes. MIT licensed for the components and CLI. Pro blocks and Figma kit are paid.",
    },
    {
      id: "q2",
      q: "Does it work with Next, Remix, TanStack?",
      a: "Anywhere React renders. The registry writes plain TSX into your project — framework-agnostic.",
    },
    {
      id: "q3",
      q: "Can I theme it?",
      a: "Yes — every visual decision is a CSS variable. Three themes ship by default; rolling your own is a single token block.",
    },
    {
      id: "q4",
      q: "How is this different from shadcn/ui?",
      a: "Same registry pattern, very different aesthetic. Anthracite is opinionated about dark, neon, and machined surfaces.",
    },
  ];

  return (
    <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] px-6">
      <Accordion type="single" collapsible defaultValue="q1">
        {faqs.map((f) => (
          <AccordionItem key={f.id} value={f.id}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
