import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const ICON_SIZES: Record<string, number> = { xl: 20, lg: 18, md: 16, sm: 14, xs: 12 }
const DOT_SIZES: Record<string, number> = { xl: 10, lg: 9, md: 8, sm: 7, xs: 6 }

function sizeIcon(icon: React.ReactNode, px: number): React.ReactNode {
  if (!React.isValidElement(icon)) return icon
  return React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, { size: px, className: cn("shrink-0", (icon as React.ReactElement<{ className?: string }>).props.className) })
}

const badgeVariants = cva(
  ["inline-flex items-center whitespace-nowrap select-none border"],
  {
    variants: {
      variant: {
        "neutral-white": ["bg-[var(--badge-neutral-white-bg)] border-[var(--badge-neutral-white-border)] text-[var(--badge-neutral-white-text)]"],
        "neutral-gray": ["bg-[var(--badge-neutral-gray-bg)] border-[var(--badge-neutral-gray-border)] text-[var(--badge-neutral-gray-text)]"],
        informational: ["bg-[var(--badge-info-bg)] border-[var(--badge-info-border)] text-[var(--badge-info-text)]"],
        success: ["bg-[var(--badge-success-bg)] border-[var(--badge-success-border)] text-[var(--badge-success-text)]"],
        warning: ["bg-[var(--badge-warning-bg)] border-[var(--badge-warning-border)] text-[var(--badge-warning-text)]"],
        error: ["bg-[var(--badge-error-bg)] border-[var(--badge-error-border)] text-[var(--badge-error-text)]"],
        black: ["bg-[var(--badge-black-bg)] border-[var(--badge-black-border)] text-[var(--badge-black-text)]"],
        olive: ["bg-[var(--badge-olive-bg)] border-[var(--badge-olive-border)] text-[var(--badge-olive-text)]"],
        purple: ["bg-[var(--badge-purple-bg)] border-[var(--badge-purple-border)] text-[var(--badge-purple-text)]"],
        orange: ["bg-[var(--badge-orange-bg)] border-[var(--badge-orange-border)] text-[var(--badge-orange-text)]"],
        pink: ["bg-[var(--badge-pink-bg)] border-[var(--badge-pink-border)] text-[var(--badge-pink-text)]"],
      },
      shape: { circular: "rounded-full", rounded: "rounded-[var(--radius)]" },
      size: {
        xl: "h-16 px-4 gap-2 text-base",
        lg: "h-12 px-3.5 gap-2 text-sm",
        md: "h-10 px-3 gap-2 text-sm",
        sm: "h-8 px-3 gap-1.5 text-xs",
        xs: "h-6 px-2.5 gap-1 text-[10px]",
      },
    },
    defaultVariants: { variant: "informational", shape: "circular", size: "md" },
  }
)

/* Map variant key → CSS variable suffix for counter tokens */
const COUNTER_KEY: Record<string, string> = {
  "neutral-white": "neutral-white",
  "neutral-gray": "neutral-gray",
  informational: "info",
  success: "success",
  warning: "warning",
  error: "error",
  black: "black",
  olive: "olive",
  purple: "purple",
  orange: "orange",
  pink: "pink",
}

const INDICATOR_COLORS = { green: "#22C55E", red: "#EF4444", yellow: "#EAB308", blue: "#3B82F6" } as const

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  indicator?: keyof typeof INDICATOR_COLORS; leftIcon?: React.ReactNode; counter?: number; skeleton?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "informational", shape = "circular", size = "md", indicator, leftIcon, counter, skeleton, children, ...props }, ref) => {
    if (skeleton) {
      const skeletonSizes: Record<string, string> = { xl: "h-16 w-24", lg: "h-12 w-20", md: "h-10 w-16", sm: "h-8 w-14", xs: "h-6 w-12" }
      return (
        <span
          ref={ref}
          className={cn("inline-block hx-shimmer", shape === "rounded" ? "rounded-[var(--radius)]" : "rounded-full", skeletonSizes[size ?? "md"], className)}
          style={{ fontFamily: "var(--font-family-supreme)" }}
          {...props}
        />
      )
    }
    const iconPx = ICON_SIZES[size ?? "md"]; const dotPx = DOT_SIZES[size ?? "md"]
    const counterSuffix = COUNTER_KEY[variant ?? "informational"]
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, shape, size }), className)}
        style={{ fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)" } as React.CSSProperties}
        {...props}
      >
        {indicator && <span className="shrink-0 rounded-full" style={{ width: dotPx, height: dotPx, backgroundColor: INDICATOR_COLORS[indicator] }} />}
        {leftIcon ? sizeIcon(leftIcon, iconPx) : null}
        {children}
        {counter !== undefined && (
          <span
            className="inline-flex items-center justify-center overflow-hidden shrink-0 size-[18px] rounded text-[10px] leading-none"
            style={{
              backgroundColor: `var(--badge-counter-${counterSuffix}-bg)`,
              color: `var(--badge-counter-${counterSuffix}-text)`,
              fontWeight: "var(--font-weight-medium)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            {counter}
          </span>
        )}
      </span>
    )
  }
)
Badge.displayName = "Badge"
export { Badge, badgeVariants }