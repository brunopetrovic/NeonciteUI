import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion";

export const usage = `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/neoncite/accordion"

export function Demo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes — built on Radix.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`;

export const preview = (
  <Accordion type="single" collapsible defaultValue="a" className="w-[320px]">
    <AccordionItem value="a">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes — built on Radix primitives.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="b">
      <AccordionTrigger>Is it themeable?</AccordionTrigger>
      <AccordionContent>Yes — every token is a CSS variable.</AccordionContent>
    </AccordionItem>
  </Accordion>
);
