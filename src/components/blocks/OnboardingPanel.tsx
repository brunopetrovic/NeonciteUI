import { Check, Rocket, ShieldCheck, Terminal } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { Stepper } from "@/registry/ui/stepper";

export function OnboardingPanel() {
  const steps = [{ title: "Connect" }, { title: "Configure" }, { title: "Deploy" }];
  return (
    <div className="rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] p-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] border border-[color:var(--neon-pink)]/35 bg-[color:var(--neon-pink)]/10 text-[color:var(--neon-pink)]">
            <Rocket className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-mono text-2xl font-bold text-foreground">
            Initialize your workspace
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            A technical onboarding surface for connecting a runtime, validating configuration, and
            shipping the first deployment.
          </p>
        </div>
        <div className="my-8">
          <Stepper items={steps} current={1} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[13px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4">
            <Terminal className="h-4 w-4 text-[color:var(--neon-cyan)]" />
            <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-foreground">
              CLI connected
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Workspace token detected.</div>
            <div className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] text-[color:var(--neon-green)]">
              <Check className="h-3 w-3" /> Ready
            </div>
          </div>
          <div className="rounded-[13px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4">
            <ShieldCheck className="h-4 w-4 text-[color:var(--neon-purple)]" />
            <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-foreground">
              Configuration
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Review environment and permissions.
            </div>
            <Button className="mt-3" size="sm" variant="outline">
              Review config
            </Button>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary">Continue to deploy</Button>
        </div>
      </div>
    </div>
  );
}
