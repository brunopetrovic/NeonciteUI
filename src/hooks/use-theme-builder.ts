import { useCallback, useEffect, useMemo, useState } from "react";
import { Layers, Moon, Palette, Sparkles } from "lucide-react";
import { z } from "zod";
import presetData from "@/registry/themes.json";

const HexColorSchema = z.string().regex(/^#[0-9a-f]{6}$/i, "Expected a 6-digit hex color");

export const ThemeConfigSchema = z.object({
  primary: HexColorSchema,
  accent: HexColorSchema,
  surface0: HexColorSchema,
  surface1: HexColorSchema,
  surface2: HexColorSchema,
  surface3: HexColorSchema,
  hairline: HexColorSchema,
  foreground: HexColorSchema,
  mutedFg: HexColorSchema,
  radius: z.number().min(0).max(1.5),
});

export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;

const ThemePresetSchema = ThemeConfigSchema.extend({
  slug: z.string(),
  name: z.string(),
});

export interface ThemePreset extends ThemeConfig {
  slug: string;
  name: string;
  icon: typeof Palette;
}

export interface SavedTheme {
  name: string;
  config: ThemeConfig;
}

const iconMap: Record<string, typeof Palette> = {
  Neoncite: Moon,
  Ocean: Layers,
  Ember: Sparkles,
  Forest: Palette,
  Ultraviolet: Sparkles,
};

export const THEME_PRESETS: ThemePreset[] = z
  .array(ThemePresetSchema)
  .parse(presetData)
  .map((preset) => ({ ...preset, icon: iconMap[preset.name] ?? Palette }));

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
const ACTIVE_THEME_KEY = "neoncite-theme";
const SAVED_THEMES_KEY = "neoncite-saved-themes";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16) / 255,
    g: Number.parseInt(value.slice(2, 4), 16) / 255,
    b: Number.parseInt(value.slice(4, 6), 16) / 255,
  };
}

function channelLuminance(channel: number) {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string) {
  const rgb = hexToRgb(hex);
  return (
    0.2126 * channelLuminance(rgb.r) +
    0.7152 * channelLuminance(rgb.g) +
    0.0722 * channelLuminance(rgb.b)
  );
}

