import { cn } from "./utils"
import { createContext, useContext, type ReactNode, type ButtonHTMLAttributes } from "react"

type BGSize = "xs" | "sm" | "md" | "lg" | "xl"
const ButtonGroupContext = createContext<{ size: BGSize }>({ size: "md" })

const sizeConfig: Record<BGSize, { item: string; icon: string }> = {
  xs: { item: "h-6 px-2 text-[10px] leading-[13px]", icon: "size-3" },
  sm: { item: "h-8 px-3 text-[12px] leading-[16px]", icon: "size-[14px]" },
  md: { item: "h-10 px-4 text-[14px] leading-[22px]", icon: "size-4" },
  lg: { item: "h-12 px-4 text-[14px] leading-[22px]", icon: "size-4" },
  xl: { item: "h-16 px-4 text-[14px] leading-[22px]", icon: "size-5" },
}

export interface ButtonGroupProps { size?: BGSize; children: ReactNode; className?: string }
export function ButtonGroup({ size = "md", children, className }: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={{ size }}>
      <div role="group" className={cn("inline-flex items-stretch overflow-hidden rounded-[8px] border border-[var(--btn-group-border,#e1e1e1)]", className)}>{children}</div>
    </ButtonGroupContext.Provider>
  )
}

export interface ButtonGroupItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  active?: boolean; icon?: ReactNode; children?: ReactNode; skeleton?: boolean
}
export function ButtonGroupItem({ active = false, disabled = false, icon, children, skeleton = false, className, ...props }: ButtonGroupItemProps) {
  const { size } = useContext(ButtonGroupContext)
  const { item: itemCls, icon: iconCls } = sizeConfig[size]
  if (skeleton) return <div aria-hidden className={cn("relative flex items-center justify-center bg-[var(--btn-group-layer-zero,#fff)]", itemCls)}><span className="h-3 w-10 rounded-[2px] hx-shimmer block" /></div>
  return (
    <button type="button" disabled={disabled}
      className={cn("group relative flex items-center justify-center font-medium font-sans select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--focus-ring)]", itemCls,
        active && "bg-[var(--btn-group-layer-default,#f4f4f4)] text-[var(--btn-group-text-active,#1a1a1a)]",
        !active && ["bg-[var(--btn-group-layer-zero,#fff)] text-[var(--btn-group-text-enabled,#525252)]", !disabled && ["hover:bg-[var(--btn-group-layer-subtle,#f8f8f8)]", "hover:text-[var(--btn-group-text-hover,#1a1a1a)]"]],
        disabled && "opacity-50 pointer-events-none", className)} {...props}>
      <span aria-hidden className={cn("absolute left-0 top-1/4 bottom-1/4 w-px", active ? "bg-transparent" : "bg-[var(--btn-group-border,#e1e1e1)]")} />
      {icon && <span className={cn("flex items-center justify-center shrink-0", iconCls)}>{icon}</span>}
      {children && <span className="px-[4px] whitespace-nowrap">{children}</span>}
    </button>
  )
}