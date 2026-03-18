import { HxThemeToggle } from "../ui/hx-toggle";
import { useOutletContext } from "react-router";
import { SearchTrigger } from "../docs/search-command";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/hollaex-button";
import { SectionJumpFab } from "../docs/section-jump-fab";

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
   CODE BLOCK
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
   SPACING DATA
   ══════════════════════════════════════════════════════════════ */

type SpaceStep = {
  token: string;
  cssVar: string;
  px: number;
  rem: string;
  category: "micro" | "element" | "layout" | "page";
  usage: string;
};

const spacingScale: SpaceStep[] = [
  // ── Micro ──
  { token: "space-0",  cssVar: "--space-0",  px: 0,   rem: "0",      category: "micro",   usage: "Reset / zero spacing" },
  { token: "space-1",  cssVar: "--space-1",  px: 2,   rem: "0.125",  category: "micro",   usage: "Tight icon gaps, hairline offsets" },
  { token: "space-2",  cssVar: "--space-2",  px: 4,   rem: "0.25",   category: "micro",   usage: "Inline icon–text gap, badge padding" },
  { token: "space-3",  cssVar: "--space-3",  px: 8,   rem: "0.5",    category: "micro",   usage: "Button icon gap, input padding-y, chip padding" },
  // ── Element ──
  { token: "space-4",  cssVar: "--space-4",  px: 12,  rem: "0.75",   category: "element", usage: "Table cell padding-y, compact card padding" },
  { token: "space-5",  cssVar: "--space-5",  px: 16,  rem: "1",      category: "element", usage: "Default element padding, stack gap, input padding-x" },
  { token: "space-6",  cssVar: "--space-6",  px: 20,  rem: "1.25",   category: "element", usage: "Modal padding-y, medium component spacing" },
  { token: "space-7",  cssVar: "--space-7",  px: 24,  rem: "1.5",    category: "element", usage: "Card padding, modal padding-x, form group gap" },
  // ── Layout ──
  { token: "space-8",  cssVar: "--space-8",  px: 32,  rem: "2",      category: "layout",  usage: "Section padding, card group gap, sidebar padding" },
  { token: "space-9",  cssVar: "--space-9",  px: 40,  rem: "2.5",    category: "layout",  usage: "Section separation, major group margins" },
  { token: "space-10", cssVar: "--space-10", px: 48,  rem: "3",      category: "layout",  usage: "Page content top/bottom padding" },
  { token: "space-11", cssVar: "--space-11", px: 56,  rem: "3.5",    category: "layout",  usage: "Large section dividers" },
  { token: "space-12", cssVar: "--space-12", px: 64,  rem: "4",      category: "layout",  usage: "Hero section spacing, large layout gaps" },
  // ── Page ──
  { token: "space-13", cssVar: "--space-13", px: 80,  rem: "5",      category: "page",    usage: "Page section top margin" },
  { token: "space-14", cssVar: "--space-14", px: 96,  rem: "6",      category: "page",    usage: "Major page block separation" },
  { token: "space-15", cssVar: "--space-15", px: 120, rem: "7.5",    category: "page",    usage: "Hero/feature section vertical rhythm" },
  { token: "space-16", cssVar: "--space-16", px: 160, rem: "10",     category: "page",    usage: "Maximum page-level spacing" },
];

const CATEGORY_LABELS: Record<string, string> = {
  micro: "Micro",
  element: "Element",
  layout: "Layout",
  page: "Page",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  micro: "0–8px. Tight, precise spacing for icons, inline elements, and internal component gaps.",
  element: "12–24px. Default component-level padding and gaps between sibling elements.",
  layout: "32–64px. Section-level spacing, card groups, and sidebar/content boundaries.",
  page: "80–160px. Large-scale vertical rhythm between major page sections.",
};

const LAYOUT_RED = "rgba(255, 72, 72, 0.55)";
const LAYOUT_RED_SOLID = "rgba(255, 72, 72, 0.70)";

