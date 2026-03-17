export interface SearchEntry {
  name: string;
  href: string;
  description: string;
  category: "Getting Started" | "Foundation" | "Components";
  keywords?: string[];
}

export const searchIndex: SearchEntry[] = [
  // ── Getting Started ─────────────────────────────
  {
    name: "Overview",
    href: "/",
    description:
      "Welcome to the HollaEx Design System. Color tokens, typography, components, and patterns — everything you need to build consistent HollaEx products.",
    category: "Getting Started",
    keywords: ["home", "welcome", "intro", "start", "foundation", "getting started"],
  },

  // ── Foundation ──────────────────────────────────
  {
    name: "Colors",
    href: "/foundation/colors",
    description:
      "Design tokens for color: background, text, border, button, status, and the Silver neutral scale. Every value is a CSS variable so themes update globally.",
    category: "Foundation",
    keywords: ["color", "palette", "tokens", "brand", "semantic", "theme", "dark mode", "variables", "css", "silver", "neutral", "status", "text"],
  },
  {
    name: "Typography",
    href: "/foundation/typography",
    description:
      "Type scale, font families (Supreme and JetBrains Mono), weights, and line-heights used across all HollaEx products.",
    category: "Foundation",
    keywords: ["font", "type", "text", "heading", "body", "supreme", "mono", "scale", "weight"],
  },
  {
    name: "Spacing",
    href: "/foundation/spacing",
    description:
      "Base-4 spacing scale from 0 to 160px in 17 steps. CSS variable tokens for padding, gaps, margins, and layout rhythm across all HollaEx products.",
    category: "Foundation",
    keywords: ["spacing", "padding", "margin", "gap", "layout", "scale", "tokens", "rhythm", "grid", "whitespace"],
  },
  {
    name: "Icons",
    href: "/foundation/icons",
    description:
      "Tabler outline icons and cryptocurrency SVG icons. Browse 400+ Tabler icons by category and 85+ crypto coin icons by ticker symbol.",
    category: "Foundation",
    keywords: ["icon", "crypto", "coin", "bitcoin", "ethereum", "svg", "symbol", "ticker", "currency", "asset", "tabler", "outline", "interface", "arrow", "media"],
  },
  {
    name: "Motion",
    href: "/foundation/motion",
    description:
      "Easing curves, duration tokens, and semantic motion presets inspired by Material Design 3. CSS variable tokens for hover, press, expand, enter/exit, and focus-line animations.",
    category: "Foundation",
    keywords: ["motion", "animation", "easing", "duration", "transition", "curve", "bezier", "timing", "hover", "enter", "exit", "expand", "collapse", "fade"],
  },

  // ── Components ──────────────────────────────────
  {
    name: "Accordion",
    href: "/components/accordion",
    description:
      "Collapsible sections with expandable headers. Supports white and gray styles, 5 sizes, and left/right chevron alignment.",
    category: "Components",
    keywords: ["collapse", "expand", "faq", "panel", "disclosure", "toggle"],
  },
  {
    name: "Alert",
    href: "/components/alert",
    description:
      "Status notifications with icons, accent bars, titles, descriptions, and action buttons. Supports info, warning, success, and error states.",
    category: "Components",
    keywords: ["notification", "banner", "message", "info", "warning", "success", "error", "status", "toast"],
  },
  {
    name: "Avatar",
    href: "/components/avatar",
    description:
      "User profile pictures with a double-ring design. Falls back to initials when no image is available. Supports 6 sizes.",
    category: "Components",
    keywords: ["profile", "user", "picture", "image", "initials", "photo"],
  },
  {
    name: "Badge",
    href: "/components/badge",
    description:
      "Colored labels with 11 color variants, indicator dots, icons, and counter bubbles. Available in circular (pill) and rounded shapes.",
    category: "Components",
    keywords: ["label", "tag", "pill", "counter", "indicator", "status", "dot"],
  },
  {
    name: "Button",
    href: "/components/button",
    description:
      "Primary interactive element with 9 style variants, 5 sizes, loading states, and icon support.",
    category: "Components",
    keywords: ["action", "click", "submit", "cta", "primary", "secondary", "danger", "outline", "ghost", "loading"],
  },
  {
    name: "Button Group",
    href: "/components/button-group",
    description:
      "Horizontally joined buttons with a shared border container. Uses context for consistent sizing. Ideal for view toggles and segmented controls.",
    category: "Components",
    keywords: ["segmented", "group", "toggle", "toolbar", "joined"],
  },
  {
    name: "Checkbox",
    href: "/components/checkbox",
    description:
      "Accessible form control with checked, unchecked, and indeterminate states. Supports labels, helper text, error states, and skeleton loading.",
    category: "Components",
    keywords: ["check", "tick", "form", "input", "select", "multi", "indeterminate"],
  },
  {
    name: "Chip",
    href: "/components/chip",
    description:
      "Tag/filter component for coins, categories, or selections. Supports white and gray backgrounds, round and rounded shapes, and selected/removable states.",
    category: "Components",
    keywords: ["tag", "filter", "coin", "category", "removable", "selection"],
  },
  {
    name: "Coin Card",
    href: "/components/coin-card",
    description:
      "Crypto coin display card with price, trend direction, sparkline chart, and hover-to-remove action. Designed for watchlist displays.",
    category: "Components",
    keywords: ["crypto", "coin", "price", "trend", "sparkline", "watchlist", "card", "bitcoin", "ethereum"],
  },
  {
    name: "Content Switcher",
    href: "/components/content-switcher",
    description:
      "Tab-like control for switching between content sections. Supports text and icon-only modes, white and gray backgrounds, and 4 sizes.",
    category: "Components",
    keywords: ["switch", "toggle", "segment", "tab", "selector"],
  },
  {
    name: "Date Picker",
    href: "/components/date-picker",
    description:
      "Calendar date selection with a popup calendar. Supports multiple sizes, validation states, and date formats.",
    category: "Components",
    keywords: ["calendar", "date", "picker", "select", "day", "month", "year", "schedule"],
  },
  {
    name: "Dropdown",
    href: "/components/dropdown",
    description:
      "Searchable select menu with gray, white, and midTone styling variants. Supports validation states, coin icons, and helper text.",
    category: "Components",
    keywords: ["select", "menu", "options", "combobox", "picker", "searchable"],
  },
  {
    name: "Header",
    href: "/components/header",
    description:
      "Top navigation bar for desktop and mobile with search, notifications, user menu, dark mode toggle, and deposit button. Supports logged-in and logged-out states.",
    category: "Components",
    keywords: ["nav", "navigation", "topbar", "appbar", "toolbar", "menu"],
  },
  {
    name: "Input",
    href: "/components/input",
    description:
      "Text, number, and phone-number input fields. All three types share a common size/style/state system with labels, helper text, and validation.",
    category: "Components",
    keywords: ["text", "field", "form", "number", "phone", "validation", "type"],
  },
  {
    name: "Input Dropdown",
    href: "/components/input-dropdown",
    description:
      "Hybrid amount input with a coin/token dropdown selector. Combines a numeric input field with a coin picker in a single control.",
    category: "Components",
    keywords: ["amount", "coin", "token", "hybrid", "number", "picker", "crypto"],
  },
  {
    name: "Link",
    href: "/components/link",
    description:
      "Navigational text links in standard and inline variants. Supports 4 sizes, optional icons, visited state, and auto-detects external URLs.",
    category: "Components",
    keywords: ["anchor", "href", "navigation", "url", "external", "text"],
  },
  {
    name: "List",
    href: "/components/list",
    description:
      "List items organize related content in a clear, scannable structure. Flexible building blocks for menus, settings, or data lists.",
    category: "Components",
    keywords: ["item", "menu", "settings", "data", "row", "scannable"],
  },
  {
    name: "Modal",
    href: "/components/modal",
    description:
      "Dialog overlay that captures focus and blocks page interaction. Supports scrollable bodies, five size presets, header/body/footer composition, nested stacking, and full dark mode via CSS tokens.",
    category: "Components",
    keywords: ["dialog", "overlay", "popup", "lightbox", "confirm", "form", "scroll", "focus trap"],
  },
  {
    name: "Progress",
    href: "/components/progress",
    description:
      "Progress indicators communicate the status of an ongoing process. Use the bar for linear flows and the circle for compact, at-a-glance metrics.",
    category: "Components",
    keywords: ["bar", "circle", "loading", "percentage", "status", "indicator", "metric"],
  },
  {
    name: "Radio Button",
    href: "/components/radio",
    description:
      "Radio buttons allow users to select a single option from a group of choices. Ideal for mutually exclusive selections.",
    category: "Components",
    keywords: ["radio", "option", "form", "single", "select", "group", "exclusive"],
  },
  {
    name: "Search",
    href: "/components/search",
    description:
      "Search inputs help users quickly find content by typing keywords. Two variants exist: a general-purpose SearchInput and a ProTradeSearch for trading pair lookups.",
    category: "Components",
    keywords: ["find", "filter", "query", "input", "trade", "lookup"],
  },
  {
    name: "Scroll Area",
    href: "/components/scroll-area",
    description:
      "A macOS-style custom scrollbar hook that replaces the native browser scrollbar with a draggable, auto-hiding overlay thumb. All styling is CSS-variable driven.",
    category: "Components",
    keywords: ["scroll", "scrollbar", "overflow", "custom", "hook", "drag", "auto-hide", "thumb", "macOS"],
  },
  {
    name: "Side Navigation",
    href: "/components/side-nav",
    description:
      "Persistent vertical navigation for applications. Supports sections, nested items, badges, collapsible mode, and white/gray variants — all driven by CSS variables.",
    category: "Components",
    keywords: ["sidebar", "nav", "navigation", "menu", "vertical", "collapsible", "nested"],
  },
  {
    name: "Stepper",
    href: "/components/stepper",
    description:
      "Steppers communicate progress through a sequence of logical and numbered steps. They may also be used for navigation. All styling is driven by CSS variables for easy theming.",
    category: "Components",
    keywords: ["step", "wizard", "progress", "sequence", "flow", "numbered"],
  },
  {
    name: "Table",
    href: "/components/table",
    description:
      "Tables display structured data in rows and columns. They support sticky headers, a sticky first column for horizontal scrolling, sorting, row selection, striped/bordered variants, and integrated pagination.",
    category: "Components",
    keywords: ["data", "grid", "rows", "columns", "sort", "pagination", "sticky", "striped"],
  },
  {
    name: "Tabs",
    href: "/components/tab",
    description:
      "Navigation component for switching between related content sections. Supports line, contained, and enclosed variants with icons, counters, and multiple sizes.",
    category: "Components",
    keywords: ["tab", "navigation", "switch", "panel", "line", "contained", "enclosed"],
  },
  {
    name: "Toggle",
    href: "/components/toggle",
    description:
      "A switch control for toggling between two states. Includes a default variant with green fill and a special theme toggle variant with sun/moon icons for light and dark mode switching.",
    category: "Components",
    keywords: ["switch", "on", "off", "theme", "dark", "light", "mode"],
  },
  {
    name: "Tooltip",
    href: "/components/tooltip",
    description:
      "Tooltips display brief, informative text when users hover over, focus on, or tap an element. They help provide additional context without cluttering the UI.",
    category: "Components",
    keywords: ["hover", "hint", "info", "popover", "help", "context", "label"],
  },
];

/**
 * Fuzzy-ish search: matches if every word in the query appears
 * somewhere in the entry's name, description, category, or keywords.
 */
export function searchEntries(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const words = q.split(/\s+/);

  return searchIndex.filter((entry) => {
    const haystack = [
      entry.name,
      entry.description,
      entry.category,
      ...(entry.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return words.every((w) => haystack.includes(w));
  });
}