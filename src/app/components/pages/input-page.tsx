import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { PropsTable, type PropDef } from "../docs/props-table";
import { useState } from "react";
import { Mail, Search, Eye, EyeOff, Minus, Plus, XCircle } from "lucide-react";
import { cn } from "../ui/utils";

/* Simplified TextInput for demo */
function TextInput({ style = "gray", corners = "sharp", size = "md", state = "default", label, placeholder = "Enter text", helperText, errorText, warningText, leftIcon, rightText, clearable = false, type = "text", defaultValue = "" }: {
  style?: "gray" | "white"; corners?: "sharp" | "rounded"; size?: "xs" | "sm" | "md" | "lg" | "xl"; state?: "default" | "error" | "warning" | "disabled" | "skeleton"
  label?: string; placeholder?: string; helperText?: string; errorText?: string; warningText?: string; leftIcon?: React.ReactNode; rightText?: string; clearable?: boolean; type?: string; defaultValue?: string
}) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = state === "disabled"; const isError = state === "error"; const isWarning = state === "warning";
  const heights: Record<string, string> = { xl: "h-[64px]", lg: "h-[48px]", md: "h-[40px]", sm: "h-[32px]", xs: "h-[24px]" };
  const textSizes: Record<string, string> = { xl: "text-[14px]", lg: "text-[14px]", md: "text-[14px]", sm: "text-[12px]", xs: "text-[11px]" };

  if (state === "skeleton") return (
    <div className="flex flex-col w-full">{label && <div className="h-[12px] w-[48px] rounded-[3px] mb-[8px] hx-shimmer" />}<div className={cn("w-full hx-shimmer", heights[size], corners === "rounded" && "rounded-[8px]")} /></div>
  );

  const bg = style === "gray" ? "bg-[#f4f4f4]" : "bg-white";
  const border = isError ? (corners === "rounded" ? "border-2 border-[var(--danger-default)]" : "border-b border-[#e1e1e1]")
    : isWarning ? (corners === "rounded" ? "border-2 border-[#D4A017]" : "border-b border-[#e1e1e1]")
    : (corners === "rounded" ? "border border-[#e1e1e1]" : "border-b border-[#e1e1e1]");

  const focusLineColor = isError ? "var(--danger-default)" : isWarning ? "#D4A017" : "var(--brand-default)";

  return (
    <div className="flex flex-col w-full">
      {label && <div className="pb-[8px]"><span className={cn("font-sans text-[12px] leading-[16px]", isDisabled ? "text-[#c8c8c8]" : "text-[var(--color-text-secondary)]")}>{label}</span></div>}
      <div data-focus-custom className={cn("relative group overflow-hidden flex items-center gap-[8px] w-full px-[16px] transition-colors outline-none focus-within:outline-none focus-visible:outline-none", heights[size], bg, border, corners === "rounded" && "rounded-[8px]", isDisabled && "opacity-50 cursor-not-allowed")}>
        {leftIcon && <span className="shrink-0 flex items-center justify-center size-[18px]" style={{ color: "var(--color-text-tertiary)" }}>{leftIcon}</span>}
        <input data-focus-custom type={type === "password" && showPassword ? "text" : type} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} disabled={isDisabled}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={cn("flex-1 min-w-0 bg-transparent outline-none focus-visible:outline-none border-none font-sans placeholder:text-[#a0a0a0]", textSizes[size], isDisabled ? "text-[#c8c8c8] cursor-not-allowed" : "text-[var(--color-text-primary)]")} />
        {clearable && value.length > 0 && !isDisabled && <button type="button" onClick={() => setValue("")} className="shrink-0 cursor-pointer text-[#a0a0a0] hover:text-[#1a1a1a]"><XCircle size={16} /></button>}
        {rightText && <span className="shrink-0 font-sans text-[14px] text-[#a0a0a0]">{rightText}</span>}
        {type === "password" && <button type="button" onClick={() => setShowPassword(v => !v)} className="shrink-0 cursor-pointer text-[#a0a0a0] hover:text-[#1a1a1a]">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
        <span aria-hidden className={cn("absolute bottom-0 left-0 right-0 h-[2px] origin-left transition-transform duration-[var(--duration-medium-2)] ease-[cubic-bezier(0.25,0.1,0.25,1)]", focused ? "scale-x-100" : "scale-x-0")} style={{ backgroundColor: focusLineColor }} />
      </div>
      {state === "error" && errorText && <span className="text-[12px] pt-[4px] text-[var(--danger-default)]">{errorText}</span>}
      {state === "warning" && warningText && <span className="text-[12px] pt-[4px] text-[#D4A017]">{warningText}</span>}
      {state === "default" && helperText && <span className="text-[12px] pt-[4px] text-[var(--color-text-tertiary)]">{helperText}</span>}
    </div>
  );
}

