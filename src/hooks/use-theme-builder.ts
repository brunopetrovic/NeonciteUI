import { useCallback, useEffect, useState } from "react";
import { Layers, Moon, Palette, Sparkles } from "lucide-react";

export interface ThemePreset {
  name: string;
  icon: typeof Palette;
  primary: string;
  accent: string;
  surface0: string;
  surface1: string;
  surface2: string;
  surface3: string;
  hairline: string;
  foreground: string;
  mutedFg: string;
  radius: number;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "Neoncite",
    icon: Moon,
    primary: "#ff2a9d",
    accent: "#00f0ff",
    surface0: "#000000",
    surface1: "#09090b",
    surface2: "#121214",
    surface3: "#1c1c1e",
    hairline: "#2c2c2e",
    foreground: "#f2f2f7",
    mutedFg: "#8e8e93",
    radius: 0.75,
  },
  {
    name: "Ocean",
    icon: Layers,
    primary: "#3399ff",
    accent: "#00f0ff",
    surface0: "#020617",
    surface1: "#0c1425",
    surface2: "#131d33",
    surface3: "#1c2842",
    hairline: "#253352",
    foreground: "#e2e8f0",
    mutedFg: "#64748b",
    radius: 0.75,
  },
  {
    name: "Ember",
    icon: Sparkles,
    primary: "#ff6600",
    accent: "#ffcc00",
    surface0: "#0c0403",
    surface1: "#140a07",
    surface2: "#1c110b",
    surface3: "#2a1810",
    hairline: "#3d2418",
    foreground: "#fde8d8",
    mutedFg: "#9c7a63",
    radius: 0.5,
  },
  {
    name: "Forest",
    icon: Palette,
    primary: "#00ff66",
    accent: "#ccff00",
    surface0: "#010c04",
    surface1: "#051408",
    surface2: "#0a1c0e",
    surface3: "#122916",
    hairline: "#1a3a1f",
    foreground: "#d8f5e0",
    mutedFg: "#5a9467",
    radius: 1,
  },
  {
    name: "Ultraviolet",
    icon: Sparkles,
    primary: "#b829ff",
    accent: "#ff2a9d",
    surface0: "#07001a",
    surface1: "#0d0528",
    surface2: "#140a38",
    surface3: "#1e1049",
    hairline: "#2a1960",
    foreground: "#ede5ff",
    mutedFg: "#8b7aad",
    radius: 0.75,
  },
];

export const neonColors = [
  { name: "Pink", value: "#ff2a9d" },
  { name: "Cyan", value: "#00f0ff" },
  { name: "Blue", value: "#3399ff" },
  { name: "Yellow", value: "#ffcc00" },
  { name: "Orange", value: "#ff6600" },
  { name: "Green", value: "#00ff66" },
  { name: "Purple", value: "#b829ff" },
  { name: "Red", value: "#ff003c" },
  { name: "Lime", value: "#ccff00" },
];

const DEFAULTS = THEME_PRESETS[0];

