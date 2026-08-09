// Shared registry metadata lives in JSON so docs, package builds, and public
// registry generation cannot drift. Phase-2 additions are isolated in
// items-extra.json to keep the original inventory reviewable.

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarDays,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  FileInput,
  Info,
  LayoutPanelTop,
  LineChart,
  Loader,
  Menu,
  MessageSquare,
  Minus,
  MousePointer2,
  MousePointerClick,
  PanelRight,
  Radio,
  Search,
  Sliders,
  Square,
  Table2,
  Tag,
  Tags,
  TextCursorInput,
  ToggleLeft,
  ToggleRight,
  Type,
  User,
} from "lucide-react";
import type { ComponentType } from "react";
import items from "./items.json";
import extraItems from "./items-extra.json";

export type Category = "primitives" | "feedback" | "form" | "overlay" | "neoncite" | "data";

type RegistryIconName =
  | "Activity"
  | "AlertTriangle"
  | "BarChart3"
  | "Bell"
  | "CalendarDays"
  | "CheckSquare"
  | "ChevronDown"
  | "ChevronRight"
  | "ChevronsUpDown"
  | "FileInput"
  | "Info"
  | "LayoutPanelTop"
  | "LineChart"
  | "Loader"
  | "Menu"
  | "MessageSquare"
  | "Minus"
  | "MousePointer2"
  | "MousePointerClick"
  | "PanelRight"
  | "Radio"
  | "Search"
  | "Sliders"
  | "Square"
  | "Table2"
  | "Tag"
  | "Tags"
  | "TextCursorInput"
  | "ToggleLeft"
  | "ToggleRight"
  | "Type"
  | "User";

export interface RegistryItemMetadata {
  slug: string;
  name: string;
  description: string;
  category: Category;
  targetPath: string;
  dependencies: string[];
  registryDeps: string[];
  accent: string;
  icon: RegistryIconName;
}

export interface RegistryItem extends Omit<RegistryItemMetadata, "icon"> {
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const icons = {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CalendarDays,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  FileInput,
  Info,
  LayoutPanelTop,
  LineChart,
  Loader,
  Menu,
  MessageSquare,
  Minus,
  MousePointer2,
  MousePointerClick,
  PanelRight,
  Radio,
  Search,
  Sliders,
  Square,
  Table2,
  Tag,
  Tags,
  TextCursorInput,
  ToggleLeft,
  ToggleRight,
  Type,
  User,
} satisfies Record<RegistryIconName, RegistryItem["icon"]>;

export const REGISTRY_METADATA = [...items, ...extraItems] as RegistryItemMetadata[];

export const REGISTRY: RegistryItem[] = REGISTRY_METADATA.map(({ icon, ...item }) => ({
  ...item,
  icon: icons[icon],
}));

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "primitives", label: "Primitives" },
  { id: "form", label: "Form" },
  { id: "data", label: "Data" },
  { id: "overlay", label: "Overlay" },
  { id: "feedback", label: "Feedback" },
  { id: "neoncite", label: "Neoncite Signature" },
];

export function getRegistryItem(slug: string): RegistryItem | undefined {
  return REGISTRY.find((r) => r.slug === slug);
}
