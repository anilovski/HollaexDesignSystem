import { useState } from "react";
import { ComponentPage, Section, ExampleRow, ExampleGrid } from "../docs/component-page";
import { CoinAmountField } from "../ui/hx-coin-amount-field";
import { ButtonGroup, ButtonGroupItem } from "../ui/hx-button-group";
import { ArrowDownUp } from "lucide-react";

const USDT = { symbol: "usdt", name: "Tether" };
const BTC = { symbol: "btc", name: "Bitcoin" };
const ETH = { symbol: "eth", name: "Ethereum" };
const SOL = { symbol: "sol", name: "Solana" };

export function CoinAmountFieldPage() {
  const [basicAmount, setBasicAmount] = useState("");
  const [fromAmount, setFromAmount] = useState("1,250.00");
  const [toAmount, setToAmount] = useState("0.01856");
  const [errorAmount, setErrorAmount] = useState("50000");
  const [pctAmount, setPctAmount] = useState("");

  return (
    <ComponentPage
      name="Coin Amount Field"
      description="Composite input for selecting a crypto asset and entering an amount. Combines a coin selector, numeric input, and balance display into one reusable unit. Used across Quick Trade, Convert, Withdraw, Deposit, and Staking flows."
    >
      {/* ── Basic ──────────────────────────────────── */}
      <Section title="Basic" description="Default medium size with a selected asset and balance display.">
        <ExampleRow label="Default">
          <div className="w-full" style={{ maxWidth: 420 }}>
            <CoinAmountField
              label="Convert From"
              asset={USDT}
              onAssetClick={() => {}}
              amount={basicAmount}
              onAmountChange={setBasicAmount}
              balance="40,012.722"
              showBalanceInfo
            />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Sizes ──────────────────────────────────── */}
      <Section title="Sizes" description="Three sizes: sm, md (default), and lg for different layout densities.">
        <ExampleGrid label="Size variants">
          <div className="flex flex-col" style={{ gap: "var(--space-5)", maxWidth: 420 }}>
            <CoinAmountField
              label="Small"
              asset={BTC}
              onAssetClick={() => {}}
              amount="0.5"
              balance="2.4851"
              size="sm"
            />
            <CoinAmountField
              label="Medium (default)"
              asset={ETH}
              onAssetClick={() => {}}
              amount="12.0"
              balance="24.881"
              size="md"
            />
            <CoinAmountField
              label="Large"
              asset={SOL}
              onAssetClick={() => {}}
              amount="150"
              balance="1,240.50"
              size="lg"
            />
          </div>
        </ExampleGrid>
      </Section>

      {/* ── Quick Trade Pair ──────────────────────── */}
      <Section title="Quick Trade Pair" description="Two fields composed together with a swap button to form a complete convert/quick-trade module.">
        <ExampleGrid label="Convert flow">
          <div className="flex flex-col items-center" style={{ gap: "var(--space-1)", maxWidth: 420, width: "100%" }}>
            <CoinAmountField
              label="Convert From"
              asset={USDT}
              onAssetClick={() => {}}
              amount={fromAmount}
              onAmountChange={setFromAmount}
              balance="40,012.722"
              showBalanceInfo
            />
            <button
              type="button"
              className="flex items-center justify-center rounded-full border transition-all z-10"
              style={{
                width: 36,
                height: 36,
                borderColor: "var(--secondary-default)",
                backgroundColor: "var(--secondary-default)",
                color: "var(--secondary-fg)",
                marginTop: "calc(var(--space-4) * -1)",
                marginBottom: "calc(var(--space-4) * -1)",
                boxShadow: "var(--elevation-sm)",
                transitionDuration: "var(--duration-short-3)",
                transitionTimingFunction: "var(--ease-standard)",
              }}
              aria-label="Swap assets"
            >
              <ArrowDownUp size={16} />
            </button>
            <CoinAmountField
              label="Convert To"
              asset={BTC}
              onAssetClick={() => {}}
              amount={toAmount}
              onAmountChange={setToAmount}
              balance="1.2340"
              readOnly
            />
          </div>
        </ExampleGrid>
      </Section>

      {/* ── With Footer (Percentage Buttons) ─────── */}
      <Section title="With Footer" description="Optional footer slot for percentage quick-select buttons or other controls.">
        <ExampleRow label="Percentage buttons">
          <div className="w-full" style={{ maxWidth: 420 }}>
            <CoinAmountField
              label="Amount"
              asset={USDT}
              onAssetClick={() => {}}
              amount={pctAmount}
              onAmountChange={setPctAmount}
              balance="40,012.722"
              footer={
                <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                  <ButtonGroup size="xs">
                    <ButtonGroupItem onClick={() => setPctAmount("10,003.18")}>25%</ButtonGroupItem>
                    <ButtonGroupItem onClick={() => setPctAmount("20,006.36")}>50%</ButtonGroupItem>
                    <ButtonGroupItem onClick={() => setPctAmount("30,009.54")}>75%</ButtonGroupItem>
                    <ButtonGroupItem onClick={() => setPctAmount("40,012.72")}>Max</ButtonGroupItem>
                  </ButtonGroup>
                </div>
              }
            />
          </div>
        </ExampleRow>
      </Section>

      {/* ── No Asset Selected ────────────────────── */}
      <Section title="No Asset Selected" description="Empty state before the user picks a coin.">
        <ExampleRow label="Empty">
          <div className="w-full" style={{ maxWidth: 420 }}>
            <CoinAmountField
              label="Convert From"
              onAssetClick={() => {}}
            />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Read Only ────────────────────────────── */}
      <Section title="Read Only" description="Amount field is read-only, typically used for the receiving side of a conversion.">
        <ExampleRow label="Read-only">
          <div className="w-full" style={{ maxWidth: 420 }}>
            <CoinAmountField
              label="Convert To"
              asset={BTC}
              amount="0.01856"
              balance="1.2340"
              readOnly
            />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Error State ──────────────────────────── */}
      <Section title="Error State" description="Validation error displayed below the input, with red border and ring.">
        <ExampleRow label="Insufficient balance">
          <div className="w-full" style={{ maxWidth: 420 }}>
            <CoinAmountField
              label="Convert From"
              asset={USDT}
              onAssetClick={() => {}}
              amount={errorAmount}
              onAmountChange={setErrorAmount}
              balance="40,012.722"
              error="Insufficient USDT balance"
            />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Disabled ─────────────────────────────── */}
      <Section title="Disabled" description="Entire field is non-interactive.">
        <ExampleRow label="Disabled">
          <div className="w-full" style={{ maxWidth: 420 }}>
            <CoinAmountField
              label="Convert From"
              asset={USDT}
              amount="1,000"
              balance="40,012.722"
              disabled
            />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Skeleton ─────────────────────────────── */}
      <Section title="Skeleton" description="Loading placeholder while data is being fetched.">
        <ExampleGrid label="Skeleton variants">
          <div className="flex flex-col" style={{ gap: "var(--space-5)", maxWidth: 420 }}>
            <CoinAmountField skeleton label="Convert From" size="sm" />
            <CoinAmountField skeleton label="Convert From" size="md" />
            <CoinAmountField skeleton label="Convert From" size="lg" />
          </div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}