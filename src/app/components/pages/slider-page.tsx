import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { Slider } from "../ui/slider";
import { useState } from "react";

export function SliderPage() {
  const [singleValue, setSingleValue] = useState([50]);
  const [rangeValue, setRangeValue] = useState([25, 75]);
  const [tradeValue, setTradeValue] = useState([0]);

  return (
    <ComponentPage name="Slider" description="An input that allows selecting a value or range within a defined min/max. Built on Radix UI Slider with keyboard navigation and ARIA attributes.">
      <Section title="Basic" description="A single-thumb slider for selecting a value.">
        <ExampleRow label="Default">
          <div className="w-full" style={{ maxWidth: 360 }}>
            <Slider
              value={singleValue}
              onValueChange={setSingleValue}
              max={100}
              step={1}
            />
            <div className="flex justify-between" style={{ marginTop: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>0</span>
              <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)" }}>{singleValue[0]}</span>
              <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-tertiary)" }}>100</span>
            </div>
          </div>
        </ExampleRow>
      </Section>

      <Section title="Range" description="A dual-thumb slider for selecting a range.">
        <ExampleRow label="Range selection">
          <div className="w-full" style={{ maxWidth: 360 }}>
            <Slider
              value={rangeValue}
              onValueChange={setRangeValue}
              max={100}
              step={1}
            />
            <div className="flex justify-center" style={{ marginTop: "var(--space-3)", gap: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--brand-default)", padding: "var(--space-1) var(--space-3)", backgroundColor: "var(--brand-subtle)", borderRadius: "var(--radius-xs)" }}>
                {rangeValue[0]} – {rangeValue[1]}
              </span>
            </div>
          </div>
        </ExampleRow>
      </Section>

      <Section title="Trade Amount" description="A practical slider for setting order amounts as a percentage of available balance.">
        <ExampleRow label="Order percentage">
          <div className="w-full" style={{ maxWidth: 360 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-supreme)", color: "var(--color-text-primary)" }}>
                Order Amount
              </span>
              <span style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-bold)", color: "var(--brand-default)" }}>
                {tradeValue[0]}%
              </span>
            </div>
            <Slider
              value={tradeValue}
              onValueChange={setTradeValue}
              max={100}
              step={25}
            />
            <div className="flex justify-between" style={{ marginTop: "var(--space-3)" }}>
              {[0, 25, 50, 75, 100].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setTradeValue([v])}
                  className="cursor-pointer"
                  style={{
                    fontSize: "var(--text-caption)",
                    fontFamily: "var(--font-family-mono)",
                    color: tradeValue[0] === v ? "var(--brand-default)" : "var(--color-text-tertiary)",
                    fontWeight: tradeValue[0] === v ? "var(--font-weight-bold)" : "var(--font-weight-regular)",
                    background: "none",
                    border: "none",
                    padding: "var(--space-1) var(--space-2)",
                    borderRadius: "var(--radius-xs)",
                    transition: "color var(--motion-hover)",
                  }}
                >
                  {v}%
                </button>
              ))}
            </div>
          </div>
        </ExampleRow>
      </Section>

      <Section title="Disabled" description="Slider in a disabled state.">
        <ExampleRow label="Disabled">
          <div className="w-full" style={{ maxWidth: 360 }}>
            <Slider defaultValue={[40]} max={100} step={1} disabled />
          </div>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
