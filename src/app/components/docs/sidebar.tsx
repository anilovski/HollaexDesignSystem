import { Link, useLocation } from "react-router";
import { navigation } from "./nav-config";
import hollaExLogoFull from "../../../imports/HollaEx_Logo-1.svg";
import { HxThemeToggle } from "../ui/hx-toggle";
import { useScrollbar } from "../ui/use-scrollbar";
import { useState, useEffect } from "react";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ── Sidebar nav link with hover state ─────────── */
function SidebarLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const [hoverItem, setHoverItem] = useState(false);

  return (
    <Link
      to={href}
      className={cn(
        "relative flex items-center px-2 py-[7px] rounded transition-all duration-100",
      )}
      style={{
        fontSize: "var(--text-label)",
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
      }}
      onMouseEnter={() => setHoverItem(true)}
      onMouseLeave={() => setHoverItem(false)}
    >
      {isActive && (
        <span className="absolute left-0 top-[5px] bottom-[5px] w-[2px] rounded-full"
          style={{ backgroundColor: "var(--primary)" }}
        />
      )}
      <span className="pl-2">{label}</span>
    </Link>
  );
}

/** @refresh reset */
export function DocsSidebar() {
  const { pathname } = useLocation();
  const scrollRef = useScrollbar<HTMLElement>();
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

  // Split: all sections except the last go in the scrollable area;
  // the last section ("Patterns") is pinned to the bottom.
  const scrollableSections = navigation.slice(0, -1);
  const bottomSection = navigation[navigation.length - 1];

  return (
    <aside className="w-64 shrink-0 sticky top-0 h-screen flex flex-col border-r overflow-hidden"
      style={{
        borderColor: "var(--border-layout)",
        backgroundColor: "var(--background)",
        fontFamily: "var(--font-family-supreme)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        style={{ padding: "var(--space-6) var(--space-4)" }}
      >
        {scrollableSections.map((section) => (
          <div key={section.title} style={{ marginBottom: "var(--space-7)" }} className="last:mb-0">
            <div style={{ padding: "0 var(--space-3)", marginBottom: "var(--space-2)" }}>
              <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                {section.title}
              </span>
            </div>

            <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              {section.items.map((item) => {
                const isActive = pathname === item.href;

                if (item.soon) {
                  return (
                    <li key={item.href}>
                      <span className="flex items-center justify-between rounded select-none"
                        style={{ fontSize: "var(--text-label)", color: "var(--muted-foreground)", opacity: 0.5, padding: "7px var(--space-3)" }}
                      >
                        {item.label}
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
                    <SidebarLink href={item.href} label={item.label} isActive={isActive} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sticky bottom section (Patterns) */}
      <div className="shrink-0 relative z-10 transition-shadow duration-300 ease-out"
        style={{
          padding: "var(--space-4) var(--space-4) var(--space-3)",
          backgroundColor: "var(--background)",
          boxShadow: navOverflowing && hovered
            ? "0 -2px 12px -4px rgb(0 0 0 / 0.04), 0 -1px 4px -2px rgb(0 0 0 / 0.03)"
            : "none",
        }}
      >
        <div style={{ padding: "0 var(--space-3)", marginBottom: "var(--space-2)" }}>
          <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
            {bottomSection.title}
          </span>
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          {bottomSection.items.map((item) => {
            const isActive = pathname === item.href;

            if (item.soon) {
              return (
                <li key={item.href}>
                  <span className="flex items-center justify-between rounded select-none"
                    style={{ fontSize: "var(--text-label)", color: "var(--muted-foreground)", opacity: 0.5, padding: "7px var(--space-3)" }}
                  >
                    {item.label}
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
                <SidebarLink href={item.href} label={item.label} isActive={isActive} />
              </li>
            );
          })}
        </ul>
      </div>

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
    </aside>
  );
}