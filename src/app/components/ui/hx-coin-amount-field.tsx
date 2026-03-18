import { useState, useRef, useCallback, useEffect, type ReactNode } from "react"
import { ChevronDown, Info } from "lucide-react"
import { CryptoIcon } from "./crypto-icon"
import { cn } from "./utils"

/* ── Types ────────────────────────────────────────── */
export interface CoinAsset {
  symbol: string
  name: string
}

export type CoinAmountFieldSize = "sm" | "md" | "lg"

export interface CoinAmountFieldProps {
  /** Section label, e.g. "Convert From" */
  label?: string
  /** Currently selected asset */
  asset?: CoinAsset
  /** Called when user clicks the coin selector to change asset */
  onAssetClick?: () => void
  /** Numeric amount value (controlled) */
  amount?: string
  /** Called on amount change */
  onAmountChange?: (value: string) => void
  /** Placeholder for the amount input */
  placeholder?: string
  /** Balance display string, e.g. "40,012.722" */
  balance?: string
  /** Balance label, e.g. "USDT Balance:" — defaults to "{symbol} Balance:" */
  balanceLabel?: string
  /** Show the info icon next to balance */
  showBalanceInfo?: boolean
  /** Called when info icon is clicked */
  onBalanceInfoClick?: () => void
  /** Whether the amount input is read-only (used for "Convert To" side) */
  readOnly?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Error message */
  error?: string
  /** Size variant */
  size?: CoinAmountFieldSize
  /** Additional className */
  className?: string
  /** Skeleton loading state */
  skeleton?: boolean
  /** Optional slot for extra content below the main row (e.g. percentage buttons) */
  footer?: ReactNode
}

/* ── Size config ──────────────────────────────────── */
const SIZE_CONFIG: Record<CoinAmountFieldSize, {
  container: string
  label: string
  coinIcon: number
  coinText: string
  amountText: string
  balanceText: string
  chevron: number
  padding: string
}> = {
  sm: {
    container: "",
    label: "var(--text-caption)",
    coinIcon: 20,
    coinText: "var(--text-body-sm)",
    amountText: "var(--text-h4)",
    balanceText: "var(--text-caption)",
    chevron: 14,
    padding: "var(--space-4)",
  },
  md: {
    container: "",
    label: "var(--text-meta)",
    coinIcon: 28,
    coinText: "var(--text-body)",
    amountText: "var(--text-h3)",
    balanceText: "var(--text-meta)",
    chevron: 16,
    padding: "var(--space-5)",
  },
  lg: {
    container: "",
    label: "var(--text-body-sm)",
    coinIcon: 32,
    coinText: "var(--text-body-lg)",
    amountText: "var(--text-h2)",
    balanceText: "var(--text-body-sm)",
    chevron: 18,
    padding: "var(--space-6)",
  },
}