/* Simplified NumberInput */
function NumberInput({ style = "gray", corners = "sharp", size = "md", state = "default", label, placeholder = "0", helperText, errorText, warningText, rightText, min, max, step = 1, defaultValue = "" }: {
  style?: "gray" | "white"; corners?: "sharp" | "rounded"; size?: "xs" | "sm" | "md" | "lg" | "xl"; state?: "default" | "error" | "warning" | "disabled" | "skeleton"
  label?: string; placeholder?: string; helperText?: string; errorText?: string; warningText?: string; rightText?: string; min?: number; max?: number; step?: number; defaultValue?: string
}) {
  const [value, setValue] = useState(defaultValue);
  const isDisabled = state === "disabled";
  const heights: Record<string, string> = { xl: "h-[64px]", lg: "h-[48px]", md: "h-[40px]", sm: "h-[32px]", xs: "h-[24px]" };
  const bg = style === "gray" ? "bg-[#f4f4f4]" : "bg-white";

  if (state === "skeleton") return (
    <div className="flex flex-col w-full">{label && <div className="h-[12px] w-[48px] rounded-[3px] mb-[8px] hx-shimmer" />}<div className={cn("w-full hx-shimmer", heights[size], corners === "rounded" && "rounded-[8px]")} /></div>
  );

  const increment = () => { const num = parseFloat(value) || 0; const next = max !== undefined ? Math.min(num + step, max) : num + step; setValue(String(next)) };
  const decrement = () => { const num = parseFloat(value) || 0; const next = min !== undefined ? Math.max(num - step, min) : num - step; setValue(String(next)) };

  const focusLineColor = state === "error" ? "var(--danger-default)" : state === "warning" ? "#D4A017" : "var(--brand-default)";

  return (
    <div className="flex flex-col w-full">
      {label && <div className="pb-[8px]"><span className={cn("font-sans text-[12px] leading-[16px]", isDisabled ? "text-[#c8c8c8]" : "text-[var(--color-text-secondary)]")}>{label}</span></div>}
      <div data-focus-custom className={cn("relative group overflow-hidden flex items-center w-full transition-colors outline-none focus-within:outline-none focus-visible:outline-none", heights[size], bg, corners === "rounded" ? "border border-[#e1e1e1] rounded-[8px]" : "border-b border-[#e1e1e1]", isDisabled && "opacity-50")}>
        <div className="flex-1 flex items-center gap-[8px] px-[16px]">
          <input data-focus-custom type="text" inputMode="decimal" placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} disabled={isDisabled}
            className="flex-1 min-w-0 bg-transparent outline-none focus-visible:outline-none border-none font-sans text-[14px] placeholder:text-[#a0a0a0] text-[var(--color-text-primary)]" />
          {rightText && <span className="shrink-0 font-sans text-[14px] text-[#a0a0a0]">{rightText}</span>}
        </div>
        <div className="w-px self-stretch bg-[#e1e1e1]" />
        <button type="button" onClick={decrement} disabled={isDisabled} className="flex items-center justify-center self-stretch px-[12px] cursor-pointer text-[#a0a0a0] hover:text-[#1a1a1a]"><Minus size={16} /></button>
        <div className="w-px self-stretch bg-[#e1e1e1]" />
        <button type="button" onClick={increment} disabled={isDisabled} className="flex items-center justify-center self-stretch px-[12px] cursor-pointer text-[#a0a0a0] hover:text-[#1a1a1a]"><Plus size={16} /></button>
        <span aria-hidden className={cn("absolute bottom-0 left-0 right-0 h-[2px] origin-left transition-transform duration-[var(--duration-medium-2)] ease-[cubic-bezier(0.25,0.1,0.25,1)] scale-x-0 group-focus-within:scale-x-100")} style={{ backgroundColor: focusLineColor }} />
      </div>
      {state === "error" && errorText && <span className="text-[12px] pt-[4px] text-[var(--danger-default)]">{errorText}</span>}
      {state === "warning" && warningText && <span className="text-[12px] pt-[4px] text-[#D4A017]">{warningText}</span>}
      {state === "default" && helperText && <span className="text-[12px] pt-[4px] text-[var(--color-text-tertiary)]">{helperText}</span>}
    </div>
  );
}

