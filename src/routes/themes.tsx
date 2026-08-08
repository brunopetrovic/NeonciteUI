import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/registry/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card";
import { Slider } from "@/registry/ui/slider";
import { Badge } from "@/registry/ui/badge";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Progress } from "@/registry/ui/progress";
import { KpiCard } from "@/registry/ui/kpi-card";
import { Checkbox } from "@/registry/ui/checkbox";
import { Separator } from "@/registry/ui/separator";
import { Switch } from "@/registry/ui/switch";
import { neonColors, THEME_PRESETS, useThemeBuilder } from "@/hooks/use-theme-builder";
import {
  Check,
  Copy,
  Download,
  Link2,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/themes")({
  head: () => ({
    meta: [
      { title: "Themes — Neoncite/UI" },
      {
        name: "description",
        content:
          "Build, validate, save, share, import, and export dark-only Neoncite themes with real component previews.",
      },
    ],
  }),
  component: ThemesPage,
});

function downloadText(filename: string, content: string, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function ThemesPage() {
  const theme = useThemeBuilder();
  const fileInput = useRef<HTMLInputElement>(null);
  const [themeName, setThemeName] = useState("");
  const [notice, setNotice] = useState("");

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 1800);
  };

  const copy = async (value: string, message: string) => {
    await navigator.clipboard.writeText(value);
    flash(message);
  };

  const importFile = async (file?: File) => {
    if (!file) return;
    try {
      theme.importThemeJSON(await file.text());
      flash("Theme imported");
    } catch (error) {
      flash(error instanceof Error ? error.message : "Invalid theme file");
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-4 md:px-8 py-12 md:py-16">
        <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest neon-purple mb-3">
              Visual
            </p>
            <h1 className="text-[40px] md:text-[56px] font-mono font-bold tracking-tighter neon-white mb-3">
              Theme Builder
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-2xl leading-relaxed">
              Build a dark-only Neoncite theme, validate contrast, save named variants, share the
              exact state, or export CSS, Neoncite JSON, and DTCG design tokens.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              aria-label="Import theme JSON file"
              className="sr-only"
              onChange={(event) => importFile(event.target.files?.[0])}
            />
            <Button variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
              <Upload className="h-3.5 w-3.5" /> Import JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copy(theme.generateShareUrl(), "Share URL copied")}
            >
              <Link2 className="h-3.5 w-3.5" /> Share
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => copy(theme.generateCSS(), "CSS copied")}
            >
              <Copy className="h-3.5 w-3.5" /> Copy CSS
            </Button>
          </div>
        </header>

        {notice && (
          <div
            className="fixed bottom-5 right-5 z-50 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] px-4 py-2 font-mono text-[11px] text-foreground shadow-[var(--machined-shadow)]"
            role="status"
          >
            {notice}
          </div>
        )}

        <section className="mb-10">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground">
                Presets
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                All official presets remain intentionally dark.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Active: <span className="text-foreground">{theme.activePreset}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.slug}
                type="button"
                onClick={() => theme.applyPreset(preset)}
                className={`group relative rounded-[14px] border p-4 text-left transition-all ${
                  theme.activePreset === preset.name
                    ? "border-white/20 bg-white/[0.06] shadow-[0_0_20px_rgba(255,255,255,.05)]"
                    : "border-[color:var(--hairline)] bg-[color:var(--surface-1)] hover:border-white/10"
                }`}
              >
                <div className="mb-3 flex gap-1.5">
                  {[preset.primary, preset.accent, preset.surface2].map((color) => (
                    <span
                      key={color}
                      className="h-5 w-5 rounded-full border border-white/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="font-mono text-[12px] font-semibold text-foreground">
                  {preset.name}
                </div>
                <code className="mt-2 block truncate font-mono text-[9px] text-muted-foreground">
                  npx neoncite add {preset.slug}
                </code>
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
          <div className="space-y-6">
            <section className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
              <h2 className="mb-5 font-mono text-[12px] uppercase tracking-widest text-foreground">
                Accent colors
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { label: "Primary", value: theme.primary, set: theme.setPrimary },
                  { label: "Accent", value: theme.accent, set: theme.setAccent },
                ].map((field) => (
                  <div key={field.label}>
                    <Label className="mb-3 block">{field.label}</Label>
                    <div className="flex flex-wrap gap-2">
                      {neonColors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          aria-label={`${field.label}: ${color.name}`}
                          onClick={() => {
                            field.set(color.value);
                            theme.setActivePreset("Custom");
                          }}
                          className={`h-8 w-8 rounded-full border-2 transition-transform ${field.value === color.value ? "scale-110 border-white" : "border-transparent hover:scale-105"}`}
                          style={{
                            backgroundColor: color.value,
                            boxShadow:
                              field.value === color.value ? `0 0 12px ${color.value}80` : "none",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
              <h2 className="mb-5 font-mono text-[12px] uppercase tracking-widest text-foreground">
                Surface scale
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "Surface 0", value: theme.surface0, set: theme.setSurface0 },
                  { label: "Surface 1", value: theme.surface1, set: theme.setSurface1 },
                  { label: "Surface 2", value: theme.surface2, set: theme.setSurface2 },
                  { label: "Surface 3", value: theme.surface3, set: theme.setSurface3 },
                  { label: "Hairline", value: theme.hairline, set: theme.setHairline },
                  { label: "Foreground", value: theme.foreground, set: theme.setForeground },
                  { label: "Muted FG", value: theme.mutedFg, set: theme.setMutedFg },
                ].map((field) => (
                  <label key={field.label} className="block">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {field.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        type="color"
                        value={field.value}
                        onChange={(event) => {
                          field.set(event.target.value);
                          theme.setActivePreset("Custom");
                        }}
                        className="h-8 w-8 cursor-pointer rounded-[8px] border border-[color:var(--hairline)] bg-transparent"
                      />
                      <code className="font-mono text-[10px] text-muted-foreground">
                        {field.value}
                      </code>
                    </span>
                  </label>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="max-w-md">
                <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>Radius</span>
                  <span>{theme.radius[0]}rem</span>
                </div>
                <Slider
                  value={theme.radius}
                  onValueChange={(value) => {
                    theme.setRadius(value);
                    theme.setActivePreset("Custom");
                  }}
                  min={0}
                  max={1.5}
                  step={0.125}
                />
              </div>
            </section>

            <section className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
              <div className="mb-5 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[color:var(--neon-green)]" />
                <h2 className="font-mono text-[12px] uppercase tracking-widest text-foreground">
                  Contrast checks
                </h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {theme.contrastChecks.map((check) => {
                  const passes = check.ratio >= check.threshold;
                  return (
                    <div
                      key={check.label}
                      className="flex items-center justify-between gap-3 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] px-3 py-2"
                    >
                      <span className="text-xs text-muted-foreground">{check.label}</span>
                      <span
                        className={`font-mono text-[10px] ${passes ? "text-[color:var(--neon-green)]" : "text-[color:var(--neon-red)]"}`}
                      >
                        {check.ratio.toFixed(2)}:1 · {passes ? "PASS" : "FAIL"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
              <h2 className="mb-4 font-mono text-[12px] uppercase tracking-widest text-foreground">
                Saved themes
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  value={themeName}
                  onChange={(event) => setThemeName(event.target.value)}
                  placeholder="Theme name"
                  aria-label="Theme name"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    try {
                      theme.saveNamedTheme(themeName);
                      setThemeName("");
                      flash("Named theme saved");
                    } catch (error) {
                      flash(error instanceof Error ? error.message : "Unable to save theme");
                    }
                  }}
                >
                  <Save className="h-4 w-4" /> Save
                </Button>
              </div>
              {theme.savedThemes.length > 0 && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {theme.savedThemes.map((saved) => (
                    <div
                      key={saved.name}
                      className="flex items-center gap-2 rounded-[10px] border border-[color:var(--hairline)] px-3 py-2"
                    >
                      <button
                        className="min-w-0 flex-1 truncate text-left font-mono text-[11px] text-foreground"
                        onClick={() => theme.loadSavedTheme(saved.name)}
                      >
                        {saved.name}
                      </button>
                      <button
                        aria-label={`Delete ${saved.name}`}
                        className="text-muted-foreground hover:text-[color:var(--neon-red)]"
                        onClick={() => theme.deleteSavedTheme(saved.name)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={theme.resetToDefaults}>
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </Button>
              <Button variant="outline" size="sm" onClick={theme.saveTheme}>
                <Check className="h-3.5 w-3.5" /> Persist active
              </Button>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] overflow-hidden">
              <div className="border-b border-[color:var(--hairline)] px-4 h-10 flex items-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Live Preview
                </span>
              </div>
              <div className="p-5 space-y-5 bg-[color:var(--surface-0)]">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">
                    Deploy
                  </Button>
                  <Button variant="neon" size="sm">
                    Connect
                  </Button>
                  <Button variant="default" size="sm">
                    Settings
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="green">Online</Badge>
                  <Badge variant="yellow">Degraded</Badge>
                  <Badge variant="red">Down</Badge>
                </div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[14px]">Cluster Status</CardTitle>
                    <CardDescription>Demo telemetry preview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={64} />
                    <div className="grid grid-cols-2 gap-3">
                      <KpiCard
                        label="Requests"
                        value="14.2K"
                        delta="+12.3%"
                        trend="up"
                        accent="green"
                      />
                      <KpiCard
                        label="Latency"
                        value="84ms"
                        delta="-4ms"
                        trend="down"
                        accent="cyan"
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="theme-host">Hostname</Label>
                    <Input id="theme-host" placeholder="cluster-01.local" />
                  </div>
                  <div className="flex items-center gap-5 text-[12px]">
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked /> Telemetry
                    </label>
                    <label className="flex items-center gap-2">
                      <Switch defaultChecked /> Restart
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4">
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Export
              </h2>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() =>
                    downloadText("neoncite-theme.css", theme.generateCSS(), "text/css")
                  }
                >
                  <Download className="h-3.5 w-3.5" /> CSS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() =>
                    downloadText("neoncite-theme.json", theme.generateJSON(), "application/json")
                  }
                >
                  <Download className="h-3.5 w-3.5" /> Neoncite JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() =>
                    downloadText(
                      "neoncite-theme.dtcg.json",
                      theme.generateDTCG(),
                      "application/json",
                    )
                  }
                >
                  <Download className="h-3.5 w-3.5" /> DTCG JSON
                </Button>
              </div>
            </div>

            <pre
              aria-label="Generated CSS"
              className="max-h-[300px] overflow-auto rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] p-4"
            >
              <code className="whitespace-pre font-mono text-[10px] leading-relaxed text-foreground">
                {theme.generateCSS()}
              </code>
            </pre>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
