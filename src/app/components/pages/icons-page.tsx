import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "../docs/search-command";
import { CryptoIcon, CRYPTO_COINS } from "../ui/crypto-icon";
import { TablerIcon, ALL_TABLER_ICONS, TABLER_ICON_CATEGORIES } from "../ui/tabler-icon";
import type { TablerIconVariant } from "../ui/tabler-icon";
import { Search, X } from "lucide-react";
import { SectionJumpFab } from "../docs/section-jump-fab";
import { Button } from "../ui/hollaex-button";

/* ══════════════════════════════════════════════════════════════
   SHARED HELPERS
   ══════════════════════════════════════════════════════════════ */

const SIZE_OPTIONS = [
  { label: "16", value: 16 },
  { label: "24", value: 24 },
  { label: "32", value: 32 },
  { label: "48", value: 48 },
  { label: "64", value: 64 },
];

type IconTab = "tabler" | "crypto";
const TAB_ITEMS: { value: IconTab; label: string }[] = [
  { value: "tabler", label: "Tabler Icons" },
  { value: "crypto", label: "Crypto Icons" },
];

/** Convert kebab-case to Title Case */
function toTitle(s: string) {
  return s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/* ══════════════════════════════════════════════════════════════
   COPY BUTTON
   ══════════════════════════════════════════════════════════════ */

function CopyButton({ text }: { text: string }) {
  return (
    <Button
      variant="ghost-secondary"
      size="xs"
      iconOnly
      copyText={text}
      title={`Copy "${text}"`}
      onClick={(e) => e.stopPropagation()}
      style={{ borderRadius: "var(--radius-circle)", width: 28, height: 28 }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   ICON CARDS
   ══════════════════════════════════════════════════════════════ */

function CryptoIconCard({ symbol, name, iconSize }: { symbol: string; name: string; iconSize: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col items-center justify-center transition-all duration-[var(--duration-short-3)]"
      style={{
        backgroundColor: "var(--card)",
        border: `1px solid ${hovered ? "var(--border)" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-card)",
        padding: "var(--space-7) var(--space-4) var(--space-5)",
        minHeight: 140,
        gap: "var(--space-4)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute transition-opacity duration-[var(--duration-short-3)]" style={{ top: 8, right: 8, opacity: hovered ? 1 : 0 }}>
        <CopyButton text={symbol.toLowerCase()} />
      </div>
      <CryptoIcon symbol={symbol} size={iconSize} />
      <div className="flex flex-col items-center gap-1 w-full">
        <span className="truncate w-full text-center" style={{ fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)" as any, fontSize: "var(--text-body-sm)", color: "var(--foreground)", lineHeight: 1.3 }}>{name}</span>
        <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)", lineHeight: 1.3, textTransform: "uppercase" }}>{symbol}</span>
      </div>
    </div>
  );
}

function TablerIconCard({ name, iconSize, variant = "outline" }: { name: string; iconSize: number; variant?: TablerIconVariant }) {
  const [hovered, setHovered] = useState(false);
  const displayName = toTitle(name);

  return (
    <div
      className="relative flex flex-col items-center justify-center transition-all duration-[var(--duration-short-3)]"
      style={{
        backgroundColor: "var(--card)",
        border: `1px solid ${hovered ? "var(--border)" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-card)",
        padding: "var(--space-7) var(--space-4) var(--space-5)",
        minHeight: 140,
        gap: "var(--space-4)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute transition-opacity duration-[var(--duration-short-3)]" style={{ top: 8, right: 8, opacity: hovered ? 1 : 0 }}>
        <CopyButton text={name} />
      </div>
      <div style={{ width: iconSize, height: iconSize, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TablerIcon name={name} size={iconSize} variant={variant} style={{ filter: "var(--tabler-icon-filter, none)" }} />
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
        <span className="truncate w-full text-center" style={{ fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)" as any, fontSize: "var(--text-meta)", color: "var(--foreground)", lineHeight: 1.3 }}>{displayName}</span>
        <span className="truncate w-full text-center" style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-overline)", color: "var(--muted-foreground)", lineHeight: 1.3 }}>{name}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SEARCH INPUT
   ══════════════════════════════════════════════════════════════ */

function IconSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className="relative flex items-center"
      style={{
        width: 220, height: 36,
        borderRadius: "var(--radius)",
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--input-background)",
        overflow: "hidden",
      }}
    >
      <Search size={14} style={{ position: "absolute", left: 10, color: "var(--muted-foreground)", flexShrink: 0 }} />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search icons..."
        className="w-full h-full bg-transparent outline-none"
        style={{ paddingLeft: 32, paddingRight: value ? 32 : 10, fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-body-sm)", color: "var(--foreground)", border: "none" }}
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange(""); ref.current?.focus(); }}
          className="absolute flex items-center justify-center cursor-pointer"
          style={{ right: 6, width: 22, height: 22, borderRadius: "var(--radius-circle)", backgroundColor: "transparent", border: "none", color: "var(--muted-foreground)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIZE PICKER
   ═════════════════════════════════════════════════════════════ */

function SizePicker({ sizes, active, onChange }: { sizes: typeof SIZE_OPTIONS; active: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center" style={{ borderRadius: "var(--radius)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
      {sizes.map((s, i) => {
        const isActive = s.value === active;
        return (
          <button
            key={s.value}
            type="button"
            onClick={() => onChange(s.value)}
            className="flex items-center justify-center cursor-pointer transition-colors duration-[var(--duration-short-3)]"
            style={{
              height: 36, padding: "0 var(--space-4)",
              fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-meta)",
              fontWeight: isActive ? "var(--font-weight-bold)" as any : "var(--font-weight-regular)" as any,
              color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
              backgroundColor: isActive ? "var(--secondary)" : "transparent",
              border: "none",
              borderRight: i < sizes.length - 1 ? "1px solid var(--border-subtle)" : "none",
            }}
          >
            {s.label}px
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STICKY CATEGORY SIDE NAV (Tabler tab)
   ══════════════════════════════════════════════════════════════ */

type SideNavItem = {
  id: string;
  label: string;
  icon: string;
  count: number;
};

function CategorySideNav({
  items,
  activeId,
  onNavigate,
}: {
  items: SideNavItem[];
  activeId: string;
  onNavigate?: (id: string) => void;
}) {
  return (
    <nav
      className="sticky flex flex-col"
      style={{
        top: "calc(var(--space-12) + var(--space-3))",
        width: "180px",
        flexShrink: 0,
        fontFamily: "var(--font-family-supreme)",
        gap: "2px",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-caption)",
          fontWeight: "var(--font-weight-bold)" as any,
          letterSpacing: "var(--ls-overline)",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          padding: "0 var(--space-3) var(--space-3)",
          marginBottom: "var(--space-1)",
        }}
      >
        Categories
      </span>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.(item.id);
            }}
            className="flex items-center gap-2.5 truncate transition-colors duration-[var(--duration-short-3)]"
            style={{
              fontSize: "var(--text-body-sm)",
              fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
              color: isActive ? "var(--foreground)" : "var(--color-text-tertiary)",
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-xs)",
              backgroundColor: isActive ? "var(--secondary)" : "transparent",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--foreground)"; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-tertiary)"; }}
          >
            <TablerIcon
              name={item.icon}
              size={16}
              style={{
                filter: "var(--tabler-icon-filter, none)",
                flexShrink: 0,
                opacity: isActive ? 1 : 0.6,
              }}
            />
            <span className="truncate">{item.label}</span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: "var(--text-overline)",
                fontFamily: "var(--font-family-mono)",
                color: "var(--muted-foreground)",
                opacity: isActive ? 1 : 0.5,
                flexShrink: 0,
              }}
            >
              {item.count}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   TABLER TAB CONTENT — grouped by category with sections
   ══════════════════════════════════════════════════════════════ */

function TablerTabContent({ search, iconSize, variant }: { search: string; iconSize: number; variant?: TablerIconVariant }) {
  const [activeSection, setActiveSection] = useState(
    `cat-${TABLER_ICON_CATEGORIES[0]?.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? ""}`,
  );
  /** When the user clicks a nav link we want to lock the highlight
      to that section until the scroll finishes. */
  const manualOverrideRef = useRef<string | null>(null);
  const manualTimerRef = useRef<ReturnType<typeof setTimeout>>();

  /** Filter categories by search — only show categories that have matches */
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return TABLER_ICON_CATEGORIES;
    const q = search.toLowerCase();
    return TABLER_ICON_CATEGORIES
      .map((cat) => ({
        ...cat,
        icons: cat.icons.filter(
          (name) =>
            name.toLowerCase().includes(q) ||
            cat.category.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.icons.length > 0);
  }, [search]);

  const sideNavItems: SideNavItem[] = useMemo(
    () =>
      filteredCategories.map((cat) => ({
        id: `cat-${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        label: cat.category,
        icon: cat.representativeIcon,
        count: cat.icons.length,
      })),
    [filteredCategories],
  );

  /* IntersectionObserver — track which sections are visible,
     pick the topmost one (smallest boundingClientRect.top). */
  useEffect(() => {
    const ids = sideNavItems.map((i) => i.id);
    const elems = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elems.length === 0) return;

    /** Set of currently-intersecting section IDs */
    const visibleSet = new Set<string>();

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            visibleSet.delete(entry.target.id);
          }
        }

        // If a manual click override is active, skip auto-detection
        if (manualOverrideRef.current) return;

        // Among all currently visible sections, pick the one closest to the top
        let bestId: string | null = null;
        let bestTop = Infinity;
        for (const id of visibleSet) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top < bestTop) {
            bestTop = top;
            bestId = id;
          }
        }
        if (bestId) {
          setActiveSection(bestId);
        }
      },
      { rootMargin: "-140px 0px -40% 0px", threshold: 0 },
    );
    elems.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sideNavItems]);

  /** Called by the side nav when user clicks a category link */
  const handleNavClick = useCallback((id: string) => {
    // Immediately highlight the clicked item
    setActiveSection(id);
    manualOverrideRef.current = id;

    // Release the lock after scroll likely finishes
    clearTimeout(manualTimerRef.current);
    manualTimerRef.current = setTimeout(() => {
      manualOverrideRef.current = null;
    }, 900);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (filteredCategories.length === 0) {
    return <EmptyState search={search} />;
  }

  return (
    <div className="flex" style={{ gap: 0 }}>
      {/* Sticky side nav */}
      <div className="shrink-0" style={{ width: "210px", paddingTop: "var(--space-8)", paddingRight: "var(--space-7)" }}>
        <CategorySideNav items={sideNavItems} activeId={activeSection} onNavigate={handleNavClick} />
      </div>

      {/* Category sections */}
      <div className="flex-1 min-w-0" style={{ paddingBottom: "var(--space-12)" }}>
        {filteredCategories.map((cat) => {
          const sectionId = `cat-${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <section key={cat.category} id={sectionId} data-section-title={cat.category} className="section-block" style={{ scrollMarginTop: 160 }}>
              {/* Category header */}
              <div
                className="flex items-center gap-2.5"
                style={{
                  paddingTop: "var(--space-8)",
                  paddingBottom: "var(--space-5)",
                }}
              >
                <TablerIcon
                  name={cat.representativeIcon}
                  size={20}
                  style={{ filter: "var(--tabler-icon-filter, none)", flexShrink: 0 }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-family-supreme)",
                    fontWeight: "var(--font-weight-bold)" as any,
                    fontSize: "var(--text-base)",
                    color: "var(--foreground)",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {cat.category}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-caption)",
                    color: "var(--muted-foreground)",
                    marginLeft: 4,
                  }}
                >
                  {cat.icons.length}
                </span>
              </div>

              {/* Icon grid */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "var(--space-4)",
                }}
              >
                {cat.icons.map((iconName) => (
                  <TablerIconCard
                    key={`${cat.category}-${iconName}`}
                    name={iconName}
                    iconSize={iconSize}
                    variant={variant}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CRYPTO TAB CONTENT
   ══════════════════════════════════════════════════════════════ */

function CryptoTabContent({ search, iconSize }: { search: string; iconSize: number }) {
  const filtered = useMemo(() => {
    if (!search.trim()) return CRYPTO_COINS;
    const q = search.toLowerCase();
    return CRYPTO_COINS.filter(
      (c) => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q),
    );
  }, [search]);

  return filtered.length > 0 ? (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "var(--space-4)",
        paddingTop: "var(--space-5)",
        paddingBottom: "var(--space-12)",
      }}
    >
      {filtered.map((coin) => (
        <CryptoIconCard key={coin.symbol} symbol={coin.symbol} name={coin.name} iconSize={iconSize} />
      ))}
    </div>
  ) : (
    <EmptyState search={search} />
  );
}

/* ══════════════════════════════════════════════════════════════
   EMPTY STATE
   ══════════════════════════════════════════════════════════════ */

function EmptyState({ search }: { search: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ padding: "var(--space-13) 0", fontFamily: "var(--font-family-supreme)" }}
    >
      <span style={{ fontSize: "var(--text-body)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" as any }}>
        No icons match &ldquo;{search}&rdquo;
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   USAGE SECTIONS
   ══════════════════════════════════════════════════════════════ */

function TablerUsageSection() {
  return (
    <div className="border-t" style={{ borderColor: "var(--secondary)", paddingTop: "var(--space-10)", paddingBottom: "var(--space-13)" }}>
      <h2 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
        Usage
      </h2>
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
        <div className="flex items-center justify-between" style={{ padding: "var(--space-3) var(--space-5)", borderBottom: "1px solid var(--border-subtle)", backgroundColor: "var(--preview-header-bg)" }}>
          <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)" }}>React</span>
          <CopyButton text={`import { TablerIcon } from "./components/ui/tabler-icon";\n\n<TablerIcon name="home" size={24} />\n<TablerIcon name="home" size={24} variant="filled" />`} />
        </div>
        <pre style={{ padding: "var(--space-6) var(--space-7)", margin: 0, fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", lineHeight: 1.7, color: "var(--foreground)", overflowX: "auto" }}>
          <code>
            <span style={{ color: "var(--color-text-brand)" }}>import</span>
            {" { TablerIcon } "}
            <span style={{ color: "var(--color-text-brand)" }}>from</span>
            {' "./components/ui/tabler-icon";\n\n'}
            <span style={{ color: "var(--muted-foreground)" }}>{"// Outline (default)"}</span>
            {"\n<"}
            <span style={{ color: "var(--chart-5)" }}>TablerIcon</span>
            {" "}
            <span style={{ color: "var(--chart-3)" }}>name</span>
            {'="home" '}
            <span style={{ color: "var(--chart-3)" }}>size</span>
            {"={24} />\n\n"}
            <span style={{ color: "var(--muted-foreground)" }}>{"// Filled variant"}</span>
            {"\n<"}
            <span style={{ color: "var(--chart-5)" }}>TablerIcon</span>
            {" "}
            <span style={{ color: "var(--chart-3)" }}>name</span>
            {'="home" '}
            <span style={{ color: "var(--chart-3)" }}>size</span>
            {"={24} "}
            <span style={{ color: "var(--chart-3)" }}>variant</span>
            {'="filled" />'}
          </code>
        </pre>
      </div>

      <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", marginTop: "var(--space-9)", marginBottom: "var(--space-4)" }}>
        Props
      </h3>
      <PropsTable rows={[
        { prop: "name", type: "string", def: "—", desc: 'Kebab-case icon name, e.g. "arrow-right"' },
        { prop: "size", type: "number", def: "24", desc: "Icon width & height in px" },
        { prop: "variant", type: '"outline" | "filled"', def: '"outline"', desc: "Icon style variant" },
        { prop: "className", type: "string", def: "—", desc: "Additional CSS class name" },
        { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style overrides" },
      ]} />
    </div>
  );
}

function CryptoUsageSection() {
  return (
    <div className="border-t" style={{ borderColor: "var(--secondary)", paddingTop: "var(--space-10)", paddingBottom: "var(--space-13)" }}>
      <h2 style={{ fontSize: "var(--text-h3)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
        Usage
      </h2>
      <div style={{ backgroundColor: "var(--card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
        <div className="flex items-center justify-between" style={{ padding: "var(--space-3) var(--space-5)", borderBottom: "1px solid var(--border-subtle)", backgroundColor: "var(--preview-header-bg)" }}>
          <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)" }}>React</span>
          <CopyButton text={`import { CryptoIcon } from "./components/ui/crypto-icon";\n\n<CryptoIcon symbol="btc" size={32} />`} />
        </div>
        <pre style={{ padding: "var(--space-6) var(--space-7)", margin: 0, fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", lineHeight: 1.7, color: "var(--foreground)", overflowX: "auto" }}>
          <code>
            <span style={{ color: "var(--color-text-brand)" }}>import</span>
            {" { CryptoIcon } "}
            <span style={{ color: "var(--color-text-brand)" }}>from</span>
            {' "./components/ui/crypto-icon";\n\n'}
            <span style={{ color: "var(--muted-foreground)" }}>{"// Basic usage"}</span>
            {"\n<"}
            <span style={{ color: "var(--chart-5)" }}>CryptoIcon</span>
            {" "}
            <span style={{ color: "var(--chart-3)" }}>symbol</span>
            {'="btc" '}
            <span style={{ color: "var(--chart-3)" }}>size</span>
            {"={32} />\n\n"}
            <span style={{ color: "var(--muted-foreground)" }}>{"// All available props"}</span>
            {"\n<"}
            <span style={{ color: "var(--chart-5)" }}>CryptoIcon</span>
            {"\n  "}
            <span style={{ color: "var(--chart-3)" }}>symbol</span>
            {'="eth"\n  '}
            <span style={{ color: "var(--chart-3)" }}>size</span>
            {"={48}\n  "}
            <span style={{ color: "var(--chart-3)" }}>className</span>
            {'="my-icon"\n/>'}
          </code>
        </pre>
      </div>

      <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", marginTop: "var(--space-9)", marginBottom: "var(--space-4)" }}>
        Props
      </h3>
      <PropsTable rows={[
        { prop: "symbol", type: "string", def: "—", desc: 'Coin ticker symbol, e.g. "btc", "eth"' },
        { prop: "size", type: "number", def: "32", desc: "Icon width & height in px" },
        { prop: "className", type: "string", def: "—", desc: "Additional CSS class name" },
        { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style overrides" },
      ]} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROPS TABLE (shared)
   ══════════════════════════════════════════════════════════════ */

function PropsTable({ rows }: { rows: { prop: string; type: string; def: string; desc: string }[] }) {
  return (
    <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "var(--table-header-bg)" }}>
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "var(--table-header-padding-y) var(--table-cell-padding-x)", fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-meta)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--table-header-fg)", borderBottom: "1px solid var(--table-border)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop}>
              <td style={{ padding: "var(--table-cell-padding-y) var(--table-cell-padding-x)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", color: "var(--table-cell-fg)", borderBottom: "1px solid var(--table-border)" }}>{row.prop}</td>
              <td style={{ padding: "var(--table-cell-padding-y) var(--table-cell-padding-x)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-meta)", color: "var(--color-text-brand)", borderBottom: "1px solid var(--table-border)" }}>{row.type}</td>
              <td style={{ padding: "var(--table-cell-padding-y) var(--table-cell-padding-x)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-meta)", color: "var(--muted-foreground)", borderBottom: "1px solid var(--table-border)" }}>{row.def}</td>
              <td style={{ padding: "var(--table-cell-padding-y) var(--table-cell-padding-x)", fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-body-sm)", color: "var(--table-cell-secondary-fg)", borderBottom: "1px solid var(--table-border)" }}>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */

export function IconsPage() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [iconSize, setIconSize] = useState(24);
  const [activeTab, setActiveTab] = useState<IconTab>("tabler");
  const [iconVariant, setIconVariant] = useState<TablerIconVariant>("outline");

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset search when switching tabs
  useEffect(() => {
    setSearch("");
  }, [activeTab]);

  const tablerCount = useMemo(() => {
    if (!search.trim()) return ALL_TABLER_ICONS.length;
    const q = search.toLowerCase();
    return ALL_TABLER_ICONS.filter((i) => i.name.includes(q) || i.category.toLowerCase().includes(q)).length;
  }, [search]);

  const cryptoCount = useMemo(() => {
    if (!search.trim()) return CRYPTO_COINS.length;
    const q = search.toLowerCase();
    return CRYPTO_COINS.filter((c) => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)).length;
  }, [search]);

  const countLabel = activeTab === "tabler"
    ? `${tablerCount} icons`
    : `${cryptoCount} icons`;

  const descriptions: Record<IconTab, { title: string; desc: React.ReactNode }> = {
    tabler: {
      title: "Icons",
      desc: (
        <>
          {ALL_TABLER_ICONS.length}+ open-source outline icons from{" "}
          <a href="https://tabler.io/icons" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-brand)", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Tabler Icons
          </a>
          , served via jsDelivr CDN and organized into {TABLER_ICON_CATEGORIES.length} categories. Use the{" "}
          <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body)", backgroundColor: "var(--secondary)", padding: "2px 6px", borderRadius: "var(--radius-xs)" }}>
            {"<TablerIcon />"}
          </code>{" "}
          component with any icon name.
        </>
      ),
    },
    crypto: {
      title: "Icons",
      desc: (
        <>
          {CRYPTO_COINS.length}+ cryptocurrency SVG icons from the open-source{" "}
          <a href="https://github.com/nicehash/cryptocurrency-icons" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-text-brand)", textDecoration: "underline", textUnderlineOffset: 3 }}>
            NiceHash Crypto Icons
          </a>{" "}
          library, served via jsDelivr CDN. Use the{" "}
          <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body)", backgroundColor: "var(--secondary)", padding: "2px 6px", borderRadius: "var(--radius-xs)" }}>
            {"<CryptoIcon />"}
          </code>{" "}
          component with any coin ticker symbol.
        </>
      ),
    },
  };

  return (
    <div className="min-h-full" style={{ backgroundColor: "var(--secondary-subtle)" }}>
      {/* Scroll sentinel */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* ── Breadcrumb bar with centered tabs ──────────── */}
      <div
        className="border-b sticky top-0 z-10 transition-shadow duration-[var(--duration-short-4)] relative"
        style={{
          height: 72,
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--background)",
          boxShadow: scrolled ? "var(--elevation-sm)" : "none",
        }}
      >
        {/* Full-width layer: breadcrumb left, controls right */}
        <div className="h-full flex items-center justify-between relative z-[1]" style={{ padding: "0 var(--space-10)" }}>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Foundation</span>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--border)" }}>&rsaquo;</span>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)" as any, fontFamily: "var(--font-family-supreme)" }}>Icons</span>
          </div>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-5)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{countLabel}</span>
            <SearchTrigger />
            <HxThemeToggle size="lg" />
          </div>
        </div>

        {/* Centered tab layer — aligned with content container below */}
        <div className="absolute inset-0 h-full flex items-center pointer-events-none" style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 var(--space-8)" }}>
          <div className="flex pointer-events-auto" role="tablist" style={{ fontFamily: "var(--font-family-supreme)" }}>
            {TAB_ITEMS.map((tab) => {
              const isActive = tab.value === activeTab;
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.value)}
                  className="relative flex items-center justify-center cursor-pointer select-none outline-none transition-colors duration-[var(--duration-short-3)]"
                  style={{
                    height: "72px",
                    padding: "0 var(--space-5)",
                    fontSize: "var(--text-body)",
                    fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                    color: isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-supreme)",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-tertiary)"; }}
                >
                  {tab.label}
                  <span
                    className="absolute bottom-0 left-0 w-full transition-transform duration-[var(--duration-medium-2)] origin-left"
                    style={{
                      height: "2px",
                      backgroundColor: "var(--brand-default)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Page content ──────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 var(--space-8)" }}>
        {/* Header */}
        <div className="border-b" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-9)", borderColor: "var(--secondary)" }}>
          <h1 style={{
            fontSize: "var(--text-huge)",
            fontWeight: "var(--font-weight-bold)" as any,
            color: "var(--foreground)",
            lineHeight: "var(--lh-huge)",
            letterSpacing: "var(--ls-huge)",
            fontFamily: "var(--font-family-supreme)",
            margin: 0,
          }}>
            {descriptions[activeTab].title}
          </h1>
          <p style={{
            fontSize: "var(--text-base)",
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
            fontFamily: "var(--font-family-supreme)",
            maxWidth: 600,
          }}>
            {descriptions[activeTab].desc}
          </p>
        </div>

        {/* Controls row */}
        <div
          className="flex flex-wrap items-center justify-between"
          style={{
            gap: "var(--space-5)",
            position: "sticky",
            top: "calc(var(--space-12) + var(--space-3))",
            zIndex: 20,
            padding: "var(--space-3) var(--space-6)",
            backgroundColor: "var(--secondary-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-card)",
            marginTop: "var(--space-5)",
            marginBottom: "var(--space-6)",
          }}
        >
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <span style={{ fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" as any }}>
              Size
            </span>
            <SizePicker sizes={SIZE_OPTIONS} active={iconSize} onChange={setIconSize} />
            {activeTab === "tabler" && (
              <>
                <div style={{ width: 1, height: 20, backgroundColor: "var(--border-subtle)", margin: "0 4px" }} />
                <span style={{ fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" as any }}>
                  Style
                </span>
                <div className="flex items-center" style={{ borderRadius: "var(--radius)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
                  {(["outline", "filled"] as const).map((v) => {
                    const isActive = v === iconVariant;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setIconVariant(v)}
                        className="flex items-center justify-center cursor-pointer transition-colors duration-[var(--duration-short-3)]"
                        style={{
                          height: 36, padding: "0 var(--space-4)",
                          fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-meta)",
                          fontWeight: isActive ? "var(--font-weight-bold)" as any : "var(--font-weight-regular)" as any,
                          color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                          backgroundColor: isActive ? "var(--secondary)" : "transparent",
                          border: "none",
                          borderRight: v === "outline" ? "1px solid var(--border-subtle)" : "none",
                          textTransform: "capitalize",
                        }}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <IconSearch value={search} onChange={setSearch} />
        </div>

        {/* Tab content */}
        {activeTab === "tabler" ? (
          <TablerTabContent search={search} iconSize={iconSize} variant={iconVariant} />
        ) : (
          <CryptoTabContent search={search} iconSize={iconSize} />
        )}

        {/* Usage section per tab */}
        {activeTab === "tabler" ? <TablerUsageSection /> : <CryptoUsageSection />}
      </div>
      <SectionJumpFab />
    </div>
  );
}