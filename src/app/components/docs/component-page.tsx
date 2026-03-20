import { ReactNode, useState, useEffect, useRef, Children, cloneElement, isValidElement } from "react";
import type { ComponentType } from "react";
import { useOutletContext, Link } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "./search-command";
import { SectionJumpFab } from "./section-jump-fab";
import { FadeInContent } from "../ui/page-loader";
import { Bot, ArrowRight } from "lucide-react";

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Hook: returns [sentinelRef, isScrolled] — isScrolled becomes true when the sentinel scrolls out of view */
function useScrolledPast() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [sentinelRef, scrolled] as const;
}

export function ComponentPage({
  name,
  description,
  breadcrumbPrefix = "Components",
  children,
  sideNav,
  fabIconMap,
  hideFab = false,
}: {
  name: string;
  description: string;
  breadcrumbPrefix?: string;
  children: ReactNode;
  sideNav?: ReactNode;
  fabIconMap?: Record<string, ComponentType<{ size?: number; stroke?: number }>>;
  hideFab?: boolean;
}) {
  const [sentinelRef, scrolled] = useScrolledPast();

  return (
    <div className="min-h-full">
      {/* Scroll sentinel – sits at the very top; when it's gone the breadcrumb gets a shadow */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="border-b sticky top-0 z-10 h-[72px] transition-shadow duration-[var(--duration-short-4)]"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--background)",
          boxShadow: scrolled ? "var(--elevation-sm)" : "none",
        }}
      >
        <div className="h-full flex items-center justify-between"
          style={{ padding: "0 var(--space-10)" }}
        >
          {/* WCAG 1.3.1: Semantic breadcrumb navigation */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center" style={{ gap: "var(--space-3)", listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{breadcrumbPrefix}</span>
              </li>
              <li aria-hidden="true">
                <span style={{ fontSize: "11px", color: "var(--border)" }}>&rsaquo;</span>
              </li>
              <li aria-current="page">
                <span style={{ fontSize: "11px", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-supreme)" }}>{name}</span>
              </li>
            </ol>
          </nav>
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <BreadcrumbSearch />
            <HxThemeToggle size="lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: sideNav ? 1120 : 860, padding: "0 var(--space-10)" }}>
        <FadeInContent>
        {/* Page header */}
        <div className="border-b" style={{
          paddingTop: "var(--space-11)",
          paddingBottom: "var(--space-10)",
          borderColor: "var(--secondary)",
          animation: "hx-expand-in var(--duration-medium-2) var(--ease-emphasized-decelerate) both",
        }}>
          <h1 style={{
            fontSize: "52px",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            fontFamily: "var(--font-family-supreme)",
            marginBottom: "var(--space-5)",
          }}>
            {name}
          </h1>
          <p style={{
            fontSize: "var(--text-base)",
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
            maxWidth: "580px",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {description}
          </p>
        </div>

        {/* Content */}
        <div className="flex" style={{ gap: sideNav ? "var(--space-8)" : undefined, minWidth: 0 }}>
          {sideNav && (
            <div
              className="shrink-0 hidden lg:block"
              style={{ width: 180, paddingTop: "var(--space-10)" }}
            >
              {sideNav}
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col" style={{ padding: "var(--space-10) 0", gap: "var(--space-12)", overflow: "hidden" }}>
            {Children.map(children, (child, i) =>
              isValidElement(child) ? cloneElement(child as React.ReactElement<any>, { _sectionIndex: i }) : child
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t flex items-center justify-between"
          style={{ padding: "var(--space-8) 0", borderColor: "var(--secondary)" }}
        >
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            HollaEx Design System · {name}
          </p>
          <Link
            to="/foundation/agent-legibility#component-authoring-checklist"
            className="flex items-center transition-all"
            style={{
              gap: "var(--space-2)",
              fontSize: "11px",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-supreme)",
              textDecoration: "none",
              transitionDuration: "var(--duration-short-3)",
              opacity: 0.7,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--brand-default)"; e.currentTarget.style.opacity = "1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.opacity = "0.7"; }}
          >
            <Bot size={12} />
            Agent checklist
            <ArrowRight size={10} />
          </Link>
        </div>
        </FadeInContent>
      </div>

      {/* Section jump FAB */}
      {!hideFab && <SectionJumpFab iconMap={fabIconMap} />}
    </div>
  );
}

export function Section({
  title,
  description,
  children,
  _sectionIndex = 0,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  _sectionIndex?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={slugify(title)}
      className="section-block"
      data-section-title={title}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity var(--duration-medium-2) var(--ease-emphasized-decelerate), transform var(--duration-medium-4) var(--ease-emphasized-decelerate)`,
        transitionDelay: isVisible ? `${_sectionIndex * 120}ms` : "0ms",
        position: "relative",
        minWidth: 0,
      }}
    >
      <h2 style={{
        fontSize: "28px",
        fontWeight: "var(--font-weight-bold)",
        color: "var(--foreground)",
        letterSpacing: "-0.01em",
        marginBottom: "var(--space-3)",
        fontFamily: "var(--font-family-supreme)",
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: "var(--text-label)",
          color: "var(--muted-foreground)",
          lineHeight: 1.6,
          maxWidth: "520px",
          marginBottom: "var(--space-8)",
          fontFamily: "var(--font-family-supreme)",
        }}>
          {description}
        </p>
      )}
      {!description && <div style={{ marginBottom: "var(--space-8)" }} />}
      <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
        {children}
      </div>
    </section>
  );
}

export function ExampleRow({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border" style={{
      borderColor: "var(--border-subtle)",
      animation: "hx-expand-in var(--duration-medium-4) var(--ease-emphasized-decelerate) both",
      overflow: "visible",
      minWidth: 0,
    }}>
      {label && (
        <div className="flex items-center border-b rounded-t-xl"
          style={{ padding: "var(--space-4) var(--space-7)", gap: "var(--space-4)", backgroundColor: "var(--preview-header-bg)", borderColor: "var(--border-subtle)" }}
        >
          <span style={{
            fontSize: "10px",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {label}
          </span>
        </div>
      )}
      <div className="flex flex-wrap items-center rounded-b-xl" style={{ padding: "var(--space-8) var(--space-7)", gap: "var(--space-5)", backgroundColor: "var(--background)", overflow: "visible" }}>
        {children}
      </div>
    </div>
  );
}

export function ExampleGrid({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border" style={{
      borderColor: "var(--border-subtle)",
      animation: "hx-expand-in var(--duration-medium-4) var(--ease-emphasized-decelerate) both",
      overflow: "visible",
      minWidth: 0,
    }}>
      {label && (
        <div className="flex items-center border-b rounded-t-xl"
          style={{ padding: "var(--space-4) var(--space-7)", gap: "var(--space-4)", backgroundColor: "var(--preview-header-bg)", borderColor: "var(--border-subtle)" }}
        >
          <span style={{
            fontSize: "10px",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {label}
          </span>
        </div>
      )}
      <div className="flex flex-col rounded-b-xl" style={{ padding: "var(--space-8) var(--space-7)", gap: "var(--space-7)", backgroundColor: "var(--background)", overflow: "visible", minWidth: 0 }}>
        {children}
      </div>
    </div>
  );
}

function BreadcrumbSearch() {
  const ctx = useOutletContext<{ open: boolean; setOpen: (v: boolean) => void } | undefined>();
  if (!ctx) return null;
  return <SearchTrigger onClick={() => ctx.setOpen(true)} />;
}