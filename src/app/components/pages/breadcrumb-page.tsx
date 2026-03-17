import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { HxBreadcrumb } from "../ui/hx-breadcrumb";

const BASIC = [
  { label: "Home", onClick: () => {} },
  { label: "Trade", onClick: () => {} },
  { label: "BTC/USDT" },
];

const DEEP = [
  { label: "Home", onClick: () => {} },
  { label: "Settings", onClick: () => {} },
  { label: "Account", onClick: () => {} },
  { label: "Security", onClick: () => {} },
  { label: "Two-Factor Auth", onClick: () => {} },
  { label: "Setup" },
];

export function BreadcrumbPage() {
  return (
    <ComponentPage name="Breadcrumb" description="Hierarchical navigation showing the user's location in the app. Supports separators, collapsible paths, and three sizes.">
      <Section title="Basic" description="Standard breadcrumb with chevron separators.">
        <ExampleGrid label="Default">
          <HxBreadcrumb items={BASIC} />
        </ExampleGrid>
      </Section>

      <Section title="Separators" description="Three separator styles: chevron (default), slash, and dot.">
        <ExampleGrid label="All separators">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div>
              <Label>Chevron</Label>
              <HxBreadcrumb items={BASIC} separator="chevron" />
            </div>
            <div>
              <Label>Slash</Label>
              <HxBreadcrumb items={BASIC} separator="slash" />
            </div>
            <div>
              <Label>Dot</Label>
              <HxBreadcrumb items={BASIC} separator="dot" />
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Sizes" description="Three sizes for different layout contexts.">
        <ExampleGrid label="All sizes">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div>
              <Label>Small</Label>
              <HxBreadcrumb items={BASIC} size="sm" />
            </div>
            <div>
              <Label>Medium (default)</Label>
              <HxBreadcrumb items={BASIC} size="md" />
            </div>
            <div>
              <Label>Large</Label>
              <HxBreadcrumb items={BASIC} size="lg" />
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Collapsed" description="Long paths are collapsed with an ellipsis that expands on click.">
        <ExampleGrid label="Max 3 visible">
          <HxBreadcrumb items={DEEP} maxItems={3} />
        </ExampleGrid>
        <ExampleGrid label="Max 4 visible">
          <HxBreadcrumb items={DEEP} maxItems={4} />
        </ExampleGrid>
      </Section>

      <Section title="Deep Path" description="Full deep navigation without collapsing.">
        <ExampleGrid label="6 levels">
          <HxBreadcrumb items={DEEP} />
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: "var(--text-caption)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--color-text-tertiary)",
      fontFamily: "var(--font-family-supreme)",
      display: "block",
      marginBottom: "var(--space-2)",
    }}>
      {children}
    </span>
  );
}
