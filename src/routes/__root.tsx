import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  ScrollRestoration,
} from "@tanstack/react-router";
import React from "react";

import appCss from "../styles.css?url";
import "../styles.css";
import { Toaster } from "@/registry/ui/sonner";
import { CommandPaletteProvider } from "@/components/site/CommandPalette";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] neon-pink">Signal lost</p>
        <h1 className="mt-3 font-mono text-7xl font-bold tracking-tighter neon-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The route does not exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[10px] border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,42,157,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(255,42,157,0.45)]"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] neon-red">Runtime fault</p>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something failed while rendering this route. Retry the request or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-[10px] bg-[color:var(--neon-pink)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[color:var(--surface-2)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neoncite/UI — Machined components for the web" },
      {
        name: "description",
        content:
          "An opinionated React component library with OLED-black surfaces, hardware rim lighting, and neon accents. Built on Radix UI and Tailwind CSS v4.",
      },
      { name: "author", content: "Neoncite" },
      { property: "og:title", content: "Neoncite/UI — Machined components for the web" },
      {
        property: "og:description",
        content:
          "OLED-black surfaces, hardware rim lighting, and neon accents. Source components built on Radix UI and Tailwind CSS v4.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Neoncite/UI" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[100] rounded-[10px] bg-[color:var(--neon-pink)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white focus:not-sr-only"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <CommandPaletteProvider>
        <ScrollRestoration />
        <div id="main-content">
          <Outlet />
        </div>
        <Toaster />
      </CommandPaletteProvider>
    </QueryClientProvider>
  );
}
