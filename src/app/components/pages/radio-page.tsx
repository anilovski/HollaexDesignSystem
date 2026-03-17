import { useState } from "react";
import { ComponentPage, Section, ExampleRow, ExampleGrid } from "../docs/component-page";
import { RadioGroup, RadioButton } from "../ui/hx-radio";

export function RadioPage() {
  const [basic, setBasic] = useState("option-a");
  const [labeled, setLabeled] = useState("email");
  const [errorVal, setErrorVal] = useState("");
  const [horizontal, setHorizontal] = useState("left");

  return (
    <ComponentPage name="Radio Button" description="Radio buttons allow users to select a single option from a group of choices. Ideal for mutually exclusive selections.">
      <Section title="Basic" description="A simple radio group with three options.">
        <ExampleRow label="Default">
          <RadioGroup value={basic} onValueChange={setBasic}>
            <RadioButton value="option-a">Option A</RadioButton>
            <RadioButton value="option-b">Option B</RadioButton>
            <RadioButton value="option-c">Option C</RadioButton>
          </RadioGroup>
        </ExampleRow>
      </Section>
      <Section title="Labels & Helper Text" description="Radio buttons with labels and helper text for additional context.">
        <ExampleRow label="With label and helper">
          <RadioGroup value={labeled} onValueChange={setLabeled}>
            <RadioButton value="email" label="Contact method" helperText="Receive updates via email">Email notifications</RadioButton>
            <RadioButton value="sms" label="Contact method" helperText="Receive updates via SMS">SMS notifications</RadioButton>
            <RadioButton value="push" label="Contact method" helperText="Receive push alerts">Push notifications</RadioButton>
          </RadioGroup>
        </ExampleRow>
      </Section>
      <Section title="States" description="Enabled, error, and disabled states.">
        <ExampleGrid label="Unselected states">
          <div className="flex items-start" style={{ gap: "var(--space-8)" }}>
            <RadioButton value="enabled" name="demo-unsel-1">Enabled</RadioButton>
            <RadioButton value="error" name="demo-unsel-2" error>Error</RadioButton>
            <RadioButton value="disabled" name="demo-unsel-3" disabled>Disabled</RadioButton>
          </div>
        </ExampleGrid>
        <div className="h-4" />
        <ExampleGrid label="Selected states">
          <div className="flex items-start" style={{ gap: "var(--space-8)" }}>
            <RadioButton value="enabled" name="demo-sel-1" checked onChange={() => {}}>Enabled</RadioButton>
            <RadioButton value="error" name="demo-sel-2" checked error onChange={() => {}}>Error</RadioButton>
            <RadioButton value="disabled" name="demo-sel-3" checked disabled onChange={() => {}}>Disabled</RadioButton>
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Error State" description="An error state applied to the entire group.">
        <ExampleRow label="Group error">
          <RadioGroup value={errorVal} onValueChange={setErrorVal} error>
            <RadioButton value="visa" label="Payment" helperText="Select a payment method">Visa ending in 4242</RadioButton>
            <RadioButton value="mastercard" label="Payment" helperText="Select a payment method">Mastercard ending in 8888</RadioButton>
          </RadioGroup>
        </ExampleRow>
      </Section>
      <Section title="Disabled Group" description="All radios disabled at once.">
        <ExampleRow label="Disabled group">
          <RadioGroup value="standard" disabled>
            <RadioButton value="standard" label="Shipping">Standard (5-7 days)</RadioButton>
            <RadioButton value="express" label="Shipping">Express (2-3 days)</RadioButton>
            <RadioButton value="overnight" label="Shipping">Overnight</RadioButton>
          </RadioGroup>
        </ExampleRow>
      </Section>
      <Section title="Horizontal Layout" description="Radio groups laid out horizontally.">
        <ExampleRow label="Horizontal">
          <RadioGroup value={horizontal} onValueChange={setHorizontal} direction="horizontal">
            <RadioButton value="left">Left</RadioButton>
            <RadioButton value="center">Center</RadioButton>
            <RadioButton value="right">Right</RadioButton>
          </RadioGroup>
        </ExampleRow>
      </Section>
      <Section title="Skeleton">
        <ExampleRow label="Skeleton">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <RadioButton value="" skeleton label="Label" helperText="Helper">Loading option</RadioButton>
            <RadioButton value="" skeleton label="Label" helperText="Helper">Loading option</RadioButton>
          </div>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}