import { useState } from "react";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { ButtonGroup, ButtonGroupItem } from "../ui/hx-button-group";
import { LayoutGrid, List, AlignLeft } from "lucide-react";

export function ButtonGroupPage() {
  const [active, setActive] = useState("grid");
  return (
    <ComponentPage name="Button Group" description="Horizontally joined buttons with a shared border container. Uses context for consistent sizing. Ideal for view toggles and segmented controls.">
      <Section title="Basic" description="Text-based button groups with active state.">
        <ExampleRow label="Default">
          <ButtonGroup>
            <ButtonGroupItem active={active === "grid"} onClick={() => setActive("grid")}>Grid</ButtonGroupItem>
            <ButtonGroupItem active={active === "list"} onClick={() => setActive("list")}>List</ButtonGroupItem>
            <ButtonGroupItem active={active === "table"} onClick={() => setActive("table")}>Table</ButtonGroupItem>
          </ButtonGroup>
        </ExampleRow>
      </Section>
      <Section title="With Icons" description="Icon-only or icon+label button groups.">
        <ExampleRow label="Icon + label">
          <ButtonGroup>
            <ButtonGroupItem icon={<LayoutGrid />} active>Grid</ButtonGroupItem>
            <ButtonGroupItem icon={<List />}>List</ButtonGroupItem>
            <ButtonGroupItem icon={<AlignLeft />}>Detail</ButtonGroupItem>
          </ButtonGroup>
        </ExampleRow>
        <div className="mt-3">
          <ExampleRow label="Icon only">
            <ButtonGroup>
              <ButtonGroupItem icon={<LayoutGrid />} active />
              <ButtonGroupItem icon={<List />} />
              <ButtonGroupItem icon={<AlignLeft />} />
            </ButtonGroup>
          </ExampleRow>
        </div>
      </Section>
      <Section title="Sizes" description="Five sizes from xs to xl.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <ExampleRow key={size} label={size.toUpperCase()}>
              <ButtonGroup size={size}>
                <ButtonGroupItem active>Active</ButtonGroupItem>
                <ButtonGroupItem>Default</ButtonGroupItem>
                <ButtonGroupItem>Default</ButtonGroupItem>
              </ButtonGroup>
            </ExampleRow>
          ))}
        </div>
      </Section>
      <Section title="States">
        <ExampleRow label="Disabled">
          <ButtonGroup>
            <ButtonGroupItem active>Active</ButtonGroupItem>
            <ButtonGroupItem disabled>Disabled</ButtonGroupItem>
            <ButtonGroupItem>Default</ButtonGroupItem>
          </ButtonGroup>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}