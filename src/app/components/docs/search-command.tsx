import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  X,
  CornerDownLeft,
  LayoutGrid,
  BookOpen,
  Palette,
  Component,
  Coins,
  BarChart3,
  Shield,
  Wallet,
  Settings,
  HelpCircle,
  MoreHorizontal,
} from "lucide-react";
import { searchEntries, searchIndex, type SearchEntry } from "./search-index";
import { NoResultsIllustration } from "../ui/no-results-illustration";

/* ── Search categories ───────────────────────── */
export interface SearchCategory {
  id: string;
  label: string;
  icon: ReactNode;
  /** Filter function: returns true if the entry belongs to this category */
  filter?: (entry: SearchEntry) => boolean;
}

/** Default categories for the design system docs */
const DS_CATEGORIES: SearchCategory[] = [
  { id: "all", label: "All", icon: <LayoutGrid size={20} /> },
  {
    id: "getting-started",
    label: "Getting Started",
    icon: <BookOpen size={20} />,
    filter: (e) => e.category === "Getting Started",
  },
  {
    id: "foundation",
    label: "Foundation",
    icon: <Palette size={20} />,
    filter: (e) => e.category === "Foundation",
  },
  {
    id: "components",
    label: "Components",
    icon: <Component size={20} />,
    filter: (e) => e.category === "Components",
  },
];

/**
 * HollaEx app categories — exported so they can be swapped in later.
 * Each has a placeholder filter; wire up real data when building the app.
 */
export const HX_APP_CATEGORIES: SearchCategory[] = [
  { id: "all", label: "All", icon: <LayoutGrid size={20} /> },
  { id: "assets", label: "Assets & Tokens", icon: <Coins size={20} /> },
  { id: "trading", label: "Trading Tools", icon: <BarChart3 size={20} /> },
  { id: "security", label: "Account & Security", icon: <Shield size={20} /> },
  { id: "wallet", label: "Wallet", icon: <Wallet size={20} /> },
  { id: "settings", label: "Settings & Interface", icon: <Settings size={20} /> },
  { id: "support", label: "Support", icon: <HelpCircle size={20} /> },
  { id: "other", label: "Other", icon: <MoreHorizontal size={20} /> },
];

/* ── Recent search chip ──────────────────────── */
interface RecentChip {
  label: string;
  icon?: ReactNode;
}

const RECENT_SEARCHES: RecentChip[] = [
  { label: "Button" },
  { label: "Colors" },
  { label: "Input" },
  { label: "Table" },
  { label: "Tabs" },
];

/* ── Category icons for result items ─────────── */
const CATEGORY_RESULT_ICONS: Record<string, ReactNode> = {
  "Getting Started": <BookOpen size={20} />,
  Foundation: <Palette size={20} />,
  Components: <Component size={20} />,
};

/* ── Search trigger button for breadcrumb bar ── */
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform?.toLowerCase().includes("mac") ?? true);
  }, []);

  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        height: "34px",
        padding: "0 var(--space-3)",
        borderRadius: "var(--radius)",
        border: "none",
        backgroundColor: "var(--secondary)",
        color: "var(--color-text-tertiary)",
        fontFamily: "var(--font-family-supreme)",
        fontSize: "12px",
        cursor: "pointer",
        transition: "all 0.15s ease",
        minWidth: "200px",
      }}
    >
      <Search size={14} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />
      <span style={{ flex: 1, textAlign: "left" }}>Search...</span>
      <kbd
        style={{
          fontSize: "10px",
          fontFamily: "var(--font-family-supreme)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text-tertiary)",
          backgroundColor: "var(--background)",
          border: "none",
          borderRadius: "var(--radius-xs)",
          padding: "var(--space-1) var(--space-2)",
          lineHeight: 1,
        }}
      >
        {isMac ? "\u2318" : "Ctrl+"}K
      </kbd>
    </button>
  );
}

