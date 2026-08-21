import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/ui/command";

function Example({ onSelect = () => {} }: { onSelect?: (value: string) => void }) {
  return (
    <Command>
      <CommandInput aria-label="Command search" placeholder="Search commands" />
      <CommandList>
        <CommandEmpty>No matches</CommandEmpty>
        <CommandItem value="deploy" onSelect={onSelect}>
          Deploy
        </CommandItem>
        <CommandItem value="rollback" onSelect={onSelect}>
          Rollback
        </CommandItem>
      </CommandList>
    </Command>
  );
}

describe("Command", () => {
  it("renders without crashing and exposes the search field", () => {
    render(<Example />);
    expect(screen.getByRole("textbox", { name: "Command search" })).toHaveAttribute(
      "placeholder",
      "Search commands",
    );
  });

  it("filters command items from search input", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.type(screen.getByRole("textbox", { name: "Command search" }), "roll");
    expect(screen.getByText("Rollback")).toBeInTheDocument();
    expect(screen.queryByText("Deploy")).not.toBeInTheDocument();
  });

  it("selects with keyboard navigation", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Example onSelect={onSelect} />);
    const input = screen.getByRole("textbox", { name: "Command search" });
    await user.click(input);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("selects with pointer interaction and exposes item semantics", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Example onSelect={onSelect} />);
    const item = screen.getByText("Deploy");
    expect(item.closest("[cmdk-item]"))toBeTruthy();
    await user.click(item);
    expect(onSelect).toHaveBeenCalledWith("deploy");
  });
});
