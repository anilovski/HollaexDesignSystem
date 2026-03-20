import { HxThemeToggle } from "../ui/hx-toggle";
import { useOutletContext, useLocation } from "react-router";
import { SearchTrigger } from "../docs/search-command";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/hollaex-button";
import { SectionJumpFab } from "../docs/section-jump-fab";
import { IconTypography, IconTextSize, IconBold, IconBook } from "@tabler/icons-react";
import type { ComponentType } from "react";

const FAB_ICONS: Record<string, ComponentType<{ size?: number; stroke?: number }>> = {
  "Type Scale": IconTextSize,
  "Font Weights": IconBold,
  "Usage": IconBook,
};

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
      title="Copy"
      style={{ borderRadius: "var(--radius-circle)", width: 28, height: 28 }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   TYPE SCALE DATA
   ══════════════════════════════════════════════════════════════ */

type TypeStep = {
  name: string;
  sizePx: number;
  sizeRem: string;
  lhSupremePx: number;
  lhSupremeRem: string;
  lhMonoPx: number;
  lhMonoRem: string;
  lsSupreme: string;
  lsMono: string;
  weight: number;
  category: "display" | "heading" | "body" | "utility";
};

const typeScale: TypeStep[] = [
  // ── Display ──
  { name: "huge",      sizePx: 52, sizeRem: "3.25",   lhSupremePx: 62, lhSupremeRem: "3.875",  lhMonoPx: 68, lhMonoRem: "4.25",   lsSupreme: "-0.02em", lsMono: "-0.02em", weight: 700, category: "display" },
  { name: "display",   sizePx: 40, sizeRem: "2.5",    lhSupremePx: 48, lhSupremeRem: "3",      lhMonoPx: 52, lhMonoRem: "3.25",   lsSupreme: "-0.015em", lsMono: "-0.01em", weight: 700, category: "display" },
  // ── Headings ──
  { name: "h1",        sizePx: 32, sizeRem: "2",      lhSupremePx: 40, lhSupremeRem: "2.5",    lhMonoPx: 44, lhMonoRem: "2.75",   lsSupreme: "-0.01em",  lsMono: "-0.005em", weight: 700, category: "heading" },
  { name: "h2",        sizePx: 28, sizeRem: "1.75",   lhSupremePx: 36, lhSupremeRem: "2.25",   lhMonoPx: 40, lhMonoRem: "2.5",    lsSupreme: "-0.01em",  lsMono: "0",        weight: 700, category: "heading" },
  { name: "h3",        sizePx: 24, sizeRem: "1.5",    lhSupremePx: 32, lhSupremeRem: "2",      lhMonoPx: 34, lhMonoRem: "2.125",  lsSupreme: "-0.005em", lsMono: "0",        weight: 600, category: "heading" },
  { name: "h4",        sizePx: 20, sizeRem: "1.25",   lhSupremePx: 28, lhSupremeRem: "1.75",   lhMonoPx: 30, lhMonoRem: "1.875",  lsSupreme: "0",        lsMono: "0",        weight: 600, category: "heading" },
  { name: "h5",        sizePx: 18, sizeRem: "1.125",  lhSupremePx: 26, lhSupremeRem: "1.625",  lhMonoPx: 28, lhMonoRem: "1.75",   lsSupreme: "0",        lsMono: "0",        weight: 600, category: "heading" },
  { name: "h6",        sizePx: 16, sizeRem: "1",      lhSupremePx: 24, lhSupremeRem: "1.5",    lhMonoPx: 26, lhMonoRem: "1.625",  lsSupreme: "0",        lsMono: "0",        weight: 600, category: "heading" },
  // ── Body ──
  { name: "body-lg",   sizePx: 16, sizeRem: "1",      lhSupremePx: 26, lhSupremeRem: "1.625",  lhMonoPx: 28, lhMonoRem: "1.75",   lsSupreme: "0",        lsMono: "0",        weight: 400, category: "body" },
  { name: "body",      sizePx: 14, sizeRem: "0.875",  lhSupremePx: 22, lhSupremeRem: "1.375",  lhMonoPx: 24, lhMonoRem: "1.5",    lsSupreme: "0",        lsMono: "0",        weight: 400, category: "body" },
  { name: "body-sm",   sizePx: 13, sizeRem: "0.8125", lhSupremePx: 20, lhSupremeRem: "1.25",   lhMonoPx: 22, lhMonoRem: "1.375",  lsSupreme: "0.005em",  lsMono: "0",        weight: 400, category: "body" },
  // ── Utility ──
  { name: "label",     sizePx: 12, sizeRem: "0.75",   lhSupremePx: 16, lhSupremeRem: "1",      lhMonoPx: 18, lhMonoRem: "1.125",  lsSupreme: "0.01em",   lsMono: "0.02em",   weight: 500, category: "utility" },
  { name: "caption",   sizePx: 11, sizeRem: "0.6875", lhSupremePx: 16, lhSupremeRem: "1",      lhMonoPx: 16, lhMonoRem: "1",      lsSupreme: "0.005em",  lsMono: "0.01em",   weight: 400, category: "utility" },
  { name: "overline",  sizePx: 10, sizeRem: "0.625",  lhSupremePx: 14, lhSupremeRem: "0.875",  lhMonoPx: 14, lhMonoRem: "0.875",  lsSupreme: "0.08em",   lsMono: "0.1em",    weight: 700, category: "utility" },
  { name: "indicator", sizePx: 10, sizeRem: "0.625",  lhSupremePx: 14, lhSupremeRem: "0.875",  lhMonoPx: 14, lhMonoRem: "0.875",  lsSupreme: "0.02em",   lsMono: "0.04em",   weight: 400, category: "utility" },
];

const CATEGORY_LABELS: Record<string, string> = {
  display: "Display",
  heading: "Headings",
  body: "Body",
  utility: "Utility",
};

/* ══════════════════════════════════════════════════════════════
   FONT DATA
   ══════════════════════════════════════════════════════════════ */

type FontTab = "supreme" | "mono";
const TAB_ITEMS: { value: FontTab; label: string }[] = [
  { value: "supreme", label: "Supreme" },
  { value: "mono", label: "JetBrains Mono" },
];

type FontInfo = {
  name: string;
  role: string;
  cssVar: string;
  fontStack: string;
  specimen: string;
  weights: { value: number; label: string }[];
  note: string;
  fontFamily: string;
  source: string;
  sourceUrl: string;
};

const FONT_DATA: Record<FontTab, FontInfo> = {
  supreme: {
    name: "Supreme",
    role: "Primary typeface",
    cssVar: "--font-family-supreme",
    fontStack: "font-family: 'Supreme', sans-serif;",
    specimen: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789 !@#$%&*",
    weights: [
      { value: 200, label: "ExtraLight" },
      { value: 300, label: "Light" },
      { value: 400, label: "Regular" },
      { value: 500, label: "Medium" },
      { value: 700, label: "Bold" },
      { value: 800, label: "ExtraBold" },
    ],
    note: "Used for all UI text, headings, and body copy.",
    fontFamily: "var(--font-family-supreme)",
    source: "Fontshare",
    sourceUrl: "https://www.fontshare.com/fonts/supreme",
  },
  mono: {
    name: "JetBrains Mono",
    role: "Monospace typeface",
    cssVar: "--font-family-mono",
    fontStack: "font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;",
    specimen: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789 !@#$%&*",
    weights: [
      { value: 100, label: "Thin" },
      { value: 200, label: "ExtraLight" },
      { value: 300, label: "Light" },
      { value: 400, label: "Regular" },
      { value: 500, label: "Medium" },
      { value: 600, label: "SemiBold" },
      { value: 700, label: "Bold" },
      { value: 800, label: "ExtraBold" },
    ],
    note: "Used for token names, code snippets, labels, and data. Features dotted zeros for data legibility.",
    fontFamily: "var(--font-family-mono)",
    source: "Google Fonts",
    sourceUrl: "https://fonts.google.com/specimen/JetBrains+Mono",
  },
};

/* ══════════════════════════════════════════════════════════════
   CODE BLOCK (IBM-style)
   ══════════════════════════════════════════════════════════════ */

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {label && (
        <div
          className="flex items-center justify-between"
          style={{
            padding: "var(--space-3) var(--space-5)",
            backgroundColor: "var(--preview-header-bg)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--text-overline)",
              color: "var(--muted-foreground)",
              textTransform: "uppercase",
              letterSpacing: "var(--ls-overline)",
              fontWeight: "var(--font-weight-bold)" as any,
            }}
          >
            {label}
          </span>
        </div>
      )}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "var(--space-5) var(--space-6)",
          backgroundColor: "var(--card)",
        }}
      >
        <code
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "var(--text-body-sm)",
            color: "var(--foreground)",
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {code}
        </code>
        <div className="shrink-0 ml-4">
          <CopyButton text={code} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TYPE SCALE TABLE
   ══════════════════════════════════════════════════════════════ */

