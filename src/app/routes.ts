import { lazy, Suspense, createElement, Component as ReactComponent } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { createBrowserRouter } from "react-router";
import { DocsLayout } from "./components/docs/docs-layout";
import { OverviewPage } from "./components/pages/overview-page";
import { PageLoader } from "./components/ui/page-loader";
import { resolveRouteLoader } from "./components/ui/loading-illustrations";

// ── Simple error boundary for route errors ──────────────────────
class RouteErrorBoundary extends ReactComponent<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Route error:", error, info); }
  render() {
    if (this.state.error) {
      return createElement("div", { style: { padding: "40px", fontFamily: "var(--font-family-mono)", color: "var(--destructive)" } },
        createElement("h2", { style: { marginBottom: "16px" } }, "Component Error"),
        createElement("pre", { style: { whiteSpace: "pre-wrap", fontSize: "13px", padding: "16px", background: "var(--secondary)", borderRadius: "8px" } }, this.state.error.message + "\n\n" + this.state.error.stack)
      );
    }
    return this.props.children;
  }
}

// ── Lazy page factory ───────────────────────────────────────────
// Accepts a route slug to auto-resolve illustration variant + contextual messages
// from ROUTE_ILLUSTRATION_MAP and VARIANT_MESSAGES. No manual mapping needed.
function lazyPage(importFn: () => Promise<{ [key: string]: any }>, exportName: string, slug?: string) {
  const LazyComp = lazy(() => importFn().then(m => ({ default: m[exportName] })));
  const { variant, messages } = slug ? resolveRouteLoader(slug) : { variant: undefined, messages: undefined };
  return function LazyPageWrapper() {
    return createElement(RouteErrorBoundary, null,
      createElement(Suspense, { fallback: createElement(PageLoader, { variant, messages }) }, createElement(LazyComp))
    );
  };
}

// ── Foundation pages ────────────────────────────────────────────
const ColorsPage = lazyPage(() => import("./components/pages/colors-page"), "ColorsPage", "colors");
const TypographyPage = lazyPage(() => import("./components/pages/typography-page"), "TypographyPage", "typography");
const SpacingPage = lazyPage(() => import("./components/pages/spacing-page"), "SpacingPage", "spacing");
const IconsPage = lazyPage(() => import("./components/pages/icons-page"), "IconsPage", "icons");
const MotionPage = lazyPage(() => import("./components/pages/motion-page"), "MotionPage", "motion");
const AgentLegibilityPage = lazyPage(() => import("./components/pages/agent-legibility-page"), "AgentLegibilityPage", "agent-legibility");

