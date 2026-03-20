import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

function CollapsibleDemo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full" style={{ maxWidth: 420 }}>
      <div className="flex items-center justify-between rounded-lg" style={{ padding: "var(--space-4) var(--space-5)", backgroundColor: "var(--secondary-subtle)", border: "1px solid var(--border-subtle)" }}>
        <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)" }}>
          @hollaex/trading-engine
        </span>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="cursor-pointer flex items-center justify-center rounded"
            style={{ width: 28, height: 28, backgroundColor: "transparent", border: "1px solid var(--border-subtle)", color: "var(--color-text-tertiary)", transition: "background-color var(--motion-hover)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-subtle-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <ChevronsUpDown size={14} />
          </button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg" style={{ marginTop: "var(--space-2)", padding: "var(--space-4) var(--space-5)", backgroundColor: "var(--background)", border: "1px solid var(--border-subtle)" }}>
        <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-secondary)" }}>@hollaex/trading-engine</code>
      </div>
      <CollapsibleContent>
        <div className="flex flex-col" style={{ gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
          {["@hollaex/order-book", "@hollaex/wallet-core", "@hollaex/market-data"].map((pkg) => (
            <div key={pkg} className="rounded-lg" style={{ padding: "var(--space-4) var(--space-5)", backgroundColor: "var(--background)", border: "1px solid var(--border-subtle)" }}>
              <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-secondary)" }}>{pkg}</code>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CollapsiblePage() {
  return (
    <ComponentPage name="Collapsible" description="An interactive component that expands and collapses a panel. Built on Radix UI Collapsible with accessible open/close state management." hideFab>
      <Section title="Basic" description="Click the toggle to reveal additional content.">
        <ExampleRow label="Default (collapsed)">
          <CollapsibleDemo />
        </ExampleRow>
      </Section>
      <Section title="Default Open" description="Start the collapsible in the expanded state.">
        <ExampleRow label="Open by default">
          <CollapsibleDemo defaultOpen />
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
