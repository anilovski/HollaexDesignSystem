import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, XCircle } from "lucide-react";
import { cn } from "../ui/utils";

interface CoinOption { symbol: string; name: string }

function InputDropdown({ color = "gray", corners = "sharp", size = "lg", state, label, placeholder = "0.00", helperText, warningText, errorText, coins = [], defaultCoin, skeleton = false }: {
  color?: "gray"|"white"; corners?: "sharp"|"rounded"; size?: "lg"|"md"|"sm"|"xs"; state?: "default"|"error"|"warning"|"disabled"
  label?: string; placeholder?: string; helperText?: string; warningText?: string; errorText?: string; coins?: CoinOption[]; defaultCoin?: string; skeleton?: boolean
}) {
  const [value, setValue] = useState(""); const [coin, setCoin] = useState(defaultCoin ?? coins[0]?.symbol ?? ""); const [dropOpen, setDropOpen] = useState(false); const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!dropOpen) return; const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setDropOpen(false) }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h) }, [dropOpen]);
  const isDisabled = state === "disabled"; const isError = !!errorText || state === "error"; const isWarning = !!warningText || state === "warning";
  const heights: Record<string, string> = { lg: "h-[48px]", md: "h-[40px]", sm: "h-[32px]", xs: "h-[24px]" };
  const bg = color === "gray" ? "bg-[#f4f4f4]" : "bg-white";
  const border = isError ? (corners === "rounded" ? "border-2 border-[var(--danger-default)]" : "border-b border-[#e1e1e1]") : (corners === "rounded" ? "border border-[#e1e1e1]" : "border-b border-[#e1e1e1]");
  const focusLineColor = isError ? "var(--danger-default)" : "var(--brand-default)";
  const activeCoin = coins.find(c => c.symbol === coin) ?? coins[0];

  if (skeleton) return (
    <div className="flex flex-col">{label && <div className="h-[10px] w-[60px] rounded mb-[8px] hx-shimmer" />}<div className={cn("flex items-center w-full bg-[#f4f4f4]", heights[size])}><div className="flex-1 h-[14px] rounded hx-shimmer mx-3" /><div className="w-px self-stretch bg-[#ddd]" /><div className="flex items-center gap-[6px] px-3"><div className="size-4 rounded-full hx-shimmer" /><div className="h-[14px] w-[32px] rounded hx-shimmer" /></div></div></div>
  );

  return (
    <div ref={ref} className="flex flex-col">
      {label && <span className={cn("text-[12px] leading-[16px] pb-[8px]", isDisabled ? "text-[#c8c8c8]" : "text-[var(--color-text-secondary)]")}>{label}</span>}
      <div className={corners === "rounded" ? "rounded-[6px] overflow-hidden" : ""}>
        <div className={cn("relative group flex items-center w-full px-[12px] gap-[8px] transition-colors overflow-hidden", heights[size], bg, border, isDisabled && "opacity-50 cursor-not-allowed")}>
          <input type="text" inputMode="decimal" placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} disabled={isDisabled} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className="flex-1 min-w-0 bg-transparent outline-none border-none font-sans text-[14px] placeholder:text-[#a0a0a0] text-[var(--color-text-primary)]" />
          {focused && value.length > 0 && !isDisabled && <button type="button" onClick={() => setValue("")} className="shrink-0 cursor-pointer text-[#a0a0a0] hover:text-[#1a1a1a]"><XCircle size={16} /></button>}
          <div className="w-px self-stretch mx-[4px] bg-[#e1e1e1]" />
          <div className="relative flex items-center shrink-0">
            <button type="button" disabled={isDisabled} onClick={() => !isDisabled && setDropOpen(v => !v)} className="flex items-center gap-[6px] cursor-pointer">
              <div className="size-4 rounded-full bg-[#e1e1e1] flex items-center justify-center"><span className="text-[8px] font-bold text-[#525252]">{activeCoin?.symbol?.slice(0,1) ?? "?"}</span></div>
              <span className="text-[14px] font-medium text-[var(--color-text-primary)]">{activeCoin?.symbol ?? "—"}</span>
              <ChevronDown size={16} className={cn("text-[#a0a0a0] transition-transform", dropOpen && "rotate-180")} />
            </button>
            {dropOpen && coins.length > 0 && (
              <div className="absolute right-0 top-full mt-[4px] z-50 min-w-[160px] rounded-[6px] border border-[#e1e1e1] bg-white shadow-lg py-[4px]">
                {coins.map((c, idx) => (
                  <button key={c.symbol} type="button" onClick={() => { setCoin(c.symbol); setDropOpen(false) }}
                    className={cn("flex items-center gap-[8px] w-full px-[12px] py-[8px] text-[13px] cursor-pointer transition-colors", c.symbol === coin ? "bg-[#e9effd] font-medium" : "hover:bg-[#f4f4f4]")}
                    style={{ animation: `hx-menu-item-in var(--duration-short-4) var(--ease-emphasized-decelerate) both`, animationDelay: `${idx * 30}ms` }}>
                    <div className="size-4 rounded-full bg-[#e1e1e1]" /><span className="font-medium">{c.symbol}</span>{c.name && <span className="text-[#a0a0a0]">{c.name}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span aria-hidden className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-[var(--duration-medium-2)] ease-[cubic-bezier(0.25,0.1,0.25,1)]" style={{ backgroundColor: focusLineColor }} />
        </div>
      </div>
      {isError && errorText && <span className="text-[12px] pt-[4px] text-[var(--danger-default)]">{errorText}</span>}
      {isWarning && warningText && <span className="text-[12px] pt-[4px] text-[#D4A017]">{warningText}</span>}
      {!isError && !isWarning && helperText && <span className="text-[12px] pt-[4px] text-[var(--color-text-tertiary)]">{helperText}</span>}
    </div>
  );
}

const coins = [{ symbol: "BTC", name: "Bitcoin" }, { symbol: "ETH", name: "Ethereum" }, { symbol: "USDT", name: "Tether" }, { symbol: "XRP", name: "Ripple" }];

export function InputDropdownPage() {
  return (
    <ComponentPage name="Input Dropdown" description="Hybrid amount input with a coin/token dropdown selector. Combines a numeric input field with a coin picker in a single control.">
      <Section title="Colors" description="Gray (default) and white background themes.">
        <ExampleGrid label="Color variants">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-80"><InputDropdown color="gray" label="Amount" placeholder="0.00" coins={coins} defaultCoin="BTC" /></div><div className="w-80"><InputDropdown color="white" label="Amount" placeholder="0.00" coins={coins} defaultCoin="ETH" /></div></div>
        </ExampleGrid>
      </Section>
      <Section title="Corners" description="Sharp (bottom-border only) and rounded (all-sides border).">
        <ExampleGrid label="Corner variants">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-80"><InputDropdown corners="sharp" label="Sharp corners" coins={coins} defaultCoin="BTC" /></div><div className="w-80"><InputDropdown corners="rounded" label="Rounded corners" coins={coins} defaultCoin="BTC" /></div></div>
        </ExampleGrid>
      </Section>
      <Section title="Sizes" description="Four sizes from xs to lg.">
        <ExampleGrid label="All sizes">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>{(["xs","sm","md","lg"] as const).map(size => <div key={size} className="w-80"><InputDropdown size={size} label={`Size ${size}`} coins={coins} defaultCoin="BTC" /></div>)}</div>
        </ExampleGrid>
      </Section>
      <Section title="Validation States" description="Error, warning, and disabled states.">
        <ExampleGrid label="States">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-80"><InputDropdown state="error" label="Error" coins={coins} defaultCoin="BTC" errorText="Insufficient balance" /></div>
            <div className="w-80"><InputDropdown state="warning" label="Warning" coins={coins} defaultCoin="BTC" warningText="Amount exceeds daily limit" /></div>
            <div className="w-80"><InputDropdown state="disabled" label="Disabled" coins={coins} defaultCoin="BTC" /></div>
          </div>
        </ExampleGrid>
      </Section>
      <Section title="With Helper Text"><ExampleGrid label="Helper"><div className="w-80"><InputDropdown label="Withdrawal Amount" coins={coins} defaultCoin="BTC" helperText="Min: 0.001 BTC · Max: 10 BTC" /></div></ExampleGrid></Section>
      <Section title="Skeleton"><ExampleGrid label="Loading"><div className="w-80"><InputDropdown skeleton label="Amount" coins={coins} defaultCoin="BTC" /></div></ExampleGrid></Section>
    </ComponentPage>
  );
}