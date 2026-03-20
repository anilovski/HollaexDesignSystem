import { useState, useRef, useEffect, useCallback } from "react";
import { useOutletContext, Link } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "../docs/search-command";
import { SectionJumpFab } from "../docs/section-jump-fab";
import { IconBulb, IconEye, IconSection, IconDatabase, IconAccessible, IconArrowsSplit, IconChecklist, IconTerminal2, IconReportAnalytics, IconExternalLink } from "@tabler/icons-react";
import type { ComponentType } from "react";

const FAB_ICONS: Record<string, ComponentType<{ size?: number; stroke?: number }>> = {
  "Core Principles": IconBulb,
  "Agent View": IconEye,
  "Semantic HTML Landmarks": IconSection,
  "Data Attribute Contracts": IconDatabase,
  "ARIA Patterns": IconAccessible,
  "Before & After": IconArrowsSplit,
  "Component Authoring Checklist": IconChecklist,
  "Agent Query Patterns": IconTerminal2,
  "Score Card": IconReportAnalytics,
  "Related Resources": IconExternalLink,
};
import { FadeInContent } from "../ui/page-loader";
import { Bot, Eye, EyeOff, Code, ArrowRight, CheckCircle2, XCircle, Lightbulb, FlaskConical, ShieldCheck, CircleAlert, CircleDot, Tag, Scan } from "lucide-react";
import { Button } from "../ui/hollaex-button";

/* ═══════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════ */

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
      {label && (
        <div className="flex items-center justify-between" style={{ padding: "var(--space-3) var(--space-5)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
          <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{label}</span>
          <CopyButton text={code} />
        </div>
      )}
      <pre style={{
        padding: "var(--space-5) var(--space-6)",
        backgroundColor: "var(--background)",
        margin: 0,
        overflowX: "auto",
        fontSize: "var(--text-code, 13px)",
        lineHeight: "var(--lh-code, 22px)",
        fontFamily: "var(--font-family-mono)",
        color: "var(--foreground)",
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL-AWARE HEADER
   ═══════════════════════════════════════════════════════════ */

function useScrolledPast() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [sentinelRef, scrolled] as const;
}

/* ═══════════════════════════════════════════════════════════
   ANIMATED SECTION
   ═══════════════════════════════════════════════════════════ */

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={slugify(title)}
      className="section-block"
      data-section-title={title}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity var(--duration-medium-2) var(--ease-emphasized-decelerate), transform var(--duration-medium-4) var(--ease-emphasized-decelerate)`,
        position: "relative", minWidth: 0,
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: "var(--space-3)", fontFamily: "var(--font-family-supreme)" }}>{title}</h2>
      {description && <p style={{ fontSize: "var(--text-label)", color: "var(--muted-foreground)", lineHeight: 1.6, maxWidth: "580px", marginBottom: "var(--space-8)", fontFamily: "var(--font-family-supreme)" }}>{description}</p>}
      {!description && <div style={{ marginBottom: "var(--space-8)" }} />}
      <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>{children}</div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPARE CARD  (Good vs Bad)
   ═══════════════════════════════════════════════════════════ */

function CompareCard({ good, bad, title }: { good: string; bad: string; title: string }) {
  return (
    <div style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
      <div style={{ padding: "var(--space-4) var(--space-6)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{title}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ minWidth: 0 }}>
        {/* Bad */}
        <div style={{ padding: "var(--space-6)", backgroundColor: "var(--background)", borderRight: "1px solid var(--border-subtle)" }}>
          <div className="flex items-center" style={{ gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
            <XCircle size={14} style={{ color: "var(--destructive)" }} />
            <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--destructive)", fontFamily: "var(--font-family-supreme)" }}>Avoid</span>
          </div>
          <pre style={{ margin: 0, fontSize: "var(--text-code, 12px)", lineHeight: "var(--lh-code, 20px)", fontFamily: "var(--font-family-mono)", color: "var(--muted-foreground)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}><code>{bad}</code></pre>
        </div>
        {/* Good */}
        <div style={{ padding: "var(--space-6)", backgroundColor: "var(--background)" }}>
          <div className="flex items-center" style={{ gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
            <CheckCircle2 size={14} style={{ color: "var(--success)" }} />
            <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--success)", fontFamily: "var(--font-family-supreme)" }}>Preferred</span>
          </div>
          <pre style={{ margin: 0, fontSize: "var(--text-code, 12px)", lineHeight: "var(--lh-code, 20px)", fontFamily: "var(--font-family-mono)", color: "var(--foreground)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}><code>{good}</code></pre>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRINCIPLE CARD
   ═══════════════════════════════════════════════════════════ */

function PrincipleCard({ number, title, description, icon: Icon }: { number: string; title: string; description: string; icon: React.ComponentType<{ size?: number }> }) {
  return (
    <div
      className="flex"
      style={{
        gap: "var(--space-5)",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--background)",
      }}
    >
      <div
        className="shrink-0 flex items-center justify-center"
        style={{
          width: 40, height: 40,
          borderRadius: "var(--radius-component)",
          backgroundColor: "var(--secondary)",
          color: "var(--foreground)",
        }}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
          <span style={{ fontSize: "var(--text-code, 11px)", fontFamily: "var(--font-family-mono)", color: "var(--brand-default)", fontWeight: "var(--font-weight-bold)" }}>{number}</span>
          <span style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)" }}>{title}</span>
        </div>
        <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", lineHeight: 1.6, fontFamily: "var(--font-family-supreme)", margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA ATTRIBUTE TABLE
   ═══════════════════════════════════════════════════════════ */

const DATA_ATTRS = [
  { attr: "data-slot", purpose: "Identifies the semantic role of a sub-element within a compound component", example: 'data-slot="sidebar-menu-item"' },
  { attr: "data-state", purpose: "Exposes component state for agent queries (open, closed, active, checked)", example: 'data-state="open"' },
  { attr: "data-section-title", purpose: "Labels page sections so agents can navigate by heading", example: 'data-section-title="Variants"' },
  { attr: "data-sidebar", purpose: "Marks sidebar structure for navigation agents to traverse", example: 'data-sidebar="menu"' },
  { attr: "data-variant", purpose: "Indicates the visual variant currently applied", example: 'data-variant="destructive"' },
  { attr: "data-disabled", purpose: "Mirrors disabled state for CSS & agent queries alike", example: 'data-disabled="true"' },
  { attr: "data-orientation", purpose: "Declares layout direction (horizontal or vertical)", example: 'data-orientation="vertical"' },
  { attr: "data-value", purpose: "Exposes the current value of a control (slider, select, input)", example: 'data-value="75"' },
  { attr: "data-testid", purpose: "Stable selector for E2E tests and agent automation scripts", example: 'data-testid="submit-order"' },
];

const ARIA_PATTERNS = [
  { pattern: "Labels", attrs: ["aria-label", "aria-labelledby"], note: "Every interactive element must have a programmatic name. Prefer visible labels; use aria-label only when a visible label isn't feasible." },
  { pattern: "Descriptions", attrs: ["aria-describedby"], note: "Links helper text or error messages to their control so agents can read context." },
  { pattern: "Live regions", attrs: ["aria-live", "role=\"status\"", "role=\"alert\""], note: "Announces dynamic content changes. Agents monitor these for toast notifications, validation errors, and status updates." },
  { pattern: "State", attrs: ["aria-expanded", "aria-pressed", "aria-checked", "aria-selected"], note: "Exposes toggle/selection state. Agents rely on these to determine current UI state without parsing visuals." },
  { pattern: "Relationships", attrs: ["aria-controls", "aria-owns"], note: "Declares which element a trigger controls, so agents can follow the connection (e.g. dropdown trigger -> menu)." },
  { pattern: "Errors", attrs: ["aria-invalid", "aria-errormessage"], note: "Marks a control as having a validation error and points to the error message element." },
];

const SEMANTIC_ELEMENTS = [
  { element: "<nav>", purpose: "Wraps navigation blocks. Agents use this to find site navigation." },
  { element: "<main>", purpose: "Identifies the primary content area, skipping headers/sidebars." },
  { element: "<article>", purpose: "Self-contained content that could be syndicated independently." },
  { element: "<section>", purpose: "Thematic grouping with a heading. Agents use these to build a page outline." },
  { element: "<aside>", purpose: "Tangential content (sidebars, callouts). Agents deprioritize these." },
  { element: "<header>", purpose: "Introductory content for its nearest sectioning ancestor." },
  { element: "<footer>", purpose: "Footer for its nearest sectioning ancestor." },
  { element: "<dialog>", purpose: "Native modal/dialog. Agents know this is an overlay interaction." },
  { element: "<form>", purpose: "Groups related form controls. Agents use this boundary for form actions." },
  { element: "<fieldset> + <legend>", purpose: "Groups related fields with a label. Critical for radio groups, checkbox sets." },
];

/* ═══════════════════════════════════════════════════════════
   INTERACTIVE DEMO: Agent View Toggle
   ═══════════════════════════════════════════════════════════ */

function AgentViewDemo() {
  const [agentView, setAgentView] = useState(false);

  const sampleUI = (
    <div
      style={{
        padding: "var(--space-6)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--background)",
      }}
    >
      <form aria-label="Trade order form" data-testid="trade-form">
        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-4)" }}>
            Place Order
          </legend>

          <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
            <div>
              <label
                htmlFor="demo-pair"
                style={{ display: "block", fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-1)" }}
              >
                Trading pair
              </label>
              <div
                role="combobox"
                aria-expanded="false"
                aria-label="Select trading pair"
                aria-controls="pair-listbox"
                data-state="closed"
                data-value="BTC/USDT"
                data-testid="pair-selector"
                id="demo-pair"
                tabIndex={0}
                style={{
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-component)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  fontSize: "var(--text-body-sm)",
                  fontFamily: "var(--font-family-mono)",
                  color: "var(--foreground)",
                  cursor: "pointer",
                }}
              >
                BTC / USDT
              </div>
            </div>

            <div>
              <label
                htmlFor="demo-amount"
                style={{ display: "block", fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-1)" }}
              >
                Amount
              </label>
              <input
                id="demo-amount"
                type="number"
                placeholder="0.00"
                aria-describedby="amount-hint"
                data-testid="amount-input"
                style={{
                  width: "100%",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-component)",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                  fontSize: "var(--text-body-sm)",
                  fontFamily: "var(--font-family-mono)",
                  color: "var(--foreground)",
                }}
              />
              <p id="amount-hint" style={{ fontSize: "var(--text-caption, 11px)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", marginTop: "var(--space-1)" }}>
                Min: 0.0001 BTC
              </p>
            </div>

            <button
              type="submit"
              aria-label="Submit buy order"
              data-testid="submit-order"
              style={{
                padding: "var(--space-3) var(--space-6)",
                borderRadius: "var(--radius-component)",
                backgroundColor: "var(--brand-default)",
                color: "#fff",
                border: "none",
                fontSize: "var(--text-body-sm)",
                fontWeight: "var(--font-weight-bold)",
                fontFamily: "var(--font-family-supreme)",
                cursor: "pointer",
              }}
            >
              Buy BTC
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );

  const agentAnnotation = (
    <div style={{ padding: "var(--space-6)", borderRadius: "var(--radius-card)", border: "1px solid var(--brand-default)", backgroundColor: "var(--background)", position: "relative" }}>
      <div style={{ position: "absolute", top: "calc(-1 * var(--space-3))", left: "var(--space-4)", padding: "var(--space-1) var(--space-3)", backgroundColor: "var(--brand-default)", borderRadius: "var(--radius-chip)", fontSize: "10px", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-mono)", color: "#fff", letterSpacing: "0.06em" }}>
        AGENT PARSE TREE
      </div>
      <pre style={{
        margin: 0,
        marginTop: "var(--space-3)",
        fontSize: "var(--text-code, 12px)",
        lineHeight: "var(--lh-code, 22px)",
        fontFamily: "var(--font-family-mono)",
        color: "var(--foreground)",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>{`form [aria-label="Trade order form"]
  fieldset > legend "Place Order"
  |
  +-- combobox [aria-label="Select trading pair"]
  |     data-state="closed"
  |     data-value="BTC/USDT"
  |     data-testid="pair-selector"
  |
  +-- input#demo-amount [type=number]
  |     label: "Amount"
  |     described-by: "Min: 0.0001 BTC"
  |     data-testid="amount-input"
  |
  +-- button [aria-label="Submit buy order"]
        data-testid="submit-order"
        text: "Buy BTC"`}</pre>
    </div>
  );

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
      {/* Toggle */}
      <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
        <button
          type="button"
          onClick={() => setAgentView(!agentView)}
          className="flex items-center cursor-pointer transition-all"
          style={{
            gap: "var(--space-2)",
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius-chip)",
            border: "1px solid var(--border)",
            backgroundColor: agentView ? "var(--brand-default)" : "var(--background)",
            color: agentView ? "#fff" : "var(--foreground)",
            fontSize: "var(--text-body-sm)",
            fontFamily: "var(--font-family-supreme)",
            fontWeight: "var(--font-weight-medium)",
            transitionDuration: "var(--duration-short-4)",
          }}
        >
          {agentView ? <Eye size={14} /> : <EyeOff size={14} />}
          {agentView ? "Agent view" : "Human view"}
        </button>
        <span style={{ fontSize: "var(--text-caption, 11px)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
          Toggle to see what an AI agent extracts from this form
        </span>
      </div>

      {agentView ? agentAnnotation : sampleUI}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CHECKLIST COMPONENT
   ═══════════════════════════════════════════════════════════ */

function Checklist({ items }: { items: { text: string; detail: string }[] }) {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex"
          style={{
            gap: "var(--space-4)",
            padding: "var(--space-4) var(--space-5)",
            borderRadius: "var(--radius-component)",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--background)",
          }}
        >
          <div className="shrink-0" style={{ marginTop: 2 }}>
            <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", margin: 0 }}>{item.text}</p>
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", margin: 0, marginTop: "var(--space-1)" }}>{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCORE CARD — live DOM audit
   ═══════════════════════════════════════════════════════════ */

type AuditCategory = { label: string; icon: React.ComponentType<{ size?: number }>; score: number; max: number; details: string };

function runAudit(): AuditCategory[] {
  const all = document.querySelectorAll("*");
  const interactives = document.querySelectorAll("button, input, select, textarea, a[href], [role='combobox'], [role='slider'], [role='checkbox'], [role='radio'], [tabindex]");
  const landmarks = document.querySelectorAll("nav, main, aside, header, footer, section, article, form");
  const withTestId = document.querySelectorAll("[data-testid]");
  const withState = document.querySelectorAll("[data-state], [aria-expanded], [aria-checked], [aria-pressed], [aria-selected]");
  const withSlot = document.querySelectorAll("[data-slot]");
  const withLabel = document.querySelectorAll("[aria-label], [aria-labelledby]");
  const withControls = document.querySelectorAll("[aria-controls], [aria-describedby], [aria-owns]");
  const liveRegions = document.querySelectorAll("[aria-live], [role='status'], [role='alert']");

  // Semantic score: landmarks found
  const semanticScore = Math.min(landmarks.length, 10);
  // Labels: % of interactives with a label
  const labelledCount = [...interactives].filter(el => el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.closest("label") || (el.id && document.querySelector(`label[for="${el.id}"]`))).length;
  const labelScore = interactives.length ? Math.round((labelledCount / interactives.length) * 10) : 10;
  // State exposure
  const stateScore = Math.min(withState.length, 10);
  // Test IDs
  const testIdScore = Math.min(withTestId.length, 10);
  // Relationships
  const relScore = Math.min(withControls.length + liveRegions.length, 10);
  // Slots
  const slotScore = Math.min(withSlot.length, 10);

  return [
    { label: "Semantic HTML", icon: Code, score: semanticScore, max: 10, details: `${landmarks.length} landmark elements found` },
    { label: "Labels", icon: Tag, score: labelScore, max: 10, details: `${labelledCount}/${interactives.length} interactive elements labelled` },
    { label: "State Exposure", icon: Eye, score: stateScore, max: 10, details: `${withState.length} elements expose state attributes` },
    { label: "Test Selectors", icon: Scan, score: testIdScore, max: 10, details: `${withTestId.length} data-testid selectors found` },
    { label: "Relationships", icon: ArrowRight, score: relScore, max: 10, details: `${withControls.length} relationships + ${liveRegions.length} live regions` },
    { label: "Data Slots", icon: CircleDot, score: slotScore, max: 10, details: `${withSlot.length} data-slot attributes found` },
  ];
}

function ScoreCard() {
  const [results, setResults] = useState<AuditCategory[] | null>(null);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  const handleAudit = useCallback(() => {
    const r = runAudit();
    setResults(r);
    // Animate total
    const total = r.reduce((sum, c) => sum + c.score, 0);
    const max = r.reduce((sum, c) => sum + c.max, 0);
    const pct = Math.round((total / max) * 100);
    let current = 0;
    const step = () => {
      current += 2;
      if (current >= pct) { setAnimatedTotal(pct); return; }
      setAnimatedTotal(current);
      requestAnimationFrame(step);
    };
    setAnimatedTotal(0);
    requestAnimationFrame(step);
  }, []);

  const gradeColor = animatedTotal >= 80 ? "var(--success)" : animatedTotal >= 50 ? "var(--warning)" : "var(--destructive)";
  const gradeLabel = animatedTotal >= 80 ? "Excellent" : animatedTotal >= 50 ? "Needs work" : "Poor";

  return (
    <div style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
      <div className="flex items-center justify-between" style={{ padding: "var(--space-4) var(--space-6)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Live Page Audit</span>
        <button
          type="button"
          onClick={handleAudit}
          className="flex items-center cursor-pointer transition-all"
          style={{ gap: "var(--space-2)", padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-chip)", border: "1px solid var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)", transitionDuration: "var(--duration-short-3)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--background)"; }}
        >
          <ShieldCheck size={14} />
          Run audit
        </button>
      </div>
      <div style={{ padding: "var(--space-7)", backgroundColor: "var(--background)" }}>
        {!results ? (
          <div className="flex flex-col items-center justify-center" style={{ padding: "var(--space-10) 0", gap: "var(--space-3)" }}>
            <ShieldCheck size={32} style={{ color: "var(--muted-foreground)", opacity: 0.4 }} />
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", margin: 0 }}>Click "Run audit" to scan this page's DOM for agent legibility signals</p>
          </div>
        ) : (
          <div className="flex flex-col" style={{ gap: "var(--space-6)" }}>
            {/* Overall score */}
            <div className="flex items-center" style={{ gap: "var(--space-6)" }}>
              <div className="flex items-center justify-center" style={{ width: 80, height: 80, borderRadius: "var(--radius-circle)", border: `3px solid ${gradeColor}`, flexShrink: 0 }}>
                <span style={{ fontSize: "28px", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-mono)", color: gradeColor }}>{animatedTotal}</span>
              </div>
              <div>
                <p style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", margin: 0 }}>
                  Agent Legibility Score
                </p>
                <p style={{ fontSize: "var(--text-body-sm)", color: gradeColor, fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)", margin: 0, marginTop: "var(--space-1)" }}>{gradeLabel}</p>
                <p style={{ fontSize: "var(--text-caption, 11px)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", margin: 0, marginTop: "var(--space-1)" }}>
                  Based on {results.length} categories, max 60 points
                </p>
              </div>
            </div>
            {/* Category breakdown */}
            <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
              {results.map((cat) => {
                const Icon = cat.icon;
                const pct = Math.round((cat.score / cat.max) * 100);
                const barColor = pct >= 80 ? "var(--success)" : pct >= 50 ? "var(--warning)" : "var(--destructive)";
                return (
                  <div key={cat.label} className="flex items-center" style={{ gap: "var(--space-4)" }}>
                    <div className="flex items-center justify-center shrink-0" style={{ width: 28, height: 28, borderRadius: "var(--radius-component)", backgroundColor: "var(--secondary)", color: "var(--foreground)" }}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-1)" }}>
                        <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)" }}>{cat.label}</span>
                        <span style={{ fontSize: "var(--text-code, 11px)", fontFamily: "var(--font-family-mono)", color: "var(--muted-foreground)" }}>{cat.score}/{cat.max}</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, backgroundColor: "var(--secondary)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, backgroundColor: barColor, borderRadius: 2, transition: "width 0.6s var(--ease-emphasized-decelerate)" }} />
                      </div>
                      <p style={{ fontSize: "var(--text-caption, 10px)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", margin: 0, marginTop: "var(--space-1)" }}>{cat.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */

export function AgentLegibilityPage() {
  const [sentinelRef, scrolled] = useScrolledPast();
  const search = useOutletContext<{ open: boolean; setOpen: (v: boolean) => void } | undefined>();

  return (
    <div className="min-h-full" style={{ backgroundColor: "var(--secondary-subtle)" }}>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* Breadcrumb */}
      <div
        className="border-b sticky top-0 z-10 h-[72px] transition-shadow"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--background)",
          boxShadow: scrolled ? "var(--elevation-sm)" : "none",
          transitionDuration: "var(--duration-short-4)",
        }}
      >
        <div className="h-full flex items-center justify-between" style={{ padding: "0 var(--space-10)" }}>
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Foundation</span>
            <span style={{ fontSize: "11px", color: "var(--border)" }}>&rsaquo;</span>
            <span style={{ fontSize: "11px", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-supreme)" }}>Agent Legibility</span>
          </div>
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            {search && <SearchTrigger onClick={() => search.setOpen(true)} />}
            <HxThemeToggle size="lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 860, padding: "0 var(--space-10)" }}>
        <FadeInContent>
          {/* Page header */}
          <div className="border-b" style={{
            paddingTop: "var(--space-11)",
            paddingBottom: "var(--space-10)",
            borderColor: "var(--secondary)",
            animation: "hx-expand-in var(--duration-medium-2) var(--ease-emphasized-decelerate) both",
          }}>
            <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
              <div
                className="flex items-center justify-center"
                style={{
                  width: 36, height: 36,
                  borderRadius: "var(--radius-component)",
                  backgroundColor: "var(--brand-default)",
                }}
              >
                <Bot size={20} style={{ color: "#fff" }} />
              </div>
            </div>
            <h1 style={{
              fontSize: "52px",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--foreground)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-family-supreme)",
              marginBottom: "var(--space-5)",
            }}>
              Agent Legibility
            </h1>
            <p style={{
              fontSize: "var(--text-base)",
              color: "var(--muted-foreground)",
              lineHeight: 1.6,
              maxWidth: "580px",
              fontFamily: "var(--font-family-supreme)",
            }}>
              Guidelines for building interfaces that AI agents, screen readers, and automated tools can reliably parse, navigate, and operate. Every component in HollaEx ships with semantic markup, ARIA attributes, and data attributes that make the UI machine-readable by default.
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col" style={{ padding: "var(--space-10) 0", gap: "var(--space-12)", overflow: "hidden" }}>

            {/* ── Core Principles ───────────────────────────── */}
            <Section title="Core Principles" description="Four rules that guide how we author markup for agent-friendly interfaces.">
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "var(--space-4)" }}>
                <PrincipleCard number="01" title="Semantic First" description="Use the correct HTML element before reaching for ARIA. A <button> is always better than a <div role='button'>. Agents and assistive tech get behaviour and semantics for free." icon={Code} />
                <PrincipleCard number="02" title="Expose State" description="Every interactive component exposes its state via data-state and ARIA attributes. Agents never need to infer state from visual cues like colour or position." icon={Eye} />
                <PrincipleCard number="03" title="Stable Selectors" description="Use data-testid for automation hooks and data-slot for structural queries. Class names are volatile — data attributes are contracts." icon={Lightbulb} />
                <PrincipleCard number="04" title="Declare Relationships" description="Connect triggers to their targets with aria-controls, aria-describedby, and aria-labelledby. Agents follow these links to understand UI topology." icon={ArrowRight} />
              </div>
            </Section>

            {/* ── Interactive Demo ──────────────────────────── */}
            <Section title="Agent View" description="See the difference between what a human sees and what an AI agent extracts from the same component. This trade form uses semantic HTML, ARIA, and data attributes throughout.">
              <AgentViewDemo />
            </Section>

            {/* ── Semantic HTML ─────────────────────────────── */}
            <Section title="Semantic HTML Landmarks" description="Landmark elements create the page's navigational skeleton. Agents use these to jump between regions without scanning every node.">
              <div style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
                <div style={{ padding: "var(--space-4) var(--space-6)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>HTML Landmark Elements</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <th style={{ textAlign: "left", padding: "var(--space-4) var(--space-6)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Element</th>
                        <th style={{ textAlign: "left", padding: "var(--space-4) var(--space-6)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SEMANTIC_ELEMENTS.map((row) => (
                        <tr key={row.element} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td style={{ padding: "var(--space-3) var(--space-6)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-code, 13px)", color: "var(--brand-default)", whiteSpace: "nowrap" }}>{row.element}</td>
                          <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "var(--text-body-sm)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5 }}>{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>

            {/* ── Data Attributes ──────────────────────────── */}
            <Section title="Data Attribute Contracts" description="HollaEx components use a consistent set of data-* attributes. These are stable API contracts that agents and test frameworks depend on — never remove them without a deprecation cycle.">
              <div style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
                <div style={{ padding: "var(--space-4) var(--space-6)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Standard Data Attributes</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <th style={{ textAlign: "left", padding: "var(--space-4) var(--space-6)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", whiteSpace: "nowrap" }}>Attribute</th>
                        <th style={{ textAlign: "left", padding: "var(--space-4) var(--space-6)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Purpose</th>
                        <th style={{ textAlign: "left", padding: "var(--space-4) var(--space-6)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DATA_ATTRS.map((row) => (
                        <tr key={row.attr} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                          <td style={{ padding: "var(--space-3) var(--space-6)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-code, 12px)", color: "var(--brand-default)", whiteSpace: "nowrap" }}>{row.attr}</td>
                          <td style={{ padding: "var(--space-3) var(--space-6)", fontSize: "var(--text-body-sm)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5 }}>{row.purpose}</td>
                          <td style={{ padding: "var(--space-3) var(--space-6)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-code, 11px)", color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>{row.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Section>

            {/* ── ARIA Patterns ─────────────────────────────── */}
            <Section title="ARIA Patterns" description="Our components use ARIA attributes to expose labels, state, and relationships that aren't conveyed by HTML semantics alone.">
              <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
                {ARIA_PATTERNS.map((p) => (
                  <div
                    key={p.pattern}
                    style={{
                      padding: "var(--space-5) var(--space-6)",
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--border-subtle)",
                      backgroundColor: "var(--background)",
                    }}
                  >
                    <div className="flex items-center flex-wrap" style={{ gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                      <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)" }}>{p.pattern}</span>
                      <span style={{ color: "var(--border)" }}>—</span>
                      {p.attrs.map((a) => (
                        <span
                          key={a}
                          style={{
                            display: "inline-block",
                            padding: "1px var(--space-2)",
                            borderRadius: "var(--radius-chip)",
                            backgroundColor: "var(--secondary)",
                            fontFamily: "var(--font-family-mono)",
                            fontSize: "var(--text-code, 11px)",
                            color: "var(--brand-default)",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, margin: 0 }}>{p.note}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Compare: Good vs Bad ──────────────────────── */}
            <Section title="Before & After" description="Side-by-side comparisons of markup that is opaque to agents versus markup that is fully legible.">
              <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
                <CompareCard
                  title="Buttons"
                  bad={`<div class="btn blue" onclick="buy()">
  <span class="icon"></span>
  Buy
</div>`}
                  good={`<button
  type="button"
  aria-label="Buy BTC"
  data-testid="buy-btn"
  onClick={handleBuy}
>
  <BuyIcon aria-hidden="true" />
  Buy
</button>`}
                />
                <CompareCard
                  title="Form Controls"
                  bad={`<div class="form-group">
  <span>Email</span>
  <input class="input" />
  <span class="error">Invalid</span>
</div>`}
                  good={`<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid="true"
    aria-errormessage="email-err"
  />
  <p id="email-err" role="alert">
    Invalid email address
  </p>
</div>`}
                />
                <CompareCard
                  title="Disclosure / Accordion"
                  bad={`<div class="accordion">
  <div class="header" onclick="toggle()">
    FAQ Item
  </div>
  <div class="body hidden">
    Answer text...
  </div>
</div>`}
                  good={`<div data-state="closed">
  <button
    aria-expanded="false"
    aria-controls="faq-1-panel"
  >
    FAQ Item
  </button>
  <div
    id="faq-1-panel"
    role="region"
    aria-labelledby="faq-1-trigger"
    hidden
  >
    Answer text...
  </div>
</div>`}
                />
              </div>
            </Section>

            {/* ── Component Checklist ──────────────────────── */}
            <Section title="Component Authoring Checklist" description="Use this checklist when building or reviewing any HollaEx component to ensure it meets agent legibility standards.">
              <Checklist items={[
                { text: "Uses semantic HTML element", detail: "Prefer <button>, <input>, <select>, <dialog>, <nav> over generic <div> with role attributes." },
                { text: "Has a programmatic label", detail: "Every interactive element has a visible <label>, aria-label, or aria-labelledby." },
                { text: "Exposes state via attributes", detail: "Uses data-state, aria-expanded, aria-checked, aria-pressed, or aria-selected as appropriate." },
                { text: "Declares relationships", detail: "Triggers use aria-controls to point at their target. Descriptions use aria-describedby." },
                { text: "Includes data-testid", detail: "All key interaction points have a stable data-testid for automation and agent scripts." },
                { text: "Uses data-slot for sub-elements", detail: "Compound components label their parts (trigger, content, icon, etc.) with data-slot." },
                { text: "Error states are announced", detail: "Validation errors use aria-invalid + aria-errormessage, and error containers have role='alert'." },
                { text: "Dynamic content uses live regions", detail: "Toasts, status messages, and loading indicators use aria-live='polite' or role='status'." },
                { text: "Focus management is correct", detail: "Modals trap focus. Disclosure opens move focus to content. Closing returns focus to trigger." },
                { text: "Keyboard navigation works", detail: "All interactive elements are reachable via Tab, and composite widgets support arrow keys." },
              ]} />
            </Section>

            {/* ── Querying Patterns ────────────────────────── */}
            <Section title="Agent Query Patterns" description="Example selectors agents can use to find and interact with HollaEx components programmatically.">
              <CodeBlock
                label="Finding components by role & state"
                code={`// Find all open accordions
document.querySelectorAll('[data-state="open"]');

// Find the submit button in a trade form
document.querySelector('[data-testid="submit-order"]');

// Find all invalid inputs
document.querySelectorAll('[aria-invalid="true"]');

// Navigate to a sidebar section
document.querySelector('[data-sidebar="menu"] [data-slot="sidebar-menu-item"][data-active="true"]');

// Read a select's current value
document.querySelector('[data-testid="pair-selector"]')?.getAttribute('data-value');

// Find all sections and build a page outline
[...document.querySelectorAll('[data-section-title]')]
  .map(el => el.getAttribute('data-section-title'));`}
              />
            </Section>

            {/* ── Score Card ────────────────────────────────── */}
            <Section title="Score Card" description="A live audit tool that scans a component's markup and rates its agent legibility across six categories. Click 'Run audit' to scan this page.">
              <ScoreCard />
            </Section>

            {/* ── Related: Testing with Agents ─────────────── */}
            <Section title="Related Resources" description="Pair these guidelines with real-world automation scripts.">
              <Link
                to="/patterns/testing-with-agents"
                className="flex items-center transition-all"
                style={{
                  gap: "var(--space-4)", padding: "var(--space-6)",
                  borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)",
                  backgroundColor: "var(--background)", textDecoration: "none",
                  transitionDuration: "var(--duration-short-3)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--brand-default)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
              >
                <div className="flex items-center justify-center shrink-0" style={{ width: 40, height: 40, borderRadius: "var(--radius-component)", backgroundColor: "var(--brand-default)" }}>
                  <FlaskConical size={20} style={{ color: "#fff" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", margin: 0 }}>Testing with Agents</p>
                  <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", margin: 0, marginTop: "var(--space-1)" }}>Playwright scripts, Cypress tests, and AI agent automation patterns using HollaEx's stable selectors</p>
                </div>
                <ArrowRight size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
              </Link>
            </Section>

          </div>

          {/* Footer */}
          <div className="border-t flex items-center justify-between" style={{ padding: "var(--space-8) 0", borderColor: "var(--secondary)" }}>
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
              HollaEx Design System · Agent Legibility
            </p>
          </div>
        </FadeInContent>
      </div>

      <SectionJumpFab iconMap={FAB_ICONS} />
    </div>
  );
}