import { useState, useEffect, useRef, createContext, useContext, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "./utils";
import { ChevronDown } from "lucide-react";
import { useScrollbar } from "./use-scrollbar";

/** @refresh reset */

/* ── Types ─────────────────────────────────────── */

export type SideNavItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: SideNavItem[];
};

export type SideNavSection = {
  title?: string;
  items: SideNavItem[];
};

export type SideNavProps = {
  sections: SideNavSection[];
  stickyBottomSections?: SideNavSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsed?: boolean;
  variant?: "white" | "gray";
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

/* ── Context ───────────────────────────────────── */

type SideNavCtx = {
  activeId: string;
  onSelect: (id: string) => void;
  collapsed: boolean;
  variant: "white" | "gray";
};

const Ctx = createContext<SideNavCtx>({
  activeId: "",
  onSelect: () => {},
  collapsed: false,
  variant: "white",
});

/* ── Flyout panel for collapsed parent items ───── */

function CollapsedFlyout({
  item,
  anchorRect,
  onClose,
}: {
  item: SideNavItem;
  anchorRect: DOMRect;
  onClose: () => void;
}) {
  const { activeId, onSelect, variant } = useContext(Ctx);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const hoverBg = variant === "gray" ? "var(--accordion-gray-hover-bg)" : "var(--accordion-white-hover-bg)";

  /* Position: right of anchor, aligned to top */
  const top = anchorRect.top;
  const left = anchorRect.right + 8;

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler, true);
    return () => document.removeEventListener("mousedown", handler, true);
  }, [onClose]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div
      ref={flyoutRef}
      className="fixed z-[9999] rounded-[var(--radius-card)] py-[6px]"
      style={{
        top,
        left,
        minWidth: "180px",
        backgroundColor: "var(--background)",
        border: "1px solid var(--color-border-subtle)",
        boxShadow: "0 4px 20px -4px rgb(0 0 0 / 0.10), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
        fontFamily: "var(--font-family-supreme)",
        animation: "flyout-enter 0.15s ease-out forwards",
      }}
      role="menu"
      aria-label={item.label}
    >
      {/* Parent label header */}
      <div
        className="px-[12px] py-[6px]"
        style={{
          fontSize: "10px",
          fontWeight: "var(--font-weight-bold)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
          fontFamily: "var(--font-family-supreme)",
        }}
      >
        {item.label}
      </div>

      {/* Child items */}
      {item.children?.map((child) => {
        const isChildActive = activeId === child.id;
        return (
          <button
            key={child.id}
            type="button"
            role="menuitem"
            disabled={child.disabled}
            className={cn(
              "flex items-center w-full gap-[8px] px-[12px] py-[8px] text-left transition-colors duration-100 outline-none",
              child.disabled && "opacity-40 cursor-not-allowed",
              !child.disabled && "cursor-pointer",
            )}
            style={{
              backgroundColor: isChildActive ? "var(--brand-subtle)" : undefined,
              fontFamily: "var(--font-family-supreme)",
            }}
            onMouseEnter={(e) => {
              if (!isChildActive && !child.disabled)
                e.currentTarget.style.backgroundColor = hoverBg;
            }}
            onMouseLeave={(e) => {
              if (!isChildActive)
                e.currentTarget.style.backgroundColor = "transparent";
            }}
            onClick={() => {
              if (child.disabled) return;
              onSelect(child.id);
              onClose();
            }}
          >
            {/* Active dot */}
            {isChildActive && (
              <span
                className="shrink-0 rounded-full"
                style={{
                  width: "5px",
                  height: "5px",
                  backgroundColor: "var(--brand-default)",
                }}
              />
            )}
            <span
              className="truncate"
              style={{
                fontSize: "var(--text-label)",
                fontWeight: isChildActive
                  ? "var(--font-weight-medium)"
                  : "var(--font-weight-regular)",
                color: isChildActive
                  ? "var(--brand-default)"
                  : "var(--color-text-primary)",
                fontFamily: "var(--font-family-supreme)",
                marginLeft: isChildActive ? undefined : "13px",
              }}
            >
              {child.label}
            </span>
            {/* Badge */}
            {child.badge !== undefined && (
              <span
                className="shrink-0 ml-auto flex items-center justify-center rounded-full"
                style={{
                  minWidth: "18px",
                  height: "18px",
                  padding: "0 5px",
                  fontSize: "10px",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: isChildActive
                    ? "var(--brand-default)"
                    : "var(--color-border-subtle)",
                  color: isChildActive
                    ? "var(--brand-fg)"
                    : "var(--color-text-secondary)",
                  fontFamily: "var(--font-family-supreme)",
                }}
              >
                {child.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>,
    document.body,
  );
}

/* ── NavItem (recursive, supports nesting) ─────── */

function NavItemRow({ item, depth = 0 }: { item: SideNavItem; depth?: number }) {
  const { activeId, onSelect, collapsed, variant } = useContext(Ctx);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;
  /* Check if any child is active (for parent highlight in collapsed mode) */
  const hasActiveChild = hasChildren && item.children!.some((c) => c.id === activeId);
  const [expanded, setExpanded] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const [flyoutAnchor, setFlyoutAnchor] = useState<DOMRect | null>(null);

  /* Hover / active colours derived from CSS variables */
  const activeBg = "var(--brand-subtle)";
  const hoverBg = variant === "gray" ? "var(--accordion-gray-hover-bg)" : "var(--accordion-white-hover-bg)";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (item.disabled) return;
    if (hasChildren) {
      if (collapsed) {
        /* Toggle flyout for collapsed parent */
        if (flyoutAnchor) {
          setFlyoutAnchor(null);
        } else {
          const rect = e.currentTarget.getBoundingClientRect();
          setFlyoutAnchor(rect);
          setTooltipPos(null); /* hide tooltip while flyout is open */
        }
      } else {
        setExpanded((v) => !v);
      }
    } else {
      onSelect(item.id);
    }
  };

  const showTooltip = (el: HTMLButtonElement) => {
    if (!collapsed || flyoutAnchor) return; /* don't show tooltip when flyout is open */
    const rect = el.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
  };

  const hideTooltip = () => setTooltipPos(null);

  /* Close flyout when expanding out of collapsed mode */
  useEffect(() => {
    if (!collapsed) setFlyoutAnchor(null);
  }, [collapsed]);

  const showHighlight = isActive || hasActiveChild;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={item.disabled}
        aria-label={collapsed ? item.label : undefined}
        aria-haspopup={collapsed && hasChildren ? "menu" : undefined}
        aria-expanded={collapsed && hasChildren ? !!flyoutAnchor : expanded || undefined}
        className={cn(
          "group relative flex items-center w-full gap-[10px] rounded-[var(--radius)] transition-colors duration-100 outline-none select-none",
          collapsed ? "justify-center px-0 py-[10px]" : "px-[10px] py-[10px]",
          item.disabled && "opacity-40 cursor-not-allowed",
          !item.disabled && "cursor-pointer",
        )}
        style={{
          paddingLeft: collapsed ? undefined : `${10 + depth * 20}px`,
          backgroundColor: showHighlight ? activeBg : (flyoutAnchor ? hoverBg : undefined),
          fontFamily: "var(--font-family-supreme)",
        }}
        onMouseEnter={(e) => {
          if (!showHighlight && !item.disabled && !flyoutAnchor)
            e.currentTarget.style.backgroundColor = hoverBg;
          showTooltip(e.currentTarget);
        }}
        onMouseLeave={(e) => {
          if (!showHighlight && !flyoutAnchor)
            e.currentTarget.style.backgroundColor = "transparent";
          hideTooltip();
        }}
        onFocus={(e) => showTooltip(e.currentTarget)}
        onBlur={hideTooltip}
      >
        {/* Active indicator bar */}
        {showHighlight && !collapsed && (
          <span
            className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full"
            style={{ backgroundColor: "var(--brand-default)" }}
          />
        )}

        {/* Icon */}
        {item.icon && (
          <span
            className="shrink-0 flex items-center justify-center"
            style={{
              width: "20px",
              height: "20px",
              color: showHighlight
                ? "var(--brand-default)"
                : "var(--color-text-secondary)",
            }}
          >
            {item.icon}
          </span>
        )}

        {/* Label */}
        {!collapsed && (
          <span
            className="flex-1 text-left truncate"
            style={{
              fontSize: "var(--text-label)",
              fontWeight: showHighlight
                ? "var(--font-weight-medium)"
                : "var(--font-weight-regular)",
              color: showHighlight
                ? "var(--brand-default)"
                : "var(--color-text-primary)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            {item.label}
          </span>
        )}

        {/* Badge */}
        {!collapsed && item.badge !== undefined && (
          <span
            className="shrink-0 flex items-center justify-center rounded-full"
            style={{
              minWidth: "20px",
              height: "20px",
              padding: "0 6px",
              fontSize: "11px",
              fontWeight: "var(--font-weight-medium)",
              backgroundColor: showHighlight
                ? "var(--brand-default)"
                : "var(--color-border-subtle)",
              color: showHighlight
                ? "var(--brand-fg)"
                : "var(--color-text-secondary)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            {item.badge}
          </span>
        )}

        {/* Expand chevron */}
        {!collapsed && hasChildren && (
          <ChevronDown
            size={14}
            className={cn(
              "shrink-0 transition-transform duration-200",
              expanded && "rotate-180",
            )}
            style={{ color: "var(--color-text-tertiary)" }}
          />
        )}

        {/* Small dot indicator for collapsed parents with children */}
        {collapsed && hasChildren && (
          <span
            className="absolute"
            style={{
              bottom: "4px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: flyoutAnchor
                ? "var(--brand-default)"
                : "var(--color-text-tertiary)",
              opacity: flyoutAnchor ? 1 : 0.5,
              transition: "all 0.15s ease",
            }}
          />
        )}
      </button>

      {/* Children (expanded mode) */}
      {!collapsed && hasChildren && expanded && (
        <div className="flex flex-col">
          {item.children!.map((child) => (
            <NavItemRow key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}

      {/* Collapsed tooltip (portal) — only for leaf items */}
      {collapsed && !hasChildren && tooltipPos && createPortal(
        <span
          className="pointer-events-none fixed z-[9999] whitespace-nowrap rounded-[var(--radius)] px-[10px] py-[5px]"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: "translateY(-50%)",
            backgroundColor: "var(--color-text-primary)",
            color: "var(--background)",
            fontSize: "12px",
            fontWeight: "var(--font-weight-medium)",
            fontFamily: "var(--font-family-supreme)",
            boxShadow: "0 2px 8px -2px rgb(0 0 0 / 0.12)",
            animation: "tooltip-fade-in 0.15s ease-out forwards",
          }}
          role="tooltip"
        >
          {item.label}
        </span>,
        document.body,
      )}

      {/* Collapsed tooltip for parent items (when flyout is NOT open) */}
      {collapsed && hasChildren && !flyoutAnchor && tooltipPos && createPortal(
        <span
          className="pointer-events-none fixed z-[9999] whitespace-nowrap rounded-[var(--radius)] px-[10px] py-[5px]"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: "translateY(-50%)",
            backgroundColor: "var(--color-text-primary)",
            color: "var(--background)",
            fontSize: "12px",
            fontWeight: "var(--font-weight-medium)",
            fontFamily: "var(--font-family-supreme)",
            boxShadow: "0 2px 8px -2px rgb(0 0 0 / 0.12)",
            animation: "tooltip-fade-in 0.15s ease-out forwards",
          }}
          role="tooltip"
        >
          {item.label}
        </span>,
        document.body,
      )}

      {/* Collapsed flyout for parent items */}
      {collapsed && hasChildren && flyoutAnchor && (
        <CollapsedFlyout
          item={item}
          anchorRect={flyoutAnchor}
          onClose={() => setFlyoutAnchor(null)}
        />
      )}
    </>
  );
}

/* ── SideNav (main component) ──────────────────── */

export function SideNav({
  sections,
  stickyBottomSections,
  activeId = "",
  onSelect = () => {},
  collapsed = false,
  variant = "white",
  header,
  footer,
  className,
}: SideNavProps) {
  const bg =
    variant === "gray"
      ? "var(--accordion-gray-bg)"
      : "var(--background)";

  const scrollRef = useScrollbar<HTMLDivElement>();
  const [navOverflowing, setNavOverflowing] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setNavOverflowing(el.scrollTop + el.clientHeight < el.scrollHeight - 2);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [scrollRef]);

  return (
    <Ctx.Provider value={{ activeId, onSelect, collapsed, variant }}>
      <nav
        className={cn(
          "flex flex-col h-full border-r overflow-hidden",
          collapsed ? "w-[64px]" : "w-[248px]",
          "transition-[width] duration-200",
          className,
        )}
        style={{
          backgroundColor: bg,
          borderColor: "var(--border-layout)",
          fontFamily: "var(--font-family-supreme)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Header slot */}
        {header && (
          <div
            className="shrink-0 border-b"
            style={{ borderColor: "var(--color-border-subtle)" }}
          >
            {header}
          </div>
        )}

        {/* Sections */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto py-[12px] px-[8px] min-h-0">
          {sections.map((section, si) => (
            <div key={si} className={cn(si > 0 && "mt-[16px]")}>
              {/* Section title */}
              {section.title && !collapsed && (
                <div
                  className="px-[10px] pb-[6px]"
                  style={{
                    fontSize: "10px",
                    fontWeight: "var(--font-weight-bold)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-supreme)",
                  }}
                >
                  {section.title}
                </div>
              )}
              {collapsed && section.title && (
                <div
                  className="mx-auto mb-[6px]"
                  style={{
                    width: "24px",
                    height: "1px",
                    backgroundColor: "var(--color-border-subtle)",
                  }}
                />
              )}

              {/* Items */}
              <div className="flex flex-col gap-[2px]">
                {section.items.map((item) => (
                  <NavItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky bottom sections */}
        {stickyBottomSections && (
          <div
            className="shrink-0 relative z-10 px-[8px] pt-[12px] pb-[12px] transition-shadow duration-300 ease-out"
            style={{
              backgroundColor: bg,
              boxShadow: navOverflowing && hovered
                ? "0 -2px 12px -4px rgb(0 0 0 / 0.04), 0 -1px 4px -2px rgb(0 0 0 / 0.03)"
                : "none",
            }}
          >
            {stickyBottomSections.map((section, si) => (
              <div key={si} className={cn(si > 0 && "mt-[16px]")}>
                {/* Section title */}
                {section.title && !collapsed && (
                  <div
                    className="px-[10px] pb-[6px]"
                    style={{
                      fontSize: "10px",
                      fontWeight: "var(--font-weight-bold)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-family-supreme)",
                    }}
                  >
                    {section.title}
                  </div>
                )}
                {collapsed && section.title && (
                  <div
                    className="mx-auto mb-[6px]"
                    style={{
                      width: "24px",
                      height: "1px",
                      backgroundColor: "var(--color-border-subtle)",
                    }}
                  />
                )}

                {/* Items */}
                <div className="flex flex-col gap-[2px]">
                  {section.items.map((item) => (
                    <NavItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer slot */}
        {footer && (
          <div
            className="shrink-0 border-t"
            style={{ borderColor: "var(--color-border-subtle)" }}
          >
            {footer}
          </div>
        )}
      </nav>
    </Ctx.Provider>
  );
}