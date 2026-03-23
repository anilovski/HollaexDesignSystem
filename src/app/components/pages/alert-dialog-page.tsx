import { useState, forwardRef } from "react";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

const DemoButton = forwardRef<HTMLButtonElement, { children: React.ReactNode; onClick?: () => void }>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        {...props}
        className="cursor-pointer inline-flex items-center justify-center rounded-[var(--radius-button)]"
        style={{
          padding: "var(--space-3) var(--space-6)",
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-medium)",
          fontFamily: "var(--font-family-supreme)",
          backgroundColor: "var(--brand-default)",
          color: "var(--brand-fg)",
          border: "none",
          transition: "background-color var(--motion-hover)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-hover)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--brand-default)"; }}
      >
        {children}
      </button>
    );
  }
);
DemoButton.displayName = "DemoButton";

export function AlertDialogPage() {
  const [result, setResult] = useState<string | null>(null);

  return (
    <ComponentPage name="Alert Dialog" description="A modal dialog that interrupts the user with important content and expects a response. Built on Radix UI Alert Dialog for full accessibility." hideFab>
      <Section title="Basic" description="A confirmation dialog with cancel and continue actions.">
        <ExampleRow label="Default">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DemoButton>Delete Account</DemoButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ExampleRow>
      </Section>

      <Section title="Destructive Action" description="Use a destructive styled action button for irreversible operations.">
        <ExampleRow label="Destructive">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="cursor-pointer inline-flex items-center justify-center rounded-[var(--radius-button)]"
                style={{
                  padding: "var(--space-3) var(--space-6)",
                  fontSize: "var(--text-body-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  fontFamily: "var(--font-family-supreme)",
                  backgroundColor: "var(--danger-default)",
                  color: "var(--danger-fg)",
                  border: "none",
                  transition: "background-color var(--motion-hover)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--danger-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--danger-default)"; }}
              >
                Remove All Data
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all trading data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently erase your trading history, order book, and all associated records. This action is irreversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Data</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-[var(--danger-default)] text-[var(--danger-fg)] hover:bg-[var(--danger-hover)]"
                  onClick={() => setResult("Data deleted")}
                >
                  Delete Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {result && (
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
              Result: {result}
            </span>
          )}
        </ExampleRow>
      </Section>

      <Section title="With Custom Content" description="Alert dialogs can contain richer content beyond simple text.">
        <ExampleRow label="Custom body">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DemoButton>Withdraw Funds</DemoButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
                    <p>Please review the withdrawal details below:</p>
                    <div className="rounded-lg" style={{ padding: "var(--space-4)", backgroundColor: "var(--secondary-subtle)", border: "1px solid var(--border-subtle)" }}>
                      <div className="flex justify-between" style={{ marginBottom: "var(--space-2)" }}>
                        <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)" }}>Amount</span>
                        <span style={{ fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)" }}>0.5 BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--color-text-tertiary)", fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)" }}>Network Fee</span>
                        <span style={{ fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-mono)", fontSize: "var(--text-body-sm)" }}>0.0001 BTC</span>
                      </div>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm Withdrawal</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}