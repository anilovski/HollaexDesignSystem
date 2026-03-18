"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "./utils";

/* ── Size presets ─────────────────────────────────────────── */
type OTPSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<OTPSize, { cell: number; font: string; caret: number; gap: string }> = {
  sm: { cell: 32, font: "var(--text-body-sm)", caret: 14, gap: "var(--space-2)" },
  md: { cell: 40, font: "var(--text-body)", caret: 18, gap: "var(--space-3)" },
  lg: { cell: 48, font: "var(--text-h6)", caret: 22, gap: "var(--space-3)" },
};

/* ── Root ─────────────────────────────────────────────────── */
function InputOTP({
  className,
  containerClassName,
  size = "md",
  variant = "gray",
  corners = "sharp",
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  size?: OTPSize;
  variant?: "gray" | "white";
  corners?: "sharp" | "rounded";
}) {
  return (
    <OTPInputContext.Provider value={React.useContext(OTPInputContext)}>
      <OTPInput
        data-slot="input-otp"
        data-otp-size={size}
        data-otp-variant={variant}
        data-otp-corners={corners}
        containerClassName={cn(
          "flex items-center has-disabled:opacity-50",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </OTPInputContext.Provider>
  );
}

/* ── Group ────────────────────────────────────────────────── */
function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      style={{ gap: "var(--space-2)" }}
      {...props}
    />
  );
}

/* ── Animated border path (bottom-left start) ─────────────── */
function BorderTrace({ active, size, radius }: { active: boolean; size: number; radius: number }) {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      setShouldRender(true);
    } else {
      // Keep rendered briefly for exit animation, then unmount
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!shouldRender) return null;

  const r = Math.min(radius, size / 2);
  const inset = 0.5; // offset inward so SVG stroke doesn't cover CSS border
  const w = size;
  const h = size;
  const iw = w - inset * 2;
  const ih = h - inset * 2;
  const ir = Math.max(0, r - inset);

  // Path starts at bottom-left corner, traces: bottom → right → top → left → close
  const d = ir > 0
    ? `M ${inset} ${h - inset - ir}
       A ${ir} ${ir} 0 0 0 ${inset + ir} ${h - inset}
       L ${w - inset - ir} ${h - inset}
       A ${ir} ${ir} 0 0 0 ${w - inset} ${h - inset - ir}
       L ${w - inset} ${inset + ir}
       A ${ir} ${ir} 0 0 0 ${w - inset - ir} ${inset}
       L ${inset + ir} ${inset}
       A ${ir} ${ir} 0 0 0 ${inset} ${inset + ir}
       Z`
    : `M ${inset} ${h - inset} L ${w - inset} ${h - inset} L ${w - inset} ${inset} L ${inset} ${inset} Z`;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      style={{ overflow: "visible" }}
    >
      <path
        d={d}
        stroke="var(--brand-default)"
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={active ? 0 : 1}
        style={{
          transition: active
            ? "stroke-dashoffset var(--duration-medium-4) cubic-bezier(0.25, 0.1, 0.25, 1)"
            : "stroke-dashoffset var(--duration-short-4) cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
    </svg>
  );
}

/* ── Slot ─────────────────────────────────────────────────── */
function InputOTPSlot({
  index,
  className,
  size = "md",
  variant = "gray",
  corners = "sharp",
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  size?: OTPSize;
  variant?: "gray" | "white";
  corners?: "sharp" | "rounded";
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  const s = SIZE_MAP[size];

  const bg = variant === "gray" ? "var(--muted)" : "var(--input-background)";
  const sideColor = variant === "white"
    ? "var(--border)"
    : corners === "rounded"
      ? "var(--border)"
      : "transparent";
  const radiusVal = corners === "rounded" ? 6 : 0;
  const radiusCss = corners === "rounded" ? "var(--radius)" : "0px";

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn("relative flex items-center justify-center select-none", className)}
      style={{
        width: s.cell,
        height: s.cell,
        backgroundColor: bg,
        borderTop: `1px solid ${sideColor}`,
        borderRight: `1px solid ${sideColor}`,
        borderBottom: "1px solid var(--border)",
        borderLeft: `1px solid ${sideColor}`,
        borderRadius: radiusCss,
        fontFamily: "var(--font-family-mono)",
        fontSize: s.font,
        fontWeight: "var(--font-weight-medium)" as any,
        fontVariantNumeric: "tabular-nums",
        color: "var(--color-text-primary)",
        transition: "border-color var(--duration-short-3) ease, background-color var(--duration-short-3) ease",
        overflow: "visible",
      }}
      {...props}
    >
      {char}

      {/* Animated border trace — starts from bottom-left */}
      <BorderTrace active={!!isActive} size={s.cell} radius={radiusVal} />

      {/* Blinking caret */}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="animate-caret-blink"
            style={{
              width: 1.5,
              height: s.caret,
              backgroundColor: "var(--brand-default)",
              borderRadius: 1,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ── Separator ────────────────────────────────────────────── */
function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="flex items-center justify-center"
      style={{
        width: "var(--space-4)",
        color: "var(--color-text-tertiary)",
      }}
      {...props}
    >
      <span
        style={{
          width: 8,
          height: 2,
          backgroundColor: "var(--border)",
          borderRadius: 1,
          display: "block",
        }}
      />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
export type { OTPSize };