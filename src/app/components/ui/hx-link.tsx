import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const ICON_SIZE: Record<string, number> = { sm: 14, md: 16, lg: 18, huge: 24 }

function sizeIcon(icon: React.ReactNode, size: number): React.ReactNode {
  if (!React.isValidElement(icon)) return icon
  return React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, { size, className: cn("shrink-0", (icon as React.ReactElement<{ className?: string }>).props.className) })
}

const linkVariants = cva(
  ["inline-flex items-center font-sans font-medium transition-all duration-[var(--duration-short-3)] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2"],
  {
    variants: {
      variant: {
        standard: ["text-[var(--brand-default)] no-underline hover:underline hover:underline-offset-2", "hover:text-[var(--brand-hover)]", "active:text-[var(--brand-active)]"],
        inline: ["text-[var(--brand-default)] underline underline-offset-2 decoration-[var(--brand-default)]/40 hover:decoration-[var(--brand-hover)]", "hover:text-[var(--brand-hover)]", "active:text-[var(--brand-active)]"],
      },
      size: { sm: "text-[14px] leading-[22px] gap-[2px]", md: "text-[16px] leading-[24px] gap-[2px]", lg: "text-[18px] leading-[26px] gap-[2px]", huge: "text-[28px] leading-[34px] gap-[2px]" },
    },
    defaultVariants: { variant: "standard", size: "md" },
  }
)

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">, VariantProps<typeof linkVariants> {
  href: string; rightIcon?: React.ReactNode; leftIcon?: React.ReactNode; disabled?: boolean; visited?: boolean; external?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, variant, size = "md", href, rightIcon, leftIcon, disabled, visited, external, children, ...props }, ref) => {
  const iconPx = ICON_SIZE[size ?? "md"]
  const classes = cn(linkVariants({ variant, size }), disabled && "pointer-events-none text-[var(--color-text-disabled)]", visited && "text-[#6941C6] hover:text-[#53389E]", className)
  const content = <>{leftIcon ? sizeIcon(leftIcon, iconPx) : null}{children}{rightIcon ? sizeIcon(rightIcon, iconPx) : null}</>
  if (disabled) return <span ref={ref as React.Ref<HTMLSpanElement>} className={classes} aria-disabled="true" {...(props as React.HTMLAttributes<HTMLSpanElement>)}>{content}</span>
  return <a ref={ref} href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...props}>{content}</a>
})
Link.displayName = "Link"
export { Link, linkVariants }