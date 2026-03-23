import { useState } from "react";
import { ComponentPage, Section, ExampleRow, ExampleGrid } from "../docs/component-page";
import { HxToggle, HxThemeToggle } from "../ui/hx-toggle";
import { useTheme } from "../theme-context";
import { PropsTable, type PropDef } from "../docs/props-table";

const TOGGLE_PROPS: PropDef[] = [
  { name: "checked", type: "boolean", description: "Controlled checked state" },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state for uncontrolled usage" },
  { name: "onChange", type: "(checked: boolean) => void", description: "Callback fired when the toggle state changes" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Toggle size preset" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables interaction" },
  { name: "label", type: "string", description: "Text label displayed next to the toggle" },
  { name: "helperText", type: "string", description: "Secondary text below the label" },
  { name: "labelLeft", type: "boolean", default: "false", description: "Renders the label on the left side" },
  { name: "skeleton", type: "boolean", default: "false", description: "Renders a loading skeleton" },
];

const CODE_BASIC = `import { HxToggle } from "@hollaex/ui"

const [enabled, setEnabled] = useState(false)

<HxToggle
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>`;

export function TogglePage() {
  const [basic, setBasic] = useState(false);
  const [on, setOn] = useState(true);
  const { theme } = useTheme();

  return (
    <ComponentPage
      name="Toggle"
      description="A switch control for toggling between two states. Includes a default variant with green fill and a special theme toggle variant with sun/moon icons for light and dark mode switching."
    >
      {/* ── 1. Default ───────────────────────── */}
      <Section title="Default Toggle" description="Standard on/off switch with green active fill.">
        <ExampleRow label="Interactive" code={CODE_BASIC}>
          <HxToggle checked={basic} onChange={setBasic} />
          <span
            style={{
              fontSize: "var(--text-label)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            {basic ? "On" : "Off"}
          </span>
        </ExampleRow>
        <ExampleRow label="States">
          <HxToggle defaultChecked={false} />
          <HxToggle defaultChecked={true} />
        </ExampleRow>
      </Section>

      {/* ── 2. Sizes ─────────────────────────── */}
      <Section title="Sizes" description="Three sizes: sm, md (default), and lg.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ExampleRow key={size} label={size.toUpperCase()}>
              <HxToggle defaultChecked={false} size={size} />
              <HxToggle defaultChecked={true} size={size} />
            </ExampleRow>
          ))}
        </div>
      </Section>

      {/* ── 3. With Label ────────────────────── */}
      <Section title="With Label" description="Label and optional helper text alongside the toggle.">
        <ExampleGrid label="Label on right (default)">
          <HxToggle
            checked={on}
            onChange={setOn}
            label="Enable notifications"
            helperText="Receive email alerts when events occur."
          />
        </ExampleGrid>
        <ExampleGrid label="Label on left">
          <HxToggle
            defaultChecked={true}
            label="Dark mode"
            helperText="Use dark color scheme across the app."
            labelLeft
          />
        </ExampleGrid>
      </Section>

      {/* ── 4. Label Sizes ───────────────────── */}
      <Section title="Labeled Sizes" description="Labels scale with the toggle size.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ExampleGrid key={size} label={size.toUpperCase()}>
              <HxToggle
                defaultChecked
                size={size}
                label="Auto-save changes"
                helperText="Save your work automatically."
              />
            </ExampleGrid>
          ))}
        </div>
      </Section>

      {/* ── 5. Disabled ──────────────────────── */}
      <Section title="Disabled States" description="Toggles that cannot be interacted with.">
        <ExampleRow label="Disabled off / on">
          <HxToggle disabled />
          <HxToggle disabled defaultChecked />
        </ExampleRow>
        <ExampleGrid label="Disabled with label">
          <HxToggle disabled label="Unavailable feature" helperText="Contact admin to enable." />
        </ExampleGrid>
        <ExampleGrid label="Disabled + checked + label">
          <HxToggle disabled defaultChecked label="Always active" helperText="This setting cannot be changed." />
        </ExampleGrid>
      </Section>

      {/* ── 6. Skeleton ──────────────────────── */}
      <Section title="Skeleton" description="Loading placeholder while data is fetching.">
        <ExampleRow label="Skeleton states">
          <HxToggle skeleton />
          <HxToggle skeleton label="Loading..." />
        </ExampleRow>
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ExampleRow key={size} label={`Skeleton ${size.toUpperCase()}`}>
              <HxToggle skeleton size={size} />
            </ExampleRow>
          ))}
        </div>
      </Section>

      {/* ── 7. Theme Toggle ──────────────────── */}
      <Section
        title="Theme Toggle"
        description="Special variant for switching between light and dark themes. Uses sun (light) and moon (dark) icons. This toggle is functional — try it!"
      >
        <ExampleGrid label="Interactive theme toggle">
          <div className="flex items-center" style={{ gap: "var(--space-5)" }}>
            <HxThemeToggle />
            <span
              style={{
                fontSize: "var(--text-label)",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Current: {theme === "dark" ? "Dark" : "Light"} mode
            </span>
          </div>
        </ExampleGrid>
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ExampleRow key={size} label={`Theme ${size.toUpperCase()}`}>
              <HxThemeToggle size={size} />
            </ExampleRow>
          ))}
        </div>
      </Section>

      {/* ── 8. All Sizes Comparison ──────────── */}
      <Section title="Size Comparison" description="Side-by-side view of all sizes across both variants.">
        <ExampleGrid label="Default toggle">
          <div className="flex items-center" style={{ gap: "var(--space-7)" }}>
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
                <HxToggle defaultChecked size={size} />
                <span
                  style={{
                    fontSize: "var(--text-overline)",
                    letterSpacing: "var(--ls-overline)",
                    textTransform: "uppercase" as const,
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-supreme)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {size}
                </span>
              </div>
            ))}
          </div>
        </ExampleGrid>
        <ExampleGrid label="Theme toggle">
          <div className="flex items-center" style={{ gap: "var(--space-7)" }}>
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center" style={{ gap: "var(--space-3)" }}>
                <HxThemeToggle size={size} />
                <span
                  style={{
                    fontSize: "var(--text-overline)",
                    letterSpacing: "var(--ls-overline)",
                    textTransform: "uppercase" as const,
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-supreme)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {size}
                </span>
              </div>
            ))}
          </div>
        </ExampleGrid>
      </Section>

      <Section title="API Reference" description="All available props for the HxToggle component.">
        <PropsTable props={TOGGLE_PROPS} componentName="HxToggle" />
      </Section>
    </ComponentPage>
  );
}