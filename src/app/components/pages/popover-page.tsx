import { ComponentPage, Section, ExampleGrid, ExampleRow } from "../docs/component-page";
import { HxPopover } from "../ui/hx-popover";
import { Button } from "../ui/hollaex-button";
import { Settings, Bell, Filter, User } from "lucide-react";

export function PopoverPage() {
  return (
    <ComponentPage name="Popover" description="Floating content panels triggered by a click. Useful for quick settings, filters, notifications, and contextual actions.">
      <Section title="Basic" description="Click the trigger to show a floating panel.">
        <ExampleGrid label="Default popover">
          <HxPopover
            trigger={<Button variant="outline-primary" leftIcon={<Settings />}>Settings</Button>}
          >
            <PopoverContent title="Quick Settings" />
          </HxPopover>
        </ExampleGrid>
      </Section>

      <Section title="Sides" description="Popovers can open to any side of the trigger.">
        <ExampleRow label="All sides">
          <HxPopover trigger={<Button variant="outline-secondary" size="sm">Bottom</Button>} side="bottom">
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Opens below</p>
          </HxPopover>
          <HxPopover trigger={<Button variant="outline-secondary" size="sm">Top</Button>} side="top">
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Opens above</p>
          </HxPopover>
          <HxPopover trigger={<Button variant="outline-secondary" size="sm">Left</Button>} side="left">
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Opens left</p>
          </HxPopover>
          <HxPopover trigger={<Button variant="outline-secondary" size="sm">Right</Button>} side="right">
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Opens right</p>
          </HxPopover>
        </ExampleRow>
      </Section>

      <Section title="Alignment" description="Control where the popover aligns relative to the trigger.">
        <ExampleRow label="Alignment">
          <HxPopover trigger={<Button variant="outline-secondary" size="sm">Start</Button>} align="start">
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Aligned to start</p>
          </HxPopover>
          <HxPopover trigger={<Button variant="outline-secondary" size="sm">Center</Button>} align="center">
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Aligned to center</p>
          </HxPopover>
          <HxPopover trigger={<Button variant="outline-secondary" size="sm">End</Button>} align="end">
            <p style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)", fontFamily: "var(--font-family-supreme)" }}>Aligned to end</p>
          </HxPopover>
        </ExampleRow>
      </Section>

      <Section title="Rich Content" description="Popovers can contain any content — forms, lists, or rich layouts.">
        <ExampleRow label="Examples">
          <HxPopover trigger={<Button variant="outline-primary" leftIcon={<Bell />} iconOnly />} width={320} align="start">
            <NotificationContent />
          </HxPopover>
          <HxPopover trigger={<Button variant="outline-primary" leftIcon={<Filter />}>Filters</Button>} width={260} align="start">
            <FilterContent />
          </HxPopover>
          <HxPopover trigger={<Button variant="outline-primary" leftIcon={<User />}>Profile</Button>} width={240} align="start">
            <ProfileContent />
          </HxPopover>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}

function PopoverContent({ title }: { title: string }) {
  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <p style={{ fontSize: "var(--text-body)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)" }}>{title}</p>
      <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
        {["Language", "Timezone", "Currency"].map(item => (
          <div key={item} className="flex items-center justify-between" style={{ padding: "var(--space-2) 0" }}>
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-secondary)" }}>{item}</span>
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-tertiary)" }}>Default</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationContent() {
  const items = [
    { title: "Deposit confirmed", desc: "0.5 ETH credited to your wallet", time: "2m ago" },
    { title: "Price alert triggered", desc: "BTC reached $68,000", time: "15m ago" },
    { title: "KYC approved", desc: "Your identity verification is complete", time: "1h ago" },
  ];
  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <p style={{ fontSize: "var(--text-body)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)" }}>Notifications</p>
      <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
        {items.map(item => (
          <div key={item.title} className="rounded" style={{ padding: "var(--space-3)", transition: "background var(--motion-hover)" }}>
            <p style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{item.title}</p>
            <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-secondary)", marginTop: "var(--space-1)" }}>{item.desc}</p>
            <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", marginTop: "var(--space-1)" }}>{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterContent() {
  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <p style={{ fontSize: "var(--text-body)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", marginBottom: "var(--space-3)" }}>Filter by</p>
      <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
        {["All trades", "Buy orders", "Sell orders", "Deposits", "Withdrawals"].map(f => (
          <label key={f} className="flex items-center cursor-pointer" style={{ gap: "var(--space-2)" }}>
            <input type="checkbox" defaultChecked={f === "All trades"} style={{ accentColor: "var(--brand-default)" }} />
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-primary)" }}>{f}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ProfileContent() {
  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
        <div className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, backgroundColor: "var(--brand-default)", color: "#fff", fontSize: "var(--text-body)", fontWeight: "var(--font-weight-semibold)" }}>JD</div>
        <div>
          <p style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>Jane Doe</p>
          <p style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)" }}>jane@hollaex.com</p>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "var(--border-subtle)", paddingTop: "var(--space-3)" }}>
        {["Account Settings", "API Keys", "Sign Out"].map(item => (
          <button key={item} type="button" className="w-full text-left cursor-pointer rounded" style={{
            padding: "var(--space-2) var(--space-2)",
            fontSize: "var(--text-body-sm)",
            color: item === "Sign Out" ? "var(--danger-default)" : "var(--color-text-primary)",
            background: "none", border: "none",
            fontFamily: "var(--font-family-supreme)",
            transition: "background var(--motion-hover)",
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--secondary-subtle)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
