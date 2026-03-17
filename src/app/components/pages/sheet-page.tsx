import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { HxSheet, type SheetSide } from "../ui/hx-sheet";
import { Button } from "../ui/hollaex-button";
import { useState } from "react";

export function SheetPage() {
  const [openSide, setOpenSide] = useState<SheetSide | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <ComponentPage name="Sheet" description="Slide-out panels that overlay the page from any edge. Ideal for detail views, mobile navigation, filters, and forms that don't need a full-page route.">
      <Section title="Sides" description="Sheets can slide in from all four edges.">
        <ExampleRow label="Open from">
          {(["right", "left", "top", "bottom"] as const).map(side => (
            <Button key={side} variant="outline-primary" onClick={() => setOpenSide(side)}>
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          ))}
        </ExampleRow>
        {openSide && (
          <HxSheet
            open={!!openSide}
            onClose={() => setOpenSide(null)}
            side={openSide}
            title={`Sheet from ${openSide}`}
            description="This sheet slides in from the selected edge."
          >
            <DemoContent />
          </HxSheet>
        )}
      </Section>

      <Section title="Detail Panel" description="A common pattern for viewing details without navigating away.">
        <ExampleRow label="Open detail">
          <Button variant="primary" onClick={() => setOpenDetail(true)}>View Transaction</Button>
        </ExampleRow>
        <HxSheet
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          title="Transaction Details"
          description="TX-2024-03-17-001"
          footer={
            <div className="flex" style={{ gap: "var(--space-3)", justifyContent: "flex-end" }}>
              <Button variant="outline-secondary" onClick={() => setOpenDetail(false)}>Close</Button>
              <Button variant="primary">Download Receipt</Button>
            </div>
          }
        >
          <TransactionContent />
        </HxSheet>
      </Section>

      <Section title="Mobile Navigation" description="Left-side sheet for responsive navigation menus.">
        <ExampleRow label="Open nav">
          <Button variant="outline-primary" onClick={() => setOpenNav(true)}>Open Menu</Button>
        </ExampleRow>
        <HxSheet
          open={openNav}
          onClose={() => setOpenNav(false)}
          side="left"
          title="Navigation"
          width={300}
        >
          <NavContent onClose={() => setOpenNav(false)} />
        </HxSheet>
      </Section>

      <Section title="Filter Panel" description="Bottom sheet for mobile-style filter controls.">
        <ExampleRow label="Open filters">
          <Button variant="outline-primary" onClick={() => setOpenFilters(true)}>Filters</Button>
        </ExampleRow>
        <HxSheet
          open={openFilters}
          onClose={() => setOpenFilters(false)}
          side="bottom"
          title="Filters"
          description="Refine your transaction history"
          footer={
            <div className="flex" style={{ gap: "var(--space-3)", justifyContent: "flex-end" }}>
              <Button variant="ghost-secondary" onClick={() => setOpenFilters(false)}>Reset</Button>
              <Button variant="primary" onClick={() => setOpenFilters(false)}>Apply Filters</Button>
            </div>
          }
        >
          <FilterContent />
        </HxSheet>
      </Section>
    </ComponentPage>
  );
}

function DemoContent() {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-4)", fontFamily: "var(--font-family-supreme)" }}>
      <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-secondary)", lineHeight: "var(--lh-body)" }}>
        This is a sheet panel. It overlays the page with a dark backdrop and slides in with a smooth emphasized-decelerate animation.
      </p>
      <p style={{ fontSize: "var(--text-body)", color: "var(--color-text-secondary)", lineHeight: "var(--lh-body)" }}>
        Click outside or press the close button to dismiss.
      </p>
    </div>
  );
}

