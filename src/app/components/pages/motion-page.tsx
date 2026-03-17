import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "../docs/search-command";
import { Copy, Check, X, Clock, Play, Pause, RotateCcw, ChevronRight, Bell, Heart, Zap, Eye, Layers, MousePointer } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

type EasingToken = {
  name: string;
  token: string;
  value: string;
  description: string;
  category: "standard" | "emphasized" | "linear";
};

const EASING_TOKENS: EasingToken[] = [
  { name: "Standard", token: "--ease-standard", value: "cubic-bezier(0.2, 0.0, 0, 1.0)", description: "Default easing for most transitions. Elements move quickly at the start and gently settle into place.", category: "standard" },
  { name: "Standard Decelerate", token: "--ease-standard-decelerate", value: "cubic-bezier(0, 0, 0, 1)", description: "For elements entering the screen. Starts fast, then eases in smoothly.", category: "standard" },
  { name: "Standard Accelerate", token: "--ease-standard-accelerate", value: "cubic-bezier(0.3, 0, 1, 1)", description: "For elements leaving the screen. Starts slow, then accelerates away.", category: "standard" },
  { name: "Emphasized", token: "--ease-emphasized", value: "cubic-bezier(0.2, 0.0, 0, 1.0)", description: "For important transitions that need more visual weight. Slightly more dramatic than standard.", category: "emphasized" },
  { name: "Emphasized Decelerate", token: "--ease-emphasized-decelerate", value: "cubic-bezier(0.05, 0.7, 0.1, 1.0)", description: "For hero entrances and expand animations. Elements arrive with energy then settle softly.", category: "emphasized" },
  { name: "Emphasized Accelerate", token: "--ease-emphasized-accelerate", value: "cubic-bezier(0.3, 0.0, 0.8, 0.15)", description: "For collapse and exit animations. Elements depart swiftly with conviction.", category: "emphasized" },
  { name: "Linear", token: "--ease-linear", value: "cubic-bezier(0, 0, 1, 1)", description: "Constant speed — use sparingly for progress indicators or continuous animations.", category: "linear" },
];

type DurationToken = {
  name: string;
  token: string;
  ms: number;
  useCase: string;
  tier: "short" | "medium" | "long" | "extra-long";
};

const DURATION_TOKENS: DurationToken[] = [
  { name: "Short 1", token: "--duration-short-1", ms: 50, useCase: "Micro-feedback: ripple start, checkbox tick", tier: "short" },
  { name: "Short 2", token: "--duration-short-2", ms: 100, useCase: "Press states, icon color changes", tier: "short" },
  { name: "Short 3", token: "--duration-short-3", ms: 150, useCase: "Hover effects, small state changes", tier: "short" },
  { name: "Short 4", token: "--duration-short-4", ms: 200, useCase: "Fade in/out, tooltip appearance", tier: "short" },
  { name: "Medium 1", token: "--duration-medium-1", ms: 250, useCase: "Exit animations, menu close", tier: "medium" },
  { name: "Medium 2", token: "--duration-medium-2", ms: 300, useCase: "Enter animations, panel transitions", tier: "medium" },
  { name: "Medium 3", token: "--duration-medium-3", ms: 350, useCase: "Selection changes, state transitions", tier: "medium" },
  { name: "Medium 4", token: "--duration-medium-4", ms: 400, useCase: "Expand/collapse, slide-in panels", tier: "medium" },
  { name: "Long 1", token: "--duration-long-1", ms: 450, useCase: "Page-level transitions, card reorder", tier: "long" },
  { name: "Long 2", token: "--duration-long-2", ms: 500, useCase: "Full-screen transitions, hero reveals", tier: "long" },
  { name: "Long 3", token: "--duration-long-3", ms: 550, useCase: "Complex layout shifts, multi-step morph", tier: "long" },
  { name: "Long 4", token: "--duration-long-4", ms: 600, useCase: "Accordion groups, connected animations", tier: "long" },
  { name: "Extra Long 1", token: "--duration-extra-long-1", ms: 700, useCase: "Full-page morphs, onboarding steps", tier: "extra-long" },
  { name: "Extra Long 2", token: "--duration-extra-long-2", ms: 800, useCase: "Dramatic reveals, skeleton shimmer", tier: "extra-long" },
  { name: "Extra Long 3", token: "--duration-extra-long-3", ms: 900, useCase: "Ambient background shifts, slow loops", tier: "extra-long" },
  { name: "Extra Long 4", token: "--duration-extra-long-4", ms: 1000, useCase: "Long expressive animations, celebration", tier: "extra-long" },
];

type SemanticMotion = {
  name: string;
  token: string;
  duration: string;
  easing: string;
  description: string;
  category: "interaction" | "visibility" | "layout";
};

const SEMANTIC_TOKENS: SemanticMotion[] = [
  { name: "Hover", token: "--motion-hover", duration: "--duration-short-3", easing: "--ease-standard", description: "Background/color shift on pointer hover", category: "interaction" },
  { name: "Press", token: "--motion-press", duration: "--duration-short-2", easing: "--ease-standard-accelerate", description: "Scale-down or color shift on click/tap", category: "interaction" },
  { name: "Expand", token: "--motion-expand", duration: "--duration-medium-4", easing: "--ease-emphasized-decelerate", description: "Accordion open, dropdown reveal", category: "layout" },
  { name: "Collapse", token: "--motion-collapse", duration: "--duration-medium-2", easing: "--ease-emphasized-accelerate", description: "Accordion close, dropdown dismiss", category: "layout" },
  { name: "Enter", token: "--motion-enter", duration: "--duration-medium-2", easing: "--ease-emphasized-decelerate", description: "Modal appear, panel slide-in", category: "visibility" },
  { name: "Exit", token: "--motion-exit", duration: "--duration-medium-1", easing: "--ease-emphasized-accelerate", description: "Modal dismiss, panel slide-out", category: "visibility" },
  { name: "Fade In", token: "--motion-fade-in", duration: "--duration-short-4", easing: "--ease-standard-decelerate", description: "Tooltip show, overlay appear", category: "visibility" },
  { name: "Fade Out", token: "--motion-fade-out", duration: "--duration-short-3", easing: "--ease-standard-accelerate", description: "Tooltip hide, overlay dismiss", category: "visibility" },
  { name: "Slide In", token: "--motion-slide-in", duration: "--duration-medium-4", easing: "--ease-emphasized-decelerate", description: "Side panel enter, drawer reveal", category: "layout" },
  { name: "Slide Out", token: "--motion-slide-out", duration: "--duration-medium-2", easing: "--ease-emphasized-accelerate", description: "Side panel exit, drawer dismiss", category: "layout" },
  { name: "Focus Line", token: "--motion-focus-line", duration: "--duration-extra-long-2", easing: "--ease-emphasized-decelerate", description: "Input focus underline animation", category: "interaction" },
];

