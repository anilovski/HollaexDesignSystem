import * as React from "react"
import { cn } from "./utils"

/* ── ProgressBar ── */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; label?: "none" | "right" | "inside"; formatValue?: (value: number) => string
}
const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(({ value: rawValue, label = "none", formatValue, className, ...props }, ref) => {
  const value = Math.max(0, Math.min(100, rawValue))
  const text = formatValue ? formatValue(value) : `${Math.round(value)}%`
  const fillColor = "var(--brand-default)"
  const trackColor = "var(--color-border-subtle,#e1e1e1)"

  if (label === "inside") return (
    <div ref={ref} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} className={cn("w-full font-sans", className)} {...props}>
      <div className="relative h-5 w-full"><div className="absolute inset-0 rounded-full" style={{ backgroundColor: trackColor }} /><div className="absolute top-0.5 bottom-0.5 left-0.5 rounded-full transition-all duration-[var(--duration-long-2)] ease-out" style={{ width: `calc(${value}% - 4px)`, backgroundColor: fillColor }} /><div className="absolute top-1/2 -translate-y-1/2 right-0.5 rounded-full px-1 flex items-center justify-center" style={{ backgroundColor: "#1a1a1a" }}><span className="text-[12px] leading-[16px] font-bold text-white whitespace-nowrap">{text}</span></div></div>
    </div>
  )
  if (label === "right") return (
    <div ref={ref} role="progressbar" aria-valuenow={value} className={cn("flex items-center gap-2 w-full font-sans", className)} {...props}>
      <div className="relative flex-1 h-3"><div className="absolute inset-0 rounded-full" style={{ backgroundColor: trackColor }} /><div className="absolute top-0.5 bottom-0.5 left-0.5 rounded-full transition-all duration-[var(--duration-long-2)] ease-out" style={{ width: value > 0 ? `calc(${value}% - 4px)` : "0px", backgroundColor: fillColor }} /></div>
      <span className="text-[14px] leading-[22px] font-bold whitespace-nowrap shrink-0 w-10 text-right" style={{ color: "var(--color-text-primary)" }}>{text}</span>
    </div>
  )
  return (
    <div ref={ref} role="progressbar" aria-valuenow={value} className={cn("w-full font-sans", className)} {...props}>
      <div className="relative h-3 w-full"><div className="absolute inset-0 rounded-full" style={{ backgroundColor: trackColor }} /><div className="absolute top-0.5 bottom-0.5 left-0.5 rounded-full transition-all duration-[var(--duration-long-2)] ease-out" style={{ width: value > 0 ? `calc(${value}% - 4px)` : "0px", backgroundColor: fillColor }} /></div>
    </div>
  )
})
ProgressBar.displayName = "ProgressBar"

/* ── ProgressCircle ── */
const CIRCLE_SIZES = { "2xs": 64, xs: 144, sm: 200, md: 240, lg: 280 } as const
const STROKE_WIDTHS: Record<string, number> = { "2xs": 8, xs: 9, sm: 10, md: 10, lg: 10 }
const VALUE_TEXT: Record<string, string> = { "2xs": "text-[10px]", xs: "text-[20px]", sm: "text-[30px]", md: "text-[30px]", lg: "text-[36px]" }
const LABEL_TEXT: Record<string, string> = { "2xs": "text-[8px]", xs: "text-[10px]", sm: "text-[12px]", md: "text-[12px]", lg: "text-[14px]" }

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; type?: "full" | "half"; size?: keyof typeof CIRCLE_SIZES; label?: string; showValue?: boolean; formatValue?: (value: number) => string
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) { const rad = ((deg - 90) * Math.PI) / 180; return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) } }
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) { const start = polarToCartesian(cx, cy, r, endAngle); const end = polarToCartesian(cx, cy, r, startAngle); const largeArc = endAngle - startAngle <= 180 ? "0" : "1"; return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}` }

const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(({ value: rawValue, type = "full", size = "sm", label, showValue = true, formatValue, className, ...props }, ref) => {
  const value = Math.max(0, Math.min(100, rawValue))
  const text = formatValue ? formatValue(value) : `${Math.round(value)}%`
  const px = CIRCLE_SIZES[size]; const strokeWidth = STROKE_WIDTHS[size]
  const viewBoxSize = 100; const radius = (viewBoxSize - strokeWidth) / 2; const center = viewBoxSize / 2
  const fillColor = "var(--brand-default)"; const trackColor = "var(--color-border-subtle,#e1e1e1)"

  if (type === "half") {
    const halfCircumference = Math.PI * radius; const offset = halfCircumference * (1 - value / 100); const aspectH = px * 0.55
    return (
      <div ref={ref} role="progressbar" aria-valuenow={value} className={cn("relative inline-flex items-end justify-center font-sans", className)} style={{ width: px, height: aspectH }} {...props}>
        <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize / 2 + strokeWidth}`} className="absolute top-0 left-0 w-full" style={{ height: aspectH }}>
          <path d={describeArc(center, center, radius, 180, 360)} fill="none" stroke={trackColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          <path d={describeArc(center, center, radius, 180, 360)} fill="none" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={halfCircumference} strokeDashoffset={offset} className="transition-all duration-[var(--duration-extra-long-1)] ease-out" />
        </svg>
        {showValue && <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">{label && <span className={cn("font-medium", LABEL_TEXT[size])} style={{ color: "var(--color-text-tertiary)" }}>{label}</span>}<span className={cn("font-bold", VALUE_TEXT[size])} style={{ color: "var(--color-text-primary)" }}>{text}</span></div>}
      </div>
    )
  }
  const circumference = 2 * Math.PI * radius; const offset = circumference * (1 - value / 100)
  return (
    <div ref={ref} role="progressbar" aria-valuenow={value} className={cn("relative inline-flex items-center justify-center font-sans", className)} style={{ width: px, height: px }} {...props}>
      <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="w-full h-full -rotate-90">
        <circle cx={center} cy={center} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle cx={center} cy={center} r={radius} fill="none" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-[var(--duration-extra-long-1)] ease-out" />
      </svg>
      {showValue && <div className="absolute inset-0 flex flex-col items-center justify-center">{label && <span className={cn("font-medium -mb-1", LABEL_TEXT[size])} style={{ color: "var(--color-text-tertiary)" }}>{label}</span>}<span className={cn("font-bold", VALUE_TEXT[size])} style={{ color: "var(--color-text-primary)" }}>{text}</span></div>}
    </div>
  )
})
ProgressCircle.displayName = "ProgressCircle"
export { ProgressBar, ProgressCircle }