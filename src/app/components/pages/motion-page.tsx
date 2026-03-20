import { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "../docs/search-command";
import { SectionJumpFab } from "../docs/section-jump-fab";
import { IconBulb, IconWaveSine, IconClock, IconTag } from "@tabler/icons-react";
import type { ComponentType } from "react";

const FAB_ICONS: Record<string, ComponentType<{ size?: number; stroke?: number }>> = {
  "Principles": IconBulb,
  "Easing Curves": IconWaveSine,
  "Duration Scale": IconClock,
  "Semantic Tokens": IconTag,
};
import { Button } from "../ui/hollaex-button";
import { X, Clock, Play, Pause, RotateCcw, ChevronRight, Bell, Zap, Eye, MousePointer, ArrowRight, ArrowDown, Activity, CheckCircle, XCircle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

type EasingToken = {
  name: string;
  token: string;
  value: string;
  description: string;
  category: "productive" | "expressive" | "linear";
};

const EASING_TOKENS: EasingToken[] = [
  { name: "Productive Standard", token: "--ease-standard", value: "cubic-bezier(0.2, 0, 0.38, 0.9)", description: "The default curve for most UI transitions. Suited for small, utilitarian motions that keep the user focused — hover states, selection changes, micro-feedback.", category: "productive" },
  { name: "Productive Entrance", token: "--ease-standard-decelerate", value: "cubic-bezier(0, 0, 0.38, 0.9)", description: "Elements entering the viewport. Begins at full velocity and decelerates into its final position, creating a feeling of efficient arrival.", category: "productive" },
  { name: "Productive Exit", token: "--ease-standard-accelerate", value: "cubic-bezier(0.2, 0, 1, 0.9)", description: "Elements leaving the viewport. Accelerates away from its resting position, clearing the stage quickly without lingering.", category: "productive" },
  { name: "Expressive Standard", token: "--ease-emphasized", value: "cubic-bezier(0.4, 0.14, 0.3, 1)", description: "For transitions that carry narrative weight — moments of delight, onboarding, or brand expression. More dramatic curve with distinct personality.", category: "expressive" },
  { name: "Expressive Entrance", token: "--ease-emphasized-decelerate", value: "cubic-bezier(0, 0, 0.3, 1)", description: "Dramatic entrances for hero moments. Arrives with energy and settles with confident ease, drawing attention to what just appeared.", category: "expressive" },
  { name: "Expressive Exit", token: "--ease-emphasized-accelerate", value: "cubic-bezier(0.4, 0.14, 1, 1)", description: "Expressive departures. Lingers slightly before accelerating away — a subtle acknowledgment before removal.", category: "expressive" },
  { name: "Linear", token: "--ease-linear", value: "cubic-bezier(0, 0, 1, 1)", description: "Constant speed with no acceleration. Reserved for continuous animations: progress indicators, loading spinners, and ambient loops where uniform motion represents measurable progress.", category: "linear" },
];

type DurationToken = {
  name: string;
  token: string;
  ms: number;
  useCase: string;
  tier: "short" | "medium" | "long" | "extra-long";
};

const DURATION_TOKENS: DurationToken[] = [
  { name: "Short 1", token: "--duration-short-1", ms: 50, useCase: "Micro-feedback: checkbox tick, icon swap", tier: "short" },
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
  { name: "Hover", token: "--motion-hover", duration: "--duration-short-3", easing: "--ease-standard", description: "Productive: background/color shift on pointer hover", category: "interaction" },
  { name: "Press", token: "--motion-press", duration: "--duration-short-2", easing: "--ease-standard-accelerate", description: "Productive: scale-down or color shift on click/tap", category: "interaction" },
  { name: "Expand", token: "--motion-expand", duration: "--duration-medium-4", easing: "--ease-emphasized-decelerate", description: "Expressive entrance: accordion open, dropdown reveal", category: "layout" },
  { name: "Collapse", token: "--motion-collapse", duration: "--duration-medium-2", easing: "--ease-emphasized-accelerate", description: "Expressive exit: accordion close, dropdown dismiss", category: "layout" },
  { name: "Enter", token: "--motion-enter", duration: "--duration-medium-2", easing: "--ease-emphasized-decelerate", description: "Expressive entrance: modal appear, panel slide-in", category: "visibility" },
  { name: "Exit", token: "--motion-exit", duration: "--duration-medium-1", easing: "--ease-emphasized-accelerate", description: "Expressive exit: modal dismiss, panel slide-out", category: "visibility" },
  { name: "Fade In", token: "--motion-fade-in", duration: "--duration-short-4", easing: "--ease-standard-decelerate", description: "Productive entrance: tooltip show, overlay appear", category: "visibility" },
  { name: "Fade Out", token: "--motion-fade-out", duration: "--duration-short-3", easing: "--ease-standard-accelerate", description: "Productive exit: tooltip hide, overlay dismiss", category: "visibility" },
  { name: "Slide In", token: "--motion-slide-in", duration: "--duration-medium-4", easing: "--ease-emphasized-decelerate", description: "Expressive entrance: side panel enter, drawer reveal", category: "layout" },
  { name: "Slide Out", token: "--motion-slide-out", duration: "--duration-medium-2", easing: "--ease-emphasized-accelerate", description: "Expressive exit: side panel exit, drawer dismiss", category: "layout" },
  { name: "Focus Line", token: "--motion-focus-line", duration: "--duration-medium-2", easing: "--ease-emphasized-decelerate", description: "Expressive: input focus underline sweep animation", category: "interaction" },
];

const PRINCIPLES = [
  {
    title: "Productive",
    description: "The majority of HollaEx animations are productive — quick, efficient, and non-distracting. They keep the user in flow by providing instant feedback without demanding attention. Think hover states, panel reveals, and status updates.",
    icon: Activity,
    color: "var(--chart-1)",
  },
  {
    title: "Expressive",
    description: "Reserved for moments that matter: onboarding, empty states, first-use experiences, and celebratory feedback. Expressive motion uses longer durations and more dramatic easing to create delight and communicate brand personality.",
    icon: Zap,
    color: "var(--chart-5)",
  },
  {
    title: "Continuity",
    description: "Motion should guide the eye and create spatial coherence. Related elements move together or in choreographed sequences, so the user always understands where things came from and where they went.",
    icon: Eye,
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
  return (
    <Button
      variant="ghost-secondary"
      size="xs"
      iconOnly
      copyText={text}
      title="Copy token"
      style={{ borderRadius: "var(--radius-circle)", width: 28, height: 28 }}
    />
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

/** Section wrapper for demos */
function DemoCard({ title, children, noPad }: { title?: string; children: React.ReactNode; noPad?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)" }}>
      {title && (
        <div className="flex items-center border-b" style={{ padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--preview-header-bg)", borderColor: "var(--border-subtle)" }}>
          <span style={{ fontSize: "var(--text-overline)", fontWeight: "var(--font-weight-bold)", letterSpacing: "var(--ls-overline)", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            {title}
          </span>
        </div>
      )}
      <div style={noPad ? {} : { padding: "var(--space-7)" }}>{children}</div>
    </div>
  );
}

/** Collapsible callout block for theory / rationale */
function TheoryBlock({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) setContentHeight(contentRef.current.scrollHeight);
  }, [children]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { if (isOpen) setContentHeight(el.scrollHeight); });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  return (
    <div className="rounded-xl" style={{
      backgroundColor: "var(--brand-subtle)",
      border: "1px solid var(--brand-subtle-hover)",
      overflow: "hidden",
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center w-full"
        style={{
          padding: "var(--space-6) var(--space-7)",
          paddingBottom: isOpen ? "0" : "var(--space-6)",
          border: "none",
          backgroundColor: "transparent",
          transition: "padding-bottom var(--duration-medium-2) var(--ease-emphasized)",
        }}
      >
        <p style={{
          fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)",
          color: "var(--brand-default)", fontFamily: "var(--font-family-supreme)",
          textTransform: "uppercase", letterSpacing: "var(--ls-overline)",
          margin: 0,
        }}>
          {title}
        </p>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{
            marginLeft: "auto",
            color: "var(--brand-default)",
            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform var(--duration-medium-2) var(--ease-emphasized)",
          }}
        >
          <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? (contentHeight ?? 1000) : 0,
          opacity: isOpen ? 1 : 0,
          transition: `max-height var(--duration-medium-4) ${isOpen ? "var(--ease-emphasized-decelerate)" : "var(--ease-emphasized-accelerate)"}, opacity var(--duration-short-4) ${isOpen ? "var(--ease-standard-decelerate)" : "var(--ease-standard-accelerate)"}`,
        }}
      >
        <div style={{ padding: "var(--space-3) var(--space-7) var(--space-6)", fontSize: "var(--text-body)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6 }}>
          {children}
        </div>
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
    ctx.beginPath(); ctx.moveTo(pad, pad + h); ctx.lineTo(pad + w, pad); ctx.stroke();

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

/* Hover-driven ball demo for easing — loops only while the track is hovered */
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

/* Hover-driven ball for duration cards — loops only while `hovering` prop is true */
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

/* ── Speed comparison demo ── */
function SpeedComparisonDemo({ speeds, label }: { speeds: { name: string; ms: number; easing: string }[]; label?: string }) {
  const [playing, setPlaying] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const timerRef = useRef<number | null>(null);
  const maxMs = Math.max(...speeds.map(s => s.ms));

  const play = useCallback(() => {
    setPlaying(true);
    setAtEnd(true);
    timerRef.current = window.setTimeout(() => { setPlaying(false); }, maxMs + 200);
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
              <div style={{
                position: "absolute", top: 4, bottom: 4, left: 4, borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--brand-default)", opacity: 0.15,
                width: atEnd ? "calc(100% - 8px)" : 40,
                transition: atEnd ? `width ${s.ms}ms ${s.easing}` : "width 200ms var(--ease-standard)",
              }} />
              <div style={{
                position: "absolute", top: 4, bottom: 4, width: 3, borderRadius: 2,
                backgroundColor: "var(--brand-default)",
                left: atEnd ? "calc(100% - 7px)" : 40,
                transition: atEnd ? `left ${s.ms}ms ${s.easing}` : "left 200ms var(--ease-standard)",
              }} />
              {[0.85, 0.7, 0.55, 0.4].map((opacity, i) => (
                <div key={i} style={{
                  position: "absolute", top: 6, bottom: 6, width: 1.5, borderRadius: 1,
                  backgroundColor: "var(--brand-default)",
                  opacity: atEnd ? opacity * 0.6 : 0,
                  left: atEnd ? "calc(100% - 7px)" : 40,
                  transition: atEnd
                    ? `left ${s.ms}ms ${s.easing} ${(i + 1) * 20}ms, opacity ${s.ms * 0.3}ms var(--ease-standard) ${(i + 1) * 15}ms`
                    : "left 200ms var(--ease-standard), opacity 100ms var(--ease-standard)",
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

/* ── Animated component mini-demos ── */

function ToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)} className="cursor-pointer relative" style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: on ? "var(--brand-default)" : "var(--border)", border: "none", transition: "background-color var(--duration-short-3) var(--ease-standard)" }}>
      <div style={{
        position: "absolute", top: 2, left: on ? 22 : 2,
        width: 20, height: 20, borderRadius: "var(--radius-circle)",
        backgroundColor: "var(--background)", boxShadow: "var(--elevation-sm)",
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

function InlineNotificationDemo() {
  const [visible, setVisible] = useState(true);
  const toggle = () => {
    setVisible(v => !v);
    if (visible) setTimeout(() => setVisible(true), 1200);
  };
  return (
    <div className="flex flex-col items-center" style={{ gap: "var(--space-3)", width: 180 }}>
      <div style={{
        width: "100%", overflow: "hidden",
        maxHeight: visible ? 60 : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: visible
          ? "max-height var(--duration-medium-2) var(--ease-standard-decelerate), opacity var(--duration-short-4) var(--ease-standard-decelerate), transform var(--duration-medium-2) var(--ease-standard-decelerate)"
          : "max-height var(--duration-medium-1) var(--ease-standard-accelerate), opacity var(--duration-short-3) var(--ease-standard-accelerate), transform var(--duration-medium-1) var(--ease-standard-accelerate)",
      }}>
        <div className="flex items-start rounded" style={{
          padding: "var(--space-3)", gap: "var(--space-2)",
          backgroundColor: "var(--brand-subtle)", border: "1px solid var(--brand-default)",
          fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-brand)",
        }}>
          <Bell size={14} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Action completed</span>
          <button onClick={toggle} className="cursor-pointer" style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--color-text-brand)", padding: 0, lineHeight: 1 }}>
            <X size={14} />
          </button>
        </div>
      </div>
      {!visible && (
        <button onClick={toggle} className="cursor-pointer" style={{
          padding: "var(--space-1) var(--space-3)", border: "none", backgroundColor: "transparent", color: "var(--brand-default)",
          fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
        }}>Show notification</button>
      )}
    </div>
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
        style={{ width: 36, height: 36, backgroundColor: "var(--secondary)", border: "1px solid var(--border-subtle)", color: "var(--color-text-primary)", transition: "background-color var(--duration-short-2) var(--ease-standard)" }}
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
    if (visible) { timerRef.current = window.setTimeout(() => setVisible(true), 600); }
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
        padding: "var(--space-1) var(--space-3)", border: "none", backgroundColor: "transparent", color: "var(--brand-default)",
        fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
      }}>
        {visible ? "Exit" : "Enter"}
      </button>
    </div>
  );
}

function StaggeredListDemo() {
  const [visible, setVisible] = useState(true);
  const items = ["Inbox", "Archive", "Sent", "Drafts"];
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
      <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-subtle)", minHeight: 164 }}>
        {items.map((item, i) => (
          <div key={item} className="flex items-center border-b" style={{
            padding: "var(--space-3) var(--space-4)", borderColor: "var(--border-subtle)",
            opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-16px)",
            transition: visible
              ? `opacity var(--duration-short-4) var(--ease-standard-decelerate) ${i * 60}ms, transform var(--duration-medium-2) var(--ease-emphasized-decelerate) ${i * 60}ms`
              : `opacity var(--duration-short-3) var(--ease-standard-accelerate) ${(items.length - 1 - i) * 40}ms, transform var(--duration-medium-1) var(--ease-emphasized-accelerate) ${(items.length - 1 - i) * 40}ms`,
          }}>
            <ChevronRight size={14} style={{ color: "var(--color-text-tertiary)", marginRight: "var(--space-3)" }} />
            <span style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)" }}>{item}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setVisible(v => !v)} className="cursor-pointer self-start" style={{
        padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)",
        fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)",
        transition: "background-color var(--duration-short-2) var(--ease-standard), border-color var(--duration-short-2) var(--ease-standard)",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--background)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
      >
        {visible ? "Collapse" : "Show"}
      </button>
    </div>
  );
}

function MorphingShapeDemo() {
  const [shape, setShape] = useState(0);
  const shapes = [
    { borderRadius: "var(--radius-circle)", width: 64, height: 64, bg: "var(--brand-default)" },
    { borderRadius: "var(--radius-sm2)", width: 96, height: 56, bg: "var(--chart-5)" },
    { borderRadius: "var(--radius-xs)", width: 56, height: 80, bg: "var(--chart-2)" },
    { borderRadius: "50% 0 50% 0", width: 72, height: 72, bg: "var(--chart-3)" },
  ];
  useEffect(() => { const t = setInterval(() => setShape(s => (s + 1) % shapes.length), 1800); return () => clearInterval(t); }, []);
  const s = shapes[shape];
  return (
    <div className="flex items-center justify-center" style={{ height: 100, width: 120 }}>
      <div style={{ width: s.width, height: s.height, borderRadius: s.borderRadius, backgroundColor: s.bg, opacity: 0.8, transition: "all var(--duration-long-2) var(--ease-emphasized)" }} />
    </div>
  );
}

function PressButtonDemo() {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      className="cursor-pointer rounded"
      style={{
        padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--brand-default)", color: "var(--brand-fg)",
        border: "none", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
        transform: pressed ? "scale(0.96)" : "scale(1)",
        opacity: pressed ? 0.88 : 1,
        transition: pressed
          ? "transform var(--duration-short-1) var(--ease-standard-accelerate), opacity var(--duration-short-1) var(--ease-standard-accelerate)"
          : "transform var(--duration-short-3) var(--ease-standard-decelerate), opacity var(--duration-short-3) var(--ease-standard-decelerate)",
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      Press me
    </button>
  );
}

function BadgePulseDemo() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
      <div className="relative">
        <div className="flex items-center justify-center rounded" style={{ width: 40, height: 40, backgroundColor: "var(--secondary)", border: "1px solid var(--border-subtle)" }}>
          <Bell size={18} style={{ color: "var(--color-text-primary)" }} />
        </div>
        <span key={count} style={{
          position: "absolute", top: -6, right: -6, minWidth: 18, height: 18, borderRadius: 9,
          backgroundColor: "var(--danger-default)", color: "var(--danger-fg)",
          fontSize: "var(--text-indicator)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
          animation: "badge-pop 300ms var(--ease-emphasized-decelerate)",
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

function MiniDialog({ onClose }: { onClose: () => void }) {
  const [exiting, setExiting] = useState(false);
  const handleClose = () => { setExiting(true); setTimeout(onClose, 250); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{
      backgroundColor: "var(--modal-overlay-bg)", opacity: exiting ? 0 : 1,
      transition: `opacity var(--duration-short-3) ${exiting ? "var(--ease-standard-accelerate)" : "var(--ease-standard-decelerate)"}`,
    }} onClick={handleClose}>
      <div className="rounded-xl" style={{
        width: 320, padding: "var(--space-7)", backgroundColor: "var(--background)",
        border: "1px solid var(--border-subtle)", boxShadow: "var(--modal-shadow)",
        transform: exiting ? "scale(0.95) translateY(8px)" : "scale(1) translateY(0)", opacity: exiting ? 0 : 1,
        transition: `transform var(--duration-medium-1) ${exiting ? "var(--ease-emphasized-accelerate)" : "var(--ease-emphasized-decelerate)"}, opacity var(--duration-short-3) ${exiting ? "var(--ease-standard-accelerate)" : "var(--ease-standard-decelerate)"}`,
      }} onClick={(e) => e.stopPropagation()}>
        <p style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)" }}>Dialog</p>
        <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-6)", lineHeight: 1.5 }}>
          Enters with <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>--motion-enter</code> and exits with <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>--motion-exit</code>.
        </p>
        <button onClick={handleClose} className="cursor-pointer rounded" style={{
          padding: "var(--space-3) var(--space-5)", backgroundColor: "var(--brand-default)", color: "var(--brand-fg)",
          border: "none", fontSize: "var(--text-body)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
          transition: "background-color var(--duration-short-2) var(--ease-standard)",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-default)"; }}
        >Close</button>
      </div>
    </div>
  );
}

/* Duration card — hierarchy mirrors color swatch cards */
function DurationCard({ token, isSelected, onSelect }: { token: DurationToken; isSelected: boolean; onSelect: (rect: DOMRect) => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  return (
    <button
      ref={cardRef}
      onClick={() => { if (cardRef.current) onSelect(cardRef.current.getBoundingClientRect()); }}
      className="cursor-pointer flex flex-col text-left"
      style={{
        padding: 0, backgroundColor: "var(--background)",
        borderRadius: "var(--radius-card)",
        border: isSelected ? "2px solid var(--brand-default)" : "1px solid var(--border-subtle)",
        transition: "border-color var(--duration-short-3) var(--ease-standard), box-shadow var(--duration-short-3) var(--ease-standard)",
        overflow: "hidden", outline: "none", fontFamily: "var(--font-family-supreme)",
        boxShadow: isSelected ? "0 0 0 3px color-mix(in srgb, var(--brand-default) 15%, transparent)" : "none",
        minHeight: 152,
      }}
      onMouseEnter={(e) => { setHovered(true); if (!isSelected) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--elevation-sm)"; } }}
      onMouseLeave={(e) => { setHovered(false); if (!isSelected) { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; } }}
    >
      {/* Top area: large ms value + name */}
      <div className="flex-1 flex flex-col" style={{ padding: "var(--space-4) var(--space-4) var(--space-3) var(--space-5)" }}>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span style={{
              fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--text-h4)", color: "var(--color-text-primary)",
              lineHeight: "var(--lh-h4)", letterSpacing: "var(--ls-h4)",
              fontVariantNumeric: "tabular-nums",
            }}>
              {token.ms}ms
            </span>
            <span style={{
              fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-regular)",
              fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)",
              marginTop: "var(--space-1)", letterSpacing: "var(--ls-caption)",
            }}>
              {token.name}
            </span>
          </div>
        </div>
        {/* Ball animation fills remaining space */}
        <div style={{ marginTop: "auto", paddingTop: "var(--space-3)" }}>
          <HoverBall ms={token.ms} size={18} trackHeight={36} hovering={hovered || isSelected} />
        </div>
      </div>
      {/* Footer strip: token variable name */}
      <div
        className="flex items-center"
        style={{
          backgroundColor: "var(--secondary-subtle)",
          padding: "var(--space-3) var(--space-4)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <code style={{
          fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)",
          fontSize: "var(--text-indicator)", color: "var(--color-text-tertiary)",
          letterSpacing: "var(--ls-indicator)",
        }}>
          {token.token}
        </code>
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
      border: "1px solid var(--border-subtle)", boxShadow: "var(--modal-shadow, 0 8px 30px rgba(0,0,0,0.12))",
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
      <div style={{ padding: "0 var(--space-5) var(--space-5)" }}>
        <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5 }}>{token.useCase}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/* ── Do / Don't frame ── */
function DoOrDontFrame({
  type,
  title,
  description,
  children,
}: {
  type: "do" | "dont";
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const isDo = type === "do";
  return (
    <div className="flex flex-col" style={{ flex: 1, minWidth: 0 }}>
      {/* Colored top bar */}
      <div style={{
        height: 4,
        borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
        backgroundColor: isDo ? "var(--alert-success-icon)" : "var(--danger-default)",
      }} />
      {/* Badge */}
      <div className="flex items-center" style={{ gap: "var(--space-2)", padding: "var(--space-4) var(--space-5) var(--space-2)", backgroundColor: "var(--secondary-subtle-hover)", borderWidth: "1px 1px 0 1px", borderStyle: "solid", borderColor: "var(--border-subtle)" }}>
        {isDo ? (
          <CheckCircle size={20} style={{ color: "var(--alert-success-icon)" }} />
        ) : (
          <XCircle size={20} style={{ color: "var(--danger-default)" }} />
        )}
        <span style={{
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-bold)",
          fontFamily: "var(--font-family-supreme)",
          color: isDo ? "var(--alert-success-icon)" : "var(--danger-default)",
        }}>
          {isDo ? "Do" : "Don't"}
        </span>
      </div>
      {/* Animation area */}
      <div
        className="flex items-center justify-center rounded-lg"
        style={{
          minHeight: 200,
          padding: "var(--space-5)",
          backgroundColor: "var(--secondary-subtle-hover)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {children}
      </div>
      {/* Caption */}
      <div style={{
        padding: "var(--space-4) var(--space-5)",
        borderStyle: "solid",
        borderWidth: "0 1px 1px 1px",
        borderColor: "var(--border-subtle)",
        borderRadius: "0 0 var(--radius-card) var(--radius-card)",
        backgroundColor: "var(--background)",
      }}>
        <p style={{
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-medium)",
          fontFamily: "var(--font-family-supreme)",
          color: "var(--color-text-primary)",
          marginBottom: "var(--space-1)",
        }}>
          {title}
        </p>
        <p style={{
          fontSize: "var(--text-body-sm)",
          fontFamily: "var(--font-family-supreme)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── Choreography demos ── */
function ChoreographyDoDemo() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);
  const items = Array.from({ length: 6 });

  useEffect(() => {
    const loop = () => {
      setVisible(false);
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
        timerRef.current = window.setTimeout(loop, 2400);
      }, 800);
    };
    timerRef.current = window.setTimeout(loop, 2400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="grid grid-cols-3" style={{ gap: "var(--space-3)", width: "100%", maxWidth: 200 }}>
      {items.map((_, i) => (
        <div key={i} className="rounded" style={{
          aspectRatio: "1",
          backgroundColor: "var(--border)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(8px)",
          transition: visible
            ? `opacity var(--duration-short-4) var(--ease-standard-decelerate) ${i * 60}ms, transform var(--duration-medium-2) var(--ease-emphasized-decelerate) ${i * 60}ms`
            : `opacity var(--duration-short-3) var(--ease-standard-accelerate) ${(5 - i) * 40}ms, transform var(--duration-medium-1) var(--ease-emphasized-accelerate) ${(5 - i) * 40}ms`,
        }} />
      ))}
    </div>
  );
}

function ChoreographyDontDemo() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);
  const items = Array.from({ length: 6 });

  useEffect(() => {
    const loop = () => {
      setVisible(false);
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
        timerRef.current = window.setTimeout(loop, 2400);
      }, 800);
    };
    timerRef.current = window.setTimeout(loop, 2400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="grid grid-cols-3" style={{ gap: "var(--space-3)", width: "100%", maxWidth: 200 }}>
      {items.map((_, i) => (
        <div key={i} className="rounded" style={{
          aspectRatio: "1",
          backgroundColor: "var(--border)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.85)",
          transition: `opacity 100ms linear, transform 100ms linear`,
        }} />
      ))}
    </div>
  );
}

/* ── Duration proportionality demos ── */
function DurationDoDemo() {
  const [atEnd, setAtEnd] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      setAtEnd(v => !v);
      timerRef.current = window.setTimeout(loop, 1800);
    };
    timerRef.current = window.setTimeout(loop, 1200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="flex flex-col w-full" style={{ gap: "var(--space-4)", maxWidth: 220 }}>
      {/* Short move, short duration */}
      <div>
        <p style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-2)" }}>Small shift — <span style={{ fontFamily: "var(--font-family-mono)" }}>150</span>ms</p>
        <div className="relative rounded" style={{ height: 32, backgroundColor: "var(--border-subtle)" }}>
          <div className="absolute top-1 rounded" style={{
            width: 28, height: 24,
            backgroundColor: "var(--brand-default)",
            opacity: 0.8,
            left: atEnd ? "calc(100% - 32px)" : "4px",
            transition: "left 150ms var(--ease-standard)",
          }} />
        </div>
      </div>
      {/* Long move, long duration */}
      <div>
        <p style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-2)" }}>Full slide — <span style={{ fontFamily: "var(--font-family-mono)" }}>400</span>ms</p>
        <div className="relative rounded" style={{ height: 32, backgroundColor: "var(--border-subtle)" }}>
          <div className="absolute top-0 rounded" style={{
            width: "100%", height: "100%",
            backgroundColor: "var(--brand-default)",
            opacity: 0.15,
            transformOrigin: "left",
            transform: atEnd ? "scaleX(1)" : "scaleX(0.15)",
            transition: "transform 400ms var(--ease-emphasized)",
          }} />
        </div>
      </div>
    </div>
  );
}

function DurationDontDemo() {
  const [atEnd, setAtEnd] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      setAtEnd(v => !v);
      timerRef.current = window.setTimeout(loop, 1800);
    };
    timerRef.current = window.setTimeout(loop, 1200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="flex flex-col w-full" style={{ gap: "var(--space-4)", maxWidth: 220 }}>
      {/* Short move but long duration — feels sluggish */}
      <div>
        <p style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-2)" }}>Small shift — <span style={{ fontFamily: "var(--font-family-mono)" }}>800</span>ms</p>
        <div className="relative rounded" style={{ height: 32, backgroundColor: "var(--border-subtle)" }}>
          <div className="absolute top-1 rounded" style={{
            width: 28, height: 24,
            backgroundColor: "var(--danger-default)",
            opacity: 0.6,
            left: atEnd ? "calc(100% - 32px)" : "4px",
            transition: "left 800ms linear",
          }} />
        </div>
      </div>
      {/* Long move but short duration — feels jarring */}
      <div>
        <p style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)", marginBottom: "var(--space-2)" }}>Full slide — <span style={{ fontFamily: "var(--font-family-mono)" }}>50</span>ms</p>
        <div className="relative rounded" style={{ height: 32, backgroundColor: "var(--border-subtle)" }}>
          <div className="absolute top-0 rounded" style={{
            width: "100%", height: "100%",
            backgroundColor: "var(--danger-default)",
            opacity: 0.15,
            transformOrigin: "left",
            transform: atEnd ? "scaleX(1)" : "scaleX(0.15)",
            transition: "transform 50ms linear",
          }} />
        </div>
      </div>
    </div>
  );
}

