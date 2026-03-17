import { useState } from "react";
import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { Stepper, type Step } from "../ui/hx-stepper";
import { User, CreditCard, ShieldCheck, Package, Truck } from "lucide-react";

/* ── Sample data ─────────────────────────────────── */

const basicSteps: Step[] = [
  { label: "Account" },
  { label: "Details" },
  { label: "Payment" },
  { label: "Confirm" },
];

const withDescriptions: Step[] = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Complete your profile" },
  { label: "Verification", description: "Verify your identity" },
  { label: "Complete", description: "You're all set" },
];

const withIcons: Step[] = [
  { label: "Account", icon: <User size={14} /> },
  { label: "Payment", icon: <CreditCard size={14} /> },
  { label: "Verification", icon: <ShieldCheck size={14} /> },
  { label: "Complete", icon: <Package size={14} /> },
];

const errorSteps: Step[] = [
  { label: "Shipping", status: "completed" },
  { label: "Payment", status: "error" },
  { label: "Review" },
  { label: "Complete" },
];

const orderSteps: Step[] = [
  { label: "Ordered", description: "Order placed successfully" },
  { label: "Processing", description: "Preparing your items" },
  { label: "Shipped", description: "On its way to you" },
  { label: "Delivered", description: "Enjoy your purchase" },
];

/* ── Page ─────────────────────────────────────────── */

