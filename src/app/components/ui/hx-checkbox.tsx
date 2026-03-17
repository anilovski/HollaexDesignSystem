import { cn } from "./utils"
import { forwardRef, useRef, useEffect, useState, useCallback, type InputHTMLAttributes, type ReactNode, type ChangeEvent } from "react"

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string; children?: ReactNode; helperText?: string; indeterminate?: boolean; error?: boolean; skeleton?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, children, helperText, indeterminate = false, error = false, skeleton = false, disabled = false, checked, defaultChecked, onChange, className, id, ...props }, forwardedRef
) {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false)
  const isChecked = isControlled ? !!checked : internalChecked
  const inputRef = useRef<HTMLInputElement>(null)
  const setRef = useCallback((el: HTMLInputElement | null) => {
    (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el
    if (typeof forwardedRef === "function") forwardedRef(el)
    else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = el
  }, [forwardedRef])
  useEffect(() => { if (inputRef.current) inputRef.current.indeterminate = indeterminate }, [indeterminate])
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => { if (!isControlled) setInternalChecked(e.target.checked); onChange?.(e) }, [isControlled, onChange])
  const showChecked = !indeterminate && isChecked; const showIndet = indeterminate; const filled = showChecked || showIndet

  if (skeleton) return (
    <div className={cn("inline-flex flex-col gap-[4px] items-start", className)}>
      {label !== undefined && <span className="h-3 w-14 rounded-[2px] hx-shimmer block" />}
      <div className="flex gap-[8px] items-center"><span className="shrink-0 size-4 rounded-[2px] hx-shimmer block" />{children !== undefined && <span className="h-3.5 w-24 rounded-[2px] hx-shimmer block" />}</div>
      {helperText !== undefined && <span className="h-3 w-32 rounded-[2px] hx-shimmer block" />}
    </div>
  )

  return (
    <label className={cn("group inline-flex flex-col gap-[4px] items-start", disabled ? "cursor-not-allowed" : "cursor-pointer", className)}>
      <input ref={setRef} type="checkbox" id={id} disabled={disabled} checked={isControlled ? checked : internalChecked} onChange={handleChange} className="sr-only" aria-invalid={error || undefined} {...props} />
      {label !== undefined && label !== null && (
        <span className={cn("text-[12px] leading-[16px] font-sans font-normal select-none", error ? "text-[var(--danger-default)]" : disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-secondary)]")}>{label}</span>
      )}
      <div className="flex gap-[8px] items-center">
        <span aria-hidden className={cn("relative shrink-0 size-4 rounded-[2px] flex items-center justify-center transition-colors duration-100",
          "group-has-[input:focus-visible]:ring-1 group-has-[input:focus-visible]:ring-[var(--focus-ring)] group-has-[input:focus-visible]:ring-offset-1",
          !filled && !disabled && !error && "group-hover:border-[var(--color-text-secondary)]",
          !filled && ["border", error ? "border-[var(--danger-default)]" : disabled ? "border-[var(--color-text-disabled)]" : "border-[var(--color-text-secondary)]"],
          filled && [error ? "bg-[var(--danger-default)]" : disabled ? "bg-[var(--color-text-disabled)]" : "bg-[var(--brand-default)]"])}>
          {showChecked && <svg viewBox="0 0 8 8" fill="none" className="size-2 shrink-0" aria-hidden><path d="M1.5 4L3.5 6L6.5 2" stroke={disabled ? "#aaa" : "white"} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          {showIndet && <span aria-hidden className={cn("block h-px w-2 rounded-[0.5px]", disabled ? "bg-[#aaa]" : "bg-white")} />}
        </span>
        {children && <div className="flex items-center justify-center py-px"><span className={cn("text-[14px] leading-[22px] font-sans font-normal whitespace-nowrap select-none", disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-primary)]")}>{children}</span></div>}
      </div>
      {helperText && <span className={cn("text-[12px] leading-[16px] font-sans font-normal", error ? "text-[var(--danger-default)]" : disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-tertiary)]")}>{helperText}</span>}
    </label>
  )
})
Checkbox.displayName = "Checkbox"