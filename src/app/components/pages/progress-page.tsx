import { useState, useCallback } from "react";
import { ComponentPage, Section, ExampleRow, ExampleGrid } from "../docs/component-page";
import { PropsTable, type PropDef } from "../docs/props-table";
import { ProgressBar, ProgressCircle } from "../ui/hx-progress";

const PROGRESS_PROPS: PropDef[] = [
  { name: "value", type: "number", required: true, description: "Current progress value (0-100)" },
  { name: "max", type: "number", default: "100", description: "Maximum value" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Bar thickness preset" },
  { name: "variant", type: '"default" | "success" | "warning" | "error"', default: '"default"', description: "Color variant" },
  { name: "showValue", type: "boolean", default: "false", description: "Displays the percentage label" },
  { name: "animated", type: "boolean", default: "true", description: "Animate the progress fill on change" },
];

export function ProgressPage() {
  const [barValue, setBarValue] = useState(45);
  const [circleValue, setCircleValue] = useState(65);
  const [animating, setAnimating] = useState(false);
  const [animValue, setAnimValue] = useState(0);

  const runAnimation = useCallback(() => {
    setAnimating(true); setAnimValue(0); const target = 78; const duration = 2000; const startTime = performance.now();
    function step(now: number) { const elapsed = now - startTime; const progress = Math.min(elapsed / duration, 1); const eased = 1 - Math.pow(1 - progress, 3); setAnimValue(Math.round(eased * target)); if (progress < 1) requestAnimationFrame(step); else setAnimating(false); }
    requestAnimationFrame(step);
  }, []);

  return (
    <ComponentPage name="Progress" description="Progress indicators communicate the status of an ongoing process. Use the bar for linear flows and the circle for compact, at-a-glance metrics.">
      <Section title="Progress Bar" description="A horizontal bar showing completion from 0 to 100%. Drag the slider to see it animate.">
        <ExampleGrid label="Interactive">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <ProgressBar value={barValue} label="right" />
            <input type="range" min={0} max={100} value={barValue} onChange={(e) => setBarValue(Number(e.target.value))} className="w-full cursor-pointer" style={{ accentColor: "var(--brand-default)" }} />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Label Modes" description="Three ways to display the percentage.">
        <ExampleGrid label="No label"><ProgressBar value={60} label="none" className="max-w-[400px]" /></ExampleGrid>
        <div className="h-4" />
        <ExampleGrid label="Label right"><ProgressBar value={60} label="right" className="max-w-[400px]" /></ExampleGrid>
        <div className="h-4" />
        <ExampleGrid label="Label inside"><ProgressBar value={60} label="inside" className="max-w-[400px]" /></ExampleGrid>
      </Section>
      <Section title="Step Values" description="Progress bars at various increments.">
        <ExampleGrid label="0% to 100%">
          <div className="flex flex-col w-full max-w-[400px]" style={{ gap: "var(--space-4)" }}>
            {[0, 25, 50, 75, 100].map((v) => <ProgressBar key={v} value={v} label="right" />)}
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Progress Circle" description="A circular ring showing completion. Drag the slider to animate.">
        <ExampleGrid label="Interactive">
          <div className="flex flex-col items-center w-full" style={{ gap: "var(--space-7)" }}>
            <ProgressCircle value={circleValue} size="md" label="Progress" />
            <input type="range" min={0} max={100} value={circleValue} onChange={(e) => setCircleValue(Number(e.target.value))} className="w-full max-w-[300px] cursor-pointer" style={{ accentColor: "var(--brand-default)" }} />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Full Circle Sizes" description="Five sizes from 2X-Small (64px) to Large (280px).">
        <ExampleRow label="All sizes">
          <ProgressCircle value={72} size="2xs" label="Done" />
          <ProgressCircle value={72} size="xs" label="Done" />
          <ProgressCircle value={72} size="sm" label="Done" />
        </ExampleRow>
      </Section>
      <Section title="Half Circle" description="Semicircular variant for compact layouts.">
        <ExampleRow label="Half circle sizes">
          <ProgressCircle value={65} type="half" size="2xs" label="CPU" />
          <ProgressCircle value={65} type="half" size="xs" label="CPU" />
          <ProgressCircle value={65} type="half" size="sm" label="CPU" />
        </ExampleRow>
      </Section>
      <Section title="Animated" description="Click the button to see the progress animate from 0 to 78%.">
        <ExampleGrid label="Animation demo">
          <div className="flex flex-col items-center w-full" style={{ gap: "var(--space-7)" }}>
            <ProgressCircle value={animValue} size="sm" label="Upload" />
            <div className="flex flex-col w-full max-w-[360px]" style={{ gap: "var(--space-4)" }}>
              <ProgressBar value={animValue} label="right" />
              <ProgressBar value={animValue} label="inside" />
            </div>
            <button onClick={runAnimation} disabled={animating} className="px-4 py-2 rounded-lg border text-[14px] font-sans font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
              {animating ? "Animating..." : "Run Animation"}
            </button>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="API Reference"><PropsTable props={PROGRESS_PROPS} componentName="HxProgress" /></Section>
    </ComponentPage>
  );
}