import * as React from "react"
import { createContext, useContext, useCallback, useState, useEffect, useRef } from "react"
import { X, CheckCircle2, AlertTriangle, Info, XCircle, Copy } from "lucide-react"
import { cn } from "./utils"

/* ── Types ──────────────────────────────────────────── */
type ToastStatus = "info" | "success" | "warning" | "error" | "neutral"
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"

interface ToastData {
  id: string
  status: ToastStatus
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  duration?: number
}

interface ToastContextValue {
  toasts: ToastData[]
  addToast: (t: Omit<ToastData, "id">) => void
  removeToast: (id: string) => void
  position: ToastPosition
  setPosition: (p: ToastPosition) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>")
  return ctx
}

let _counter = 0

export function ToastProvider({ children, defaultPosition = "top-right" }: { children: React.ReactNode; defaultPosition?: ToastPosition }) {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [position, setPosition] = useState<ToastPosition>(defaultPosition)

  const addToast = useCallback((t: Omit<ToastData, "id">) => {
    const id = `toast-${++_counter}-${Date.now()}`
    setToasts(prev => [...prev, { ...t, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, position, setPosition }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  )
}

/* ── Viewport ─────────────────────────────────────── */
function ToastViewport() {
  const { toasts, position } = useToast()

  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "top-0 right-0 items-end",
    "top-left": "top-0 left-0 items-start",
    "bottom-right": "bottom-0 right-0 items-end",
    "bottom-left": "bottom-0 left-0 items-start",
    "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  }

  return (
    <div
      className={cn("fixed z-[9999] flex flex-col pointer-events-none", positionClasses[position])}
      style={{ padding: "var(--space-6)", gap: "var(--space-3)", maxWidth: 420 }}
    >
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} position={position} />
      ))}
    </div>
  )
}

/* ── Single Toast ──────────────────────────────────── */
const STATUS_ICON: Record<ToastStatus, React.ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle2 size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <XCircle size={18} />,
  neutral: <Copy size={18} />,
}

function ToastItem({ toast, position }: { toast: ToastData; position: ToastPosition }) {
  const { removeToast } = useToast()
  const [exiting, setExiting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const duration = toast.duration ?? 4000

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => setExiting(true), duration)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [duration])

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(() => removeToast(toast.id), 280)
      return () => clearTimeout(t)
    }
  }, [exiting, removeToast, toast.id])

  const handleClose = () => setExiting(true)

  const slideFrom = position.includes("right") ? "translateX(110%)" : position.includes("left") ? "translateX(-110%)" : position.includes("top") ? "translateY(-110%)" : "translateY(110%)"
  const slideTo = "translateX(0) translateY(0)"

  return (
    <div
      className="pointer-events-auto w-[360px] max-w-[calc(100vw-48px)] rounded-lg border overflow-hidden"
      style={{
        backgroundColor: "var(--toast-bg, var(--card))",
        borderColor: "var(--toast-border, var(--border-subtle))",
        boxShadow: "var(--toast-shadow, 0 8px 24px -8px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.04))",
        fontFamily: "var(--font-family-supreme)",
        animation: exiting
          ? `toast-exit 280ms var(--ease-emphasized-accelerate) forwards`
          : `toast-enter 380ms var(--ease-emphasized-decelerate) forwards`,
        ["--toast-slide-from" as string]: slideFrom,
        ["--toast-slide-to" as string]: slideTo,
      }}
    >
      <div className="flex items-start" style={{ padding: "var(--space-4) var(--space-5)", gap: "var(--space-3)" }}>
        <span
          className="shrink-0 flex items-center justify-center"
          style={{
            color: `var(--toast-icon-${toast.status})`,
            marginTop: 1,
          }}
        >
          {STATUS_ICON[toast.status]}
        </span>

        <div className="flex-1 min-w-0">
          <p style={{
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--toast-title-fg, var(--color-text-primary))",
            lineHeight: "var(--lh-body-sm)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {toast.title}
          </p>
          {toast.description && (
            <p style={{
              fontSize: "var(--text-caption)",
              color: "var(--toast-desc-fg, var(--color-text-secondary))",
              lineHeight: "var(--lh-caption)",
              marginTop: "var(--space-1)",
              fontFamily: "var(--font-family-supreme)",
            }}>
              {toast.description}
            </p>
          )}
          {toast.actionLabel && (
            <button
              type="button"
              onClick={() => { toast.onAction?.(); handleClose() }}
              className="cursor-pointer"
              style={{
                fontSize: "var(--text-caption)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--brand-default)",
                marginTop: "var(--space-2)",
                fontFamily: "var(--font-family-supreme)",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              {toast.actionLabel}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 flex items-center justify-center rounded-full cursor-pointer"
          style={{
            width: 24,
            height: 24,
            color: "var(--color-text-tertiary)",
            background: "transparent",
            border: "none",
            transition: "background var(--motion-hover)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--secondary-subtle)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <X size={14} />
        </button>
      </div>

      {/* Auto-dismiss progress bar */}
      {duration > 0 && !exiting && (
        <div style={{ height: 2, backgroundColor: "var(--border-subtle)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              backgroundColor: `var(--toast-icon-${toast.status})`,
              animation: `toast-progress ${duration}ms linear forwards`,
              transformOrigin: "left",
            }}
          />
        </div>
      )}
    </div>
  )
}

/* ── Keyframes (injected once) ─────────────────────── */
const STYLE_ID = "hx-toast-keyframes"
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style")
  style.id = STYLE_ID
  style.textContent = `
    @keyframes toast-enter {
      from { opacity: 0; transform: var(--toast-slide-from) scale(0.96); }
      to { opacity: 1; transform: var(--toast-slide-to) scale(1); }
    }
    @keyframes toast-exit {
      from { opacity: 1; transform: var(--toast-slide-to) scale(1); }
      to { opacity: 0; transform: var(--toast-slide-from) scale(0.96); }
    }
    @keyframes toast-progress {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
  `
  document.head.appendChild(style)
}

export { type ToastStatus, type ToastPosition }