/* ── Component ────────────────────────────────────── */
export function CoinAmountField({
  label,
  asset,
  onAssetClick,
  amount = "",
  onAmountChange,
  placeholder = "0",
  balance,
  balanceLabel,
  showBalanceInfo = false,
  onBalanceInfoClick,
  readOnly = false,
  disabled = false,
  error,
  size = "md",
  className,
  skeleton = false,
  footer,
}: CoinAmountFieldProps) {
  const s = SIZE_CONFIG[size]
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const resolvedBalanceLabel = balanceLabel ?? (asset ? `${asset.symbol.toUpperCase()} Balance:` : "Balance:")

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      // Allow only valid numeric input (digits, one decimal point, leading minus)
      if (val === "" || /^-?\d*\.?\d*$/.test(val)) {
        onAmountChange?.(val)
      }
    },
    [onAmountChange],
  )

  /* ── Skeleton ──────────────────────────────────── */
  if (skeleton) {
    return (
      <div
        className={cn("rounded-[var(--radius-card)] border overflow-hidden", className)}
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--card)",
          padding: s.padding,
        }}
      >
        {label && <div className="h-[14px] w-[80px] rounded hx-shimmer" style={{ marginBottom: "var(--space-4)" }} />}
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <div className="rounded-full hx-shimmer" style={{ width: s.coinIcon, height: s.coinIcon }} />
            <div className="h-[16px] w-[72px] rounded hx-shimmer" />
            <div className="h-[12px] w-[12px] rounded hx-shimmer" />
          </div>
          <div className="h-[28px] w-[60px] rounded hx-shimmer" />
        </div>
        <div className="flex items-center justify-between" style={{ marginTop: "var(--space-4)" }}>
          <div className="h-[12px] w-[120px] rounded hx-shimmer" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] overflow-hidden transition-all",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: error
          ? "var(--danger-default)"
          : isFocused
            ? "var(--brand-default)"
            : "var(--border-subtle)",
        borderRadius: "var(--radius-card)",
        backgroundColor: "var(--card)",
        boxShadow: isFocused && !error
          ? "0 0 0 3px var(--brand-subtle)"
          : error
            ? "0 0 0 3px var(--danger-subtle)"
            : "none",
        transitionDuration: "var(--duration-short-3)",
        transitionTimingFunction: "var(--ease-standard)",
      }}
    >
      <div style={{ padding: s.padding }}>
        {/* Label */}
        {label && (
          <div
            style={{
              fontSize: s.label,
              fontWeight: "var(--font-weight-medium)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-family-supreme)",
              letterSpacing: "var(--ls-label)",
              marginBottom: "var(--space-4)",
            }}
          >
            {label}
          </div>
        )}

        {/* Main row: Coin selector | Amount input */}
        <div className="flex items-center justify-between" style={{ gap: "var(--space-5)" }}>
          {/* Coin selector */}
          <button
            type="button"
            onClick={onAssetClick}
            disabled={disabled || !onAssetClick}
            className={cn(
              "flex items-center shrink-0 rounded-[var(--radius-chip)] transition-all select-none",
              onAssetClick && !disabled && "cursor-pointer hover:border-[var(--brand-default)]",
              (!onAssetClick || disabled) && "cursor-default",
            )}
            style={{
              gap: "var(--space-3)",
              padding: `var(--space-2) var(--space-4) var(--space-2) var(--space-2)`,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "var(--border)",
              backgroundColor: "var(--background)",
              transitionDuration: "var(--duration-short-3)",
              transitionTimingFunction: "var(--ease-standard)",
            }}
            aria-label={asset ? `Selected asset: ${asset.name}. Click to change.` : "Select an asset"}
          >
            {asset ? (
              <>
                <CryptoIcon symbol={asset.symbol} size={s.coinIcon} />
                <span
                  style={{
                    fontSize: s.coinText,
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-family-supreme)",
                    lineHeight: "var(--lh-body)",
                  }}
                >
                  {asset.symbol.toUpperCase()}
                </span>
              </>
            ) : (
              <span
                style={{
                  fontSize: s.coinText,
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-family-supreme)",
                  lineHeight: "var(--lh-body)",
                  paddingLeft: "var(--space-2)",
                }}
              >
                Select
              </span>
            )}
            {onAssetClick && (
              <ChevronDown
                size={s.chevron}
                style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }}
              />
            )}
          </button>

          {/* Amount input */}
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            aria-label={label ? `${label} amount` : "Amount"}
            aria-invalid={!!error}
            className="bg-transparent outline-none text-right min-w-0 flex-1"
            style={{
              fontSize: s.amountText,
              fontWeight: "var(--font-weight-bold)",
              color: amount ? "var(--color-text-primary)" : "var(--color-text-disabled)",
              caretColor: "var(--color-text-primary)",
              fontFamily: "var(--font-family-mono)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              border: "none",
              padding: 0,
            }}
          />
        </div>

        {/* Balance row */}
        {(balance !== undefined || error) && (
          <div
            className="flex items-center justify-between"
            style={{ marginTop: "var(--space-4)" }}
          >
            <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
              {error ? (
                <span
                  style={{
                    fontSize: s.balanceText,
                    color: "var(--danger-default)",
                    fontFamily: "var(--font-family-supreme)",
                    lineHeight: "var(--lh-caption)",
                  }}
                >
                  {error}
                </span>
              ) : (
                <>
                  <span
                    style={{
                      fontSize: s.balanceText,
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-family-supreme)",
                      lineHeight: "var(--lh-caption)",
                    }}
                  >
                    {resolvedBalanceLabel}
                  </span>
                  <span
                    style={{
                      fontSize: s.balanceText,
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-family-mono)",
                      lineHeight: "var(--lh-caption)",
                    }}
                  >
                    {balance}
                  </span>
                </>
              )}
            </div>
            {showBalanceInfo && !error && (
              <button
                type="button"
                onClick={onBalanceInfoClick}
                className="flex items-center justify-center transition-colors"
                style={{
                  color: "var(--color-text-tertiary)",
                  transitionDuration: "var(--duration-short-2)",
                }}
                aria-label="Balance information"
              >
                <Info size={size === "sm" ? 12 : size === "md" ? 14 : 16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer slot (e.g. percentage buttons) */}
      {footer && (
        <div
          className="border-t"
          style={{
            borderColor: "var(--border-subtle)",
            padding: `var(--space-3) ${s.padding}`,
            backgroundColor: "var(--secondary-subtle)",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}