/* ── Search dialog (Figma-based wide layout) ─── */
export function SearchDialog({
  open,
  onClose,
  categories = DS_CATEGORIES,
}: {
  open: boolean;
  onClose: () => void;
  categories?: SearchCategory[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Animation state: mounted keeps the DOM alive during exit animation
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Trigger enter animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      // Wait for exit animation to finish before unmounting
      const timer = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Filter entries by category and query
  const allResults: SearchEntry[] = query.trim()
    ? searchEntries(query)
    : searchIndex;

  const activeCat = categories.find((c) => c.id === activeCategory);
  const results =
    activeCat?.filter
      ? allResults.filter(activeCat.filter)
      : allResults;

  const grouped = groupByCategory(results);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveCategory("all");
      setActiveIndex(0);
      // Delay focus slightly so animation has started
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Reset active index when results/query/category change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, activeCategory]);

  // Scroll active item into view
  useEffect(() => {
    if (!resultsRef.current) return;
    const active = resultsRef.current.querySelector('[data-active="true"]');
    if (active) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const goTo = useCallback(
    (entry: SearchEntry) => {
      navigate(entry.href);
      onClose();
    },
    [navigate, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        goTo(results[activeIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [results, activeIndex, goTo, onClose]
  );

  const handleChipClick = useCallback(
    (label: string) => {
      setQuery(label);
      inputRef.current?.focus();
    },
    []
  );

  // Global Cmd/Ctrl+K & Escape listener
  useEffect(() => {
    function handleGlobal(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (open && e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", handleGlobal);
    return () => window.removeEventListener("keydown", handleGlobal);
  }, [open, onClose]);

  if (!mounted) return null;

  let flatIndex = -1;

  return (
    <>
      {/* Backdrop — heavy frosted overlay, slightly stronger toward bottom */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          backgroundColor: "var(--search-overlay-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.94) 60%, rgba(0,0,0,0.98) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.94) 60%, rgba(0,0,0,0.98) 100%)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Grain texture overlay — heavy noise, same directional mask */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          opacity: visible ? 0.6 : 0,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.94) 60%, rgba(0,0,0,0.98) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.94) 60%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      {/* Dialog wrapper (positions dialog + external close button) */}
      <div
        style={{
          position: "fixed",
          top: "min(12%, 100px)",
          left: "50%",
          transform: visible
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(8px)",
          zIndex: 101,
          width: "min(920px, calc(100vw - 48px))",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close button — outside right side */}
        <button
          onClick={onClose}
          aria-label="Close search"
          style={{
            position: "absolute",
            top: "0px",
            right: "-48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-circle)",
            border: "none",
            backgroundColor: "var(--search-close-bg)",
            color: "var(--search-close-fg)",
            cursor: "pointer",
            transition: "background-color 0.15s ease, color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--search-close-hover-bg)";
            e.currentTarget.style.color = "var(--search-close-hover-fg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--search-close-bg)";
            e.currentTarget.style.color = "var(--search-close-fg)";
          }}
        >
          <X size={18} />
        </button>

        {/* Dialog card */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          style={{
            width: "100%",
            maxHeight: "calc(100vh - min(24vh, 200px))",
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            backgroundColor: "var(--search-dialog-bg)",
            boxShadow: "var(--search-dialog-shadow)",
            overflow: "hidden",
            fontFamily: "var(--font-family-supreme)",
          }}
        >
          {/* ── Top bar: Search input + Search button ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-5)",
              padding: "var(--space-8) var(--space-8) var(--space-7) var(--space-8)",
            }}
          >
            {/* Search input area */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "var(--space-3)",
                backgroundColor: "var(--search-input-bg)",
                borderRadius: "var(--radius-card)",
                padding: "0 var(--space-5)",
                height: "56px",
                position: "relative",
              }}
            >
              <Search
                size={20}
                style={{ color: "var(--search-fg-tertiary)", flexShrink: 0 }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for coins, functions & more"
                aria-label="Search the design system"
                aria-autocomplete="list"
                aria-controls="hx-search-results"
                aria-activedescendant={results[activeIndex] ? `hx-search-result-${activeIndex}` : undefined}
                role="combobox"
                aria-expanded={results.length > 0}
                data-focus-custom
                className="hx-search-input"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: "16px",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--search-input-fg)",
                  lineHeight: "28px",
                }}
              />
              {/* Enter badge — only visible when user has typed a query */}
              {query.trim().length > 0 && (
                <kbd
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "3px var(--space-3)",
                    borderRadius: "var(--radius)",
                    backgroundColor: "var(--search-chip-bg)",
                    border: "1px solid var(--search-chip-border)",
                    color: "var(--search-fg-tertiary)",
                    fontFamily: "var(--font-family-supreme)",
                    fontWeight: "var(--font-weight-medium)",
                    fontSize: "11px",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  <CornerDownLeft size={11} />
                  Enter
                </kbd>
              )}
              {/* Bottom border line */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  backgroundColor: "var(--search-input-border)",
                }}
              />
            </div>

            {/* Search button */}
            <button
              onClick={() => {
                if (results[activeIndex]) goTo(results[activeIndex]);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "56px",
                padding: "0 var(--space-8)",
                borderRadius: "var(--radius-card)",
                border: "none",
                backgroundColor: "var(--search-btn-bg)",
                color: "var(--search-btn-fg)",
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "16px",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--search-btn-hover-bg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--search-btn-bg)")
              }
            >
              Search
            </button>
          </div>

          {/* ── Recent searches row ────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              padding: "0 var(--space-8) var(--space-6)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--search-fg)",
                whiteSpace: "nowrap",
              }}
            >
              Recent Searches:
            </span>
            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              {RECENT_SEARCHES.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleChipClick(chip.label)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "36px",
                    padding: "0 var(--space-4)",
                    borderRadius: "var(--radius-chip)",
                    backgroundColor: "var(--search-chip-bg)",
                    border: "1px solid var(--search-chip-border)",
                    color: "var(--search-chip-fg)",
                    fontFamily: "var(--font-family-supreme)",
                    fontWeight: "var(--font-weight-medium)",
                    fontSize: "var(--text-label)",
                    cursor: "pointer",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  {chip.icon}
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Two-column body ────────────────────────── */}
          <div
            style={{
              display: "flex",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* Left: Category nav */}
            <nav
              aria-label="Search categories"
              style={{
                width: "260px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "0 16px 24px 32px",
                overflowY: "auto",
              }}
              className="hx-hide-scrollbar"
            >
              {categories.map((cat) => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                      padding: "var(--space-3) var(--space-5)",
                      borderRadius: "var(--radius-card)",
                      border: "none",
                      backgroundColor: isActive
                        ? "var(--search-category-active-bg)"
                        : "transparent",
                      color: isActive
                        ? "var(--search-category-active-fg)"
                        : "var(--search-category-fg)",
                      fontFamily: "var(--font-family-supreme)",
                      fontWeight: "var(--font-weight-regular)",
                      fontSize: "16px",
                      lineHeight: "28px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.12s ease",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "24px",
                        height: "24px",
                        color: isActive
                          ? "var(--search-category-active-icon-fg)"
                          : "var(--search-category-icon-fg)",
                        flexShrink: 0,
                        transition: "color 0.12s ease",
                      }}
                    >
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Results */}
            <div
              ref={resultsRef}
              id="hx-search-results"
              role="listbox"
              aria-label="Search results"
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "0 var(--space-8) var(--space-7) var(--space-3)",
                minHeight: 0,
              }}
              className="hx-hide-scrollbar"
            >
              {results.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center"
                  style={{
                    padding: "var(--space-10) var(--space-5)",
                    textAlign: "center",
                    color: "var(--search-fg-tertiary)",
                    gap: "var(--space-5)",
                  }}
                >
                  <NoResultsIllustration />
                  <div className="flex flex-col items-center" style={{ gap: "var(--space-2)" }}>
                    <span
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: "var(--font-weight-medium)" as any,
                        color: "var(--foreground)",
                        fontFamily: "var(--font-family-supreme)",
                      }}
                    >
                      No results found
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--search-fg-tertiary)",
                        fontFamily: "var(--font-family-supreme)",
                      }}
                    >
                      Nothing matched &ldquo;{query}&rdquo;. Try a different search term.
                    </span>
                  </div>
                </div>
              ) : (
                grouped.map(([category, entries]) => (
                  <div key={category} style={{ marginBottom: "var(--space-3)" }}>
                    {/* Section label */}
                    <div
                      style={{
                        padding: "var(--space-3) 0",
                        fontSize: "var(--text-base)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--search-section-label-fg)",
                      }}
                    >
                      {category}
                    </div>

                    {/* Result items */}
                    {entries.map((entry) => {
                      flatIndex++;
                      const isActive = flatIndex === activeIndex;
                      const idx = flatIndex;

                      return (
                        <button
                          key={entry.href}
                          id={`hx-search-result-${idx}`}
                          role="option"
                          aria-selected={isActive}
                          data-active={isActive}
                          onClick={() => goTo(entry)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            width: "100%",
                            padding: "var(--space-4) var(--space-5)",
                            borderRadius: "var(--radius-card)",
                            border: "none",
                            textAlign: "left",
                            cursor: "pointer",
                            backgroundColor: isActive
                              ? "var(--search-result-hover-bg)"
                              : "transparent",
                            transition: "background-color 0.1s ease",
                            fontFamily: "var(--font-family-supreme)",
                          }}
                        >
                          {/* Icon */}
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "24px",
                              height: "24px",
                              color: isActive
                                ? "var(--search-category-active-icon-fg)"
                                : "var(--search-result-icon-fg)",
                              flexShrink: 0,
                              transition: "color 0.1s ease",
                            }}
                          >
                            {CATEGORY_RESULT_ICONS[entry.category] ?? (
                              <Component size={20} />
                            )}
                          </span>

                          {/* Text */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: "var(--font-weight-regular)",
                                color: "var(--search-result-title-fg)",
                                lineHeight: "28px",
                                transition: "color 0.1s ease",
                              }}
                            >
                              {highlightMatch(entry.name, query)}
                            </div>
                            <div
                              style={{
                                fontSize: "var(--text-base)",
                                fontWeight: "var(--font-weight-regular)",
                                color: "var(--search-result-desc-fg)",
                                lineHeight: "24px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {highlightMatch(entry.description, query)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* end Dialog wrapper */}
    </>
  );
}

/* ── Utilities ───────────────────────────────── */

function groupByCategory(
  entries: SearchEntry[]
): [string, SearchEntry[]][] {
  const map = new Map<string, SearchEntry[]>();
  const order = ["Getting Started", "Foundation", "Components", "Patterns"];

  for (const e of entries) {
    const arr = map.get(e.category) ?? [];
    arr.push(e);
    map.set(e.category, arr);
  }

  return order
    .filter((cat) => map.has(cat))
    .map((cat) => [cat, map.get(cat)!]);
}

function highlightMatch(text: string, query: string): ReactNode {
  if (!query.trim()) return text;
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const escaped = words.map((w) =>
    w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);
  if (parts.length <= 1) return text;

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        style={{
          color: "var(--brand-default)",
          fontWeight: "var(--font-weight-bold)",
        }}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/* ── Provider hook for global Cmd+K ──────────── */
export function useSearchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onClose = useCallback(() => setOpen(false), []);

  return { open, setOpen, onClose };
}