function TransactionContent() {
  const rows = [
    ["Type", "Deposit"],
    ["Asset", "Bitcoin (BTC)"],
    ["Amount", "0.05000000 BTC"],
    ["Fee", "0.00010000 BTC"],
    ["Status", "Confirmed"],
    ["Confirmations", "6 / 6"],
    ["Network", "Bitcoin Mainnet"],
    ["Date", "March 17, 2026 14:32 UTC"],
  ];
  return (
    <div className="flex flex-col" style={{ fontFamily: "var(--font-family-supreme)" }}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between border-b" style={{ padding: "var(--space-3) 0", borderColor: "var(--border-subtle)" }}>
          <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-text-tertiary)" }}>{label}</span>
          <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: label === "Amount" || label === "Fee" ? "var(--font-family-mono)" : "inherit" }}>{value}</span>
        </div>
      ))}
      <div style={{ marginTop: "var(--space-5)" }}>
        <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", display: "block", marginBottom: "var(--space-2)" }}>Transaction Hash</span>
        <code style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--color-text-secondary)", wordBreak: "break-all" }}>
          0x3a7f8b2e1c9d4e5f6a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f
        </code>
      </div>
    </div>
  );
}

function NavContent({ onClose }: { onClose: () => void }) {
  const sections = [
    { title: "Trading", items: ["Pro Trade", "Quick Trade", "P2P"] },
    { title: "Wallet", items: ["Balances", "Deposit", "Withdraw"] },
    { title: "Account", items: ["Settings", "Security", "API Keys"] },
  ];
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-6)", fontFamily: "var(--font-family-supreme)" }}>
      {sections.map(section => (
        <div key={section.title}>
          <span style={{ fontSize: "var(--text-overline)", fontWeight: "var(--font-weight-bold)", letterSpacing: "var(--ls-overline)", textTransform: "uppercase" as const, color: "var(--color-text-tertiary)" }}>{section.title}</span>
          <div className="flex flex-col" style={{ marginTop: "var(--space-2)" }}>
            {section.items.map(item => (
              <button key={item} type="button" onClick={onClose} className="text-left cursor-pointer rounded" style={{
                padding: "var(--space-2) var(--space-3)",
                fontSize: "var(--text-body)",
                color: "var(--color-text-primary)",
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
      ))}
    </div>
  );
}

function FilterContent() {
  return (
    <div className="flex flex-col" style={{ gap: "var(--space-5)", fontFamily: "var(--font-family-supreme)", maxHeight: 320 }}>
      <div>
        <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", display: "block", marginBottom: "var(--space-2)" }}>Transaction Type</span>
        <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
          {["All", "Deposits", "Withdrawals", "Trades", "Fees"].map(f => (
            <button key={f} type="button" className="rounded-full cursor-pointer" style={{
              padding: "var(--space-2) var(--space-4)",
              fontSize: "var(--text-caption)",
              color: f === "All" ? "var(--brand-fg)" : "var(--color-text-secondary)",
              backgroundColor: f === "All" ? "var(--brand-default)" : "var(--secondary-subtle)",
              border: "none", fontFamily: "var(--font-family-supreme)",
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", display: "block", marginBottom: "var(--space-2)" }}>Asset</span>
        <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
          {["BTC", "ETH", "XHT", "USDT", "SOL"].map(a => (
            <button key={a} type="button" className="rounded-full cursor-pointer" style={{
              padding: "var(--space-2) var(--space-4)",
              fontSize: "var(--text-caption)",
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--secondary-subtle)",
              border: "none", fontFamily: "var(--font-family-supreme)",
            }}>
              {a}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", display: "block", marginBottom: "var(--space-2)" }}>Status</span>
        <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
          {["Pending", "Confirmed", "Failed"].map(s => (
            <button key={s} type="button" className="rounded-full cursor-pointer" style={{
              padding: "var(--space-2) var(--space-4)",
              fontSize: "var(--text-caption)",
              color: "var(--color-text-secondary)",
              backgroundColor: "var(--secondary-subtle)",
              border: "none", fontFamily: "var(--font-family-supreme)",
            }}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
