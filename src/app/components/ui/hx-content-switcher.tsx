import * as React from "react"
import { cn } from "./utils"

export interface ContentSwitcherItem { value: string; label?: string; icon?: React.ReactNode }

export interface ContentSwitcherProps {
  items: ContentSwitcherItem[]; value?: string; defaultValue?: string; onChange?: (value: string) => void
  color?: "white" | "gray"; type?: "text" | "icon"; size?: "lg" | "md" | "sm" | "xs"; disabled?: boolean; className?: string
}

const CFG = {
  lg: { h: "h-[48px]", textPad: "px-[8px]", iconPad: "p-[14px]", innerPx: "px-[8px]", gap: "gap-[4px]", leftIcon: "size-4", iconOnly: "size-5", text: "text-[14px] leading-[22px]", r: "8px" },
  md: { h: "h-[40px]", textPad: "px-[8px]", iconPad: "p-[10px]", innerPx: "px-[8px]", gap: "gap-[4px]", leftIcon: "size-4", iconOnly: "size-5", text: "text-[14px] leading-[22px]", r: "8px" },
  sm: { h: "h-[32px]", textPad: "px-[8px]", iconPad: "p-[6px]", innerPx: "px-[8px]", gap: "gap-[4px]", leftIcon: "size-4", iconOnly: "size-5", text: "text-[14px] leading-[22px]", r: "8px" },
  xs: { h: "h-[24px]", textPad: "px-[6px] py-[4px]", iconPad: "px-[8px] py-[4px]", innerPx: "px-[4px]", gap: "gap-[4px]", leftIcon: "size-3", iconOnly: "size-3", text: "text-[12px] leading-[16px]", r: "4px" },
} as const

export function ContentSwitcher({ items, value: controlledValue, defaultValue, onChange, color = "white", type = "text", size = "md", disabled = false, className }: ContentSwitcherProps) {
  const isControlled = controlledValue !== undefined
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value ?? "")
  const active = isControlled ? controlledValue : internal
  const c = CFG[size]
  const handleClick = (val: string) => { if (disabled) return; if (!isControlled) setInternal(val); onChange?.(val) }

  return (
    <div role="tablist" aria-disabled={disabled} className={cn("inline-flex items-stretch", className)}>
      {items.map((item, i) => {
        const isFirst = i === 0; const isLast = i === items.length - 1; const isActive = item.value === active
        const textColor = isActive ? (disabled ? "text-[#c8c8c8]" : "text-white") : (disabled ? "text-[#c8c8c8]" : "text-[var(--color-text-primary)]")
        return (
          <button key={item.value} role="tab" type="button" aria-selected={isActive} disabled={disabled} onClick={() => handleClick(item.value)}
            style={{ borderTopLeftRadius: isFirst ? c.r : undefined, borderBottomLeftRadius: isFirst ? c.r : undefined, borderTopRightRadius: isLast ? c.r : undefined, borderBottomRightRadius: isLast ? c.r : undefined }}
            className={cn("relative flex items-center justify-center shrink-0 select-none outline-none transition-all focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)] active:scale-[0.97]", c.h, type === "text" ? c.textPad : c.iconPad,
              isActive ? (disabled ? "bg-[#c8c8c8] cursor-not-allowed" : "bg-[var(--secondary-default)] cursor-pointer") : cn("border-t border-b", isLast && "border-r", disabled ? "bg-[#f4f4f4] border-[#e1e1e1] cursor-not-allowed" : color === "gray" ? "bg-[#f4f4f4] border-[#e1e1e1] hover:bg-[#ebebeb] cursor-pointer" : "bg-white border-[#e1e1e1] hover:bg-[#f8f8f8] cursor-pointer"))}>
            {type === "icon" ? <span className={cn("flex items-center justify-center", c.iconOnly, textColor)}>{item.icon}</span> :
              <span className={cn("flex items-center", c.gap, c.innerPx)}>
                {item.icon && <span className={cn("flex items-center justify-center shrink-0", c.leftIcon, textColor)}>{item.icon}</span>}
                <span className={cn("font-sans whitespace-nowrap", c.text, textColor)}>{item.label ?? item.value}</span>
              </span>}
            {!isLast && !isActive && <span className={cn("absolute right-0 w-px h-4 top-1/2 -translate-y-1/2", disabled ? "bg-[#e1e1e1]" : "bg-[#e1e1e1]")} />}
          </button>
        )
      })}
    </div>
  )
}