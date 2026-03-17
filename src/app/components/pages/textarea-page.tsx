import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { HxTextarea } from "../ui/hx-textarea";

export function TextareaPage() {
  return (
    <ComponentPage name="Textarea" description="Multi-line text input with support for labels, validation states, character count, and the HollaEx focus line animation.">
      <Section title="Styles" description="Gray (default) and white background styles.">
        <ExampleGrid label="Gray & White">
          <div className="flex" style={{ gap: "var(--space-7)" }}>
            <div className="w-80"><HxTextarea style="gray" label="Gray style" placeholder="Enter description..." /></div>
            <div className="w-80"><HxTextarea style="white" label="White style" placeholder="Enter description..." /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Corners" description="Sharp (default) or rounded corners.">
        <ExampleGrid label="Sharp & Rounded">
          <div className="flex" style={{ gap: "var(--space-7)" }}>
            <div className="w-80"><HxTextarea corners="sharp" label="Sharp" placeholder="Enter text..." /></div>
            <div className="w-80"><HxTextarea corners="rounded" label="Rounded" placeholder="Enter text..." /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Sizes" description="Three sizes to match form layouts.">
        <ExampleGrid label="All sizes">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-80"><HxTextarea size="sm" label="Small" placeholder="Enter text..." rows={3} /></div>
            <div className="w-80"><HxTextarea size="md" label="Medium (default)" placeholder="Enter text..." rows={4} /></div>
            <div className="w-80"><HxTextarea size="lg" label="Large" placeholder="Enter text..." rows={5} /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Character Count" description="Show remaining character count with a max limit.">
        <ExampleGrid label="With max length">
          <div className="w-80"><HxTextarea label="Bio" placeholder="Tell us about yourself..." maxLength={200} showCount defaultValue="I'm a crypto enthusiast who loves building decentralized applications." /></div>
        </ExampleGrid>
      </Section>

      <Section title="Validation States" description="Error, warning, and disabled states with helper messages.">
        <ExampleGrid label="States">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-80"><HxTextarea state="error" label="Error" placeholder="Enter text..." errorText="Description is required" corners="rounded" /></div>
            <div className="w-80"><HxTextarea state="warning" label="Warning" placeholder="Enter text..." warningText="Contains potentially sensitive information" corners="rounded" /></div>
            <div className="w-80"><HxTextarea state="disabled" label="Disabled" placeholder="Enter text..." defaultValue="This field is locked" /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Resize Options" description="Control whether the user can resize the textarea.">
        <ExampleGrid label="Resize">
          <div className="flex" style={{ gap: "var(--space-7)" }}>
            <div className="w-64"><HxTextarea label="No resize" placeholder="Fixed..." resize="none" rows={3} /></div>
            <div className="w-64"><HxTextarea label="Vertical" placeholder="Resize vertically..." resize="vertical" rows={3} /></div>
            <div className="w-64"><HxTextarea label="Both" placeholder="Resize both..." resize="both" rows={3} /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="With Helper Text" description="Additional guidance below the textarea.">
        <ExampleGrid label="Helper">
          <div className="w-80"><HxTextarea label="Withdrawal memo" placeholder="Optional memo for this transaction..." helperText="Some networks require a memo for deposits to be credited correctly." rows={3} /></div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}
