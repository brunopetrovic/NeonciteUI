import type { RegistryItem } from "@/registry";

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface KeyboardDoc {
  key: string;
  behavior: string;
}

export interface ComponentDocs {
  props: PropDoc[];
  states: string[];
  keyboard: KeyboardDoc[];
  accessibility: string[];
  composition: string[];
  tokens: string[];
  ssr: string;
  rtl: string;
}

const interactiveKeys: KeyboardDoc[] = [
  {
    key: "Tab / Shift+Tab",
    behavior: "Moves focus through interactive controls in document order.",
  },
  {
    key: "Enter / Space",
    behavior: "Activates the focused control when supported by its native or primitive semantics.",
  },
];

const radixKeys: KeyboardDoc[] = [
  ...interactiveKeys,
  {
    key: "Escape",
    behavior:
      "Closes dismissible overlay content and restores focus when the underlying Radix primitive supports it.",
  },
  {
    key: "Arrow keys",
    behavior:
      "Moves within composite widgets such as menus, radio groups, tabs, navigation, and selectable lists where defined by the primitive.",
  },
];

const nativeProps: PropDoc[] = [
  {
    name: "className",
    type: "string",
    description: "Extends the Neoncite classes without replacing semantic behavior.",
  },
];

const componentSpecific: Record<string, PropDoc[]> = {
  combobox: [
    { name: "options", type: "ComboboxOption[]", description: "Searchable value/label options." },
    { name: "value", type: "string", description: "Controlled selected value." },
    {
      name: "defaultValue",
      type: "string",
      default: '""',
      description: "Initial uncontrolled value.",
    },
    {
      name: "onValueChange",
      type: "(value: string) => void",
      description: "Called when an option is selected.",
    },
  ],
  "date-picker": [
    { name: "value", type: "Date | undefined", description: "Controlled selected date." },
    { name: "defaultValue", type: "Date | undefined", description: "Initial uncontrolled date." },
    {
      name: "onValueChange",
      type: "(date?: Date) => void",
      description: "Called when the selected date changes.",
    },
  ],
  "file-upload": [
    {
      name: "onFilesChange",
      type: "(files: File[]) => void",
      description: "Receives selected or dropped files.",
    },
    { name: "accept", type: "string", description: "Native file accept filter." },
    {
      name: "multiple",
      type: "boolean",
      default: "false",
      description: "Allows multiple file selection.",
    },
  ],
  gauge: [
    { name: "value", type: "number", description: "Current meter value." },
    { name: "min", type: "number", default: "0", description: "Minimum meter value." },
    { name: "max", type: "number", default: "100", description: "Maximum meter value." },
    {
      name: "accent",
      type: "string",
      default: "var(--neon-cyan)",
      description: "CSS color used for the active arc.",
    },
  ],
  "log-viewer": [
    {
      name: "entries",
      type: "LogEntry[]",
      description: "Ordered log records with timestamp, severity, source, and message.",
    },
    {
      name: "compact",
      type: "boolean",
      default: "false",
      description: "Uses denser row spacing and typography.",
    },
  ],
  "resource-meter": [
    { name: "value", type: "number", description: "Current resource usage." },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value used to calculate utilization.",
    },
  ],
  "sparkline-metric": [
    {
      name: "data",
      type: "number[]",
      description: "Ordered values used to draw the inline trend line.",
    },
    { name: "value", type: "ReactNode", description: "Primary displayed metric." },
  ],
  "tree-view": [
    { name: "nodes", type: "TreeNode[]", description: "Hierarchical tree node model." },
    { name: "selectedId", type: "string", description: "Externally selected node identifier." },
    {
      name: "defaultExpanded",
      type: "string[]",
      default: "[]",
      description: "Node IDs expanded on first render.",
    },
  ],
  "number-field": [
    { name: "value", type: "number", description: "Controlled numeric value." },
    {
      name: "defaultValue",
      type: "number",
      default: "0",
      description: "Initial uncontrolled value.",
    },
    {
      name: "onValueChange",
      type: "(value: number) => void",
      description: "Called after a bounded value change.",
    },
    { name: "step", type: "number", default: "1", description: "Increment/decrement amount." },
  ],
  "status-led": [
    {
      name: "status",
      type: '"online" | "warning" | "error" | "info" | "idle"',
      default: '"idle"',
      description: "Semantic status color.",
    },
    {
      name: "pulse",
      type: "boolean",
      default: "false",
      description: "Adds non-essential pulse animation with reduced-motion fallback.",
    },
  ],
  terminal: [
    {
      name: "title",
      type: "ReactNode",
      default: '"terminal"',
      description: "Window label shown in the terminal chrome.",
    },
    { name: "status", type: "ReactNode", description: "Optional right-aligned runtime status." },
  ],
};

