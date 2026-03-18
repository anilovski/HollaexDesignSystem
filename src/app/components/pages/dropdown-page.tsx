import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "../ui/utils";

interface DropdownOption { value: string; label: string }

function Dropdown({ style = "gray", size = "lg", state = "default", label = "Label", placeholder = "Choose an option", options = [], helperText, errorText, warningText, searchable = false }: {
  style?: "gray" | "white" | "midTone"; size?: "xs" | "sm" | "md" | "lg" | "xl"; state?: "default" | "error" | "warning" | "disabled"
  label?: string; placeholder?: string; options?: DropdownOption[]; helperText?: string; errorText?: string; warningText?: string; searchable?: boolean
}) {
  const [open, setOpen] = useState(false); const [selected, setSelected] = useState<string | null>(null); const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setSearch("") } }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h) }, [open]);
  const isDisabled = state === "disabled"; const isError = state === "error";
  const heights: Record<string, string> = { xl: "h-[64px]", lg: "h-[48px]", md: "h-[40px]", sm: "h-[32px]", xs: "h-[24px]" };
  const bg = style === "gray" ? "bg-[#f4f4f4]" : style === "white" ? "bg-white" : "bg-[#ebebeb]";
  const selectedOpt = options.find(o => o.value === selected);
  const filtered = searchable && search ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())) : options;
  return (
    <div ref={ref} className="relative flex flex-col items-start w-[280px]" style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="pb-[8px]"><span className={cn("text-[12px] leading-[16px]", isDisabled ? "text-[#c8c8c8]" : "text-[var(--color-text-secondary)]")}>{label}</span></div>
      <div className="relative w-full rounded-[8px]">
        <button type="button" disabled={isDisabled} onClick={() => !isDisabled && setOpen(v => !v)}
          className={cn("flex items-center gap-[8px] w-full px-[16px] cursor-pointer transition-colors rounded-[8px]", heights[size], bg, isError ? "border-2 border-[var(--danger-default)]" : "border-b border-[#e1e1e1]", isDisabled && "cursor-not-allowed opacity-50")}>
          {open && searchable ? (
            <><Search size={16} className="shrink-0 text-[#a0a0a0]" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent outline-none text-[14px]" style={{ fontFamily: "var(--font-family-supreme)" }} onClick={e => e.stopPropagation()} autoFocus /></>
          ) : (
            <span className={cn("flex-1 truncate text-left text-[14px]", selected ? "text-[var(--color-text-primary)]" : "text-[#a0a0a0]")}>{selectedOpt?.label ?? placeholder}</span>
          )}
          {open ? <ChevronUp size={16} className="text-[#a0a0a0]" /> : <ChevronDown size={16} className="text-[#a0a0a0]" />}
        </button>
        <span aria-hidden className={cn("absolute bottom-0 left-0 right-0 h-[2px] origin-left transition-transform duration-[var(--duration-medium-2)] ease-[cubic-bezier(0.25,0.1,0.25,1)]", open ? "scale-x-100" : "scale-x-0")} style={{ backgroundColor: isError ? "var(--danger-default)" : "var(--brand-default)" }} />
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-0">
          <div className={cn("w-full flex flex-col rounded-b-[8px] shadow-lg", bg)}>
            {filtered.length === 0 ? <div className="px-[16px] py-[13px] text-[14px] text-[#a0a0a0]">No options found</div> :
              filtered.map(opt => (
                <button key={opt.value} type="button" onClick={() => { setSelected(opt.value); setOpen(false); setSearch("") }}
                  className={cn("flex items-center w-full px-[16px] py-[13px] text-left cursor-pointer hover:bg-[rgba(0,0,0,0.04)] text-[14px] transition-colors", opt.value === selected ? "font-medium text-[var(--color-text-primary)]" : "text-[var(--color-text-primary)]")}
                  style={{ animation: `hx-menu-item-in var(--duration-short-4) var(--ease-emphasized-decelerate) both`, animationDelay: `${filtered.indexOf(opt) * 30}ms` }}>
                  {opt.label}{opt.value === selected && <span className="ml-auto text-[12px]">✓</span>}
                </button>
              ))}
          </div>
        </div>
      )}
      {isError && errorText && <span className="text-[12px] pt-[4px] text-[var(--danger-default)]">{errorText}</span>}
      {state === "warning" && warningText && <span className="text-[12px] pt-[4px] text-[#D4A017]">{warningText}</span>}
      {state === "default" && helperText && <span className="text-[12px] pt-[4px] text-[var(--color-text-tertiary)]">{helperText}</span>}
    </div>
  );
}

const options = [{ value: "btc", label: "Bitcoin" }, { value: "eth", label: "Ethereum" }, { value: "xrp", label: "Ripple" }, { value: "sol", label: "Solana" }, { value: "ada", label: "Cardano" }];

export function DropdownPage() {
  return (
    <ComponentPage name="Dropdown" description="Searchable select menu with gray, white, and midTone styling variants. Supports validation states, coin icons, and helper text.">
      <Section title="Styles" description="Three visual styles for different surface backgrounds.">
        <ExampleGrid label="Style variants">
          <div className="flex" style={{ gap: "var(--space-7)" }}>
            <div className="w-64"><Dropdown style="gray" label="Gray" options={options} placeholder="Select coin" /></div>
            <div className="w-64"><Dropdown style="white" label="White" options={options} placeholder="Select coin" /></div>
            <div className="w-64"><Dropdown style="midTone" label="MidTone" options={options} placeholder="Select coin" /></div>
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Searchable" description="Type to filter options.">
        <ExampleGrid label="Search enabled"><div className="w-64"><Dropdown label="Search for a coin" options={options} placeholder="Type to search..." searchable /></div></ExampleGrid>
      </Section>
      <Section title="Validation States" description="Error, warning, and disabled states.">
        <ExampleGrid label="States">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-64"><Dropdown state="error" label="Error" options={options} placeholder="Select" errorText="Selection is required" /></div>
            <div className="w-64"><Dropdown state="warning" label="Warning" options={options} placeholder="Select" warningText="This coin has low liquidity" /></div>
            <div className="w-64"><Dropdown state="disabled" label="Disabled" options={options} placeholder="Select" /></div>
          </div>
        </ExampleGrid>
      </Section>
      <Section title="With Helper Text">
        <ExampleGrid label="Helper"><div className="w-64"><Dropdown label="Trading Pair" options={options} placeholder="Select base coin" helperText="Choose the coin you want to trade" /></div></ExampleGrid>
      </Section>
    </ComponentPage>
  );
}