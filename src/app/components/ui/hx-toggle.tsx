import * as React from "react"
import { cn } from "./utils"
import { useTheme } from "../theme-context"

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

export interface HxToggleProps {
  /** Controlled checked state */
  checked?: boolean
  /** Uncontrolled default */
  defaultChecked?: boolean
  /** Called when value changes */
  onChange?: (checked: boolean) => void
  /** Size preset */
  size?: "sm" | "md" | "lg"
  /** Disable interaction */
  disabled?: boolean
  /** Label text */
  label?: string
  /** Helper text below the toggle */
  helperText?: string
  /** Show the label on the left side instead of right */
  labelLeft?: boolean
  /** Render as loading skeleton */
  skeleton?: boolean
  className?: string
}

export interface HxThemeToggleProps {
  /** Size preset */
  size?: "sm" | "md" | "lg"
  /** Disable interaction */
  disabled?: boolean
  className?: string
}

/* ────────────────────────────────────────────────────────────
   Size config
   ──────────────────────────────────────────────────────────── */

const SIZE = {
  sm: {
    track: { width: 32, height: 18, radius: 9 },
    thumb: { size: 14, offset: 2 },
    text: "text-[12px] leading-[16px]",
    helper: "text-[11px] leading-[14px]",
    gap: "gap-[6px]",
    iconSize: 10,
  },
  md: {
    track: { width: 44, height: 24, radius: 12 },
    thumb: { size: 20, offset: 2 },
    text: "text-[14px] leading-[22px]",
    helper: "text-[12px] leading-[16px]",
    gap: "gap-[8px]",
    iconSize: 12,
  },
  lg: {
    track: { width: 56, height: 30, radius: 15 },
    thumb: { size: 26, offset: 2 },
    text: "text-[16px] leading-[24px]",
    helper: "text-[14px] leading-[22px]",
    gap: "gap-[10px]",
    iconSize: 16,
  },
} as const

/* ────────────────────────────────────────────────────────────
   Sun / Moon SVG icons (inline for zero dependencies)
   ──────────────────────────────────────────────────────────── */

