import * as React from "react"
import { Info, TriangleAlert, CircleCheck, CircleX, X } from "lucide-react"
import { cn } from "./utils"
import { Button } from "./hollaex-button"

const STATUS_CONFIG = {
  info: { Icon: Info, bgVar: "var(--alert-info-bg)", borderVar: "var(--alert-info-border)", titleVar: "var(--alert-info-title)", descVar: "var(--alert-info-desc)", iconVar: "var(--alert-info-icon)" },
  warning: { Icon: TriangleAlert, bgVar: "var(--alert-warning-bg)", borderVar: "var(--alert-warning-border)", titleVar: "var(--alert-warning-title)", descVar: "var(--alert-warning-desc)", iconVar: "var(--alert-warning-icon)" },
  success: { Icon: CircleCheck, bgVar: "var(--alert-success-bg)", borderVar: "var(--alert-success-border)", titleVar: "var(--alert-success-title)", descVar: "var(--alert-success-desc)", iconVar: "var(--alert-success-icon)" },
  error: { Icon: CircleX, bgVar: "var(--alert-error-bg)", borderVar: "var(--alert-error-border)", titleVar: "var(--alert-error-title)", descVar: "var(--alert-error-desc)", iconVar: "var(--alert-error-icon)" },
} as const

export type AlertStatus = keyof typeof STATUS_CONFIG

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus; title: string; description?: string; highContrast?: boolean
  showIcon?: boolean; actionLabel?: string; onAction?: () => void; onClose?: () => void; skeleton?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, status = "info", title, description, highContrast = false, showIcon = true, actionLabel, onAction, onClose, skeleton, ...props }, ref) => {
    const expanded = Boolean(description)
    const cfg = STATUS_CONFIG[status]
    const { Icon } = cfg

    if (skeleton) {
      return <div ref={ref} className={cn("relative rounded-[8px] overflow-hidden hx-shimmer h-[50px] w-full", className)} aria-hidden="true" {...props} />
    }

    const bg = highContrast ? "var(--alert-hc-bg)" : cfg.bgVar
    const titleColor = highContrast ? "var(--alert-hc-title)" : cfg.titleVar
    const descColor = highContrast ? "var(--alert-hc-desc)" : cfg.descVar

    const CloseBtn = onClose ? (
      <button type="button" onClick={onClose} className="shrink-0 size-[20px] flex items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--secondary-subtle-hover)] transition-all cursor-pointer" aria-label="Close"><X size={14} /></button>
    ) : null

    return (
      <div ref={ref} className={cn("relative rounded-[8px] overflow-hidden w-full", className)} style={{ backgroundColor: bg }} role="alert" {...props}>
        <div className="absolute h-[4px] left-0 right-0 top-0 pointer-events-none" style={{ backgroundColor: cfg.borderVar }} />
        <div className={cn("flex gap-[8px] pb-[11px] pt-[13px] px-[8px]", expanded ? "items-start" : "items-center")}>
          {showIcon && <div className="shrink-0 flex items-center justify-center size-[32px]"><Icon size={24} style={{ color: cfg.iconVar }} aria-hidden="true" /></div>}
          {!expanded && (
            <div className="flex flex-1 items-center justify-between min-w-0">
              <p className="flex-1 text-[14px] font-medium font-sans leading-[22px] pr-[12px] min-w-0" style={{ color: titleColor }}>{title}</p>
              {(actionLabel || onClose) && (
                <div className="flex items-center gap-[12px] shrink-0">
                  {actionLabel && <Button variant="secondary" size="sm" corners="sharp" onClick={onAction}>{actionLabel}</Button>}
                  {CloseBtn}
                </div>
              )}
            </div>
          )}
          {expanded && (
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-[12px]">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium font-sans leading-[22px]" style={{ color: titleColor }}>{title}</p>
                  {description && <p className="text-[14px] font-normal font-sans leading-[22px] mt-[4px]" style={{ color: descColor }}>{description}</p>}
                </div>
                {CloseBtn}
              </div>
              {actionLabel && <div className="mt-[10px]"><Button variant="secondary" size="sm" corners="sharp" onClick={onAction}>{actionLabel}</Button></div>}
            </div>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }