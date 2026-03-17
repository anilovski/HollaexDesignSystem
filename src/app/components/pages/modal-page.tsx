import { useState } from "react";
import {
  ComponentPage,
  Section,
  ExampleRow,
  ExampleGrid,
} from "../docs/component-page";
import {
  HxModal,
  HxModalHeader,
  HxModalTitle,
  HxModalDescription,
  HxModalBody,
  HxModalFooter,
} from "../ui/hx-modal";
import type { ModalSize } from "../ui/hx-modal";
import {
  AlertTriangle,
  Trash2,
  Settings,
  CreditCard,
  User,
  Shield,
  FileText,
  CheckCircle2,
  Info,
} from "lucide-react";

/* ── Shared demo button ──────────────────────── */
function DemoBtn({
  children,
  onClick,
  variant = "secondary",
  size = "md",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md";
  disabled?: boolean;
}) {
  const h = size === "sm" ? "32px" : "36px";
  const px = size === "sm" ? "12px" : "16px";
  const fs = size === "sm" ? "12px" : "var(--text-label)";

  const vars: Record<
    string,
    { base: React.CSSProperties; hover: React.CSSProperties; active: React.CSSProperties }
  > = {
    primary: {
      base: {
        backgroundColor: "var(--brand-default)",
        color: "var(--brand-fg)",
        border: "none",
      },
      hover: { backgroundColor: "var(--brand-hover)" },
      active: { backgroundColor: "var(--brand-active)" },
    },
    secondary: {
      base: {
        backgroundColor: "var(--secondary)",
        color: "var(--color-text-primary)",
        border: "1px solid var(--border)",
      },
      hover: { backgroundColor: "var(--secondary-subtle-hover)" },
      active: { backgroundColor: "var(--secondary-active)", borderColor: "var(--border)" },
    },
    outline: {
      base: {
        backgroundColor: "transparent",
        color: "var(--outline-secondary-color)",
        border: "1px solid var(--border)",
      },
      hover: {
        backgroundColor: "var(--secondary-subtle)",
        color: "var(--outline-secondary-hover-color)",
      },
      active: {
        backgroundColor: "var(--secondary-subtle-hover)",
        color: "var(--outline-secondary-active-color)",
      },
    },
    danger: {
      base: {
        backgroundColor: "var(--danger-default)",
        color: "var(--danger-fg)",
        border: "none",
      },
      hover: { backgroundColor: "var(--danger-hover)" },
      active: { backgroundColor: "var(--danger-active)" },
    },
    ghost: {
      base: {
        backgroundColor: "transparent",
        color: "var(--color-text-secondary)",
        border: "1px solid transparent",
      },
      hover: { backgroundColor: "var(--secondary-subtle)", color: "var(--color-text-primary)" },
      active: { backgroundColor: "var(--secondary-subtle-hover)", color: "var(--color-text-primary)" },
    },
  };

  const v = vars[variant];

  const applyState = (
    el: HTMLButtonElement,
    state: React.CSSProperties,
  ) => {
    Object.entries(state).forEach(([key, val]) => {
      (el.style as any)[key] = val;
    });
  };

  const resetToBase = (el: HTMLButtonElement) => {
    applyState(el, v.base);
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) applyState(e.currentTarget, v.hover);
      }}
      onMouseLeave={(e) => {
        if (!disabled) resetToBase(e.currentTarget);
      }}
      onMouseDown={(e) => {
        if (!disabled) applyState(e.currentTarget, v.active);
      }}
      onMouseUp={(e) => {
        if (!disabled) applyState(e.currentTarget, v.hover);
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        fontFamily: "var(--font-family-supreme)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: fs,
        borderRadius: "var(--radius-button)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
        height: h,
        padding: `0 ${px}`,
        opacity: disabled ? 0.5 : 1,
        ...v.base,
      }}
    >
      {children}
    </button>
  );
}

