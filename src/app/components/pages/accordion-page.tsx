import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { Accordion, AccordionItem } from "../ui/accordion";

export function AccordionPage() {
  return (
    <ComponentPage name="Accordion" description="Collapsible sections with expandable headers. Supports white and gray styles, 5 sizes, and left/right chevron alignment.">
      <Section title="Styles" description='White (default) and gray background themes.'>
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleGrid label="White style">
            <Accordion style="white">
              <AccordionItem title="What is HollaEx?" defaultOpen><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>HollaEx is a white-label crypto exchange platform.</p></AccordionItem>
              <AccordionItem title="How do I get started?"><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>Sign up and follow the quick-start guide.</p></AccordionItem>
              <AccordionItem title="What currencies are supported?"><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>Bitcoin, Ethereum, and many more.</p></AccordionItem>
            </Accordion>
          </ExampleGrid>
          <ExampleGrid label="Gray style">
            <Accordion style="gray">
              <AccordionItem title="Account Settings"><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>Manage your profile, security, and preferences.</p></AccordionItem>
              <AccordionItem title="Trading Fees"><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>View the fee schedule for all trading pairs.</p></AccordionItem>
            </Accordion>
          </ExampleGrid>
        </div>
      </Section>
      <Section title="Sizes" description="Five sizes control header padding and font size.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["xs","sm","md","lg","xl"] as const).map((size) => (
            <ExampleGrid key={size} label={size.toUpperCase()}>
              <Accordion size={size}><AccordionItem title={`Size ${size} accordion item`}><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>Content at {size} size.</p></AccordionItem></Accordion>
            </ExampleGrid>
          ))}
        </div>
      </Section>
      <Section title="Alignment" description="Chevron icon can be placed on the left or right.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          <ExampleGrid label="Right (default)"><Accordion><AccordionItem title="Chevron on the right" alignment="right" defaultOpen><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>Default alignment.</p></AccordionItem></Accordion></ExampleGrid>
          <ExampleGrid label="Left"><Accordion><AccordionItem title="Chevron on the left" alignment="left" defaultOpen><p className="text-sm" style={{color:"var(--color-text-secondary)"}}>Left-aligned chevron.</p></AccordionItem></Accordion></ExampleGrid>
        </div>
      </Section>
      <Section title="States">
        <ExampleGrid label="Disabled"><Accordion><AccordionItem title="This item is disabled" disabled><p className="text-sm">You cannot see this.</p></AccordionItem></Accordion></ExampleGrid>
      </Section>
    </ComponentPage>
  );
}