import { Bell, KeyRound, User } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Label } from "@/registry/ui/label";
import { Separator } from "@/registry/ui/separator";
import { Switch } from "@/registry/ui/switch";

export function SettingsPanel() {
  return (
    <div className="grid gap-5 rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] p-5 md:grid-cols-[200px_1fr]">
      <nav className="space-y-1 font-mono text-[11px] uppercase tracking-wider">
        <button className="flex w-full items-center gap-2 rounded-[9px] border border-[color:var(--neon-pink)]/30 bg-[color:var(--neon-pink)]/10 px-3 py-2 text-[color:var(--neon-pink)]">
          <User className="h-3.5 w-3.5" /> Profile
        </button>
        <button className="flex w-full items-center gap-2 rounded-[9px] px-3 py-2 text-muted-foreground">
          <Bell className="h-3.5 w-3.5" /> Notifications
        </button>
        <button className="flex w-full items-center gap-2 rounded-[9px] px-3 py-2 text-muted-foreground">
          <KeyRound className="h-3.5 w-3.5" /> Security
        </button>
      </nav>
      <div>
        <h3 className="font-mono text-lg font-bold text-foreground">Profile settings</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Demo settings surface using Neoncite form primitives.
        </p>
        <Separator className="my-5" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="settings-name">Display name</Label>
            <Input id="settings-name" className="mt-2" defaultValue="Operator 07" />
          </div>
          <div>
            <Label htmlFor="settings-email">Email</Label>
            <Input id="settings-email" className="mt-2" defaultValue="operator@example.com" />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4">
          <div>
            <div className="text-sm text-foreground">Operational alerts</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Receive critical runtime notifications.
            </div>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </div>
  );
}
