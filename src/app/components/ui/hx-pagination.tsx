import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "./utils"

/* ── Types ──────────────────────────────────────────── */

export interface HxPaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  /** Total item count — enables "1–10 of 200" label */
  totalItems?: number
  /** Items per page — used with totalItems for the range label */
  pageSize?: number
  /** How many page numbers appear on each side of the current page */
  siblingCount?: number
  /** Show the "Go to page" dropdown selector */
  showPageSelect?: boolean
  /** Show the "Page X of Y" label */
  showPageLabel?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

/* ── Helpers ─────────────────────────────────────────── */

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function buildPageRange(totalPages: number, currentPage: number, siblingCount: number): (number | "dots")[] {
  const totalSlots = siblingCount * 2 + 5
  if (totalSlots >= totalPages) return range(1, totalPages)

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPages)
  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < totalPages - 1

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount
    return [...range(1, leftCount), "dots", totalPages]
  }
  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount
    return [1, "dots", ...range(totalPages - rightCount + 1, totalPages)]
  }
  return [1, "dots", ...range(leftSibling, rightSibling), "dots", totalPages]
}

/* ── Size tokens ─────────────────────────────────────── */

const SIZES: Record<string, { height: number; minWidth: number; fontSize: string; iconSize: number }> = {
  sm: { height: 28, minWidth: 28, fontSize: "var(--text-caption)", iconSize: 14 },
  md: { height: 32, minWidth: 32, fontSize: "var(--text-body-sm)", iconSize: 16 },
  lg: { height: 36, minWidth: 36, fontSize: "var(--text-body)", iconSize: 16 },
}

/* ── Component ───────────────────────────────────────── */

