import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "./utils";

/* ── Types ─────────────────────────────────────── */

type TooltipPlacement = "top" | "bottom" | "left" | "right";
type TooltipSize = "sm" | "md" | "lg";
type TooltipVariant = "dark" | "light" | "brand";

export interface HxTooltipProps {
  /** The trigger element — must accept a ref */
  children: React.ReactNode;
  /** Tooltip label text */
  label: string;
  /** Optional multiline description shown below the label */
  description?: string;
  /** Placement relative to trigger */
  placement?: TooltipPlacement;
  /** Visual variant */
  variant?: TooltipVariant;
  /** Size preset */
  size?: TooltipSize;
  /** Show the directional arrow */
  arrow?: boolean;
  /** Delay before showing (ms) */
  delayDuration?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional className on the content */
  className?: string;
  /** Open state (controlled) */
  open?: boolean;
  /** Open change callback (controlled) */
  onOpenChange?: (open: boolean) => void;
}

/* ── Size tokens ───────────────────────────────── */

const SIZE_STYLES: Record<TooltipSize, React.CSSProperties> = {
  sm: {
    fontSize: "11px",
    lineHeight: "16px",
    padding: "4px 8px",
    maxWidth: "200px",
    borderRadius: "var(--radius-xs)",
  },
  md: {
    fontSize: "12px",
    lineHeight: "18px",
    padding: "6px 10px",
    maxWidth: "260px",
    borderRadius: "var(--radius)",
  },
  lg: {
    fontSize: "var(--text-label)",
    lineHeight: "20px",
    padding: "8px 12px",
    maxWidth: "320px",
    borderRadius: "var(--radius)",
  },
};

const DESC_FONT_SIZES: Record<TooltipSize, string> = {
  sm: "10px",
  md: "11px",
  lg: "12px",
};

/* ── Variant colour maps ───────────────────────── */

function getVariantStyles(variant: TooltipVariant): {
  bg: string;
  fg: string;
  descFg: string;
  border: string;
  arrowFill: string;
} {
  switch (variant) {
    case "light":
      return {
        bg: "var(--popover)",
        fg: "var(--popover-foreground)",
        descFg: "var(--muted-foreground)",
        border: "var(--border)",
        arrowFill: "var(--popover)",
      };
    case "brand":
      return {
        bg: "var(--brand-default)",
        fg: "var(--brand-fg)",
        descFg: "rgba(255,255,255,0.75)",
        border: "var(--brand-default)",
        arrowFill: "var(--brand-default)",
      };
    case "dark":
    default:
      return {
        bg: "var(--secondary-default)",
        fg: "var(--secondary-fg)",
        descFg: "rgba(255,255,255,0.65)",
        border: "var(--secondary-default)",
        arrowFill: "var(--secondary-default)",
      };
  }
}

/* ── Component ─────────────────────────────────── */

export function HxTooltip({
  children,
  label,
  description,
  placement = "top",
  variant = "dark",
  size = "md",
  arrow = true,
  delayDuration = 200,
  disabled = false,
  className,
  open,
  onOpenChange,
}: HxTooltipProps) {
  const colors = getVariantStyles(variant);
  const sizeStyle = SIZE_STYLES[size];

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={placement}
            sideOffset={arrow ? 6 : 4}
            className={cn(
              "z-50 animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className
            )}
            style={{
              ...sizeStyle,
              backgroundColor: colors.bg,
              color: colors.fg,
              border: variant === "light" ? `1px solid ${colors.border}` : "none",
              fontFamily: "var(--font-family-supreme)",
              fontWeight: "var(--font-weight-medium)",
              boxShadow: "var(--elevation-sm)",
            }}
          >
            <span style={{ display: "block" }}>{label}</span>
            {description && (
              <span
                style={{
                  display: "block",
                  marginTop: "2px",
                  fontSize: DESC_FONT_SIZES[size],
                  fontWeight: "var(--font-weight-regular)",
                  color: colors.descFg,
                  lineHeight: "1.4",
                }}
              >
                {description}
              </span>
            )}
            {arrow && (
              <TooltipPrimitive.Arrow
                width={10}
                height={5}
                style={{ fill: colors.arrowFill }}
              />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
