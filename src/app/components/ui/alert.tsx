import * as React from "react"
import { Info, TriangleAlert, CircleCheck, CircleX, X } from "lucide-react"
import { cn } from "./utils"
import { Button } from "./hollaex-button"

const STATUS_CONFIG = {
  info: {
    Icon: Info,
    bgVar: "var(--alert-info-bg)", borderVar: "var(--alert-info-border)", titleVar: "var(--alert-info-title)", descVar: "var(--alert-info-desc)", iconVar: "var(--alert-info-icon)",
    hcBgVar: "var(--alert-hc-info-bg)", hcBorderVar: "var(--alert-hc-info-border)", hcTitleVar: "var(--alert-hc-info-title)", hcDescVar: "var(--alert-hc-info-desc)", hcIconVar: "var(--alert-hc-info-icon)",
  },
  warning: {
    Icon: TriangleAlert,
    bgVar: "var(--alert-warning-bg)", borderVar: "var(--alert-warning-border)", titleVar: "var(--alert-warning-title)", descVar: "var(--alert-warning-desc)", iconVar: "var(--alert-warning-icon)",
    hcBgVar: "var(--alert-hc-warning-bg)", hcBorderVar: "var(--alert-hc-warning-border)", hcTitleVar: "var(--alert-hc-warning-title)", hcDescVar: "var(--alert-hc-warning-desc)", hcIconVar: "var(--alert-hc-warning-icon)",
  },
  success: {
    Icon: CircleCheck,
    bgVar: "var(--alert-success-bg)", borderVar: "var(--alert-success-border)", titleVar: "var(--alert-success-title)", descVar: "var(--alert-success-desc)", iconVar: "var(--alert-success-icon)",
    hcBgVar: "var(--alert-hc-success-bg)", hcBorderVar: "var(--alert-hc-success-border)", hcTitleVar: "var(--alert-hc-success-title)", hcDescVar: "var(--alert-hc-success-desc)", hcIconVar: "var(--alert-hc-success-icon)",
  },
  error: {
    Icon: CircleX,
    bgVar: "var(--alert-error-bg)", borderVar: "var(--alert-error-border)", titleVar: "var(--alert-error-title)", descVar: "var(--alert-error-desc)", iconVar: "var(--alert-error-icon)",
    hcBgVar: "var(--alert-hc-error-bg)", hcBorderVar: "var(--alert-hc-error-border)", hcTitleVar: "var(--alert-hc-error-title)", hcDescVar: "var(--alert-hc-error-desc)", hcIconVar: "var(--alert-hc-error-icon)",
  },
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

    const bg = highContrast ? cfg.hcBgVar : cfg.bgVar
    const borderColor = highContrast ? cfg.hcBorderVar : cfg.borderVar
    const titleColor = highContrast ? cfg.hcTitleVar : cfg.titleVar
    const descColor = highContrast ? cfg.hcDescVar : cfg.descVar
    const iconColor = highContrast ? cfg.hcIconVar : cfg.iconVar
    const iconFill = highContrast ? iconColor : "none"

    const closeBtnColor = highContrast ? cfg.hcTitleVar : "var(--color-text-secondary)"
    const closeBtnHoverColor = highContrast ? cfg.hcTitleVar : "var(--color-text-primary)"
    const closeBtnHoverBg = highContrast ? "rgba(255,255,255,0.12)" : "var(--secondary-subtle-hover)"

    const CloseBtn = onClose ? (
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 size-[20px] flex items-center justify-center rounded-full transition-all cursor-pointer"
        style={{ color: closeBtnColor }}
        onMouseEnter={(e) => { e.currentTarget.style.color = closeBtnHoverColor; e.currentTarget.style.backgroundColor = closeBtnHoverBg; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = closeBtnColor; e.currentTarget.style.backgroundColor = "transparent"; }}
        aria-label="Close"
      >
        <X size={14} />
      </button>
    ) : null

    return (
      <div ref={ref} className={cn("relative rounded-[8px] overflow-hidden w-full", className)} style={{ backgroundColor: bg }} role="alert" {...props}>
        <div className={cn("flex gap-[8px] pb-[11px] pt-[13px] px-[8px]", expanded ? "items-start" : "items-center")}>
          {showIcon && (
            <div className="shrink-0 flex items-center justify-center size-[32px]">
              <Icon
                size={24}
                fill={iconFill}
                style={{ color: iconColor }}
                strokeWidth={highContrast ? 2 : 2}
                aria-hidden="true"
              />
            </div>
          )}
          {!expanded && (
            <div className="flex flex-1 items-center justify-between min-w-0">
              <p className="flex-1 pr-[12px] min-w-0" style={{ color: titleColor, fontSize: "var(--text-body)", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-supreme)", lineHeight: "var(--lh-body)" }}>{title}</p>
              {(actionLabel || onClose) && (
                <div className="flex items-center gap-[12px] shrink-0">
                  {actionLabel && <Button variant="ghost-secondary" size="sm" onClick={onAction}>{actionLabel}</Button>}
                  {CloseBtn}
                </div>
              )}
            </div>
          )}
          {expanded && (
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-[12px]">
                <div className="flex-1 min-w-0">
                  <p style={{ color: titleColor, fontSize: "var(--text-body)", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-supreme)", lineHeight: "var(--lh-body)" }}>{title}</p>
                  {description && <p className="mt-[4px]" style={{ color: descColor, fontSize: "var(--text-body)", fontWeight: "var(--font-weight-regular)", fontFamily: "var(--font-family-supreme)", lineHeight: "var(--lh-body)" }}>{description}</p>}
                </div>
                {CloseBtn}
              </div>
              {actionLabel && <div className="mt-[10px]"><Button variant="ghost-secondary" size="sm" onClick={onAction}>{actionLabel}</Button></div>}
            </div>
          )}
        </div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert }