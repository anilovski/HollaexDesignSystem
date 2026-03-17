import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { Link } from "../ui/hx-link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function LinkPage() {
  return (
    <ComponentPage name="Link" description="Navigational text links in standard and inline variants. Supports 4 sizes, optional icons, visited state, and auto-detects external URLs.">
      <Section title="Variants" description="Standard links have no underline. Inline links are underlined for use within body text.">
        <ExampleRow label="Standard">
          <Link href="#" size="md">Standard link</Link>
          <Link href="#" size="md" rightIcon={<ArrowRight />}>With icon</Link>
        </ExampleRow>
        <div className="h-4" />
        <ExampleRow label="Inline">
          <Link href="#" size="md" variant="inline">Inline link</Link>
          <Link href="#" size="md" variant="inline" rightIcon={<ArrowRight />}>With icon</Link>
        </ExampleRow>
      </Section>
      <Section title="Sizes" description="Four sizes from small (14px) to huge (28px).">
        <ExampleRow label="Standard sizes">
          <Link href="#" size="sm">Small</Link>
          <Link href="#" size="md">Medium</Link>
          <Link href="#" size="lg">Large</Link>
          <Link href="#" size="huge">Huge</Link>
        </ExampleRow>
        <div className="h-4" />
        <ExampleRow label="With icons">
          <Link href="#" size="sm" rightIcon={<ArrowRight />}>Small</Link>
          <Link href="#" size="md" rightIcon={<ArrowRight />}>Medium</Link>
          <Link href="#" size="lg" rightIcon={<ArrowRight />}>Large</Link>
          <Link href="#" size="huge" rightIcon={<ArrowRight />}>Huge</Link>
        </ExampleRow>
      </Section>
      <Section title="States" description="Enabled, visited, and disabled states.">
        <ExampleRow label="States">
          <Link href="#" size="md">Enabled</Link>
          <Link href="#" size="md" visited>Visited</Link>
          <Link href="#" size="md" disabled>Disabled</Link>
        </ExampleRow>
      </Section>
      <Section title="Icons" description="Left or right icon placement.">
        <ExampleRow label="Icon positions">
          <Link href="#" size="md" leftIcon={<ArrowRight />}>Left icon</Link>
          <Link href="#" size="md" rightIcon={<ArrowRight />}>Right icon</Link>
          <Link href="#" size="md" rightIcon={<ExternalLink />}>External</Link>
        </ExampleRow>
      </Section>
      <Section title="Inline usage" description="Inline links sit naturally within body text.">
        <ExampleRow label="In a paragraph">
          <p className="text-[14px] leading-relaxed max-w-[480px] font-sans" style={{ color: "var(--color-text-secondary)" }}>
            To get started, visit the{" "}
            <Link href="#" variant="inline" size="sm">documentation</Link>{" "}
            or check out the{" "}
            <Link href="#" variant="inline" size="sm">API reference</Link>{" "}
            for detailed usage instructions.
          </p>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
