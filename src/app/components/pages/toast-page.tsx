import { ComponentPage, Section, ExampleGrid, ExampleRow } from "../docs/component-page";
import { PropsTable, type PropDef } from "../docs/props-table";
import { ToastProvider, useToast, type ToastStatus, type ToastPosition } from "../ui/hx-toast";
import { Button } from "../ui/hollaex-button";
import { useState } from "react";

const TOAST_PROPS: PropDef[] = [
  { name: "status", type: '"info" | "success" | "warning" | "error" | "neutral"', default: '"info"', description: "Visual status type with matching color and icon" },
  { name: "title", type: "string", required: true, description: "Main toast heading" },
  { name: "description", type: "string", description: "Optional secondary text" },
  { name: "duration", type: "number", default: "5000", description: "Auto-dismiss delay in ms. Set to Infinity for persistent toasts" },
  { name: "actionLabel", type: "string", description: "Label for an optional action button" },
  { name: "onAction", type: "() => void", description: "Callback when the action button is clicked" },
];

const CODE_BASIC = `import { useToast } from "@hollaex/ui"

const { addToast } = useToast()

addToast({
  status: "success",
  title: "Trade executed",
  description: "Bought 0.5 BTC at $42,150",
})`;

function ToastDemos() {
  const { addToast, setPosition, position } = useToast();
  const [pos, setPos] = useState<ToastPosition>(position);

  const fire = (status: ToastStatus, title: string, description?: string, actionLabel?: string) => {
    addToast({ status, title, description, actionLabel, onAction: () => {} });
  };

  const changePos = (p: ToastPosition) => { setPos(p); setPosition(p); };

  return (
    <>
      <Section title="Status Variants" description="Five status types with matching icon colors. Click each button to fire a live toast.">
        <ExampleRow label="Fire toasts" code={CODE_BASIC}>
          <Button variant="primary" onClick={() => fire("info", "New deposit detected", "0.05 BTC received to your wallet.")}>Info</Button>
          <Button variant="primary" onClick={() => fire("success", "Trade executed successfully")}>Success</Button>
          <Button variant="primary" onClick={() => fire("warning", "Session expires in 5 minutes")}>Warning</Button>
          <Button variant="primary" onClick={() => fire("error", "Withdrawal failed", "Insufficient balance for this transaction.")}>Error</Button>
          <Button variant="primary" onClick={() => fire("neutral", "Address copied to clipboard")}>Neutral</Button>
        </ExampleRow>
      </Section>

      <Section title="With Description" description="Toasts with a secondary description line provide more context.">
        <ExampleRow label="Expanded toasts">
          <Button variant="outline-primary" onClick={() => fire("info", "System Maintenance", "Scheduled for March 20 at 02:00 UTC. Trading will be paused.")}>Info + Desc</Button>
          <Button variant="outline-primary" onClick={() => fire("error", "API Rate Limit Exceeded", "Please wait 30 seconds before retrying.")}>Error + Desc</Button>
        </ExampleRow>
      </Section>

      <Section title="With Action" description="An action button provides an inline CTA before the toast auto-dismisses.">
        <ExampleRow label="Action button">
          <Button variant="outline-primary" onClick={() => fire("info", "New update available", undefined, "Update Now")}>With Action</Button>
          <Button variant="outline-primary" onClick={() => fire("warning", "2FA not enabled", "Protect your account with two-factor authentication.", "Enable Now")}>Action + Desc</Button>
        </ExampleRow>
      </Section>

      <Section title="Position" description="Toasts can appear from 6 different viewport positions.">
        <ExampleRow label="Position selector">
          {(["top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left"] as const).map(p => (
            <Button key={p} variant={pos === p ? "primary" : "outline-secondary"} size="sm" onClick={() => { changePos(p); fire("info", `Position: ${p}`); }}>
              {p}
            </Button>
          ))}
        </ExampleRow>
      </Section>

      <Section title="Duration" description="Control how long toasts stay visible. Set to 0 for persistent toasts.">
        <ExampleRow label="Durations">
          <Button variant="outline-primary" size="sm" onClick={() => addToast({ status: "info", title: "Quick toast (2s)", duration: 2000 })}>2 seconds</Button>
          <Button variant="outline-primary" size="sm" onClick={() => addToast({ status: "info", title: "Default toast (4s)", duration: 4000 })}>4 seconds</Button>
          <Button variant="outline-primary" size="sm" onClick={() => addToast({ status: "info", title: "Slow toast (8s)", duration: 8000 })}>8 seconds</Button>
        </ExampleRow>
      </Section>
    </>
  );
}

export function ToastPage() {
  return (
    <ToastProvider defaultPosition="top-right">
      <ComponentPage name="Toast" description="Lightweight, auto-dismissing notifications for quick feedback — copy confirmations, trade alerts, status updates. Distinct from Alert which is persistent and inline.">
        <ToastDemos />
        <Section title="API Reference" description="All available props for the addToast() function.">
          <PropsTable props={TOAST_PROPS} componentName="addToast" />
        </Section>
      </ComponentPage>
    </ToastProvider>
  );
}
