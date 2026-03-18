import { cn } from "./utils"
import { createContext, forwardRef, useContext, useCallback, useId, type InputHTMLAttributes, type ReactNode, type ChangeEvent } from "react"

interface RadioGroupContextValue { name: string; value?: string; onValueChange?: (value: string) => void; disabled?: boolean; error?: boolean }
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps { name?: string; value?: string; onValueChange?: (value: string) => void; disabled?: boolean; error?: boolean; direction?: "vertical" | "horizontal"; className?: string; children: ReactNode }
export function RadioGroup({ name, value, onValueChange, disabled = false, error = false, direction = "vertical", className, children }: RadioGroupProps) {
  const autoId = useId(); const groupName = name ?? `radio-group-${autoId}`
  return <RadioGroupContext.Provider value={{ name: groupName, value, onValueChange, disabled, error }}><div role="radiogroup" className={cn("flex font-sans", direction === "vertical" ? "flex-col gap-4" : "flex-row flex-wrap gap-6", className)}>{children}</div></RadioGroupContext.Provider>
}

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value"> {
  value: string; label?: string; children?: ReactNode; helperText?: string; error?: boolean; skeleton?: boolean
}
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { value, label, children, helperText, error: errorProp = false, skeleton = false, disabled: disabledProp = false, checked: checkedProp, onChange, className, id, name: nameProp, ...props }, ref
) {
  const group = useContext(RadioGroupContext)
  const disabled = disabledProp || group?.disabled || false; const error = errorProp || group?.error || false
  const name = nameProp ?? group?.name; const isChecked = group ? group.value === value : checkedProp
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => { group?.onValueChange?.(value); onChange?.(e) }, [group, value, onChange])

  if (skeleton) return (
    <div className={cn("inline-flex flex-col gap-1 items-start", className)}>
      {label !== undefined && <span className="h-2.5 w-10 rounded-[2px] hx-shimmer block" />}
      <div className="flex gap-2 items-center h-6"><span className="shrink-0 size-4 rounded-full hx-shimmer block" /><span className="h-4 w-28 rounded-[2px] hx-shimmer block" /></div>
      {helperText !== undefined && <span className="h-2.5 w-[130px] rounded-[2px] hx-shimmer block" />}
    </div>
  )

  return (
    <label className={cn("group inline-flex flex-col gap-1 items-start font-sans", disabled ? "cursor-not-allowed" : "cursor-pointer", className)}>
      <input ref={ref} type="radio" id={id} name={name} value={value} disabled={disabled} checked={isChecked} onChange={handleChange} className="sr-only peer" aria-invalid={error || undefined} {...props} />
      {label !== undefined && label !== null && <span className={cn("text-[12px] leading-[16px] font-normal select-none", error ? "text-[var(--danger-default)]" : disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-secondary)]")}>{label}</span>}
      <div className="flex items-center gap-2 py-px">
        <span aria-hidden className={cn("relative shrink-0 size-4 rounded-full flex items-center justify-center transition-colors duration-[var(--duration-short-2)]",
          "group-has-[input:focus-visible]:ring-1 group-has-[input:focus-visible]:ring-[var(--focus-ring)] group-has-[input:focus-visible]:ring-offset-1",
          !isChecked && ["border", error ? "border-[var(--danger-default)]" : disabled ? "border-[var(--color-text-disabled)]" : "border-[var(--color-text-secondary)]"],
          isChecked && ["border", error ? "bg-[var(--danger-default)] border-[var(--danger-default)]" : disabled ? "bg-[var(--color-text-disabled)] border-[var(--color-text-disabled)]" : "bg-[var(--brand-default)] border-[var(--brand-default)]"])}>
          {isChecked && <span aria-hidden className={cn("block rounded-full size-2", disabled ? "bg-[#aaa]" : "bg-white")} style={{ animation: "hx-check-pop var(--duration-short-4) var(--ease-emphasized-decelerate)" }} />}
        </span>
        {children && <span className={cn("text-[14px] leading-[22px] font-normal whitespace-nowrap select-none", disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-primary)]")}>{children}</span>}
      </div>
      {helperText && <span className={cn("text-[12px] leading-[16px] font-normal", error ? "text-[var(--danger-default)]" : disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-tertiary)]")}>{helperText}</span>}
    </label>
  )
})
RadioButton.displayName = "RadioButton"