export function useThemeBuilder() {
  const [primary, setPrimary] = useState(DEFAULTS.primary);
  const [accent, setAccent] = useState(DEFAULTS.accent);
  const [surface0, setSurface0] = useState(DEFAULTS.surface0);
  const [surface1, setSurface1] = useState(DEFAULTS.surface1);
  const [surface2, setSurface2] = useState(DEFAULTS.surface2);
  const [surface3, setSurface3] = useState(DEFAULTS.surface3);
  const [hairline, setHairline] = useState(DEFAULTS.hairline);
  const [foreground, setForeground] = useState(DEFAULTS.foreground);
  const [mutedFg, setMutedFg] = useState(DEFAULTS.mutedFg);
  const [radius, setRadius] = useState([DEFAULTS.radius]);
  const [activePreset, setActivePreset] = useState(DEFAULTS.name);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("neoncite-theme");
    if (saved) {
      try {
        const config = JSON.parse(saved);
        setPrimary(config.primary);
        setAccent(config.accent);
        setSurface0(config.surface0);
        setSurface1(config.surface1);
        setSurface2(config.surface2);
        setSurface3(config.surface3);
        setHairline(config.hairline);
        setForeground(config.foreground);
        setMutedFg(config.mutedFg);
        setRadius([config.radius]);
        setActivePreset("Custom");
      } catch (e) {
        console.error("Failed to load saved theme", e);
      }
    }
  }, []);

  const saveTheme = useCallback(() => {
    const config = {
      primary,
      accent,
      surface0,
      surface1,
      surface2,
      surface3,
      hairline,
      foreground,
      mutedFg,
      radius: radius[0],
    };
    localStorage.setItem("neoncite-theme", JSON.stringify(config));
  }, [
    primary,
    accent,
    surface0,
    surface1,
    surface2,
    surface3,
    hairline,
    foreground,
    mutedFg,
    radius,
  ]);

  useEffect(() => {
    const root = document.documentElement;
    const tokens: [string, string][] = [
      ["--primary", primary],
      ["--ring", primary],
      ["--accent", accent],
      ["--surface-0", surface0],
      ["--surface-1", surface1],
      ["--surface-2", surface2],
      ["--surface-3", surface3],
      ["--background", surface0],
      ["--card", surface1],
      ["--popover", surface2],
      ["--muted", surface2],
      ["--secondary", surface3],
      ["--input", surface3],
      ["--border", surface3],
      ["--hairline", hairline],
      ["--foreground", foreground],
      ["--card-foreground", foreground],
      ["--popover-foreground", foreground],
      ["--secondary-foreground", foreground],
      ["--muted-foreground", mutedFg],
      ["--radius", `${radius[0]}rem`],
    ];
    tokens.forEach(([key, value]) => root.style.setProperty(key, value));
    return () => tokens.forEach(([key]) => root.style.removeProperty(key));
  }, [
    primary,
    accent,
    surface0,
    surface1,
    surface2,
    surface3,
    hairline,
    foreground,
    mutedFg,
    radius,
  ]);

  const applyPreset = useCallback((preset: ThemePreset) => {
    setPrimary(preset.primary);
    setAccent(preset.accent);
    setSurface0(preset.surface0);
    setSurface1(preset.surface1);
    setSurface2(preset.surface2);
    setSurface3(preset.surface3);
    setHairline(preset.hairline);
    setForeground(preset.foreground);
    setMutedFg(preset.mutedFg);
    setRadius([preset.radius]);
    setActivePreset(preset.name);
  }, []);

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem("neoncite-theme");
    applyPreset(DEFAULTS);
  }, [applyPreset]);

  const generateCSS = useCallback(
    () => `:root, .dark {
  --primary: ${primary};
  --ring: ${primary};
  --accent: ${accent};
  --radius: ${radius[0]}rem;

  --surface-0: ${surface0};
  --surface-1: ${surface1};
  --surface-2: ${surface2};
  --surface-3: ${surface3};
  --hairline: ${hairline};

  --background: ${surface0};
  --foreground: ${foreground};
  --muted-foreground: ${mutedFg};
  --card: ${surface1};
  --card-foreground: ${foreground};
  --popover: ${surface2};
  --popover-foreground: ${foreground};
  --secondary: ${surface3};
  --secondary-foreground: ${foreground};
  --muted: ${surface2};
  --input: ${surface3};
  --border: ${surface3};
}`,
    [
      primary,
      accent,
      radius,
      surface0,
      surface1,
      surface2,
      surface3,
      hairline,
      foreground,
      mutedFg,
    ],
  );

  return {
    activePreset,
    accent,
    applyPreset,
    foreground,
    generateCSS,
    saveTheme,
    hairline,
    mutedFg,
    primary,
    radius,
    resetToDefaults,
    setAccent,
    setActivePreset,
    setForeground,
    setHairline,
    setMutedFg,
    setPrimary,
    setRadius,
    setSurface0,
    setSurface1,
    setSurface2,
    setSurface3,
    surface0,
    surface1,
    surface2,
    surface3,
  };
}
