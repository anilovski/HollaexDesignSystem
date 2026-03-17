import { ReactNode, useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "./search-command";

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
}: {
  name: string;
  description: string;
  breadcrumbPrefix?: string;
  children: ReactNode;
}) {
  const [sentinelRef, scrolled] = useScrolledPast();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--secondary-subtle)" }}>
      {/* Scroll sentinel – sits at the very top; when it's gone the breadcrumb gets a shadow */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="border-b sticky top-0 z-10 h-[72px] transition-shadow duration-200"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--background)",
          boxShadow: scrolled ? "var(--elevation-sm)" : "none",
        }}
      >
        <div className="h-full flex items-center justify-between"
          style={{ padding: "0 var(--space-10)" }}
        >
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{breadcrumbPrefix}</span>
            <span style={{ fontSize: "11px", color: "var(--border)" }}>&rsaquo;</span>
            <span style={{ fontSize: "11px", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-supreme)" }}>{name}</span>
          </div>
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <BreadcrumbSearch />
            <HxThemeToggle size="lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 860, padding: "0 var(--space-10)" }}>
        {/* Page header */}
        <div className="border-b" style={{ paddingTop: "var(--space-11)", paddingBottom: "var(--space-10)", borderColor: "var(--secondary)" }}>
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
        <div className="flex flex-col" style={{ padding: "var(--space-10) 0", gap: "var(--space-12)" }}>{children}</div>

        {/* Footer */}
        <div className="border-t flex items-center justify-between"
          style={{ padding: "var(--space-8) 0", borderColor: "var(--secondary)" }}
        >
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            HollaEx Design System · {name}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section>
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
      {children}
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
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
      {label && (
        <div className="flex items-center border-b"
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
      <div className="flex flex-wrap items-center" style={{ padding: "var(--space-8) var(--space-7)", gap: "var(--space-5)", backgroundColor: "var(--background)" }}>
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
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
      {label && (
        <div className="flex items-center border-b"
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
      <div className="flex flex-col" style={{ padding: "var(--space-8) var(--space-7)", gap: "var(--space-7)", backgroundColor: "var(--background)" }}>
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