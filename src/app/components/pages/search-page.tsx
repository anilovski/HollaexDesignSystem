import { useState } from "react";
import { ComponentPage, Section, ExampleRow, ExampleGrid } from "../docs/component-page";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { cn } from "../ui/utils";

function SearchInput({ variant = "white", size = "huge", placeholder = "Search...", shortcut, rightIcon, helperText, clearable = true, disabled = false, value: controlledValue, defaultValue = "", onChange, onClear }: {
  variant?: "white" | "gray"; size?: "sm" | "md" | "lg" | "huge"; placeholder?: string; shortcut?: string; rightIcon?: React.ReactNode; helperText?: string; clearable?: boolean; disabled?: boolean; value?: string; defaultValue?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; onClear?: () => void
}) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const val = isControlled ? controlledValue : internal;
  const hasValue = val.length > 0;
  const iconSizes: Record<string, number> = { sm: 16, md: 18, lg: 20, huge: 24 };
  const paddings: Record<string, string> = { sm: "py-2 text-[14px]", md: "py-3 text-[14px]", lg: "py-4 text-[16px]", huge: "py-[22px] text-[18px]" };
  const radii: Record<string, string> = { sm: "rounded-lg", md: "rounded-lg", lg: "rounded-[10px]", huge: "rounded-xl" };

  return (
    <div className="flex flex-col gap-1 font-sans">
      <div className={cn("flex flex-col overflow-hidden", radii[size], disabled && "opacity-60 pointer-events-none")}>
        <div className={cn("group relative flex items-center gap-2 pl-3 pr-4 border-b transition-colors", paddings[size],
          variant === "white" ? "bg-white border-[#e1e1e1] hover:bg-[#f8f8f8]" : "bg-[#f4f4f4] border-[#f4f4f4] hover:bg-[#ebebeb]",
          disabled && "bg-[#f4f4f4] border-[#e1e1e1]")}>
          <SearchIcon size={iconSizes[size]} className="shrink-0 text-[#a0a0a0]" />
          <input type="text" disabled={disabled} value={val} onChange={e => { if (!isControlled) setInternal(e.target.value); onChange?.(e) }} placeholder={placeholder}
            className="flex-1 min-w-0 bg-transparent outline-none font-sans font-normal text-[var(--color-text-primary)] placeholder:text-[#a0a0a0]" />
          <div className="flex items-center gap-2 shrink-0">
            {clearable && !disabled && <button type="button" onClick={() => { if (!isControlled) setInternal(""); onClear?.() }} className={cn("flex items-center justify-center rounded-full hover:bg-black/5 p-0.5 transition-all cursor-pointer", hasValue ? "opacity-100" : "opacity-0 pointer-events-none")} aria-label="Clear"><X size={iconSizes[size] - 4} className="text-[#a0a0a0]" /></button>}
            {shortcut && !hasValue && <span className="bg-[#f4f4f4] border border-[#e1e1e1] text-[#a0a0a0] font-medium rounded text-[10px] px-1 py-0.5 whitespace-nowrap">{shortcut}</span>}
            {rightIcon && <span className="flex items-center justify-center shrink-0">{rightIcon}</span>}
          </div>
          <span aria-hidden className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand-default)] origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-focus-within:scale-x-100" />
        </div>
      </div>
      {helperText && <p className="text-[12px] leading-[16px] text-[#a0a0a0]">{helperText}</p>}
    </div>
  );
}

export function SearchPage() {
  const [basic, setBasic] = useState(""); const [gray, setGray] = useState("");
  return (
    <ComponentPage name="Search" description="Search inputs help users quickly find content by typing keywords. Two variants exist: a general-purpose SearchInput and a ProTradeSearch for trading pair lookups.">
      <Section title="Variants" description="White (default) and gray visual styles.">
        <ExampleRow label="White (default)"><SearchInput variant="white" placeholder="Search..." value={basic} onChange={e => setBasic(e.target.value)} onClear={() => setBasic("")} /></ExampleRow>
        <ExampleRow label="Gray"><SearchInput variant="gray" placeholder="Search..." value={gray} onChange={e => setGray(e.target.value)} onClear={() => setGray("")} /></ExampleRow>
      </Section>
      <Section title="Sizes" description="Four size options.">
        <ExampleGrid label="All sizes">
          <div className="flex flex-col w-full max-w-[480px]" style={{ gap: "var(--space-5)" }}>
            <SearchInput size="sm" placeholder="Small" /><SearchInput size="md" placeholder="Medium" /><SearchInput size="lg" placeholder="Large" /><SearchInput size="huge" placeholder="Huge (default)" />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Keyboard Shortcut" description="A shortcut badge displayed when the input is empty.">
        <ExampleRow label="With shortcut badge"><SearchInput placeholder="Search..." shortcut="⌘ + K" /></ExampleRow>
      </Section>
      <Section title="Right Icon" description="An optional icon on the right side.">
        <ExampleRow label="With right icon"><SearchInput placeholder="Search with filter..." rightIcon={<SlidersHorizontal size={20} className="text-[#a0a0a0]" />} /></ExampleRow>
      </Section>
      <Section title="Helper Text" description="Helper text below the search input.">
        <ExampleRow label="With helper text"><SearchInput placeholder="Search assets..." helperText="Search by name, ticker, or contract address" /></ExampleRow>
      </Section>
      <Section title="Disabled" description="A disabled search input prevents user interaction.">
        <ExampleRow label="Disabled (empty)"><SearchInput placeholder="Search..." disabled /></ExampleRow>
        <ExampleRow label="Disabled (with value)"><SearchInput placeholder="Search..." value="Bitcoin" disabled /></ExampleRow>
      </Section>
    </ComponentPage>
  );
}