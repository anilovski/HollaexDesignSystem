import { Link, useNavigate, useOutletContext } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "../docs/search-command";
import { useState, useEffect, useRef } from "react";

const sections = [
  {
    label: "Foundation",
    description:
      "Color tokens, typography, spacing, and iconography — the building blocks every HollaEx surface is made of.",
    href: "/foundation/colors",
    cta: "Explore foundation",
    items: ["Colors", "Typography", "Spacing", "Icons", "Motion"],
    accent: "var(--primary)",
    bg: "var(--secondary)",
  },
  {
    label: "Components",
    description:
      "Reusable, accessible UI components that follow the HollaEx design language consistently across products.",
    href: "/components/button",
    cta: "Browse components",
    items: ["Accordion", "Alert", "Avatar", "Badge", "Button", "Checkbox", "Chip", "Dropdown"],
    accent: "var(--chart-5)",
    bg: "var(--secondary)",
  },
  {
    label: "Patterns",
    description:
      "Higher-level design patterns for forms, data display, navigation flows, and feedback states.",
    href: "/patterns/forms",
    cta: "View patterns",
    items: ["Forms", "Data Display", "Navigation", "Feedback"],
    accent: "var(--chart-2)",
    bg: "var(--secondary)",
    soon: true,
  },
];

const stats = [
  { value: "45+", label: "Color tokens" },
  { value: "15", label: "Type sizes" },
  { value: "2", label: "Font families" },
  { value: "14", label: "Components" },
];

export function OverviewPage() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)", backgroundColor: "var(--secondary-subtle)", minHeight: "100vh" }}>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* Top bar */}
      <div className="border-b sticky top-0 z-10 h-[72px] transition-shadow duration-200"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--background)",
          boxShadow: scrolled ? "var(--elevation-sm)" : "none",
        }}
      >
        <div className="px-12 h-full flex items-center justify-between"
          style={{ padding: "0 var(--space-10)" }}
        >
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "11px", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-supreme)" }}>Overview</span>
          </div>
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <OverviewSearch />
            <HxThemeToggle size="lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 900, padding: "var(--space-12) var(--space-10)" }}>

        {/* Hero */}
        <div style={{ marginBottom: "var(--space-13)" }}>
          <div
            className="inline-flex items-center rounded-full border"
            style={{ borderColor: "var(--primary)", backgroundColor: "var(--secondary)", gap: "var(--space-3)", padding: "var(--space-2) var(--space-4)", marginBottom: "var(--space-8)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
            <span style={{
              fontSize: "11px",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--primary)",
              letterSpacing: "0.04em",
              fontFamily: "var(--font-family-supreme)",
            }}>
              v1.0.0 — In Progress
            </span>
          </div>

          <h1 style={{
            fontSize: "60px",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            marginBottom: "var(--space-7)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            HollaEx<br />Design System
          </h1>

          <p style={{
            fontSize: "18px",
            color: "var(--muted-foreground)",
            lineHeight: 1.6,
            maxWidth: "540px",
            marginBottom: "var(--space-9)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            A comprehensive design language for building consistent, accessible,
            and beautiful HollaEx products — from tokens to components to patterns.
          </p>

          <div className="flex items-center" style={{ gap: "var(--space-5)" }}>
            <Link
              to="/foundation/colors"
              className="inline-flex items-center transition-colors"
              style={{
                padding: "var(--space-3) var(--space-6)",
                gap: "var(--space-3)",
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-medium)",
                borderRadius: "var(--radius-button)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              Get started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              to="/foundation/colors"
              className="inline-flex items-center border transition-colors hover:opacity-80"
              style={{
                padding: "var(--space-3) var(--space-6)",
                gap: "var(--space-3)",
                borderColor: "var(--border)",
                color: "var(--muted-foreground)",
                fontSize: "var(--text-label)",
                fontWeight: "var(--font-weight-medium)",
                borderRadius: "var(--radius-button)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              View color tokens
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-px rounded-xl overflow-hidden" style={{ backgroundColor: "var(--border)", marginBottom: "var(--space-13)" }}>
          {stats.map((s) => (
            <div key={s.label} style={{ padding: "var(--space-6) var(--space-7)", backgroundColor: "var(--background)" }}>
              <div style={{
                fontSize: "32px",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--foreground)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-2)",
                fontFamily: "var(--font-family-supreme)",
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: "12px",
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <h2 style={{
            fontSize: "11px",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "var(--space-7)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            What&apos;s inside
          </h2>

          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            {sections.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border overflow-hidden hover:opacity-90 transition-opacity group"
                style={{ borderColor: "var(--border-subtle)", borderRadius: "var(--radius-card)", backgroundColor: "var(--background)" }}
              >
                <div style={{ padding: "var(--space-7)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-8)" }}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center" style={{ gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
                      <h3 style={{
                        fontSize: "18px",
                        fontWeight: "var(--font-weight-bold)",
                        color: "var(--foreground)",
                        fontFamily: "var(--font-family-supreme)",
                      }}>{s.label}</h3>
                      {s.soon && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: "9px",
                            fontWeight: "var(--font-weight-bold)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            background: s.bg,
                            color: s.accent,
                            fontFamily: "var(--font-family-supreme)",
                          }}
                        >
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontSize: "var(--text-label)",
                      color: "var(--muted-foreground)",
                      lineHeight: 1.6,
                      marginBottom: "var(--space-5)",
                      maxWidth: "460px",
                      fontFamily: "var(--font-family-supreme)",
                    }}>
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-full border"
                          style={{
                            fontSize: "11px",
                            borderColor: "var(--border)",
                            color: "var(--muted-foreground)",
                            fontFamily: "var(--font-family-supreme)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {!s.soon ? (
                    <button
                      onClick={() => navigate(s.href)}
                      className="shrink-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 group-hover:translate-x-1 cursor-pointer"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "var(--radius-circle)",
                        backgroundColor: "transparent",
                        color: "var(--muted-foreground)",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </button>
                  ) : (
                    <span className="shrink-0 mt-1"
                      style={{
                        fontSize: "var(--text-label)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--muted-foreground)",
                        opacity: 0.5,
                        fontFamily: "var(--font-family-supreme)",
                      }}
                    >
                      {s.cta}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="border-t flex items-center justify-between"
          style={{ borderColor: "var(--secondary)", paddingTop: "var(--space-8)" }}
        >
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            HollaEx Design System · v1.0.0
          </p>
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
            More sections shipping soon
          </p>
        </div>
      </div>
    </div>
  );
}

function OverviewSearch() {
  const ctx = useOutletContext<{ open: boolean; setOpen: (v: boolean) => void } | undefined>();
  if (!ctx) return null;
  return <SearchTrigger onClick={() => ctx.setOpen(true)} />;
}