const INPUT_PROPS: PropDef[] = [
  { name: "style", type: '"gray" | "white"', default: '"gray"', description: "Background style variant" },
  { name: "corners", type: '"rounded" | "sharp"', default: '"rounded"', description: "Border radius style" },
  { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Input height preset" },
  { name: "label", type: "string", description: "Label text above the input" },
  { name: "helperText", type: "string", description: "Helper or error text below the input" },
  { name: "leftIcon", type: "ReactNode", description: "Icon inside the input on the left" },
  { name: "rightText", type: "string", description: "Static text on the right side (e.g. currency)" },
  { name: "clearable", type: "boolean", default: "false", description: "Shows a clear (x) button when input has value" },
  { name: "error", type: "boolean", default: "false", description: "Error validation state" },
  { name: "skeleton", type: "boolean", default: "false", description: "Renders a loading skeleton" },
];

export function InputPage() {
  return (
    <ComponentPage name="Input" description="Text, number, and phone-number input fields. All three types share a common size/style/state system with labels, helper text, and validation." hideFab>
      <Section title="TextInput" description="Standard single-line text input with optional icons, clear button, and password toggle.">
        <ExampleGrid label="Styles: gray & white">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-80"><TextInput style="gray" label="Gray style" placeholder="Enter text" /></div><div className="w-80"><TextInput style="white" label="White style" placeholder="Enter text" /></div></div>
        </ExampleGrid>
        <ExampleGrid label="Corners: sharp & rounded">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-80"><TextInput corners="sharp" label="Sharp corners" placeholder="Enter text" /></div><div className="w-80"><TextInput corners="rounded" label="Rounded corners" placeholder="Enter text" /></div></div>
        </ExampleGrid>
        <ExampleGrid label="All sizes">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            {(["xs", "sm", "md", "lg", "xl"] as const).map(sz => <div key={sz} className="w-80"><TextInput size={sz} label={`Size ${sz}`} placeholder="Enter text" /></div>)}
          </div>
        </ExampleGrid>
        <ExampleGrid label="With left icon">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-80"><TextInput label="Email" placeholder="you@example.com" leftIcon={<Mail className="size-full" strokeWidth={1.5} />} /></div><div className="w-80"><TextInput label="Search" placeholder="Search..." leftIcon={<Search className="size-full" strokeWidth={1.5} />} clearable /></div></div>
        </ExampleGrid>
        <ExampleGrid label="Password type"><div className="w-80"><TextInput label="Password" placeholder="Enter password" type="password" /></div></ExampleGrid>
        <ExampleGrid label="With right text"><div className="w-80"><TextInput label="Amount" placeholder="0.00" rightText="USD" /></div></ExampleGrid>
        <ExampleGrid label="Clearable"><div className="w-80"><TextInput label="Clearable input" placeholder="Type something..." clearable defaultValue="Some text" /></div></ExampleGrid>
        <ExampleGrid label="Validation states">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-80"><TextInput state="error" label="Error" placeholder="Enter text" errorText="This field is required" /></div>
            <div className="w-80"><TextInput state="warning" label="Warning" placeholder="Enter text" warningText="This value looks unusual" /></div>
            <div className="w-80"><TextInput state="disabled" label="Disabled" placeholder="Enter text" /></div>
          </div>
        </ExampleGrid>
        <ExampleGrid label="Skeleton"><div className="w-80"><TextInput state="skeleton" label="Loading" placeholder="..." /></div></ExampleGrid>
      </Section>
      <Section title="NumberInput" description="Numeric input with increment/decrement controls. Supports min, max, and step.">
        <ExampleGrid label="Styles: gray & white">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-80"><NumberInput style="gray" label="Gray style" placeholder="0" /></div><div className="w-80"><NumberInput style="white" label="White style" placeholder="0" /></div></div>
        </ExampleGrid>
        <ExampleGrid label="With min / max / step"><div className="w-80"><NumberInput label="Quantity" placeholder="0" min={0} max={100} step={5} defaultValue="10" helperText="Min 0, Max 100, Step 5" /></div></ExampleGrid>
        <ExampleGrid label="With right text"><div className="w-80"><NumberInput label="Price" placeholder="0.00" rightText="USD" /></div></ExampleGrid>
        <ExampleGrid label="Validation states">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-80"><NumberInput state="error" label="Error" placeholder="0" errorText="Value out of range" /></div>
            <div className="w-80"><NumberInput state="warning" label="Warning" placeholder="0" warningText="Unusually high value" /></div>
            <div className="w-80"><NumberInput state="disabled" label="Disabled" placeholder="0" /></div>
          </div>
        </ExampleGrid>
        <ExampleGrid label="Skeleton"><div className="w-80"><NumberInput state="skeleton" label="Loading" placeholder="0" /></div></ExampleGrid>
      </Section>

      <Section title="API Reference"><PropsTable props={INPUT_PROPS} componentName="TextInput" /></Section>
    </ComponentPage>
  );
}