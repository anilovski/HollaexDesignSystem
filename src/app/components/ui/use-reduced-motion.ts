import { useState, useEffect } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

/**
 * useReducedMotion — returns `true` when the user's OS-level
 * accessibility setting requests reduced motion.
 *
 * Use this hook to conditionally skip JS-driven animations
 * (setTimeout chains, requestAnimationFrame loops, state-driven
 * glow pulses, etc.) that CSS `prefers-reduced-motion` cannot reach.
 *
 * CSS-only animations are already handled by the global
 * `@media (prefers-reduced-motion: reduce)` block in theme.css.
 *
 * @example
 * ```tsx
 * const reduced = useReducedMotion()
 * // Skip the JS glow timeout when motion is reduced
 * if (!reduced) setGlowing(true)
 * ```
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  return reduced
}
