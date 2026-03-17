import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { HxSelect } from "../ui/hx-select";

const COINS = [
  { value: "btc", label: "Bitcoin (BTC)" },
  { value: "eth", label: "Ethereum (ETH)" },
  { value: "xht", label: "HollaEx (XHT)" },
  { value: "usdt", label: "Tether (USDT)" },
  { value: "sol", label: "Solana (SOL)" },
];

const GROUPED = [
  { label: "Layer 1", options: [
    { value: "btc", label: "Bitcoin (BTC)" },
    { value: "eth", label: "Ethereum (ETH)" },
    { value: "sol", label: "Solana (SOL)" },
  ]},
  { label: "Stablecoins", options: [
    { value: "usdt", label: "Tether (USDT)" },
    { value: "usdc", label: "USD Coin (USDC)" },
    { value: "dai", label: "DAI" },
  ]},
  { label: "Exchange Tokens", options: [
    { value: "xht", label: "HollaEx (XHT)" },
    { value: "bnb", label: "BNB", disabled: true },
  ]},
];

export function SelectPage() {
  return (
    <ComponentPage name="Select" description="Form-style dropdown select for choosing a single value from a list. Supports grouped options, sizes, validation states, and clearable values.">
      <Section title="Basic" description="Standard select with flat options.">
        <ExampleGrid label="Default">
          <div className="w-72"><HxSelect items={COINS} placeholder="Select a coin..." label="Trading pair" /></div>
        </ExampleGrid>
      </Section>

      <Section title="Styles" description="Gray (default) and white background styles.">
        <ExampleGrid label="Gray & White">
          <div className="flex" style={{ gap: "var(--space-7)" }}>
            <div className="w-72"><HxSelect items={COINS} style="gray" label="Gray style" placeholder="Select..." /></div>
            <div className="w-72"><HxSelect items={COINS} style="white" label="White style" placeholder="Select..." /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Corners" description="Sharp (default) or rounded corners.">
        <ExampleGrid label="Sharp & Rounded">
          <div className="flex" style={{ gap: "var(--space-7)" }}>
            <div className="w-72"><HxSelect items={COINS} corners="sharp" label="Sharp" placeholder="Select..." /></div>
            <div className="w-72"><HxSelect items={COINS} corners="rounded" label="Rounded" placeholder="Select..." /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleGrid label="All sizes">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-72"><HxSelect items={COINS} size="sm" label="Small" placeholder="Select..." /></div>
            <div className="w-72"><HxSelect items={COINS} size="md" label="Medium (default)" placeholder="Select..." /></div>
            <div className="w-72"><HxSelect items={COINS} size="lg" label="Large" placeholder="Select..." /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Grouped Options" description="Options can be organized into labeled groups with disabled items.">
        <ExampleGrid label="Grouped">
          <div className="w-72"><HxSelect items={GROUPED} label="Select asset" placeholder="Choose..." corners="rounded" /></div>
        </ExampleGrid>
      </Section>

      <Section title="Clearable" description="Show a clear button when a value is selected.">
        <ExampleGrid label="Clearable">
          <div className="w-72"><HxSelect items={COINS} clearable defaultValue="btc" label="Clearable select" /></div>
        </ExampleGrid>
      </Section>

      <Section title="Validation States" description="Error, warning, and disabled states with helper text.">
        <ExampleGrid label="States">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-72"><HxSelect items={COINS} state="error" label="Error" placeholder="Select..." errorText="This field is required" corners="rounded" /></div>
            <div className="w-72"><HxSelect items={COINS} state="warning" label="Warning" placeholder="Select..." warningText="This pair has low liquidity" corners="rounded" /></div>
            <div className="w-72"><HxSelect items={COINS} state="disabled" label="Disabled" placeholder="Select..." helperText="Currently unavailable" /></div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="With Helper Text" description="Additional context below the select.">
        <ExampleGrid label="Helper">
          <div className="w-72"><HxSelect items={COINS} label="Base currency" placeholder="Select..." helperText="This will be your default trading pair" /></div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}
