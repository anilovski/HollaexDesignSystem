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
    title: "Foundation",
    items: [
      { label: "Colors", href: "/foundation/colors" },
      { label: "Typography", href: "/foundation/typography" },
      { label: "Spacing", href: "/foundation/spacing" },
      { label: "Icons", href: "/foundation/icons" },
      { label: "Motion", href: "/foundation/motion" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Accordion", href: "/components/accordion" },
      { label: "Alert", href: "/components/alert" },
      { label: "Avatar", href: "/components/avatar" },
      { label: "Badge", href: "/components/badge" },
      { label: "Breadcrumb", href: "/components/breadcrumb" },
      { label: "Button", href: "/components/button" },
      { label: "Button Group", href: "/components/button-group" },
      { label: "Checkbox", href: "/components/checkbox" },
      { label: "Chip", href: "/components/chip" },
      { label: "Coin Card", href: "/components/coin-card" },
      { label: "Content Switcher", href: "/components/content-switcher" },
      { label: "Date Picker", href: "/components/date-picker" },
      { label: "Dropdown", href: "/components/dropdown" },
      { label: "Header", href: "/components/header" },
      { label: "Input", href: "/components/input" },
      { label: "Input Dropdown", href: "/components/input-dropdown" },
      { label: "Link", href: "/components/link" },
      { label: "List", href: "/components/list" },
      { label: "Modal", href: "/components/modal" },
      { label: "Pagination", href: "/components/pagination" },
      { label: "Popover", href: "/components/popover" },
      { label: "Progress", href: "/components/progress" },
      { label: "Radio Button", href: "/components/radio" },
      { label: "Search", href: "/components/search" },
      { label: "Scroll Area", href: "/components/scroll-area" },
      { label: "Select", href: "/components/select" },
      { label: "Sheet", href: "/components/sheet" },
      { label: "Side Navigation", href: "/components/side-nav" },
      { label: "Skeleton", href: "/components/skeleton" },
      { label: "Stepper", href: "/components/stepper" },
      { label: "Table", href: "/components/table" },
      { label: "Tabs", href: "/components/tab" },
      { label: "Textarea", href: "/components/textarea" },
      { label: "Toast", href: "/components/toast" },
      { label: "Toggle", href: "/components/toggle" },
      { label: "Tooltip", href: "/components/tooltip" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { label: "Forms", href: "/patterns/forms", soon: true },
      { label: "Data Display", href: "/patterns/data-display", soon: true },
      { label: "Navigation", href: "/patterns/navigation", soon: true },
      { label: "Feedback", href: "/patterns/feedback", soon: true },
    ],
  },
];