import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/registry/ui/button";

const variants = ["default", "primary", "neon", "ghost", "outline", "destructive"] as const;
const variantClass = {
  default: "from-[color:var(--surface-3)]",
  primary: "bg-[color:var(--neon-pink)]",
  neon: "border-[color:var(--neon-cyan)]/40",
  ghost: "bg-transparent",
  outline: "bg-[color:var(--surface-1)]",
  destructive: "bg-[color:var(--neon-red)]",
} as const;
const sizes = ["sm", "md", "lg", "icon"] as const;
const sizeClass = { sm: "h-8", md: "h-10", lg: "h-12", icon: "size-10" } as const;

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button>Run</Button>);
    expect(screen.getByRole("button", { name: "Run" })).toBeInTheDocument();
  });

  for (const variant of variants) {
    for (const size of sizes) {
      it(`renders ${variant}/${size} classes`, () => {
        render(
          <Button variant={variant} size={size} aria-label={size === "icon" ? "Run" : undefined}>
            Run
          </Button>,
        );
        const button = screen.getByRole("button", { name: "Run" });
        expect(button.className).toContain(variantClass[variant]);
        expect(button.className).toContain(sizeClass[size]);
      });
    }
  }

  it("forwards disabled state and suppresses click", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports asChild without adding an extra button", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button asChild onClick={onClick}>
        <a href="#target">Open target</a>
      </Button>,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Open target" });
    await user.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires click from mouse, Enter, and Space", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Execute</Button>);
    const button = screen.getByRole("button", { name: "Execute" });
    await user.click(button);
    button.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
