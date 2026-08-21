import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "@/registry/ui/input";

describe("Input", () => {
  it("renders without crashing and forwards placeholder", () => {
    render(<Input aria-label="Name" placeholder="Ada" />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("placeholder", "Ada");
  });

  it("binds value and fires change events", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input aria-label="Name" defaultValue="A" onChange={onChange} />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await user.click(input);
    await user.keyboard("da");
    expect(input).toHaveValue("Ada");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("forwards disabled state", () => {
    render(<Input aria-label="Disabled field" disabled />);
    expect(screen.getByRole("textbox", { name: "Disabled field" })).toBeDisabled();
  });

  it("styles and exposes invalid state", () => {
    render(<Input aria-label="Email" aria-invalid="true" />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.className).toContain("aria-invalid:border-[color:var(--neon-red)]");
  });

  it("participates in keyboard tab order", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Before</button>
        <Input aria-label="Focusable input" />
      </>,
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Focusable input" })).toHaveFocus();
  });
});
