import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { Alert } from "../ui/alert";

export function AlertPage() {
  return (
    <ComponentPage name="Alert" description="Status notifications with icons, accent bars, titles, descriptions, and action buttons. Supports info, warning, success, and error states.">
      <Section title="Status Variants" description="Four status types with distinct colors and icons.">
        <ExampleGrid label="All statuses">
          <Alert status="info" title="Your account has been verified successfully." />
          <Alert status="warning" title="Your session will expire in 5 minutes." />
          <Alert status="success" title="Transaction completed successfully." />
          <Alert status="error" title="Failed to process your withdrawal request." />
        </ExampleGrid>
      </Section>
      <Section title="Expanded" description="Add a description to trigger the expanded (stacked) layout.">
        <ExampleGrid label="With description">
          <Alert status="info" title="System Maintenance Scheduled" description="We will be performing scheduled maintenance on March 20th from 2:00 AM to 4:00 AM UTC. Trading will be temporarily unavailable." onClose={() => {}} />
          <Alert status="error" title="Withdrawal Failed" description="Your withdrawal of 0.5 BTC could not be processed due to insufficient funds." actionLabel="View Balance" onClose={() => {}} />
        </ExampleGrid>
      </Section>
      <Section title="High Contrast" description="White background instead of tinted background.">
        <ExampleGrid label="High contrast">
          <Alert status="info" title="High contrast info alert" highContrast />
          <Alert status="warning" title="High contrast warning alert" highContrast />
          <Alert status="success" title="High contrast success alert" highContrast />
          <Alert status="error" title="High contrast error alert" highContrast />
        </ExampleGrid>
      </Section>
      <Section title="With Actions" description="Compact alerts with inline action buttons.">
        <ExampleGrid label="Action button">
          <Alert status="info" title="New update available" actionLabel="Update Now" onClose={() => {}} />
          <Alert status="warning" title="2FA not enabled" actionLabel="Enable" onClose={() => {}} />
        </ExampleGrid>
      </Section>
      <Section title="Skeleton">
        <ExampleGrid label="Loading state"><Alert skeleton title="" /></ExampleGrid>
      </Section>
    </ComponentPage>
  );
}
