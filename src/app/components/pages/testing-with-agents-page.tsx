import { useState, useRef, useEffect, useCallback } from "react";
import { useOutletContext, Link } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "../docs/search-command";
import { SectionJumpFab } from "../docs/section-jump-fab";
import { FadeInContent } from "../ui/page-loader";
import { Bot, Play, Terminal, Workflow, FlaskConical, Scan, ArrowRight, MousePointerClick, Keyboard, Eye } from "lucide-react";
import { Button } from "../ui/hollaex-button";

/* ═══════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════ */

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function CopyButton({ text }: { text: string }) {
  return (
    <Button
      variant="ghost-secondary"
      size="xs"
      iconOnly
      copyText={text}
      title="Copy"
      style={{ borderRadius: "var(--radius-circle)", width: 28, height: 28 }}
    />
  );
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
      {label && (
        <div className="flex items-center justify-between" style={{ padding: "var(--space-3) var(--space-5)", backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)" }}>
          <span style={{ fontSize: "10px", fontWeight: "var(--font-weight-bold)", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{label}</span>
          <CopyButton text={code} />
        </div>
      )}
      <pre style={{ padding: "var(--space-5) var(--space-6)", backgroundColor: "var(--background)", margin: 0, overflowX: "auto", fontSize: "var(--text-code, 13px)", lineHeight: "var(--lh-code, 22px)", fontFamily: "var(--font-family-mono)", color: "var(--foreground)" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function useScrolledPast() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [sentinelRef, scrolled] as const;
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={slugify(title)} className="section-block" data-section-title={title}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(12px)", transition: `opacity var(--duration-medium-2) var(--ease-emphasized-decelerate), transform var(--duration-medium-4) var(--ease-emphasized-decelerate)`, position: "relative", minWidth: 0 }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", letterSpacing: "-0.01em", marginBottom: "var(--space-3)", fontFamily: "var(--font-family-supreme)" }}>{title}</h2>
      {description && <p style={{ fontSize: "var(--text-label)", color: "var(--muted-foreground)", lineHeight: 1.6, maxWidth: "580px", marginBottom: "var(--space-8)", fontFamily: "var(--font-family-supreme)" }}>{description}</p>}
      {!description && <div style={{ marginBottom: "var(--space-8)" }} />}
      <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>{children}</div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   TAB SWITCHER
   ═══════════════════════════════════════════════════════════ */

function FrameworkTabs({ tabs }: { tabs: { label: string; icon: React.ReactNode; code: string; fileName: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div style={{ borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
      {/* Tab header */}
      <div className="flex items-center" style={{ backgroundColor: "var(--preview-header-bg)", borderBottom: "1px solid var(--border-subtle)", padding: "0 var(--space-4)" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(i)}
            className="flex items-center cursor-pointer transition-all"
            style={{
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-4)",
              border: "none",
              borderBottom: i === active ? "2px solid var(--brand-default)" : "2px solid transparent",
              backgroundColor: "transparent",
              color: i === active ? "var(--foreground)" : "var(--muted-foreground)",
              fontSize: "var(--text-body-sm)",
              fontWeight: i === active ? "var(--font-weight-bold)" : "var(--font-weight-regular)",
              fontFamily: "var(--font-family-supreme)",
              transitionDuration: "var(--duration-short-3)",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      {/* File name */}
      <div className="flex items-center justify-between" style={{ padding: "var(--space-2) var(--space-5)", backgroundColor: "var(--secondary-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ fontSize: "var(--text-code, 11px)", fontFamily: "var(--font-family-mono)", color: "var(--muted-foreground)" }}>{tabs[active].fileName}</span>
        <CopyButton text={tabs[active].code} />
      </div>
      {/* Code */}
      <pre style={{ padding: "var(--space-5) var(--space-6)", backgroundColor: "var(--background)", margin: 0, overflowX: "auto", fontSize: "var(--text-code, 13px)", lineHeight: "var(--lh-code, 22px)", fontFamily: "var(--font-family-mono)", color: "var(--foreground)" }}>
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WORKFLOW STEP
   ═══════════════════════════════════════════════════════════ */

function WorkflowStep({ step, title, description, isLast = false }: { step: number; title: string; description: string; isLast?: boolean }) {
  return (
    <div className="flex" style={{ gap: "var(--space-5)" }}>
      {/* Connector */}
      <div className="flex flex-col items-center shrink-0">
        <div className="flex items-center justify-center" style={{
          width: 32, height: 32, borderRadius: "var(--radius-circle)",
          backgroundColor: "var(--brand-default)", color: "#fff",
          fontSize: "var(--text-code, 12px)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-bold)",
        }}>
          {step}
        </div>
        {!isLast && <div className="flex-1" style={{ width: 2, backgroundColor: "var(--border-subtle)", marginTop: "var(--space-2)", marginBottom: "var(--space-2)" }} />}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : "var(--space-7)" }}>
        <p style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", margin: 0, marginBottom: "var(--space-2)" }}>{title}</p>
        <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, margin: 0, maxWidth: 520 }}>{description}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STRATEGY CARD
   ═══════════════════════════════════════════════════════════ */

function StrategyCard({ icon: Icon, title, description, selectors }: { icon: React.ComponentType<{ size?: number }>; title: string; description: string; selectors: string[] }) {
  return (
    <div style={{ padding: "var(--space-6)", borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)" }}>
      <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
        <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: "var(--radius-component)", backgroundColor: "var(--secondary)", color: "var(--foreground)" }}>
          <Icon size={16} />
        </div>
        <span style={{ fontSize: "var(--text-base)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)" }}>{title}</span>
      </div>
      <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", lineHeight: 1.6, margin: 0, marginBottom: "var(--space-4)" }}>{description}</p>
      <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
        {selectors.map((s) => (
          <div key={s} className="flex items-center" style={{ gap: "var(--space-2)" }}>
            <ArrowRight size={10} style={{ color: "var(--brand-default)", shrink: 0 }} />
            <code style={{ fontSize: "var(--text-code, 11px)", fontFamily: "var(--font-family-mono)", color: "var(--brand-default)" }}>{s}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */

export function TestingWithAgentsPage() {
  const [sentinelRef, scrolled] = useScrolledPast();
  const search = useOutletContext<{ open: boolean; setOpen: (v: boolean) => void } | undefined>();

  return (
    <div className="min-h-full" style={{ backgroundColor: "var(--secondary-subtle)" }}>
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="border-b sticky top-0 z-10 h-[72px] transition-shadow" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--background)", boxShadow: scrolled ? "var(--elevation-sm)" : "none", transitionDuration: "var(--duration-short-4)" }}>
        <div className="h-full flex items-center justify-between" style={{ padding: "0 var(--space-10)" }}>
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Patterns</span>
            <span style={{ fontSize: "11px", color: "var(--border)" }}>&rsaquo;</span>
            <span style={{ fontSize: "11px", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)", fontFamily: "var(--font-family-supreme)" }}>Testing with Agents</span>
          </div>
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            {search && <SearchTrigger onClick={() => search.setOpen(true)} />}
            <HxThemeToggle size="lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 860, padding: "0 var(--space-10)" }}>
        <FadeInContent>
          {/* Page header */}
          <div className="border-b" style={{ paddingTop: "var(--space-11)", paddingBottom: "var(--space-10)", borderColor: "var(--secondary)", animation: "hx-expand-in var(--duration-medium-2) var(--ease-emphasized-decelerate) both" }}>
            <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
              <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: "var(--radius-component)", backgroundColor: "var(--brand-default)" }}>
                <FlaskConical size={20} style={{ color: "#fff" }} />
              </div>
            </div>
            <h1 style={{ fontSize: "52px", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "var(--font-family-supreme)", marginBottom: "var(--space-5)" }}>
              Testing with Agents
            </h1>
            <p style={{ fontSize: "var(--text-base)", color: "var(--muted-foreground)", lineHeight: 1.6, maxWidth: "580px", fontFamily: "var(--font-family-supreme)" }}>
              Real-world automation scripts and testing patterns for AI agents, E2E test suites, and browser automation tools. Every example uses the stable <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-code, 13px)", color: "var(--brand-default)" }}>data-testid</code> and <code style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-code, 13px)", color: "var(--brand-default)" }}>data-state</code> contracts from HollaEx components.
            </p>
            {/* Cross-link to Agent Legibility */}
            <Link
              to="/foundation/agent-legibility"
              className="inline-flex items-center transition-all"
              style={{ gap: "var(--space-2)", marginTop: "var(--space-4)", fontSize: "var(--text-body-sm)", color: "var(--brand-default)", fontFamily: "var(--font-family-supreme)", fontWeight: "var(--font-weight-medium)", transitionDuration: "var(--duration-short-3)", textDecoration: "none" }}
            >
              <Bot size={14} />
              See Agent Legibility foundation
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col" style={{ padding: "var(--space-10) 0", gap: "var(--space-12)", overflow: "hidden" }}>

            {/* ── Agent Workflow ─────────────────────────────── */}
            <Section title="Agent Testing Workflow" description="How an AI agent discovers, understands, and operates HollaEx interfaces in four steps.">
              <div style={{ padding: "var(--space-6)", borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)", backgroundColor: "var(--background)" }}>
                <WorkflowStep step={1} title="Discover page structure" description="Agent queries landmark elements (<nav>, <main>, <form>) and data-section-title attributes to build a page outline and understand available regions." />
                <WorkflowStep step={2} title="Identify interactive elements" description="Agent finds all actionable controls via role attributes, data-testid selectors, and aria-label. It maps trigger → target relationships using aria-controls." />
                <WorkflowStep step={3} title="Read current state" description="Agent reads data-state, aria-expanded, aria-checked, aria-selected, and data-value to understand the current UI state without visual inspection." />
                <WorkflowStep step={4} title="Execute & verify" description="Agent performs actions (click, type, select) using stable selectors, then re-reads state attributes to verify the expected outcome." isLast />
              </div>
            </Section>

            {/* ── Selector Strategy ─────────────────────────── */}
            <Section title="Selector Strategy" description="A hierarchy of selector approaches from most to least reliable. Always prefer higher-tier strategies.">
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "var(--space-4)" }}>
                <StrategyCard
                  icon={Scan}
                  title="Tier 1: data-testid"
                  description="Explicit test selectors that never change with refactors. This is the primary contract for all automation."
                  selectors={['[data-testid="submit-order"]', '[data-testid="pair-selector"]', '[data-testid="amount-input"]']}
                />
                <StrategyCard
                  icon={Eye}
                  title="Tier 2: ARIA roles & labels"
                  description="Semantic selectors that double as accessibility requirements. Stable because removing them breaks a11y."
                  selectors={['[role="dialog"][aria-label="Confirm"]', 'button[aria-expanded="true"]', '[aria-invalid="true"]']}
                />
                <StrategyCard
                  icon={MousePointerClick}
                  title="Tier 3: data-state & data-slot"
                  description="Component-structural selectors. Use when you need to query by component state or sub-element."
                  selectors={['[data-state="open"]', '[data-slot="accordion-trigger"]', '[data-variant="destructive"]']}
                />
                <StrategyCard
                  icon={Keyboard}
                  title="Tier 4: Semantic HTML"
                  description="Last resort tier. Use element selectors + attribute combos when the above aren't available."
                  selectors={['form[aria-label="Trade form"]', "nav > ul > li > a", 'input[type="email"]']}
                />
              </div>
            </Section>

            {/* ── Playwright Examples ───────────────────────── */}
            <Section title="Playwright Scripts" description="Production-ready Playwright test patterns targeting HollaEx components. These scripts use the data-testid contract.">
              <FrameworkTabs tabs={[
                {
                  label: "Playwright",
                  icon: <Play size={13} />,
                  fileName: "tests/trade-form.spec.ts",
                  code: `import { test, expect } from "@playwright/test";

test.describe("Trade Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/trade");
  });

  test("submits a buy order", async ({ page }) => {
    // Select trading pair via data-testid
    const pairSelector = page.locator(
      '[data-testid="pair-selector"]'
    );
    await expect(pairSelector).toHaveAttribute(
      "data-value", "BTC/USDT"
    );

    // Fill amount
    const amountInput = page.locator(
      '[data-testid="amount-input"]'
    );
    await amountInput.fill("0.5");

    // Submit order
    await page.locator(
      '[data-testid="submit-order"]'
    ).click();

    // Verify success toast appears
    await expect(
      page.locator('[role="status"]')
    ).toContainText("Order placed");
  });

  test("shows validation error for empty amount", async ({ page }) => {
    await page.locator(
      '[data-testid="submit-order"]'
    ).click();

    // Check the input is marked invalid
    await expect(
      page.locator('[data-testid="amount-input"]')
    ).toHaveAttribute("aria-invalid", "true");

    // Check the error message is visible
    await expect(
      page.locator('[role="alert"]')
    ).toBeVisible();
  });

  test("accordion sections expand correctly", async ({ page }) => {
    const trigger = page.locator(
      '[data-slot="accordion-trigger"]'
    ).first();

    // Initial state: closed
    await expect(trigger).toHaveAttribute(
      "aria-expanded", "false"
    );

    await trigger.click();

    // After click: open
    await expect(trigger).toHaveAttribute(
      "aria-expanded", "true"
    );

    // Content panel is visible
    const panelId = await trigger.getAttribute(
      "aria-controls"
    );
    await expect(
      page.locator(\`#\${panelId}\`)
    ).toBeVisible();
  });
});`,
                },
                {
                  label: "Cypress",
                  icon: <Terminal size={13} />,
                  fileName: "cypress/e2e/trade-form.cy.ts",
                  code: `describe("Trade Form", () => {
  beforeEach(() => {
    cy.visit("/trade");
  });

  it("submits a buy order", () => {
    // Verify initial pair selection
    cy.get('[data-testid="pair-selector"]')
      .should("have.attr", "data-value", "BTC/USDT");

    // Fill amount
    cy.get('[data-testid="amount-input"]')
      .type("0.5");

    // Submit
    cy.get('[data-testid="submit-order"]')
      .click();

    // Verify success notification
    cy.get('[role="status"]')
      .should("contain.text", "Order placed");
  });

  it("validates required fields", () => {
    cy.get('[data-testid="submit-order"]')
      .click();

    cy.get('[data-testid="amount-input"]')
      .should("have.attr", "aria-invalid", "true");

    cy.get('[role="alert"]')
      .should("be.visible");
  });

  it("navigates dropdown options", () => {
    // Open dropdown
    cy.get('[data-testid="pair-selector"]')
      .click();

    cy.get('[data-testid="pair-selector"]')
      .should("have.attr", "data-state", "open");

    // Select an option
    cy.get('[role="option"]')
      .contains("ETH/USDT")
      .click();

    cy.get('[data-testid="pair-selector"]')
      .should("have.attr", "data-value", "ETH/USDT")
      .and("have.attr", "data-state", "closed");
  });
});`,
                },
              ]} />
            </Section>

            {/* ── AI Agent Script ───────────────────────────── */}
            <Section title="AI Agent Automation" description="Patterns for LLM-powered agents that parse the DOM, reason about UI state, and execute multi-step workflows.">
              <CodeBlock
                label="Agent: Page discovery & navigation"
                code={`// Step 1: Discover page structure
const sections = document.querySelectorAll("[data-section-title]");
const outline = [...sections].map((el) => ({
  title: el.getAttribute("data-section-title"),
  id: el.id,
  rect: el.getBoundingClientRect(),
}));
// Agent now has a navigable page map

// Step 2: Find all interactive controls
const controls = document.querySelectorAll(
  "button, input, select, [role='combobox'], [role='slider']"
);
const controlMap = [...controls].map((el) => ({
  tag: el.tagName.toLowerCase(),
  testId: el.getAttribute("data-testid"),
  label: el.getAttribute("aria-label")
    || el.closest("label")?.textContent?.trim()
    || el.textContent?.trim(),
  state: {
    expanded: el.getAttribute("aria-expanded"),
    checked: el.getAttribute("aria-checked"),
    disabled: el.hasAttribute("disabled"),
    value: el.getAttribute("data-value")
      || (el as HTMLInputElement).value,
  },
}));
// Agent has a full inventory of every control + its current state`}
              />
              <CodeBlock
                label="Agent: Multi-step trade execution"
                code={`async function executeTradeOrder(agent) {
  // 1. Navigate to trade form
  const form = document.querySelector(
    '[data-testid="trade-form"]'
  );
  if (!form) throw new Error("Trade form not found");

  // 2. Read current pair
  const pair = form.querySelector(
    '[data-testid="pair-selector"]'
  );
  const currentPair = pair?.getAttribute("data-value");
  agent.log(\`Current pair: \${currentPair}\`);

  // 3. Change pair if needed
  if (currentPair !== agent.targetPair) {
    pair?.dispatchEvent(new MouseEvent("click"));
    await agent.waitFor(
      () => pair?.getAttribute("data-state") === "open"
    );
    const option = document.querySelector(
      \`[role="option"][data-value="\${agent.targetPair}"]\`
    );
    option?.dispatchEvent(new MouseEvent("click"));
    await agent.waitFor(
      () => pair?.getAttribute("data-value") === agent.targetPair
    );
  }

  // 4. Set amount
  const input = form.querySelector(
    '[data-testid="amount-input"]'
  ) as HTMLInputElement;
  input.focus();
  input.value = String(agent.amount);
  input.dispatchEvent(new Event("input", { bubbles: true }));

  // 5. Submit and verify
  const submit = form.querySelector(
    '[data-testid="submit-order"]'
  ) as HTMLButtonElement;
  submit.click();

  // 6. Wait for success confirmation
  await agent.waitFor(
    () => !!document.querySelector('[role="status"]')
  );
  const status = document.querySelector(
    '[role="status"]'
  )?.textContent;
  agent.log(\`Result: \${status}\`);

  return { success: status?.includes("placed") };
}`}
              />
            </Section>

            {/* ── Modal & Dialog Testing ────────────────────── */}
            <Section title="Modal & Dialog Patterns" description="Testing overlay interactions where focus trapping, escape handling, and return focus are critical for agent navigation.">
              <FrameworkTabs tabs={[
                {
                  label: "Playwright",
                  icon: <Play size={13} />,
                  fileName: "tests/modal-dialog.spec.ts",
                  code: `import { test, expect } from "@playwright/test";

test.describe("Modal Dialog", () => {
  test("opens and traps focus", async ({ page }) => {
    // Click trigger that opens the modal
    await page.locator(
      '[data-testid="confirm-delete-trigger"]'
    ).click();

    // Verify dialog is open
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute(
      "aria-modal", "true"
    );

    // Verify focus moved into dialog
    const focused = page.locator(":focus");
    await expect(
      dialog.locator(focused)
    ).toBeTruthy();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // Verify focus returned to trigger
    await expect(
      page.locator(
        '[data-testid="confirm-delete-trigger"]'
      )
    ).toBeFocused();
  });

  test("alert dialog blocks background", async ({ page }) => {
    await page.locator(
      '[data-testid="destructive-action"]'
    ).click();

    const alertDialog = page.locator(
      '[role="alertdialog"]'
    );
    await expect(alertDialog).toBeVisible();

    // Confirm action
    await alertDialog.locator(
      '[data-testid="dialog-confirm"]'
    ).click();

    // Verify toast / status update
    await expect(
      page.locator('[role="status"]')
    ).toContainText("Deleted");
  });
});`,
                },
                {
                  label: "Agent Script",
                  icon: <Bot size={13} />,
                  fileName: "agent/modal-handler.ts",
                  code: `async function handleModal(agent) {
  // Detect any open modal
  const modal = document.querySelector(
    '[role="dialog"], [role="alertdialog"]'
  );

  if (!modal) {
    agent.log("No modal detected");
    return null;
  }

  // Read modal context
  const title = modal.querySelector(
    "[data-slot='dialog-title']"
  )?.textContent;
  const description = modal.querySelector(
    "[data-slot='dialog-description']"
  )?.textContent;
  const isAlert = modal.getAttribute("role")
    === "alertdialog";

  agent.log(
    \`Modal: "\${title}" (alert: \${isAlert})\`
  );
  agent.log(\`Description: "\${description}"\`);

  // Find available actions
  const actions = [
    ...modal.querySelectorAll("button")
  ].map((btn) => ({
    text: btn.textContent?.trim(),
    testId: btn.getAttribute("data-testid"),
    variant: btn.getAttribute("data-variant"),
  }));

  agent.log(
    \`Actions: \${JSON.stringify(actions)}\`
  );

  // Agent decides which action to take
  return { title, description, isAlert, actions };
}`,
                },
              ]} />
            </Section>

            {/* ── Table & Data Testing ──────────────────────── */}
            <Section title="Table & Data Grid Patterns" description="Strategies for agents reading tabular data, sorting columns, paginating results, and extracting structured records.">
              <CodeBlock
                label="Agent: Reading structured table data"
                code={`function readTableData() {
  const table = document.querySelector(
    '[data-testid="orders-table"]'
  );
  if (!table) return [];

  // Read headers
  const headers = [
    ...table.querySelectorAll("thead th")
  ].map((th) => th.textContent?.trim());

  // Read rows
  const rows = [...table.querySelectorAll("tbody tr")].map(
    (tr) => {
      const cells = [...tr.querySelectorAll("td")];
      const record: Record<string, string> = {};
      cells.forEach((cell, i) => {
        record[headers[i] ?? \`col_\${i}\`] =
          cell.textContent?.trim() ?? "";
      });
      // Include row-level data attributes
      record._testId =
        tr.getAttribute("data-testid") ?? "";
      record._selected =
        tr.getAttribute("aria-selected") ?? "false";
      return record;
    }
  );

  return { headers, rows, total: rows.length };
}

// Pagination: navigate to next page
function goToNextPage() {
  const next = document.querySelector(
    '[data-testid="pagination-next"]:not([disabled])'
  );
  if (next) {
    (next as HTMLButtonElement).click();
    return true;
  }
  return false; // Already on last page
}

// Sort by column
function sortByColumn(headerText: string) {
  const th = [...document.querySelectorAll("thead th")]
    .find((el) => el.textContent?.trim() === headerText);
  if (th) {
    (th as HTMLElement).click();
    return th.getAttribute("aria-sort");
  }
  return null;
}`}
              />
            </Section>

            {/* ── Cross-link Banner ─────────────────────────── */}
            <Section title="Related Resources" description="Pair these testing patterns with the foundational guidelines for building agent-legible components.">
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "var(--space-4)" }}>
                <Link
                  to="/foundation/agent-legibility"
                  className="flex items-center transition-all"
                  style={{
                    gap: "var(--space-4)", padding: "var(--space-6)",
                    borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)",
                    backgroundColor: "var(--background)", textDecoration: "none",
                    transitionDuration: "var(--duration-short-3)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--brand-default)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                >
                  <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: "var(--radius-component)", backgroundColor: "var(--secondary)", color: "var(--foreground)" }}>
                    <Bot size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", margin: 0 }}>Agent Legibility</p>
                    <p style={{ fontSize: "var(--text-caption, 11px)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", margin: 0, marginTop: "var(--space-1)" }}>Markup guidelines & component checklist</p>
                  </div>
                  <ArrowRight size={14} style={{ color: "var(--muted-foreground)", marginLeft: "auto" }} />
                </Link>
                <Link
                  to="/foundation/agent-legibility#component-authoring-checklist"
                  className="flex items-center transition-all"
                  style={{
                    gap: "var(--space-4)", padding: "var(--space-6)",
                    borderRadius: "var(--radius-card)", border: "1px solid var(--border-subtle)",
                    backgroundColor: "var(--background)", textDecoration: "none",
                    transitionDuration: "var(--duration-short-3)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--brand-default)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                >
                  <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: "var(--radius-component)", backgroundColor: "var(--secondary)", color: "var(--foreground)" }}>
                    <Workflow size={18} />
                  </div>
                  <div>
                    <p style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)", margin: 0 }}>Authoring Checklist</p>
                    <p style={{ fontSize: "var(--text-caption, 11px)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", margin: 0, marginTop: "var(--space-1)" }}>10-point checklist for every component</p>
                  </div>
                  <ArrowRight size={14} style={{ color: "var(--muted-foreground)", marginLeft: "auto" }} />
                </Link>
              </div>
            </Section>

          </div>

          {/* Footer */}
          <div className="border-t flex items-center justify-between" style={{ padding: "var(--space-8) 0", borderColor: "var(--secondary)" }}>
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>
              HollaEx Design System · Testing with Agents
            </p>
          </div>
        </FadeInContent>
      </div>

      <SectionJumpFab />
    </div>
  );
}
