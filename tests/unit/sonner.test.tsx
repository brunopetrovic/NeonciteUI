import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toaster, toast } from "@/registry/ui/sonner";

describe("Sonner", () => {
  it("renders the toaster without crashing", () => {
    const view = render(<Toaster />);
    expect(view.unmount).toBeTypeOf("function");
  });

  it("shows and dismisses a toast", async () => {
    render(<Toaster />);
    const id = toast("Saved");
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    toast.dismiss(id);
    await waitFor(() => expect(screen.queryByText("Saved")).not.toBeInTheDocument());
  });

  it("renders semantic variants", async () => {
    render(<Toaster />);
    toast.success("Healthy");
    toast.error("Failed");
    toast.warning("Warning");
    toast.info("Information");
    expect(await screen.findByText("Healthy")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByText("Information")).toBeInTheDocument();
  });
});