// ── Component pages ─────────────────────────────────────────────
const AccordionPage = lazyPage(() => import("./components/pages/accordion-page"), "AccordionPage", "accordion");
const AlertPage = lazyPage(() => import("./components/pages/alert-page"), "AlertPage", "alert");
const AlertDialogPage = lazyPage(() => import("./components/pages/alert-dialog-page"), "AlertDialogPage", "alert-dialog");
const AvatarPage = lazyPage(() => import("./components/pages/avatar-page"), "AvatarPage", "avatar");
const BadgePage = lazyPage(() => import("./components/pages/badge-page"), "BadgePage", "badge");
const BreadcrumbPage = lazyPage(() => import("./components/pages/breadcrumb-page"), "BreadcrumbPage", "breadcrumb");
const ButtonPage = lazyPage(() => import("./components/pages/button-page"), "ButtonPage", "button");
const ButtonGroupPage = lazyPage(() => import("./components/pages/button-group-page"), "ButtonGroupPage", "button-group");
const CarouselPage = lazyPage(() => import("./components/pages/carousel-page"), "CarouselPage", "carousel");
const CheckboxPage = lazyPage(() => import("./components/pages/checkbox-page"), "CheckboxPage", "checkbox");
const ChipPage = lazyPage(() => import("./components/pages/chip-page"), "ChipPage", "chip");
const CoinCardPage = lazyPage(() => import("./components/pages/coin-card-page"), "CoinCardPage", "coin-card");
const CollapsiblePage = lazyPage(() => import("./components/pages/collapsible-page"), "CollapsiblePage", "collapsible");
const ContentSwitcherPage = lazyPage(() => import("./components/pages/content-switcher-page"), "ContentSwitcherPage", "content-switcher");
const ContextMenuPage = lazyPage(() => import("./components/pages/context-menu-page"), "ContextMenuPage", "context-menu");
const DatePickerPage = lazyPage(() => import("./components/pages/date-picker-page"), "DatePickerPage", "date-picker");
const DropdownPage = lazyPage(() => import("./components/pages/dropdown-page"), "DropdownPage", "dropdown");
const FabPage = lazyPage(() => import("./components/pages/fab-page"), "FabPage", "fab");
const HeaderPage = lazyPage(() => import("./components/pages/header-page"), "HeaderPage", "header");
const HoverCardPage = lazyPage(() => import("./components/pages/hover-card-page"), "HoverCardPage", "hover-card");
const InputPage = lazyPage(() => import("./components/pages/input-page"), "InputPage", "input");
const InputDropdownPage = lazyPage(() => import("./components/pages/input-dropdown-page"), "InputDropdownPage", "input-dropdown");
const InputOTPPage = lazyPage(() => import("./components/pages/input-otp-page"), "InputOTPPage", "input-otp");
const LinkPage = lazyPage(() => import("./components/pages/link-page"), "LinkPage", "link");
const ListPage = lazyPage(() => import("./components/pages/list-page"), "ListPage", "list");
const MenubarPage = lazyPage(() => import("./components/pages/menubar-page"), "MenubarPage", "menubar");
const ModalPage = lazyPage(() => import("./components/pages/modal-page"), "ModalPage", "modal");
const NavigationMenuPage = lazyPage(() => import("./components/pages/navigation-menu-page"), "NavigationMenuPage", "navigation-menu");
const PaginationPage = lazyPage(() => import("./components/pages/pagination-page"), "PaginationPage", "pagination");
const PopoverPage = lazyPage(() => import("./components/pages/popover-page"), "PopoverPage", "popover");
const ProgressPage = lazyPage(() => import("./components/pages/progress-page"), "ProgressPage", "progress");
const RadioPage = lazyPage(() => import("./components/pages/radio-page"), "RadioPage", "radio");
const ResizablePage = lazyPage(() => import("./components/pages/resizable-page"), "ResizablePage", "resizable");
const SearchPage = lazyPage(() => import("./components/pages/search-page"), "SearchPage", "search");
const ScrollAreaPage = lazyPage(() => import("./components/pages/scroll-area-page"), "ScrollAreaPage", "scroll-area");
const SelectPage = lazyPage(() => import("./components/pages/select-page"), "SelectPage", "select");
const SheetPage = lazyPage(() => import("./components/pages/sheet-page"), "SheetPage", "sheet");
const SideNavPage = lazyPage(() => import("./components/pages/side-nav-page"), "SideNavPage", "side-nav");
const SkeletonPage = lazyPage(() => import("./components/pages/skeleton-page"), "SkeletonPage", "skeleton");
const SliderPage = lazyPage(() => import("./components/pages/slider-page"), "SliderPage", "slider");
const StepperPage = lazyPage(() => import("./components/pages/stepper-page"), "StepperPage", "stepper");
const TablePage = lazyPage(() => import("./components/pages/table-page"), "TablePage", "table");
const TabPage = lazyPage(() => import("./components/pages/tab-page"), "TabPage", "tab");
const TextareaPage = lazyPage(() => import("./components/pages/textarea-page"), "TextareaPage", "textarea");
const ToastPage = lazyPage(() => import("./components/pages/toast-page"), "ToastPage", "toast");
const TogglePage = lazyPage(() => import("./components/pages/toggle-page"), "TogglePage", "toggle");
const TooltipPage = lazyPage(() => import("./components/pages/tooltip-page"), "TooltipPage", "tooltip");
const PageLoaderPage = lazyPage(() => import("./components/pages/page-loader-page"), "PageLoaderPage", "page-loader");
const GenericComponentPage = lazyPage(() => import("./components/pages/generic-component-page"), "GenericComponentPage");

