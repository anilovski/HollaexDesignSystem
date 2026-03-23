import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { useState, useRef, useEffect } from "react";
import { cn } from "../ui/utils";
import { IconRuler, IconGrid4x4, IconColumns, IconLayout, IconArrowsMaximize } from "@tabler/icons-react";
import type { ComponentType } from "react";

const FAB_ICONS: Record<string, ComponentType<{ size?: number; stroke?: number }>> = {
  "Breakpoints": IconRuler,
  "Grid Types": IconGrid4x4,
  "Column Grid": IconColumns,
  "Layout Patterns": IconLayout,
  "Responsive Behavior": IconArrowsMaximize,
};

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

type Breakpoint = {
  name: string;
  token: string;
  width: number;
  columns: number;
  gutter: number;
  margin: number;
  description: string;
};

const breakpoints: Breakpoint[] = [
  { name: "Small", token: "sm", width: 360, columns: 2, gutter: 16, margin: 16, description: "Mobile phones" },
  { name: "Medium", token: "md", width: 600, columns: 4, gutter: 16, margin: 24, description: "Tablets (portrait)" },
  { name: "Large", token: "lg", width: 1024, columns: 8, gutter: 20, margin: 32, description: "Tablets (landscape) / Small desktops" },
  { name: "Extra Large", token: "xl", width: 1440, columns: 12, gutter: 20, margin: 40, description: "Standard desktops" },
  { name: "2X Large", token: "2xl", width: 1560, columns: 18, gutter: 20, margin: 40, description: "Large desktops / Ultrawide" },
];

type GridType = {
  name: string;
  description: string;
  id: string;
};

const gridTypes: GridType[] = [
  { name: "Column Grid", id: "column", description: "Standard equal-width columns. Best for aligning content in consistent vertical slices across the page." },
  { name: "Modular Grid", id: "modular", description: "Columns and rows form a matrix of cells. Useful for card-based layouts and dashboards with uniform tile sizes." },
  { name: "Hierarchical Grid", id: "hierarchical", description: "Asymmetric column spans create primary and secondary content regions. Used for pages like the Dashboard and Withdraw flows." },
];

type LayoutPattern = {
  name: string;
  description: string;
  id: string;
  desktop: { areas: string; columns: string; };
  tablet: { areas: string; columns: string; };
  mobile: { areas: string; columns: string; };
  zones: { name: string; area: string; color: string; }[];
};

