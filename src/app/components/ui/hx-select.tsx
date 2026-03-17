import * as React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, Check, X } from "lucide-react"
import { cn } from "./utils"

/* ── Types ──────────────────────────────────────────── */
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

type SelectItem = SelectOption | SelectGroup

function isGroup(item: SelectItem): item is SelectGroup {
  return "options" in item
}

export interface HxSelectProps {
  items: SelectItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  helperText?: string
  errorText?: string
  warningText?: string
  size?: "sm" | "md" | "lg"
  style?: "gray" | "white"
  corners?: "sharp" | "rounded"
  state?: "default" | "error" | "warning" | "disabled"
  clearable?: boolean
}

const HEIGHT: Record<string, number> = { sm: 32, md: 40, lg: 48 }
const TEXT_SIZE: Record<string, string> = { sm: "var(--text-caption)", md: "var(--text-body)", lg: "var(--text-body)" }

export function HxSelect({
  items,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Select...",
  label,
  helperText,
  errorText,
  warningText,
  size = "md",
  style = "gray",
  corners = "sharp",
  state = "default",
  clearable = false,
}: HxSelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue ?? internalValue
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isDisabled = state === "disabled"

  const allOptions: SelectOption[] = items.flatMap(i => isGroup(i) ? i.options : [i])
  const selectedOption = allOptions.find(o => o.value === value)

  const select = useCallback((v: string) => {
    setInternalValue(v)
    onChange?.(v)
    setOpen(false)
  }, [onChange])

  const clear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setInternalValue("")
    onChange?.("")
  }, [onChange])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const bg = style === "gray" ? "var(--secondary-subtle)" : "var(--background)"
  const borderColor = state === "error" ? "var(--danger-default)" : state === "warning" ? "#D4A017" : "var(--border-subtle)"
  const focusBorderColor = state === "error" ? "var(--danger-default)" : state === "warning" ? "#D4A017" : "var(--brand-default)"

  return (
    <div className="flex flex-col w-full" style={{ fontFamily: "var(--font-family-supreme)" }}>
      {label && (
        <div style={{ paddingBottom: "var(--space-2)" }}>
          <span style={{
            fontSize: "var(--text-caption)",
            lineHeight: "var(--lh-caption)",
            color: isDisabled ? "var(--color-text-disabled)" : "var(--color-text-secondary)",
            fontFamily: "var(--font-family-supreme)",
          }}>{label}</span>
        </div>
      )}

      <div ref={ref} className="relative w-full">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => !isDisabled && setOpen(o => !o)}
          className={cn(
            "w-full flex items-center justify-between cursor-pointer",
            "transition-colors",
            isDisabled && "opacity-50 cursor-not-allowed",
          )}
          style={{
            height: HEIGHT[size],
            padding: `0 var(--space-4)`,
            gap: "var(--space-2)",
            backgroundColor: bg,
            border: corners === "rounded" ? `1px solid ${borderColor}` : "none",
            borderBottom: corners === "sharp" ? `1px solid ${borderColor}` : undefined,
            borderRadius: corners === "rounded" ? "var(--radius-sm2)" : 0,
            fontFamily: "var(--font-family-supreme)",
            fontSize: TEXT_SIZE[size],
            color: selectedOption ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
            outline: open ? `2px solid ${focusBorderColor}` : "none",
            outlineOffset: -1,
          }}
        >
          <span className="truncate">{selectedOption?.label ?? placeholder}</span>
          <div className="flex items-center" style={{ gap: "var(--space-1)" }}>
            {clearable && value && !isDisabled && (
              <span
                role="button"
                onClick={clear}
                className="flex items-center justify-center rounded-full cursor-pointer"
                style={{
                  width: 18, height: 18,
                  color: "var(--color-text-tertiary)",
                }}
              >
                <X size={12} />
              </span>
            )}
            <ChevronDown
              size={16}
              className="shrink-0"
              style={{
                color: "var(--color-text-tertiary)",
                transition: "transform var(--motion-hover)",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        </button>

        {open && (
          <div
            className="absolute z-50 w-full border overflow-y-auto"
            style={{
              top: "calc(100% + 4px)",
              maxHeight: 240,
              backgroundColor: "var(--card)",
              borderColor: "var(--border-subtle)",
              borderRadius: "var(--radius-sm2)",
              boxShadow: "var(--modal-shadow)",
              padding: "var(--space-1)",
              animation: "toast-enter 200ms var(--ease-emphasized-decelerate) forwards",
            }}
          >
            {items.map((item, idx) =>
              isGroup(item) ? (
                <div key={`group-${idx}`}>
                  <div style={{
                    fontSize: "var(--text-overline)",
                    fontWeight: "var(--font-weight-bold)",
                    letterSpacing: "var(--ls-overline)",
                    textTransform: "uppercase" as const,
                    color: "var(--color-text-tertiary)",
                    padding: `var(--space-3) var(--space-3) var(--space-1)`,
                    fontFamily: "var(--font-family-supreme)",
                  }}>
                    {item.label}
                  </div>
                  {item.options.map(opt => (
                    <OptionItem key={opt.value} option={opt} selected={opt.value === value} onSelect={select} size={size} />
                  ))}
                </div>
              ) : (
                <OptionItem key={item.value} option={item} selected={item.value === value} onSelect={select} size={size} />
              )
            )}
          </div>
        )}
      </div>

      {state === "error" && errorText && (
        <span style={{ fontSize: "var(--text-caption)", paddingTop: "var(--space-1)", color: "var(--danger-default)", fontFamily: "var(--font-family-supreme)" }}>{errorText}</span>
      )}
      {state === "warning" && warningText && (
        <span style={{ fontSize: "var(--text-caption)", paddingTop: "var(--space-1)", color: "#D4A017", fontFamily: "var(--font-family-supreme)" }}>{warningText}</span>
      )}
      {state === "default" && helperText && (
        <span style={{ fontSize: "var(--text-caption)", paddingTop: "var(--space-1)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>{helperText}</span>
      )}
    </div>
  )
}

function OptionItem({ option, selected, onSelect, size }: { option: SelectOption; selected: boolean; onSelect: (v: string) => void; size: string }) {
  return (
    <button
      type="button"
      disabled={option.disabled}
      onClick={() => onSelect(option.value)}
      className={cn(
        "w-full flex items-center justify-between cursor-pointer",
        option.disabled && "opacity-40 cursor-not-allowed",
      )}
      style={{
        padding: `var(--space-2) var(--space-3)`,
        fontSize: TEXT_SIZE[size],
        color: selected ? "var(--brand-default)" : "var(--color-text-primary)",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "var(--radius-xs)",
        fontFamily: "var(--font-family-supreme)",
        transition: "background var(--motion-hover)",
      }}
      onMouseEnter={e => { if (!option.disabled) e.currentTarget.style.backgroundColor = "var(--secondary-subtle)" }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent" }}
    >
      <span className="truncate">{option.label}</span>
      {selected && <Check size={14} style={{ color: "var(--brand-default)" }} />}
    </button>
  )
}
