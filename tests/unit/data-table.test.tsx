import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef } from "@tanstack/react-table";
import { describe, expect, it } from "vitest";
import { DataTable, SortableHeader } from "@/registry/ui/data-table";

type Row = { name: string; status: string };

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
  },
  { accessorKey: "status", header: "Status" },
];
const data: Row[] = [
  { name: "Beta", status: "healthy" },
  { name: "Alpha", status: "warning" },
  { name: "Gamma", status: "healthy" },
];

describe("DataTable", () => {
  it("renders without crashing with table semantics", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /Name/ })).toBeInTheDocument();
  });

  it("sorts from a keyboard-activatable header", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);
    const sort = screen.getByRole("button", { name: "Name" });
    sort.focus();
    await user.keyboard("{Enter}");
    const firstDataRow = screen.getAllByRole("row")[1];
    expect(within(firstDataRow).getByText("Alpha")).toBeInTheDocument();
  });

  it("filters rows using the labeled filter input", async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Filter names"
      />,
    );
    const filter = screen.getByRole("textbox", { name: "Filter names" });
    await user.type(filter, "Gam");
    expect(screen.getByText("Gamma")).toBeInTheDocument();
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
  });

  it("paginates with accessible icon-only controls", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} pageSize={2} />);
    const previous = screen.getByRole("button", { name: "Previous page" });
    const next = screen.getByRole("button", { name: "Next page" });
    expect(previous).toBeDisabled();
    expect(next).toBeEnabled();
    await user.click(next);
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(next).toBeDisabled();
    expect(previous).toBeEnabled();
  });
});
