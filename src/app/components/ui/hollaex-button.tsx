import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const ICON_SIZE: Record<string, number> = { xs: 12, sm: 14, md: 16, lg: 16, xl: 20 }

function sizeIcon(icon: React.ReactNode, size: number): React.ReactNode {
  if (!React.isValidElement(icon)) return icon
  return React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, {
    size,
    className: cn("shrink-0", (icon as React.ReactElement<{ className?: string }>).props.className),
  })
}

const buttonVariants = cva(
  ["inline-flex items-center justify-center", "font-sans font-medium leading-none whitespace-nowrap", "border border-transparent", "transition-all duration-[var(--duration-short-3)]", "select-none cursor-pointer", "focus-visible:outline-none focus-visible:ring-2", "focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2", "focus-visible:ring-offset-[var(--focus-ring-offset)]", "disabled:pointer-events-none disabled:cursor-not-allowed", "active:scale-[0.98]"],
  {
    variants: {
      variant: {
        primary: ["bg-[var(--brand-default)] text-[var(--brand-fg)]", "hover:bg-[var(--brand-hover)]", "active:bg-[var(--brand-active)]", "disabled:bg-[var(--brand-disabled)] disabled:text-[var(--brand-disabled-fg)]"],
        secondary: ["bg-[var(--secondary-default)] text-[var(--secondary-fg)]", "hover:bg-[var(--secondary-hover)]", "active:bg-[var(--secondary-active)]", "disabled:bg-[var(--secondary-disabled)] disabled:text-[var(--secondary-disabled-fg)]"],
        "outline-primary": ["border-[var(--brand-default)] text-[var(--brand-default)] bg-transparent", "hover:bg-[var(--brand-subtle)]", "active:bg-[var(--brand-subtle-hover)]", "disabled:border-[var(--brand-disabled)] disabled:text-[var(--brand-disabled)]"],
        "outline-secondary": ["border-[var(--outline-secondary-color)] text-[var(--outline-secondary-color)] bg-transparent", "hover:bg-[var(--secondary-subtle)]", "active:bg-[var(--secondary-subtle-hover)]", "disabled:border-[var(--outline-secondary-disabled-color)] disabled:text-[var(--outline-secondary-disabled-color)]"],
        "ghost-primary": ["text-[var(--brand-default)] bg-transparent border-transparent", "hover:bg-[var(--brand-subtle)]", "active:bg-[var(--brand-subtle-hover)]", "disabled:text-[var(--brand-disabled)]"],
        "ghost-secondary": ["text-[var(--color-text-primary)] bg-transparent border-transparent", "hover:bg-[var(--secondary-subtle)]", "active:bg-[var(--secondary-subtle-hover)]", "disabled:text-[var(--color-text-disabled)]"],
        "danger-primary": ["bg-[var(--danger-default)] text-[var(--danger-fg)]", "hover:bg-[var(--danger-hover)]", "active:bg-[var(--danger-active)]", "disabled:bg-[var(--danger-disabled)] disabled:text-[var(--danger-disabled-fg)]"],
        "danger-outline": ["border-[var(--danger-default)] text-[var(--danger-default)] bg-transparent", "hover:bg-[var(--danger-subtle)]", "active:bg-[var(--danger-subtle-hover)]", "disabled:border-[var(--danger-disabled)] disabled:text-[var(--danger-disabled)]"],
        "danger-ghost": ["text-[var(--danger-default)] bg-transparent border-transparent", "hover:bg-[var(--danger-subtle)]", "active:bg-[var(--danger-subtle-hover)]", "disabled:text-[var(--danger-disabled)]"],
      },
      size: {
        xs: "h-6 px-2 text-[10px] gap-1",
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-5 text-base gap-2",
        xl: "h-14 px-6 text-lg gap-2.5",
      },
      corners: { rounded: "rounded-[var(--radius-sm2)]", sharp: "rounded-none" },
      iconOnly: { true: "", false: "" },
    },
    compoundVariants: [
      { iconOnly: true, size: "xs", class: "w-6 px-0" },
      { iconOnly: true, size: "sm", class: "w-8 px-0" },
      { iconOnly: true, size: "md", class: "w-10 px-0" },
      { iconOnly: true, size: "lg", class: "w-12 px-0" },
      { iconOnly: true, size: "xl", class: "w-14 px-0" },
    ],
    defaultVariants: { variant: "primary", size: "md", corners: "rounded", iconOnly: false },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function LoadingSpinner({ size = 16 }: { size?: number }) {
  return (<svg className="animate-spin shrink-0" style={{ width: size, height: size }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>)
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = "md", corners, iconOnly, loading, leftIcon, rightIcon, disabled, children, ...props }, ref) => {
    const iconPx = ICON_SIZE[size ?? "md"]
    return (
      <button ref={ref} disabled={disabled || loading} className={cn(buttonVariants({ variant, size, corners, iconOnly }), className)} {...props}>
        {loading ? (
          <LoadingSpinner key="spinner" size={iconPx} />
        ) : leftIcon ? (
          <span key="left-icon" className="inline-flex shrink-0">{sizeIcon(leftIcon, iconPx)}</span>
        ) : null}
        {children != null && <span key="label">{children}</span>}
        {!loading && rightIcon ? (
          <span key="right-icon" className="inline-flex shrink-0">{sizeIcon(rightIcon, iconPx)}</span>
        ) : null}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }