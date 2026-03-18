import { useEffect, useState, type ReactNode } from "react";
import { PageLoadingIllustration, VARIANT_MESSAGES, type IllustrationVariant } from "./loading-illustrations";

/* ─── PageLoader ─────────────────────────────────────────────── */
export function PageLoader({
  messages,
  messageInterval = 2400,
  dotCount = 3,
  size = "md",
  variant = "default",
  delay = 180,
}: {
  /** Rotating status messages shown below the illustration.
   *  If omitted, auto-resolves from the variant's contextual messages. */
  messages?: string[];
  /** Milliseconds between message rotations */
  messageInterval?: number;
  /** Number of bouncing dots below the message */
  dotCount?: number;
  /** Visual size preset */
  size?: "sm" | "md" | "lg";
  /** Page-specific illustration variant */
  variant?: IllustrationVariant;
  /** Milliseconds to wait before showing the loader.
   *  Prevents a brief flash on fast-loading pages. Set to 0 to disable. */
  delay?: number;
} = {}) {
  const resolvedMessages = messages || VARIANT_MESSAGES[variant] || VARIANT_MESSAGES.default;
  const [msgIndex, setMsgIndex] = useState(0);
  const [visible, setVisible] = useState(delay <= 0);

  /* Delay gate — don't render anything until the delay elapses */
  useEffect(() => {
    if (delay <= 0) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  /* Message rotation */
  useEffect(() => {
    if (resolvedMessages.length <= 1) return;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % resolvedMessages.length);
    }, messageInterval);
    return () => clearInterval(interval);
  }, [resolvedMessages, messageInterval]);

  /* Don't render anything during the delay — avoids flash on fast loads */
  if (!visible) return null;

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
        height: "100%",
        flex: 1,
        gap,
        fontFamily: "var(--font-family-supreme)",
        animation: "hx-loader-fade-in var(--duration-medium-2, 400ms) var(--ease-emphasized-decelerate, ease-out) both",
      }}
    >
      {/* Animated illustration */}
      <div style={{ transform: `scale(${illScale})`, transformOrigin: "center center" }}>
        <PageLoadingIllustration variant={variant} />
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
        {resolvedMessages[msgIndex]}
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
