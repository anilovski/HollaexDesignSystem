import { cn } from "./utils"
import { X } from "lucide-react"
import { type ButtonHTMLAttributes, type ReactNode } from "react"

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  color?: "white" | "gray"; variant?: "round" | "rounded"; size?: "lg" | "md" | "sm" | "xs"
  icon?: ReactNode; rightIcon?: ReactNode; counter?: number; selected?: boolean; onRemove?: () => void; skeleton?: boolean; children?: ReactNode
}

const SIZE: Record<string, { chip: string; innerGap: string; iconSize: string; closeSize: string; text: string; radius: { round: string; rounded: string }; skeletonW: string }> = {
  lg: { chip: "pl-[16px] pr-[12px] py-[12px] gap-[10px]", innerGap: "gap-[10px]", iconSize: "size-6", closeSize: "size-6", text: "text-[16px] leading-[24px] font-medium", radius: { round: "rounded-[1000px]", rounded: "rounded-[8px]" }, skeletonW: "w-32" },
  md: { chip: "pl-[12px] pr-[8px] py-[8px] gap-[8px]", innerGap: "gap-[8px]", iconSize: "size-[22px]", closeSize: "size-6", text: "text-[14px] leading-[22px] font-medium", radius: { round: "rounded-[1000px]", rounded: "rounded-[8px]" }, skeletonW: "w-28" },
  sm: { chip: "pl-[12px] pr-[8px] py-[5px] gap-[8px]", innerGap: "gap-[6px]", iconSize: "size-5", closeSize: "size-[22px]", text: "text-[14px] leading-[22px] font-medium", radius: { round: "rounded-[1000px]", rounded: "rounded-[8px]" }, skeletonW: "w-24" },
  xs: { chip: "pl-[8px] pr-[6px] py-[4px] gap-[6px]", innerGap: "gap-[4px]", iconSize: "size-4", closeSize: "size-4", text: "text-[12px] leading-[16px] font-normal", radius: { round: "rounded-[1000px]", rounded: "rounded-[4px]" }, skeletonW: "w-20" },
}

export function Chip({ color = "white", variant = "round", size = "md", icon, rightIcon, counter, selected = false, onRemove, skeleton = false, disabled = false, children, className, onClick, ...props }: ChipProps) {
  const s = SIZE[size]
  if (skeleton) return <div className={cn("inline-flex hx-shimmer", s.chip, s.radius[variant], s.skeletonW, className)} />

  const isActive = selected && !disabled
  const colorCls = color === "white"
    ? cn("bg-white border-[#e1e1e1] text-[#1a1a1a]", !isActive && !disabled && "hover:bg-[#f8f8f8] active:bg-[var(--brand-default)] active:border-[var(--brand-default)] active:text-white", disabled && "bg-white border-[#e1e1e1] text-[#c8c8c8]", isActive && "bg-[var(--brand-default)] border-[var(--brand-default)] text-white")
    : cn("bg-[#f4f4f4] border-[#e1e1e1] text-[#1a1a1a]", !isActive && !disabled && "hover:bg-[#ebebeb] active:bg-[var(--brand-default)] active:border-[var(--brand-default)] active:text-white", disabled && "bg-[#f4f4f4] border-[#e1e1e1] text-[#c8c8c8]", isActive && "bg-[var(--brand-default)] border-[var(--brand-default)] text-white")

  return (
    <button type="button" disabled={disabled} onClick={onClick}
      className={cn("inline-flex items-center select-none border transition-colors duration-100 font-sans", !onClick && !onRemove && "cursor-default", disabled && "cursor-not-allowed", s.chip, s.radius[variant], colorCls, className)} {...props}>
      <span className={cn("flex items-center", s.innerGap)}>
        <span className={cn("flex items-center", s.innerGap)}>
          {icon && <span className={cn("shrink-0 flex items-center justify-center", s.iconSize, disabled && "opacity-40")}>{icon}</span>}
          {children !== undefined && <span className={cn("whitespace-nowrap", s.text)}>{children}</span>}
          {rightIcon && <span className={cn("shrink-0 flex items-center justify-center opacity-60", s.iconSize)}>{rightIcon}</span>}
        </span>
        {counter !== undefined && <span className={cn("shrink-0 flex items-center justify-center rounded-full overflow-hidden font-medium size-6 text-[14px]", isActive ? "bg-white text-[#1a1a1a]" : "bg-[#f4f4f4] text-[#1a1a1a]")}>{counter}</span>}
      </span>
      {onRemove && <span role="button" tabIndex={disabled ? -1 : 0} aria-label="Remove" onClick={e => { e.stopPropagation(); if (!disabled) onRemove() }} className={cn("shrink-0 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition-opacity", disabled && "pointer-events-none opacity-30", s.closeSize)}><X className="size-full" /></span>}
    </button>
  )
}