// ── Pattern pages ───────────────────────────────────────────────
const DataDisplayPage = lazyPage(() => import("./components/pages/data-display-page"), "DataDisplayPage", "data-display");
const EmailTemplatesPage = lazyPage(() => import("./components/pages/email-templates-page"), "EmailTemplatesPage", "email-templates");
const TestingWithAgentsPage = lazyPage(() => import("./components/pages/testing-with-agents-page"), "TestingWithAgentsPage", "testing-with-agents");

// ── Router ──────────────────────────────────────────────────────
export const router = createBrowserRouter([
  {
    path: "/",
    Component: DocsLayout,
    children: [
      { index: true, Component: OverviewPage },
      { path: "foundation/colors", Component: ColorsPage },
      { path: "foundation/typography", Component: TypographyPage },
      { path: "foundation/spacing", Component: SpacingPage },
      { path: "foundation/icons", Component: IconsPage },
      { path: "foundation/motion", Component: MotionPage },
      { path: "foundation/agent-legibility", Component: AgentLegibilityPage },
      { path: "components/accordion", Component: AccordionPage },
      { path: "components/alert", Component: AlertPage },
      { path: "components/alert-dialog", Component: AlertDialogPage },
      { path: "components/avatar", Component: AvatarPage },
      { path: "components/badge", Component: BadgePage },
      { path: "components/breadcrumb", Component: BreadcrumbPage },
      { path: "components/button", Component: ButtonPage },
      { path: "components/button-group", Component: ButtonGroupPage },
      { path: "components/carousel", Component: CarouselPage },
      { path: "components/checkbox", Component: CheckboxPage },
      { path: "components/chip", Component: ChipPage },
      { path: "components/coin-card", Component: CoinCardPage },
      { path: "components/collapsible", Component: CollapsiblePage },
      { path: "components/content-switcher", Component: ContentSwitcherPage },
      { path: "components/context-menu", Component: ContextMenuPage },
      { path: "components/date-picker", Component: DatePickerPage },
      { path: "components/dropdown", Component: DropdownPage },
      { path: "components/fab", Component: FabPage },
      { path: "components/header", Component: HeaderPage },
      { path: "components/hover-card", Component: HoverCardPage },
      { path: "components/input", Component: InputPage },
      { path: "components/input-dropdown", Component: InputDropdownPage },
      { path: "components/input-otp", Component: InputOTPPage },
      { path: "components/link", Component: LinkPage },
      { path: "components/list", Component: ListPage },
      { path: "components/menubar", Component: MenubarPage },
      { path: "components/modal", Component: ModalPage },
      { path: "components/navigation-menu", Component: NavigationMenuPage },
      { path: "components/page-loader", Component: PageLoaderPage },
      { path: "components/pagination", Component: PaginationPage },
      { path: "components/popover", Component: PopoverPage },
      { path: "components/progress", Component: ProgressPage },
      { path: "components/radio", Component: RadioPage },
      { path: "components/resizable", Component: ResizablePage },
      { path: "components/search", Component: SearchPage },
      { path: "components/scroll-area", Component: ScrollAreaPage },
      { path: "components/select", Component: SelectPage },
      { path: "components/sheet", Component: SheetPage },
      { path: "components/side-nav", Component: SideNavPage },
      { path: "components/skeleton", Component: SkeletonPage },
      { path: "components/slider", Component: SliderPage },
      { path: "components/stepper", Component: StepperPage },
      { path: "components/table", Component: TablePage },
      { path: "components/tab", Component: TabPage },
      { path: "components/textarea", Component: TextareaPage },
      { path: "components/toast", Component: ToastPage },
      { path: "components/toggle", Component: TogglePage },
      { path: "components/tooltip", Component: TooltipPage },
      { path: "components/:component", Component: GenericComponentPage },
      { path: "patterns/data-display", Component: DataDisplayPage },
      { path: "patterns/email-templates", Component: EmailTemplatesPage },
      { path: "patterns/testing-with-agents", Component: TestingWithAgentsPage },
      { path: "*", Component: OverviewPage },
    ],
  },
]);