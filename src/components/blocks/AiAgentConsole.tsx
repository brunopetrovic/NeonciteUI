import { Bot, Send } from "lucide-react";
import { Button } from "@/registry/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/ui/input-group";
import { LogViewer } from "@/registry/ui/log-viewer";
import { StatusIndicator } from "@/registry/ui/status-indicator";
import { Terminal, TerminalLine, TerminalOutput } from "@/registry/ui/terminal";

export function AiAgentConsole() {
  return (
    <div className="grid gap-4 rounded-[18px] border border-[color:var(--hairline)] bg-[color:var(--surface-0)] p-5 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-[color:var(--neon-purple)]" />
            <span className="font-mono text-sm font-semibold text-foreground">Operator Agent</span>
          </div>
          <StatusIndicator status="online">Ready</StatusIndicator>
        </div>
        <div className="space-y-3 rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4 text-sm">
          <div className="rounded-[10px] bg-white/[.04] p-3 text-muted-foreground">
            Inspect the latest deployment and surface anything that needs attention.
          </div>
          <div className="ml-6 rounded-[10px] border border-[color:var(--neon-purple)]/25 bg-[color:var(--neon-purple)]/[.05] p-3 text-foreground">
            The deployment is healthy. One warning: p95 latency is 184ms in fra-1, 4ms above target.
          </div>
        </div>
        <InputGroup>
          <InputGroupAddon>
            <Bot className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Ask the agent…" />
          <InputGroupAddon>
            <Button size="icon" variant="ghost" aria-label="Send">
              <Send className="h-4 w-4" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="space-y-4">
        <Terminal status="agent/tool">
          <TerminalLine prompt=">">inspect deployment api-edge</TerminalLine>
          <TerminalOutput>{`status: ready\nregions: 12\np95: 184ms`}</TerminalOutput>
        </Terminal>
        <LogViewer
          compact
          entries={[
            {
              timestamp: "14:22:01",
              level: "info",
              message: "tool call: deployment.get",
              source: "agent",
            },
            {
              timestamp: "14:22:02",
              level: "success",
              message: "result received",
              source: "agent",
            },
            {
              timestamp: "14:22:02",
              level: "warn",
              message: "latency threshold exceeded",
              source: "fra-1",
            },
          ]}
        />
      </div>
    </div>
  );
}
