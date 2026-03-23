import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { PropsTable, type PropDef } from "../docs/props-table";
import { Accordion, AccordionItem } from "../ui/accordion";

const ACCORDION_PROPS: PropDef[] = [
  { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Whether one or multiple items can be expanded" },
  { name: "defaultValue", type: "string | string[]", description: "Initially expanded item(s)" },
  { name: "collapsible", type: "boolean", default: "true", description: "Whether all items can be collapsed" },
];

export function AccordionPage() {
  return (
    <ComponentPage name="Accordion" description="Collapsible sections with expandable headers. Supports white and gray styles, 5 sizes, and left/right chevron alignment.">
      <Section title="Styles" description='White (default) and gray background themes.'>
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleGrid label="White style">
            <Accordion style="white">
              <AccordionItem title="What is HollaEx?" defaultOpen><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>HollaEx is a white-label crypto exchange platform.</p></AccordionItem>
              <AccordionItem title="How do I get started?"><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>Sign up and follow the quick-start guide.</p></AccordionItem>
              <AccordionItem title="What currencies are supported?"><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>Bitcoin, Ethereum, and many more.</p></AccordionItem>
            </Accordion>
          </ExampleGrid>
          <ExampleGrid label="Gray style">
            <Accordion style="gray">
              <AccordionItem title="Account Settings"><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>Manage your profile, security, and preferences.</p></AccordionItem>
              <AccordionItem title="Trading Fees"><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>View the fee schedule for all trading pairs.</p></AccordionItem>
            </Accordion>
          </ExampleGrid>
        </div>
      </Section>
      <Section title="Sizes" description="Five sizes control header padding and font size.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["xs","sm","md","lg","xl"] as const).map((size) => (
            <ExampleGrid key={size} label={size.toUpperCase()}>
              <Accordion size={size}><AccordionItem title={`Size ${size} accordion item`}><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>Content at {size} size.</p></AccordionItem></Accordion>
            </ExampleGrid>
          ))}
        </div>
      </Section>
      <Section title="Alignment" description="Chevron icon can be placed on the left or right.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleGrid label="Right (default)"><Accordion><AccordionItem title="Chevron on the right" alignment="right" defaultOpen><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>Default alignment.</p></AccordionItem></Accordion></ExampleGrid>
          <ExampleGrid label="Left"><Accordion><AccordionItem title="Chevron on the left" alignment="left" defaultOpen><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>Left-aligned chevron.</p></AccordionItem></Accordion></ExampleGrid>
        </div>
      </Section>
      <Section title="States">
        <ExampleGrid label="Disabled"><Accordion><AccordionItem title="This item is disabled" disabled><p style={{fontSize:"var(--text-body)",color:"var(--color-text-secondary)",fontFamily:"var(--font-family-supreme)",lineHeight:"var(--lh-body)"}}>You cannot see this.</p></AccordionItem></Accordion></ExampleGrid>
      </Section>

      <Section title="API Reference"><PropsTable props={ACCORDION_PROPS} componentName="Accordion" /></Section>
    </ComponentPage>
  );
}