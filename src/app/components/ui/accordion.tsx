import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "./utils"

type AccordionSize = "xs" | "sm" | "md" | "lg" | "xl"
type AccordionStyle = "white" | "gray"

const SIZE_CONFIG: Record<AccordionSize, { py: string; text: string; lh: string; iconSlot: number }> = {
  xs: { py: "py-[4px]", text: "text-[12px]", lh: "leading-[16px]", iconSlot: 16 },
  sm: { py: "py-[8px]", text: "text-[12px]", lh: "leading-[16px]", iconSlot: 16 },
  md: { py: "py-[9px]", text: "text-[14px]", lh: "leading-[22px]", iconSlot: 20 },
  lg: { py: "py-[13px]", text: "text-[14px]", lh: "leading-[22px]", iconSlot: 20 },
  xl: { py: "py-[21px]", text: "text-[14px]", lh: "leading-[22px]", iconSlot: 20 },
}

const STYLE_CONFIG: Record<AccordionStyle, { bg: string; hoverBg: string; border: string }> = {
  white: { bg: "bg-[var(--accordion-white-bg)]", hoverBg: "hover:bg-[var(--accordion-white-hover-bg)]", border: "border-t border-[var(--accordion-white-border)]" },
  gray: { bg: "bg-[var(--accordion-gray-bg)]", hoverBg: "hover:bg-[var(--accordion-gray-hover-bg)]", border: "border-t border-[var(--accordion-gray-border)]" },
}

const AccordionContext = React.createContext<{ style: AccordionStyle; size: AccordionSize; flush: boolean }>({ style: "white", size: "md", flush: false })

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: AccordionStyle; size?: AccordionSize; flush?: boolean
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, style = "white", size = "md", flush = false, children, ...props }, ref) => (
    <AccordionContext.Provider value={{ style, size, flush }}>
      <div ref={ref} className={cn("w-full", className)} {...props}>{children}</div>
    </AccordionContext.Provider>
  )
)
Accordion.displayName = "Accordion"

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void
  alignment?: "right" | "left"; disabled?: boolean; leftSlot?: React.ReactNode
  style?: AccordionStyle; size?: AccordionSize; flush?: boolean
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, title, open: openProp, defaultOpen = false, onOpenChange, alignment = "right", disabled = false, leftSlot, children, style: styleProp, size: sizeProp, flush: flushProp, ...props }, ref) => {
    const ctx = React.useContext(AccordionContext)
    const style = styleProp ?? ctx.style
    const size = sizeProp ?? ctx.size
    const flush = flushProp ?? ctx.flush
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const isControlled = openProp !== undefined
    const isOpen = isControlled ? openProp! : internalOpen
    const toggle = () => { if (disabled) return; const next = !isOpen; if (!isControlled) setInternalOpen(next); onOpenChange?.(next) }
    const sc = SIZE_CONFIG[size]; const stc = STYLE_CONFIG[style]

    return (
      <div ref={ref} className={cn("w-full flex flex-col", stc.bg, !flush && stc.border, disabled && "opacity-50", className)} {...props}>
        <button type="button" onClick={toggle} disabled={disabled} aria-expanded={isOpen}
          className={cn("w-full flex items-center gap-[8px] px-[16px] text-left", sc.py, "cursor-pointer transition-colors duration-150", !disabled && stc.hoverBg, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-inset", "disabled:cursor-not-allowed disabled:pointer-events-none")}>
          {leftSlot && <span className="shrink-0 flex items-center justify-center" style={{ width: sc.iconSlot, height: sc.iconSlot }}>{leftSlot}</span>}
          {alignment === "left" && <span className="shrink-0 flex items-center justify-center size-[16px]"><Plus size={12} className="text-[var(--color-text-primary)] transition-transform duration-200 ease-in-out" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }} /></span>}
          <span className={cn("flex-1 font-bold font-sans text-[var(--color-text-primary)]", sc.text, sc.lh)}>{title}</span>
          {alignment === "right" && <span className="shrink-0 flex items-center justify-center size-[16px]"><Plus size={12} className="text-[var(--color-text-primary)] transition-transform duration-200 ease-in-out" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }} /></span>}
        </button>
        {isOpen && <div className="px-[16px] pb-[24px] pt-[8px] flex flex-col gap-[16px] items-start">{children}</div>}
      </div>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

export { Accordion, AccordionItem }