function SunIcon({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function MoonIcon({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────
   HxToggle  —  default toggle (green on / gray off)
   ──────────────────────────────────────────────────────────── */

export function HxToggle({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size = "md",
  disabled = false,
  label,
  helperText,
  labelLeft = false,
  skeleton = false,
  className,
}: HxToggleProps) {
  const isControlled = controlledChecked !== undefined
  const [internal, setInternal] = React.useState(defaultChecked)
  const isOn = isControlled ? controlledChecked : internal

  const s = SIZE[size]

  const handleClick = () => {
    if (disabled) return
    const next = !isOn
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  if (skeleton) {
    return (
      <div className={cn("inline-flex items-center", s.gap, className)}>
        <span
          className="hx-shimmer rounded-full block"
          style={{
            width: s.track.width,
            height: s.track.height,
          }}
        />
        {label !== undefined && (
          <span
            className="hx-shimmer rounded-[2px] block"
            style={{ width: 60, height: 14 }}
          />
        )}
      </div>
    )
  }

  const translateX = isOn
    ? s.track.width - s.thumb.size - s.thumb.offset
    : s.thumb.offset

  const trackEl = (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative shrink-0 inline-flex items-center outline-none transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      style={{
        width: s.track.width,
        height: s.track.height,
        borderRadius: s.track.radius,
        backgroundColor: disabled
          ? "var(--toggle-disabled-bg)"
          : isOn
            ? "var(--toggle-on-bg)"
            : "var(--toggle-off-bg)",
        // @ts-expect-error -- CSS variable for focus ring
        "--tw-ring-color": "var(--toggle-focus-ring)",
        "--tw-ring-offset-color": "var(--focus-ring-offset)",
      }}
    >
      {/* Thumb */}
      <span
        className="absolute block rounded-full transition-transform duration-200"
        style={{
          width: s.thumb.size,
          height: s.thumb.size,
          top: s.thumb.offset,
          left: 0,
          transform: `translateX(${translateX}px)`,
          backgroundColor: disabled
            ? "var(--toggle-thumb-disabled-bg)"
            : "var(--toggle-thumb-bg)",
          boxShadow: "var(--toggle-thumb-shadow)",
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
    </button>
  )

  if (!label && !helperText) {
    return <div className={cn("inline-flex", className)}>{trackEl}</div>
  }

  return (
    <div
      className={cn(
        "inline-flex items-start",
        s.gap,
        labelLeft && "flex-row-reverse",
        className,
      )}
      style={{ fontFamily: "var(--font-family-supreme)" }}
    >
      {trackEl}
      <div className="flex flex-col gap-px pt-px">
        {label && (
          <span
            className={cn("select-none", s.text)}
            style={{
              fontWeight: "var(--font-weight-regular)",
              color: disabled
                ? "var(--toggle-disabled-label-fg)"
                : "var(--toggle-label-fg)",
            }}
          >
            {label}
          </span>
        )}
        {helperText && (
          <span
            className={cn("select-none", s.helper)}
            style={{
              fontWeight: "var(--font-weight-regular)",
              color: disabled
                ? "var(--toggle-disabled-label-fg)"
                : "var(--toggle-helper-fg)",
            }}
          >
            {helperText}
          </span>
        )}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   HxThemeToggle  —  special light/dark mode toggle
   ──────────────────────────────────────────────────────────── */

export function HxThemeToggle({
  size = "md",
  disabled = false,
  className,
}: HxThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"
  const s = SIZE[size]

  const translateX = isDark
    ? s.track.width - s.thumb.size - s.thumb.offset
    : s.thumb.offset

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={disabled}
      onClick={toggleTheme}
      className={cn(
        "relative shrink-0 inline-flex items-center outline-none transition-colors duration-300",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
      style={{
        width: s.track.width,
        height: s.track.height,
        borderRadius: s.track.radius,
        backgroundColor: isDark
          ? "var(--toggle-theme-on-bg)"
          : "var(--toggle-theme-off-bg)",
        // @ts-expect-error -- CSS variable for focus ring
        "--tw-ring-color": "var(--toggle-focus-ring)",
        "--tw-ring-offset-color": "var(--focus-ring-offset)",
      }}
    >
      {/* Track icons — sun on left, moon on right */}
      <span
        className="absolute inset-0 flex items-center justify-between pointer-events-none"
        style={{
          paddingLeft: s.thumb.offset + 2,
          paddingRight: s.thumb.offset + 2,
          color: isDark ? "var(--toggle-theme-icon-fg)" : "var(--color-text-secondary)",
        }}
      >
        <SunIcon size={s.iconSize} className={cn("transition-opacity duration-200", isDark ? "opacity-70" : "opacity-0")} />
        <MoonIcon size={s.iconSize} className={cn("transition-opacity duration-200", isDark ? "opacity-0" : "opacity-70")} />
      </span>

      {/* Thumb with active icon */}
      <span
        className="absolute flex items-center justify-center rounded-full transition-transform duration-300"
        style={{
          width: s.thumb.size,
          height: s.thumb.size,
          top: s.thumb.offset,
          left: 0,
          transform: `translateX(${translateX}px)`,
          backgroundColor: "var(--toggle-thumb-bg)",
          boxShadow: "var(--toggle-thumb-shadow)",
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          color: isDark ? "var(--toggle-theme-on-bg)" : "var(--color-text-secondary)",
        }}
      >
        {isDark ? (
          <MoonIcon
            size={Math.round(s.iconSize * 0.9)}
            className="transition-all duration-300"
          />
        ) : (
          <SunIcon
            size={Math.round(s.iconSize * 0.9)}
            className="transition-all duration-300"
          />
        )}
      </span>
    </button>
  )
}