export function contrastRatio(a: string, b: string) {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function assertDarkTheme(config: ThemeConfig) {
  const surfaceLuminances = [
    config.surface0,
    config.surface1,
    config.surface2,
    config.surface3,
  ].map(relativeLuminance);
  if (surfaceLuminances.some((value) => value > 0.22)) {
    throw new Error("Neoncite themes are dark-only. One or more surface tokens are too bright.");
  }
}

function normalizeImportedTheme(value: unknown): ThemeConfig {
  const candidate =
    typeof value === "object" && value !== null && "tokens" in value
      ? (value as { tokens: unknown }).tokens
      : value;
  const config = ThemeConfigSchema.parse(candidate);
  assertDarkTheme(config);
  return config;
}

function configToCss(config: ThemeConfig) {
  return `:root, .dark {
  --primary: ${config.primary};
  --ring: ${config.primary};
  --accent: ${config.accent};
  --radius: ${config.radius}rem;

  --surface-0: ${config.surface0};
  --surface-1: ${config.surface1};
  --surface-2: ${config.surface2};
  --surface-3: ${config.surface3};
  --hairline: ${config.hairline};

  --background: ${config.surface0};
  --foreground: ${config.foreground};
  --muted-foreground: ${config.mutedFg};
  --card: ${config.surface1};
  --card-foreground: ${config.foreground};
  --popover: ${config.surface2};
  --popover-foreground: ${config.foreground};
  --secondary: ${config.surface3};
  --secondary-foreground: ${config.foreground};
  --muted: ${config.surface2};
  --input: ${config.surface3};
  --border: ${config.surface3};
}`;
}

function configToDtcg(config: ThemeConfig) {
  const color = (value: string) => ({ $type: "color", $value: value });
  return {
    $schema: "https://www.designtokens.org/schemas/dtcg.json",
    neoncite: {
      color: {
        primary: color(config.primary),
        accent: color(config.accent),
        surface: {
          0: color(config.surface0),
          1: color(config.surface1),
          2: color(config.surface2),
          3: color(config.surface3),
        },
        hairline: color(config.hairline),
        foreground: color(config.foreground),
        "muted-foreground": color(config.mutedFg),
      },
      radius: {
        base: { $type: "dimension", $value: { value: config.radius, unit: "rem" } },
      },
    },
  };
}

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
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);

  const currentConfig = useMemo<ThemeConfig>(
    () => ({
      primary,
      accent,
      surface0,
      surface1,
      surface2,
      surface3,
      hairline,
      foreground,
      mutedFg,
      radius: radius[0] ?? DEFAULTS.radius,
    }),
    [
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
    ],
  );

  const applyConfig = useCallback((config: ThemeConfig, label = "Custom") => {
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
    setActivePreset(label);
  }, []);

  useEffect(() => {
    try {
      const savedNamed = localStorage.getItem(SAVED_THEMES_KEY);
      if (savedNamed) {
        const parsed = z
          .array(z.object({ name: z.string(), config: ThemeConfigSchema }))
          .parse(JSON.parse(savedNamed));
        setSavedThemes(parsed);
      }

      const params = new URLSearchParams(window.location.search);
      const sharedTheme = params.get("theme");
      if (sharedTheme) {
        applyConfig(normalizeImportedTheme(JSON.parse(sharedTheme)), "Shared");
        return;
      }

      const saved = localStorage.getItem(ACTIVE_THEME_KEY);
      if (saved) applyConfig(normalizeImportedTheme(JSON.parse(saved)), "Custom");
    } catch (error) {
      console.error("Failed to hydrate Neoncite theme state", error);
    }
  }, [applyConfig]);

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

  const saveTheme = useCallback(() => {
    localStorage.setItem(ACTIVE_THEME_KEY, JSON.stringify(currentConfig));
  }, [currentConfig]);

  const saveNamedTheme = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) throw new Error("Theme name is required.");
      const next = [
        ...savedThemes.filter((theme) => theme.name.toLowerCase() !== trimmed.toLowerCase()),
        { name: trimmed, config: currentConfig },
      ].sort((a, b) => a.name.localeCompare(b.name));
      setSavedThemes(next);
      localStorage.setItem(SAVED_THEMES_KEY, JSON.stringify(next));
      localStorage.setItem(ACTIVE_THEME_KEY, JSON.stringify(currentConfig));
      setActivePreset(trimmed);
    },
    [currentConfig, savedThemes],
  );

  const deleteSavedTheme = useCallback(
    (name: string) => {
      const next = savedThemes.filter((theme) => theme.name !== name);
      setSavedThemes(next);
      localStorage.setItem(SAVED_THEMES_KEY, JSON.stringify(next));
    },
    [savedThemes],
  );

  const loadSavedTheme = useCallback(
    (name: string) => {
      const saved = savedThemes.find((theme) => theme.name === name);
      if (saved) applyConfig(saved.config, saved.name);
    },
    [applyConfig, savedThemes],
  );

  const applyPreset = useCallback(
    (preset: ThemePreset) => applyConfig(preset, preset.name),
    [applyConfig],
  );

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(ACTIVE_THEME_KEY);
    applyPreset(DEFAULTS);
  }, [applyPreset]);

  const importThemeJSON = useCallback(
    (json: string) => {
      const config = normalizeImportedTheme(JSON.parse(json));
      applyConfig(config, "Imported");
      return config;
    },
    [applyConfig],
  );

  const generateCSS = useCallback(() => configToCss(currentConfig), [currentConfig]);
  const generateJSON = useCallback(
    () =>
      JSON.stringify(
        {
          $schema: "https://neoncite-ui.thorus.workers.dev/r/theme.schema.json",
          format: "neoncite-theme",
          version: 1,
          name: activePreset,
          tokens: currentConfig,
        },
        null,
        2,
      ),
    [activePreset, currentConfig],
  );
  const generateDTCG = useCallback(
    () => JSON.stringify(configToDtcg(currentConfig), null, 2),
    [currentConfig],
  );
  const generateShareUrl = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", JSON.stringify(currentConfig));
    return url.toString();
  }, [currentConfig]);

  const contrastChecks = useMemo(
    () => [
      {
        label: "Foreground / Surface 0",
        ratio: contrastRatio(foreground, surface0),
        threshold: 4.5,
      },
      {
        label: "Muted text / Surface 0",
        ratio: contrastRatio(mutedFg, surface0),
        threshold: 4.5,
      },
      {
        label: "Primary / Surface 0",
        ratio: contrastRatio(primary, surface0),
        threshold: 3,
      },
      {
        label: "Accent / Surface 0",
        ratio: contrastRatio(accent, surface0),
        threshold: 3,
      },
    ],
    [foreground, mutedFg, primary, accent, surface0],
  );

  return {
    activePreset,
    accent,
    applyPreset,
    contrastChecks,
    currentConfig,
    deleteSavedTheme,
    foreground,
    generateCSS,
    generateDTCG,
    generateJSON,
    generateShareUrl,
    hairline,
    importThemeJSON,
    loadSavedTheme,
    mutedFg,
    primary,
    radius,
    resetToDefaults,
    saveNamedTheme,
    saveTheme,
    savedThemes,
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
