import * as React from "react";

import * as AccordionShowcase from "./showcases/accordion";
import * as AlertShowcase from "./showcases/alert";
import * as AvatarShowcase from "./showcases/avatar";
import * as BadgeShowcase from "./showcases/badge";
import * as BreadcrumbShowcase from "./showcases/breadcrumb";
import * as ButtonShowcase from "./showcases/button";
import * as CalendarShowcase from "./showcases/calendar";
import * as CardShowcase from "./showcases/card";
import * as ChartShowcase from "./showcases/chart";
import * as CheckboxShowcase from "./showcases/checkbox";
import * as CommandShowcase from "./showcases/command";
import * as DataTableShowcase from "./showcases/data-table";
import * as DialogShowcase from "./showcases/dialog";
import * as DropdownMenuShowcase from "./showcases/dropdown-menu";
import * as FormShowcase from "./showcases/form";
import * as HoverCardShowcase from "./showcases/hover-card";
import * as InputShowcase from "./showcases/input";
import * as KpiCardShowcase from "./showcases/kpi-card";
import * as LabelShowcase from "./showcases/label";
import * as PopoverShowcase from "./showcases/popover";
import * as ProgressShowcase from "./showcases/progress";
import * as RadioGroupShowcase from "./showcases/radio-group";
import * as SelectShowcase from "./showcases/select";
import * as SeparatorShowcase from "./showcases/separator";
import * as SheetShowcase from "./showcases/sheet";
import * as SkeletonShowcase from "./showcases/skeleton";
import * as SliderShowcase from "./showcases/slider";
import * as SonnerShowcase from "./showcases/sonner";
import * as SwitchShowcase from "./showcases/switch";
import * as TabsShowcase from "./showcases/tabs";
import * as TextareaShowcase from "./showcases/textarea";
import * as ToggleShowcase from "./showcases/toggle";
import * as TooltipShowcase from "./showcases/tooltip";
import { PHASE2_SHOWCASES } from "./showcases/phase2";

export interface Showcase {
  preview: React.ReactNode;
  usage: string;
  source: string;
  variations?: { name: string; preview: React.ReactNode; usage: string }[];
}

const mapShowcase = (
  showcase: {
    usage: string;
    preview: React.ReactNode;
    variations?: { name: string; preview: React.ReactNode; usage: string }[];
  },
  slug: string,
): Showcase => ({
  usage: showcase.usage,
  preview: showcase.preview,
  variations: showcase.variations,
  source: `// canonical source at src/registry/ui/${slug}.tsx`,
});

const phase2Showcases = Object.fromEntries(
  Object.entries(PHASE2_SHOWCASES).map(([slug, showcase]) => [slug, mapShowcase(showcase, slug)]),
);

export const SHOWCASES: Record<string, Showcase> = {
  accordion: mapShowcase(AccordionShowcase, "accordion"),
  alert: mapShowcase(AlertShowcase, "alert"),
  avatar: mapShowcase(AvatarShowcase, "avatar"),
  badge: mapShowcase(BadgeShowcase, "badge"),
  breadcrumb: mapShowcase(BreadcrumbShowcase, "breadcrumb"),
  button: mapShowcase(ButtonShowcase, "button"),
  calendar: mapShowcase(CalendarShowcase, "calendar"),
  card: mapShowcase(CardShowcase, "card"),
  chart: mapShowcase(ChartShowcase, "chart"),
  checkbox: mapShowcase(CheckboxShowcase, "checkbox"),
  command: mapShowcase(CommandShowcase, "command"),
  "data-table": mapShowcase(DataTableShowcase, "data-table"),
  dialog: mapShowcase(DialogShowcase, "dialog"),
  "dropdown-menu": mapShowcase(DropdownMenuShowcase, "dropdown-menu"),
  form: mapShowcase(FormShowcase, "form"),
  "hover-card": mapShowcase(HoverCardShowcase, "hover-card"),
  input: mapShowcase(InputShowcase, "input"),
  "kpi-card": mapShowcase(KpiCardShowcase, "kpi-card"),
  label: mapShowcase(LabelShowcase, "label"),
  popover: mapShowcase(PopoverShowcase, "popover"),
  progress: mapShowcase(ProgressShowcase, "progress"),
  "radio-group": mapShowcase(RadioGroupShowcase, "radio-group"),
  select: mapShowcase(SelectShowcase, "select"),
  separator: mapShowcase(SeparatorShowcase, "separator"),
  sheet: mapShowcase(SheetShowcase, "sheet"),
  skeleton: mapShowcase(SkeletonShowcase, "skeleton"),
  slider: mapShowcase(SliderShowcase, "slider"),
  sonner: mapShowcase(SonnerShowcase, "sonner"),
  switch: mapShowcase(SwitchShowcase, "switch"),
  tabs: mapShowcase(TabsShowcase, "tabs"),
  textarea: mapShowcase(TextareaShowcase, "textarea"),
  toggle: mapShowcase(ToggleShowcase, "toggle"),
  tooltip: mapShowcase(TooltipShowcase, "tooltip"),
  ...phase2Showcases,
};
