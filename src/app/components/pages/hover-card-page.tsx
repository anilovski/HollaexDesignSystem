import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";
import { CalendarDays } from "lucide-react";

export function HoverCardPage() {
  return (
    <ComponentPage name="Hover Card" description="A floating card that appears when hovering over a trigger element. Ideal for previewing content like user profiles, link details, or asset summaries." hideFab>
      <Section title="Basic" description="Hover over the trigger to reveal a content card.">
        <ExampleRow label="User preview">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="cursor-pointer"
                style={{
                  fontSize: "var(--text-body-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  fontFamily: "var(--font-family-supreme)",
                  color: "var(--brand-default)",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                @hollaex
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
                <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "var(--brand-subtle)",
                      color: "var(--brand-default)",
                      fontSize: "var(--text-body-sm)",
                      fontWeight: "var(--font-weight-bold)",
                      fontFamily: "var(--font-family-supreme)",
                    }}
                  >
                    HX
                  </div>
                  <div>
                    <p style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)" }}>
                      HollaEx
                    </p>
                    <p style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>
                      @hollaex
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  White-label crypto exchange platform. Build your own exchange in minutes.
                </p>
                <div className="flex items-center" style={{ gap: "var(--space-2)", color: "var(--color-text-tertiary)" }}>
                  <CalendarDays size={12} />
                  <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)" }}>
                    Joined December 2019
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </ExampleRow>
      </Section>

      <Section title="Asset Preview" description="Preview cryptocurrency asset details on hover.">
        <ExampleRow label="Coin hover card">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="cursor-pointer inline-flex items-center rounded-full"
                style={{
                  padding: "var(--space-2) var(--space-4)",
                  fontSize: "var(--text-body-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  fontFamily: "var(--font-family-supreme)",
                  backgroundColor: "var(--secondary-subtle)",
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--border-subtle)",
                  gap: "var(--space-2)",
                  transition: "border-color var(--motion-hover)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
              >
                <span style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-caption)" }}>BTC</span>
                Bitcoin
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)" }}>Bitcoin</span>
                  <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-tertiary)" }}>BTC</span>
                </div>
                <div className="flex items-baseline" style={{ gap: "var(--space-2)" }}>
                  <span style={{ fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-primary)" }}>$67,432.18</span>
                  <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "#16A249" }}>+2.4%</span>
                </div>
                <div className="grid grid-cols-2" style={{ gap: "var(--space-3)" }}>
                  {[{ label: "24h Volume", value: "$28.4B" }, { label: "Market Cap", value: "$1.32T" }].map((s) => (
                    <div key={s.label}>
                      <p style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>{s.label}</p>
                      <p style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
