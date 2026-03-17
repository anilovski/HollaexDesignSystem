import { useState } from "react";
import { ComponentPage, Section, ExampleRow, ExampleGrid } from "../docs/component-page";
import { HxTabs, HxTabPanel } from "../ui/hx-tabs";
import { Home, Settings, User, Bell, BarChart3, FileText, Shield, Mail, Star, Zap } from "lucide-react";

/* ── Shared tab data ──────────────────────────── */

const basicTabs = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
];

const iconTabs = [
  { value: "home", label: "Home", icon: <Home size={16} /> },
  { value: "profile", label: "Profile", icon: <User size={16} /> },
  { value: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  { value: "settings", label: "Settings", icon: <Settings size={16} /> },
];

const counterTabs = [
  { value: "all", label: "All", counter: 42 },
  { value: "active", label: "Active", counter: 18 },
  { value: "completed", label: "Completed", counter: 24 },
  { value: "archived", label: "Archived", counter: 7 },
];

const disabledTabs = [
  { value: "general", label: "General" },
  { value: "security", label: "Security" },
  { value: "billing", label: "Billing", disabled: true },
  { value: "advanced", label: "Advanced", disabled: true },
];

const manyTabs = [
  { value: "dashboard", label: "Dashboard", icon: <BarChart3 size={16} /> },
  { value: "reports", label: "Reports", icon: <FileText size={16} /> },
  { value: "users", label: "Users", icon: <User size={16} /> },
  { value: "security", label: "Security", icon: <Shield size={16} /> },
  { value: "email", label: "Email", icon: <Mail size={16} /> },
  { value: "favorites", label: "Favorites", icon: <Star size={16} /> },
  { value: "integrations", label: "Integrations", icon: <Zap size={16} /> },
];

/* ── Demo panel content ───────────────────────── */

function PanelContent({ label }: { label: string }) {
  return (
    <div
      className="rounded-[var(--radius)] border"
      style={{
        padding: "var(--space-5) var(--space-6)",
        borderColor: "var(--color-border-subtle)",
        backgroundColor: "var(--secondary-subtle)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      <p style={{ fontSize: "var(--text-label)", color: "var(--color-text-secondary)" }}>
        Content for <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{label}</span> tab panel.
      </p>
    </div>
  );
}

/* ── Page ──────────────────────────────────────── */

export function TabPage() {
  const [lineTab, setLineTab] = useState("overview");
  const [containedTab, setContainedTab] = useState("overview");
  const [enclosedTab, setEnclosedTab] = useState("overview");
  const [iconTab, setIconTab] = useState("home");
  const [counterTab, setCounterTab] = useState("all");
  const [fullWidthTab, setFullWidthTab] = useState("overview");
  const [panelTab, setPanelTab] = useState("overview");

  return (
    <ComponentPage
      name="Tabs"
      description="Navigation component for switching between related content sections. Supports line, contained, and enclosed variants with icons, counters, and multiple sizes."
    >
      {/* ── 1. Variants ─────────────────────── */}
      <Section title="Variants" description="Three visual styles: line (underline), contained (pill), and enclosed (card-style).">
        <ExampleGrid label="Line (default)">
          <HxTabs items={basicTabs} value={lineTab} onChange={setLineTab} variant="line" />
        </ExampleGrid>
        <ExampleGrid label="Contained">
          <HxTabs items={basicTabs} value={containedTab} onChange={setContainedTab} variant="contained" />
        </ExampleGrid>
        <ExampleGrid label="Enclosed">
          <HxTabs items={basicTabs} value={enclosedTab} onChange={setEnclosedTab} variant="enclosed" />
        </ExampleGrid>
      </Section>

      {/* ── 2. Sizes ────────────────────────── */}
      <Section title="Sizes" description="Three sizes: sm, md (default), and lg.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <ExampleGrid key={size} label={size.toUpperCase()}>
              <HxTabs items={basicTabs} defaultValue="overview" size={size} />
            </ExampleGrid>
          ))}
        </div>
      </Section>

      {/* ── 3. With Icons ───────────────────── */}
      <Section title="With Icons" description="Tabs with leading icons alongside labels.">
        <ExampleGrid label="Line + icons">
          <HxTabs items={iconTabs} value={iconTab} onChange={setIconTab} variant="line" />
        </ExampleGrid>
        <ExampleGrid label="Contained + icons">
          <HxTabs items={iconTabs} defaultValue="home" variant="contained" />
        </ExampleGrid>
        <ExampleGrid label="Enclosed + icons">
          <HxTabs items={iconTabs} defaultValue="home" variant="enclosed" />
        </ExampleGrid>
      </Section>

      {/* ── 4. With Counters ────────────────── */}
      <Section title="With Counters" description="Counter badges display counts next to each tab label.">
        <ExampleGrid label="Line + counters">
          <HxTabs items={counterTabs} value={counterTab} onChange={setCounterTab} variant="line" />
        </ExampleGrid>
        <ExampleGrid label="Contained + counters">
          <HxTabs items={counterTabs} defaultValue="all" variant="contained" />
        </ExampleGrid>
      </Section>

      {/* ── 5. Full Width ───────────────────── */}
      <Section title="Full Width" description="Tabs stretch to fill the available width.">
        <ExampleGrid label="Line (full width)">
          <HxTabs items={basicTabs} value={fullWidthTab} onChange={setFullWidthTab} fullWidth />
        </ExampleGrid>
        <ExampleGrid label="Contained (full width)">
          <HxTabs items={basicTabs} defaultValue="overview" variant="contained" fullWidth />
        </ExampleGrid>
        <ExampleGrid label="Enclosed (full width)">
          <HxTabs items={basicTabs} defaultValue="overview" variant="enclosed" fullWidth />
        </ExampleGrid>
      </Section>

      {/* ── 6. Disabled ─────────────────────── */}
      <Section title="Disabled States" description="Individual tabs or the entire group can be disabled.">
        <ExampleGrid label="Individual disabled tabs">
          <HxTabs items={disabledTabs} defaultValue="general" />
        </ExampleGrid>
        <ExampleRow label="Entire group disabled">
          <HxTabs items={basicTabs} defaultValue="overview" disabled />
        </ExampleRow>
        <ExampleRow label="Contained disabled">
          <HxTabs items={basicTabs} defaultValue="overview" variant="contained" disabled />
        </ExampleRow>
      </Section>

      {/* ── 7. Many Tabs ────────────────────── */}
      <Section title="Many Tabs" description="Works well with a large number of tabs.">
        <ExampleGrid label="7 tabs with icons">
          <HxTabs items={manyTabs} defaultValue="dashboard" />
        </ExampleGrid>
        <ExampleGrid label="Contained, 7 tabs">
          <HxTabs items={manyTabs} defaultValue="dashboard" variant="contained" />
        </ExampleGrid>
      </Section>

      {/* ── 8. With Tab Panels ──────────────── */}
      <Section title="With Tab Panels" description="Complete tabs with panel content that changes when you switch tabs.">
        <ExampleGrid label="Interactive demo">
          <div>
            <HxTabs items={basicTabs} value={panelTab} onChange={setPanelTab} />
            <HxTabPanel value="overview" activeValue={panelTab}>
              <PanelContent label="Overview" />
            </HxTabPanel>
            <HxTabPanel value="activity" activeValue={panelTab}>
              <PanelContent label="Activity" />
            </HxTabPanel>
            <HxTabPanel value="settings" activeValue={panelTab}>
              <PanelContent label="Settings" />
            </HxTabPanel>
          </div>
        </ExampleGrid>
        <ExampleGrid label="Contained with panels">
          <ContainedPanelDemo />
        </ExampleGrid>
        <ExampleGrid label="Enclosed with panels">
          <EnclosedPanelDemo />
        </ExampleGrid>
      </Section>

      {/* ── 9. Sizes Comparison ─────────────── */}
      <Section title="All Variants × All Sizes" description="A matrix of every variant at every size for visual comparison.">
        <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
          {(["line", "contained", "enclosed"] as const).map((variant) =>
            (["sm", "md", "lg"] as const).map((size) => (
              <ExampleGrid key={`${variant}-${size}`} label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} · ${size.toUpperCase()}`}>
                <HxTabs items={iconTabs} defaultValue="home" variant={variant} size={size} />
              </ExampleGrid>
            ))
          )}
        </div>
      </Section>
    </ComponentPage>
  );
}

/* ── Helper sub-demos ─────────────────────────── */

function ContainedPanelDemo() {
  const [tab, setTab] = useState("overview");
  return (
    <div>
      <HxTabs items={basicTabs} value={tab} onChange={setTab} variant="contained" />
      <HxTabPanel value="overview" activeValue={tab}><PanelContent label="Overview" /></HxTabPanel>
      <HxTabPanel value="activity" activeValue={tab}><PanelContent label="Activity" /></HxTabPanel>
      <HxTabPanel value="settings" activeValue={tab}><PanelContent label="Settings" /></HxTabPanel>
    </div>
  );
}

function EnclosedPanelDemo() {
  const [tab, setTab] = useState("overview");
  return (
    <div>
      <HxTabs items={basicTabs} value={tab} onChange={setTab} variant="enclosed" />
      <div
        className="border border-t-0 rounded-b-[var(--radius)]"
        style={{ borderColor: "var(--tab-enclosed-border)" }}
      >
        <HxTabPanel value="overview" activeValue={tab}><PanelContent label="Overview" /></HxTabPanel>
        <HxTabPanel value="activity" activeValue={tab}><PanelContent label="Activity" /></HxTabPanel>
        <HxTabPanel value="settings" activeValue={tab}><PanelContent label="Settings" /></HxTabPanel>
      </div>
    </div>
  );
}