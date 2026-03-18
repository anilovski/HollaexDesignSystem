import { lazy, Suspense, createElement, Component as ReactComponent } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { createBrowserRouter } from "react-router";
import { DocsLayout } from "./components/docs/docs-layout";
import { OverviewPage } from "./components/pages/overview-page";
import { PageLoader } from "./components/ui/page-loader";

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
function lazyPage(importFn: () => Promise<{ [key: string]: any }>, exportName: string) {
  const LazyComp = lazy(() => importFn().then(m => ({ default: m[exportName] })));
  return function LazyPageWrapper() {
    return createElement(RouteErrorBoundary, null,
      createElement(Suspense, { fallback: createElement(PageLoader) }, createElement(LazyComp))
    );
  };
}

// ── Foundation pages ────────────────────────────────────────────
const ColorsPage = lazyPage(() => import("./components/pages/colors-page"), "ColorsPage");
const TypographyPage = lazyPage(() => import("./components/pages/typography-page"), "TypographyPage");
const SpacingPage = lazyPage(() => import("./components/pages/spacing-page"), "SpacingPage");
const IconsPage = lazyPage(() => import("./components/pages/icons-page"), "IconsPage");
const MotionPage = lazyPage(() => import("./components/pages/motion-page"), "MotionPage");

// ── Component pages ─────────────────────────────────────────────
const AccordionPage = lazyPage(() => import("./components/pages/accordion-page"), "AccordionPage");
const AlertPage = lazyPage(() => import("./components/pages/alert-page"), "AlertPage");
const AlertDialogPage = lazyPage(() => import("./components/pages/alert-dialog-page"), "AlertDialogPage");
const AvatarPage = lazyPage(() => import("./components/pages/avatar-page"), "AvatarPage");
const BadgePage = lazyPage(() => import("./components/pages/badge-page"), "BadgePage");
const BreadcrumbPage = lazyPage(() => import("./components/pages/breadcrumb-page"), "BreadcrumbPage");
const ButtonPage = lazyPage(() => import("./components/pages/button-page"), "ButtonPage");
const ButtonGroupPage = lazyPage(() => import("./components/pages/button-group-page"), "ButtonGroupPage");
const CarouselPage = lazyPage(() => import("./components/pages/carousel-page"), "CarouselPage");
const CheckboxPage = lazyPage(() => import("./components/pages/checkbox-page"), "CheckboxPage");
const ChipPage = lazyPage(() => import("./components/pages/chip-page"), "ChipPage");
const CoinCardPage = lazyPage(() => import("./components/pages/coin-card-page"), "CoinCardPage");
const CollapsiblePage = lazyPage(() => import("./components/pages/collapsible-page"), "CollapsiblePage");
const ContentSwitcherPage = lazyPage(() => import("./components/pages/content-switcher-page"), "ContentSwitcherPage");
const ContextMenuPage = lazyPage(() => import("./components/pages/context-menu-page"), "ContextMenuPage");
const DatePickerPage = lazyPage(() => import("./components/pages/date-picker-page"), "DatePickerPage");
const DropdownPage = lazyPage(() => import("./components/pages/dropdown-page"), "DropdownPage");
const FabPage = lazyPage(() => import("./components/pages/fab-page"), "FabPage");
const HeaderPage = lazyPage(() => import("./components/pages/header-page"), "HeaderPage");
const HoverCardPage = lazyPage(() => import("./components/pages/hover-card-page"), "HoverCardPage");
const InputPage = lazyPage(() => import("./components/pages/input-page"), "InputPage");
const InputDropdownPage = lazyPage(() => import("./components/pages/input-dropdown-page"), "InputDropdownPage");
const InputOTPPage = lazyPage(() => import("./components/pages/input-otp-page"), "InputOTPPage");
const LinkPage = lazyPage(() => import("./components/pages/link-page"), "LinkPage");
const ListPage = lazyPage(() => import("./components/pages/list-page"), "ListPage");
const MenubarPage = lazyPage(() => import("./components/pages/menubar-page"), "MenubarPage");
const ModalPage = lazyPage(() => import("./components/pages/modal-page"), "ModalPage");
const NavigationMenuPage = lazyPage(() => import("./components/pages/navigation-menu-page"), "NavigationMenuPage");
const PaginationPage = lazyPage(() => import("./components/pages/pagination-page"), "PaginationPage");
const PopoverPage = lazyPage(() => import("./components/pages/popover-page"), "PopoverPage");
const ProgressPage = lazyPage(() => import("./components/pages/progress-page"), "ProgressPage");
const RadioPage = lazyPage(() => import("./components/pages/radio-page"), "RadioPage");
const ResizablePage = lazyPage(() => import("./components/pages/resizable-page"), "ResizablePage");
const SearchPage = lazyPage(() => import("./components/pages/search-page"), "SearchPage");
const ScrollAreaPage = lazyPage(() => import("./components/pages/scroll-area-page"), "ScrollAreaPage");
const SelectPage = lazyPage(() => import("./components/pages/select-page"), "SelectPage");
const SheetPage = lazyPage(() => import("./components/pages/sheet-page"), "SheetPage");
const SideNavPage = lazyPage(() => import("./components/pages/side-nav-page"), "SideNavPage");
const SkeletonPage = lazyPage(() => import("./components/pages/skeleton-page"), "SkeletonPage");
const SliderPage = lazyPage(() => import("./components/pages/slider-page"), "SliderPage");
const StepperPage = lazyPage(() => import("./components/pages/stepper-page"), "StepperPage");
const TablePage = lazyPage(() => import("./components/pages/table-page"), "TablePage");
const TabPage = lazyPage(() => import("./components/pages/tab-page"), "TabPage");
const TextareaPage = lazyPage(() => import("./components/pages/textarea-page"), "TextareaPage");
const ToastPage = lazyPage(() => import("./components/pages/toast-page"), "ToastPage");
const TogglePage = lazyPage(() => import("./components/pages/toggle-page"), "TogglePage");
const TooltipPage = lazyPage(() => import("./components/pages/tooltip-page"), "TooltipPage");
const PageLoaderPage = lazyPage(() => import("./components/pages/page-loader-page"), "PageLoaderPage");
const GenericComponentPage = lazyPage(() => import("./components/pages/generic-component-page"), "GenericComponentPage");

// ── Pattern pages ───────────────────────────────────────────────
const DataDisplayPage = lazyPage(() => import("./components/pages/data-display-page"), "DataDisplayPage");
const EmailTemplatesPage = lazyPage(() => import("./components/pages/email-templates-page"), "EmailTemplatesPage");

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
      { path: "*", Component: OverviewPage },
    ],
  },
]);