/* ── Easing choice demos ── */
function EasingDoDemo() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      setOpen(v => !v);
      timerRef.current = window.setTimeout(loop, 2000);
    };
    timerRef.current = window.setTimeout(loop, 1200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="flex flex-col items-center w-full" style={{ gap: "var(--space-3)" }}>
      <div className="rounded-lg overflow-hidden" style={{ width: "100%", maxWidth: 200, border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)" }}>
        <div style={{ padding: "var(--space-3) var(--space-4)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="rounded" style={{ width: "60%", height: 8, backgroundColor: "var(--border)" }} />
        </div>
        <div style={{
          overflow: "hidden",
          maxHeight: open ? 80 : 0,
          opacity: open ? 1 : 0,
          transition: open
            ? "max-height var(--duration-medium-4) var(--ease-emphasized-decelerate), opacity var(--duration-short-4) var(--ease-standard-decelerate)"
            : "max-height var(--duration-medium-2) var(--ease-emphasized-accelerate), opacity var(--duration-short-3) var(--ease-standard-accelerate)",
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ padding: "var(--space-2) var(--space-4)", borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="rounded" style={{ width: `${70 - i * 10}%`, height: 6, backgroundColor: "var(--border)" }} />
            </div>
          ))}
        </div>
      </div>
      <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>
        ease-emphasized
      </span>
    </div>
  );
}

function EasingDontDemo() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      setOpen(v => !v);
      timerRef.current = window.setTimeout(loop, 2000);
    };
    timerRef.current = window.setTimeout(loop, 1200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="flex flex-col items-center w-full" style={{ gap: "var(--space-3)" }}>
      <div className="rounded-lg overflow-hidden" style={{ width: "100%", maxWidth: 200, border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)" }}>
        <div style={{ padding: "var(--space-3) var(--space-4)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="rounded" style={{ width: "60%", height: 8, backgroundColor: "var(--border)" }} />
        </div>
        <div style={{
          overflow: "hidden",
          maxHeight: open ? 80 : 0,
          opacity: open ? 1 : 0,
          transition: "max-height 400ms linear, opacity 400ms linear",
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ padding: "var(--space-2) var(--space-4)", borderBottom: "1px solid var(--border-subtle)" }}>
              <div className="rounded" style={{ width: `${70 - i * 10}%`, height: 6, backgroundColor: "var(--border)" }} />
            </div>
          ))}
        </div>
      </div>
      <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>
        <span style={{ fontFamily: "var(--font-family-mono)" }}>linear</span> (mechanical)
      </span>
    </div>
  );
}

