import * as React from "react";
import { DataTable, SortableHeader } from "@/registry/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";

export const usage = `import { DataTable, SortableHeader } from "@/components/neoncite/data-table"
import { type ColumnDef } from "@tanstack/react-table"

type Node = { name: string; status: string; cpu: string }
const columns: ColumnDef<Node>[] = [
  { accessorKey: "name", header: ({ column }) => <SortableHeader column={column}>Node</SortableHeader> },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "cpu", header: "CPU" },
]
const data = [{ name: "alpha", status: "Online", cpu: "14%" }]

export function Demo() {
  return <DataTable columns={columns} data={data} searchKey="name" />
}`;

type DemoNode = { id: string; name: string; status: string; cpu: string; region: string };
const demoNodes: DemoNode[] = [
  { id: "n-01", name: "node-alpha", status: "Online", cpu: "14%", region: "us-east-1" },
  { id: "n-02", name: "node-bravo", status: "Online", cpu: "42%", region: "eu-west-1" },
  { id: "n-03", name: "node-charlie", status: "Degraded", cpu: "91%", region: "ap-south-1" },
  { id: "n-04", name: "node-delta", status: "Online", cpu: "23%", region: "us-west-2" },
  { id: "n-05", name: "node-echo", status: "Offline", cpu: "0%", region: "eu-central-1" },
];
const demoCols: ColumnDef<DemoNode>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column}>Node</SortableHeader>,
    cell: ({ row }) => <span className="font-mono text-[12px]">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.getValue("status") as string;
      const c = s === "Online" ? "neon-green" : s === "Degraded" ? "neon-yellow" : "neon-red";
      return <span className={`font-mono text-[11px] uppercase tracking-wider ${c}`}>{s}</span>;
    },
  },
  {
    accessorKey: "cpu",
    header: ({ column }) => <SortableHeader column={column}>CPU</SortableHeader>,
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => (
      <span className="font-mono text-[11px] text-muted-foreground">{row.getValue("region")}</span>
    ),
  },
];

export const preview = (
  <div className="w-full max-w-[480px]">
    <DataTable
      columns={demoCols}
      data={demoNodes}
      searchKey="name"
      searchPlaceholder="Filter nodes…"
      pageSize={5}
    />
  </div>
);
