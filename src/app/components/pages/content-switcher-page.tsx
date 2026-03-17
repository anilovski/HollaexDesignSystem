import { useState } from "react";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { ContentSwitcher } from "../ui/hx-content-switcher";
import { LayoutGrid, List, AlignLeft } from "lucide-react";

const textItems = [
  { value: "overview", label: "Overview" },
  { value: "details", label: "Details" },
  { value: "history", label: "History" },
];
const iconItems = [
  { value: "grid", icon: <LayoutGrid size={16} /> },
  { value: "list", icon: <List size={16} /> },
  { value: "detail", icon: <AlignLeft size={16} /> },
];

export function ContentSwitcherPage() {
  const [value, setValue] = useState("overview");
  return (
    <ComponentPage name="Content Switcher" description="Tab-like control for switching between content sections. Supports text and icon-only modes, white and gray backgrounds, and 4 sizes.">
      <Section title="Text Mode" description="Label-based switching control.">
        <ExampleRow label="Default"><ContentSwitcher items={textItems} value={value} onChange={setValue} /></ExampleRow>
      </Section>
      <Section title="Icon Mode" description="Icon-only switching control.">
        <ExampleRow label="Icons"><ContentSwitcher items={iconItems} type="icon" defaultValue="grid" /></ExampleRow>
      </Section>
      <Section title="Colors" description="White (default) and gray background themes.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleRow label="White"><ContentSwitcher items={textItems} color="white" defaultValue="overview" /></ExampleRow>
          <ExampleRow label="Gray"><ContentSwitcher items={textItems} color="gray" defaultValue="overview" /></ExampleRow>
        </div>
      </Section>
      <Section title="Sizes" description="Four sizes from xs to lg.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <ExampleRow key={size} label={size.toUpperCase()}><ContentSwitcher items={textItems} size={size} defaultValue="overview" /></ExampleRow>
          ))}
        </div>
      </Section>
      <Section title="Disabled">
        <ExampleRow label="Disabled state"><ContentSwitcher items={textItems} defaultValue="overview" disabled /></ExampleRow>
      </Section>
    </ComponentPage>
  );
}