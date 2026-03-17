import * as React from "react"
import { cn } from "./utils"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const SIZE_PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 44, xl: 64, "2xl": 80 }
const TEXT_PX: Record<AvatarSize, string> = { xs: "8px", sm: "10px", md: "12px", lg: "14px", xl: "24px", "2xl": "28px" }
const RING_PX: Record<AvatarSize, number> = { xs: 2, sm: 2, md: 2, lg: 2, xl: 3, "2xl": 3 }

function getInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("")
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize; src?: string; name?: string; alt?: string; skeleton?: boolean
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "xl", src, name, alt, skeleton, ...props }, ref) => {
    const px = SIZE_PX[size]; const ring = RING_PX[size]; const fontSize = TEXT_PX[size]
    const initials = name ? getInitials(name) : "?"
    const [imgError, setImgError] = React.useState(false)
    const sizeStyle: React.CSSProperties = { width: px, height: px, minWidth: px, minHeight: px }

    if (skeleton) return <div ref={ref} className={cn("rounded-full hx-shimmer border-[2px] border-[var(--border-subtle)] flex-shrink-0", className)} style={sizeStyle} {...props} />
    if (src && !imgError) return (
      <div ref={ref} className={cn("rounded-full overflow-hidden flex-shrink-0 border-[2px] border-[#DEDEDE]", className)} style={sizeStyle} {...props}>
        <img src={src} alt={alt ?? name ?? "avatar"} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      </div>
    )
    return (
      <div ref={ref} className={cn("relative rounded-full overflow-hidden flex-shrink-0", className)} style={sizeStyle} {...props}>
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ border: `${ring}px solid #2463EB` }} />
        <div className="absolute rounded-full bg-[#282C32] pointer-events-none" style={{ inset: ring, border: `${ring}px solid white` }} />
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold font-sans z-10 select-none leading-none" style={{ fontSize }}>{initials}</span>
      </div>
    )
  }
)
Avatar.displayName = "Avatar"
export { Avatar }