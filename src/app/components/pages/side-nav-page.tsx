import { useState } from "react";
import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { SideNav, type SideNavSection } from "../ui/hx-side-nav";
import hollaExLogoFull from "../../../imports/HollaEx_Logo-1.svg";
import hollaExLogoSquare from "../../../imports/HollaEx_Logo.svg";
import {
  Home,
  LayoutDashboard,
  Wallet,
  ArrowUpDown,
  BarChart3,
  Settings,
  User,
  Bell,
  Shield,
  HelpCircle,
  CreditCard,
  Globe,
  Moon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Star,
  Folder,
  FileText,
  PieChart,
} from "lucide-react";

/* ── Sample data sets ────────────────────────────── */

const mainSections: SideNavSection[] = [
  {
    title: "Menu",
    items: [
      { id: "home", label: "Home", icon: <Home size={18} /> },
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, badge: 3 },
      { id: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
      { id: "trade", label: "Trade", icon: <ArrowUpDown size={18} /> },
      { id: "markets", label: "Markets", icon: <BarChart3 size={18} /> },
    ],
  },
  {
    title: "Account",
    items: [
      { id: "profile", label: "Profile", icon: <User size={18} /> },
      { id: "security", label: "Security", icon: <Shield size={18} />, badge: "!" },
      { id: "notifications", label: "Notifications", icon: <Bell size={18} />, badge: 12 },
      { id: "settings", label: "Settings", icon: <Settings size={18} /> },
    ],
  },
];

const nestedSections: SideNavSection[] = [
  {
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", icon: <Home size={18} /> },
      {
        id: "projects",
        label: "Projects",
        icon: <Folder size={18} />,
        children: [
          { id: "proj-alpha", label: "Alpha" },
          { id: "proj-beta", label: "Beta" },
          { id: "proj-gamma", label: "Gamma", disabled: true },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        icon: <PieChart size={18} />,
        badge: 5,
        children: [
          { id: "rep-monthly", label: "Monthly" },
          { id: "rep-quarterly", label: "Quarterly" },
        ],
      },
      { id: "documents", label: "Documents", icon: <FileText size={18} /> },
    ],
  },
  {
    title: "Settings",
    items: [
      { id: "preferences", label: "Preferences", icon: <Settings size={18} /> },
      { id: "help", label: "Help & Support", icon: <HelpCircle size={18} /> },
    ],
  },
];

const settingsSections: SideNavSection[] = [
  {
    items: [
      { id: "general", label: "General", icon: <Settings size={18} /> },
      { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
      { id: "appearance", label: "Appearance", icon: <Moon size={18} /> },
      { id: "language", label: "Language", icon: <Globe size={18} /> },
      { id: "favourites", label: "Favourites", icon: <Star size={18} /> },
    ],
  },
  {
    title: "Danger Zone",
    items: [
      { id: "logout", label: "Log Out", icon: <LogOut size={18} /> },
    ],
  },
];

const disabledSections: SideNavSection[] = [
  {
    title: "Navigation",
    items: [
      { id: "d-home", label: "Home", icon: <Home size={18} /> },
      { id: "d-dash", label: "Dashboard", icon: <LayoutDashboard size={18} />, disabled: true },
      { id: "d-wallet", label: "Wallet", icon: <Wallet size={18} /> },
      { id: "d-trade", label: "Trade", icon: <ArrowUpDown size={18} />, disabled: true },
      { id: "d-markets", label: "Markets", icon: <BarChart3 size={18} /> },
    ],
  },
];

/* ── Sticky bottom demo data ─────────────────────── */

const stickyScrollableSections: SideNavSection[] = [
  {
    items: [
      { id: "s-home", label: "Home", icon: <Home size={18} /> },
      {
        id: "s-dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        children: [
          { id: "s-dash-overview", label: "Overview" },
          { id: "s-dash-analytics", label: "Analytics" },
          { id: "s-dash-reports", label: "Reports" },
        ],
      },
      { id: "s-wallet", label: "Wallet", icon: <Wallet size={18} />, badge: 2 },
      {
        id: "s-trade",
        label: "Trade",
        icon: <ArrowUpDown size={18} />,
        children: [
          { id: "s-trade-spot", label: "Spot" },
          { id: "s-trade-futures", label: "Futures" },
          { id: "s-trade-p2p", label: "P2P" },
        ],
      },
      { id: "s-markets", label: "Markets", icon: <BarChart3 size={18} /> },
      { id: "s-portfolio", label: "Portfolio", icon: <PieChart size={18} /> },
    ],
  },
];

