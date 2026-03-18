import { useEffect, useState, type ReactNode } from "react";
import { LoadingIllustration } from "./loading-illustration";

/* ─── Messages that rotate while loading ─────────────────────── */
const defaultMessages = [
  "Loading components…",
  "Preparing examples…",
  "Almost ready…",
];

/* ─── PageLoader ─────────────────────────────────────────────── */
export function PageLoader({
  messages = defaultMessages,
  messageInterval = 2400,
  dotCount = 3,
  size = "md",
}: {
  /** Rotating status messages shown below the illustration */
  messages?: string[];
  /** Milliseconds between message rotations */
  messageInterval?: number;
  /** Number of bouncing dots below the message */
  dotCount?: number;
  /** Visual size preset */
  size?: "sm" | "md" | "lg";
} = {}) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, messageInterval);
    return () => clearInterval(interval);
  }, [messages, messageInterval]);

  const dotSize = size === "sm" ? 5 : size === "lg" ? 8 : 6;
  const minH = size === "sm" ? "30vh" : size === "lg" ? "70vh" : "60vh";
  const gap = size === "sm" ? "var(--space-3)" : "var(--space-5)";
  const dotGap = size === "sm" ? "var(--space-1)" : "var(--space-2)";
  const illScale = size === "sm" ? 0.6 : size === "lg" ? 1.1 : 0.85;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: minH,
        gap,
        fontFamily: "var(--font-family-supreme)",
        animation: "hx-loader-fade-in var(--duration-medium-2, 400ms) var(--ease-emphasized-decelerate, ease-out) both",
      }}
    >
      {/* Animated illustration */}
      <div style={{ transform: `scale(${illScale})`, transformOrigin: "center center" }}>
        <LoadingIllustration />
      </div>

      {/* Rotating message */}
      <p
        key={msgIndex}
        style={{
          fontFamily: "var(--font-family-supreme)",
          fontSize: "var(--text-body-sm, 13px)",
          lineHeight: "var(--lh-body-sm, 20px)",
          color: "var(--muted-foreground)",
          letterSpacing: "var(--ls-body-sm, 0.005em)",
          animation: "hx-loader-msg-in var(--duration-short-4, 200ms) var(--ease-standard-decelerate, ease-out) both",
          margin: 0,
        }}
      >
        {messages[msgIndex]}
      </p>

      {/* Small bouncing dots as a subtle secondary indicator */}
      <div style={{ display: "flex", gap: dotGap }}>
        {Array.from({ length: dotCount }, (_, i) => (
          <span
            key={i}
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "var(--radius-chip, 9999px)",
              backgroundColor: "var(--primary)",
              opacity: 0.25,
              animation: `hx-loader-bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Inline keyframes — scoped to this component */}
      <style>{`
        @keyframes hx-loader-bounce {
          0%, 80%, 100% {
            opacity: 0.25;
            transform: scale(1);
          }
          40% {
            opacity: 1;
            transform: scale(1.35);
          }
        }
        @keyframes hx-loader-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hx-loader-msg-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── FadeInContent — wraps children with a subtle enter animation ── */
export function FadeInContent({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        animation: "hx-content-enter var(--duration-medium-2, 400ms) var(--ease-emphasized-decelerate, ease-out) both",
      }}
    >
      {children}
      <style>{`
        @keyframes hx-content-enter {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}