const PRINCIPLES = [
  {
    title: "Informative",
    description: "Motion communicates spatial relationships and hierarchy. Elements entering from the right imply forward navigation; fading in suggests arrival.",
    icon: Eye,
    color: "var(--chart-1)",
  },
  {
    title: "Focused",
    description: "Only animate what matters. A single, purposeful animation guides attention more effectively than many competing ones.",
    icon: MousePointer,
    color: "var(--chart-5)",
  },
  {
    title: "Expressive",
    description: "Motion carries the personality of the brand. Our curves are confident but not aggressive — elements arrive with energy and settle softly.",
    icon: Zap,
    color: "var(--chart-2)",
  },
];

const TAB_ITEMS = [
  { label: "Principles", value: "principles" },
  { label: "Easing", value: "easing" },
  { label: "Duration", value: "duration" },
  { label: "Semantic", value: "semantic" },
] as const;

type TabValue = (typeof TAB_ITEMS)[number]["value"];

/* ═══════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="cursor-pointer flex items-center justify-center rounded-full"
      style={{
        width: 28,
        height: 28,
        backgroundColor: "transparent",
        border: "none",
        color: copied ? "var(--brand-default)" : "var(--color-text-tertiary)",
        transition: "color var(--duration-short-2) var(--ease-standard), background-color var(--duration-short-2) var(--ease-standard)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
      title="Copy token"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function useScrolledPast() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, scrolled] as const;
}

function BreadcrumbSearch() {
  const ctx = useOutletContext<{ open: boolean; setOpen: (v: boolean) => void } | undefined>();
  if (!ctx) return null;
  return <SearchTrigger onClick={() => ctx.setOpen(true)} />;
}

/** Section wrapper for consistent styling */
function DemoCard({ title, children, noPad }: { title?: string; children: React.ReactNode; noPad?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)" }}>
      {title && (
        <div className="flex items-center border-b" style={{ padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--preview-header-bg)", borderColor: "var(--border-subtle)" }}>
          <span style={{ fontSize: "var(--text-overline)", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            {title}
          </span>
        </div>
      )}
      <div style={noPad ? {} : { padding: "var(--space-7)" }}>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INTERACTIVE DEMOS
   ═══════════════════════════════════════════════════════════ */

/* Easing curve visualizer */
function EasingCurveCanvas({ value, size = 120 }: { value: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const match = value.match(/cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
    if (!match) return;
    const [, x1s, y1s, x2s, y2s] = match;
    const x1 = parseFloat(x1s), y1 = parseFloat(y1s), x2 = parseFloat(x2s), y2 = parseFloat(y2s);

    const pad = 12;
    const w = size - pad * 2;
    const h = size - pad * 2;

    ctx.clearRect(0, 0, size, size);

    const cs = getComputedStyle(document.documentElement);
    const gridColor = cs.getPropertyValue("--border-subtle").trim() || "#e1e1e1";
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 2]);
    for (let i = 0; i <= 4; i++) {
      const pos = pad + (w / 4) * i;
      ctx.beginPath(); ctx.moveTo(pos, pad); ctx.lineTo(pos, pad + h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pad, pos); ctx.lineTo(pad + w, pos); ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad + h);
    ctx.lineTo(pad + w, pad);
    ctx.stroke();

    const brandColor = cs.getPropertyValue("--brand-default").trim() || "#2463EB";
    ctx.strokeStyle = brandColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pad, pad + h);
    ctx.bezierCurveTo(pad + x1 * w, pad + h - y1 * h, pad + x2 * w, pad + h - y2 * h, pad + w, pad);
    ctx.stroke();

    ctx.fillStyle = brandColor;
    ctx.globalAlpha = 0.3;
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = brandColor;
    ctx.beginPath(); ctx.moveTo(pad, pad + h); ctx.lineTo(pad + x1 * w, pad + h - y1 * h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad + w, pad); ctx.lineTo(pad + x2 * w, pad + h - y2 * h); ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;

    ctx.fillStyle = brandColor;
    ctx.beginPath(); ctx.arc(pad + x1 * w, pad + h - y1 * h, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(pad + x2 * w, pad + h - y2 * h, 3.5, 0, Math.PI * 2); ctx.fill();
  }, [value, size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size }} />;
}

/* Trail config */
const TRAIL_VARS = ["--motion-trail-1", "--motion-trail-2", "--motion-trail-3", "--motion-trail-4", "--motion-trail-5"] as const;
const TRAIL_DELAYS = [30, 60, 95, 135, 180];
const TRAIL_SIZE_SCALE = 0.92;

/* Hover-driven ball demo for easing */
function EasingBallLoop({ easingValue, durationMs = 600 }: { easingValue: string; durationMs?: number }) {
  const timerRef = useRef<number | null>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    hoveringRef.current = hovering;
    if (!hovering) {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
      setAtEnd(false);
      return;
    }
    const PAUSE = 500;
    const startCycle = () => {
      if (!hoveringRef.current) return;
      setAtEnd((prev) => !prev);
      timerRef.current = window.setTimeout(startCycle, durationMs + PAUSE);
    };
    timerRef.current = window.setTimeout(startCycle, 80);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [hovering, durationMs]);

  const BALL = 22;
  const PAD = 8;
  const endPos = `calc(100% - ${BALL + PAD}px)`;
  const startPos = `${PAD}px`;

  return (
    <div
      className="relative overflow-hidden rounded"
      style={{ height: 40, backgroundColor: "var(--secondary)", border: "1px solid var(--border-subtle)" }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="absolute top-1/2 -translate-y-1/2" style={{ width: BALL, height: BALL, borderRadius: "var(--radius-circle)", backgroundColor: "var(--brand-default)", opacity: 0.12, left: PAD }} />
      {TRAIL_VARS.map((varName, i) => {
        const sz = Math.round(BALL * Math.pow(TRAIL_SIZE_SCALE, i + 1));
        return (
          <div key={varName} className="absolute top-1/2 -translate-y-1/2" style={{
            width: sz, height: sz, borderRadius: "var(--radius-circle)", backgroundColor: `var(${varName})`,
            left: atEnd ? endPos : startPos,
            transition: atEnd || hovering ? `left ${durationMs}ms ${easingValue} ${TRAIL_DELAYS[i]}ms` : `left 200ms var(--ease-standard) ${Math.round(TRAIL_DELAYS[i] * 0.5)}ms`,
            pointerEvents: "none" as const,
          }} />
        );
      })}
      <div className="absolute top-1/2 -translate-y-1/2" style={{
        width: BALL, height: BALL, borderRadius: "var(--radius-circle)", backgroundColor: "var(--brand-default)",
        left: atEnd ? endPos : startPos,
        transition: atEnd || hovering ? `left ${durationMs}ms ${easingValue}` : "left 200ms var(--ease-standard)",
      }} />
    </div>
  );
}

/* Hover-driven ball for duration cards */
function HoverBall({ ms, size = 20, trackHeight = 48, hovering }: { ms: number; size?: number; trackHeight?: number; hovering: boolean }) {
  const timerRef = useRef<number | null>(null);
  const [atEnd, setAtEnd] = useState(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    hoveringRef.current = hovering;
    if (!hovering) {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
      setAtEnd(false);
      return;
    }
    const PAUSE = 500;
    const cycle = () => {
      if (!hoveringRef.current) return;
      setAtEnd((prev) => !prev);
      timerRef.current = window.setTimeout(cycle, ms + PAUSE);
    };
    timerRef.current = window.setTimeout(cycle, 80);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [hovering, ms]);

  const PAD = 6;
  const endPos = `calc(100% - ${size + PAD}px)`;
  const startPos = `${PAD}px`;

  return (
    <div className="relative overflow-hidden" style={{ height: trackHeight, borderRadius: "var(--radius-sm)" }}>
      <div className="absolute top-1/2 -translate-y-1/2" style={{ width: size, height: size, borderRadius: "var(--radius-circle)", backgroundColor: "var(--brand-default)", opacity: 0.15, left: PAD }} />
      {TRAIL_VARS.map((varName, i) => {
        const sz = Math.round(size * Math.pow(TRAIL_SIZE_SCALE, i + 1));
        return (
          <div key={varName} className="absolute top-1/2 -translate-y-1/2" style={{
            width: sz, height: sz, borderRadius: "var(--radius-circle)", backgroundColor: `var(${varName})`,
            left: atEnd ? endPos : startPos,
            transition: atEnd || hovering ? `left ${ms}ms var(--ease-standard) ${TRAIL_DELAYS[i]}ms` : `left 200ms var(--ease-standard) ${Math.round(TRAIL_DELAYS[i] * 0.5)}ms`,
            pointerEvents: "none" as const,
          }} />
        );
      })}
      <div className="absolute top-1/2 -translate-y-1/2" style={{
        width: size, height: size, borderRadius: "var(--radius-circle)", backgroundColor: "var(--brand-default)",
        left: atEnd ? endPos : startPos,
        transition: atEnd || hovering ? `left ${ms}ms var(--ease-standard)` : "left 200ms var(--ease-standard)",
      }} />
    </div>
  );
}

/* ── Speed comparison demo (inspired by M3 reference) ── */
function SpeedComparisonDemo({ speeds, label }: { speeds: { name: string; ms: number; easing: string }[]; label?: string }) {
  const [playing, setPlaying] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const timerRef = useRef<number | null>(null);
  const maxMs = Math.max(...speeds.map(s => s.ms));

  const play = useCallback(() => {
    setPlaying(true);
    setAtEnd(true);
    timerRef.current = window.setTimeout(() => {
      setPlaying(false);
    }, maxMs + 200);
  }, [maxMs]);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    setAtEnd(false);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
      {label && (
        <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>
          {label}
        </p>
      )}
      <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
        {speeds.map((s) => (
          <div key={s.name} className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <span className="shrink-0" style={{ width: 72, fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>
              {s.name}
            </span>
            <div className="flex-1 relative rounded-lg overflow-hidden" style={{ height: 44, backgroundColor: "var(--secondary-subtle)", border: "1px solid var(--border-subtle)" }}>
              {/* Animated bar */}
              <div style={{
                position: "absolute", top: 4, bottom: 4, left: 4,
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--brand-default)",
                opacity: 0.15,
                width: atEnd ? "calc(100% - 8px)" : 40,
                transition: atEnd ? `width ${s.ms}ms ${s.easing}` : "width 200ms var(--ease-standard)",
              }} />
              {/* Bar leading edge with trail */}
              <div style={{
                position: "absolute", top: 4, bottom: 4,
                width: 3, borderRadius: 2,
                backgroundColor: "var(--brand-default)",
                left: atEnd ? "calc(100% - 7px)" : 40,
                transition: atEnd ? `left ${s.ms}ms ${s.easing}` : "left 200ms var(--ease-standard)",
              }} />
              {/* Ghost trail lines */}
              {[0.85, 0.7, 0.55, 0.4].map((opacity, i) => (
                <div key={i} style={{
                  position: "absolute", top: 6, bottom: 6,
                  width: 1.5, borderRadius: 1,
                  backgroundColor: "var(--brand-default)",
                  opacity: atEnd ? opacity * 0.6 : 0,
                  left: atEnd ? "calc(100% - 7px)" : 40,
                  transition: atEnd ? `left ${s.ms}ms ${s.easing} ${(i + 1) * 20}ms, opacity ${s.ms * 0.3}ms var(--ease-standard) ${(i + 1) * 15}ms` : "left 200ms var(--ease-standard), opacity 100ms var(--ease-standard)",
                }} />
              ))}
            </div>
            <span className="shrink-0" style={{ width: 48, fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)", textAlign: "right" }}>
              {s.ms}ms
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
        <button
          onClick={playing ? reset : play}
          className="cursor-pointer flex items-center justify-center rounded-full"
          style={{
            width: 36, height: 36, backgroundColor: "var(--brand-default)", color: "var(--brand-fg)",
            border: "none", transition: "background-color var(--duration-short-2) var(--ease-standard), transform var(--duration-short-1) var(--ease-standard)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-default)"; e.currentTarget.style.transform = "scale(1)"; }}
          onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.93)"; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
        </button>
        {atEnd && !playing && (
          <button onClick={reset} className="cursor-pointer flex items-center" style={{ gap: "var(--space-2)", padding: "var(--space-2) var(--space-3)", border: "none", backgroundColor: "transparent", color: "var(--color-text-tertiary)", fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", transition: "color var(--duration-short-2) var(--ease-standard)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-tertiary)"; }}
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Animated component mini-demos for semantic section ── */

function ToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)} className="cursor-pointer relative" style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: on ? "var(--brand-default)" : "var(--border)", border: "none", transition: "background-color var(--duration-short-3) var(--ease-standard)" }}>
      <div style={{
        position: "absolute", top: 2, left: on ? 22 : 2,
        width: 20, height: 20, borderRadius: "var(--radius-circle)",
        backgroundColor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "left var(--duration-medium-2) var(--ease-emphasized)",
      }} />
    </button>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <button onClick={() => setChecked(!checked)} className="cursor-pointer flex items-center justify-center" style={{
      width: 20, height: 20, borderRadius: "var(--radius-xs)",
      backgroundColor: checked ? "var(--brand-default)" : "transparent",
      border: checked ? "none" : "2px solid var(--border)",
      transition: "background-color var(--duration-short-2) var(--ease-standard), border-color var(--duration-short-2) var(--ease-standard)",
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: checked ? 1 : 0, transform: checked ? "scale(1)" : "scale(0.5)", transition: "opacity var(--duration-short-2) var(--ease-standard), transform var(--duration-short-3) var(--ease-emphasized-decelerate)" }}>
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function FABDemo() {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer flex items-center justify-center"
      style={{
        height: 40,
        width: expanded ? 140 : 40,
        borderRadius: expanded ? 20 : "var(--radius-circle)",
        backgroundColor: "var(--brand-default)", color: "var(--brand-fg)",
        border: "none", overflow: "hidden", whiteSpace: "nowrap",
        transition: "width var(--duration-medium-4) var(--ease-emphasized), border-radius var(--duration-short-3) var(--ease-standard)",
        gap: "var(--space-2)", fontFamily: "var(--font-family-supreme)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-default)"; }}
    >
      <span style={{ display: "inline-flex", transition: "transform var(--duration-medium-2) var(--ease-emphasized)", transform: expanded ? "rotate(45deg)" : "rotate(0)" }}>+</span>
      {expanded && <span style={{ opacity: expanded ? 1 : 0, transition: "opacity var(--duration-short-4) var(--ease-standard-decelerate)" }}>New item</span>}
    </button>
  );
}

function TooltipDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer flex items-center justify-center rounded-full"
        style={{ width: 36, height: 36, backgroundColor: "var(--secondary)", border: "1px solid var(--border-subtle)", color: "var(--color-text-primary)", transition: "background-color var(--duration-short-2) var(--ease-standard), border-color var(--duration-short-2) var(--ease-standard)" }}
      >
        <Bell size={16} />
      </button>
      <div style={{
        position: "absolute", bottom: "100%", left: "50%", transform: `translateX(-50%) translateY(${show ? -8 : -4}px)`,
        padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-sm)",
        backgroundColor: "var(--foreground)", color: "var(--background)",
        fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", whiteSpace: "nowrap",
        opacity: show ? 1 : 0, pointerEvents: "none",
        transition: "opacity var(--duration-short-4) var(--ease-standard-decelerate), transform var(--duration-short-4) var(--ease-standard-decelerate)",
      }}>
        Notifications
      </div>
    </div>
  );
}

function SkeletonShimmerDemo() {
  return (
    <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
      <div className="hx-shimmer rounded-full" style={{ width: 36, height: 36 }} />
      <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
        <div className="hx-shimmer rounded" style={{ width: 100, height: 10 }} />
        <div className="hx-shimmer rounded" style={{ width: 64, height: 8 }} />
      </div>
    </div>
  );
}

function CardEnterDemo() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  const toggle = () => {
    setVisible(v => !v);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (visible) {
      timerRef.current = window.setTimeout(() => setVisible(true), 600);
    }
  };

  return (
    <div className="flex flex-col items-center" style={{ gap: "var(--space-4)" }}>
      <div style={{ width: 180, height: 80, perspective: 800 }}>
        <div className="rounded-lg" style={{
          width: "100%", height: "100%",
          backgroundColor: "var(--background)", border: "1px solid var(--border-subtle)",
          padding: "var(--space-4)", display: "flex", flexDirection: "column", justifyContent: "center",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(12px)",
          opacity: visible ? 1 : 0,
          transition: visible
            ? "transform var(--duration-medium-2) var(--ease-emphasized-decelerate), opacity var(--duration-short-4) var(--ease-standard-decelerate)"
            : "transform var(--duration-medium-1) var(--ease-emphasized-accelerate), opacity var(--duration-short-3) var(--ease-standard-accelerate)",
        }}>
          <div className="hx-shimmer rounded" style={{ width: "60%", height: 8, marginBottom: "var(--space-2)" }} />
          <div className="hx-shimmer rounded" style={{ width: "100%", height: 6 }} />
          <div className="hx-shimmer rounded" style={{ width: "80%", height: 6, marginTop: "var(--space-1)" }} />
        </div>
      </div>
      <button onClick={toggle} className="cursor-pointer" style={{
        padding: "var(--space-1) var(--space-3)", border: "none",
        backgroundColor: "transparent", color: "var(--brand-default)",
        fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
        transition: "color var(--duration-short-2) var(--ease-standard)",
      }}>
        {visible ? "Exit" : "Enter"}
      </button>
    </div>
  );
}

/* ── Staggered list enter demo ── */
function StaggeredListDemo() {
  const [visible, setVisible] = useState(true);
  const items = ["Inbox", "Archive", "Sent", "Drafts"];

  const toggle = () => setVisible(v => !v);

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
      <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-subtle)", minHeight: 164 }}>
        {items.map((item, i) => (
          <div key={item} className="flex items-center border-b" style={{
            padding: "var(--space-3) var(--space-4)",
            borderColor: "var(--border-subtle)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-16px)",
            transition: visible
              ? `opacity var(--duration-short-4) var(--ease-standard-decelerate) ${i * 60}ms, transform var(--duration-medium-2) var(--ease-emphasized-decelerate) ${i * 60}ms`
              : `opacity var(--duration-short-3) var(--ease-standard-accelerate) ${(items.length - 1 - i) * 40}ms, transform var(--duration-medium-1) var(--ease-emphasized-accelerate) ${(items.length - 1 - i) * 40}ms`,
          }}>
            <ChevronRight size={14} style={{ color: "var(--color-text-tertiary)", marginRight: "var(--space-3)" }} />
            <span style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)" }}>{item}</span>
          </div>
        ))}
      </div>
      <button onClick={toggle} className="cursor-pointer self-start" style={{
        padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)",
        fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)",
        transition: "background-color var(--duration-short-2) var(--ease-standard), border-color var(--duration-short-2) var(--ease-standard)",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--background)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
      >
        {visible ? "Collapse list" : "Show list"}
      </button>
    </div>
  );
}