/* Component spacing tokens already in theme.css */
const componentTokens = [
  { token: "--table-cell-padding-x",  value: "16px", component: "Table",   usage: "Horizontal cell padding" },
  { token: "--table-cell-padding-y",  value: "12px", component: "Table",   usage: "Vertical cell padding" },
  { token: "--table-header-padding-y", value: "10px", component: "Table",   usage: "Header row vertical padding" },
  { token: "--tab-panel-padding",     value: "16px", component: "Tabs",    usage: "Tab panel content padding" },
  { token: "--modal-padding-x",      value: "24px", component: "Modal",   usage: "Modal horizontal padding" },
  { token: "--modal-padding-y",      value: "20px", component: "Modal",   usage: "Modal vertical padding" },
  { token: "--modal-radius",         value: "12px", component: "Modal",   usage: "Modal border-radius" },
  { token: "--stepper-connector-thickness", value: "2px", component: "Stepper", usage: "Step connector line width" },
  { token: "--scrollbar-size",        value: "6px",  component: "Scrollbar", usage: "Custom scrollbar track width" },
  { token: "--scrollbar-margin",      value: "2px",  component: "Scrollbar", usage: "Scrollbar edge offset" },
];

/* Tabs */
type SpacingTab = "scale" | "tokens" | "guidelines";
const TAB_ITEMS: { value: SpacingTab; label: string }[] = [
  { value: "scale", label: "Scale" },
  { value: "tokens", label: "Tokens" },
  { value: "guidelines", label: "Guidelines" },
];

/* ══════════════════════════════════════════════════════════════
   TABLE HEAD STYLE
   ══════════════════════════════════════════════════════════════ */

const headStyle: React.CSSProperties = {
  fontSize: "var(--text-overline)",
  fontWeight: 700,
  letterSpacing: "var(--ls-overline)",
  textTransform: "uppercase",
  color: "var(--muted-foreground)",
  fontFamily: "var(--font-family-supreme)",
  padding: 0,
};

/* ══════════════════════════════════════════════════════════════
   SCALE TAB
   ══════════════════════════════════════════════════════════════ */

