import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

function Example({ onAction = () => {} }: { onAction?: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button">Open dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Example</DialogTitle>
        <DialogDescription>Dialog description</DialogDescription>
        <button type="button" onClick={onAction}>
          Confirm
        </button>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("renders closed without crashing and opens from its trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    expect(screen.getByRole("dialog", { name: "Example" })).toBeInTheDocument();
  });

  it("dismisses on Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open dialog" });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps Tab focus within the open dialog", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    const dialog = screen.getByRole("dialog");
    for (let index = 0; index < 4; index += 1) await user.tab();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it("fires child actions", async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();
    render(<Example onAction={onAction} />);
    await user.click(screen.getByRole("button", { name: "Open dialog" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
