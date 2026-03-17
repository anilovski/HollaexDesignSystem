import * as React from "react"
import { cn } from "./utils"

export interface HxSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "rounded"
  width?: number | string
  height?: number | string
  lines?: number
  animated?: boolean
}

export function HxSkeleton({
  variant = "text",
  width,
  height,
  lines = 1,
  animated = true,
  className,
  style: styleProp,
  ...props
}: HxSkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(animated && "hx-shimmer", className)}
            style={{
              height: height ?? 14,
              width: i === lines - 1 ? "75%" : (width ?? "100%"),
              backgroundColor: animated ? undefined : "var(--badge-skeleton-bg)",
              borderRadius: "var(--radius-xs)",
              ...styleProp,
            }}
            {...props}
          />
        ))}
      </div>
    )
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    text: { height: height ?? 14, width: width ?? "100%", borderRadius: "var(--radius-xs)" },
    circular: { height: height ?? 40, width: width ?? 40, borderRadius: "var(--radius-circle)" },
    rectangular: { height: height ?? 120, width: width ?? "100%", borderRadius: 0 },
    rounded: { height: height ?? 120, width: width ?? "100%", borderRadius: "var(--radius-sm2)" },
  }

  return (
    <div
      className={cn(animated && "hx-shimmer", className)}
      style={{
        backgroundColor: animated ? undefined : "var(--badge-skeleton-bg)",
        ...variantStyles[variant],
        ...styleProp,
      }}
      {...props}
    />
  )
}

/* Pre-composed skeleton patterns */
export function SkeletonCard() {
  return (
    <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border-subtle)", width: 280 }}>
      <HxSkeleton variant="rectangular" height={140} />
      <div style={{ padding: "var(--space-4)" }}>
        <HxSkeleton variant="text" width="60%" height={18} />
        <div style={{ marginTop: "var(--space-3)" }}>
          <HxSkeleton variant="text" lines={2} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonListItem() {
  return (
    <div className="flex items-center" style={{ gap: "var(--space-4)", padding: "var(--space-3) 0" }}>
      <HxSkeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <HxSkeleton variant="text" width="40%" height={16} />
        <div style={{ marginTop: "var(--space-2)" }}>
          <HxSkeleton variant="text" width="70%" height={12} />
        </div>
      </div>
      <HxSkeleton variant="rounded" width={64} height={28} />
    </div>
  )
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <HxSkeleton variant="circular" width={size} height={size} />
}

export function SkeletonTable({ rows = 3, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full border rounded-lg overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
      {/* Header */}
      <div className="flex" style={{ padding: "var(--space-3) var(--space-4)", gap: "var(--space-4)", backgroundColor: "var(--table-header-bg)" }}>
        {Array.from({ length: cols }).map((_, i) => (
          <HxSkeleton key={`h-${i}`} variant="text" width={`${60 + Math.random() * 40}%`} height={12} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, row) => (
        <div key={`r-${row}`} className="flex border-t" style={{ padding: "var(--space-3) var(--space-4)", gap: "var(--space-4)", borderColor: "var(--border-subtle)" }}>
          {Array.from({ length: cols }).map((_, col) => (
            <HxSkeleton key={`c-${row}-${col}`} variant="text" width={`${50 + Math.random() * 50}%`} height={14} />
          ))}
        </div>
      ))}
    </div>
  )
}
