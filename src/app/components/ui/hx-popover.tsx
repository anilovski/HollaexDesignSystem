import * as React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "./utils"

export interface HxPopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  width?: number | string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function HxPopover({
  trigger,
  children,
  side = "bottom",
  align = "center",
  width = 280,
  open: controlledOpen,
  onOpenChange,
}: HxPopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = useCallback((v: boolean) => { setInternalOpen(v); onOpenChange?.(v) }, [onOpenChange])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [setOpen])

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { bottom: "calc(100% + 6px)", left: align === "start" ? 0 : align === "end" ? undefined : "50%", right: align === "end" ? 0 : undefined, transform: align === "center" ? "translateX(-50%)" : undefined },
    bottom: { top: "calc(100% + 6px)", left: align === "start" ? 0 : align === "end" ? undefined : "50%", right: align === "end" ? 0 : undefined, transform: align === "center" ? "translateX(-50%)" : undefined },
    left: { right: "calc(100% + 6px)", top: align === "start" ? 0 : align === "end" ? undefined : "50%", bottom: align === "end" ? 0 : undefined, transform: align === "center" ? "translateY(-50%)" : undefined },
    right: { left: "calc(100% + 6px)", top: align === "start" ? 0 : align === "end" ? undefined : "50%", bottom: align === "end" ? 0 : undefined, transform: align === "center" ? "translateY(-50%)" : undefined },
  }

  return (
    <div ref={ref} className="relative inline-flex">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          className="absolute z-50 border rounded-lg overflow-hidden"
          style={{
            width,
            backgroundColor: "var(--card)",
            borderColor: "var(--border-subtle)",
            boxShadow: "var(--modal-shadow)",
            padding: "var(--space-4)",
            fontFamily: "var(--font-family-supreme)",
            animation: "toast-enter 200ms var(--ease-emphasized-decelerate) forwards",
            ...positionStyles[side],
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