/* ── Helpers ──────────────────────────────────── */
function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "var(--text-label)",
        color: "var(--modal-desc-fg)",
        fontFamily: "var(--font-family-supreme)",
        lineHeight: 1.6,
        margin: "0 0 12px",
      }}
    >
      {children}
    </p>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "12px",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-family-supreme)",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          height: "40px",
          padding: "0 12px",
          fontSize: "var(--text-label)",
          fontFamily: "var(--font-family-supreme)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
          backgroundColor: "var(--input-background)",
          color: "var(--color-text-primary)",
          outline: "none",
          transition: "border-color 0.15s ease",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--brand-default)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--border)")
        }
      />
    </div>
  );
}

/* ── Tokens table row helper ─────────────────── */
function TokenRow({
  token,
  desc,
}: {
  token: string;
  desc: string;
}) {
  return (
    <tr>
      <td
        style={{
          padding: "10px 16px",
          fontFamily: "var(--font-family-mono)",
          fontSize: "12px",
          color: "var(--color-text-brand)",
          whiteSpace: "nowrap",
        }}
      >
        {token}
      </td>
      <td
        style={{
          padding: "10px 16px",
          fontSize: "var(--text-label)",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-family-supreme)",
        }}
      >
        {desc}
      </td>
    </tr>
  );
}