const stickyBottomData: SideNavSection[] = [
  {
    items: [
      { id: "s-notifications", label: "Notifications", icon: <Bell size={18} />, badge: 5 },
      { id: "s-settings", label: "Settings", icon: <Settings size={18} /> },
      { id: "s-help", label: "Help & Support", icon: <HelpCircle size={18} /> },
    ],
  },
];

/* ── Page ─────────────────────────────────────────── */

export function SideNavPage() {
  const [active1, setActive1] = useState("dashboard");
  const [active2, setActive2] = useState("overview");
  const [active3, setActive3] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [active4, setActive4] = useState("general");
  const [active5, setActive5] = useState("d-home");
  const [active6, setActive6] = useState("home");
  const [active7, setActive7] = useState("home");

  return (
    <ComponentPage
      name="Side Navigation"
      description="Persistent vertical navigation for applications. Supports sections, nested items, badges, collapsible mode, and white/gray variants — all driven by CSS variables."
    >
      {/* ── Default / White ─────────────────────────── */}
      <Section
        title="Default"
        description="Standard white side navigation with section headers, icons, and badges."
      >
        <ExampleGrid label="White variant">
          <div className="flex" style={{ height: "420px", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <SideNav
              sections={mainSections}
              activeId={active1}
              onSelect={setActive1}
              header={
                <div className="flex items-center gap-[10px] px-[14px] py-[14px]">
                  <img src={hollaExLogoFull} alt="HollaEx" className="hx-logo-adaptive" style={{ height: "40px" }} />
                </div>
              }
              footer={
                <div className="flex items-center gap-[10px] px-[14px] py-[12px]">
                  <div className="flex items-center justify-center shrink-0 rounded-full" style={{ width: "28px", height: "28px", backgroundColor: "var(--secondary-default)" }}>
                    <span style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-medium)", color: "var(--secondary-fg)", fontFamily: "var(--font-family-supreme)" }}>JD</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span style={{ fontSize: "var(--text-meta)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", lineHeight: "1.2", fontFamily: "var(--font-family-supreme)" }} className="truncate">John Doe</span>
                    <span style={{ fontSize: "var(--text-overline)", color: "var(--color-text-tertiary)", lineHeight: "1.2", fontFamily: "var(--font-family-supreme)" }} className="truncate">john@hollaex.com</span>
                  </div>
                </div>
              }
            />
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--secondary-subtle)" }}>
              <span style={{ fontSize: "var(--text-label)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
                Active: <strong style={{ color: "var(--brand-default)" }}>{active1}</strong>
              </span>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Gray Variant ────────────────────────────── */}
      <Section
        title="Gray Variant"
        description="Side navigation with a gray background, suitable for dashboard-style layouts."
      >
        <ExampleGrid label="Gray variant">
          <div className="flex" style={{ height: "380px", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <SideNav
              sections={settingsSections}
              activeId={active4}
              onSelect={setActive4}
              variant="gray"
              header={
                <div className="flex items-center gap-[10px] px-[14px] py-[14px]">
                  <Settings size={18} style={{ color: "var(--color-text-secondary)" }} />
                  <span style={{ fontSize: "var(--text-label)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-supreme)" }}>Settings</span>
                </div>
              }
            />
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--background)" }}>
              <span style={{ fontSize: "var(--text-label)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
                Active: <strong style={{ color: "var(--brand-default)" }}>{active4}</strong>
              </span>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Nested / Collapsible Sections ───────────── */}
      <Section
        title="Nested Items"
        description="Items can contain children that expand/collapse with a chevron indicator."
      >
        <ExampleGrid label="Expandable children">
          <div className="flex" style={{ height: "440px", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <SideNav
              sections={nestedSections}
              activeId={active2}
              onSelect={setActive2}
              header={
                <div className="flex items-center gap-[10px] px-[14px] py-[14px]">
                  <img src={hollaExLogoFull} alt="HollaEx" className="hx-logo-adaptive" style={{ height: "40px" }} />
                </div>
              }
            />
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--secondary-subtle)" }}>
              <span style={{ fontSize: "var(--text-label)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
                Active: <strong style={{ color: "var(--brand-default)" }}>{active2}</strong>
              </span>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Collapsible ─────────────────────────────── */}
      <Section
        title="Collapsible"
        description="Toggle between expanded and icon-only collapsed states. Click the arrow button to toggle. In collapsed mode, parent items with children show a flyout panel on click."
      >
        <ExampleGrid label="Toggle collapsed mode">
          <div className="flex flex-col gap-[12px]">
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="flex items-center gap-[8px] px-[14px] py-[8px] rounded-[var(--radius)] cursor-pointer transition-colors"
              style={{
                backgroundColor: "var(--secondary-subtle)",
                color: "var(--color-text-primary)",
                fontSize: "var(--text-label)",
                fontFamily: "var(--font-family-supreme)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              {collapsed ? "Expand" : "Collapse"}
            </button>
            <div className="flex" style={{ height: "440px", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
              <SideNav
                sections={nestedSections}
                activeId={active3}
                onSelect={setActive3}
                collapsed={collapsed}
                header={
                  <div className={`flex items-center ${collapsed ? "justify-center py-[14px]" : "gap-[10px] px-[14px] py-[14px]"}`}>
                    {collapsed ? (
                      <img src={hollaExLogoSquare} alt="HollaEx" style={{ width: "28px", height: "28px" }} />
                    ) : (
                      <img src={hollaExLogoFull} alt="HollaEx" className="hx-logo-adaptive" style={{ height: "40px" }} />
                    )}
                  </div>
                }
              />
              <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--secondary-subtle)" }}>
                <span style={{ fontSize: "var(--text-label)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
                  Active: <strong style={{ color: "var(--brand-default)" }}>{active3}</strong>
                </span>
              </div>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Disabled Items ──────────────────────────── */}
      <Section
        title="Disabled Items"
        description="Individual items can be disabled while others remain interactive."
      >
        <ExampleGrid label="Mixed enabled/disabled items">
          <div className="flex" style={{ height: "300px", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <SideNav
              sections={disabledSections}
              activeId={active5}
              onSelect={setActive5}
            />
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--secondary-subtle)" }}>
              <span style={{ fontSize: "var(--text-label)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
                Active: <strong style={{ color: "var(--brand-default)" }}>{active5}</strong>
              </span>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── No Section Headers ──────────────────────── */}
      <Section
        title="Without Section Headers"
        description="A flat list of items without section grouping titles — useful for simpler navigations."
      >
        <ExampleGrid label="Flat navigation">
          <div className="flex" style={{ height: "340px", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <SideNav
              sections={[{
                items: [
                  { id: "home", label: "Home", icon: <Home size={18} /> },
                  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
                  { id: "wallet", label: "Wallet", icon: <Wallet size={18} /> },
                  { id: "trade", label: "Trade", icon: <ArrowUpDown size={18} /> },
                  { id: "markets", label: "Markets", icon: <BarChart3 size={18} /> },
                  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
                ],
              }]}
              activeId={active6}
              onSelect={setActive6}
            />
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--secondary-subtle)" }}>
              <span style={{ fontSize: "var(--text-label)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
                Active: <strong style={{ color: "var(--brand-default)" }}>{active6}</strong>
              </span>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Sticky Bottom ───────────────────────────── */}
      <Section
        title="Sticky Bottom"
        description="Items can be pinned to the bottom of the navigation for quick access."
      >
        <ExampleGrid label="Sticky bottom">
          <div className="flex" style={{ height: "400px", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <SideNav
              sections={stickyScrollableSections}
              activeId={active7}
              onSelect={setActive7}
              stickyBottomSections={stickyBottomData}
              header={
                <div className="flex items-center gap-[10px] px-[14px] py-[14px]">
                  <img src={hollaExLogoFull} alt="HollaEx" className="hx-logo-adaptive" style={{ height: "40px" }} />
                </div>
              }
              footer={
                <div className="flex items-center gap-[10px] px-[14px] py-[12px]">
                  <div className="flex items-center justify-center shrink-0 rounded-full" style={{ width: "28px", height: "28px", backgroundColor: "var(--secondary-default)" }}>
                    <span style={{ fontSize: "var(--text-caption)", fontWeight: "var(--font-weight-medium)", color: "var(--secondary-fg)", fontFamily: "var(--font-family-supreme)" }}>JD</span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span style={{ fontSize: "var(--text-meta)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", lineHeight: "1.2", fontFamily: "var(--font-family-supreme)" }} className="truncate">John Doe</span>
                    <span style={{ fontSize: "var(--text-overline)", color: "var(--color-text-tertiary)", lineHeight: "1.2", fontFamily: "var(--font-family-supreme)" }} className="truncate">john@hollaex.com</span>
                  </div>
                </div>
              }
            />
            <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "var(--secondary-subtle)" }}>
              <span style={{ fontSize: "var(--text-label)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
                Active: <strong style={{ color: "var(--brand-default)" }}>{active7}</strong>
              </span>
            </div>
          </div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}