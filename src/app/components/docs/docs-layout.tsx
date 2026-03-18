import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { DocsSidebar } from "./sidebar";
import { useScrollbar } from "../ui/use-scrollbar";
import { SearchDialog, useSearchDialog } from "./search-command";

/** @refresh reset */
export default function DocsLayout() {
  const contentRef = useScrollbar<HTMLDivElement>();
  const search = useSearchDialog();
  const { pathname } = useLocation();

  /* Reset content scroll to top on every route change */
  useEffect(() => {
    const el = contentRef.current;
    if (el) el.scrollTop = 0;
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-[var(--duration-short-4)]" style={{ backgroundColor: "var(--background)", fontFamily: "var(--font-family-supreme)", color: "var(--foreground)" }}>
      <DocsSidebar />
      <div ref={contentRef} className="flex-1 min-w-0 h-full overflow-y-auto">
        <Outlet context={search} />
      </div>
      <SearchDialog open={search.open} onClose={search.onClose} />
    </div>
  );
}

export { DocsLayout };