/* ── Reduced motion demos ── */
function ReducedMotionDoDemo() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      setVisible(false);
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
        timerRef.current = window.setTimeout(loop, 2400);
      }, 600);
    };
    timerRef.current = window.setTimeout(loop, 2400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
      <div className="rounded-lg" style={{
        width: 160, height: 80, backgroundColor: "var(--background)",
        border: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 100ms var(--ease-standard)",
      }}>
        <div className="flex flex-col" style={{ gap: "var(--space-2)", padding: "var(--space-3)" }}>
          <div className="rounded" style={{ width: 80, height: 8, backgroundColor: "var(--border)" }} />
          <div className="rounded" style={{ width: 60, height: 6, backgroundColor: "var(--border-subtle)" }} />
        </div>
      </div>
      <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>
        Simple opacity fade
      </span>
    </div>
  );
}

function ReducedMotionDontDemo() {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = () => {
      setVisible(false);
      timerRef.current = window.setTimeout(() => {
        setVisible(true);
        timerRef.current = window.setTimeout(loop, 2400);
      }, 600);
    };
    timerRef.current = window.setTimeout(loop, 2400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
      <div className="rounded-lg" style={{
        width: 160, height: 80, backgroundColor: "var(--background)",
        border: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0) rotate(0deg)" : "scale(0.7) translateY(24px) rotate(-5deg)",
        transition: visible
          ? "opacity 500ms var(--ease-emphasized-decelerate), transform 500ms var(--ease-emphasized-decelerate)"
          : "opacity 400ms var(--ease-emphasized-accelerate), transform 400ms var(--ease-emphasized-accelerate)",
      }}>
        <div className="flex flex-col" style={{ gap: "var(--space-2)", padding: "var(--space-3)" }}>
          <div className="rounded" style={{ width: 80, height: 8, backgroundColor: "var(--border)" }} />
          <div className="rounded" style={{ width: 60, height: 6, backgroundColor: "var(--border-subtle)" }} />
        </div>
      </div>
      <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>
        Scale + rotate + slide
      </span>
    </div>
  );
}

