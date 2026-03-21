import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { Button } from "../ui/hollaex-button";
import { ArrowRight, Download, Trash2, Plus, Search } from "lucide-react";
import { PropsTable, type PropDef } from "../docs/props-table";

const BUTTON_PROPS: PropDef[] = [
  { name: "variant", type: '"primary" | "secondary" | "outline-primary" | "outline-secondary" | "ghost-primary" | "ghost-secondary" | "danger-primary" | "danger-outline" | "danger-ghost"', default: '"primary"', description: "Visual style of the button" },
  { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Button height preset" },
  { name: "corners", type: '"rounded" | "sharp"', default: '"rounded"', description: "Border radius style" },
  { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and disables interaction" },
  { name: "leftIcon", type: "ReactNode", description: "Icon rendered before the label" },
  { name: "rightIcon", type: "ReactNode", description: "Icon rendered after the label" },
  { name: "iconOnly", type: "boolean", default: "false", description: "Square aspect ratio for icon-only buttons" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the button" },
  { name: "copyText", type: "string", description: "Text copied to clipboard on click. Button label temporarily changes to 'Copied!'" },
];

const CODE_VARIANTS = `import { Button } from "@hollaex/ui"

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger-primary">Danger</Button>`;

const CODE_ICONS = `<Button leftIcon={<Download size={16} />}>Download</Button>
<Button rightIcon={<ArrowRight size={16} />}>Continue</Button>
<Button leftIcon={<Plus size={16} />} rightIcon={<ArrowRight size={16} />}>
  Create
</Button>`;

export function ButtonPage() {
  return (
    <ComponentPage name="Button" description="Primary interactive element with 9 style variants, 5 sizes, loading states, and icon support.">
      <Section title="Variants" description="Nine visual styles for different levels of emphasis and intent.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleRow label="Filled" code={CODE_VARIANTS}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger-primary">Danger</Button>
          </ExampleRow>
          <ExampleRow label="Outline">
            <Button variant="outline-primary">Outline Primary</Button>
            <Button variant="outline-secondary">Outline Secondary</Button>
            <Button variant="danger-outline">Danger Outline</Button>
          </ExampleRow>
          <ExampleRow label="Ghost">
            <Button variant="ghost-primary">Ghost Primary</Button>
            <Button variant="ghost-secondary">Ghost Secondary</Button>
            <Button variant="danger-ghost">Danger Ghost</Button>
          </ExampleRow>
        </div>
      </Section>
      <Section title="Sizes" description="Five sizes from xs (24px) to xl (56px).">
        <ExampleRow label="All sizes">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </ExampleRow>
      </Section>
      <Section title="With Icons" description="Buttons support left and right icon slots that auto-size.">
        <ExampleRow label="Icons" code={CODE_ICONS}>
          <Button leftIcon={<Download />}>Download</Button>
          <Button rightIcon={<ArrowRight />}>Continue</Button>
          <Button leftIcon={<Plus />} rightIcon={<ArrowRight />}>Create</Button>
          <Button variant="danger-primary" leftIcon={<Trash2 />}>Delete</Button>
        </ExampleRow>
      </Section>
      <Section title="Icon Only" description="Square buttons when only an icon is needed.">
        <ExampleRow label="Icon only">
          <Button iconOnly size="xs" leftIcon={<Search />} />
          <Button iconOnly size="sm" leftIcon={<Search />} />
          <Button iconOnly size="md" leftIcon={<Search />} />
          <Button iconOnly size="lg" leftIcon={<Plus />} />
          <Button iconOnly size="xl" leftIcon={<Plus />} />
        </ExampleRow>
      </Section>
      <Section title="States" description="Loading and disabled states across all variant families.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleRow label="Primary">
            <Button variant="primary">Default</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </ExampleRow>
          <ExampleRow label="Secondary">
            <Button variant="secondary">Default</Button>
            <Button variant="secondary" loading>Loading</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </ExampleRow>
          <ExampleRow label="Outline">
            <Button variant="outline-primary">Default</Button>
            <Button variant="outline-primary" loading>Loading</Button>
            <Button variant="outline-primary" disabled>Disabled</Button>
          </ExampleRow>
          <ExampleRow label="Outline Secondary">
            <Button variant="outline-secondary">Default</Button>
            <Button variant="outline-secondary" loading>Loading</Button>
            <Button variant="outline-secondary" disabled>Disabled</Button>
          </ExampleRow>
          <ExampleRow label="Ghost">
            <Button variant="ghost-primary">Default</Button>
            <Button variant="ghost-primary" loading>Loading</Button>
            <Button variant="ghost-primary" disabled>Disabled</Button>
          </ExampleRow>
          <ExampleRow label="Danger">
            <Button variant="danger-primary">Default</Button>
            <Button variant="danger-primary" loading>Loading</Button>
            <Button variant="danger-primary" disabled>Disabled</Button>
          </ExampleRow>
          <ExampleRow label="Danger Outline">
            <Button variant="danger-outline">Default</Button>
            <Button variant="danger-outline" loading>Loading</Button>
            <Button variant="danger-outline" disabled>Disabled</Button>
          </ExampleRow>
        </div>
      </Section>
      <Section title="Corners" description="Rounded (default 8px) or sharp (0px) corners.">
        <ExampleRow label="Corners">
          <Button corners="rounded">Rounded</Button>
          <Button corners="sharp">Sharp</Button>
        </ExampleRow>
      </Section>
      <Section title="API Reference" description="All available props for the Button component.">
        <PropsTable props={BUTTON_PROPS} componentName="Button" />
      </Section>
    </ComponentPage>
  );
}