import { useState, useEffect, useRef, useCallback } from "react";
import type { ComponentType } from "react";
import { ChevronsUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* Simple hash → hue for generating per-section accent colors */
function hashHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ((hash % 360) + 360) % 360;
}

/* Map common color names to representative hex values */
const COLOR_NAME_MAP: Record<string, string> = {
  silver: "#D4D9DE",
  neutral: "#A0A8B0",
  blue: "#60A5FA",
  red: "#F87171",
  green: "#4ADE80",
  yellow: "#FACC15",
  purple: "#C084FC",
  orange: "#FB923C",
  pink: "#F472B6",
  cyan: "#22D3EE",
  teal: "#2DD4BF",
  indigo: "#818CF8",
  violet: "#A78BFA",
  amber: "#FBBF24",
  lime: "#A3E635",
  emerald: "#34D399",
  rose: "#FB7185",
  sky: "#38BDF8",
  slate: "#94A3B8",
  zinc: "#A1A1AA",
  stone: "#A8A29E",
  gray: "#9CA3AF",
  grey: "#9CA3AF",
  white: "#F5F5F5",
  black: "#525252",
  brand: "#818CF8",
  success: "#4ADE80",
  warning: "#FACC15",
  danger: "#F87171",
  info: "#60A5FA",
  error: "#F87171",
};

function dotColorForTitle(title: string): string {
  const lower = title.toLowerCase().trim();
  // Check exact match first, then check if the title contains a color name
  if (COLOR_NAME_MAP[lower]) return COLOR_NAME_MAP[lower];
  for (const [name, color] of Object.entries(COLOR_NAME_MAP)) {
    if (lower.includes(name)) return color;
  }
  // Fallback: hash-based hue
  const hue = hashHue(title);
  return `hsl(${hue}, 65%, 70%)`;
}

/**
 * SectionJumpFab – A floating action button that lets users quickly jump
 * to any section on the current page.  ⌘J / Ctrl+J to toggle.
 */
