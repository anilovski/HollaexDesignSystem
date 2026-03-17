import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { Checkbox } from "../ui/hx-checkbox";

export function CheckboxPage() {
  return (
    <ComponentPage name="Checkbox" description="Accessible form control with checked, unchecked, and indeterminate states. Supports labels, helper text, error states, and skeleton loading.">
      <Section title="States" description="All checkbox visual states.">
        <ExampleGrid label="Interactive states">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <Checkbox label="Label" helperText="Helper text">Unchecked</Checkbox>
            <Checkbox label="Label" helperText="Helper text" defaultChecked>Checked</Checkbox>
            <Checkbox label="Label" helperText="Helper text" indeterminate>Indeterminate</Checkbox>
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Error State" description="Visual error feedback with red border and text.">
        <ExampleGrid label="Error">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <Checkbox label="Terms" error helperText="You must accept the terms">I agree to the Terms of Service</Checkbox>
            <Checkbox label="Terms" error defaultChecked helperText="Error persists even when checked">Checked with error</Checkbox>
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Disabled State">
        <ExampleGrid label="Disabled">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <Checkbox label="Label" disabled helperText="This option is not available">Disabled unchecked</Checkbox>
            <Checkbox label="Label" disabled defaultChecked helperText="Cannot be unchecked">Disabled checked</Checkbox>
            <Checkbox label="Label" disabled indeterminate helperText="Indeterminate disabled">Disabled indeterminate</Checkbox>
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Skeleton">
        <ExampleGrid label="Loading"><Checkbox skeleton label="Label" helperText="Helper text">Loading</Checkbox></ExampleGrid>
      </Section>
    </ComponentPage>
  );
}