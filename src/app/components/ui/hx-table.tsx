import * as React from "react";
import { cn } from "./utils";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════ */

export type SortDirection = "asc" | "desc" | null;

export interface HxColumnDef<T> {
  /** Unique key matching a property in the data row */
  id: string;
  /** Display header label */
  header: string;
  /** Optional custom cell renderer */
  cell?: (row: T, rowIndex: number) => React.ReactNode;
  /** Column min-width */
  minWidth?: number;
  /** Column width (CSS string) */
  width?: string;
  /** Right-align content */
  align?: "left" | "center" | "right";
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Pin this column to the left – typically only the first column */
  sticky?: boolean;
  /** Render cell values in monospace (tabular nums) for numeric data */
  numeric?: boolean;
}

export interface HxTableProps<T> {
  columns: HxColumnDef<T>[];
  data: T[];
  /** Row key accessor – defaults to index */
  rowKey?: (row: T, index: number) => string | number;
  /** Show striped rows */
  striped?: boolean;
  /** Show hover highlight on rows */
  hoverable?: boolean;
  /** Dense padding variant */
  dense?: boolean;
  /** Show borders between cells */
  bordered?: boolean;
  /** Current sort column id (controlled) */
  sortColumn?: string | null;
  /** Current sort direction (controlled) */
  sortDirection?: SortDirection;
  /** Sort change callback */
  onSort?: (columnId: string, direction: SortDirection) => void;
  /** Row selection */
  selectedRows?: Set<string | number>;
  onRowSelect?: (key: string | number, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  /** Loading skeleton rows */
  loading?: boolean;
  loadingRows?: number;
  /** Max height before vertical scroll (the header stays sticky) */
  maxHeight?: string;
  /** Optional className for the outer wrapper */
  className?: string;
}

/* ═══════════════════════════════════════════════════════
   Pagination
   ═══════════════════════════════════════════════════════ */

export interface HxTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Items info */
  totalItems?: number;
  pageSize?: number;
  /** Sibling count around current page */
  siblingCount?: number;
  className?: string;
}

function generatePageNumbers(
  current: number,
  total: number,
  siblings: number
): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  pages.push(1);
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  if (total > 1) pages.push(total);
  return pages;
}

