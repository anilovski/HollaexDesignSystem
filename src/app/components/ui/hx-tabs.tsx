import * as React from "react"
import { cn } from "./utils"

/* ────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────── */

export interface HxTabItem {
  value: string
  label?: string
  icon?: React.ReactNode
  counter?: number
  disabled?: boolean
}

export interface HxTabsProps {
  /** Array of tab definitions */
  items: HxTabItem[]
  /** Controlled active value */
  value?: string
  /** Uncontrolled default value */
  defaultValue?: string
  /** Called when the active tab changes */
  onChange?: (value: string) => void
  /** Visual variant */
  variant?: "line" | "contained" | "enclosed"
  /** Size preset */
  size?: "sm" | "md" | "lg"
  /** Stretch tabs to fill available width */
  fullWidth?: boolean
  /** Whether the whole tab group is disabled */
  disabled?: boolean
  className?: string
}

export interface HxTabPanelProps {
  /** Must match a tab item's value */
  value: string
  /** Currently active value (passed from parent) */
  activeValue: string
  children: React.ReactNode
  className?: string
}

/* ────────────────────────────────────────────────────────────
   Size config
   ──────────────────────────────────────────────────────────── */

const SIZE = {
  sm: {
    height: "h-[32px]",
    px: "px-[10px]",
    text: "text-[12px] leading-[16px]",
    iconSize: "size-3.5",
    gap: "gap-[4px]",
    counterSize: "size-[18px] text-[10px]",
  },
  md: {
    height: "h-[40px]",
    px: "px-[16px]",
    text: "text-[14px] leading-[22px]",
    iconSize: "size-4",
    gap: "gap-[6px]",
    counterSize: "size-[20px] text-[11px]",
  },
  lg: {
    height: "h-[48px]",
    px: "px-[20px]",
    text: "text-[16px] leading-[24px]",
    iconSize: "size-5",
    gap: "gap-[8px]",
    counterSize: "size-[22px] text-[12px]",
  },
} as const

/* ── Inline style to hide scrollbar across browsers ── */
const hideScrollbar: React.CSSProperties = {
  msOverflowStyle: "none",       /* IE / Edge */
  scrollbarWidth: "none",        /* Firefox */
}

/* Webkit scrollbar hide — applied via className isn't possible with pure
   inline styles, so we inject a tiny <style> once. */
const SCROLLBAR_CLASS = "hx-tabs-scroll-hide"
let styleInjected = false
function injectScrollbarStyle() {
  if (styleInjected || typeof document === "undefined") return
  const style = document.createElement("style")
  style.textContent = `.${SCROLLBAR_CLASS}::-webkit-scrollbar{display:none}`
  document.head.appendChild(style)
  styleInjected = true
}

/* ────────────────────────────────────────────────────────────
   HxTabs  — the tab list (header)
   ──────────────────────────────────────────────────────────── */

