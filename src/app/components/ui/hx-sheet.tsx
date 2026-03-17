import * as React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "./utils"

export type SheetSide = "left" | "right" | "top" | "bottom"

export interface HxSheetProps {
  open: boolean
  onClose: () => void
  side?: SheetSide
  title?: string
  description?: string
  children: React.ReactNode
  width?: number | string
  footer?: React.ReactNode
}

const STYLE_ID = "hx-sheet-keyframes"
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    @keyframes hx-sheet-overlay-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes hx-sheet-overlay-out { from { opacity: 1; } to { opacity: 0; } }
    @keyframes hx-sheet-slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
    @keyframes hx-sheet-slide-out-right { from { transform: translateX(0); } to { transform: translateX(100%); } }
    @keyframes hx-sheet-slide-in-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
    @keyframes hx-sheet-slide-out-left { from { transform: translateX(0); } to { transform: translateX(-100%); } }
    @keyframes hx-sheet-slide-in-top { from { transform: translateY(-100%); } to { transform: translateY(0); } }
    @keyframes hx-sheet-slide-out-top { from { transform: translateY(0); } to { transform: translateY(-100%); } }
    @keyframes hx-sheet-slide-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
    @keyframes hx-sheet-slide-out-bottom { from { transform: translateY(0); } to { transform: translateY(100%); } }
  `
  document.head.appendChild(style)
}

export function HxSheet({
  open,
  onClose,
  side = "right",
  title,
  description,
  children,
  width = 380,
  footer,
}: HxSheetProps) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setVisible(true)
      setExiting(false)
    } else if (visible) {
      setExiting(true)
      const t = setTimeout(() => { setVisible(false); setExiting(false) }, 300)
      return () => clearTimeout(t)
    }
  }, [open])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  if (!visible) return null

  const isHorizontal = side === "left" || side === "right"
  const enterAnim = `hx-sheet-slide-in-${side} 400ms var(--ease-emphasized-decelerate) forwards`
  const exitAnim = `hx-sheet-slide-out-${side} 300ms var(--ease-emphasized-accelerate) forwards`

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 51,
    backgroundColor: "var(--card)",
    borderLeft: side === "right" ? "1px solid var(--border-subtle)" : undefined,
    borderRight: side === "left" ? "1px solid var(--border-subtle)" : undefined,
    borderTop: side === "bottom" ? "1px solid var(--border-subtle)" : undefined,
    borderBottom: side === "top" ? "1px solid var(--border-subtle)" : undefined,
    boxShadow: "var(--modal-shadow)",
    fontFamily: "var(--font-family-supreme)",
    animation: exiting ? exitAnim : enterAnim,
    display: "flex",
    flexDirection: "column",
    ...(side === "right" ? { top: 0, right: 0, bottom: 0, width } : {}),
    ...(side === "left" ? { top: 0, left: 0, bottom: 0, width } : {}),
    ...(side === "top" ? { top: 0, left: 0, right: 0, maxHeight: "80vh" } : {}),
    ...(side === "bottom" ? { bottom: 0, left: 0, right: 0, maxHeight: "80vh" } : {}),
  }

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50"
        style={{
          backgroundColor: "var(--modal-overlay-bg)",
          animation: exiting
            ? "hx-sheet-overlay-out 300ms ease forwards"
            : "hx-sheet-overlay-in 200ms ease forwards",
        }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div style={panelStyle}>
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between border-b" style={{ padding: "var(--space-5) var(--space-6)", borderColor: "var(--border-subtle)" }}>
            <div>
              {title && (
                <h2 style={{
                  fontSize: "var(--text-h5)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-primary)",
                  lineHeight: "var(--lh-h5)",
                  fontFamily: "var(--font-family-supreme)",
                }}>
                  {title}
                </h2>
              )}
              {description && (
                <p style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--lh-body-sm)",
                  marginTop: "var(--space-1)",
                  fontFamily: "var(--font-family-supreme)",
                }}>
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="shrink-0 flex items-center justify-center rounded-full cursor-pointer"
              style={{
                width: 28,
                height: 28,
                color: "var(--color-text-tertiary)",
                backgroundColor: "transparent",
                border: "none",
                transition: "background var(--motion-hover)",
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--secondary-subtle)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "var(--space-6)" }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t" style={{ padding: "var(--space-4) var(--space-6)", borderColor: "var(--border-subtle)" }}>
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
