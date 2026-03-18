import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { DocsSidebar } from "./sidebar";
import { useScrollbar } from "../ui/use-scrollbar";
import { SearchDialog, useSearchDialog } from "./search-command";

/** @refresh reset */
export default function DocsLayout() {
  const contentRef = useScrollbar<HTMLDivElement>();
  const search = useSearchDialog();
  const { pathname } = useLocation();
  const [routeAnnouncement, setRouteAnnouncement] = useState("");

  /* Reset content scroll to top on every route change */
  useEffect(() => {
    const el = contentRef.current;
    if (el) el.scrollTop = 0;
  }, [pathname]);

  /* WCAG 4.1.3: Announce route changes to screen readers */
  useEffect(() => {
    // Extract a readable page name from the pathname
    const segments = pathname.split("/").filter(Boolean);
    const pageName = segments.length > 0
      ? segments[segments.length - 1]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : "Overview";
    setRouteAnnouncement(`Navigated to ${pageName}`);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-[var(--duration-short-4)]" style={{ backgroundColor: "var(--background)", fontFamily: "var(--font-family-supreme)", color: "var(--foreground)" }}>
      {/* WCAG 2.4.1: Skip to main content link */}
      <a href="#main-content" className="hx-skip-link">
        Skip to main content
      </a>

      <DocsSidebar />

      {/* WCAG 1.3.1: Main landmark for content area */}
      <main
        id="main-content"
        ref={contentRef}
        className="flex flex-col flex-1 min-w-0 h-full overflow-y-auto"
        tabIndex={-1}
      >
        <Outlet context={search} />
      </main>

      <SearchDialog open={search.open} onClose={search.onClose} />

      {/* WCAG 4.1.3: Live region for route change announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {routeAnnouncement}
      </div>
    </div>
  );
}

export { DocsLayout };
