import {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
  type ReactNode,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useScrollbar } from "./use-scrollbar";

/* ── Grain texture SVG (same as search dialog) ── */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

/* ── Directional mask — stronger toward bottom ── */
const MASK_GRADIENT =
  "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.94) 60%, rgba(0,0,0,0.98) 100%)";

/* ── Types ─────────────────────────────────────── */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface HxModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal requests to close (overlay click, Esc, close button) */
  onClose: () => void;
  /** Modal width preset */
  size?: ModalSize;
  /** Custom max-width override (CSS value) */
  maxWidth?: string;
  /** Show the close (X) button in the header area — default true */
  showClose?: boolean;
  /** Close on overlay click — default true */
  closeOnOverlay?: boolean;
  /** Close on Escape key — default true */
  closeOnEsc?: boolean;
  /** Whether the body is scrollable when content overflows — default true */
  scrollable?: boolean;
  /** Center vertically — default true */
  centered?: boolean;
  children: ReactNode;
}

/* ── Internals context (lets sub-components read modal state) ── */
const ModalCtx = createContext<{ onClose: () => void; showClose: boolean }>({
  onClose: () => {},
  showClose: true,
});

/* ── Size → max-width map ───────────────────────── */
const SIZE_MAP: Record<ModalSize, string> = {
  sm: "400px",
  md: "520px",
  lg: "680px",
  xl: "860px",
  full: "calc(100vw - 64px)",
};

/* ── Root ──────────────────────────────────────── */
export function HxModal({
  open,
  onClose,
  size = "md",
  maxWidth,
  showClose = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  scrollable = true,
  centered = true,
  children,
}: HxModalProps) {
  /* two-phase mount: mounted → visible (for CSS transition) */
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Open → mount, then trigger visible on next frame */
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Trap focus inside modal */
  useEffect(() => {
    if (!mounted) return;
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      prev?.focus?.();
    };
  }, [mounted]);

  /* Lock body scroll */
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  /* Esc key */
  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    },
    [closeOnEsc, onClose],
  );

  if (!mounted) return null;

  const resolvedMaxWidth = maxWidth ?? SIZE_MAP[size];

  const panelStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: resolvedMaxWidth,
    maxHeight: scrollable ? "calc(100vh - 48px)" : undefined,
    backgroundColor: "var(--modal-bg)",
    color: "var(--modal-fg)",
    borderRadius: "var(--modal-radius)",
    boxShadow: "var(--modal-shadow)",
    border: "1px solid var(--modal-border)",
    transform: visible ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
    opacity: visible ? 1 : 0,
    transition:
      "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    overflow: "hidden",
    fontFamily: "var(--font-family-supreme)",
  };

  return createPortal(
    <ModalCtx.Provider value={{ onClose, showClose }}>
      {/* ── Layer 1: Frosted blur backdrop ── */}
      <div
        onClick={(e) => {
          if (closeOnOverlay && e.target === e.currentTarget) onClose();
        }}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backgroundColor: "var(--modal-overlay-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: MASK_GRADIENT,
          WebkitMaskImage: MASK_GRADIENT,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* ── Layer 2: Grain texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          opacity: visible ? 0.5 : 0,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
          mixBlendMode: "overlay",
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          maskImage: MASK_GRADIENT,
          WebkitMaskImage: MASK_GRADIENT,
        }}
      />

      {/* ── Layer 3: Positioning wrapper + dialog ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: centered ? "center" : "flex-start",
          justifyContent: "center",
          padding: centered ? "24px" : "80px 24px 24px",
          pointerEvents: "none",
        }}
        onKeyDown={handleKey}
        role="presentation"
      >
        {/* Click-away layer (behind dialog, same size as viewport) */}
        <div
          onClick={(e) => {
            if (closeOnOverlay && e.target === e.currentTarget) onClose();
          }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
          }}
        />

        {/* Dialog panel */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          style={{ ...panelStyle, pointerEvents: "auto" }}
        >
          {children}
        </div>
      </div>
    </ModalCtx.Provider>,
    document.body,
  );
}

/* ── Header ───────────────────────────────────── */
export function HxModalHeader({
  children,
  bordered = true,
}: {
  children: ReactNode;
  bordered?: boolean;
}) {
  const { onClose, showClose } = useContext(ModalCtx);

  return (
    <div
      className="shrink-0 flex items-start justify-between gap-4"
      style={{
        padding: "var(--modal-padding-y) var(--modal-padding-x)",
        borderBottom: bordered ? "1px solid var(--modal-header-border)" : "none",
      }}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {showClose && (
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="shrink-0 inline-flex items-center justify-center cursor-pointer transition-colors duration-150"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "var(--radius-circle)",
            backgroundColor: "transparent",
            color: "var(--modal-close-fg)",
            border: "none",
            marginTop: "-2px",
            marginRight: "-4px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--modal-close-hover-bg)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

/* ── Title ────────────────────────────────────── */
export function HxModalTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "var(--text-base)",
        fontWeight: "var(--font-weight-bold)",
        color: "var(--modal-title-fg)",
        fontFamily: "var(--font-family-supreme)",
        lineHeight: 1.3,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

/* ── Description ──────────────────────────────── */
export function HxModalDescription({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: "var(--text-label)",
        color: "var(--modal-desc-fg)",
        fontFamily: "var(--font-family-supreme)",
        lineHeight: 1.5,
        margin: "4px 0 0",
      }}
    >
      {children}
    </p>
  );
}

/* ── Body (scrollable with custom scrollbar) ─── */
export function HxModalBody({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const scrollRef = useScrollbar<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
      style={{
        padding: "var(--modal-padding-y) var(--modal-padding-x)",
        color: "var(--modal-fg)",
        fontFamily: "var(--font-family-supreme)",
        fontSize: "var(--text-label)",
        lineHeight: 1.6,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Footer ───────────────────────────────────── */
export function HxModalFooter({
  children,
  bordered = true,
}: {
  children: ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className="shrink-0 flex items-center justify-end gap-3"
      style={{
        padding: "var(--modal-padding-y) var(--modal-padding-x)",
        borderTop: bordered ? "1px solid var(--modal-footer-border)" : "none",
      }}
    >
      {children}
    </div>
  );
}