/* ══════════════════════════════════════════════ */
/*                   PAGE                        */
/* ══════════════════════════════════════════════ */
export function ModalPage() {
  /* Demo open-state for each example */
  const [basic, setBasic] = useState(false);
  const [sizeSm, setSizeSm] = useState(false);
  const [sizeMd, setSizeMd] = useState(false);
  const [sizeLg, setSizeLg] = useState(false);
  const [sizeXl, setSizeXl] = useState(false);
  const [sizeFull, setSizeFull] = useState(false);
  const [scrollLong, setScrollLong] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [danger, setDanger] = useState(false);
  const [form, setForm] = useState(false);
  const [info, setInfo] = useState(false);
  const [noHeader, setNoHeader] = useState(false);
  const [noFooter, setNoFooter] = useState(false);
  const [noOverlayClose, setNoOverlayClose] = useState(false);
  const [custom, setCustom] = useState(false);
  const [nested, setNested] = useState(false);
  const [nestedInner, setNestedInner] = useState(false);

  /* Playground state */
  const [pgSize, setPgSize] = useState<ModalSize>("md");
  const [pgCentered, setPgCentered] = useState(true);
  const [pgShowClose, setPgShowClose] = useState(true);
  const [pgCloseOverlay, setPgCloseOverlay] = useState(true);
  const [pgOpen, setPgOpen] = useState(false);

  return (
    <ComponentPage
      name="Modal"
      description="A dialog overlay that captures focus and blocks interaction with the page beneath. Supports scrollable bodies, multiple sizes, header/body/footer composition, and full dark mode."
    >
      {/* ── 1. Basic usage ─────────────────────────── */}
      <Section
        title="Basic usage"
        description="A minimal modal with a header, body text, and a footer with action buttons."
      >
        <ExampleRow label="Default">
          <DemoBtn onClick={() => setBasic(true)}>Open modal</DemoBtn>
        </ExampleRow>

        <HxModal open={basic} onClose={() => setBasic(false)}>
          <HxModalHeader>
            <HxModalTitle>Welcome</HxModalTitle>
            <HxModalDescription>
              This is a basic modal with header, body, and footer sections.
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            <Paragraph>
              Modals are used to display content that temporarily blocks
              interaction with the main view. They&apos;re ideal for
              confirmations, forms, and focused tasks.
            </Paragraph>
            <Paragraph>
              Click the close button, press Escape, or click the overlay to
              dismiss.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setBasic(false)}>
              Cancel
            </DemoBtn>
            <DemoBtn variant="primary" onClick={() => setBasic(false)}>
              Got it
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 2. Sizes ───────────────────────────────── */}
      <Section
        title="Sizes"
        description="Five width presets: sm (400px), md (520px), lg (680px), xl (860px), and full (viewport minus 64px)."
      >
        <ExampleRow label="Width presets">
          <DemoBtn onClick={() => setSizeSm(true)} size="sm">sm · 400px</DemoBtn>
          <DemoBtn onClick={() => setSizeMd(true)} size="sm">md · 520px</DemoBtn>
          <DemoBtn onClick={() => setSizeLg(true)} size="sm">lg · 680px</DemoBtn>
          <DemoBtn onClick={() => setSizeXl(true)} size="sm">xl · 860px</DemoBtn>
          <DemoBtn onClick={() => setSizeFull(true)} size="sm">full</DemoBtn>
        </ExampleRow>

        {(["sm", "md", "lg", "xl", "full"] as ModalSize[]).map((s) => {
          const setters: Record<string, (v: boolean) => void> = {
            sm: setSizeSm,
            md: setSizeMd,
            lg: setSizeLg,
            xl: setSizeXl,
            full: setSizeFull,
          };
          const states: Record<string, boolean> = {
            sm: sizeSm,
            md: sizeMd,
            lg: sizeLg,
            xl: sizeXl,
            full: sizeFull,
          };
          return (
            <HxModal
              key={s}
              open={states[s]}
              onClose={() => setters[s](false)}
              size={s}
            >
              <HxModalHeader>
                <HxModalTitle>Size: {s}</HxModalTitle>
              </HxModalHeader>
              <HxModalBody>
                <Paragraph>
                  This modal uses the <strong>{s}</strong> size preset.
                </Paragraph>
              </HxModalBody>
              <HxModalFooter>
                <DemoBtn variant="primary" onClick={() => setters[s](false)}>
                  Close
                </DemoBtn>
              </HxModalFooter>
            </HxModal>
          );
        })}
      </Section>

      {/* ── 3. Scrollable body ─────────────────────── */}
      <Section
        title="Scrollable body"
        description="When body content exceeds the viewport, the body section scrolls independently while the header and footer stay fixed."
      >
        <ExampleRow label="Long content">
          <DemoBtn onClick={() => setScrollLong(true)}>
            Open scrollable modal
          </DemoBtn>
        </ExampleRow>

        <HxModal open={scrollLong} onClose={() => setScrollLong(false)} size="md">
          <HxModalHeader>
            <HxModalTitle>Terms of Service</HxModalTitle>
            <HxModalDescription>
              Please read and accept the following terms.
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            {Array.from({ length: 20 }, (_, i) => (
              <Paragraph key={i}>
                {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </Paragraph>
            ))}
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setScrollLong(false)}>
              Decline
            </DemoBtn>
            <DemoBtn variant="primary" onClick={() => setScrollLong(false)}>
              Accept
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 4. Confirmation dialog ─────────────────── */}
      <Section
        title="Confirmation dialog"
        description="A focused confirmation prompt with an icon, title, and action buttons."
      >
        <ExampleRow label="Confirm action">
          <DemoBtn onClick={() => setConfirm(true)}>Save changes</DemoBtn>
        </ExampleRow>

        <HxModal open={confirm} onClose={() => setConfirm(false)} size="sm">
          <HxModalHeader>
            <HxModalTitle>Save changes?</HxModalTitle>
            <HxModalDescription>
              You have unsaved changes. Would you like to save them before
              leaving?
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "var(--radius-card)",
                backgroundColor: "var(--alert-info-bg)",
                border: "1px solid var(--alert-info-border)",
              }}
            >
              <Info size={18} style={{ color: "var(--alert-info-icon)", flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "var(--font-family-supreme)",
                  color: "var(--alert-info-title)",
                  lineHeight: 1.4,
                }}
              >
                Your draft will be lost if you don&apos;t save.
              </span>
            </div>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setConfirm(false)}>
              Discard
            </DemoBtn>
            <DemoBtn variant="primary" onClick={() => setConfirm(false)}>
              Save
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 5. Destructive / Danger dialog ───────── */}
      <Section
        title="Destructive action"
        description="A dangerous action modal with a red CTA and warning icon."
      >
        <ExampleRow label="Delete">
          <DemoBtn variant="danger" onClick={() => setDanger(true)}>
            <Trash2 size={14} /> Delete account
          </DemoBtn>
        </ExampleRow>

        <HxModal open={danger} onClose={() => setDanger(false)} size="sm">
          <HxModalHeader>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius)",
                  backgroundColor: "var(--danger-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <AlertTriangle size={16} style={{ color: "var(--danger-default)" }} />
              </div>
              <div>
                <HxModalTitle>Delete account</HxModalTitle>
                <HxModalDescription>
                  This action cannot be undone.
                </HxModalDescription>
              </div>
            </div>
          </HxModalHeader>
          <HxModalBody>
            <Paragraph>
              All your data, including transaction history, API keys, and
              settings will be permanently deleted. This action is irreversible.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setDanger(false)}>
              Cancel
            </DemoBtn>
            <DemoBtn variant="danger" onClick={() => setDanger(false)}>
              Delete permanently
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 6. Form modal ──────────────────────────── */}
      <Section
        title="Form modal"
        description="Modal containing form inputs. The body scrolls if the form is long; the footer stays pinned."
      >
        <ExampleRow label="Edit profile">
          <DemoBtn onClick={() => setForm(true)}>
            <User size={14} /> Edit profile
          </DemoBtn>
        </ExampleRow>

        <HxModal open={form} onClose={() => setForm(false)} size="md">
          <HxModalHeader>
            <HxModalTitle>Edit profile</HxModalTitle>
            <HxModalDescription>
              Update your personal information below.
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <FormField label="First name" placeholder="John" />
                <FormField label="Last name" placeholder="Doe" />
              </div>
              <FormField label="Email" placeholder="john@hollaex.com" type="email" />
              <FormField label="Phone" placeholder="+1 (555) 123-4567" type="tel" />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-family-supreme)",
                  }}
                >
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself..."
                  rows={4}
                  style={{
                    padding: "10px 12px",
                    fontSize: "var(--text-label)",
                    fontFamily: "var(--font-family-supreme)",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--input-background)",
                    color: "var(--color-text-primary)",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>
            </div>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setForm(false)}>
              Cancel
            </DemoBtn>
            <DemoBtn variant="primary" onClick={() => setForm(false)}>
              Save changes
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 7. Info / read-only modal ──────────────── */}
      <Section
        title="Information modal"
        description="Display-only modal with rich content: icons, cards, and structured information."
      >
        <ExampleRow label="Account info">
          <DemoBtn onClick={() => setInfo(true)}>
            <Shield size={14} /> View security info
          </DemoBtn>
        </ExampleRow>

        <HxModal open={info} onClose={() => setInfo(false)} size="md">
          <HxModalHeader>
            <HxModalTitle>Security overview</HxModalTitle>
            <HxModalDescription>
              Your current account security settings.
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            {[
              { icon: <Shield size={16} />, label: "Two-factor authentication", value: "Enabled", ok: true },
              { icon: <CreditCard size={16} />, label: "Payment method", value: "Visa •••• 4242", ok: true },
              { icon: <Settings size={16} />, label: "API access", value: "3 active keys", ok: true },
              { icon: <FileText size={16} />, label: "KYC verification", value: "Pending review", ok: false },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--modal-header-border)",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius)",
                    backgroundColor: "var(--secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-text-secondary)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "var(--text-label)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--modal-title-fg)",
                      fontFamily: "var(--font-family-supreme)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--modal-desc-fg)",
                      fontFamily: "var(--font-family-supreme)",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
                {item.ok ? (
                  <CheckCircle2
                    size={16}
                    style={{ color: "var(--alert-success-icon)", flexShrink: 0 }}
                  />
                ) : (
                  <AlertTriangle
                    size={16}
                    style={{ color: "var(--alert-warning-icon)", flexShrink: 0 }}
                  />
                )}
              </div>
            ))}
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="primary" onClick={() => setInfo(false)}>
              Done
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 8. Composition variants ───────────────── */}
      <Section
        title="Composition variants"
        description="Header, body, and footer are all optional sub-components. Mix and match as needed."
      >
        <ExampleRow label="No header / No footer">
          <DemoBtn onClick={() => setNoHeader(true)} size="sm">
            No header
          </DemoBtn>
          <DemoBtn onClick={() => setNoFooter(true)} size="sm">
            No footer
          </DemoBtn>
        </ExampleRow>

        {/* No header */}
        <HxModal open={noHeader} onClose={() => setNoHeader(false)} size="sm">
          <HxModalBody>
            <Paragraph>
              This modal has no header — just body content and a footer. The
              close button is still accessible via overlay click or Escape.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="primary" onClick={() => setNoHeader(false)}>
              Close
            </DemoBtn>
          </HxModalFooter>
        </HxModal>

        {/* No footer */}
        <HxModal open={noFooter} onClose={() => setNoFooter(false)} size="sm">
          <HxModalHeader>
            <HxModalTitle>Notification</HxModalTitle>
          </HxModalHeader>
          <HxModalBody>
            <Paragraph>
              This modal has no footer. Use the X button or Escape to close.
            </Paragraph>
          </HxModalBody>
        </HxModal>
      </Section>

      {/* ── 9. Overlay close disabled ─────────────── */}
      <Section
        title="Persistent modal"
        description="Prevent dismissal via overlay click when you need the user to explicitly act."
      >
        <ExampleRow label="closeOnOverlay = false">
          <DemoBtn onClick={() => setNoOverlayClose(true)}>
            Open persistent modal
          </DemoBtn>
        </ExampleRow>

        <HxModal
          open={noOverlayClose}
          onClose={() => setNoOverlayClose(false)}
          closeOnOverlay={false}
          size="sm"
        >
          <HxModalHeader>
            <HxModalTitle>Action required</HxModalTitle>
            <HxModalDescription>
              You must choose an option — clicking the overlay won&apos;t close
              this modal.
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            <Paragraph>
              Use the close button (X) or one of the footer buttons to dismiss.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn
              variant="ghost"
              onClick={() => setNoOverlayClose(false)}
            >
              Skip
            </DemoBtn>
            <DemoBtn
              variant="primary"
              onClick={() => setNoOverlayClose(false)}
            >
              Continue
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 10. Custom content ─────────────────────── */}
      <Section
        title="Custom content"
        description="The body slot accepts any content: images, cards, grids, lists — whatever fits your use case."
      >
        <ExampleRow label="Mixed content">
          <DemoBtn onClick={() => setCustom(true)}>Open custom modal</DemoBtn>
        </ExampleRow>

        <HxModal open={custom} onClose={() => setCustom(false)} size="lg">
          <HxModalHeader>
            <HxModalTitle>Account summary</HxModalTitle>
            <HxModalDescription>
              Quick overview of your exchange activity.
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {[
                { label: "Total balance", value: "$12,847.32", change: "+2.4%" },
                { label: "Open orders", value: "7", change: "3 buy / 4 sell" },
                { label: "30d volume", value: "$89,412", change: "+18.2%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--radius-card)",
                    backgroundColor: "var(--secondary)",
                    border: "1px solid var(--modal-border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--modal-desc-fg)",
                      fontFamily: "var(--font-family-supreme)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--modal-title-fg)",
                      fontFamily: "var(--font-family-supreme)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--alert-success-icon)",
                      fontFamily: "var(--font-family-supreme)",
                      marginTop: "4px",
                    }}
                  >
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
            <Paragraph>
              This demonstrates that the modal body can contain any layout —
              stat cards, tables, charts, or custom components.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setCustom(false)}>
              Close
            </DemoBtn>
            <DemoBtn variant="primary" onClick={() => setCustom(false)}>
              View full dashboard
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 11. Nested modals ──────────────────────── */}
      <Section
        title="Nested modals"
        description="Modals can open other modals. Each stacks with its own overlay."
      >
        <ExampleRow label="Stacked">
          <DemoBtn onClick={() => setNested(true)}>Open first modal</DemoBtn>
        </ExampleRow>

        <HxModal open={nested} onClose={() => setNested(false)} size="md">
          <HxModalHeader>
            <HxModalTitle>First modal</HxModalTitle>
          </HxModalHeader>
          <HxModalBody>
            <Paragraph>
              This is the outer modal. Click the button below to open a nested
              modal on top.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setNested(false)}>
              Close
            </DemoBtn>
            <DemoBtn variant="primary" onClick={() => setNestedInner(true)}>
              Open nested modal
            </DemoBtn>
          </HxModalFooter>
        </HxModal>

        <HxModal
          open={nestedInner}
          onClose={() => setNestedInner(false)}
          size="sm"
        >
          <HxModalHeader>
            <HxModalTitle>Nested modal</HxModalTitle>
          </HxModalHeader>
          <HxModalBody>
            <Paragraph>
              This modal is stacked on top of the first. Close it to return to
              the outer modal.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="primary" onClick={() => setNestedInner(false)}>
              Close nested
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 12. Playground ─────────────────────────── */}
      <Section
        title="Playground"
        description="Configure modal props interactively to see how they combine."
      >
        <ExampleGrid label="Configuration">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              alignItems: "flex-end",
            }}
          >
            {/* Size selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-family-supreme)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Size
              </span>
              <div style={{ display: "flex", gap: "4px" }}>
                {(["sm", "md", "lg", "xl", "full"] as ModalSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setPgSize(s)}
                    style={{
                      padding: "4px 10px",
                      fontSize: "12px",
                      fontFamily: "var(--font-family-supreme)",
                      fontWeight: "var(--font-weight-medium)",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      backgroundColor:
                        pgSize === s
                          ? "var(--brand-default)"
                          : "var(--secondary)",
                      color:
                        pgSize === s
                          ? "var(--brand-fg)"
                          : "var(--color-text-primary)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle: centered */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontFamily: "var(--font-family-supreme)",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={pgCentered}
                onChange={(e) => setPgCentered(e.target.checked)}
              />
              Centered
            </label>

            {/* Toggle: showClose */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontFamily: "var(--font-family-supreme)",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={pgShowClose}
                onChange={(e) => setPgShowClose(e.target.checked)}
              />
              Show close
            </label>

            {/* Toggle: closeOnOverlay */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontFamily: "var(--font-family-supreme)",
                color: "var(--color-text-primary)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={pgCloseOverlay}
                onChange={(e) => setPgCloseOverlay(e.target.checked)}
              />
              Close on overlay
            </label>
          </div>

          <div style={{ marginTop: "16px" }}>
            <DemoBtn variant="primary" onClick={() => setPgOpen(true)}>
              Open playground modal
            </DemoBtn>
          </div>
        </ExampleGrid>

        <HxModal
          open={pgOpen}
          onClose={() => setPgOpen(false)}
          size={pgSize}
          centered={pgCentered}
          showClose={pgShowClose}
          closeOnOverlay={pgCloseOverlay}
        >
          <HxModalHeader>
            <HxModalTitle>Playground modal</HxModalTitle>
            <HxModalDescription>
              size=&quot;{pgSize}&quot; · centered={String(pgCentered)} ·
              showClose={String(pgShowClose)} · closeOnOverlay=
              {String(pgCloseOverlay)}
            </HxModalDescription>
          </HxModalHeader>
          <HxModalBody>
            <Paragraph>
              Adjust the configuration above and reopen to see changes. This
              body can hold any content.
            </Paragraph>
          </HxModalBody>
          <HxModalFooter>
            <DemoBtn variant="ghost" onClick={() => setPgOpen(false)}>
              Cancel
            </DemoBtn>
            <DemoBtn variant="primary" onClick={() => setPgOpen(false)}>
              Confirm
            </DemoBtn>
          </HxModalFooter>
        </HxModal>
      </Section>

      {/* ── 13. API reference ──────────────────────── */}
      <Section title="API reference">
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "var(--table-header-bg)",
                  borderBottom: "1px solid var(--table-border)",
                }}
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "var(--font-weight-bold)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--table-header-fg)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["open", "boolean", "—", "Controls visibility"],
                ["onClose", "() => void", "—", "Called when the modal requests to close"],
                ["size", '"sm" | "md" | "lg" | "xl" | "full"', '"md"', "Width preset"],
                ["maxWidth", "string", "—", "Custom CSS max-width override"],
                ["showClose", "boolean", "true", "Show close (X) button in header"],
                ["closeOnOverlay", "boolean", "true", "Close when clicking the overlay"],
                ["closeOnEsc", "boolean", "true", "Close on Escape key"],
                ["scrollable", "boolean", "true", "Enable body scrolling when content overflows"],
                ["centered", "boolean", "true", "Vertically center the modal"],
              ].map(([prop, type, def, desc]) => (
                <tr
                  key={prop}
                  style={{
                    borderBottom: "1px solid var(--table-border)",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 16px",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "12px",
                      color: "var(--color-text-brand)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {prop}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "12px",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {type}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "12px",
                      color: "var(--color-text-tertiary)",
                    }}
                  >
                    {def}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: "var(--text-label)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── 14. Sub-components ─────────────────────── */}
      <Section title="Sub-components">
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "var(--table-header-bg)",
                  borderBottom: "1px solid var(--table-border)",
                }}
              >
                {["Component", "Description"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "var(--font-weight-bold)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--table-header-fg)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["HxModal", "Root container. Renders overlay + dialog panel via portal."],
                ["HxModalHeader", "Optional header slot with close button. Accepts bordered prop."],
                ["HxModalTitle", "Styled h2 for the modal title."],
                ["HxModalDescription", "Secondary descriptive text below the title."],
                ["HxModalBody", "Scrollable content area. Accepts any children."],
                ["HxModalFooter", "Optional footer slot for action buttons. Accepts bordered prop."],
              ].map(([comp, desc]) => (
                <tr
                  key={comp}
                  style={{
                    borderBottom: "1px solid var(--table-border)",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 16px",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "12px",
                      color: "var(--color-text-brand)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {comp}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: "var(--text-label)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── 15. CSS tokens reference ──────────────── */}
      <Section
        title="CSS tokens"
        description="All modal styling is driven by CSS variables. Override these in your theme to customise the modal."
      >
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "var(--table-header-bg)",
                  borderBottom: "1px solid var(--table-border)",
                }}
              >
                {["Token", "Purpose"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "var(--font-weight-bold)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--table-header-fg)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <TokenRow token="--modal-overlay-bg" desc="Overlay background colour" />
              <TokenRow token="--modal-bg" desc="Dialog panel background" />
              <TokenRow token="--modal-fg" desc="Default text colour inside the dialog" />
              <TokenRow token="--modal-border" desc="Dialog panel border" />
              <TokenRow token="--modal-shadow" desc="Dialog box-shadow" />
              <TokenRow token="--modal-header-border" desc="Bottom border of the header" />
              <TokenRow token="--modal-footer-border" desc="Top border of the footer" />
              <TokenRow token="--modal-title-fg" desc="Title text colour" />
              <TokenRow token="--modal-desc-fg" desc="Description text colour" />
              <TokenRow token="--modal-close-fg" desc="Close button icon colour" />
              <TokenRow token="--modal-close-hover-bg" desc="Close button hover background" />
              <TokenRow token="--modal-radius" desc="Dialog corner radius" />
              <TokenRow token="--modal-padding-x" desc="Horizontal padding for header/body/footer" />
              <TokenRow token="--modal-padding-y" desc="Vertical padding for header/body/footer" />
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── 16. Code example ──────────────────────── */}
      <Section title="Code example">
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div
            className="flex items-center border-b"
            style={{
              gap: "var(--space-4)",
              padding: "var(--space-4) var(--space-7)",
              backgroundColor: "var(--preview-header-bg)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: "var(--font-weight-bold)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              Usage
            </span>
          </div>
          <pre
            style={{
              padding: "20px 24px",
              margin: 0,
              fontSize: "13px",
              lineHeight: 1.6,
              fontFamily: "var(--font-family-mono)",
              color: "var(--color-text-primary)",
              backgroundColor: "var(--background)",
              overflowX: "auto",
            }}
          >
{`import {
  HxModal,
  HxModalHeader,
  HxModalTitle,
  HxModalDescription,
  HxModalBody,
  HxModalFooter,
} from "@hollaex/ui/hx-modal";

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>

      <HxModal
        open={open}
        onClose={() => setOpen(false)}
        size="md"
        scrollable
      >
        <HxModalHeader>
          <HxModalTitle>Title</HxModalTitle>
          <HxModalDescription>
            Optional description text.
          </HxModalDescription>
        </HxModalHeader>

        <HxModalBody>
          {/* Any content — scrollable when it overflows */}
          <p>Modal body content goes here.</p>
        </HxModalBody>

        <HxModalFooter>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={() => setOpen(false)}>Confirm</button>
        </HxModalFooter>
      </HxModal>
    </>
  );
}`}
          </pre>
        </div>
      </Section>
    </ComponentPage>
  );
}