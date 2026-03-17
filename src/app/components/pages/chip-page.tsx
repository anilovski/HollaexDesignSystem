import { useState } from "react";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { Chip } from "../ui/hx-chip";
import { Star, Zap } from "lucide-react";

export function ChipPage() {
  const [selected, setSelected] = useState(false);
  return (
    <ComponentPage name="Chip" description="Tag/filter component for coins, categories, or selections. Supports white and gray backgrounds, round and rounded shapes, and selected/removable states.">
      <Section title="Colors" description='White (default) and gray background themes.'>
        <ExampleRow label="Color variants"><Chip color="white">White</Chip><Chip color="gray">Gray</Chip></ExampleRow>
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
    </ComponentPage>
  );
}
