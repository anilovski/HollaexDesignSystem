import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { PropsTable, type PropDef } from "../docs/props-table";
import { Badge } from "../ui/hx-badge";
import { Star, Zap } from "lucide-react";

const BADGE_PROPS: PropDef[] = [
  { name: "variant", type: '"neutral-white" | "neutral-gray" | "informational" | "success" | "warning" | "error" | "black" | "olive" | "purple" | "orange" | "pink"', default: '"informational"', description: "Color variant" },
  { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Badge size preset" },
  { name: "shape", type: '"circular" | "rounded"', default: '"circular"', description: "Border radius style" },
  { name: "indicator", type: '"green" | "red" | "yellow" | "blue"', description: "Optional colored dot indicator" },
  { name: "leftIcon", type: "ReactNode", description: "Icon before the label" },
  { name: "counter", type: "number", description: "Numeric counter badge" },
  { name: "skeleton", type: "boolean", default: "false", description: "Renders a loading skeleton" },
];

const CODE_BASIC = `import { HxBadge } from "@hollaex/ui"

<HxBadge variant="informational">Info</HxBadge>
<HxBadge variant="success">Success</HxBadge>
<HxBadge variant="warning">Warning</HxBadge>
<HxBadge variant="error">Error</HxBadge>`;

export function BadgePage() {
  return (
    <ComponentPage name="Badge" description="Colored labels with 11 color variants, indicator dots, icons, and counter bubbles. Available in circular (pill) and rounded shapes.">
      <Section title="Color Variants" description="Eleven color options for different semantic purposes.">
        <ExampleRow label="All variants" code={CODE_BASIC}>
          <Badge variant="neutral-white">White</Badge>
          <Badge variant="neutral-gray">Gray</Badge>
          <Badge variant="informational">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="black">Black</Badge>
          <Badge variant="olive">Olive</Badge>
          <Badge variant="purple">Purple</Badge>
          <Badge variant="orange">Orange</Badge>
          <Badge variant="pink">Pink</Badge>
        </ExampleRow>
      </Section>
      <Section title="Shapes" description="Circular (pill) or rounded (6px) border radius.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleRow label="Circular (pill)">
            <Badge shape="circular" variant="informational">Circular</Badge>
            <Badge shape="circular" variant="success">Active</Badge>
            <Badge shape="circular" variant="error">Failed</Badge>
          </ExampleRow>
          <ExampleRow label="Rounded">
            <Badge shape="rounded" variant="informational">Rounded</Badge>
            <Badge shape="rounded" variant="success">Active</Badge>
            <Badge shape="rounded" variant="error">Failed</Badge>
          </ExampleRow>
        </div>
      </Section>
      <Section title="Sizes" description="Five sizes from xs to xl.">
        <ExampleRow label="All sizes">
          <Badge size="xs">XS</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
          <Badge size="xl">Extra Large</Badge>
        </ExampleRow>
      </Section>
      <Section title="With Indicators" description="Status dots in green, red, yellow, or blue.">
        <ExampleRow label="Indicator dots">
          <Badge variant="neutral-white" indicator="green">Online</Badge>
          <Badge variant="neutral-white" indicator="red">Offline</Badge>
          <Badge variant="neutral-white" indicator="yellow">Away</Badge>
          <Badge variant="neutral-white" indicator="blue">Busy</Badge>
        </ExampleRow>
      </Section>
      <Section title="With Icons" description="Left icon slot with auto-sizing.">
        <ExampleRow label="Icons">
          <Badge variant="informational" leftIcon={<Star />}>Featured</Badge>
          <Badge variant="warning" leftIcon={<Zap />}>Premium</Badge>
        </ExampleRow>
      </Section>
      <Section title="With Counter" description="Counter bubble on the right.">
        <ExampleRow label="Counter">
          <Badge variant="informational" counter={3}>Messages</Badge>
          <Badge variant="error" counter={12}>Alerts</Badge>
          <Badge variant="black" counter={99}>Notifications</Badge>
        </ExampleRow>
        <ExampleRow label="Colored counters">
          <Badge variant="success" counter={5}>Passed</Badge>
          <Badge variant="warning" counter={2}>Pending</Badge>
          <Badge variant="purple" counter={8}>Issues</Badge>
          <Badge variant="orange" counter={4}>Updates</Badge>
          <Badge variant="pink" counter={7}>Mentions</Badge>
        </ExampleRow>
      </Section>
      <Section title="Skeleton">
        <ExampleRow label="Loading">
          <Badge skeleton size="sm" />
          <Badge skeleton size="md" />
          <Badge skeleton size="lg" />
        </ExampleRow>
      </Section>
      <Section title="API Reference" description="All available props for the HxBadge component.">
        <PropsTable props={BADGE_PROPS} componentName="HxBadge" />
      </Section>
    </ComponentPage>
  );
}