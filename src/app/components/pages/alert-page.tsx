import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { Alert } from "../ui/alert";
import { PropsTable, type PropDef } from "../docs/props-table";

const ALERT_PROPS: PropDef[] = [
  { name: "status", type: '"info" | "warning" | "success" | "error"', default: '"info"', description: "Visual status type with matching color and icon" },
  { name: "title", type: "string", required: true, description: "Main alert heading" },
  { name: "description", type: "string", description: "Optional body text shown below the title" },
  { name: "highContrast", type: "boolean", default: "false", description: "Uses a bold filled background instead of subtle tint" },
  { name: "showIcon", type: "boolean", default: "true", description: "Whether to display the status icon" },
  { name: "actionLabel", type: "string", description: "Label for an optional action button" },
  { name: "onAction", type: "() => void", description: "Callback fired when the action button is clicked" },
  { name: "onClose", type: "() => void", description: "Callback fired when the close button is clicked. Shows a close button when present" },
  { name: "skeleton", type: "boolean", default: "false", description: "Renders a loading skeleton placeholder" },
];

const CODE_BASIC = `import { Alert } from "@hollaex/ui"

<Alert status="info" title="Your account has been verified successfully." />
<Alert status="warning" title="Your session will expire in 5 minutes." />
<Alert status="success" title="Transaction completed successfully." />
<Alert status="error" title="Failed to process your withdrawal request." />`;

export function AlertPage() {
  return (
    <ComponentPage name="Alert" description="Status notifications with icons, accent bars, titles, descriptions, and action buttons. Supports info, warning, success, and error states.">
      <Section title="Status Variants" description="Four status types with distinct colors and icons.">
        <ExampleGrid label="All statuses" code={CODE_BASIC}>
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
      <Section title="High Contrast" description="Status-colored backgrounds with filled icons for maximum emphasis.">
        <ExampleGrid label="High contrast">
          <Alert status="info" title="High contrast info alert" highContrast />
          <Alert status="warning" title="High contrast warning alert" highContrast />
          <Alert status="success" title="High contrast success alert" highContrast />
          <Alert status="error" title="High contrast error alert" highContrast />
        </ExampleGrid>
        <ExampleGrid label="High contrast expanded">
          <Alert status="info" title="System Update" description="A new version is available. Please restart your application to apply the latest changes." highContrast onClose={() => {}} />
          <Alert status="warning" title="Rate Limit Approaching" description="You have used 90% of your API rate limit for this hour." highContrast onClose={() => {}} />
          <Alert status="success" title="Deposit Confirmed" description="Your deposit of 1.5 ETH has been confirmed on the network." highContrast onClose={() => {}} />
          <Alert status="error" title="Connection Lost" description="Unable to reach the trading server. Retrying in 5 seconds." highContrast onClose={() => {}} />
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
      <Section title="API Reference" description="All available props for the Alert component.">
        <PropsTable props={ALERT_PROPS} componentName="Alert" />
      </Section>
    </ComponentPage>
  );
}