function TypeScaleTable({ font }: { font: FontTab }) {
  const grouped = typeScale.reduce(
    (acc, step) => {
      if (!acc[step.category]) acc[step.category] = [];
      acc[step.category].push(step);
      return acc;
    },
    {} as Record<string, TypeStep[]>,
  );

  const categories = ["display", "heading", "body", "utility"];
  const fontFamily = font === "supreme" ? "var(--font-family-supreme)" : "var(--font-family-mono)";

  const headStyle: React.CSSProperties = {
    fontSize: "var(--text-overline)",
    fontWeight: "var(--font-weight-bold)" as any,
    letterSpacing: "var(--ls-overline)",
    textTransform: "uppercase",
    color: "var(--muted-foreground)",
    fontFamily: "var(--font-family-supreme)",
    padding: "0",
  };

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-9)" }}>
      {categories.map((cat) => {
        const steps = grouped[cat];
        if (!steps) return null;
        return (
          <div key={cat}>
            {/* Category label */}
            <div
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-caption)",
                fontWeight: "var(--font-weight-bold)" as any,
                letterSpacing: "var(--ls-overline)",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                marginBottom: "var(--space-5)",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </div>

            {/* Table */}
            <div
              style={{
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                backgroundColor: "var(--background)",
              }}
            >
              {/* Table header */}
              <div
                className="grid items-center"
                style={{
                  gridTemplateColumns: "140px 100px 100px 100px 1fr",
                  padding: "var(--space-3) var(--space-7)",
                  backgroundColor: "var(--preview-header-bg)",
                  borderBottom: "1px solid var(--border-subtle)",
                  gap: 0,
                }}
              >
                <span style={headStyle}>Name</span>
                <span style={headStyle}>Size</span>
                <span style={headStyle}>Line Height</span>
                <span style={headStyle}>Tracking</span>
                <span style={{ ...headStyle, textAlign: "left" }}>Sample</span>
              </div>

              {/* Rows */}
              {steps.map((step, idx) => {
                const lh = font === "supreme" ? step.lhSupremePx : step.lhMonoPx;
                const lhRem = font === "supreme" ? step.lhSupremeRem : step.lhMonoRem;
                const ls = font === "supreme" ? step.lsSupreme : step.lsMono;

                return (
                  <div
                    key={step.name}
                    className="grid items-center"
                    style={{
                      gridTemplateColumns: "140px 100px 100px 100px 1fr",
                      padding: "0 var(--space-7)",
                      borderBottom: idx < steps.length - 1 ? "1px solid var(--border-subtle)" : "none",
                      minHeight: Math.max(step.sizePx * 1.8, 52),
                      gap: 0,
                    }}
                  >
                    {/* Name */}
                    <span
                      style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontSize: "var(--text-meta)",
                        fontWeight: "var(--font-weight-medium)" as any,
                        color: "var(--foreground)",
                      }}
                    >
                      {step.name}
                    </span>
                    {/* Size */}
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "var(--text-caption)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {step.sizePx}
                      <span style={{ opacity: 0.5 }}> / {step.sizeRem}</span>
                    </span>
                    {/* Line Height */}
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "var(--text-caption)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {lh}
                      <span style={{ opacity: 0.5 }}> / {lhRem}</span>
                    </span>
                    {/* Letter Spacing */}
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "var(--text-caption)",
                        color: ls === "0" ? "var(--color-text-disabled)" : "var(--muted-foreground)",
                      }}
                    >
                      {ls}
                    </span>
                    {/* Sample */}
                    <span
                      style={{
                        fontFamily: fontFamily,
                        fontSize: `${step.sizePx}px`,
                        lineHeight: `${lh}px`,
                        letterSpacing: ls,
                        fontWeight: step.weight,
                        color: "var(--foreground)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      The quick brown fox jumps over the lazy dog 1234567890
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FONT WEIGHTS SECTION
   ══════════════════════════════════════════════════════════════ */

function FontWeightsSection({ font }: { font: FontTab }) {
  const info = FONT_DATA[font];
  return (
    <div
      style={{
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
        backgroundColor: "var(--background)",
      }}
    >
      {info.weights.map((w, idx) => (
        <div
          key={w.value}
          className="flex items-center"
          style={{
            padding: "var(--space-6) var(--space-7)",
            borderBottom: idx < info.weights.length - 1 ? "1px solid var(--border-subtle)" : "none",
            gap: "var(--space-7)",
          }}
        >
          {/* Weight label */}
          <div className="shrink-0" style={{ width: 120 }}>
            <span
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-meta)",
                fontWeight: "var(--font-weight-medium)" as any,
                color: "var(--foreground)",
              }}
            >
              {w.label}
            </span>
            <div
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--text-overline)",
                color: "var(--muted-foreground)",
                marginTop: "var(--space-1)",
              }}
            >
              {w.value}
            </div>
          </div>
          {/* Sample */}
          <span
            style={{
              fontFamily: info.fontFamily,
              fontSize: "var(--text-h2)",
              fontWeight: w.value,
              color: "var(--foreground)",
              lineHeight: "var(--lh-h2)",
              letterSpacing: "var(--ls-h2)",
            }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */

export function TypographyPage() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<FontTab>(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "mono" || hash === "jetbrains-mono") return "mono";
    return "supreme";
  });
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Sync tab with URL hash changes (e.g. back/forward navigation) */
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash === "mono" || hash === "jetbrains-mono") {
      setActiveTab("mono");
    } else if (hash === "supreme" || hash === "") {
      setActiveTab("supreme");
    }
  }, [location.hash]);

  /* Update URL hash when tab changes */
  const handleTabChange = useCallback((tab: FontTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  }, []);

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

  const info = FONT_DATA[activeTab];
  const scaleCount = typeScale.length;

  return (
    <div
      className="min-h-full"
      style={{
        backgroundColor: "var(--secondary-subtle)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* ── Sticky breadcrumb bar with centered tabs ──────── */}
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
            <span style={{ fontSize: "var(--text-caption)", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)" as any, fontFamily: "var(--font-family-supreme)" }}>Typography</span>
          </div>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-5)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{scaleCount} sizes · {info.weights.length} weights</span>
            <BreadcrumbSearch />
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
                  onClick={() => handleTabChange(tab.value)}
                  className="relative flex items-center justify-center cursor-pointer select-none outline-none transition-colors duration-[var(--duration-short-3)]"
                  style={{
                    height: "72px",
                    padding: "0 var(--space-5)",
                    fontSize: "var(--text-body)",
                    fontWeight: isActive ? ("var(--font-weight-medium)" as any) : ("var(--font-weight-regular)" as any),
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
        {/* Page header */}
        <div
          className="border-b"
          style={{
            paddingTop: "var(--space-10)",
            paddingBottom: "var(--space-9)",
            borderColor: "var(--secondary)",
          }}
        >
          <h1
            style={{
              fontSize: "var(--text-huge)",
              fontWeight: "var(--font-weight-bold)" as any,
              color: "var(--foreground)",
              lineHeight: "var(--lh-huge)",
              letterSpacing: "var(--ls-huge)",
              fontFamily: "var(--font-family-supreme)",
              marginBottom: "var(--space-5)",
            }}
          >
            Typography
          </h1>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              fontFamily: "var(--font-family-supreme)",
              maxWidth: 620,
            }}
          >
            HollaEx uses two typefaces —{" "}
            <strong style={{ fontWeight: "var(--font-weight-bold)" as any, color: "var(--foreground)" }}>
              Supreme
            </strong>{" "}
            for UI copy and{" "}
            <strong style={{ fontWeight: "var(--font-weight-bold)" as any, color: "var(--foreground)" }}>
              JetBrains Mono
            </strong>{" "}
            for code, tokens, and data. Together they define a {scaleCount}-step
            type scale from{" "}
            <code
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--text-body)",
                backgroundColor: "var(--secondary)",
                padding: "2px 6px",
                borderRadius: "var(--radius-xs)",
              }}
            >
              huge
            </code>{" "}
            to{" "}
            <code
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--text-body)",
                backgroundColor: "var(--secondary)",
                padding: "2px 6px",
                borderRadius: "var(--radius-xs)",
              }}
            >
              indicator
            </code>
            .
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
           SECTION 1: Typeface Specimen + Font Stack
           ══════════════════════════════════════════════════ */}
        <section
          id="typeface-specimen"
          data-section-title={`Typeface: ${info.name}`}
          className="border-b section-block"
          style={{
            paddingTop: "var(--space-10)",
            paddingBottom: "var(--space-10)",
            borderColor: "var(--secondary)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--text-h2)",
              fontWeight: "var(--font-weight-bold)" as any,
              color: "var(--foreground)",
              letterSpacing: "var(--ls-h2)",
              fontFamily: "var(--font-family-supreme)",
              marginBottom: "var(--space-3)",
            }}
          >
            Typeface: {info.name}
          </h2>
          <p
            style={{
              fontSize: "var(--text-label)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-supreme)",
              marginBottom: "var(--space-8)",
              lineHeight: 1.6,
              maxWidth: 600,
            }}
          >
            {info.note} {info.name} can be accessed and downloaded from the{" "}
            <a
              href={info.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-text-brand)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              {info.source}
            </a>
            .
          </p>

          {/* Font specimen */}
          <div
            style={{
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border-subtle)",
              overflow: "hidden",
              backgroundColor: "var(--background)",
              padding: "var(--space-9) var(--space-8)",
              marginBottom: "var(--space-8)",
            }}
          >
            <div
              style={{
                fontFamily: info.fontFamily,
                fontSize: "var(--text-display)",
                fontWeight: "var(--font-weight-bold)" as any,
                color: "var(--foreground)",
                lineHeight: "var(--lh-display)",
                letterSpacing: "var(--ls-display)",
                whiteSpace: "pre-line",
              }}
            >
              {info.specimen}
            </div>
          </div>

          {/* Font stack code block */}
          <div
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)" as any,
              color: "var(--foreground)",
              marginBottom: "var(--space-4)",
            }}
          >
            {info.role === "Primary typeface" ? "Sans-serif" : "Monospace"} font
            stack
          </div>
          <CodeBlock code={info.fontStack} label="CSS" />

          {/* CSS variable block */}
          <div style={{ marginTop: "var(--space-6)" }}>
            <div
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)" as any,
                color: "var(--foreground)",
                marginBottom: "var(--space-4)",
              }}
            >
              CSS Variable
            </div>
            <CodeBlock
              code={`var(${info.cssVar})`}
              label="Usage"
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
           SECTION 2: Type Scale
           ══════════════════════════════════════════════════ */}
        <section
          id="type-scale"
          data-section-title="Type Scale"
          className="border-b section-block"
          style={{
            paddingTop: "var(--space-10)",
            paddingBottom: "var(--space-10)",
            borderColor: "var(--secondary)",
          }}
        >
          <div className="flex items-start justify-between" style={{ marginBottom: "var(--space-8)" }}>
            <div>
              <h2
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-bold)" as any,
                  color: "var(--foreground)",
                  letterSpacing: "var(--ls-h2)",
                  fontFamily: "var(--font-family-supreme)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Type Scale
              </h2>
              <p
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-family-supreme)",
                  maxWidth: 520,
                  lineHeight: 1.6,
                }}
              >
                {scaleCount} steps organized into four groups. Sizes shown in px
                and rem (base 16px). Line-height and letter-spacing are tuned
                per size for optical balance.
              </p>
            </div>
            <span
              className="mt-1 px-2.5 py-1 shrink-0"
              style={{
                fontSize: "var(--text-caption)",
                color: "var(--muted-foreground)",
                backgroundColor: "var(--secondary)",
                borderRadius: "var(--radius-chip)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              {scaleCount} sizes
            </span>
          </div>

          <TypeScaleTable font={activeTab} />
        </section>

        {/* ══════════════════════════════════════════════════
           SECTION 3: Font Weights
           ══════════════════════════════════════════════════ */}
        <section
          id="font-weights"
          data-section-title="Font Weights"
          className="border-b section-block"
          style={{
            paddingTop: "var(--space-10)",
            paddingBottom: "var(--space-10)",
            borderColor: "var(--secondary)",
          }}
        >
          <div className="flex items-start justify-between" style={{ marginBottom: "var(--space-8)" }}>
            <div>
              <h2
                style={{
                  fontSize: "var(--text-h2)",
                  fontWeight: "var(--font-weight-bold)" as any,
                  color: "var(--foreground)",
                  letterSpacing: "var(--ls-h2)",
                  fontFamily: "var(--font-family-supreme)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Font Weights
              </h2>
              <p
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-family-supreme)",
                  maxWidth: 480,
                  lineHeight: 1.6,
                }}
              >
                All available weights for {info.name}, rendered at 28px for
                visual comparison.
              </p>
            </div>
            <span
              className="mt-1 px-2.5 py-1 shrink-0"
              style={{
                fontSize: "var(--text-caption)",
                color: "var(--muted-foreground)",
                backgroundColor: "var(--secondary)",
                borderRadius: "var(--radius-chip)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              {info.weights.length} weights
            </span>
          </div>

          <FontWeightsSection font={activeTab} />
        </section>

        {/* ══════════════════════════════════════════════════
           SECTION 4: Usage Code Block
           ══════════════════════════════════════════════════ */}
        <section
          id="usage"
          data-section-title="Usage"
          className="section-block"
          style={{
            paddingTop: "var(--space-10)",
            paddingBottom: "var(--space-10)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--text-h2)",
              fontWeight: "var(--font-weight-bold)" as any,
              color: "var(--foreground)",
              letterSpacing: "var(--ls-h2)",
              fontFamily: "var(--font-family-supreme)",
              marginBottom: "var(--space-3)",
            }}
          >
            Usage
          </h2>
          <p
            style={{
              fontSize: "var(--text-label)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-supreme)",
              marginBottom: "var(--space-8)",
              lineHeight: 1.6,
              maxWidth: 520,
            }}
          >
            Reference typography tokens in your components via CSS variables. All
            sizes, line-heights, and letter-spacing are baked into the token
            definitions.
          </p>

          <div className="flex flex-col" style={{ gap: "var(--space-6)" }}>
            <CodeBlock
              label="CSS"
              code={`.heading {\n  font-family: var(${info.cssVar});\n  font-size: 32px;   /* h1 */\n  line-height: ${activeTab === "supreme" ? "40px" : "44px"};  /* h1 line-height */\n  letter-spacing: ${activeTab === "supreme" ? "-0.01em" : "-0.005em"};\n  font-weight: 700;\n}`}
            />
            <CodeBlock
              label="React / JSX"
              code={`<h1\n  style={{\n    fontFamily: "var(${info.cssVar})",\n    fontSize: "32px",\n    lineHeight: "${activeTab === "supreme" ? "40px" : "44px"}",\n    letterSpacing: "${activeTab === "supreme" ? "-0.01em" : "-0.005em"}",\n    fontWeight: 700,\n  }}\n>\n  Heading\n</h1>`}
            />
            <CodeBlock
              label="Tailwind / Inline"
              code={`/* Use CSS variables in Tailwind v4 */\n.my-heading {\n  font-family: var(${info.cssVar});\n  /* All type tokens are available as CSS vars */\n}`}
            />
          </div>
        </section>

        {/* Footer */}
        <div
          className="border-t flex items-center justify-between"
          style={{
            paddingTop: "var(--space-7)",
            paddingBottom: "var(--space-8)",
            borderColor: "var(--secondary)",
          }}
        >
          <p
            style={{
              fontSize: "var(--text-meta)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            HollaEx Design System · Typography
          </p>
          <p
            style={{
              fontSize: "var(--text-meta)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>{scaleCount}</span> sizes · <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>{info.weights.length}</span> weights · base <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>16</span>px
          </p>
        </div>
      </div>
      <SectionJumpFab iconMap={FAB_ICONS} />
    </div>
  );
}

function BreadcrumbSearch() {
  const ctx = useOutletContext<{ open: boolean; setOpen: (v: boolean) => void } | undefined>();
  if (!ctx) return null;
  return <SearchTrigger onClick={() => ctx.setOpen(true)} />;
}