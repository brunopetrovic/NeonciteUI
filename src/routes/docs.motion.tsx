import { createFileRoute } from "@tanstack/react-router";
import { MotionLab } from "@/components/docs/MotionLab";

export const Route = createFileRoute("/docs/motion")({
  head: () => ({
    meta: [
      { title: "Motion Lab — Neoncite/UI" },
      {
        name: "description",
        content:
          "Tune Neoncite motion recipes, inspect CSS and React source, and copy reduced-motion-aware interaction contracts.",
      },
    ],
  }),
  component: MotionLabPage,
});

function MotionLabPage() {
  return <MotionLab />;
}
