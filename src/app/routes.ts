import { createBrowserRouter } from "react-router";
import { DocsLayout } from "./components/docs/docs-layout";
import { OverviewPage } from "./components/pages/overview-page";
import { ColorsPage } from "./components/pages/colors-page";
import { TypographyPage } from "./components/pages/typography-page";
import { IconsPage } from "./components/pages/icons-page";
import { SpacingPage } from "./components/pages/spacing-page";
import { MotionPage } from "./components/pages/motion-page";
import { AccordionPage } from "./components/pages/accordion-page";
import { AlertPage } from "./components/pages/alert-page";
import { AvatarPage } from "./components/pages/avatar-page";
import { BadgePage } from "./components/pages/badge-page";
import { ButtonPage } from "./components/pages/button-page";
import { ButtonGroupPage } from "./components/pages/button-group-page";
import { CheckboxPage } from "./components/pages/checkbox-page";
import { ChipPage } from "./components/pages/chip-page";
import { CoinCardPage } from "./components/pages/coin-card-page";
import { ContentSwitcherPage } from "./components/pages/content-switcher-page";
import { DatePickerPage } from "./components/pages/date-picker-page";
import { DropdownPage } from "./components/pages/dropdown-page";
import { HeaderPage } from "./components/pages/header-page";
import { InputPage } from "./components/pages/input-page";
import { InputDropdownPage } from "./components/pages/input-dropdown-page";
import { LinkPage } from "./components/pages/link-page";
import { ListPage } from "./components/pages/list-page";
import { ModalPage } from "./components/pages/modal-page";
import { ProgressPage } from "./components/pages/progress-page";
import { RadioPage } from "./components/pages/radio-page";
import { SearchPage } from "./components/pages/search-page";
import { ScrollAreaPage } from "./components/pages/scroll-area-page";
import { SideNavPage } from "./components/pages/side-nav-page";
import { StepperPage } from "./components/pages/stepper-page";
import { TablePage } from "./components/pages/table-page";
import { TabPage } from "./components/pages/tab-page";
import { TogglePage } from "./components/pages/toggle-page";
import { TooltipPage } from "./components/pages/tooltip-page";
import { ToastPage } from "./components/pages/toast-page";
import { SelectPage } from "./components/pages/select-page";
import { TextareaPage } from "./components/pages/textarea-page";
import { SkeletonPage } from "./components/pages/skeleton-page";
import { PaginationPage } from "./components/pages/pagination-page";
import { BreadcrumbPage } from "./components/pages/breadcrumb-page";
import { PopoverPage } from "./components/pages/popover-page";
import { SheetPage } from "./components/pages/sheet-page";
import { GenericComponentPage } from "./components/pages/generic-component-page";

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
      { path: "components/avatar", Component: AvatarPage },
      { path: "components/badge", Component: BadgePage },
      { path: "components/button", Component: ButtonPage },
      { path: "components/button-group", Component: ButtonGroupPage },
      { path: "components/checkbox", Component: CheckboxPage },
      { path: "components/chip", Component: ChipPage },
      { path: "components/coin-card", Component: CoinCardPage },
      { path: "components/content-switcher", Component: ContentSwitcherPage },
      { path: "components/date-picker", Component: DatePickerPage },
      { path: "components/dropdown", Component: DropdownPage },
      { path: "components/header", Component: HeaderPage },
      { path: "components/input", Component: InputPage },
      { path: "components/input-dropdown", Component: InputDropdownPage },
      { path: "components/link", Component: LinkPage },
      { path: "components/list", Component: ListPage },
      { path: "components/modal", Component: ModalPage },
      { path: "components/progress", Component: ProgressPage },
      { path: "components/radio", Component: RadioPage },
      { path: "components/search", Component: SearchPage },
      { path: "components/scroll-area", Component: ScrollAreaPage },
      { path: "components/side-nav", Component: SideNavPage },
      { path: "components/stepper", Component: StepperPage },
      { path: "components/table", Component: TablePage },
      { path: "components/tab", Component: TabPage },
      { path: "components/toggle", Component: TogglePage },
      { path: "components/tooltip", Component: TooltipPage },
      { path: "components/toast", Component: ToastPage },
      { path: "components/select", Component: SelectPage },
      { path: "components/textarea", Component: TextareaPage },
      { path: "components/skeleton", Component: SkeletonPage },
      { path: "components/pagination", Component: PaginationPage },
      { path: "components/breadcrumb", Component: BreadcrumbPage },
      { path: "components/popover", Component: PopoverPage },
      { path: "components/sheet", Component: SheetPage },
      { path: "components/:component", Component: GenericComponentPage },
      { path: "*", Component: OverviewPage },
    ],
  },
]);