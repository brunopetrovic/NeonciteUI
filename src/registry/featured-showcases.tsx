import * as React from "react";
import { Button } from "@/registry/ui/button";
import { CommandBar } from "@/registry/ui/command-bar";
import { DataTable } from "@/registry/ui/data-table";
import { Gauge } from "@/registry/ui/gauge";
import { ServerCard } from "@/registry/ui/server-card";
import { Terminal, TerminalLine, TerminalOutput } from "@/registry/ui/terminal";

export const FEATURED_SLUGS = [
  "button",
  "data-table",
  "terminal",
  "server-card",
  "gauge",
  "command-bar",
] as const;

const rows = [
  { service: "api-edge", region: "fra-1", status: "Ready" },
  { service: "worker-sync", region: "iad-1", status: "Building" },
];

const columns = [
  { accessorKey: "service", header: "Service" },
  { accessorKey: "region", header: "Region" },
  { accessorKey: "status", header: "Status" },
];

function ButtonShowcase() {
  return <Button variant="primary">Deploy</Button>;
}

function DataTableShowcase() {
  return (
    <div className="w-[260px] scale-[.72] origin-center">
      <DataTable columns={columns} data={rows} />
    </div>
  );
}

function TerminalShowcase() {
  return (
    <Terminal className="w-[280px]" status="ready">
      <TerminalLine>neoncite doctor</TerminalLine>
      <TerminalOutput>{`registry: ok\nbuild: ready`}</TerminalOutput>
    </Terminal>
  );
}

function ServerCardShowcase() {
  return (
    <div className="w-[260px] scale-[.72] origin-center">
      <ServerCard name="edge-07" region="fra-1" cpu={34} memory={61} storage={48} />
    </div>
  );
}

function GaugeShowcase() {
  return <Gauge value={72} label="CPU" unit="%" />;
}

function CommandBarShowcase() {
  return (
    <div className="w-[280px]">
      <CommandBar>Search systems…</CommandBar>
    </div>
  );
}

// This registry intentionally exports component references as data, not a React component.
// eslint-disable-next-line react-refresh/only-export-components
export const FEATURED_SHOWCASES: Record<string, React.ComponentType> = {
  button: ButtonShowcase,
  "data-table": DataTableShowcase,
  terminal: TerminalShowcase,
  "server-card": ServerCardShowcase,
  gauge: GaugeShowcase,
  "command-bar": CommandBarShowcase,
};
