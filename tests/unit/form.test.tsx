import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { Input } from "@/registry/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/ui/form";

type Values = { name: string };

function Example({ onSubmit }: { onSubmit: (values: Values) => void }) {
  const form = useForm<Values>({ defaultValues: { name: "" } });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Public display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Save</button>
      </form>
    </Form>
  );
}

describe("Form", () => {
  it("renders without crashing and labels its control", () => {
    render(<Example onSubmit={() => {}} />);
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(input.getAttribute("aria-describedby")).toBeTruthy();
  });

  it("shows validation errors and marks the input invalid", async () => {
    const user = userEvent.setup();
    render(<Example onSubmit={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute("aria-invalid", "true");
  });

  it("submits valid values", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Example onSubmit={onSubmit} />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await user.type(input, "Ada");
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit.mock.calls[0]?.[0]).toEqual({ name: "Ada" });
  });

  it("supports Tab and Enter form submission", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Example onSubmit={onSubmit} />);
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
    await user.type(screen.getByRole("textbox", { name: "Name" }), "Grace");
    await user.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalled();
  });
});