export function HxTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  siblingCount = 1,
  className,
}: HxTablePaginationProps) {
  const pages = generatePageNumbers(currentPage, totalPages, siblingCount);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const btnBase: React.CSSProperties = {
    fontFamily: "var(--font-family-mono)",
    fontSize: "var(--text-label)",
    fontWeight: "var(--font-weight-medium)",
    fontVariantNumeric: "tabular-nums",
    lineHeight: "1",
  };

  const hasItemInfo = totalItems !== undefined && pageSize !== undefined;
  const rangeStart = hasItemInfo ? Math.min((currentPage - 1) * pageSize! + 1, totalItems!) : 0;
  const rangeEnd = hasItemInfo ? Math.min(currentPage * pageSize!, totalItems!) : 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 flex-wrap",
        className
      )}
      style={{ fontFamily: "var(--font-family-supreme)" }}
    >
      {/* Items info / Page label */}
      <span
        style={{
          fontSize: "var(--text-label)",
          color: "var(--table-pagination-fg)",
          fontFamily: "var(--font-family-supreme)",
          whiteSpace: "nowrap",
        }}
      >
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

      {/* Page controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={isFirst}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center size-8 rounded-[var(--radius-button)] cursor-pointer disabled:cursor-not-allowed"
          style={{
            color: isFirst
              ? "var(--table-pagination-disabled-fg)"
              : "var(--table-pagination-fg)",
            backgroundColor: "transparent",
            border: "1px solid var(--border-subtle)",
            transition: "background var(--motion-hover), border-color var(--motion-hover)",
          }}
          onMouseEnter={e => { if (!isFirst) { e.currentTarget.style.backgroundColor = "var(--table-pagination-hover-bg)"; e.currentTarget.style.borderColor = "var(--border)" } }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "var(--border-subtle)" }}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex items-center justify-center size-8"
              style={{
                color: "var(--table-pagination-fg)",
                fontSize: "var(--text-label)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className="flex items-center justify-center size-8 rounded-[var(--radius-button)] cursor-pointer"
              style={{
                ...btnBase,
                backgroundColor:
                  p === currentPage
                    ? "var(--table-pagination-active-bg)"
                    : "transparent",
                color:
                  p === currentPage
                    ? "var(--table-pagination-active-fg)"
                    : "var(--table-pagination-fg)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                if (p !== currentPage) {
                  e.currentTarget.style.backgroundColor =
                    "var(--table-pagination-hover-bg)";
                }
              }}
              onMouseLeave={(e) => {
                if (p !== currentPage) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          type="button"
          disabled={isLast}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center size-8 rounded-[var(--radius-button)] cursor-pointer disabled:cursor-not-allowed"
          style={{
            color: isLast
              ? "var(--table-pagination-disabled-fg)"
              : "var(--table-pagination-fg)",
            backgroundColor: "transparent",
            border: "1px solid var(--border-subtle)",
            transition: "background var(--motion-hover), border-color var(--motion-hover)",
          }}
          onMouseEnter={e => { if (!isLast) { e.currentTarget.style.backgroundColor = "var(--table-pagination-hover-bg)"; e.currentTarget.style.borderColor = "var(--border)" } }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "var(--border-subtle)" }}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HxTable
   ═══════════════════════════════════════════════════════ */

export function HxTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  striped = false,
  hoverable = true,
  dense = false,
  bordered = false,
  sortColumn,
  sortDirection,
  onSort,
  selectedRows,
  onRowSelect,
  onSelectAll,
  loading = false,
  loadingRows = 5,
  maxHeight,
  className,
}: HxTableProps<T>) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Track horizontal scroll to show/hide sticky column shadow
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => setIsScrolled(el.scrollLeft > 0);
    el.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const cellPadY = dense
    ? "6px"
    : "var(--table-cell-padding-y)";
  const cellPadX = "var(--table-cell-padding-x)";

  const hasSelection = !!onRowSelect;
  const allKeys = data.map((row, i) =>
    rowKey ? rowKey(row, i) : i
  );
  const allSelected =
    hasSelection &&
    selectedRows &&
    allKeys.length > 0 &&
    allKeys.every((k) => selectedRows.has(k));
  const someSelected =
    hasSelection &&
    selectedRows &&
    allKeys.some((k) => selectedRows.has(k)) &&
    !allSelected;

  // Find sticky column (first one marked sticky, or auto-detect first)
  const stickyColIdx = columns.findIndex((c) => c.sticky);
  const hasStickyCol = stickyColIdx >= 0;
  // Calculate offset for the sticky column – if there's a checkbox column it adds width
  const checkboxColWidth = 44;

  const handleSort = (colId: string) => {
    if (!onSort) return;
    if (sortColumn === colId) {
      if (sortDirection === "asc") onSort(colId, "desc");
      else if (sortDirection === "desc") onSort(colId, null);
      else onSort(colId, "asc");
    } else {
      onSort(colId, "asc");
    }
  };

  const renderSortIcon = (col: HxColumnDef<T>) => {
    if (!col.sortable) return null;
    const isActive = sortColumn === col.id;
    return (
      <span className="inline-flex ml-1 shrink-0">
        {isActive && sortDirection === "asc" ? (
          <ArrowUp size={12} />
        ) : isActive && sortDirection === "desc" ? (
          <ArrowDown size={12} />
        ) : (
          <ArrowUpDown
            size={12}
            style={{ opacity: 0.4 }}
          />
        )}
      </span>
    );
  };

  /* ── skeleton row ─────────────── */
  const renderSkeletonRows = () =>
    Array.from({ length: loadingRows }).map((_, ri) => (
      <tr
        key={`skel-${ri}`}
        style={{
          backgroundColor: striped && ri % 2 === 1
            ? "var(--table-row-striped-bg)"
            : "var(--table-row-bg)",
        }}
      >
        {hasSelection && (
          <td
            style={{
              padding: `${cellPadY} ${cellPadX}`,
              borderBottom: "1px solid var(--table-border)",
            }}
          >
            <div
              className="size-4 rounded-[2px] hx-shimmer"
            />
          </td>
        )}
        {columns.map((col, ci) => (
          <td
            key={col.id}
            style={{
              padding: `${cellPadY} ${cellPadX}`,
              borderBottom: "1px solid var(--table-border)",
              ...(bordered
                ? {
                    borderRight:
                      ci < columns.length - 1
                        ? "1px solid var(--table-border)"
                        : undefined,
                  }
                : {}),
              ...(hasStickyCol && ci === stickyColIdx
                ? {
                    position: "sticky" as const,
                    left: hasSelection ? `${checkboxColWidth}px` : "0px",
                    zIndex: 1,
                    backgroundColor: striped && ri % 2 === 1
                      ? "var(--table-row-striped-bg)"
                      : "var(--table-row-bg)",
                    boxShadow: isScrolled
                      ? "var(--table-sticky-shadow)"
                      : "none",
                  }
                : {}),
            }}
          >
            <div
              className="h-4 rounded hx-shimmer"
              style={{
                width: ci === 0 ? "60%" : "40%",
              }}
            />
          </td>
        ))}
      </tr>
    ));

  return (
    <div
      className={cn("w-full rounded-[var(--radius-card)] border overflow-hidden", className)}
      style={{
        borderColor: "var(--table-border)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto"
        style={{
          maxHeight: maxHeight ?? undefined,
          overflowY: maxHeight ? "auto" : undefined,
        }}
      >
        <table
          className="w-full border-collapse"
          style={{ minWidth: "100%", fontFamily: "var(--font-family-supreme)" }}
        >
          {/* ── THEAD ─────────────────────────────── */}
          <thead>
            <tr
              style={{
                backgroundColor: "var(--table-header-bg)",
                position: maxHeight ? ("sticky" as const) : undefined,
                top: maxHeight ? 0 : undefined,
                zIndex: maxHeight ? 3 : undefined,
              }}
            >
              {/* Selection checkbox header */}
              {hasSelection && (
                <th
                  style={{
                    padding: `var(--table-header-padding-y) ${cellPadX}`,
                    borderBottom: "1px solid var(--table-border)",
                    width: `${checkboxColWidth}px`,
                    textAlign: "center",
                    backgroundColor: "var(--table-header-bg)",
                    ...(maxHeight
                      ? {
                          position: "sticky" as const,
                          top: 0,
                          zIndex: 4,
                        }
                      : {}),
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = !!someSelected;
                    }}
                    onChange={(e) => onSelectAll?.(e.target.checked)}
                    className="size-4 cursor-pointer"
                    style={{ accentColor: "var(--brand-default)" }}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col, ci) => {
                const isStickyCol = hasStickyCol && ci === stickyColIdx;
                return (
                  <th
                    key={col.id}
                    onClick={
                      col.sortable ? () => handleSort(col.id) : undefined
                    }
                    className={cn(
                      col.sortable && "cursor-pointer select-none"
                    )}
                    style={{
                      padding: `var(--table-header-padding-y) ${cellPadX}`,
                      borderBottom: "1px solid var(--table-border)",
                      textAlign: col.align ?? "left",
                      fontSize: "12px",
                      fontWeight: "var(--font-weight-medium)",
                      fontFamily: "var(--font-family-supreme)",
                      color: "var(--table-header-fg)",
                      letterSpacing: "0.03em",
                      textTransform: "uppercase" as const,
                      whiteSpace: "nowrap" as const,
                      minWidth: col.minWidth
                        ? `${col.minWidth}px`
                        : undefined,
                      width: col.width ?? undefined,
                      ...(bordered && ci < columns.length - 1
                        ? {
                            borderRight:
                              "1px solid var(--table-border)",
                          }
                        : {}),
                      ...(isStickyCol
                        ? {
                            position: "sticky" as const,
                            left: hasSelection
                              ? `${checkboxColWidth}px`
                              : "0px",
                            zIndex: maxHeight ? 5 : 2,
                            backgroundColor: "var(--table-header-bg)",
                            boxShadow: isScrolled
                              ? "var(--table-sticky-shadow)"
                              : "none",
                          }
                        : {}),
                    }}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {col.header}
                      {renderSortIcon(col)}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* ── TBODY ─────────────────────────────── */}
          <tbody>
            {loading
              ? renderSkeletonRows()
              : data.map((row, ri) => {
                  const key = rowKey ? rowKey(row, ri) : ri;
                  const isSelected = selectedRows?.has(key);
                  const rowBg = isSelected
                    ? "var(--table-row-selected-bg)"
                    : striped && ri % 2 === 1
                    ? "var(--table-row-striped-bg)"
                    : "var(--table-row-bg)";

                  return (
                    <tr
                      key={key}
                      data-state={isSelected ? "selected" : undefined}
                      className={cn(
                        hoverable && "transition-colors"
                      )}
                      style={{ backgroundColor: rowBg }}
                      onMouseEnter={(e) => {
                        if (hoverable && !isSelected)
                          e.currentTarget.style.backgroundColor =
                            "var(--table-row-hover-bg)";
                      }}
                      onMouseLeave={(e) => {
                        if (hoverable)
                          e.currentTarget.style.backgroundColor = rowBg;
                      }}
                    >
                      {/* Selection checkbox */}
                      {hasSelection && (
                        <td
                          style={{
                            padding: `${cellPadY} ${cellPadX}`,
                            borderBottom:
                              ri < data.length - 1
                                ? "1px solid var(--table-border)"
                                : undefined,
                            textAlign: "center",
                            width: `${checkboxColWidth}px`,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={(e) =>
                              onRowSelect?.(key, e.target.checked)
                            }
                            className="size-4 cursor-pointer"
                            style={{
                              accentColor: "var(--brand-default)",
                            }}
                            aria-label={`Select row ${ri + 1}`}
                          />
                        </td>
                      )}

                      {columns.map((col, ci) => {
                        const isStickyCol =
                          hasStickyCol && ci === stickyColIdx;

                        // Determine sticky column bg on hover/select
                        const stickyBg = isSelected
                          ? "var(--table-row-selected-bg)"
                          : striped && ri % 2 === 1
                          ? "var(--table-row-striped-bg)"
                          : "var(--table-row-bg)";

                        return (
                          <td
                            key={col.id}
                            style={{
                              padding: `${cellPadY} ${cellPadX}`,
                              borderBottom:
                                ri < data.length - 1
                                  ? "1px solid var(--table-border)"
                                  : undefined,
                              textAlign: col.align ?? "left",
                              fontSize: "var(--text-label)",
                              fontFamily: col.numeric
                                ? "var(--font-family-mono)"
                                : "var(--font-family-supreme)",
                              fontVariantNumeric: col.numeric
                                ? "tabular-nums"
                                : undefined,
                              letterSpacing: col.numeric
                                ? "-0.01em"
                                : undefined,
                              color: "var(--table-cell-fg)",
                              whiteSpace: "nowrap" as const,
                              minWidth: col.minWidth
                                ? `${col.minWidth}px`
                                : undefined,
                              width: col.width ?? undefined,
                              ...(bordered && ci < columns.length - 1
                                ? {
                                    borderRight:
                                      "1px solid var(--table-border)",
                                  }
                                : {}),
                              ...(isStickyCol
                                ? {
                                    position: "sticky" as const,
                                    left: hasSelection
                                      ? `${checkboxColWidth}px`
                                      : "0px",
                                    zIndex: 1,
                                    backgroundColor: stickyBg,
                                    boxShadow: isScrolled
                                      ? "var(--table-sticky-shadow)"
                                      : "none",
                                    transition:
                                      "box-shadow 150ms ease",
                                  }
                                : {}),
                            }}
                            onMouseEnter={
                              isStickyCol && hoverable && !isSelected
                                ? (e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "var(--table-row-hover-bg)";
                                  }
                                : undefined
                            }
                            onMouseLeave={
                              isStickyCol && hoverable
                                ? (e) => {
                                    e.currentTarget.style.backgroundColor =
                                      stickyBg;
                                  }
                                : undefined
                            }
                          >
                            {col.cell
                              ? col.cell(row, ri)
                              : (row[col.id] as React.ReactNode) ??
                                "—"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

            {/* Empty state */}
            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={
                    columns.length + (hasSelection ? 1 : 0)
                  }
                  style={{
                    padding: "48px 24px",
                    textAlign: "center",
                    color: "var(--color-text-tertiary)",
                    fontSize: "var(--text-label)",
                    fontFamily: "var(--font-family-supreme)",
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}