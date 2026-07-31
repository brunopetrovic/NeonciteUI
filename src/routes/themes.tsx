import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/registry/ui/card";
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
import { Copy, Check, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/themes")({
  head: () => ({
    meta: [
      { title: "Themes — Neoncite/UI" },
      {
        name: "description",
        content:
          "Build, preview, and export custom Neoncite themes. Live component preview with real-time token injection.",
      },
    ],
  }),
  component: ThemesPage,
});

function ThemesPage() {
  const theme = useThemeBuilder();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const {
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
  } = theme;

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSave = () => {
    saveTheme();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-[1400px] px-4 md:px-8 py-12 md:py-16">
        <header className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest neon-purple mb-3">
              Visual
            </p>
            <h1 className="text-[40px] md:text-[56px] font-mono font-bold tracking-tighter neon-white mb-3">
              Theme Builder
            </h1>
            <p className="text-[15px] text-muted-foreground max-w-2xl">
              Start from a preset, customize every token, preview live, and export the CSS to drop
              into your project.
            </p>
          </div>
          <div className="flex gap-3 mb-2">
            <Button variant="ghost" size="sm" onClick={onSave}>
              {saved ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
              {saved ? "Saved" : "Save to Storage"}
            </Button>
            <Button variant="primary" size="sm" onClick={copyCSS}>
              {copied ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
              {copied ? "Copied" : "Copy CSS"}
            </Button>
          </div>
        </header>

        {/* ─── Presets ─── */}
        <section className="mb-10">
          <h2 className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground mb-4">
            Presets
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {THEME_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-[14px] border transition-all ${
                  activePreset === p.name
                    ? "border-white/20 bg-white/[0.06] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "border-[color:var(--hairline)] bg-[color:var(--surface-1)] hover:border-white/10 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex gap-1">
                  <div
                    className="h-5 w-5 rounded-full border border-white/10"
                    style={{ backgroundColor: p.primary, boxShadow: `0 0 8px ${p.primary}40` }}
                  />
                  <div
                    className="h-5 w-5 rounded-full border border-white/10"
                    style={{ backgroundColor: p.surface0 }}
                  />
                  <div
                    className="h-5 w-5 rounded-full border border-white/10"
                    style={{ backgroundColor: p.surface2 }}
                  />
                </div>
                <span className="text-[12px] font-mono font-semibold text-foreground">
                  {p.name}
                </span>
                {activePreset === p.name && (
                  <div
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: p.primary }}
                  >
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8">
          {/* ─── Controls ─── */}
          <div className="space-y-8">
            {/* Accent colors */}
            <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-foreground mb-5">
                Accent Colors
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
                    Primary
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {neonColors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setPrimary(c.value);
                          setActivePreset("Custom");
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${primary === c.value ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                        style={{
                          backgroundColor: c.value,
                          boxShadow: primary === c.value ? `0 0 12px ${c.value}80` : "none",
                        }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
                    Accent
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {neonColors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setAccent(c.value);
                          setActivePreset("Custom");
                        }}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${accent === c.value ? "border-white scale-110" : "border-transparent hover:scale-105"}`}
                        style={{
                          backgroundColor: c.value,
                          boxShadow: accent === c.value ? `0 0 12px ${c.value}80` : "none",
                        }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Surface scale */}
            <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-foreground mb-5">
                Surface Scale
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(
                  [
                    { label: "Surface 0", value: surface0, set: setSurface0 },
                    { label: "Surface 1", value: surface1, set: setSurface1 },
                    { label: "Surface 2", value: surface2, set: setSurface2 },
                    { label: "Surface 3", value: surface3, set: setSurface3 },
                    { label: "Hairline", value: hairline, set: setHairline },
                  ] as const
                ).map((s) => (
                  <div key={s.label}>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
                      {s.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <label
                        className="h-8 w-8 rounded-[8px] border border-[color:var(--hairline)] cursor-pointer shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                        style={{ backgroundColor: s.value }}
                      >
                        <input
                          type="color"
                          value={s.value}
                          onChange={(e) => {
                            s.set(e.target.value);
                            setActivePreset("Custom");
                          }}
                          className="sr-only"
                        />
                      </label>
                      <code className="text-[10px] font-mono text-muted-foreground">{s.value}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography + Radius */}
            <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-foreground mb-5">
                Typography & Shape
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
                    Foreground
                  </label>
                  <div className="flex items-center gap-2">
                    <label
                      className="h-8 w-8 rounded-[8px] border border-[color:var(--hairline)] cursor-pointer shrink-0"
                      style={{ backgroundColor: foreground }}
                    >
                      <input
                        type="color"
                        value={foreground}
                        onChange={(e) => {
                          setForeground(e.target.value);
                          setActivePreset("Custom");
                        }}
                        className="sr-only"
                      />
                    </label>
                    <code className="text-[10px] font-mono text-muted-foreground">
                      {foreground}
                    </code>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">
                    Muted FG
                  </label>
                  <div className="flex items-center gap-2">
                    <label
                      className="h-8 w-8 rounded-[8px] border border-[color:var(--hairline)] cursor-pointer shrink-0"
                      style={{ backgroundColor: mutedFg }}
                    >
                      <input
                        type="color"
                        value={mutedFg}
                        onChange={(e) => {
                          setMutedFg(e.target.value);
                          setActivePreset("Custom");
                        }}
                        className="sr-only"
                      />
                    </label>
                    <code className="text-[10px] font-mono text-muted-foreground">{mutedFg}</code>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Radius
                    </label>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {radius[0]}rem
                    </span>
                  </div>
                  <Slider
                    value={radius}
                    onValueChange={(v) => {
                      setRadius(v);
                      setActivePreset("Custom");
                    }}
                    max={1.5}
                    min={0}
                    step={0.125}
                  />
                </div>
              </div>
            </div>

            {/* Reset */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefaults}
                className="gap-1.5 text-[11px]"
              >
                <RotateCcw size={12} /> Reset to defaults
              </Button>
              <span className="text-[11px] font-mono text-muted-foreground">
                Active: <span className="text-foreground">{activePreset}</span>
              </span>
            </div>
          </div>

          {/* ─── Right column: Live Preview + Export ─── */}
          <div className="space-y-6">
            {/* Live Component Preview */}
            <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] overflow-hidden">
              <div className="border-b border-[color:var(--hairline)] px-4 h-10 flex items-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Live Preview
                </span>
              </div>
              <div className="p-5 space-y-5 bg-[color:var(--surface-0)]">
                {/* Buttons */}
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
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                  <Button variant="ghost" size="sm">
                    Help
                  </Button>
                </div>

                <Separator />

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="green">Online</Badge>
                  <Badge variant="yellow">Degraded</Badge>
                  <Badge variant="red">Down</Badge>
                  <Badge variant="cyan">Beta</Badge>
                  <Badge variant="pink">v2.0</Badge>
                </div>

                <Separator />

                {/* Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[14px]">Cluster Status</CardTitle>
                    <CardDescription>3 nodes online · 99.98% uptime</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-muted-foreground">CPU</span>
                        <span className="text-foreground">34%</span>
                      </div>
                      <Progress value={34} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-muted-foreground">Memory</span>
                        <span className="text-foreground">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 justify-end">
                    <Button variant="primary" size="sm">
                      Inspect
                    </Button>
                  </CardFooter>
                </Card>

                <Separator />

                {/* KPI Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <KpiCard
                    label="Requests"
                    value="14.2K"
                    delta="+12.3%"
                    trend="up"
                    accent="green"
                  />
                  <KpiCard label="Latency" value="84ms" delta="-4ms" trend="down" accent="cyan" />
                </div>

                <Separator />

                {/* Form controls */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="theme-input">Hostname</Label>
                    <Input id="theme-input" placeholder="cluster-01.local" />
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-[12px]">
                      <Checkbox defaultChecked /> Enable telemetry
                    </label>
                    <div className="flex items-center gap-2 text-[12px]">
                      <Switch defaultChecked />
                      <span className="text-muted-foreground">Auto-restart</span>
                    </div>
                  </div>
                  <Slider defaultValue={[64]} max={100} step={1} />
                </div>
              </div>
            </div>

            {/* Export CSS */}
            <div className="rounded-[16px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] overflow-hidden">
              <div className="border-b border-[color:var(--hairline)] px-4 h-10 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Export CSS
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCSS}
                  className="h-7 text-[11px] gap-1.5"
                >
                  {copied ? <Check size={12} className="neon-green" /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto bg-[color:var(--recessed-bg)] max-h-[320px]">
                <code className="text-[11px] font-mono text-[#e5e5ea] leading-relaxed whitespace-pre">
                  {generateCSS()}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