export function StepperPage() {
  const [activeBasic, setActiveBasic] = useState(1);
  const [activeDesc, setActiveDesc] = useState(2);
  const [activeIcons, setActiveIcons] = useState(1);
  const [activeClickable, setActiveClickable] = useState(0);
  const [activeVertical, setActiveVertical] = useState(2);
  const [activeOrder, setActiveOrder] = useState(1);

  return (
    <ComponentPage
      name="Stepper"
      description="Steppers communicate progress through a sequence of logical and numbered steps. They may also be used for navigation. All styling is driven by CSS variables for easy theming."
    >
      {/* ── Basic ─────────────────────────────────── */}
      <Section
        title="Basic"
        description="A simple horizontal stepper with numbered step indicators. Use the buttons to navigate between steps."
      >
        <ExampleGrid label="Horizontal">
          <div className="flex flex-col w-full" style={{ gap: "var(--space-8)" }}>
            <Stepper steps={basicSteps} activeStep={activeBasic} />
            <div className="flex justify-center" style={{ gap: "var(--space-4)" }}>
              <button
                type="button"
                onClick={() => setActiveBasic((v) => Math.max(0, v - 1))}
                disabled={activeBasic === 0}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeBasic === 0 ? "var(--secondary-subtle)" : "var(--secondary-default)",
                  color: activeBasic === 0 ? "var(--color-text-disabled)" : "var(--secondary-fg)",
                  border: "none",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveBasic((v) => Math.min(basicSteps.length - 1, v + 1))}
                disabled={activeBasic === basicSteps.length - 1}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeBasic === basicSteps.length - 1 ? "var(--brand-disabled)" : "var(--brand-default)",
                  color: "var(--brand-fg)",
                  border: "none",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── With Descriptions ─────────────────────── */}
      <Section
        title="With Descriptions"
        description="Steps can include a short description below the label for additional context."
      >
        <ExampleGrid label="Labels + descriptions">
          <div className="flex flex-col w-full" style={{ gap: "var(--space-8)" }}>
            <Stepper steps={withDescriptions} activeStep={activeDesc} />
            <div className="flex justify-center" style={{ gap: "var(--space-4)" }}>
              <button
                type="button"
                onClick={() => setActiveDesc((v) => Math.max(0, v - 1))}
                disabled={activeDesc === 0}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeDesc === 0 ? "var(--secondary-subtle)" : "var(--secondary-default)",
                  color: activeDesc === 0 ? "var(--color-text-disabled)" : "var(--secondary-fg)",
                  border: "none",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveDesc((v) => Math.min(withDescriptions.length - 1, v + 1))}
                disabled={activeDesc === withDescriptions.length - 1}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeDesc === withDescriptions.length - 1 ? "var(--brand-disabled)" : "var(--brand-default)",
                  color: "var(--brand-fg)",
                  border: "none",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── With Icons ────────────────────────────── */}
      <Section
        title="Custom Icons"
        description="Replace the default step numbers with custom icons for a more descriptive stepper."
      >
        <ExampleGrid label="Icon indicators">
          <div className="flex flex-col w-full" style={{ gap: "var(--space-8)" }}>
            <Stepper steps={withIcons} activeStep={activeIcons} />
            <div className="flex justify-center" style={{ gap: "var(--space-4)" }}>
              <button
                type="button"
                onClick={() => setActiveIcons((v) => Math.max(0, v - 1))}
                disabled={activeIcons === 0}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeIcons === 0 ? "var(--secondary-subtle)" : "var(--secondary-default)",
                  color: activeIcons === 0 ? "var(--color-text-disabled)" : "var(--secondary-fg)",
                  border: "none",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveIcons((v) => Math.min(withIcons.length - 1, v + 1))}
                disabled={activeIcons === withIcons.length - 1}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeIcons === withIcons.length - 1 ? "var(--brand-disabled)" : "var(--brand-default)",
                  color: "var(--brand-fg)",
                  border: "none",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Error State ───────────────────────────── */}
      <Section
        title="Error State"
        description="A step can show an error status to indicate something went wrong at that stage."
      >
        <ExampleGrid label="Step with error">
          <Stepper steps={errorSteps} activeStep={1} className="w-full" />
        </ExampleGrid>
      </Section>

      {/* ── Sizes ─────────────────────────────────── */}
      <Section
        title="Sizes"
        description="Three indicator sizes are available: small (24px), medium (32px, default), and large (40px)."
      >
        <ExampleGrid label="Small">
          <Stepper steps={basicSteps} activeStep={2} size="sm" className="w-full" />
        </ExampleGrid>
        <ExampleGrid label="Medium (default)">
          <Stepper steps={basicSteps} activeStep={2} size="md" className="w-full" />
        </ExampleGrid>
        <ExampleGrid label="Large">
          <Stepper steps={basicSteps} activeStep={2} size="lg" className="w-full" />
        </ExampleGrid>
      </Section>

      {/* ── Clickable ─────────────────────────────── */}
      <Section
        title="Clickable Steps"
        description="Enable clicking on completed or active steps to jump back in the flow."
      >
        <ExampleGrid label="Click any completed step">
          <div className="flex flex-col w-full" style={{ gap: "var(--space-6)" }}>
            <Stepper
              steps={basicSteps}
              activeStep={activeClickable}
              clickable
              onStepClick={setActiveClickable}
            />
            <div className="flex items-center justify-center gap-2">
              <span
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-family-supreme)",
                }}
              >
                Current step:
              </span>
              <span
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--brand-default)",
                  fontWeight: "var(--font-weight-medium)",
                  fontFamily: "var(--font-family-supreme)",
                }}
              >
                {basicSteps[activeClickable].label} ({activeClickable + 1}/{basicSteps.length})
              </span>
            </div>
            <div className="flex justify-center" style={{ gap: "var(--space-4)" }}>
              <button
                type="button"
                onClick={() => setActiveClickable((v) => Math.max(0, v - 1))}
                disabled={activeClickable === 0}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeClickable === 0 ? "var(--secondary-subtle)" : "var(--secondary-default)",
                  color: activeClickable === 0 ? "var(--color-text-disabled)" : "var(--secondary-fg)",
                  border: "none",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveClickable((v) => Math.min(basicSteps.length - 1, v + 1))}
                disabled={activeClickable === basicSteps.length - 1}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeClickable === basicSteps.length - 1 ? "var(--brand-disabled)" : "var(--brand-default)",
                  color: "var(--brand-fg)",
                  border: "none",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Vertical ──────────────────────────────── */}
      <Section
        title="Vertical"
        description="Use the vertical orientation for sidebar or mobile-friendly step sequences."
      >
        <ExampleGrid label="Vertical stepper">
          <div className="flex gap-12 w-full">
            <Stepper
              steps={withDescriptions}
              activeStep={activeVertical}
              orientation="vertical"
            />
            <div className="flex flex-col justify-center" style={{ gap: "var(--space-4)" }}>
              <button
                type="button"
                onClick={() => setActiveVertical((v) => Math.max(0, v - 1))}
                disabled={activeVertical === 0}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeVertical === 0 ? "var(--secondary-subtle)" : "var(--secondary-default)",
                  color: activeVertical === 0 ? "var(--color-text-disabled)" : "var(--secondary-fg)",
                  border: "none",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveVertical((v) => Math.min(withDescriptions.length - 1, v + 1))}
                disabled={activeVertical === withDescriptions.length - 1}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeVertical === withDescriptions.length - 1 ? "var(--brand-disabled)" : "var(--brand-default)",
                  color: "var(--brand-fg)",
                  border: "none",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Vertical with icons ───────────────────── */}
      <Section
        title="Vertical with Icons"
        description="Vertical orientation combined with custom step icons — great for order tracking flows."
      >
        <ExampleGrid label="Order tracking">
          <div className="flex gap-12 w-full">
            <Stepper
              steps={[
                { label: "Ordered", description: "Order placed successfully", icon: <Package size={14} /> },
                { label: "Processing", description: "Preparing your items", icon: <CreditCard size={14} /> },
                { label: "Shipped", description: "On its way to you", icon: <Truck size={14} /> },
                { label: "Delivered", description: "Enjoy your purchase", icon: <ShieldCheck size={14} /> },
              ]}
              activeStep={activeOrder}
              orientation="vertical"
              size="lg"
            />
            <div className="flex flex-col justify-center" style={{ gap: "var(--space-4)" }}>
              <button
                type="button"
                onClick={() => setActiveOrder((v) => Math.max(0, v - 1))}
                disabled={activeOrder === 0}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeOrder === 0 ? "var(--secondary-subtle)" : "var(--secondary-default)",
                  color: activeOrder === 0 ? "var(--color-text-disabled)" : "var(--secondary-fg)",
                  border: "none",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveOrder((v) => Math.min(3, v + 1))}
                disabled={activeOrder === 3}
                className="px-4 py-2 rounded-[var(--radius-button)] transition-colors cursor-pointer disabled:cursor-not-allowed"
                style={{
                  fontSize: "var(--text-label)",
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  backgroundColor: activeOrder === 3 ? "var(--brand-disabled)" : "var(--brand-default)",
                  color: "var(--brand-fg)",
                  border: "none",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── All Completed ─────────────────────────── */}
      <Section
        title="All Completed"
        description="When the active step is past the last index, all steps show as completed."
      >
        <ExampleGrid label="Flow complete">
          <Stepper steps={basicSteps} activeStep={basicSteps.length} className="w-full" />
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}