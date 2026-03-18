import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

function ListItem({ title, children, href = "#" }: { title: string; children: React.ReactNode; href?: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block rounded-md p-3 no-underline transition-colors"
          style={{ transition: "background-color var(--motion-hover)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--secondary-subtle)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <div style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>
            {title}
          </div>
          <p style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)", lineHeight: 1.4 }}>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

export function NavigationMenuPage() {
  return (
    <ComponentPage name="Navigation Menu" description="A collection of links for navigating websites, with support for dropdown content panels, keyboard navigation, and accessible labeling. Built on Radix UI Navigation Menu.">
      <Section title="Basic" description="A horizontal navigation menu with dropdown panels.">
        <ExampleRow label="With dropdowns">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                    <ListItem title="Introduction" href="#">Learn the fundamentals of the HollaEx Design System.</ListItem>
                    <ListItem title="Installation" href="#">Step-by-step guide to set up the component library.</ListItem>
                    <ListItem title="Typography" href="#">Font tokens, scales, and usage guidelines.</ListItem>
                    <ListItem title="Colors" href="#">Full palette with light and dark mode tokens.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:grid-cols-2">
                    <ListItem title="Alert Dialog" href="#">Modal dialogs for destructive actions.</ListItem>
                    <ListItem title="Hover Card" href="#">Preview content on hover.</ListItem>
                    <ListItem title="Menubar" href="#">Desktop-style horizontal menus.</ListItem>
                    <ListItem title="Slider" href="#">Range input with thumb controls.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleRow>
      </Section>

      <Section title="Simple Links" description="A menubar-style row with no dropdowns — just plain links.">
        <ExampleRow label="Flat links">
          <NavigationMenu>
            <NavigationMenuList>
              {["Overview", "Foundation", "Components", "Patterns"].map((label) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