/* ── Morphing shape demo for principles ── */
function MorphingShapeDemo() {
  const [shape, setShape] = useState(0);
  const shapes = [
    { borderRadius: "var(--radius-circle)", width: 64, height: 64, bg: "var(--brand-default)" },
    { borderRadius: "var(--radius-sm2)", width: 96, height: 56, bg: "var(--chart-5)" },
    { borderRadius: "var(--radius-xs)", width: 56, height: 80, bg: "var(--chart-2)" },
    { borderRadius: "50% 0 50% 0", width: 72, height: 72, bg: "var(--chart-3)" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setShape(s => (s + 1) % shapes.length), 1800);
    return () => clearInterval(timer);
  }, []);

  const s = shapes[shape];
  return (
    <div className="flex items-center justify-center" style={{ height: 100, width: 120 }}>
      <div style={{
        width: s.width, height: s.height,
        borderRadius: s.borderRadius,
        backgroundColor: s.bg, opacity: 0.8,
        transition: "all var(--duration-long-2) var(--ease-emphasized)",
      }} />
    </div>
  );
}

/* ── Ripple button demo ── */
function RippleButtonDemo() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, { x, y, id }]);
    setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 600);
  };

  return (
    <button ref={btnRef} onClick={handleClick} className="cursor-pointer relative overflow-hidden rounded" style={{
      padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--brand-default)", color: "var(--brand-fg)",
      border: "none", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
      transition: "transform var(--duration-short-1) var(--ease-standard-accelerate)",
    }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      Click for ripple
      {ripples.map(r => (
        <span key={r.id} style={{
          position: "absolute", left: r.x, top: r.y,
          width: 0, height: 0, borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.35)",
          transform: "translate(-50%, -50%)",
          animation: "ripple-expand 600ms var(--ease-standard) forwards",
          pointerEvents: "none",
        }} />
      ))}
      <style>{`@keyframes ripple-expand { to { width: 200px; height: 200px; opacity: 0; } }`}</style>
    </button>
  );
}