export function SectionJumpFab({
  sectionSelector = ".section-block[data-section-title]",
  titleExtractor,
  iconMap,
  showColorDots = false,
}: {
  sectionSelector?: string;
  titleExtractor?: (el: HTMLElement) => { id: string; title: string } | null;
  iconMap?: Record<string, ComponentType<{ size?: number; stroke?: number }>>;
  showColorDots?: boolean;
} = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sections, setSections] = useState<{ id: string; title: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [bobbingDone, setBobbingDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rescanTimer = useRef<number | null>(null);

  const defaultExtractor = (el: HTMLElement) => ({
    id: el.id,
    title: el.dataset.sectionTitle || "",
  });
  const extract = titleExtractor || defaultExtractor;

  // Collect sections from DOM — re-scan on mutations (e.g. tab switches)
  useEffect(() => {
    const scan = () => {
      const els = document.querySelectorAll<HTMLElement>(sectionSelector);
      const items = Array.from(els)
        .map((el) => extract(el))
        .filter((x): x is { id: string; title: string } => x !== null && !!x.id && !!x.title);
      setSections(items);
    };

    // Initial scan after a short delay
    const timer = setTimeout(scan, 500);

    // Re-scan whenever the DOM changes (tab switches, dynamic content)
    const observer = new MutationObserver(() => {
      // Debounce rapid mutations
      clearTimeout(rescanTimer.current);
      rescanTimer.current = window.setTimeout(scan, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(rescanTimer.current);
      observer.disconnect();
    };
  }, [sectionSelector]);

  // Track currently visible section
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>(sectionSelector);
      if (els.length === 0) return;

      const obs = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible.length > 0) {
            const item = extract(visible[0].target as HTMLElement);
            if (item) setActiveSection(item.title);
          }
        },
        { threshold: 0.1, rootMargin: "-80px 0px -50% 0px" },
      );

      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 600);
    return () => clearTimeout(timer);
  }, [sectionSelector]);

  // Stop bobbing after 3 cycles
  useEffect(() => {
    const timer = setTimeout(() => setBobbingDone(true), 16500);
    return () => clearTimeout(timer);
  }, []);

  // Filter sections by query
  const filtered = query.trim()
    ? sections.filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
    : sections;

  // Reset selection when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Aggressive focus: retry until input exists and is focused
  useEffect(() => {
    if (!isOpen) return;
    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      attempts++;
      if (inputRef.current) {
        inputRef.current.focus();
        if (document.activeElement === inputRef.current || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }
      if (attempts >= maxAttempts) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const scrollContainer = el.closest(".overflow-y-auto") || el.closest("[class*='overflow-y-auto']");
    const offset = 72 + 24;

    if (scrollContainer) {
      const top = el.offsetTop - offset;
      scrollContainer.scrollTo({ top, behavior: "smooth" });
    } else {
      // Use window.scrollTo with offset to account for sticky breadcrumb header
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - offset;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }

    setIsOpen(false);
    setQuery("");
  }, []);

  // Scroll selected item into view in the list
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-fab-item]");
    const target = items[selectedIndex] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, isOpen]);

  // ⌘J / Ctrl+J — global toggle + keyboard nav when open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Toggle shortcut
      if ((e.metaKey || e.ctrlKey) && e.key === "j") {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => {
          if (prev) {
            setQuery("");
            return false;
          }
          return true;
        });
        return;
      }

      // Only handle nav keys when panel is open
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          jumpTo(filtered[selectedIndex].id);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [isOpen, filtered, selectedIndex, jumpTo]);

  const fabSize = 48;
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
  const shortcutLabel = isMac ? "\u2318J" : "Ctrl+J";

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 50,
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <div
            key="fab-collapsed"
            style={{ display: "flex", alignItems: "center", gap: 8, flexDirection: "row-reverse" }}
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0, 0, 0.3, 1] }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: fabSize,
                height: fabSize,
                borderRadius: "var(--radius-circle)",
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 24px -4px rgba(0,0,0,0.3), 0 2px 8px -2px rgba(0,0,0,0.15)",
                position: "relative",
                overflow: "visible",
                flexShrink: 0,
              }}
              aria-label="Jump to section"
            >
              <motion.div
                animate={bobbingDone ? { y: 0 } : { y: [0, -3, 0, 3, 0] }}
                transition={
                  bobbingDone
                    ? { duration: 0.3 }
                    : { duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }
                }
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <ChevronsUpDown size={20} strokeWidth={2} />
              </motion.div>

              <motion.div
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "var(--radius-circle)",
                  border: "2px solid var(--foreground)",
                  pointerEvents: "none",
                }}
              />
            </motion.button>

            {/* Active section pill + shortcut label */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2, ease: [0, 0, 0.3, 1] }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                pointerEvents: "none",
              }}
            >
              <AnimatePresence mode="wait">
                {activeSection ? (
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 8, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 4, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0, 0, 0.3, 1] }}
                    style={{
                      backgroundColor: "var(--foreground)",
                      color: "var(--background)",
                      padding: "5px 10px 5px 12px",
                      borderRadius: 10,
                      fontSize: "11px",
                      fontFamily: "var(--font-family-supreme)",
                      fontWeight: "var(--font-weight-medium)",
                      letterSpacing: "0.01em",
                      boxShadow: "0 4px 16px -4px rgba(0,0,0,0.25)",
                      whiteSpace: "nowrap",
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                      {activeSection}
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontFamily: "var(--font-family-mono)",
                        opacity: 0.45,
                        flexShrink: 0,
                        padding: "1px 4px",
                        borderRadius: 4,
                        backgroundColor: "rgba(128,128,128,0.15)",
                      }}
                    >
                      {shortcutLabel}
                    </span>
                  </motion.div>
                ) : (
                  /* Show just the shortcut hint when no section is active yet */
                  <motion.div
                    key="shortcut-only"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: "var(--foreground)",
                      color: "var(--background)",
                      padding: "5px 10px",
                      borderRadius: 10,
                      fontSize: "10px",
                      fontFamily: "var(--font-family-mono)",
                      opacity: 0.7,
                      boxShadow: "0 4px 16px -4px rgba(0,0,0,0.25)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {shortcutLabel}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="fab-open"
            initial={{
              width: fabSize,
              height: fabSize,
              borderRadius: fabSize / 2,
              opacity: 0.9,
            }}
            animate={{
              width: 320,
              height: "auto",
              borderRadius: 16,
              opacity: 1,
            }}
            exit={{
              width: fabSize,
              height: fabSize,
              borderRadius: fabSize / 2,
              opacity: 0,
            }}
            transition={{ duration: 0.3, ease: [0, 0, 0.3, 1] }}
            style={{
              backgroundColor: "var(--foreground)",
              boxShadow: "0 16px 48px -8px rgba(0,0,0,0.35), 0 6px 16px -4px rgba(0,0,0,0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2, ease: [0, 0, 0.3, 1] }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {/* Search input row */}
              <div style={{
                display: "flex",
                alignItems: "center",
                padding: "4px 10px 4px 14px",
                gap: 8,
                borderBottom: filtered.length > 0 ? "1px solid rgba(128,128,128,0.15)" : "none",
              }}>
                <Search size={15} strokeWidth={2} style={{ color: "var(--background)", opacity: 0.4, flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to section…"
                  aria-label="Jump to section"
                  aria-controls="hx-fab-section-list"
                  aria-activedescendant={filtered[selectedIndex] ? `hx-fab-item-${selectedIndex}` : undefined}
                  role="combobox"
                  aria-expanded={filtered.length > 0}
                  data-focus-custom
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "var(--background)",
                    fontSize: "var(--text-body-sm)",
                    fontFamily: "var(--font-family-supreme)",
                    padding: "10px 0",
                  }}
                />
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  opacity: 0.3,
                  color: "var(--background)",
                  fontSize: "9px",
                  fontFamily: "var(--font-family-mono)",
                }}>
                  <ArrowUp size={10} strokeWidth={2.5} />
                  <ArrowDown size={10} strokeWidth={2.5} />
                  <span style={{ marginLeft: 4 }}>esc</span>
                </div>
              </div>

              {/* Section list */}
              {filtered.length > 0 && (
                <div
                  ref={listRef}
                  id="hx-fab-section-list"
                  role="listbox"
                  aria-label="Page sections"
                  style={{
                    maxHeight: 260,
                    overflowY: "auto",
                    padding: "4px",
                  }}
                >
                  {filtered.map((section, i) => {
                    const color = dotColorForTitle(section.title);
                    const isSelected = i === selectedIndex;
                    const IconComponent = iconMap?.[section.title];
                    return (
                      <button
                        key={section.id}
                        id={`hx-fab-item-${i}`}
                        role="option"
                        aria-selected={isSelected}
                        data-fab-item
                        onClick={() => jumpTo(section.id)}
                        onMouseEnter={() => setSelectedIndex(i)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "8px 10px",
                          borderRadius: 8,
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          backgroundColor: isSelected ? "rgba(128,128,128,0.2)" : "transparent",
                          color: "var(--background)",
                          fontSize: "var(--text-body-sm)",
                          fontFamily: "var(--font-family-supreme)",
                          fontWeight: isSelected ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                          transition: "background-color 100ms ease",
                        }}
                      >
                        {/* Icon or color dot */}
                        {IconComponent ? (
                          <span
                            style={{
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: isSelected ? 1 : 0.5,
                              transition: "opacity 100ms ease",
                            }}
                          >
                            <IconComponent size={14} stroke={isSelected ? 2 : 1.5} />
                          </span>
                        ) : showColorDots ? (
                          <span
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "var(--radius-circle)",
                              backgroundColor: color,
                              flexShrink: 0,
                              opacity: isSelected ? 1 : 0.6,
                              transition: "opacity 100ms ease",
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "var(--radius-circle)",
                              backgroundColor: "var(--background)",
                              flexShrink: 0,
                              opacity: isSelected ? 0.9 : 0.3,
                              transition: "opacity 100ms ease",
                            }}
                          />
                        )}
                        <span style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}>
                          {section.title}
                        </span>
                        {isSelected && (
                          <span style={{
                            fontSize: "9px",
                            fontFamily: "var(--font-family-mono)",
                            opacity: 0.35,
                            flexShrink: 0,
                          }}>
                            ↵
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* No results */}
              {query.trim() && filtered.length === 0 && (
                <div style={{
                  padding: "16px 14px",
                  color: "var(--background)",
                  opacity: 0.4,
                  fontSize: "var(--text-body-sm)",
                  fontFamily: "var(--font-family-supreme)",
                  textAlign: "center",
                }}>
                  No matching sections
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}