/** Reusable do/don't pair block */
function DosDontsPair({ topic, doTitle, doDesc, doDemo, dontTitle, dontDesc, dontDemo }: {
  topic: string;
  doTitle: string; doDesc: string; doDemo: React.ReactNode;
  dontTitle: string; dontDesc: string; dontDemo: React.ReactNode;
}) {
  return (
    <div>
      <p style={{
        fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-bold)",
        fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)",
        textTransform: "uppercase", letterSpacing: "var(--ls-overline)", marginBottom: "var(--space-4)",
      }}>
        {topic}
      </p>
      <div className="grid grid-cols-2" style={{ gap: "var(--space-5)" }}>
        <DoOrDontFrame type="do" title={doTitle} description={doDesc}>{doDemo}</DoOrDontFrame>
        <DoOrDontFrame type="dont" title={dontTitle} description={dontDesc}>{dontDemo}</DoOrDontFrame>
      </div>
    </div>
  );
}

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
          Motion in HollaEx is purposeful and restrained. Guided by IBM's Design Language motion principles, our system classifies every animation as either <strong>productive</strong> (efficient, task-focused) or <strong>expressive</strong> (dramatic, brand-forward), ensuring the right level of energy for every interaction.
        </p>
      </div>

      {/* IBM philosophy */}
      <TheoryBlock title="Why IBM's Design Language?">
        <p style={{ marginBottom: "var(--space-4)" }}>
          IBM's motion framework is built on a simple but powerful insight: not all motion serves the same purpose. <strong>Productive motion</strong> keeps users in flow — it's the quick, functional animation that acknowledges an action without stealing focus. <strong>Expressive motion</strong> is reserved for moments that deserve attention — onboarding, celebrations, hero transitions.
        </p>
        <p style={{ marginBottom: "var(--space-4)" }}>
          This productive/expressive split maps perfectly to a trading platform: the vast majority of interactions (placing orders, navigating charts, toggling panels) need to feel instant and invisible. But key moments (first deposit, trade confirmation, portfolio milestones) can afford to breathe and express the brand.
        </p>
        <p>
          IBM's approach also emphasizes <strong>choreography</strong> — the idea that elements entering and leaving the screen should do so in a coordinated sequence, creating a sense of continuity and spatial logic rather than isolated pops and fades.
        </p>
      </TheoryBlock>

      {/* Animated hero showcase */}
      <DemoCard title="Live showcase — hover and click to interact">
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
            <div className="flex items-center justify-center" style={{ height: 100 }}><InlineNotificationDemo /></div>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>Inline notification</span>
          </div>
          <div className="flex flex-col items-center" style={{ gap: "var(--space-4)" }}>
            <div className="flex items-center justify-center" style={{ height: 100 }}><TooltipDemo /></div>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>Tooltip</span>
          </div>
        </div>
      </DemoCard>

      {/* Principle cards */}
      <div className="grid grid-cols-3" style={{ gap: "var(--space-5)" }}>
        {PRINCIPLES.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="rounded-xl" style={{
              padding: "var(--space-7)", backgroundColor: "var(--background)", border: "1px solid var(--border-subtle)",
              transition: "border-color var(--duration-short-2) var(--ease-standard), box-shadow var(--duration-short-2) var(--ease-standard)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--elevation-sm)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="flex items-center justify-center rounded-lg" style={{ width: 44, height: 44, marginBottom: "var(--space-5)", backgroundColor: p.color, opacity: 0.12 }}>
                <Icon size={22} style={{ color: p.color, opacity: 1 }} />
              </div>
              <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)" }}>{p.title}</h3>
              <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.55 }}>{p.description}</p>
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
            { title: "Productive by default", desc: "Start with productive motion for every interaction. Only escalate to expressive when the moment genuinely warrants it — onboarding, empty states, celebrations, or first-use experiences. The vast majority of your UI should feel fast and invisible." },
            { title: "Match duration to travel", desc: "Duration is proportional to the distance an element covers on screen. Small movements (checkboxes, color shifts) use the short tier. Larger ones (panel slides, page transitions) use long. This is IBM's 'distance = duration' principle." },
            { title: "Choreograph, don't scatter", desc: "When multiple elements animate simultaneously, they should move in sequence with staggered delays, not all at once. IBM calls this 'choreography' — it creates narrative flow and helps the eye track what's happening." },
            { title: "Respect prefers-reduced-motion", desc: "When the OS requests reduced motion, collapse durations to near-instant and replace transforms with simple opacity fades. Our tokens make this trivial: override the CSS variables in a single media query." },
          ].map((rule) => (
            <div key={rule.title} className="flex" style={{ gap: "var(--space-4)" }}>
              <div className="shrink-0 rounded-full" style={{ width: 6, height: 6, backgroundColor: "var(--brand-default)", marginTop: 8 }} />
              <div>
                <p style={{ fontSize: "var(--text-body)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-1)" }}>{rule.title}</p>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5 }}>{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts — principles-specific */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Do's and don'ts
        </h3>
        <div className="flex flex-col" style={{ gap: "var(--space-8)" }}>
          <DosDontsPair
            topic="Choreography"
            doTitle="Stagger entrances sequentially"
            doDesc="When multiple elements enter, offset each by 40–60ms so the eye can track the sequence — items flow in like a coordinated cascade."
            doDemo={<ChoreographyDoDemo />}
            dontTitle="Pop everything in at once"
            dontDesc="Without staggering, all items appear simultaneously which looks jumpy and breaks spatial continuity."
            dontDemo={<ChoreographyDontDemo />}
          />
          <DosDontsPair
            topic="Reduced motion"
            doTitle="Collapse to simple opacity fades"
            doDesc="When prefers-reduced-motion is active, replace all transforms with instant opacity changes. The UI still feels responsive without triggering vestibular discomfort."
            doDemo={<ReducedMotionDoDemo />}
            dontTitle="Keep full motion regardless"
            dontDesc="Dramatic scaling, rotation, and sliding can cause nausea or disorientation for users with vestibular disorders. Always respect the OS preference."
            dontDemo={<ReducedMotionDontDemo />}
          />
        </div>
      </div>

      {/* Interactive playground */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Interactive playground
        </h3>
        <DemoCard title="Live demo">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>Hover &amp; Press</p>
              <div className="flex flex-wrap items-center" style={{ gap: "var(--space-4)" }}>
                <PressButtonDemo />
                <button className="cursor-pointer rounded" style={{
                  padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--secondary)", color: "var(--color-text-primary)",
                  border: "1px solid var(--border-subtle)", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
                  transition: "background-color var(--duration-short-2) var(--ease-standard), border-color var(--duration-short-2) var(--ease-standard), transform var(--duration-short-1) var(--ease-standard-accelerate)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-subtle-hover)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "scale(1)"; }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >Hover &amp; press</button>
                <BadgePulseDemo />
              </div>
            </div>
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>Expand &amp; Collapse</p>
              <div className="rounded overflow-hidden" style={{ border: "1px solid var(--border-subtle)" }}>
                <button onClick={() => setExpanded(!expanded)} className="cursor-pointer w-full flex items-center justify-between" style={{
                  padding: "var(--space-4) var(--space-5)", backgroundColor: "var(--background)", border: "none",
                  fontSize: "var(--text-body)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)",
                  transition: "background-color var(--duration-short-2) var(--ease-standard)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--background)"; }}
                >
                  <span>Accordion item</span>
                  <span style={{ display: "inline-flex", transition: "transform var(--duration-medium-2) var(--ease-emphasized)", transform: expanded ? "rotate(45deg)" : "rotate(0deg)", fontSize: "var(--text-h5)", lineHeight: 1 }}>+</span>
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
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>Enter &amp; Exit</p>
              <div className="flex items-start" style={{ gap: "var(--space-6)" }}>
                <button onClick={() => setModalOpen(true)} className="cursor-pointer rounded" style={{
                  padding: "var(--space-3) var(--space-6)", backgroundColor: "var(--secondary-default)", color: "var(--secondary-fg)", border: "none",
                  fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)",
                  transition: "background-color var(--duration-short-2) var(--ease-standard)",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-default)"; }}
                >Open dialog</button>
                <CardEnterDemo />
              </div>
              {modalOpen && <MiniDialog onClose={() => setModalOpen(false)} />}
            </div>
            <div>
              <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)", textTransform: "uppercase", letterSpacing: "var(--ls-overline)", fontWeight: "var(--font-weight-medium)" }}>Focus Line</p>
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
    { key: "productive", label: "Productive", theory: "Productive curves are the workhorse of the motion system. They're designed to be quick and unobtrusive — suited for the countless small transitions that happen during everyday use. IBM's productive family uses a moderate ease-out profile that settles quickly, keeping users in flow without demanding conscious attention." },
    { key: "expressive", label: "Expressive", theory: "Expressive curves are reserved for moments that carry meaning — hero reveals, onboarding sequences, navigation landmarks, and celebratory feedback. They use a more dramatic ease profile: the element enters with noticeable energy and settles slowly, signaling 'pay attention, something important happened.'" },
    { key: "linear", label: "Linear", theory: "Linear easing (constant speed) should be used sparingly. It feels mechanical because nothing in the physical world moves at constant velocity. The main use cases are progress indicators, loading spinners, and continuous looping animations where uniform motion represents measurable progress." },
  ] as const;

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", letterSpacing: "var(--ls-h2)", marginBottom: "var(--space-4)" }}>
          Easing curves
        </h2>
        <p style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, maxWidth: 640 }}>
          Seven easing tokens split across two families — <strong>productive</strong> and <strong>expressive</strong> — control how elements accelerate and decelerate. Each family has a standard, entrance, and exit variant. Hover any track to preview the curve in action.
        </p>
      </div>

      {/* How to read the curve */}
      <TheoryBlock title="How to read an easing curve">
        <p style={{ marginBottom: "var(--space-3)" }}>
          Each curve chart plots <strong>progress</strong> (Y axis, 0→1) against <strong>time</strong> (X axis, 0→1). The dashed diagonal is linear — constant speed. A curve that sits above the diagonal at the start means the element moves quickly early on (deceleration / entrance profile). A curve below means slow start, fast finish (acceleration / exit profile).
        </p>
        <p style={{ marginBottom: "var(--space-3)" }}>
          IBM's productive curves are tighter and more restrained — they complete their easing quickly and settle. Expressive curves have a wider, more dramatic arc that takes longer to resolve, creating visual emphasis.
        </p>
        <p>
          The two blue dots are the cubic-bezier control handles. In HollaEx, these values are fixed as design tokens — you reference <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>var(--ease-standard)</code> and the CSS engine does the interpolation.
        </p>
      </TheoryBlock>

      {/* Side-by-side easing comparison */}
      <DemoCard title="Compare easings — press play to animate">
        <SpeedComparisonDemo
          label="Productive curves — efficient, task-focused"
          speeds={[
            { name: "Exit", ms: 500, easing: "cubic-bezier(0.2, 0, 1, 0.9)" },
            { name: "Standard", ms: 500, easing: "cubic-bezier(0.2, 0, 0.38, 0.9)" },
            { name: "Entrance", ms: 500, easing: "cubic-bezier(0, 0, 0.38, 0.9)" },
          ]}
        />
        <div style={{ marginTop: "var(--space-7)" }}>
          <SpeedComparisonDemo
            label="Expressive curves — dramatic, brand-forward"
            speeds={[
              { name: "Exit", ms: 500, easing: "cubic-bezier(0.4, 0.14, 1, 1)" },
              { name: "Standard", ms: 500, easing: "cubic-bezier(0.4, 0.14, 0.3, 1)" },
              { name: "Entrance", ms: 500, easing: "cubic-bezier(0, 0, 0.3, 1)" },
            ]}
          />
        </div>
      </DemoCard>

      {categories.map((cat) => {
        const tokens = EASING_TOKENS.filter((t) => t.category === cat.key);
        return (
          <div key={cat.key}>
            <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-3)" }}>
              {cat.label}
            </h3>
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5, marginBottom: "var(--space-5)", maxWidth: 640 }}>
              {cat.theory}
            </p>
            <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
              {tokens.map((token) => (
                <div key={token.token} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)", transition: "border-color var(--duration-short-2) var(--ease-standard)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                >
                  <div className="flex items-stretch">
                    <div className="shrink-0 flex items-center justify-center border-r" style={{ padding: "var(--space-5)", borderColor: "var(--border-subtle)", backgroundColor: "var(--secondary-subtle)" }}>
                      <EasingCurveCanvas value={token.value} />
                    </div>
                    <div className="flex-1 flex flex-col justify-center" style={{ padding: "var(--space-5) var(--space-6)" }}>
                      <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                        <span style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>{token.name}</span>
                        <CopyButton text={`var(${token.token})`} />
                      </div>
                      <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--brand-default)", marginBottom: "var(--space-3)", display: "block" }}>
                        {token.token}: {token.value}
                      </code>
                      <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.5, marginBottom: "var(--space-5)" }}>{token.description}</p>
                      <EasingBallLoop easingValue={token.value} durationMs={600} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Pairing guide */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          When to use which curve
        </h3>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)" }}>
          {[
            { scenario: "Button hover / press", curve: "--ease-standard", why: "Productive motion — quick, unobtrusive state change. The user should barely notice the transition." },
            { scenario: "Modal entering screen", curve: "--ease-emphasized-decelerate", why: "Expressive entrance — a key UI moment. The modal arrives with energy and settles, drawing the user's eye." },
            { scenario: "Modal dismissing", curve: "--ease-emphasized-accelerate", why: "Expressive exit — lingers briefly then accelerates away, giving a subtle sense of acknowledgment before clearing the view." },
            { scenario: "Dropdown opening", curve: "--ease-standard-decelerate", why: "Productive entrance — arrives efficiently without drama. Decelerates into position so it feels responsive." },
            { scenario: "Progress bar", curve: "--ease-linear", why: "Represents continuous, measurable progress. Any easing would misrepresent the actual completion rate." },
            { scenario: "Onboarding hero", curve: "--ease-emphasized", why: "Expressive standard — this is a brand moment. The dramatic curve signals 'welcome, pay attention' without being theatrical." },
          ].map((row, i) => (
            <div key={row.scenario} className="flex items-start" style={{
              padding: "var(--space-4) var(--space-6)",
              borderBottom: i < 5 ? "1px solid var(--border-subtle)" : "none",
            }}>
              <span className="shrink-0" style={{ width: 200, fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>{row.scenario}</span>
              <code className="shrink-0" style={{ width: 220, fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--brand-default)" }}>{row.curve}</code>
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.4 }}>{row.why}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Easing do's and don'ts */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Do's and don'ts
        </h3>
        <DosDontsPair
          topic="Easing"
          doTitle="Use the right easing family"
          doDesc="Expand/collapse and entrance motions use emphasized (expressive) curves that create natural deceleration into the final state."
          doDemo={<EasingDoDemo />}
          dontTitle="Use linear easing for UI transitions"
          dontDesc="Linear motion feels robotic and lifeless. Nothing in the physical world moves at constant velocity — it always looks wrong for UI elements."
          dontDemo={<EasingDontDemo />}
        />
      </div>
    </div>
  );
}

function DurationSection() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [popoverRect, setPopoverRect] = useState<DOMRect | null>(null);

  const tiers = [
    { key: "short", label: "Short", range: "50–200ms", desc: "Productive micro-interactions: hover states, press feedback, small color shifts. IBM's guidance is that these should feel 'instant' — the motion is subliminal, present only to avoid a jarring snap." },
    { key: "medium", label: "Medium", range: "250–400ms", desc: "The productive workhorse for most UI transitions: enter/exit animations, panel open/close, dropdown reveals. Elements travel a moderate distance. Long enough to be informative, short enough to never impede." },
    { key: "long", label: "Long", range: "450–600ms", desc: "For elements covering significant visual distance: page morphs, full-panel slides, card reorder. These need more time because the eye has to track further. Sits at the boundary between productive and expressive." },
    { key: "extra-long", label: "Extra Long", range: "700–1000ms", desc: "Expressive territory: hero reveals, onboarding sequences, celebration animations, skeleton shimmer. IBM reserves this tier for moments that genuinely deserve drama and brand expression." },
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
          Sixteen duration tokens organized into four perceptual tiers. Following IBM's approach, duration is determined by the distance an element travels and its visual importance — productive interactions are fast, expressive moments are allowed to breathe.
        </p>
      </div>

      {/* IBM duration theory */}
      <TheoryBlock title="IBM's duration model — distance equals duration">
        <p style={{ marginBottom: "var(--space-4)" }}>
          IBM's core rule is simple: <strong>the farther an element travels, the longer it should take</strong>. A checkbox tick covers a few pixels — it should be near-instant. A side panel sliding 400px across the screen needs more time to feel smooth. This "distance = duration" principle eliminates guesswork.
        </p>
        <p style={{ marginBottom: "var(--space-4)" }}>
          Our 50ms step size matches the minimum increment users can consciously perceive. Below 50ms, differences are subliminal. Above 1000ms, animations start to feel like loading screens. The four tiers (short, medium, long, extra-long) map roughly to IBM's guidelines for micro-interactions, standard UI, large surfaces, and expressive moments.
        </p>
        <p>
          In HollaEx, every animation references one of these tokens so durations are never hardcoded. Productive animations cluster in the short and medium tiers; expressive animations are allowed to reach into the long and extra-long tiers.
        </p>
      </TheoryBlock>

      {/* Speed comparison hero */}
      <DemoCard title="Speed comparison — same element, different durations">
        <div className="grid grid-cols-2" style={{ gap: "var(--space-8)" }}>
          <SpeedComparisonDemo
            label="Productive (small travel distance)"
            speeds={[
              { name: "Fast", ms: 100, easing: "cubic-bezier(0.2, 0, 0.38, 0.9)" },
              { name: "Default", ms: 200, easing: "cubic-bezier(0.2, 0, 0.38, 0.9)" },
              { name: "Slow", ms: 400, easing: "cubic-bezier(0.2, 0, 0.38, 0.9)" },
            ]}
          />
          <SpeedComparisonDemo
            label="Expressive (large travel distance)"
            speeds={[
              { name: "Fast", ms: 300, easing: "cubic-bezier(0, 0, 0.3, 1)" },
              { name: "Default", ms: 500, easing: "cubic-bezier(0, 0, 0.3, 1)" },
              { name: "Slow", ms: 800, easing: "cubic-bezier(0, 0, 0.3, 1)" },
            ]}
          />
        </div>
      </DemoCard>

      {/* Duration tier cards */}
      {tiers.map((tier) => {
        const tokens = DURATION_TOKENS.filter((t) => t.tier === tier.key);
        return (
          <div key={tier.key}>
            <div className="flex items-baseline" style={{ gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
              <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>{tier.label}</h3>
              <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-mono)" }}>{tier.range}</span>
            </div>
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-4)", lineHeight: 1.5, maxWidth: 640 }}>{tier.desc}</p>
            <div className="grid grid-cols-4" style={{ gap: "var(--space-4)" }}>
              {tokens.map((token) => (
                <DurationCard key={token.token} token={token} isSelected={selectedToken === token.token} onSelect={(rect) => handleSelect(token, rect)} />
              ))}
            </div>
          </div>
        );
      })}

      {activeToken && popoverRect && <DurationPopover token={activeToken} anchorRect={popoverRect} onClose={handleClose} />}

      {/* Enter vs Exit asymmetry */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Enter vs. exit asymmetry
        </h3>
        <div className="rounded-xl" style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)", padding: "var(--space-6) var(--space-7)" }}>
          <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, marginBottom: "var(--space-5)" }}>
            Following IBM's choreography guidelines: <strong>exits should be faster than entrances</strong>. When something appears, the user needs time to register what it is and where it came from. When something leaves, the user has already processed it — they just need confirmation it's gone. Our semantic tokens encode this asymmetry automatically:
          </p>
          <div className="grid grid-cols-2" style={{ gap: "var(--space-6)" }}>
            <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
              <ArrowDown size={16} style={{ color: "var(--chart-2)" }} />
              <div>
                <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--chart-2)" }}>--motion-enter: 300ms</code>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginTop: "var(--space-1)" }}>Expressive entrance — decelerates into position with confident energy</p>
              </div>
            </div>
            <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
              <ArrowRight size={16} style={{ color: "var(--chart-3)" }} />
              <div>
                <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--chart-3)" }}>--motion-exit: 250ms</code>
                <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)", marginTop: "var(--space-1)" }}>Expressive exit — lingers briefly, then accelerates away</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Duration do's and don'ts */}
      <div>
        <h3 style={{ fontSize: "var(--text-h4)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
          Do's and don'ts
        </h3>
        <DosDontsPair
          topic="Duration"
          doTitle="Scale duration to travel distance"
          doDesc="Small movements (checkbox, color shift) use short durations. Larger movements (panel slide, page transition) use proportionally longer ones."
          doDemo={<DurationDoDemo />}
          dontTitle="Use one duration for everything"
          dontDesc="Long durations on tiny elements feel sluggish, while short durations on big movements feel jarring and abrupt."
          dontDemo={<DurationDontDemo />}
        />
      </div>
    </div>
  );
}