export function HxPagination({
  totalPages,
  currentPage,
  onPageChange,
  totalItems,
  pageSize,
  siblingCount = 1,
  showPageSelect = true,
  showPageLabel = true,
  size = "md",
  className,
}: HxPaginationProps) {
  const pages = buildPageRange(totalPages, currentPage, siblingCount)
  const s = SIZES[size]
  const canPrev = currentPage > 1
  const canNext = currentPage < totalPages

  /* Item range label: "1–10 of 200" */
  const hasItemInfo = totalItems !== undefined && pageSize !== undefined
  const rangeStart = hasItemInfo ? Math.min((currentPage - 1) * pageSize! + 1, totalItems!) : 0
  const rangeEnd = hasItemInfo ? Math.min(currentPage * pageSize!, totalItems!) : 0

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-between flex-wrap", className)}
      style={{ gap: "var(--space-4)", fontFamily: "var(--font-family-supreme)" }}
    >
      {/* ── Left: Page label ──────────────────────────── */}
      <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
        {showPageLabel && (
          <span style={{
            fontSize: s.fontSize,
            color: "var(--table-pagination-fg)",
            fontFamily: "var(--font-family-supreme)",
            whiteSpace: "nowrap",
          }}>
            {hasItemInfo ? (
              <>
                <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>
                  {rangeStart}–{rangeEnd}
                </span>
                {" "}of{" "}
                <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>
                  {totalItems}
                </span>
              </>
            ) : (
              <>
                Page{" "}
                <span style={{ fontWeight: "var(--font-weight-semibold)", fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>
                  {currentPage}
                </span>
                {" "}of{" "}
                <span style={{ fontFamily: "var(--font-family-mono)", fontVariantNumeric: "tabular-nums" }}>
                  {totalPages}
                </span>
              </>
            )}
          </span>
        )}
      </div>

      {/* ── Center: Prev / Pages / Next ───────────────── */}
      <div className="flex items-center" style={{ gap: "var(--space-1)" }}>
        {/* Previous */}
        <NavButton disabled={!canPrev} onClick={() => onPageChange(currentPage - 1)} s={s} aria-label="Previous page">
          <ChevronLeft size={s.iconSize} />
        </NavButton>

        {/* Page numbers */}
        {pages.map((page, idx) =>
          page === "dots" ? (
            <span
              key={`dots-${idx}`}
              className="flex items-center justify-center select-none"
              style={{
                minWidth: s.minWidth,
                height: s.height,
                fontSize: s.fontSize,
                color: "var(--color-text-tertiary)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              ...
            </span>
          ) : (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
              s={s}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </PageButton>
          )
        )}

        {/* Next */}
        <NavButton disabled={!canNext} onClick={() => onPageChange(currentPage + 1)} s={s} aria-label="Next page">
          <ChevronRight size={s.iconSize} />
        </NavButton>
      </div>

      {/* ── Right: Go-to-page dropdown ────────────────── */}
      {showPageSelect && totalPages > 1 && (
        <PageSelectDropdown
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          s={s}
        />
      )}
    </nav>
  )
}

/* ── Nav arrow button ─────────────────────────────────── */

function NavButton({
  children,
  disabled,
  onClick,
  s,
  ...rest
}: {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  s: typeof SIZES["md"]
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center select-none cursor-pointer disabled:cursor-not-allowed rounded-[var(--radius-button)]"
      style={{
        width: s.height,
        height: s.height,
        color: disabled ? "var(--table-pagination-disabled-fg)" : "var(--table-pagination-fg)",
        backgroundColor: "transparent",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-button)",
        transition: "background var(--motion-hover), border-color var(--motion-hover)",
        fontFamily: "var(--font-family-supreme)",
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.backgroundColor = "var(--table-pagination-hover-bg)"; e.currentTarget.style.borderColor = "var(--border)" } }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "var(--border-subtle)" }}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ── Page number button ───────────────────────────────── */

function PageButton({
  children,
  active,
  onClick,
  s,
  ...rest
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  s: typeof SIZES["md"]
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center select-none cursor-pointer"
      style={{
        minWidth: s.minWidth,
        height: s.height,
        fontSize: s.fontSize,
        fontWeight: active ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
        color: active ? "var(--table-pagination-active-fg)" : "var(--table-pagination-fg)",
        backgroundColor: active ? "var(--table-pagination-active-bg)" : "transparent",
        border: "none",
        borderRadius: "var(--radius-button)",
        fontFamily: "var(--font-family-mono)",
        fontVariantNumeric: "tabular-nums",
        transition: "background var(--motion-hover), color var(--motion-hover)",
        padding: `0 var(--space-1)`,
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = "var(--table-pagination-hover-bg)" }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = "transparent" }}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ── Go-to-page dropdown ──────────────────────────────── */

function PageSelectDropdown({
  currentPage,
  totalPages,
  onPageChange,
  s,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  s: typeof SIZES["md"]
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [])

  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (open && listRef.current) {
      const activeEl = listRef.current.querySelector("[data-active='true']")
      if (activeEl) activeEl.scrollIntoView({ block: "center" })
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center cursor-pointer"
        style={{
          height: s.height,
          padding: `0 var(--space-3)`,
          gap: "var(--space-2)",
          fontSize: s.fontSize,
          color: "var(--table-pagination-fg)",
          backgroundColor: "transparent",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-button)",
          fontFamily: "var(--font-family-supreme)",
          transition: "border-color var(--motion-hover)",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border)"}
        onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = "var(--border-subtle)" }}
      >
        <span>Go to</span>
        <span style={{ fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-semibold)", fontVariantNumeric: "tabular-nums" }}>
          {currentPage}
        </span>
        <ChevronDown
          size={14}
          style={{
            color: "var(--color-text-tertiary)",
            transition: "transform var(--motion-hover)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute z-50 border overflow-y-auto"
          style={{
            bottom: "calc(100% + 4px)",
            right: 0,
            minWidth: 64,
            maxHeight: 200,
            backgroundColor: "var(--card)",
            borderColor: "var(--border-subtle)",
            borderRadius: "var(--radius-sm2)",
            boxShadow: "var(--modal-shadow)",
            padding: "var(--space-1)",
            animation: "toast-enter 180ms var(--ease-emphasized-decelerate) forwards",
          }}
        >
          {range(1, totalPages).map(p => (
            <button
              key={p}
              type="button"
              data-active={p === currentPage}
              onClick={() => { onPageChange(p); setOpen(false) }}
              className="w-full flex items-center justify-center cursor-pointer"
              style={{
                height: s.height,
                minWidth: 48,
                fontSize: s.fontSize,
                fontFamily: "var(--font-family-mono)",
                fontVariantNumeric: "tabular-nums",
                fontWeight: p === currentPage ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
                color: p === currentPage ? "var(--table-pagination-active-fg)" : "var(--table-pagination-fg)",
                backgroundColor: p === currentPage ? "var(--table-pagination-active-bg)" : "transparent",
                border: "none",
                borderRadius: "var(--radius-xs)",
                transition: "background var(--motion-hover)",
                padding: `0 var(--space-2)`,
              }}
              onMouseEnter={e => { if (p !== currentPage) e.currentTarget.style.backgroundColor = "var(--table-pagination-hover-bg)" }}
              onMouseLeave={e => { if (p !== currentPage) e.currentTarget.style.backgroundColor = "transparent" }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
