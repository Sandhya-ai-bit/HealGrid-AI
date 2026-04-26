import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "../components/shared/Navbar";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-gradient-cyan">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Signal Lost</h2>
        <p className="mt-2 text-sm text-muted-foreground">The intelligence node you're searching for doesn't exist in the grid.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-lg bg-gradient-cyan px-5 py-2.5 text-sm font-semibold text-background glow-cyan hover:scale-105 transition-transform">
            Return to Grid
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HEALGRID AI — India's Healthcare Intelligence Grid" },
      { name: "description", content: "Agentic AI that transforms 10,000+ Indian medical facility records into trustworthy, explainable healthcare intelligence." },
      { name: "author", content: "HEALGRID" },
      { property: "og:title", content: "HEALGRID AI — India's Healthcare Intelligence Grid" },
      { property: "og:description", content: "Detect capabilities. Expose contradictions. Map the underserved." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
    </div>
  );
}