function SemanticSection() {
  const categories = [
    { key: "interaction", label: "Interaction", desc: "Hover, press, and focus responses — always productive. These should feel like direct manipulation, with no perceptible lag between input and feedback. IBM calls these 'status' animations.", color: "var(--brand-default)" },
    { key: "visibility", label: "Visibility", desc: "Elements appearing (enter, fade-in) and disappearing (exit, fade-out). These communicate state changes and use IBM's entrance/exit curve pairs to choreograph arrivals and departures.", color: "var(--chart-5)" },
    { key: "layout", label: "Layout", desc: "Expanding, collapsing, and sliding surfaces. These cover the most visual distance and sit at the productive/expressive boundary — use expressive curves only when the transition is a key navigational moment.", color: "var(--chart-2)" },
  ] as const;

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-10)" }}>
      <div>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", letterSpacing: "var(--ls-h2)", marginBottom: "var(--space-4)" }}>
          Semantic motion tokens
        </h2>
        <p style={{ fontSize: "var(--text-body-lg)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, maxWidth: 640 }}>
          Pre-composed shorthand tokens that combine a duration and easing for specific interaction patterns. These are what you actually use in code — they express intent, not implementation.
        </p>
      </div>

      {/* Why semantic tokens */}
      <TheoryBlock title="Why semantic tokens instead of raw values?">
        <p style={{ marginBottom: "var(--space-4)" }}>
          Writing <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>transition: opacity 200ms cubic-bezier(0, 0, 0.38, 0.9)</code> is brittle — the duration and easing are divorced from their purpose. If the design team decides "fade-in should use an expressive curve," someone has to grep the entire codebase for that specific cubic-bezier.
        </p>
        <p style={{ marginBottom: "var(--space-4)" }}>
          Semantic tokens solve this. Writing <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)", color: "var(--brand-default)" }}>transition: opacity var(--motion-fade-in)</code> means the component declares <em>what kind of motion this is</em>, and the token resolves to the correct productive/expressive duration + easing pair. Changing the global feel of all fade-in animations is now a single CSS edit.
        </p>
        <p>
          This maps directly to IBM's recommendation: keep the <strong>intent</strong> in the component code and the <strong>implementation</strong> in the design tokens. The component says "I'm fading in," the token system decides whether that's productive (fast, 200ms) or expressive (slower, 300ms) based on the context.
        </p>
      </TheoryBlock>

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
            <div className="flex items-start justify-center" style={{ padding: "var(--space-3) 0" }}><CardEnterDemo /></div>
            <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>--motion-enter / --motion-exit</code>
          </div>
        </div>
        <div style={{ marginTop: "var(--space-6)", borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--space-6)" }}>
          <div className="grid grid-cols-4" style={{ gap: "var(--space-5)" }}>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}><PressButtonDemo /><span style={{ fontSize: "var(--text-indicator)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>Press</span></div>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}><InlineNotificationDemo /><span style={{ fontSize: "var(--text-indicator)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>Notification</span></div>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}><SkeletonShimmerDemo /><span style={{ fontSize: "var(--text-indicator)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>Skeleton</span></div>
            <div className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}><BadgePulseDemo /><span style={{ fontSize: "var(--text-indicator)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>Badge pop</span></div>
          </div>
        </div>
      </DemoCard>

      {/* Token reference by category */}
      {categories.map((cat) => {
        const tokens = SEMANTIC_TOKENS.filter((t) => t.category === cat.key);
        return (
          <div key={cat.key}>
            <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-2)" }}>{cat.label}</h3>
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)", lineHeight: 1.5, maxWidth: 640 }}>{cat.desc}</p>
            <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
              {tokens.map((token) => (
                <div key={token.token} className="rounded-xl flex items-stretch overflow-hidden" style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)", transition: "border-color var(--duration-short-2) var(--ease-standard)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                >
                  <div className="w-1 shrink-0" style={{ backgroundColor: cat.color }} />
                  <div className="flex-1" style={{ padding: "var(--space-5) var(--space-6)" }}>
                    <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                      <span style={{ fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>{token.name}</span>
                      <CopyButton text={`var(${token.token})`} />
                    </div>
                    <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-4)", lineHeight: 1.5 }}>{token.description}</p>
                    <div className="flex items-center flex-wrap" style={{ gap: "var(--space-3)" }}>
                      <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)", padding: "var(--space-1) var(--space-3)", backgroundColor: "var(--secondary)", borderRadius: "var(--radius-xs)" }}>{token.duration}</code>
                      <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-disabled)" }}>+</span>
                      <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)", padding: "var(--space-1) var(--space-3)", backgroundColor: "var(--secondary)", borderRadius: "var(--radius-xs)" }}>{token.easing}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Usage code block */}
      <div>
        <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>Usage</h3>
        <DemoCard title="CSS Example" noPad>
          <pre style={{ padding: "var(--space-6) var(--space-7)", backgroundColor: "var(--background)", margin: 0, overflow: "auto" }}>
            <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", color: "var(--color-text-primary)", lineHeight: 1.8 }}>{`.hx-button {
  /* Productive: quick hover feedback */
  transition: background-color var(--motion-hover);
}

.hx-button:active {
  /* Productive: instant press response */
  transition: transform var(--motion-press);
}

.hx-modal-enter {
  /* Expressive entrance: choreographed reveal */
  transition: transform var(--motion-enter),
              opacity var(--motion-fade-in);
}

.hx-modal-exit {
  /* Expressive exit: faster than enter (IBM asymmetry) */
  transition: transform var(--motion-exit),
              opacity var(--motion-fade-out);
}

.hx-accordion-content {
  /* Productive: efficient expand/collapse */
  transition: max-height var(--motion-expand);
}

/* Animated height with grid-template-rows trick */
.hx-collapsible {
  display: grid;
  grid-template-rows: 0fr; /* collapsed */
  transition: grid-template-rows var(--motion-expand);
}
.hx-collapsible[data-expanded="true"] {
  grid-template-rows: 1fr; /* expanded */
}
.hx-collapsible > div {
  overflow: hidden;
}

/* Expressive: dramatic sweep for focus underline */
.hx-input-focus-line {
  transition: transform var(--motion-focus-line);
}

/* Reduced motion: global override in theme.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
  }
}`}</code>
          </pre>
        </DemoCard>
      </div>

      {/* useReducedMotion hook */}
      <div>
        <h3 style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>React hook: useReducedMotion</h3>
        <TheoryBlock title="When to use" defaultOpen={true}>
          <p style={{ margin: 0, marginBottom: "var(--space-3)" }}>
            CSS <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", backgroundColor: "var(--secondary)", padding: "1px 6px", borderRadius: "var(--radius-xs)" }}>@media (prefers-reduced-motion: reduce)</code> handles CSS-only animations automatically via <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", backgroundColor: "var(--secondary)", padding: "1px 6px", borderRadius: "var(--radius-xs)" }}>theme.css</code>. But some animations are driven by JavaScript — <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", backgroundColor: "var(--secondary)", padding: "1px 6px", borderRadius: "var(--radius-xs)" }}>setTimeout</code> chains, <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", backgroundColor: "var(--secondary)", padding: "1px 6px", borderRadius: "var(--radius-xs)" }}>requestAnimationFrame</code> loops, or state-driven effects like the toggle glow pulse. Use the <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", backgroundColor: "var(--secondary)", padding: "1px 6px", borderRadius: "var(--radius-xs)" }}>useReducedMotion()</code> hook to conditionally skip those.
          </p>
          <p style={{ margin: 0 }}>
            The hook listens to the OS-level <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", backgroundColor: "var(--secondary)", padding: "1px 6px", borderRadius: "var(--radius-xs)" }}>matchMedia</code> query and updates reactively if the user changes their preference at runtime.
          </p>
        </TheoryBlock>
        <div style={{ marginTop: "var(--space-5)" }}>
          <DemoCard title="Hook usage" noPad>
            <pre style={{ padding: "var(--space-6) var(--space-7)", backgroundColor: "var(--background)", margin: 0, overflow: "auto" }}>
              <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)", color: "var(--color-text-primary)", lineHeight: 1.8 }}>{`import { useReducedMotion } from "./ui/use-reduced-motion"

