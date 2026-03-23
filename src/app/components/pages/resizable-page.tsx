import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../ui/resizable";

function PanelContent({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex items-center justify-center h-full"
      style={{
        fontSize: "var(--text-body-sm)",
        fontWeight: "var(--font-weight-medium)",
        fontFamily: "var(--font-family-supreme)",
        color: "var(--color-text-secondary)",
        backgroundColor: color,
        minHeight: 160,
      }}
    >
      {label}
    </div>
  );
}

export function ResizablePage() {
  return (
    <ComponentPage name="Resizable" description="Resizable panel groups that let users adjust layout proportions by dragging handles. Built on react-resizable-panels for accessible, keyboard-friendly resizing." hideFab>
      <Section title="Horizontal" description="Two horizontally resizable panels with a drag handle.">
        <ExampleRow label="Side by side">
          <div className="w-full rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-subtle)", maxWidth: 600 }}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <PanelContent label="Panel A" color="var(--secondary-subtle)" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <PanelContent label="Panel B" color="var(--background)" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ExampleRow>
      </Section>

      <Section title="Vertical" description="Vertically stacked resizable panels.">
        <ExampleRow label="Stacked">
          <div className="w-full rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-subtle)", maxWidth: 400, height: 320 }}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={40}>
                <PanelContent label="Top" color="var(--secondary-subtle)" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60}>
                <PanelContent label="Bottom" color="var(--background)" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ExampleRow>
      </Section>

      <Section title="Three Panels" description="A more complex layout with three resizable sections.">
        <ExampleRow label="Three-way split">
          <div className="w-full rounded-lg overflow-hidden border" style={{ borderColor: "var(--border-subtle)", maxWidth: 600 }}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={25} minSize={15}>
                <PanelContent label="Sidebar" color="var(--secondary-subtle)" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <PanelContent label="Content" color="var(--background)" />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={25} minSize={15}>
                <PanelContent label="Inspector" color="var(--secondary-subtle)" />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
