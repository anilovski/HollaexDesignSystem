import * as React from "react"
import { cn } from "./utils"
import { useReducedMotion } from "./use-reduced-motion"

export interface SkeletonCrossfadeProps {
  /** When true, show skeleton. When false, crossfade to children. */
  loading: boolean
  /** The skeleton to display while loading */
  skeleton: React.ReactNode
  /** The real content to display after loading */
  children: React.ReactNode
  /** Optional className for the wrapper */
  className?: string
  /**
   * CSS duration for the content reveal animation.
   * Accepts any CSS time value or a CSS variable reference.
   * @default "var(--duration-medium-2)"
   */
  duration?: string
  /**
   * CSS easing for the content reveal animation.
   * Accepts any CSS easing function or a CSS variable reference.
   * @default "var(--ease-emphasized-decelerate)"
   */
  easing?: string
  /**
   * CSS duration for the skeleton fade-out.
   * @default "var(--duration-short-4)"
   */
  exitDuration?: string
  /**
   * CSS easing for the skeleton fade-out.
   * @default "var(--ease-standard-accelerate)"
   */
  exitEasing?: string
  /**
   * Whether to apply a blur-to-sharp effect on reveal.
   * Disabled automatically when the user prefers reduced motion.
   * @default true
   */
  blur?: boolean
}

/**
 * SkeletonCrossfade — wraps a skeleton placeholder and real content,
 * applying a blur-to-sharp crossfade transition when loading completes.
 *
 * All timing is driven by CSS variables so your team can adjust
 * the feel by editing the design-system tokens alone.
 */
export function SkeletonCrossfade({
  loading,
  skeleton,
  children,
  className,
  duration = "var(--duration-medium-2)",
  easing = "var(--ease-emphasized-decelerate)",
  exitDuration = "var(--duration-short-4)",
  exitEasing = "var(--ease-standard-accelerate)",
  blur = true,
}: SkeletonCrossfadeProps) {
  const [hasLoaded, setHasLoaded] = React.useState(!loading)
  const reducedMotion = useReducedMotion()

  React.useEffect(() => {
    if (!loading && !hasLoaded) setHasLoaded(true)
  }, [loading, hasLoaded])

  /* When reduced motion is on, skip blur regardless of prop */
  const effectiveBlur = blur && !reducedMotion

  /* Build custom animation inline —
     uses hx-skeleton-crossfade (with blur) or a simpler opacity-only fade */
  const revealAnimation = effectiveBlur
    ? `hx-skeleton-crossfade ${duration} ${easing} both`
    : `hx-skeleton-crossfade-no-blur ${duration} ${easing} both`

  return (
    <div className={cn("relative", className)}>
      {/* Skeleton layer */}
      <div
        style={{
          transition: `opacity ${exitDuration} ${exitEasing}`,
          opacity: loading ? 1 : 0,
          pointerEvents: loading ? "auto" : "none",
          position: loading ? "relative" : "absolute",
          inset: loading ? undefined : 0,
        }}
      >
        {skeleton}
      </div>

      {/* Content layer — only render after first load */}
      {hasLoaded && (
        <div style={{ animation: revealAnimation }}>
          {children}
        </div>
      )}
    </div>
  )
}