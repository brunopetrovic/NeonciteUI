import { Badge } from "@/registry/ui/badge";
import { Label } from "@/registry/ui/label";
import { Input } from "@/registry/ui/input";
import { Checkbox } from "@/registry/ui/checkbox";
import { Button } from "@/registry/ui/button";

export function AuthSignin() {
  return (
    <div className="grid md:grid-cols-2 gap-0 rounded-[20px] border border-[color:var(--hairline)] overflow-hidden">
      <div className="relative bg-[color:var(--surface-1)] p-10 hidden md:flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-[color:var(--neon-pink)]/15 blur-[100px]" />
        <div className="relative">
          <Badge variant="pink">Neoncite/UI</Badge>
          <h2 className="mt-6 text-[28px] font-mono font-bold tracking-tighter neon-white leading-tight">
            Welcome back,
            <br />
            <span className="neon-cyan">operator.</span>
          </h2>
        </div>
        <p className="relative font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Encrypted · WebAuthn · Audit-logged
        </p>
      </div>
      <div className="bg-[color:var(--surface-0)] p-8 md:p-10">
        <h3 className="text-[20px] font-mono font-semibold neon-white mb-1">Sign in</h3>
        <p className="text-[13px] text-muted-foreground mb-6">Use your work email to continue.</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <Label htmlFor="b-email">Email</Label>
            <Input id="b-email" type="email" placeholder="you@studio.dev" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="b-pw">Password</Label>
              <a
                href="#"
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Forgot
              </a>
            </div>
            <Input id="b-pw" type="password" placeholder="••••••••" />
          </div>
          <label className="flex items-center gap-2 text-[12px] text-muted-foreground select-none cursor-pointer">
            <Checkbox defaultChecked /> Remember this device
          </label>
          <Button variant="primary" className="w-full">
            Sign in →
          </Button>
          <p className="text-center text-[12px] text-muted-foreground">
            No account?{" "}
            <a href="#" className="text-foreground hover:text-[color:var(--neon-pink)]">
              Request access
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