function ScaleTab() {
  const MAX_BAR = 280;
  const MAX_PX = 160;
  const categories = ["micro", "element", "layout", "page"];

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-9)" }}>
      {categories.map((cat) => {
        const steps = spacingScale.filter((s) => s.category === cat);
        const catId = `spacing-${cat}`;
        return (
          <div key={cat} id={catId} data-section-title={CATEGORY_LABELS[cat]} className="section-block">
            {/* Category label */}
            <div style={{ marginBottom: 6 }}>
              <span
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontSize: "var(--text-caption)",
                  fontWeight: "var(--font-weight-bold)" as any,
                  letterSpacing: "var(--ls-overline)",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                }}
              >
                {CATEGORY_LABELS[cat]}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-meta)",
                color: "var(--color-text-tertiary)",
                lineHeight: 1.5,
                marginBottom: "var(--space-5)",
              }}
            >
              {CATEGORY_DESCRIPTIONS[cat]}
            </p>

            {/* Table */}
            <div
              style={{
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                backgroundColor: "var(--background)",
              }}
            >
              {/* Header */}
              <div
                className="grid items-center"
                style={{
                  gridTemplateColumns: "120px 72px 72px 1fr 200px",
                  padding: "var(--space-3) var(--space-7)",
                  backgroundColor: "var(--preview-header-bg)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span style={headStyle}>Token</span>
                <span style={headStyle}>px</span>
                <span style={headStyle}>rem</span>
                <span style={headStyle}>Visual</span>
                <span style={headStyle}>Usage</span>
              </div>

              {/* Rows */}
              {steps.map((step, idx) => {
                const barWidth = step.px === 0 ? 1 : Math.max(2, (step.px / MAX_PX) * MAX_BAR);
                return (
                  <div
                    key={step.token}
                    className="grid items-center group"
                    style={{
                      gridTemplateColumns: "120px 72px 72px 1fr 200px",
                      padding: "0 var(--space-7)",
                      minHeight: 48,
                      borderBottom: idx < steps.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    }}
                  >
                    {/* Token name */}
                    <span
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "var(--text-body-sm)",
                        fontWeight: "var(--font-weight-medium)" as any,
                        color: "var(--foreground)",
                      }}
                    >
                      {step.token}
                    </span>
                    {/* px */}
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "var(--text-caption)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {step.px}
                    </span>
                    {/* rem */}
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "var(--text-caption)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {step.rem}
                    </span>
                    {/* Visual bar */}
                    <div className="flex items-center" style={{ paddingRight: 16 }}>
                      <div
                        style={{
                          height: 12,
                          width: barWidth,
                          borderRadius: 3,
                          backgroundColor: LAYOUT_RED,
                          opacity: step.px === 0 ? 0.3 : 1,
                          transition: "opacity 150ms ease",
                        }}
                      />
                    </div>
                    {/* Usage */}
                    <span
                      style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontSize: "var(--text-caption)",
                        color: "var(--color-text-tertiary)",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.usage}
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
   TOKENS TAB
   ══════════════════════════════════════════════════════════════ */

function TokensTab() {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-9)" }}>
      {/* Base scale tokens */}
      <div id="spacing-base-scale" data-section-title="Base Scale" className="section-block">
        <div style={{ marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-bold)" as any,
              letterSpacing: "var(--ls-overline)",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Base Scale
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-family-supreme)",
            fontSize: "var(--text-meta)",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.5,
            marginBottom: "var(--space-5)",
          }}
        >
          17 steps from 0 to 160px. All tokens live in <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-meta)", backgroundColor: "var(--secondary)", padding: "1px 5px", borderRadius: "var(--radius-xs)" }}>:root</code> and are theme-independent.
        </p>

        <div
          style={{
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-subtle)",
            overflow: "hidden",
            backgroundColor: "var(--background)",
          }}
        >
          {/* Header */}
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: "180px 1fr 120px",
              padding: "var(--space-3) var(--space-7)",
              backgroundColor: "var(--preview-header-bg)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <span style={headStyle}>CSS Variable</span>
            <span style={headStyle}>Value</span>
            <span style={headStyle}>Category</span>
          </div>

          {spacingScale.map((step, idx) => (
            <div
              key={step.token}
              className="grid items-center"
              style={{
                gridTemplateColumns: "180px 1fr 120px",
                padding: "0 var(--space-7)",
                minHeight: 44,
                borderBottom: idx < spacingScale.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-meta)",
                    color: "var(--color-text-brand)",
                  }}
                >
                  {step.cssVar}
                </span>
                <CopyButton text={`var(${step.cssVar})`} />
              </div>
              <span
                className="tabular-nums"
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "var(--text-caption)",
                  color: "var(--muted-foreground)",
                }}
              >
                {step.px}px
                <span style={{ opacity: 0.5 }}> / {step.rem}rem</span>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontSize: "var(--text-caption)",
                  color: "var(--color-text-tertiary)",
                  textTransform: "capitalize",
                }}
              >
                {step.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Component tokens */}
      <div id="spacing-component" data-section-title="Component Spacing" className="section-block">
        <div style={{ marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-bold)" as any,
              letterSpacing: "var(--ls-overline)",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Component Spacing
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-family-supreme)",
            fontSize: "var(--text-meta)",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.5,
            marginBottom: "var(--space-5)",
          }}
        >
          Named tokens scoped to specific components. Override these to customize spacing per-component.
        </p>

        <div
          style={{
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-subtle)",
            overflow: "hidden",
            backgroundColor: "var(--background)",
          }}
        >
          {/* Header */}
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: "240px 80px 100px 1fr",
              padding: "var(--space-3) var(--space-7)",
              backgroundColor: "var(--preview-header-bg)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <span style={headStyle}>CSS Variable</span>
            <span style={headStyle}>Value</span>
            <span style={headStyle}>Component</span>
            <span style={headStyle}>Usage</span>
          </div>

          {componentTokens.map((t, idx) => (
            <div
              key={t.token}
              className="grid items-center"
              style={{
                gridTemplateColumns: "240px 80px 100px 1fr",
                padding: "0 var(--space-7)",
                minHeight: 44,
                borderBottom: idx < componentTokens.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-meta)",
                    color: "var(--color-text-brand)",
                  }}
                >
                  {t.token}
                </span>
                <CopyButton text={`var(${t.token})`} />
              </div>
              <span
                className="tabular-nums"
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "var(--text-caption)",
                  color: "var(--muted-foreground)",
                }}
              >
                {t.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontSize: "var(--text-caption)",
                  fontWeight: "var(--font-weight-medium)" as any,
                  color: "var(--foreground)",
                }}
              >
                {t.component}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontSize: "var(--text-caption)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {t.usage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Usage code blocks */}
      <div id="spacing-usage" data-section-title="Usage" className="section-block">
        <div style={{ marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-bold)" as any,
              letterSpacing: "var(--ls-overline)",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Usage
          </span>
        </div>
        <div className="flex flex-col" style={{ gap: "var(--space-5)", marginTop: "var(--space-4)" }}>
          <CodeBlock
            label="CSS"
            code={`.card {\n  padding: var(--space-7);       /* 24px */\n  gap: var(--space-5);           /* 16px */\n  margin-bottom: var(--space-8); /* 32px */\n}`}
          />
          <CodeBlock
            label="React / JSX"
            code={`<div\n  style={{\n    padding: "var(--space-7)",\n    gap: "var(--space-5)",\n    marginBottom: "var(--space-8)",\n  }}\n>\n  {children}\n</div>`}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GUIDELINES TAB
   ══════════════════════════════════════════════════════════════ */

function GuidelinesTab() {
  const principles = [
    {
      title: "Use the scale, not magic numbers",
      desc: "Every spacing value in your UI should come from a --space-* token. Avoid hardcoded pixel values that drift from the system.",
      doExample: "padding: var(--space-5);",
      dontExample: "padding: 15px;",
    },
    {
      title: "Match spacing to hierarchy",
      desc: "Tighter spacing groups related elements; wider spacing separates distinct sections. Use micro tokens inside components, layout tokens between them.",
      doExample: "/* icon + label */\ngap: var(--space-2);  /* 4px — tight */\n\n/* card group */\ngap: var(--space-8);  /* 32px — loose */",
      dontExample: "/* icon + label */\ngap: var(--space-8);  /* 32px — too much */\n\n/* card group */\ngap: var(--space-2);  /* 4px — too tight */",
    },
    {
      title: "Keep vertical rhythm consistent",
      desc: "Page sections should use consistent top/bottom margins from the layout or page category. This creates a predictable vertical rhythm across all pages.",
      doExample: "section {\n  padding-top: var(--space-10);    /* 48px */\n  padding-bottom: var(--space-10); /* 48px */\n}",
      dontExample: "section {\n  padding-top: 45px;\n  padding-bottom: 60px;\n}",
    },
    {
      title: "Prefer gap over margin",
      desc: "Use CSS gap in flex/grid containers instead of margins on children. This avoids the last-child problem and keeps spacing in one place.",
      doExample: ".stack {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-5); /* 16px */\n}",
      dontExample: ".stack > * + * {\n  margin-top: 16px;\n}",
    },
  ];

  const contextExamples = [
    {
      label: "Button internals",
      tokens: ["space-2 (4px)", "space-3 (8px)"],
      visual: (
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-2)",
            padding: "var(--space-3) var(--space-5)",
            backgroundColor: "var(--brand-default)",
            color: "var(--brand-fg)",
            borderRadius: "var(--radius-button)",
            fontFamily: "var(--font-family-supreme)",
            fontSize: "var(--text-body)",
            fontWeight: "var(--font-weight-medium)" as any,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Add item
        </div>
      ),
    },
    {
      label: "Card padding",
      tokens: ["space-7 (24px)", "space-5 (16px)"],
      visual: (
        <div
          style={{
            padding: "var(--space-7)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--card)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-body)",
              fontWeight: "var(--font-weight-medium)" as any,
              color: "var(--foreground)",
              marginBottom: "var(--space-2)",
            }}
          >
            Card title
          </div>
          <div
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-meta)",
              color: "var(--muted-foreground)",
              lineHeight: 1.5,
            }}
          >
            Card body content
          </div>
        </div>
      ),
    },
    {
      label: "Form group stack",
      tokens: ["space-5 (16px)", "space-2 (4px)"],
      visual: (
        <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
          {["Email", "Password"].map((label) => (
            <div key={label} className="flex flex-col" style={{ gap: "var(--space-2)" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontSize: "var(--text-meta)",
                  fontWeight: "var(--font-weight-medium)" as any,
                  color: "var(--foreground)",
                }}
              >
                {label}
              </span>
              <div
                style={{
                  height: 36,
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--input-background)",
                }}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Section spacing",
      tokens: ["space-10 (48px)", "space-8 (32px)"],
      visual: (
        <div
          className="flex flex-col"
          style={{
            gap: 0,
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-card)",
            overflow: "hidden",
          }}
        >
          {["Section A", "Section B"].map((s, i) => (
            <div
              key={s}
              style={{
                padding: "var(--space-6) var(--space-5)",
                borderBottom: i === 0 ? "1px solid var(--border-subtle)" : "none",
                backgroundColor: "var(--card)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontSize: "var(--text-body-sm)",
                  fontWeight: "var(--font-weight-medium)" as any,
                  color: "var(--foreground)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {s}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontSize: "var(--text-caption)",
                  color: "var(--muted-foreground)",
                }}
              >
                padding-y: var(--space-10)
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
      {/* Principles */}
      <div id="spacing-principles" data-section-title="Principles" className="section-block">
        <div style={{ marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-bold)" as any,
              letterSpacing: "var(--ls-overline)",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Principles
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-family-supreme)",
            fontSize: "var(--text-meta)",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.5,
            marginBottom: "var(--space-7)",
          }}
        >
          Four rules to keep spacing consistent across the product.
        </p>

        <div className="flex flex-col" style={{ gap: "var(--space-6)" }}>
          {principles.map((p, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                backgroundColor: "var(--background)",
              }}
            >
              <div style={{ padding: "var(--space-6) var(--space-7)", borderBottom: "1px solid var(--border-subtle)" }}>
                <div
                  className="flex items-center gap-3"
                  style={{ marginBottom: 6 }}
                >
                  <span
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "var(--radius-circle)",
                      backgroundColor: "var(--brand-default)",
                      color: "var(--brand-fg)",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "var(--text-overline)",
                      fontWeight: "var(--font-weight-bold)" as any,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-family-supreme)",
                      fontSize: "var(--text-body)",
                      fontWeight: "var(--font-weight-medium)" as any,
                      color: "var(--foreground)",
                    }}
                  >
                    {p.title}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-family-supreme)",
                    fontSize: "var(--text-meta)",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.6,
                    marginLeft: 34,
                  }}
                >
                  {p.desc}
                </p>
              </div>
              <div className="grid grid-cols-2" style={{ minHeight: 0 }}>
                {/* Do */}
                <div
                  style={{
                    padding: "var(--space-5) var(--space-6)",
                    borderRight: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="flex items-center gap-1.5" style={{ marginBottom: "var(--space-3)" }}>
                    <span
                      className="flex items-center justify-center"
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "var(--radius-circle)",
                        backgroundColor: "var(--badge-success-bg)",
                        color: "var(--badge-success-text)",
                        fontSize: "var(--text-overline)",
                        fontWeight: 700,
                      }}
                    >
                      &#10003;
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontSize: "var(--text-overline)",
                        fontWeight: "var(--font-weight-bold)" as any,
                        letterSpacing: "var(--ls-overline)",
                        textTransform: "uppercase",
                        color: "var(--badge-success-text)",
                      }}
                    >
                      Do
                    </span>
                  </div>
                  <pre
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "var(--text-caption)",
                      color: "var(--foreground)",
                      lineHeight: 1.6,
                      margin: 0,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {p.doExample}
                  </pre>
                </div>
                {/* Don't */}
                <div style={{ padding: "var(--space-5) var(--space-6)" }}>
                  <div className="flex items-center gap-1.5" style={{ marginBottom: "var(--space-3)" }}>
                    <span
                      className="flex items-center justify-center"
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "var(--radius-circle)",
                        backgroundColor: "var(--badge-error-bg)",
                        color: "var(--badge-error-text)",
                        fontSize: "var(--text-overline)",
                        fontWeight: 700,
                      }}
                    >
                      &#10005;
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontSize: "var(--text-overline)",
                        fontWeight: "var(--font-weight-bold)" as any,
                        letterSpacing: "var(--ls-overline)",
                        textTransform: "uppercase",
                        color: "var(--badge-error-text)",
                      }}
                    >
                      Don't
                    </span>
                  </div>
                  <pre
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "var(--text-caption)",
                      color: "var(--foreground)",
                      lineHeight: 1.6,
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      opacity: 0.6,
                    }}
                  >
                    {p.dontExample}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context examples */}
      <div id="spacing-applied-examples" data-section-title="Applied Examples" className="section-block">
        <div style={{ marginBottom: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-caption)",
              fontWeight: "var(--font-weight-bold)" as any,
              letterSpacing: "var(--ls-overline)",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Applied Examples
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-family-supreme)",
            fontSize: "var(--text-meta)",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.5,
            marginBottom: "var(--space-7)",
          }}
        >
          Spacing tokens in real component contexts.
        </p>

        <div className="grid grid-cols-2" style={{ gap: "var(--space-5)" }}>
          {contextExamples.map((ex) => (
            <div
              key={ex.label}
              style={{
                borderRadius: "var(--radius-card)",
                border: "1px solid var(--border-subtle)",
                overflow: "hidden",
                backgroundColor: "var(--background)",
              }}
            >
              {/* Header */}
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
                    fontFamily: "var(--font-family-supreme)",
                    fontSize: "var(--text-caption)",
                    fontWeight: "var(--font-weight-medium)" as any,
                    color: "var(--foreground)",
                  }}
                >
                  {ex.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-overline)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {ex.tokens.join(", ")}
                </span>
              </div>
              {/* Visual */}
              <div style={{ padding: "var(--space-7)" }}>{ex.visual}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */

export function SpacingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<SpacingTab>("scale");
  const sentinelRef = useRef<HTMLDivElement>(null);

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

  const totalTokens = spacingScale.length + componentTokens.length;

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
            <span style={{ fontSize: "var(--text-caption)", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)" as any, fontFamily: "var(--font-family-supreme)" }}>Spacing</span>
          </div>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-5)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{totalTokens} tokens</span>
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
                  onClick={() => setActiveTab(tab.value)}
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
            Spacing
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
            A base-4 spacing scale from{" "}
            <code
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--text-body)",
                backgroundColor: "var(--secondary)",
                padding: "2px 6px",
                borderRadius: "var(--radius-xs)",
              }}
            >
              0
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
              160px
            </code>{" "}
            in 17 steps. Every value is a CSS variable so layouts update globally when the scale changes.
          </p>

          {/* Quick visual: all steps as bars */}
          <div
            className="flex items-end"
            style={{ gap: 3, marginTop: "var(--space-8)", height: 64 }}
          >
            {spacingScale.filter(s => s.px > 0).map((step) => (
              <div
                key={step.token}
                title={`${step.token}: ${step.px}px`}
                style={{
                  width: 12,
                  height: Math.max(2, (step.px / 160) * 64),
                  borderRadius: 2,
                  backgroundColor: LAYOUT_RED_SOLID,
                }}
              />
            ))}
          </div>
        </div>

        {/* Tab content */}
        <section
          style={{
            paddingTop: "var(--space-10)",
            paddingBottom: "var(--space-10)",
          }}
        >
          {activeTab === "scale" && <ScaleTab />}
          {activeTab === "tokens" && <TokensTab />}
          {activeTab === "guidelines" && <GuidelinesTab />}
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
            HollaEx Design System &middot; Spacing
          </p>
          <p
            style={{
              fontSize: "var(--text-meta)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>{spacingScale.length}</span> scale + <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>{componentTokens.length}</span> component &middot; base <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>4</span>px
          </p>
        </div>
      </div>
      <SectionJumpFab />
    </div>
  );
}

function BreadcrumbSearch() {
  const ctx = useOutletContext<{ open: boolean; setOpen: (v: boolean) => void } | undefined>();
  if (!ctx) return null;
  return <SearchTrigger onClick={() => ctx.setOpen(true)} />;
}