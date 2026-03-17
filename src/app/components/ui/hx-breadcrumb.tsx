import * as React from "react"
import { ChevronRight, Slash, MoreHorizontal } from "lucide-react"
import { cn } from "./utils"

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface HxBreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: "chevron" | "slash" | "dot"
  maxItems?: number
  size?: "sm" | "md" | "lg"
}

const SEP_ICONS = {
  chevron: (s: number) => <ChevronRight size={s} />,
  slash: (s: number) => <Slash size={s} />,
  dot: (_s: number) => <span aria-hidden>&middot;</span>,
}

const SIZES: Record<string, { fontSize: string; iconSize: number; gap: string }> = {
  sm: { fontSize: "var(--text-caption)", iconSize: 12, gap: "var(--space-1)" },
  md: { fontSize: "var(--text-body-sm)", iconSize: 14, gap: "var(--space-2)" },
  lg: { fontSize: "var(--text-body)", iconSize: 16, gap: "var(--space-2)" },
}

export function HxBreadcrumb({
  items,
  separator = "chevron",
  maxItems,
  size = "md",
}: HxBreadcrumbProps) {
  const s = SIZES[size]
  const [expanded, setExpanded] = React.useState(false)

  let visibleItems = items
  const showCollapse = maxItems && maxItems > 2 && items.length > maxItems && !expanded

  if (showCollapse) {
    visibleItems = [items[0], { label: "..." }, ...items.slice(items.length - (maxItems - 2))]
  }

  return (
    <nav aria-label="Breadcrumb" style={{ fontFamily: "var(--font-family-supreme)" }}>
      <ol className="flex items-center flex-wrap" style={{ gap: s.gap, listStyle: "none", margin: 0, padding: 0 }}>
        {visibleItems.map((item, idx) => {
          const isLast = idx === visibleItems.length - 1
          const isEllipsis = item.label === "..."

          return (
            <React.Fragment key={idx}>
              <li className="flex items-center">
                {isEllipsis ? (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="flex items-center justify-center rounded cursor-pointer"
                    style={{
                      width: 24, height: 24,
                      color: "var(--color-text-tertiary)",
                      backgroundColor: "transparent",
                      border: "none",
                      transition: "background var(--motion-hover)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--secondary-subtle)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                    aria-label="Show all breadcrumbs"
                  >
                    <MoreHorizontal size={s.iconSize} />
                  </button>
                ) : isLast ? (
                  <span
                    aria-current="page"
                    style={{
                      fontSize: s.fontSize,
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-family-supreme)",
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="cursor-pointer"
                    style={{
                      fontSize: s.fontSize,
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-family-supreme)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      transition: "color var(--motion-hover)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-primary)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-tertiary)"}
                  >
                    {item.label}
                  </button>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="flex items-center" style={{ color: "var(--color-text-disabled)" }}>
                  {SEP_ICONS[separator](s.iconSize)}
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
