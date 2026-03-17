import * as React from "react"
import { useState } from "react"
import { cn } from "./utils"

export interface HxTextareaProps {
  style?: "gray" | "white"
  corners?: "sharp" | "rounded"
  size?: "sm" | "md" | "lg"
  state?: "default" | "error" | "warning" | "disabled"
  label?: string
  placeholder?: string
  helperText?: string
  errorText?: string
  warningText?: string
  maxLength?: number
  showCount?: boolean
  rows?: number
  resize?: "none" | "vertical" | "both"
  defaultValue?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FONT_SIZE: Record<string, string> = { sm: "var(--text-caption)", md: "var(--text-body)", lg: "var(--text-body)" }
const PADDING_Y: Record<string, string> = { sm: "var(--space-2)", md: "var(--space-3)", lg: "var(--space-4)" }

export function HxTextarea({
  style: visualStyle = "gray",
  corners = "sharp",
  size = "md",
  state = "default",
  label,
  placeholder = "Enter text...",
  helperText,
  errorText,
  warningText,
  maxLength,
  showCount = false,
  rows = 4,
  resize = "vertical",
  defaultValue = "",
  value: controlledValue,
  onChange,
}: HxTextareaProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue ?? internalValue
  const isDisabled = state === "disabled"
  const isError = state === "error"
  const isWarning = state === "warning"

  const bg = visualStyle === "gray" ? "var(--secondary-subtle)" : "var(--background)"
  const borderColor = isError ? "var(--danger-default)" : isWarning ? "#D4A017" : "var(--border-subtle)"
  const focusLineColor = isError ? "var(--danger-default)" : isWarning ? "#D4A017" : "var(--brand-default)"

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) return
    setInternalValue(e.target.value)
    onChange?.(e)
  }

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

      <div className={cn("relative group overflow-hidden", isDisabled && "opacity-50 cursor-not-allowed")}>
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          maxLength={maxLength}
          className={cn(
            "w-full outline-none",
            isDisabled && "cursor-not-allowed",
          )}
          style={{
            backgroundColor: bg,
            border: corners === "rounded" ? `1px solid ${borderColor}` : "none",
            borderBottom: corners === "sharp" ? `1px solid ${borderColor}` : undefined,
            borderRadius: corners === "rounded" ? "var(--radius-sm2)" : 0,
            padding: `${PADDING_Y[size]} var(--space-4)`,
            fontSize: FONT_SIZE[size],
            lineHeight: "var(--lh-body)",
            color: isDisabled ? "var(--color-text-disabled)" : "var(--color-text-primary)",
            fontFamily: "var(--font-family-supreme)",
            resize: resize,
          }}
        />
        {/* Focus line */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 right-0 origin-left scale-x-0 group-focus-within:scale-x-100"
          style={{
            height: 2,
            backgroundColor: focusLineColor,
            transition: "transform var(--motion-focus-line)",
          }}
        />
      </div>

      <div className="flex items-center justify-between" style={{ paddingTop: "var(--space-1)" }}>
        <div>
          {isError && errorText && (
            <span style={{ fontSize: "var(--text-caption)", color: "var(--danger-default)", fontFamily: "var(--font-family-supreme)" }}>{errorText}</span>
          )}
          {isWarning && warningText && (
            <span style={{ fontSize: "var(--text-caption)", color: "#D4A017", fontFamily: "var(--font-family-supreme)" }}>{warningText}</span>
          )}
          {state === "default" && helperText && (
            <span style={{ fontSize: "var(--text-caption)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>{helperText}</span>
          )}
        </div>
        {showCount && maxLength && (
          <span style={{
            fontSize: "var(--text-caption)",
            color: value.length >= maxLength ? "var(--danger-default)" : "var(--color-text-tertiary)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