/* ── Micro-interaction badge demo ── */
function BadgePulseDemo() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
      <div className="relative">
        <div className="flex items-center justify-center rounded" style={{ width: 40, height: 40, backgroundColor: "var(--secondary)", border: "1px solid var(--border-subtle)" }}>
          <Bell size={18} style={{ color: "var(--color-text-primary)" }} />
        </div>
        <span key={count} style={{
          position: "absolute", top: -6, right: -6, minWidth: 18, height: 18,
          borderRadius: 9, backgroundColor: "var(--danger-default)", color: "#fff",
          fontSize: 10, fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 4px", animation: "badge-pop 300ms var(--ease-emphasized-decelerate)",
        }}>
          {count}
        </span>
      </div>
      <button onClick={() => setCount(c => c + 1)} className="cursor-pointer" style={{
        padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)",
        fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)",
        transition: "background-color var(--duration-short-2) var(--ease-standard)",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--background)"; }}
      >
        + Notify
      </button>
      <style>{`@keyframes badge-pop { 0% { transform: scale(0.5); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }`}</style>
    </div>
  );
}

/* Mini dialog */
function MiniDialog({ onClose }: { onClose: () => void }) {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    setTimeout(onClose, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
        opacity: exiting ? 0 : 1,
        transition: `opacity var(--duration-short-3) ${exiting ? "var(--ease-standard-accelerate)" : "var(--ease-standard-decelerate)"}`,
      }}
      onClick={handleClose}
    >
      <div
        className="rounded-xl"
        style={{
          width: 320, padding: "var(--space-7)", backgroundColor: "var(--background)",
          border: "1px solid var(--border-subtle)", boxShadow: "var(--modal-shadow)",
          transform: exiting ? "scale(0.95) translateY(8px)" : "scale(1) translateY(0)",
          opacity: exiting ? 0 : 1,
          transition: `transform var(--duration-medium-1) ${exiting ? "var(--ease-emphasized-accelerate)" : "var(--ease-emphasized-decelerate)"}, opacity var(--duration-short-3) ${exiting ? "var(--ease-standard-accelerate)" : "var(--ease-standard-decelerate)"}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)" }}>
          Dialog
        </p>
        <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-6)", lineHeight: 1.5 }}>
          Enters with <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>--motion-enter</code> and exits with <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>--motion-exit</code>.
        </p>
        <button
          onClick={handleClose}
          className="cursor-pointer rounded"
          style={{
            padding: "var(--space-3) var(--space-5)", backgroundColor: "var(--brand-default)", color: "var(--brand-fg)",
            border: "none", fontSize: "var(--text-body)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
            transition: "background-color var(--duration-short-2) var(--ease-standard)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-default)"; }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* Duration card */
function DurationCard({ token, isSelected, onSelect }: { token: DurationToken; isSelected: boolean; onSelect: (rect: DOMRect) => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      ref={cardRef}
      onClick={() => { if (cardRef.current) onSelect(cardRef.current.getBoundingClientRect()); }}
      className="cursor-pointer flex flex-col rounded-xl text-left"
      style={{
        padding: 0, backgroundColor: "var(--background)",
        border: isSelected ? "2px solid var(--brand-default)" : "1px solid var(--border-subtle)",
        transition: "border-color var(--duration-short-3) var(--ease-standard), box-shadow var(--duration-short-3) var(--ease-standard)",
        overflow: "hidden", outline: "none", fontFamily: "var(--font-family-supreme)",
        boxShadow: isSelected ? "0 0 0 3px rgba(36, 99, 235, 0.15)" : "none",
      }}
      onMouseEnter={(e) => { setHovered(true); if (!isSelected) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--elevation-sm)"; } }}
      onMouseLeave={(e) => { setHovered(false); if (!isSelected) { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; } }}
    >
      <div style={{ padding: "var(--space-4) var(--space-3) var(--space-2)" }}>
        <HoverBall ms={token.ms} size={18} trackHeight={36} hovering={hovered || isSelected} />
      </div>
      <div className="flex items-center justify-between" style={{ padding: "0 var(--space-4) var(--space-4)" }}>
        <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>
          {token.name}
        </span>
        <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>
          {token.ms}ms
        </span>
      </div>
    </button>
  );
}

/* Duration popover */
function DurationPopover({ token, anchorRect, onClose }: { token: DurationToken; anchorRect: DOMRect; onClose: () => void }) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!popoverRef.current) return;
    const pw = popoverRef.current.offsetWidth;
    const ph = popoverRef.current.offsetHeight;
    let left = anchorRect.right + 12;
    let top = anchorRect.top + (anchorRect.height / 2) - (ph / 2);
    if (left + pw > window.innerWidth - 20) left = anchorRect.left - pw - 12;
    top = Math.max(12, Math.min(top, window.innerHeight - ph - 12));
    setPos({ top, left });
  }, [anchorRect]);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={popoverRef} className="fixed z-50 rounded-xl" style={{
      top: pos.top, left: pos.left, width: 320, backgroundColor: "var(--background)",
      border: "1px solid var(--border-subtle)", boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      fontFamily: "var(--font-family-supreme)",
      opacity: pos.top === 0 && pos.left === 0 ? 0 : 1,
      transition: "opacity var(--duration-short-3) var(--ease-standard-decelerate)",
    }}>
      <div className="flex items-start justify-between" style={{ padding: "var(--space-5) var(--space-5) 0 var(--space-5)" }}>
        <div>
          <p style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>{token.name}</p>
          <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>{token.token}</code>
        </div>
        <button onClick={onClose} className="cursor-pointer flex items-center justify-center rounded-full shrink-0" style={{
          width: 28, height: 28, backgroundColor: "transparent", border: "none", color: "var(--color-text-tertiary)",
          transition: "background-color var(--duration-short-2) var(--ease-standard)",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        ><X size={16} /></button>
      </div>
      <div style={{ padding: "var(--space-4) var(--space-5)" }}>
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "var(--secondary-subtle)", border: "1px solid var(--border-subtle)" }}>
          <HoverBall ms={token.ms} size={24} trackHeight={56} hovering={true} />
        </div>
      </div>
      <div className="flex items-center border-t" style={{ padding: "var(--space-4) var(--space-5)", borderColor: "var(--border-subtle)", gap: "var(--space-3)" }}>
        <Clock size={14} style={{ color: "var(--color-text-tertiary)" }} />
        <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Duration</span>
        <span style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", marginLeft: "auto" }}>{token.ms}ms</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function PrinciplesSection() {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
      {/* Intro */}
      <div>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", letterSpacing: "var(--ls-h2)", marginBottom: "var(--space-4)" }}>
          Motion principles
        </h2>
        <p style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, maxWidth: 640 }}>
          Motion in HollaEx is purposeful and restrained. Inspired by Material Design 3, our motion system uses physically-grounded easing curves and a consistent duration scale so every animation feels intentional and cohesive.
        </p>
      </div>

      {/* Animated hero showcase */}
      <DemoCard title="Live showcase">
        <div className="grid grid-cols-4" style={{ gap: "var(--space-5)" }}>
          <div className="flex flex-col items-center" style={{ gap: "var(--space-4)" }}>
            <MorphingShapeDemo />
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>Shape morphing</span>
          </div>
          <div className="flex flex-col items-center" style={{ gap: "var(--space-4)" }}>
            <div className="flex items-center justify-center" style={{ height: 100 }}>
              <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
                <ToggleDemo />
                <CheckboxDemo />
              </div>
            </div>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>Controls</span>
          </div>
          <div className="flex flex-col items-center" style={{ gap: "var(--space-4)" }}>
            <div className="flex items-center justify-center" style={{ height: 100 }}>
              <FABDemo />
            </div>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>FAB expand</span>
          </div>
          <div className="flex flex-col items-center" style={{ gap: "var(--space-4)" }}>
            <div className="flex items-center justify-center" style={{ height: 100 }}>
              <TooltipDemo />
            </div>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>Tooltip</span>
          </div>
        </div>
      </DemoCard>

      {/* Principle cards */}
      <div className="grid grid-cols-3" style={{ gap: "var(--space-5)" }}>
        {PRINCIPLES.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="rounded-xl"
              style={{
                padding: "var(--space-7)", backgroundColor: "var(--background)",
                border: "1px solid var(--border-subtle)",
                transition: "border-color var(--duration-short-2) var(--ease-standard), box-shadow var(--duration-short-2) var(--ease-standard)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--elevation-sm)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="flex items-center justify-center rounded-lg" style={{ width: 44, height: 44, marginBottom: "var(--space-5)", backgroundColor: p.color, opacity: 0.12 }}>
                <Icon size={22} style={{ color: p.color, opacity: 1 }} />
              </div>
              <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)" }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.55 }}>
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Guidelines */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Guidelines
        </h3>
        <div className="grid grid-cols-2" style={{ gap: "var(--space-5)" }}>
          {[
            { title: "Asymmetric enter/exit", desc: "Entrances use deceleration (arriving with energy), exits use acceleration (departing quickly). Exit durations should be shorter than enter durations." },
            { title: "Scale with surface area", desc: "Larger elements need longer durations. A tooltip (small) uses 200ms; a full-page transition uses 500ms+. Small elements should never feel slow." },
            { title: "Never block interaction", desc: "Users should be able to interact with the destination before an animation completes. Avoid animations that lock UI during playback." },
            { title: "Respect prefers-reduced-motion", desc: "When the OS requests reduced motion, collapse durations to near-instant and replace transforms with simple opacity fades." },
          ].map((rule) => (
            <div key={rule.title} className="flex" style={{ gap: "var(--space-4)" }}>
              <div className="shrink-0 rounded-full" style={{ width: 6, height: 6, backgroundColor: "var(--brand-default)", marginTop: 8 }} />
              <div>
                <p style={{ fontSize: "var(--text-body)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-1)" }}>
                  {rule.title}
                </p>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5 }}>
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive playground */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Interactive playground
        </h3>
        <DemoCard title="Live demo">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            {/* Hover + Press */}
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>
                Hover &amp; Press
              </p>
              <div className="flex flex-wrap items-center" style={{ gap: "var(--space-4)" }}>
                <RippleButtonDemo />
                <button className="cursor-pointer rounded" style={{
                  padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--secondary)", color: "var(--color-text-primary)",
                  border: "1px solid var(--border-subtle)", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
                  transition: "background-color var(--duration-short-2) var(--ease-standard), border-color var(--duration-short-2) var(--ease-standard), transform var(--duration-short-1) var(--ease-standard-accelerate)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-subtle-hover)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "scale(1)"; }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  Hover &amp; press
                </button>
                <BadgePulseDemo />
              </div>
            </div>

            {/* Expand / Collapse */}
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>
                Expand &amp; Collapse
              </p>
              <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="cursor-pointer w-full flex items-center justify-between"
                  style={{
                    padding: "var(--space-4) var(--space-5)", backgroundColor: "var(--background)", border: "none",
                    fontSize: "var(--text-body)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)",
                    transition: "background-color var(--duration-short-2) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--background)"; }}
                >
                  <span>Accordion item</span>
                  <span style={{ display: "inline-flex", transition: "transform var(--duration-medium-2) var(--ease-emphasized)", transform: expanded ? "rotate(45deg)" : "rotate(0deg)", fontSize: "18px", lineHeight: 1 }}>+</span>
                </button>
                <div style={{
                  overflow: "hidden", maxHeight: expanded ? 120 : 0, opacity: expanded ? 1 : 0,
                  transition: `max-height var(--duration-medium-2) ${expanded ? "var(--ease-emphasized-decelerate)" : "var(--ease-emphasized-accelerate)"}, opacity var(--duration-short-3) ${expanded ? "var(--ease-standard-decelerate)" : "var(--ease-standard-accelerate)"}`,
                }}>
                  <div style={{ padding: "var(--space-4) var(--space-5)", fontSize: "var(--text-body)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", borderTop: "1px solid var(--border-subtle)" }}>
                    This content expands with <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>--ease-emphasized-decelerate</code> and collapses with <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>--ease-emphasized-accelerate</code>.
                  </div>
                </div>
              </div>
            </div>

            {/* Enter / Exit */}
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>
                Enter &amp; Exit
              </p>
              <div className="flex items-start" style={{ gap: "var(--space-6)" }}>
                <button onClick={() => setModalOpen(true)} className="cursor-pointer rounded" style={{
                  padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--secondary-default)", color: "var(--secondary-fg)", border: "none",
                  fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
                  transition: "background-color var(--duration-short-2) var(--ease-standard), transform var(--duration-short-1) var(--ease-standard-accelerate)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-default)"; }}
                >
                  Open dialog
                </button>
                <CardEnterDemo />
              </div>
              {modalOpen && <MiniDialog onClose={() => setModalOpen(false)} />}
            </div>

            {/* Focus line */}
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>
                Focus Line
              </p>
              <div className="group relative" style={{ maxWidth: 320 }}>
                <input type="text" placeholder="Click to see the focus line..." className="w-full outline-none" style={{
                  padding: "var(--space-3) 0", backgroundColor: "transparent", fontSize: "var(--text-body)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)",
                  border: "none", borderBlockEnd: "1px solid var(--border-subtle)",
                }} />
                <span aria-hidden className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-focus-within:scale-x-100" style={{ backgroundColor: "var(--brand-default)", transition: "transform var(--motion-focus-line)" }} />
              </div>
            </div>
          </div>
        </DemoCard>
      </div>
    </div>
  );
}

function EasingSection() {
  const categories = [
    { key: "standard", label: "Standard" },
    { key: "emphasized", label: "Emphasized" },
    { key: "linear", label: "Linear" },
  ] as const;

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", letterSpacing: "var(--ls-h2)", marginBottom: "var(--space-4)" }}>
          Easing curves
        </h2>
        <p style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, maxWidth: 640 }}>
          Seven easing tokens control how elements accelerate and decelerate. Standard curves suit most UI; emphasized curves add drama for key moments. Hover any track to see the curve in action.
        </p>
      </div>

      {/* Side-by-side easing comparison */}
      <DemoCard title="Compare easings">
        <SpeedComparisonDemo
          label="Standard curves"
          speeds={[
            { name: "Accelerate", ms: 500, easing: "cubic-bezier(0.3, 0, 1, 1)" },
            { name: "Standard", ms: 500, easing: "cubic-bezier(0.2, 0.0, 0, 1.0)" },
            { name: "Decelerate", ms: 500, easing: "cubic-bezier(0, 0, 0, 1)" },
          ]}
        />
        <div style={{ marginTop: "var(--space-7)" }}>
          <SpeedComparisonDemo
            label="Emphasized curves"
            speeds={[
              { name: "Accelerate", ms: 500, easing: "cubic-bezier(0.3, 0.0, 0.8, 0.15)" },
              { name: "Emphasized", ms: 500, easing: "cubic-bezier(0.2, 0.0, 0, 1.0)" },
              { name: "Decelerate", ms: 500, easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)" },
            ]}
          />
        </div>
      </DemoCard>

      {categories.map((cat) => {
        const tokens = EASING_TOKENS.filter((t) => t.category === cat.key);
        return (
          <div key={cat.key}>
            <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
              {cat.label}
            </h3>
            <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
              {tokens.map((token) => (
                <div
                  key={token.token}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)", transition: "border-color var(--duration-short-2) var(--ease-standard)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                >
                  <div className="flex items-stretch">
                    <div className="shrink-0 flex items-center justify-center border-r" style={{ padding: "var(--space-5)", borderColor: "var(--border-subtle)", backgroundColor: "var(--secondary-subtle)" }}>
                      <EasingCurveCanvas value={token.value} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center" style={{ padding: "var(--space-5) var(--space-6)" }}>
                      <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                        <span style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>
                          {token.name}
                        </span>
                        <CopyButton text={`var(${token.token})`} />
                      </div>
                      <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--brand-default)", marginBottom: "var(--space-3)", display: "block" }}>
                        {token.token}: {token.value}
                      </code>
                      <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5, marginBottom: "var(--space-5)" }}>
                        {token.description}
                      </p>
                      <EasingBallLoop easingValue={token.value} durationMs={600} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DurationSection() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [popoverRect, setPopoverRect] = useState<DOMRect | null>(null);

  const tiers = [
    { key: "short", label: "Short", range: "50–200ms", desc: "Micro-interactions: hover, press, small state flips" },
    { key: "medium", label: "Medium", range: "250–400ms", desc: "Standard UI: enter/exit, panel open/close" },
    { key: "long", label: "Long", range: "450–600ms", desc: "Large surfaces: page transitions, card reorder" },
    { key: "extra-long", label: "Extra Long", range: "700–1000ms", desc: "Dramatic: hero reveals, onboarding, celebration" },
  ] as const;

  const handleSelect = useCallback((token: DurationToken, rect: DOMRect) => {
    if (selectedToken === token.token) { setSelectedToken(null); setPopoverRect(null); }
    else { setSelectedToken(token.token); setPopoverRect(rect); }
  }, [selectedToken]);

  const handleClose = useCallback(() => { setSelectedToken(null); setPopoverRect(null); }, []);
  const activeToken = DURATION_TOKENS.find((t) => t.token === selectedToken);

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", letterSpacing: "var(--ls-h2)", marginBottom: "var(--space-4)" }}>
          Duration scale
        </h2>
        <p style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, maxWidth: 640 }}>
          Sixteen duration tokens in four tiers matching the Material Design 3 specification. Press play to see how speed affects perception, or click any card for details.
        </p>
      </div>

      {/* Speed comparison hero */}
      <DemoCard title="Speed comparison">
        <div className="grid grid-cols-2" style={{ gap: "var(--space-8)" }}>
          <SpeedComparisonDemo
            label="Interaction scale"
            speeds={[
              { name: "Fast", ms: 150, easing: "cubic-bezier(0.2, 0.0, 0, 1.0)" },
              { name: "Default", ms: 300, easing: "cubic-bezier(0.2, 0.0, 0, 1.0)" },
              { name: "Slow", ms: 600, easing: "cubic-bezier(0.2, 0.0, 0, 1.0)" },
            ]}
          />
          <SpeedComparisonDemo
            label="Layout scale"
            speeds={[
              { name: "Fast", ms: 300, easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)" },
              { name: "Default", ms: 500, easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)" },
              { name: "Slow", ms: 1000, easing: "cubic-bezier(0.05, 0.7, 0.1, 1.0)" },
            ]}
          />
        </div>
      </DemoCard>

      {tiers.map((tier) => {
        const tokens = DURATION_TOKENS.filter((t) => t.tier === tier.key);
        return (
          <div key={tier.key}>
            <div className="flex items-baseline" style={{ gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
              <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>
                {tier.label}
              </h3>
              <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-mono)" }}>
                {tier.range}
              </span>
            </div>
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-4)" }}>
              {tier.desc}
            </p>
            <div className="grid grid-cols-4" style={{ gap: "var(--space-4)" }}>
              {tokens.map((token) => (
                <DurationCard key={token.token} token={token} isSelected={selectedToken === token.token} onSelect={(rect) => handleSelect(token, rect)} />
              ))}
            </div>
          </div>
        );
      })}

      {activeToken && popoverRect && <DurationPopover token={activeToken} anchorRect={popoverRect} onClose={handleClose} />}
    </div>
  );
}

function SemanticSection() {
  const categories = [
    { key: "interaction", label: "Interaction", desc: "Hover, press, and focus responses", color: "var(--brand-default)" },
    { key: "visibility", label: "Visibility", desc: "Elements appearing and disappearing", color: "var(--chart-5)" },
    { key: "layout", label: "Layout", desc: "Expanding, collapsing, and sliding", color: "var(--chart-2)" },
  ] as const;

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", letterSpacing: "var(--ls-h2)", marginBottom: "var(--space-4)" }}>
          Semantic motion tokens
        </h2>
        <p style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, maxWidth: 640 }}>
          Pre-composed shorthand tokens that combine a duration and easing for specific interaction patterns. Use these instead of raw duration + easing pairs.
        </p>
      </div>

      {/* Component showcase */}
      <DemoCard title="Application — components in motion">
        <div className="grid grid-cols-3" style={{ gap: "var(--space-6)" }}>
          <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>Toggle &amp; Checkbox</span>
            <div className="flex items-center" style={{ gap: "var(--space-4)", padding: "var(--space-5) 0" }}>
              <ToggleDemo />
              <CheckboxDemo />
              <CheckboxDemo />
            </div>
            <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>--motion-press</code>
          </div>
          <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>Staggered list</span>
            <StaggeredListDemo />
            <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>--motion-enter + stagger</code>
          </div>
          <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>Card enter/exit</span>
            <div className="flex items-start justify-center" style={{ padding: "var(--space-3) 0" }}>
              <CardEnterDemo />
            </div>
            <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>--motion-enter / --motion-exit</code>
          </div>
        </div>
        <div style={{ marginTop: "var(--space-6)", borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--space-6)" }}>
          <div className="grid grid-cols-4" style={{ gap: "var(--space-5)" }}>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
              <RippleButtonDemo />
              <code style={{ fontSize: 10, fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>Ripple</code>
            </div>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
              <FABDemo />
              <code style={{ fontSize: 10, fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>FAB expand</code>
            </div>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
              <SkeletonShimmerDemo />
              <code style={{ fontSize: 10, fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>Skeleton</code>
            </div>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
              <BadgePulseDemo />
              <code style={{ fontSize: 10, fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>Badge pop</code>
            </div>
          </div>
        </div>
      </DemoCard>

      {categories.map((cat) => {
        const tokens = SEMANTIC_TOKENS.filter((t) => t.category === cat.key);
        return (
          <div key={cat.key}>
            <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-2)" }}>
              {cat.label}
            </h3>
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
              {cat.desc}
            </p>
            <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
              {tokens.map((token) => (
                <div
                  key={token.token}
                  className="rounded-xl flex items-stretch overflow-hidden"
                  style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)", transition: "border-color var(--duration-short-2) var(--ease-standard)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                >
                  <div className="w-1 shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="flex-1" style={{ padding: "var(--space-5) var(--space-6)" }}>
                    <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                      <span style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>
                        {token.name}
                      </span>
                      <CopyButton text={`var(${token.token})`} />
                    </div>
                    <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-4)", lineHeight: 1.5 }}>
                      {token.description}
                    </p>
                    <div className="flex items-center flex-wrap" style={{ gap: "var(--space-3)" }}>
                      <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)", padding: "var(--space-1) var(--space-3)", backgroundColor: "var(--secondary)", borderRadius: "var(--radius-xs)" }}>
                        {token.duration}
                      </code>
                      <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-disabled)" }}>+</span>
                      <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)", padding: "var(--space-1) var(--space-3)", backgroundColor: "var(--secondary)", borderRadius: "var(--radius-xs)" }}>
                        {token.easing}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Usage */}
      <div>
        <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Usage
        </h3>
        <DemoCard title="CSS Example" noPad>
          <pre style={{ padding: "var(--space-6) var(--space-7)", backgroundColor: "var(--background)", margin: 0, overflow: "auto" }}>
            <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", color: "var(--color-text-primary)", lineHeight: 1.8 }}>{`.hx-button {
  transition: background-color var(--motion-hover);
}

.hx-button:active {
  transition: transform var(--motion-press);
}

.hx-modal-enter {
  transition: transform var(--motion-enter),
              opacity var(--motion-fade-in);
}

.hx-modal-exit {
  transition: transform var(--motion-exit),
              opacity var(--motion-fade-out);
}

.hx-accordion-content {
  transition: max-height var(--motion-expand);
}

.hx-input-focus-line {
  transition: transform var(--motion-focus-line);
}`}</code>
          </pre>
        </DemoCard>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */

export function MotionPage() {
  const [sentinelRef, scrolled] = useScrolledPast();
  const [activeTab, setActiveTab] = useState<TabValue>("principles");

  const tokenCount = EASING_TOKENS.length + DURATION_TOKENS.length + SEMANTIC_TOKENS.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--secondary-subtle)", fontFamily: "var(--font-family-supreme)" }}>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* ── Sticky header ──────────────────────────────── */}
      <div
        className="border-b sticky top-0 z-10 h-[72px] transition-shadow duration-200 relative"
        style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--background)", boxShadow: scrolled ? "var(--elevation-sm)" : "none" }}
      >
        <div className="h-full flex items-center justify-between relative z-[1]" style={{ padding: "0 var(--space-10)" }}>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Foundation</span>
            <span style={{ fontSize: "11px", color: "var(--border)" }}>&rsaquo;</span>
            <span style={{ fontSize: "11px", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)" as any, fontFamily: "var(--font-family-supreme)" }}>Motion</span>
          </div>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-5)" }}>
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{tokenCount} tokens</span>
            <BreadcrumbSearch />
            <HxThemeToggle size="lg" />
          </div>
        </div>

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
                  className="relative flex items-center justify-center cursor-pointer select-none outline-none"
                  style={{
                    height: "72px", padding: "0 16px", fontSize: "14px",
                    fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                    color: isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-supreme)", backgroundColor: "transparent", border: "none",
                    transition: "color var(--duration-short-2) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-tertiary)"; }}
                >
                  {tab.label}
                  <span className="absolute bottom-0 left-0 w-full origin-left" style={{
                    height: "2px", backgroundColor: "var(--brand-default)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform var(--duration-medium-1) var(--ease-emphasized)",
                  }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Page content ──────────────────────────────── */}
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 var(--space-8)" }}>
        <div className="border-b" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-9)", borderColor: "var(--secondary)" }}>
          <h1 style={{
            fontSize: "52px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)",
            lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)",
          }}>
            Motion
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "var(--muted-foreground)", lineHeight: 1.6, maxWidth: 580, fontFamily: "var(--font-family-supreme)" }}>
            Easing curves, duration tokens, and semantic motion presets that bring the HollaEx interface to life with purposeful, physically-grounded animation.
          </p>
        </div>

        <div style={{ padding: "var(--space-10) 0 var(--space-12)" }}>
          {activeTab === "principles" && <PrinciplesSection />}
          {activeTab === "easing" && <EasingSection />}
          {activeTab === "duration" && <DurationSection />}
          {activeTab === "semantic" && <SemanticSection />}
        </div>

        <div className="border-t flex items-center justify-between" style={{ padding: "var(--space-8) 0", borderColor: "var(--secondary)" }}>
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            HollaEx Design System · Motion
          </p>
        </div>
      </div>
    </div>
  );
}