function ToggleWithGlow() {
  const reducedMotion = useReducedMotion()
  const [glowing, setGlowing] = useState(false)

  useEffect(() => {
    if (isOn && !prevOn.current && !reducedMotion) {
      // Only fire the JS glow when motion is allowed
      setGlowing(true)
      const t = setTimeout(() => setGlowing(false), 500)
      return () => clearTimeout(t)
    }
  }, [isOn, reducedMotion])

  return (
    <button style={{
      animation: glowing
        ? "hx-toggle-glow 500ms var(--ease-emphasized-decelerate)"
        : "none",
    }} />
  )
}

// For canvas / rAF animations:
function AnimatedCanvas() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return // skip the animation loop entirely
    const id = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(id)
  }, [reduced])
}`}</code>
            </pre>
          </DemoCard>
        </div>
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
    <div className="min-h-full" style={{ backgroundColor: "var(--secondary-subtle)", fontFamily: "var(--font-family-supreme)" }}>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* ── Sticky header ─────────────────────���────────── */}
      <div
        className="border-b sticky top-0 z-10 h-[72px] transition-shadow duration-[var(--duration-short-4)] relative"
        style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--background)", boxShadow: scrolled ? "var(--elevation-sm)" : "none" }}
      >
        {/* Full-width layer: breadcrumb left, controls right */}
        <div className="h-full flex items-center justify-between relative z-[2] pointer-events-none" style={{ padding: "0 var(--space-10)" }}>
          <div className="flex items-center shrink-0 pointer-events-auto" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Foundation</span>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--border)" }}>&rsaquo;</span>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)" as any, fontFamily: "var(--font-family-supreme)" }}>Motion</span>
          </div>
          <div className="flex items-center shrink-0 pointer-events-auto" style={{ gap: "var(--space-5)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{tokenCount} tokens</span>
            <BreadcrumbSearch />
            <HxThemeToggle size="lg" />
          </div>
        </div>

        {/* Centered tab layer — aligned with content container below */}
        <div className="absolute inset-0 h-full flex items-center pointer-events-none z-[3]" style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 var(--space-8)" }}>
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
        {/* Page header */}
        <div className="border-b" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-9)", borderColor: "var(--secondary)" }}>
          <h1 style={{
            fontSize: "var(--text-huge)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)",
            lineHeight: "var(--lh-huge)", letterSpacing: "var(--ls-huge)", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)",
          }}>
            Motion
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "var(--muted-foreground)", lineHeight: 1.6, maxWidth: 580, fontFamily: "var(--font-family-supreme)" }}>
            Productive and expressive easing curves, duration tokens, and semantic motion presets — guided by IBM's Design Language — that bring the HollaEx interface to life with purposeful, choreographed animation.
          </p>
        </div>

        {/* Tab content */}
        <div style={{ padding: "var(--space-10) 0 var(--space-12)" }}>
          {activeTab === "principles" && <div id="motion-principles" data-section-title="Principles" className="section-block"><PrinciplesSection /></div>}
          {activeTab === "easing" && <div id="motion-easing" data-section-title="Easing Curves" className="section-block"><EasingSection /></div>}
          {activeTab === "duration" && <div id="motion-duration" data-section-title="Duration Scale" className="section-block"><DurationSection /></div>}
          {activeTab === "semantic" && <div id="motion-semantic" data-section-title="Semantic Tokens" className="section-block"><SemanticSection /></div>}
        </div>

        {/* Footer */}
        <div className="border-t flex items-center justify-between" style={{ padding: "var(--space-8) 0", borderColor: "var(--secondary)" }}>
          <p style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            HollaEx Design System · Motion
          </p>
        </div>
      </div>
      <SectionJumpFab iconMap={FAB_ICONS} />
    </div>
  );
}
