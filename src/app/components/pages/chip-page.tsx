import { useState } from "react";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { PropsTable, type PropDef } from "../docs/props-table";
import { Chip } from "../ui/hx-chip";
import { Star, Zap } from "lucide-react";

const CHIP_PROPS: PropDef[] = [
  { name: "variant", type: '"neutral" | "informational" | "success" | "warning" | "error" | "brand"', default: '"neutral"', description: "Color variant" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Chip size preset" },
  { name: "leftIcon", type: "ReactNode", description: "Icon rendered before the label" },
  { name: "removable", type: "boolean", default: "false", description: "Shows a remove (x) button" },
  { name: "onRemove", type: "() => void", description: "Callback when the remove button is clicked" },
  { name: "selected", type: "boolean", default: "false", description: "Highlighted selected state" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables interaction" },
  { name: "skeleton", type: "boolean", default: "false", description: "Renders a loading skeleton" },
];

const CODE_BASIC = `import { HxChip } from "@hollaex/ui"

<HxChip variant="neutral">Default</HxChip>
<HxChip variant="brand">Brand</HxChip>
<HxChip variant="success">Active</HxChip>
<HxChip removable onRemove={() => {}}>Removable</HxChip>`;

export function ChipPage() {
  const [selected, setSelected] = useState(false);
  return (
    <ComponentPage name="Chip" description="Tag/filter component for coins, categories, or selections. Supports white and gray backgrounds, round and rounded shapes, and selected/removable states.">
      <Section title="Colors" description='White (default) and gray background themes.'>
        <ExampleRow label="Color variants" code={CODE_BASIC}><Chip color="white">White</Chip><Chip color="gray">Gray</Chip></ExampleRow>
      </Section>
      <Section title="Shapes" description='Round (pill) or rounded (8px) border radius.'>
        <ExampleRow label="Shape variants"><Chip variant="round">Round</Chip><Chip variant="rounded">Rounded</Chip></ExampleRow>
      </Section>
      <Section title="Sizes" description="Four sizes from xs to lg.">
        <ExampleRow label="All sizes"><Chip size="xs">Extra Small</Chip><Chip size="sm">Small</Chip><Chip size="md">Medium</Chip><Chip size="lg">Large</Chip></ExampleRow>
      </Section>
      <Section title="With Icons" description="Left icon or right icon slots.">
        <ExampleRow label="Icons"><Chip icon={<Star />}>Featured</Chip><Chip rightIcon={<Zap />}>Premium</Chip></ExampleRow>
      </Section>
      <Section title="With Counter" description="Counter badge on the right side.">
        <ExampleRow label="Counter"><Chip counter={5}>Bitcoin</Chip><Chip counter={12} color="gray">Ethereum</Chip></ExampleRow>
      </Section>
      <Section title="Selected State" description="Toggle between default and selected (blue) states.">
        <ExampleRow label="Interactive"><Chip selected={selected} onClick={() => setSelected(!selected)}>Click to toggle</Chip><Chip selected>Always selected</Chip></ExampleRow>
      </Section>
      <Section title="Removable" description="Chips with a close/remove button.">
        <ExampleRow label="Removable"><Chip onRemove={() => {}}>BTC</Chip><Chip onRemove={() => {}} color="gray">ETH</Chip><Chip onRemove={() => {}} selected>XRP</Chip></ExampleRow>
      </Section>
      <Section title="States">
        <ExampleRow label="Disabled"><Chip disabled>Disabled</Chip><Chip disabled selected>Disabled Selected</Chip></ExampleRow>
      </Section>
      <Section title="API Reference" description="All available props for the HxChip component.">
        <PropsTable props={CHIP_PROPS} componentName="HxChip" />
      </Section>
    </ComponentPage>
  );
}