const layoutPatterns: LayoutPattern[] = [
  {
    name: "Sidebar + Content",
    description: "Standard layout used across most pages. Fixed sidebar with scrollable content area.",
    id: "sidebar-content",
    desktop: { areas: "'sidebar content'", columns: "190px 1fr" },
    tablet: { areas: "'content'", columns: "1fr" },
    mobile: { areas: "'content'", columns: "1fr" },
    zones: [
      { name: "Sidebar", area: "sidebar", color: "var(--brand-default)" },
      { name: "Content", area: "content", color: "#6366f1" },
    ],
  },
  {
    name: "Sidebar + Two Panel",
    description: "Used for transactional pages like Withdraw. Primary panel for forms, secondary for history/details.",
    id: "sidebar-two-panel",
    desktop: { areas: "'sidebar primary secondary'", columns: "190px 1fr 380px" },
    tablet: { areas: "'primary' 'secondary'", columns: "1fr" },
    mobile: { areas: "'primary' 'secondary'", columns: "1fr" },
    zones: [
      { name: "Sidebar", area: "sidebar", color: "var(--brand-default)" },
      { name: "Primary", area: "primary", color: "#6366f1" },
      { name: "Secondary", area: "secondary", color: "#8b5cf6" },
    ],
  },
  {
    name: "Dashboard Grid",
    description: "Complex hierarchical layout for the Summary page. Multiple widget areas that stack on smaller screens.",
    id: "dashboard",
    desktop: { areas: "'sidebar header header' 'sidebar chart announce' 'sidebar prices portfolio' 'sidebar watchlist trade'", columns: "190px 1fr 340px" },
    tablet: { areas: "'header' 'chart' 'announce' 'prices' 'portfolio' 'watchlist' 'trade'", columns: "1fr" },
    mobile: { areas: "'header' 'chart' 'announce' 'prices' 'portfolio' 'watchlist' 'trade'", columns: "1fr" },
    zones: [
      { name: "Sidebar", area: "sidebar", color: "var(--brand-default)" },
      { name: "Header", area: "header", color: "#6366f1" },
      { name: "Chart", area: "chart", color: "#8b5cf6" },
      { name: "Announcements", area: "announce", color: "#a78bfa" },
      { name: "Coin Prices", area: "prices", color: "#c4b5fd" },
      { name: "Portfolio", area: "portfolio", color: "#7c3aed" },
      { name: "Watchlist", area: "watchlist", color: "#5b21b6" },
      { name: "Quick Trade", area: "trade", color: "#4c1d95" },
    ],
  },
  {
    name: "Centered Single Column",
    description: "Narrow centered content area. Used for auth pages, onboarding flows, and focused forms.",
    id: "centered",
    desktop: { areas: "'content'", columns: "minmax(0, 560px)" },
    tablet: { areas: "'content'", columns: "minmax(0, 560px)" },
    mobile: { areas: "'content'", columns: "1fr" },
    zones: [
      { name: "Content", area: "content", color: "#6366f1" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   BREAKPOINT TABLE
   ══════════════════════════════════════════════════════════════ */

function BreakpointTable() {
  return (
    <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-family-supreme)" }}>
        <thead>
          <tr style={{ backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
            {["Name", "Token", "Min Width", "Columns", "Gutter", "Margin", "Usage"].map((h) => (
              <th key={h} style={{ padding: "var(--space-4) var(--space-5)", textAlign: "left", fontSize: "var(--text-overline)", fontWeight: "var(--font-weight-bold)" as any, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {breakpoints.map((bp, i) => (
            <tr key={bp.token} style={{ borderBottom: i < breakpoints.length - 1 ? "1px solid var(--border-subtle)" : undefined }}>
              <td style={{ padding: "var(--space-4) var(--space-5)", fontWeight: "var(--font-weight-semibold)" as any, fontSize: "var(--text-body-sm)" }}>{bp.name}</td>
              <td style={{ padding: "var(--space-4) var(--space-5)" }}>
                <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", backgroundColor: "var(--muted)", padding: "2px 6px", borderRadius: "var(--radius)" }}>{bp.token}</code>
              </td>
              <td style={{ padding: "var(--space-4) var(--space-5)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)" }}>{bp.width}px</td>
              <td style={{ padding: "var(--space-4) var(--space-5)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)" }}>{bp.columns}</td>
              <td style={{ padding: "var(--space-4) var(--space-5)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)" }}>{bp.gutter}px</td>
              <td style={{ padding: "var(--space-4) var(--space-5)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)" }}>{bp.margin}px</td>
              <td style={{ padding: "var(--space-4) var(--space-5)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>{bp.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COLUMN GRID VISUALIZER
   ══════════════════════════════════════════════════════════════ */

function ColumnGridVisualizer() {
  const [activeBp, setActiveBp] = useState<string>("xl");
  const bp = breakpoints.find((b) => b.token === activeBp)!;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([e]) => setContainerWidth(e.contentRect.width));
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const scale = containerWidth > 0 ? Math.min(1, containerWidth / bp.width) : 1;
  const scaledWidth = bp.width * scale;
  const scaledMargin = bp.margin * scale;
  const scaledGutter = bp.gutter * scale;
  const totalGutters = (bp.columns - 1) * scaledGutter;
  const colWidth = (scaledWidth - 2 * scaledMargin - totalGutters) / bp.columns;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      {/* Breakpoint selector tabs */}
      <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
        {breakpoints.map((b) => (
          <button
            key={b.token}
            onClick={() => setActiveBp(b.token)}
            className="cursor-pointer"
            style={{
              padding: "var(--space-3) var(--space-5)",
              borderRadius: "var(--radius-button)",
              border: activeBp === b.token ? "2px solid var(--brand-default)" : "1px solid var(--border-subtle)",
              backgroundColor: activeBp === b.token ? "var(--brand-default)" : "transparent",
              color: activeBp === b.token ? "white" : "var(--foreground)",
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-semibold)" as any,
              transition: "all 150ms ease",
            }}
          >
            {b.token.toUpperCase()} ({b.columns}col)
          </button>
        ))}
      </div>

      {/* Grid preview */}
      <div ref={containerRef} style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden", backgroundColor: "var(--background)" }}>
        {/* Header bar */}
        <div className="flex items-center justify-between" style={{ padding: "var(--space-3) var(--space-5)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
          <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-overline)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "var(--font-weight-bold)" as any }}>
            {bp.name} &mdash; {bp.width}px &times; {bp.columns} columns
          </span>
          <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>
            Gutter: {bp.gutter}px &middot; Margin: {bp.margin}px
          </span>
        </div>

        {/* Columns */}
        <div style={{ padding: "var(--space-7) 0", display: "flex", justifyContent: "center" }}>
          <div style={{ width: scaledWidth, height: 200, position: "relative", backgroundColor: "var(--muted)" }}>
            {/* Margin indicators */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: scaledMargin, backgroundColor: "rgba(239,68,68,0.08)", borderRight: "1px dashed rgba(239,68,68,0.3)" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: scaledMargin, backgroundColor: "rgba(239,68,68,0.08)", borderLeft: "1px dashed rgba(239,68,68,0.3)" }} />

            {/* Columns */}
            <div style={{ position: "absolute", left: scaledMargin, right: scaledMargin, top: 0, bottom: 0, display: "flex", gap: scaledGutter }}>
              {Array.from({ length: bp.columns }).map((_, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: "rgba(99,102,241,0.15)", borderRadius: 2, position: "relative" }}>
                  {colWidth > 20 && (
                    <span style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-family-mono)", fontSize: 9, color: "rgba(99,102,241,0.6)", whiteSpace: "nowrap" }}>
                      {i + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GRID TYPES OVERVIEW
   ══════════════════════════════════════════════════════════════ */

function GridTypesOverview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-5)" }}>
      {gridTypes.map((gt) => (
        <div key={gt.id} style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
          {/* Mini grid preview */}
          <div style={{ padding: "var(--space-7)", backgroundColor: "var(--muted)", display: "flex", justifyContent: "center" }}>
            <MiniGrid type={gt.id} />
          </div>
          <div style={{ padding: "var(--space-5)", borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ fontWeight: "var(--font-weight-semibold)" as any, fontSize: "var(--text-body-sm)", marginBottom: "var(--space-2)" }}>{gt.name}</div>
            <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", lineHeight: 1.5 }}>{gt.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniGrid({ type }: { type: string }) {
  const cols = 6;
  const rows = 4;

  if (type === "column") {
    return (
      <div style={{ width: 180, height: 100, display: "flex", gap: 4 }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: "rgba(99,102,241,0.2)", borderRadius: 2 }} />
        ))}
      </div>
    );
  }

  if (type === "modular") {
    return (
      <div style={{ width: 180, height: 100, display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: 4 }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div key={i} style={{ backgroundColor: "rgba(99,102,241,0.2)", borderRadius: 2 }} />
        ))}
      </div>
    );
  }

  // hierarchical
  return (
    <div style={{ width: 180, height: 100, display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4 }}>
      <div style={{ backgroundColor: "rgba(99,102,241,0.3)", borderRadius: 2, gridRow: "1 / 3" }} />
      <div style={{ backgroundColor: "rgba(99,102,241,0.15)", borderRadius: 2 }} />
      <div style={{ backgroundColor: "rgba(99,102,241,0.15)", borderRadius: 2 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   LAYOUT PATTERN CARD
   ══════════════════════════════════════════════════════════════ */

function LayoutPatternCard({ pattern }: { pattern: LayoutPattern }) {
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const layout = activeView === "desktop" ? pattern.desktop : activeView === "tablet" ? pattern.tablet : pattern.mobile;
  const visibleZones = activeView === "desktop" ? pattern.zones : pattern.zones.filter((z) => z.area !== "sidebar");
  const containerMaxWidth = activeView === "desktop" ? "100%" : activeView === "tablet" ? 600 : 360;

  return (
    <div style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: "var(--space-4) var(--space-5)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div>
          <div style={{ fontWeight: "var(--font-weight-semibold)" as any, fontSize: "var(--text-body-sm)" }}>{pattern.name}</div>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: 2 }}>{pattern.description}</div>
        </div>
        <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
          {(["desktop", "tablet", "mobile"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className="cursor-pointer"
              style={{
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius-button)",
                border: activeView === v ? "1.5px solid var(--brand-default)" : "1px solid var(--border-subtle)",
                backgroundColor: activeView === v ? "var(--brand-default)" : "transparent",
                color: activeView === v ? "white" : "var(--muted-foreground)",
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-caption)",
                fontWeight: "var(--font-weight-semibold)" as any,
                textTransform: "capitalize",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div style={{ padding: "var(--space-7)", backgroundColor: "var(--background)", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "100%",
            maxWidth: containerMaxWidth,
            minHeight: pattern.id === "dashboard" ? 280 : 180,
            display: "grid",
            gridTemplateAreas: layout.areas,
            gridTemplateColumns: layout.columns,
            gap: "var(--space-4)",
            transition: "all 300ms ease",
          }}
        >
          {visibleZones.map((zone) => (
            <div
              key={zone.area}
              style={{
                gridArea: zone.area,
                backgroundColor: zone.color,
                opacity: 0.15,
                borderRadius: "var(--radius)",
                minHeight: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border: `2px solid ${zone.color}`,
              }}
            >
              <span style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" as any, color: zone.color, opacity: 1, position: "relative", zIndex: 1 }}>
                {zone.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code snippet */}
      <div style={{ padding: "var(--space-4) var(--space-5)", backgroundColor: "var(--preview-header-bg)", borderTop: "1px solid var(--border-subtle)" }}>
        <code style={{ fontFamily: "var(--font-family-mono)", fontSize: 11, color: "var(--muted-foreground)", lineHeight: 1.6, display: "block", whiteSpace: "pre-wrap" }}>
          {`grid-template-areas: ${layout.areas};\ngrid-template-columns: ${layout.columns};`}
        </code>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE RESIZE DEMO
   ══════════════════════════════════════════════════════════════ */

function ResizeDemo() {
  const [width, setWidth] = useState(1200);
  const currentBp = [...breakpoints].reverse().find((b) => width >= b.width) || breakpoints[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      {/* Slider */}
      <div className="flex items-center" style={{ gap: "var(--space-5)" }}>
        <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)", minWidth: 50 }}>360px</span>
        <input
          type="range"
          min={360}
          max={1560}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          style={{ flex: 1, accentColor: "var(--brand-default)" }}
        />
        <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--muted-foreground)", minWidth: 60 }}>1560px</span>
      </div>

      {/* Current breakpoint indicator */}
      <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
        <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)" as any }}>{width}px</span>
        <span style={{ padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-button)", backgroundColor: "var(--brand-default)", color: "white", fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-semibold)" as any }}>
          {currentBp.token.toUpperCase()} &mdash; {currentBp.columns} columns
        </span>
      </div>

      {/* Live grid preview */}
      <div style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
        <div style={{ padding: "var(--space-3) var(--space-5)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
          <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-overline)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "var(--font-weight-bold)" as any }}>
            Live preview &mdash; Drag the slider to resize
          </span>
        </div>
        <div style={{ padding: "var(--space-7)", display: "flex", justifyContent: "center", backgroundColor: "var(--muted)" }}>
          <div style={{ width, maxWidth: "100%", transition: "width 100ms ease" }}>
            {/* Simulated page layout */}
            <div style={{ display: "grid", gridTemplateColumns: width >= 1024 ? "160px 1fr 260px" : "1fr", gap: 8, minHeight: 200 }}>
              {/* Sidebar */}
              {width >= 1024 && (
                <div style={{ backgroundColor: "rgba(59,130,246,0.12)", border: "1.5px solid rgba(59,130,246,0.3)", borderRadius: 4, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ height: 8, width: "70%", backgroundColor: "rgba(59,130,246,0.2)", borderRadius: 2 }} />
                  <div style={{ height: 6, width: "90%", backgroundColor: "rgba(59,130,246,0.12)", borderRadius: 2 }} />
                  <div style={{ height: 6, width: "80%", backgroundColor: "rgba(59,130,246,0.12)", borderRadius: 2 }} />
                  <div style={{ height: 6, width: "60%", backgroundColor: "rgba(59,130,246,0.12)", borderRadius: 2 }} />
                  <div style={{ height: 6, width: "85%", backgroundColor: "rgba(59,130,246,0.12)", borderRadius: 2 }} />
                </div>
              )}

              {/* Main content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {/* Header bar */}
                <div style={{ height: 32, backgroundColor: "rgba(99,102,241,0.1)", border: "1.5px solid rgba(99,102,241,0.25)", borderRadius: 4 }} />
                {/* Content grid */}
                <div style={{ display: "grid", gridTemplateColumns: width >= 600 ? "1fr 1fr" : "1fr", gap: 8, flex: 1 }}>
                  <div style={{ backgroundColor: "rgba(99,102,241,0.08)", border: "1.5px solid rgba(99,102,241,0.2)", borderRadius: 4, minHeight: 100 }} />
                  <div style={{ backgroundColor: "rgba(99,102,241,0.08)", border: "1.5px solid rgba(99,102,241,0.2)", borderRadius: 4, minHeight: 100 }} />
                </div>
              </div>

              {/* Right panel */}
              {width >= 1024 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ backgroundColor: "rgba(139,92,246,0.1)", border: "1.5px solid rgba(139,92,246,0.25)", borderRadius: 4, flex: 1 }} />
                  <div style={{ backgroundColor: "rgba(139,92,246,0.08)", border: "1.5px solid rgba(139,92,246,0.2)", borderRadius: 4, height: 60 }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */

export function LayoutGridPage() {
  return (
    <ComponentPage
      name="Layout & Grid"
      description="Grid systems, breakpoints, and responsive layout patterns. These define how content is structured and adapts across screen sizes to create consistent, predictable page layouts."
      breadcrumbPrefix="Foundation"
      fabIconMap={FAB_ICONS}
    >
      <Section title="Breakpoints" description="Five responsive breakpoints govern the grid system. Each defines the minimum viewport width, column count, gutter size, and page margin.">
        <ExampleGrid label="Breakpoint reference">
          <BreakpointTable />
        </ExampleGrid>
      </Section>

      <Section title="Grid Types" description="Three grid approaches are used depending on content complexity. Column grids for standard alignment, modular grids for card-based layouts, and hierarchical grids for asymmetric page structures.">
        <ExampleGrid label="Grid type comparison">
          <GridTypesOverview />
        </ExampleGrid>
      </Section>

      <Section title="Column Grid" description="Interactive column grid visualizer. Select a breakpoint to preview its column structure, gutter spacing, and page margins.">
        <ExampleGrid label="Column grid visualizer">
          <ColumnGridVisualizer />
        </ExampleGrid>
      </Section>

      <Section title="Layout Patterns" description="Common page layout structures derived from the HollaEx product. Each pattern shows how grid areas map to content regions at desktop, tablet, and mobile breakpoints.">
        {layoutPatterns.map((p) => (
          <ExampleGrid key={p.id} label={p.name}>
            <LayoutPatternCard pattern={p} />
          </ExampleGrid>
        ))}
      </Section>

      <Section title="Responsive Behavior" description="Drag the slider to simulate different viewport widths and observe how the layout adapts across breakpoints. The sidebar collapses below 1024px and content panels stack below 600px.">
        <ExampleGrid label="Interactive resize demo">
          <ResizeDemo />
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}
