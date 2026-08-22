import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

function Example({ onValueChange = () => {} }: { onValueChange?: (value: string) => void }) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger aria-label="Environment">
        <SelectValue placeholder="Choose environment" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">Development</SelectItem>
        <SelectItem value="prod">Production</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders without crashing with the expected combobox semantics", () => {
    render(<Example />);
    const trigger = screen.getByRole("combobox", { name: "Environment" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Choose environment")).toBeInTheDocument();
  });

  it("renders options and changes value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Example onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox", { name: "Environment" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const option = await screen.findByRole("option", { name: "Production" });
    expect(option).toHaveAttribute("aria-selected", "false");
    await user.click(option);
    expect(onValueChange).toHaveBeenCalledWith("prod");
    expect(trigger).toHaveTextContent("Production");
  });

  it("supports Arrow key and Enter selection", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Example onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox", { name: "Environment" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalled();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("combobox", { name: "Environment" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
