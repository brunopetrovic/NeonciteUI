import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import * as React from "react";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

const sections = [
  {
    label: "Getting started",
    items: [
      { to: "/docs/", label: "Overview" },
      { to: "/docs/installation", label: "Installation" },
      { to: "/docs/cli", label: "CLI" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { to: "/docs/theming", label: "Theming" },
      { to: "/docs/motion", label: "Motion Lab" },
      { to: "/docs/dark-mode", label: "Dark-only design" },
      { to: "/docs/accessibility", label: "Accessibility" },
    ],
  },
  {
    label: "Project",
    items: [
      { to: "/docs/roadmap", label: "Roadmap" },
      { to: "/changelog", label: "Changelog" },
    ],
  },
];

function SidebarContent({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.label} className="mb-6">
          <h4 className="mb-2 px-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {section.label}
          </h4>
          <nav className="flex flex-col gap-0.5" aria-label={`${section.label} documentation`}>
            {section.items.map((item) => {
              const active =
                item.to === "/docs/" ? path === "/docs" || path === "/docs/" : path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "rounded-[8px] border px-3 py-1.5 text-[13px] transition-colors",
                    active
                      ? "border-[color:var(--hairline)] bg-white/[0.06] text-foreground"
                      : "border-transparent text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </>
  );
}

function DocsLayout() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--surface-0)]">
      <SiteHeader />
      <div className="flex-1 mx-auto w-full max-w-[1300px] px-4 md:px-8 py-8 grid md:grid-cols-[220px_1fr] gap-10">
        <aside
          className="hidden md:block sticky top-20 self-start"
          aria-label="Documentation sidebar"
        >
          <SidebarContent path={path} />
        </aside>

        <div className="md:hidden flex items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-expanded={sidebarOpen}
            aria-controls="docs-mobile-navigation"
            className="flex items-center gap-2 h-8 px-3 rounded-[8px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] text-[12px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
            Docs menu
          </button>
        </div>

        {sidebarOpen && (
          <div
            id="docs-mobile-navigation"
            className="md:hidden rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-3 -mt-2 mb-4"
          >
            <SidebarContent path={path} onNavigate={() => setSidebarOpen(false)} />
          </div>
        )}

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
