import { useParams } from "react-router";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";

const componentMeta: Record<string, { name: string; description: string }> = {
  avatar: { name: "Avatar", description: "User profile pictures with a double-ring design. Falls back to initials when no image is available. Supports 6 sizes from xs (24px) to 2xl (80px)." },
  badge: { name: "Badge", description: "Colored labels with 11 color variants, indicator dots, icons, and counter bubbles. Available in circular (pill) and rounded shapes." },
  "button-group": { name: "Button Group", description: "Horizontally joined buttons with a shared border container. Uses context for consistent sizing. Ideal for view toggles and segmented controls." },
  checkbox: { name: "Checkbox", description: "Accessible form control with checked, unchecked, and indeterminate states. Supports labels, helper text, error states, and skeleton loading." },
  chip: { name: "Chip", description: "Tag/filter component for coins, categories, or selections. Supports white and gray backgrounds, round and rounded shapes, and selected/removable states." },
  "coin-card": { name: "Coin Card", description: "Crypto coin display card with price, trend direction, sparkline chart, and hover-to-remove action. Designed for watchlist displays." },
  "content-switcher": { name: "Content Switcher", description: "Tab-like control for switching between content sections. Supports text and icon-only modes, white and gray backgrounds, and 4 sizes." },
  "date-picker": { name: "Date Picker", description: "Calendar date selection with a popup calendar or inline simple mode. Supports multiple sizes, validation states, and date formats." },
  dropdown: { name: "Dropdown", description: "Searchable select menu with gray, white, and midTone styling variants. Supports validation states, coin icons, and helper text." },
  header: { name: "Header", description: "Top navigation bar for desktop and mobile with search, notifications, user menu, dark mode toggle, and deposit button." },
  input: { name: "Input", description: "Text, number, and phone-number input fields. All three types share a common size/style/state system with labels, helper text, and validation." },
  "input-dropdown": { name: "Input Dropdown", description: "Hybrid amount input with a coin/token dropdown selector. Combines a numeric input field with a coin picker in a single control." },
  link: { name: "Link", description: "Navigational text links in standard and inline variants. Supports 4 sizes, optional icons, visited state, and auto-detects external URLs." },
  list: { name: "List", description: "List items organize related content in a clear, scannable structure. Flexible building blocks for menus, settings, or data lists." },
  progress: { name: "Progress", description: "Progress indicators with linear bars and circular variants showing completion status. Both support smooth animated transitions." },
  radio: { name: "Radio Button", description: "Radio buttons allow users to select a single option from a group of choices. Ideal for mutually exclusive selections." },
  search: { name: "Search", description: "Search inputs help users quickly find content. Two variants: a general-purpose SearchInput and a ProTradeSearch for trading pair lookups." },
};

export function GenericComponentPage() {
  const { component } = useParams();
  const meta = componentMeta[component || ""] || {
    name: component?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Component",
    description: "Component documentation page.",
  };

  return (
    <ComponentPage name={meta.name} description={meta.description}>
      <Section title="Preview" description="This component has been built in the HollaEx Design System. Interactive examples are being connected.">
        <ExampleRow label="Component Status">
          <div className="flex items-center justify-center w-full py-16" style={{ fontFamily: "var(--font-family-supreme)" }}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-xl mx-auto flex items-center justify-center" style={{ backgroundColor: "var(--secondary)", marginBottom: "var(--space-7)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--foreground)", marginBottom: "8px" }}>{meta.name}</p>
              <p style={{ fontSize: "var(--text-label)", color: "var(--muted-foreground)", maxWidth: "400px", lineHeight: 1.6 }}>
                This component is built and ready in the design system. The interactive demo page is being wired up with live examples showing all variants, sizes, and states.
              </p>
              <div className="flex items-center justify-center" style={{ gap: "var(--space-3)", marginTop: "var(--space-7)" }}>
                <span className="inline-flex items-center rounded-full border" style={{ gap: "var(--space-2)", padding: "var(--space-2) var(--space-4)", borderColor: "var(--primary)", backgroundColor: "var(--secondary)", fontSize: "11px", fontWeight: 500, color: "var(--primary)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
                  Component Built
                </span>
                <span className="inline-flex items-center rounded-full border" style={{ gap: "var(--space-2)", padding: "var(--space-2) var(--space-4)", borderColor: "var(--border)", fontSize: "11px", fontWeight: 500, color: "var(--muted-foreground)" }}>
                  Demo In Progress
                </span>
              </div>
            </div>
          </div>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}