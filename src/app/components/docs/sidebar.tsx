import { Link, useLocation } from "react-router";
import { navigation, pinnedNavSections } from "./nav-config";
import hollaExLogoFull from "../../../imports/HollaEx_Logo-1.svg";
import { HxThemeToggle } from "../ui/hx-toggle";
import { useScrollbar } from "../ui/use-scrollbar";
import { useState, useEffect, useRef, useId } from "react";

/* ── Tabler Icons ─────────── */
import {
  IconLayoutGrid,
  IconPalette,
  IconTypography,
  IconRuler,
  IconHexagon,
  IconPlayerPlay,
  IconSelector,
  IconAlertTriangle,
  IconAlertCircle,
  IconUserCircle,
  IconMedal,
  IconDots,
  IconRectangle,
  IconSquareHalf,
  IconSlideshow,
  IconSquareCheck,
  IconTag,
  IconCreditCard,
  IconArrowsMinimize,
  IconToggleLeft,
  IconPointer,
  IconCalendar,
  IconChevronDown,
  IconCircle,
  IconAppWindow,
  IconId,
  IconForms,
  IconFilter,
  IconKey,
  IconExternalLink,
  IconList,
  IconMenu2,
  IconArrowsMaximize,
  IconCompass,
  IconChevronsRight,
  IconMessageDots,
  IconLoader,
  IconCircleDot,
  IconGripVertical,
  IconSearch,
  IconMouse,
  IconChevronsDown,
  IconLayoutSidebar,
  IconBone,
  IconAdjustmentsHorizontal,
  IconStairs,
  IconTable,
  IconColumns,
  IconAlignLeft,
  IconBell,
  IconToggleRight,
  IconInfoCircle,
  IconChartBar,
  IconMail,
  IconRobot,
  IconFlask,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";

/* ── Icon map: label → Tabler icon ─────────── */
const NAV_ICONS: Record<string, TablerIcon> = {
  // Getting Started
  "Overview": IconLayoutGrid,
  // Foundation
  "Colors": IconPalette,
  "Typography": IconTypography,
  "Spacing": IconRuler,
  "Icons": IconHexagon,
  "Motion": IconPlayerPlay,
  "Layout & Grid": IconColumns,
  // Components
  "Accordion": IconSelector,
  "Alert": IconAlertTriangle,
  "Alert Dialog": IconAlertCircle,
  "Avatar": IconUserCircle,
  "Badge": IconMedal,
  "Breadcrumb": IconDots,
  "Button": IconRectangle,
  "Button Group": IconSquareHalf,
  "Carousel": IconSlideshow,
  "Checkbox": IconSquareCheck,
  "Chip": IconTag,
  "Coin Card": IconCreditCard,
  "Collapsible": IconArrowsMinimize,
  "Content Switcher": IconToggleLeft,
  "Context Menu": IconPointer,
  "Date Picker": IconCalendar,
  "Dropdown": IconChevronDown,
  "FAB": IconCircle,
  "Header": IconAppWindow,
  "Hover Card": IconId,
  "Input": IconForms,
  "Input Dropdown": IconFilter,
  "Input OTP": IconKey,
  "Link": IconExternalLink,
  "List": IconList,
  "Menubar": IconMenu2,
  "Modal": IconArrowsMaximize,
  "Navigation Menu": IconCompass,
  "Pagination": IconChevronsRight,
  "Popover": IconMessageDots,
  "Progress": IconLoader,
  "Radio Button": IconCircleDot,
  "Resizable": IconGripVertical,
  "Search": IconSearch,
  "Scroll Area": IconMouse,
  "Select": IconChevronsDown,
  "Sheet": IconLayoutSidebar,
  "Side Navigation": IconLayoutSidebar,
  "Skeleton": IconBone,
  "Slider": IconAdjustmentsHorizontal,
  "Stepper": IconStairs,
  "Table": IconTable,
  "Tabs": IconColumns,
  "Textarea": IconAlignLeft,
  "Toast": IconBell,
  "Toggle": IconToggleRight,
  "Tooltip": IconInfoCircle,
  // Patterns
  "Agent Legibility": IconRobot,
  "Testing with Agents": IconFlask,
  "Data Display": IconChartBar,
  "Email Templates": IconMail,
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ── Collapsible nav group with smooth expand/collapse ─── */
function CollapsibleNavGroup({
  title,
  children,
  defaultOpen = true,
  isLast = false,
  containsActive = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isLast?: boolean;
  /** When true, forces the group open (e.g. active route lives inside) */
  containsActive?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const panelId = useId();

  /* Auto-expand when the active route is inside this group */
  useEffect(() => {
    if (containsActive && !isOpen) {
      setIsOpen(true);
    }
  }, [containsActive]);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  // Recalculate on resize
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (isOpen) setContentHeight(el.scrollHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen]);

  return (
    <div style={{ marginBottom: isLast ? "0" : "var(--space-7)" }} className="last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="cursor-pointer flex items-center w-full"
        style={{
          padding: "0 var(--space-3)",
          marginBottom: isOpen ? "var(--space-2)" : "0",
          border: "none",
          backgroundColor: "transparent",
          transition: "margin-bottom var(--duration-medium-2) var(--ease-emphasized)",
        }}
      >
        <span style={{
          fontSize: "10px",
          fontWeight: "var(--font-weight-bold)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          fontFamily: "var(--font-family-supreme)",
        }}>
          {title}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            marginLeft: "auto",
            color: "var(--muted-foreground)",
            opacity: 0.5,
            transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform var(--duration-medium-2) var(--ease-emphasized)",
          }}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        ref={contentRef}
        id={panelId}
        role="region"
        aria-label={title}
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? (contentHeight ?? 1000) : 0,
          opacity: isOpen ? 1 : 0,
          transition: `max-height var(--duration-medium-4) ${isOpen ? "var(--ease-emphasized-decelerate)" : "var(--ease-emphasized-accelerate)"}, opacity var(--duration-short-4) ${isOpen ? "var(--ease-standard-decelerate)" : "var(--ease-standard-accelerate)"}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Sidebar nav link with hover state ─────────── */
function SidebarLink({ href, label, isActive, staggerIndex = 0, navRef, onNavigate }: { href: string; label: string; isActive: boolean; staggerIndex?: number; navRef: React.RefObject<HTMLElement | null>; onNavigate?: () => void }) {
  const [hoverItem, setHoverItem] = useState(false);
  const [wasActive, setWasActive] = useState(isActive);
  const [animating, setAnimating] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const Icon = NAV_ICONS[label];

  useEffect(() => {
    if (isActive && !wasActive) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 350);
      return () => clearTimeout(timer);
    }
    setWasActive(isActive);
  }, [isActive, wasActive]);

  /* Auto-scroll the active link into view within the sidebar */
  useEffect(() => {
    if (!isActive || !linkRef.current) return;
    // Small delay so any collapsible group expand animation settles first
    const timer = setTimeout(() => {
      linkRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, 120);
    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <Link
      ref={linkRef}
      to={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex items-center px-2 py-[7px] rounded transition-all duration-[var(--duration-short-2)]",
      )}
      style={{
        fontSize: "var(--text-label)",
        gap: "var(--space-3)",
        color: isActive
          ? "var(--primary)"
          : hoverItem
            ? "var(--foreground)"
            : "var(--muted-foreground)",
        fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
        backgroundColor: isActive
          ? "var(--secondary)"
          : hoverItem
            ? "var(--secondary)"
            : "transparent",
        animation: `hx-sidebar-item-in var(--duration-medium-2) var(--ease-emphasized-decelerate) both`,
        animationDelay: `${staggerIndex * 30}ms`,
      }}
      onClick={() => onNavigate?.()}
      onMouseEnter={() => setHoverItem(true)}
      onMouseLeave={() => setHoverItem(false)}
    >
      {isActive && (
        <span className="absolute left-0 top-[5px] bottom-[5px] w-[2px] rounded-full"
          style={{ backgroundColor: "var(--primary)" }}
        />
      )}
      {Icon && (
        <span
          style={{
            display: "inline-flex",
            marginLeft: "var(--space-1)",
            animation: animating
              ? `hx-icon-pop var(--duration-medium-4) var(--ease-emphasized-decelerate) forwards`
              : "none",
          }}
        >
          <Icon
            size={15}
            className="shrink-0"
            stroke={isActive ? 2 : 1.5}
            style={{
              opacity: isActive ? 1 : 0.7,
              transition: `opacity var(--duration-short-4) var(--ease-standard), stroke-width var(--duration-short-4) var(--ease-standard)`,
            }}
          />
        </span>
      )}
      <span>{label}</span>
    </Link>
  );
}

/* ── Helpers ──────────────────────────────────── */

/** Renders a list of nav items (reused across sections) */
function NavList({ items, pathname, scrollRef, onNavigate }: {
  items: import("./nav-config").NavItem[];
  pathname: string;
  scrollRef: React.RefObject<HTMLElement | null>;
  onNavigate?: () => void;
}) {
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
      {items.map((item, index) => {
        const isActive = pathname === item.href;

        if (item.soon) {
          const SoonIcon = NAV_ICONS[item.label];
          return (
            <li key={item.href}>
              <span className="flex items-center justify-between rounded select-none"
                style={{ fontSize: "var(--text-label)", color: "var(--muted-foreground)", opacity: 0.5, padding: "7px var(--space-3)" }}
              >
                <span className="flex items-center" style={{ gap: "var(--space-3)" }}>
                  {SoonIcon && <SoonIcon size={15} className="shrink-0" style={{ marginLeft: "var(--space-1)" }} stroke={1.5} />}
                  {item.label}
                </span>
                <span style={{
                  fontSize: "9px",
                  fontWeight: "var(--font-weight-medium)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  backgroundColor: "var(--secondary)",
                  padding: "var(--space-1) var(--space-2)",
                  borderRadius: "var(--radius)",
                }}>
                  Soon
                </span>
              </span>
            </li>
          );
        }

        return (
          <li key={item.href}>
            <SidebarLink href={item.href} label={item.label} isActive={isActive} staggerIndex={index} navRef={scrollRef} onNavigate={onNavigate} />
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Sticky Foundation section — stays pinned at the top of the nav scroll area
 * so foundation items are always one click away while scrolling through components.
 */
function StickyFoundation({ pathname, scrollRef, onNavigate }: {
  pathname: string;
  scrollRef: React.RefObject<HTMLElement | null>;
  onNavigate?: () => void;
}) {
  const foundationSection = pinnedNavSections.find(s => s.title === "Foundation");
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Detect when the section becomes stuck using an IntersectionObserver on a sentinel
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, root: el.closest("nav") },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!foundationSection) return null;

  const sectionHasActive = foundationSection.items.some((item) => pathname === item.href);

  return (
    <>
      {/* Sentinel: sits right above the sticky section. When it scrolls out of the nav viewport, we know Foundation is stuck */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      <div
        style={{
          position: "sticky",
          /* Pin above the nav viewport so the background covers the gap between the logo and this section */
          top: "calc(-1 * var(--space-6))",
          zIndex: 2,
          backgroundColor: "var(--background)",
          marginLeft: "calc(-1 * var(--space-4))",
          marginRight: "calc(-1 * var(--space-4))",
          paddingLeft: "var(--space-4)",
          paddingRight: "var(--space-4)",
          paddingTop: "calc(var(--space-6) + var(--space-2))",
          paddingBottom: "var(--space-3)",
          borderBottom: isStuck ? "1px solid var(--border-subtle)" : "1px solid transparent",
          boxShadow: isStuck ? "0 4px 12px -4px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow var(--duration-short-4) ease, border-color var(--duration-short-4) ease",
        }}
      >
        <CollapsibleNavGroup title={foundationSection.title} isLast={false} containsActive={sectionHasActive}>
          <NavList items={foundationSection.items} pathname={pathname} scrollRef={scrollRef} onNavigate={onNavigate} />
        </CollapsibleNavGroup>
      </div>
    </>
  );
}

/** @refresh reset */
/** Reusable sidebar content — used in both the desktop aside and the mobile drawer */
export function SidebarContent({ onNavigate }: { onNavigate?: () => void } = {}) {
  const { pathname } = useLocation();
  const scrollRef = useScrollbar<HTMLElement>();

  return (
    <div className="flex flex-col h-full"
      style={{
        backgroundColor: "var(--background)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      {/* Logo */}
      <div className="h-[72px] flex items-center border-b shrink-0"
        style={{ borderColor: "var(--border-subtle)", padding: "0 var(--space-6)", gap: "var(--space-4)" }}
      >
        <img
          src={hollaExLogoFull}
          alt="HollaEx Design System"
          className="hx-logo-adaptive"
          style={{ height: "40px" }}
        />
      </div>

      {/* Scrollable navigation */}
      <nav ref={scrollRef} className="flex-1 overflow-y-auto min-h-0"
        aria-label="Design system navigation"
        style={{ padding: "var(--space-6) var(--space-4) 0" }}
      >
        {/* Getting Started */}
        {navigation.filter(s => s.title === "Getting Started").map((section) => {
          const sectionHasActive = section.items.some((item) => pathname === item.href);
          return (
            <CollapsibleNavGroup key={section.title} title={section.title} isLast={false} containsActive={sectionHasActive}>
              <NavList items={section.items} pathname={pathname} scrollRef={scrollRef} onNavigate={onNavigate} />
            </CollapsibleNavGroup>
          );
        })}

        {/* Foundation — sticky: always visible as you scroll through Components */}
        <StickyFoundation pathname={pathname} scrollRef={scrollRef} onNavigate={onNavigate} />

        {/* Components */}
        {navigation.filter(s => s.title === "Components").map((section) => {
          const sectionHasActive = section.items.some((item) => pathname === item.href);
          return (
            <CollapsibleNavGroup key={section.title} title={section.title} isLast={false} containsActive={sectionHasActive}>
              <NavList items={section.items} pathname={pathname} scrollRef={scrollRef} onNavigate={onNavigate} />
            </CollapsibleNavGroup>
          );
        })}

        {/* Patterns */}
        {pinnedNavSections.filter(s => s.title === "Patterns").map((section) => {
          const sectionHasActive = section.items.some((item) => pathname === item.href);
          return (
            <CollapsibleNavGroup key={section.title} title={section.title} isLast={true} containsActive={sectionHasActive}>
              <NavList items={section.items} pathname={pathname} scrollRef={scrollRef} onNavigate={onNavigate} />
            </CollapsibleNavGroup>
          );
        })}

        {/* Scroll padding */}
        <div style={{ height: "var(--space-4)" }} aria-hidden="true" />
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t" style={{ borderColor: "var(--border-layout)", backgroundColor: "var(--background)", padding: "var(--space-5) var(--space-6)" }}>
        <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
          <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>v1.0.0</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <a
            href="https://hollaex.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "11px", color: "var(--muted-foreground)" }}
            className="hover:opacity-70 transition-opacity"
          >
            hollaex.com
          </a>
        </div>
      </div>
    </div>
  );
}

/** Desktop sidebar — hidden below md (768px) */
export function DocsSidebar() {
  return (
    <aside className="w-64 shrink-0 sticky top-0 h-screen flex-col border-r overflow-hidden hidden md:flex"
      style={{
        borderColor: "var(--border-layout)",
      }}
    >
      <SidebarContent />
    </aside>
  );
}