const stateByCategory: Record<RegistryItem["category"], string[]> = {
  primitives: ["default", "hover", "focus-visible", "disabled where supported"],
  form: [
    "default",
    "hover",
    "focus-visible",
    "disabled",
    "selected/checked/open where applicable",
    "invalid when composed with validation",
  ],
  data: ["default", "empty", "loading when composed", "selected/active where applicable"],
  overlay: [
    "closed",
    "opening",
    "open",
    "closing",
    "focus-visible",
    "disabled trigger where applicable",
  ],
  feedback: ["default", "semantic status variants", "reduced-motion where animated"],
  neoncite: [
    "default",
    "semantic health/status variants where applicable",
    "loading/live data where composed",
  ],
};

export function getComponentDocs(item: RegistryItem): ComponentDocs {
  const radixBacked = item.dependencies.some((dependency) => dependency.startsWith("@radix-ui/"));
  const interactive = item.category === "form" || item.category === "overlay" || radixBacked;
  const props: PropDoc[] = [
    ...nativeProps,
    ...(componentSpecific[item.slug] ?? []),
    {
      name: "…native / primitive props",
      type: "varies",
      description: radixBacked
        ? "Forwards the underlying Radix primitive props unless the component API documents a narrower contract."
        : "Forwards the underlying React/HTML props where exposed by the component type.",
    },
  ];

  const accessibility = [
    radixBacked
      ? "Behavior is built on the corresponding Radix primitive; preserve its trigger/content relationships and required labels when composing."
      : "Uses native HTML semantics where practical; provide an accessible name for icon-only or content-dependent controls.",
    "Neoncite focus-visible treatment must remain visible against OLED surfaces.",
    "Decorative glow, scan, pulse, and transition effects must not be the only indication of state.",
    "All non-essential animation must respect prefers-reduced-motion.",
  ];
  if (item.slug === "file-upload")
    accessibility.push(
      "The drop zone is keyboard activatable and the hidden file input remains the native file-selection mechanism.",
    );
  if (item.slug === "gauge" || item.slug === "resource-meter")
    accessibility.push(
      "Exposes meter semantics with numeric bounds/current value; pair with a visible label in product UI.",
    );
  if (item.slug === "log-viewer")
    accessibility.push(
      "Uses role=log and polite live updates; avoid replacing the full log array at high frequency for assistive technology users.",
    );
  if (item.slug === "tree-view")
    accessibility.push(
      "For production file explorers, add full treeitem/group ARIA semantics if nested keyboard navigation beyond the provided disclosure behavior is required.",
    );

  return {
    props,
    states: stateByCategory[item.category],
    keyboard: interactive ? (radixBacked ? radixKeys : interactiveKeys) : [],
    accessibility,
    composition: [
      `Install with \`npx neoncite add ${item.slug}\`; registry dependencies are resolved recursively.`,
      item.registryDeps.length
        ? `Composes Neoncite primitives: ${item.registryDeps.join(", ")}. Customize those primitives rather than duplicating their behavior.`
        : "Can be composed with other Neoncite primitives without a private styling runtime.",
    ],
    tokens: [
      "--surface-0…3",
      "--hairline",
      "--foreground",
      "--muted-foreground",
      "--primary / --ring",
      "semantic neon/glow tokens where used",
    ],
    ssr:
      item.slug === "file-upload" || item.slug === "copy-button"
        ? "Browser APIs are used only during interaction. Render the component normally during SSR and avoid invoking browser-only callbacks on the server."
        : "No special SSR requirement beyond the underlying React/Radix dependency. Interactive client components are marked where required.",
    rtl: radixBacked
      ? "Follow the underlying primitive's direction support. Verify placement-specific styling when using RTL."
      : "Layout uses logical flow where practical; verify icon direction for directional controls in RTL products.",
  };
}
