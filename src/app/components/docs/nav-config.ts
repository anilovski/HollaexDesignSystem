export type NavItem = {
  label: string;
  href: string;
  soon?: boolean;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [{ label: "Overview", href: "/" }],
  },
  {
    title: "Components",
    items: [
      { label: "Accordion", href: "/components/accordion" },
      { label: "Alert", href: "/components/alert" },
      { label: "Alert Dialog", href: "/components/alert-dialog" },
      { label: "Avatar", href: "/components/avatar" },
      { label: "Badge", href: "/components/badge" },
      { label: "Breadcrumb", href: "/components/breadcrumb" },
      { label: "Button", href: "/components/button" },
      { label: "Button Group", href: "/components/button-group" },
      { label: "Carousel", href: "/components/carousel" },
      { label: "Checkbox", href: "/components/checkbox" },
      { label: "Chip", href: "/components/chip" },
      { label: "Coin Card", href: "/components/coin-card" },
      { label: "Collapsible", href: "/components/collapsible" },
      { label: "Content Switcher", href: "/components/content-switcher" },
      { label: "Context Menu", href: "/components/context-menu" },
      { label: "Date Picker", href: "/components/date-picker" },
      { label: "Dropdown", href: "/components/dropdown" },
      { label: "FAB", href: "/components/fab" },
      { label: "Header", href: "/components/header" },
      { label: "Hover Card", href: "/components/hover-card" },
      { label: "Input", href: "/components/input" },
      { label: "Input Dropdown", href: "/components/input-dropdown" },
      { label: "Input OTP", href: "/components/input-otp" },
      { label: "Link", href: "/components/link" },
      { label: "List", href: "/components/list" },
      { label: "Menubar", href: "/components/menubar" },
      { label: "Modal", href: "/components/modal" },
      { label: "Navigation Menu", href: "/components/navigation-menu" },
      { label: "Page Loader", href: "/components/page-loader" },
      { label: "Pagination", href: "/components/pagination" },
      { label: "Popover", href: "/components/popover" },
      { label: "Progress", href: "/components/progress" },
      { label: "Radio Button", href: "/components/radio" },
      { label: "Resizable", href: "/components/resizable" },
      { label: "Search", href: "/components/search" },
      { label: "Scroll Area", href: "/components/scroll-area" },
      { label: "Select", href: "/components/select" },
      { label: "Sheet", href: "/components/sheet" },
      { label: "Side Navigation", href: "/components/side-nav" },
      { label: "Skeleton", href: "/components/skeleton" },
      { label: "Slider", href: "/components/slider" },
      { label: "Stepper", href: "/components/stepper" },
      { label: "Table", href: "/components/table" },
      { label: "Tabs", href: "/components/tab" },
      { label: "Textarea", href: "/components/textarea" },
      { label: "Toast", href: "/components/toast" },
      { label: "Toggle", href: "/components/toggle" },
      { label: "Tooltip", href: "/components/tooltip" },
    ],
  },
];

/** Pinned bottom sections: Foundation & Patterns */
export const pinnedNavSections: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { label: "Colors", href: "/foundation/colors" },
      { label: "Typography", href: "/foundation/typography" },
      { label: "Spacing", href: "/foundation/spacing" },
      { label: "Icons", href: "/foundation/icons" },
      { label: "Motion", href: "/foundation/motion" },
      { label: "Agent Legibility", href: "/foundation/agent-legibility" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { label: "Data Display", href: "/patterns/data-display" },
      { label: "Email Templates", href: "/patterns/email-templates" },
      { label: "Testing with Agents", href: "/patterns/testing-with-agents" },
    ],
  },
];