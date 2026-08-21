import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/theme-builder")({
  beforeLoad: () => {
    throw redirect({ to: "/themes" });
  },
});
