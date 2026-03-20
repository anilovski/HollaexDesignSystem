import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { Avatar } from "../ui/hx-avatar";

export function AvatarPage() {
  return (
    <ComponentPage name="Avatar" description="User profile pictures with a double-ring design. Falls back to initials when no image is available. Supports 6 sizes." hideFab>
      <Section title="Sizes" description="Six sizes from xs (24px) to 2xl (80px).">
        <ExampleRow label="All sizes with initials">
          <Avatar size="xs" name="John Doe" />
          <Avatar size="sm" name="John Doe" />
          <Avatar size="md" name="John Doe" />
          <Avatar size="lg" name="John Doe" />
          <Avatar size="xl" name="John Doe" />
          <Avatar size="2xl" name="John Doe" />
        </ExampleRow>
      </Section>
      <Section title="Initials" description="Derived from the name prop — shows first letters of first and last name.">
        <ExampleRow label="Different names">
          <Avatar size="lg" name="Alice" />
          <Avatar size="lg" name="Bob Smith" />
          <Avatar size="lg" name="Charlie Brown" />
          <Avatar size="lg" name="Diana Prince" />
        </ExampleRow>
      </Section>
      <Section title="Skeleton" description="Loading placeholder state.">
        <ExampleRow label="Skeleton">
          <Avatar size="sm" skeleton />
          <Avatar size="md" skeleton />
          <Avatar size="lg" skeleton />
          <Avatar size="xl" skeleton />
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