export function HxTabs({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = "line",
  size = "md",
  fullWidth = false,
  disabled = false,
  className,
}: HxTabsProps) {
  const isControlled = controlledValue !== undefined
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value ?? "")
  const active = isControlled ? controlledValue : internal

  const s = SIZE[size]

  /* Inject scrollbar-hide style once on first render */
  React.useEffect(() => { injectScrollbarStyle() }, [])

  const handleClick = (val: string) => {
    if (disabled) return
    if (!isControlled) setInternal(val)
    onChange?.(val)
  }

  /* ── Line variant ──────────────────────────── */
  if (variant === "line") {
    return (
      <div
        role="tablist"
        className={cn(
          "relative flex border-b overflow-x-auto",
          SCROLLBAR_CLASS,
          fullWidth && "w-full",
          className,
        )}
        style={{
          borderColor: "var(--tab-line-border)",
          fontFamily: "var(--font-family-supreme)",
          ...hideScrollbar,
        }}
      >
        {items.map((item) => {
          const isActive = item.value === active
          const isDisabled = disabled || item.disabled
          return (
            <button
              key={item.value}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleClick(item.value)}
              className={cn(
                "group relative flex items-center justify-center shrink-0 select-none outline-none transition-colors duration-[var(--duration-short-3)]",
                s.height,
                s.px,
                fullWidth && "flex-1",
                isDisabled && "cursor-not-allowed",
                !isDisabled && "cursor-pointer",
              )}
              style={{ fontFamily: "var(--font-family-supreme)" }}
            >
              {/* Tab content */}
              <span className={cn("flex items-center", s.gap)}>
                {item.icon && (
                  <span
                    className={cn("flex items-center justify-center shrink-0 transition-transform duration-[var(--duration-short-3)]", s.iconSize, !isDisabled && !isActive && "group-hover:-translate-y-px")}
                    style={{
                      color: isDisabled
                        ? "var(--tab-line-disabled-fg)"
                        : isActive
                          ? "var(--tab-line-active-color)"
                          : "var(--tab-line-default-fg)",
                    }}
                  >
                    {item.icon}
                  </span>
                )}
                <span
                  className={cn("whitespace-nowrap", s.text)}
                  style={{
                    fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                    color: isDisabled
                      ? "var(--tab-line-disabled-fg)"
                      : isActive
                        ? "var(--tab-line-active-fg)"
                        : "var(--tab-line-default-fg)",
                    ...((!isDisabled && !isActive) ? {} : {}),
                  }}
                >
                  {item.label ?? item.value}
                </span>
                {item.counter !== undefined && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center rounded-full shrink-0",
                      s.counterSize,
                    )}
                    style={{
                      fontWeight: "var(--font-weight-medium)",
                      fontFamily: "var(--font-family-supreme)",
                      backgroundColor: isActive ? "var(--brand-subtle)" : "var(--secondary-subtle)",
                      color: isActive ? "var(--brand-default)" : "var(--color-text-secondary)",
                    }}
                  >
                    {item.counter}
                  </span>
                )}
              </span>

              {/* Active underline — always present, animated via scale */}
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full origin-left transition-transform duration-[var(--duration-medium-2)]",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
                style={{
                  height: "var(--tab-line-thickness)",
                  backgroundColor: "var(--tab-line-active-color)",
                  transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              />

              {/* Hover underline (only when not active and not disabled) */}
              {!isActive && !isDisabled && (
                <span
                  className="absolute bottom-0 left-0 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[var(--duration-medium-2)]"
                  style={{
                    height: "var(--tab-line-thickness)",
                    backgroundColor: "var(--tab-line-border)",
                    transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    )
  }

  /* ── Contained variant ─────────────────────── */
  if (variant === "contained") {
    return (
      <div
        role="tablist"
        className={cn(
          "inline-flex items-center p-[4px] rounded-[var(--tab-contained-radius)] overflow-x-auto",
          SCROLLBAR_CLASS,
          fullWidth && "w-full flex",
          className,
        )}
        style={{
          backgroundColor: "var(--secondary-subtle)",
          fontFamily: "var(--font-family-supreme)",
          ...hideScrollbar,
        }}
      >
        {items.map((item) => {
          const isActive = item.value === active
          const isDisabled = disabled || item.disabled
          return (
            <button
              key={item.value}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={isDisabled}
              onClick={() => !isDisabled && handleClick(item.value)}
              className={cn(
                "relative flex items-center justify-center shrink-0 select-none outline-none transition-all duration-[var(--duration-short-4)] rounded-[var(--radius-xs)]",
                s.height,
                s.px,
                fullWidth && "flex-1",
                isDisabled && "cursor-not-allowed",
                !isDisabled && !isActive && "cursor-pointer hover:bg-[var(--secondary-subtle-hover)]",
              )}
              style={{
                fontFamily: "var(--font-family-supreme)",
                backgroundColor: isActive ? "var(--tab-contained-active-bg)" : undefined,
                boxShadow: isActive ? "var(--elevation-sm)" : undefined,
              }}
            >
              <span className={cn("flex items-center", s.gap)}>
                {item.icon && (
                  <span
                    className={cn("flex items-center justify-center shrink-0", s.iconSize)}
                    style={{
                      color: isDisabled
                        ? "var(--tab-contained-disabled-fg)"
                        : isActive
                          ? "var(--tab-contained-active-fg)"
                          : "var(--tab-contained-default-fg)",
                    }}
                  >
                    {item.icon}
                  </span>
                )}
                <span
                  className={cn("whitespace-nowrap", s.text)}
                  style={{
                    fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                    color: isDisabled
                      ? "var(--tab-contained-disabled-fg)"
                      : isActive
                        ? "var(--tab-contained-active-fg)"
                        : "var(--tab-contained-default-fg)",
                  }}
                >
                  {item.label ?? item.value}
                </span>
                {item.counter !== undefined && (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center rounded-full shrink-0",
                      s.counterSize,
                    )}
                    style={{
                      fontWeight: "var(--font-weight-medium)",
                      fontFamily: "var(--font-family-supreme)",
                      backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "var(--secondary-subtle-hover)",
                      color: isActive ? "var(--tab-contained-active-fg)" : "var(--color-text-secondary)",
                    }}
                  >
                    {item.counter}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  /* ── Enclosed variant ──────────────────────── */
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-end border-b overflow-x-auto",
        SCROLLBAR_CLASS,
        fullWidth && "w-full flex",
        className,
      )}
      style={{
        borderColor: "var(--tab-enclosed-border)",
        fontFamily: "var(--font-family-supreme)",
        ...hideScrollbar,
      }}
    >
      {items.map((item) => {
        const isActive = item.value === active
        const isDisabled = disabled || item.disabled
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleClick(item.value)}
            className={cn(
              "relative flex items-center justify-center shrink-0 select-none outline-none transition-colors duration-[var(--duration-short-3)]",
              s.height,
              s.px,
              fullWidth && "flex-1",
              isDisabled && "cursor-not-allowed",
              !isDisabled && "cursor-pointer",
              isActive
                ? "border border-b-0 rounded-t-[var(--radius)]"
                : "border border-transparent",
            )}
            style={{
              fontFamily: "var(--font-family-supreme)",
              backgroundColor: isActive
                ? "var(--tab-enclosed-active-bg)"
                : "var(--tab-enclosed-default-bg)",
              borderColor: isActive ? "var(--tab-enclosed-active-border)" : "transparent",
              marginBottom: isActive ? "-1px" : "0",
            }}
          >
            <span className={cn("flex items-center", s.gap)}>
              {item.icon && (
                <span
                  className={cn("flex items-center justify-center shrink-0", s.iconSize)}
                  style={{
                    color: isDisabled
                      ? "var(--tab-line-disabled-fg)"
                      : isActive
                        ? "var(--tab-enclosed-active-fg)"
                        : "var(--tab-enclosed-default-fg)",
                  }}
                >
                  {item.icon}
                </span>
              )}
              <span
                className={cn("whitespace-nowrap", s.text)}
                style={{
                  fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                  color: isDisabled
                    ? "var(--tab-line-disabled-fg)"
                    : isActive
                      ? "var(--tab-enclosed-active-fg)"
                      : "var(--tab-enclosed-default-fg)",
                }}
              >
                {item.label ?? item.value}
              </span>
              {item.counter !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full shrink-0",
                    s.counterSize,
                  )}
                  style={{
                    fontWeight: "var(--font-weight-medium)",
                    fontFamily: "var(--font-family-supreme)",
                    backgroundColor: isActive ? "var(--brand-subtle)" : "var(--secondary-subtle-hover)",
                    color: isActive ? "var(--brand-default)" : "var(--color-text-secondary)",
                  }}
                >
                  {item.counter}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   HxTabPanel — the content area
   ──────────────────────────────────────────────────────────── */

export function HxTabPanel({ value, activeValue, children, className }: HxTabPanelProps) {
  if (value !== activeValue) return null
  return (
    <div
      role="tabpanel"
      className={cn("outline-none", className)}
      style={{
        padding: "var(--tab-panel-padding)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      {children}
    </div>
  )
}