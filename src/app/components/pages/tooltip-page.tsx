import { useState, forwardRef } from "react";
import {
  ComponentPage,
  Section,
  ExampleRow,
  ExampleGrid,
} from "../docs/component-page";
import { HxTooltip } from "../ui/hx-tooltip";
import type { HxTooltipProps } from "../ui/hx-tooltip";
import {
  Info,
  Settings,
  Copy,
  Download,
  Trash2,
  HelpCircle,
  Plus,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

/* ── Helper: demo button ─────────────────────── */
const DemoButton = forwardRef<
  HTMLButtonElement,
  {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
  }
>(function DemoButton({ children, icon, variant = "secondary", ...rest }, ref) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontFamily: "var(--font-family-supreme)",
    fontWeight: "var(--font-weight-medium)",
    fontSize: "var(--text-label)",
    borderRadius: "var(--radius-button)",
    cursor: "pointer",
    transition: "all 0.15s ease",
    height: "36px",
    padding: children ? "0 14px" : "0",
    width: children ? undefined : "36px",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--brand-default)",
      color: "var(--brand-fg)",
      border: "none",
    },
    secondary: {
      backgroundColor: "var(--secondary)",
      color: "var(--color-text-primary)",
      border: "1px solid var(--border)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-text-primary)",
      border: "1px solid var(--border)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-text-secondary)",
      border: "1px solid transparent",
    },
  };

  return (
    <button ref={ref} style={{ ...base, ...variants[variant] }} {...rest}>
      {icon}
      {children}
    </button>
  );
});

/* ── Helper: icon-only toolbar button ────────── */
const ToolbarButton = forwardRef<HTMLButtonElement, { icon: React.ReactNode }>(
  function ToolbarButton({ icon, ...rest }, ref) {
    return (
      <button
        ref={ref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          borderRadius: "var(--radius-xs)",
          backgroundColor: "transparent",
          color: "var(--color-text-secondary)",
          border: "1px solid transparent",
          cursor: "pointer",
          transition: "background-color 0.15s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--secondary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
        {...rest}
      >
        {icon}
      </button>
    );
  }
);

/* ── Playground state helpers ────────────────── */
type Placement = HxTooltipProps["placement"];
type Variant = HxTooltipProps["variant"];
type Size = HxTooltipProps["size"];

export function TooltipPage() {
  const [pgPlacement, setPgPlacement] = useState<Placement>("top");
  const [pgVariant, setPgVariant] = useState<Variant>("dark");
  const [pgSize, setPgSize] = useState<Size>("md");
  const [pgArrow, setPgArrow] = useState(true);
  const [pgDesc, setPgDesc] = useState(false);

  return (
    <ComponentPage
      name="Tooltip"
      description="Tooltips display brief, informative text when users hover over, focus on, or tap an element. They help provide additional context without cluttering the UI."
    >
      {/* ── 1. Default ────────────────────────── */}
      <Section
        title="Default"
        description="A basic tooltip that appears on hover with the default dark variant."
      >
        <ExampleRow label="Hover me">
          <HxTooltip label="This is a tooltip">
            <DemoButton icon={<Info size={16} />}>Hover me</DemoButton>
          </HxTooltip>
        </ExampleRow>
      </Section>

      {/* ── 2. Placements ─────────────────────── */}
      <Section
        title="Placement"
        description="Tooltips can be positioned on any side of the trigger element."
      >
        <ExampleRow label="Four directions">
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-5)" }}>
            {(["top", "right", "bottom", "left"] as const).map((p) => (
              <HxTooltip key={p} label={`Tooltip on ${p}`} placement={p}>
                <DemoButton variant="outline">
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </DemoButton>
              </HxTooltip>
            ))}
          </div>
        </ExampleRow>
      </Section>

      {/* ── 3. Variants ───────────────────────── */}
      <Section
        title="Variants"
        description="Three visual variants: dark (default), light, and brand."
      >
        <ExampleRow label="Dark">
          <HxTooltip label="Dark tooltip" variant="dark">
            <DemoButton variant="outline">Dark</DemoButton>
          </HxTooltip>
        </ExampleRow>
        <ExampleRow label="Light">
          <HxTooltip label="Light tooltip" variant="light">
            <DemoButton variant="outline">Light</DemoButton>
          </HxTooltip>
        </ExampleRow>
        <ExampleRow label="Brand">
          <HxTooltip label="Brand tooltip" variant="brand">
            <DemoButton variant="outline">Brand</DemoButton>
          </HxTooltip>
        </ExampleRow>
      </Section>

      {/* ── 4. Sizes ──────────────────────────── */}
      <Section
        title="Sizes"
        description="Three sizes: sm, md (default), and lg. Larger sizes accommodate more content."
      >
        <ExampleRow label="Size comparison">
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-5)" }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <HxTooltip
                key={s}
                label={`${s.toUpperCase()} tooltip`}
                description={
                  s === "lg"
                    ? "Larger tooltips can include a brief description for extra context."
                    : undefined
                }
                size={s}
              >
                <DemoButton variant="outline">
                  {s.toUpperCase()}
                </DemoButton>
              </HxTooltip>
            ))}
          </div>
        </ExampleRow>
      </Section>

      {/* ── 5. With description ───────────────── */}
      <Section
        title="With Description"
        description="Tooltips can include a secondary description line for additional context."
      >
        <ExampleRow label="Label + description">
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-5)" }}>
            <HxTooltip
              label="Copy to clipboard"
              description="The content will be copied to your system clipboard."
              variant="dark"
              size="lg"
            >
              <DemoButton icon={<Copy size={16} />} variant="outline">
                Copy
              </DemoButton>
            </HxTooltip>
            <HxTooltip
              label="Download file"
              description="This will download the file to your default location."
              variant="light"
              size="lg"
            >
              <DemoButton icon={<Download size={16} />} variant="outline">
                Download
              </DemoButton>
            </HxTooltip>
            <HxTooltip
              label="Delete item"
              description="This action cannot be undone. Proceed with caution."
              variant="brand"
              size="lg"
            >
              <DemoButton icon={<Trash2 size={16} />} variant="outline">
                Delete
              </DemoButton>
            </HxTooltip>
          </div>
        </ExampleRow>
      </Section>

      {/* ── 6. Without arrow ──────────────────── */}
      <Section
        title="Without Arrow"
        description="The directional arrow can be hidden for a more minimal appearance."
      >
        <ExampleRow label="No arrow">
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-5)" }}>
            {(["dark", "light", "brand"] as const).map((v) => (
              <HxTooltip
                key={v}
                label={`No arrow (${v})`}
                variant={v}
                arrow={false}
              >
                <DemoButton variant="outline">
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </DemoButton>
              </HxTooltip>
            ))}
          </div>
        </ExampleRow>
      </Section>

      {/* ── 7. Icon-only triggers ─────────────── */}
      <Section
        title="Icon-Only Triggers"
        description="Tooltips are essential for icon-only buttons to provide accessible labels."
      >
        <ExampleRow label="Icon buttons">
          <div className="flex items-center gap-1">
            <HxTooltip label="Add new" size="sm">
              <DemoButton icon={<Plus size={16} />} variant="ghost" />
            </HxTooltip>
            <HxTooltip label="Settings" size="sm">
              <DemoButton icon={<Settings size={16} />} variant="ghost" />
            </HxTooltip>
            <HxTooltip label="Help" size="sm">
              <DemoButton icon={<HelpCircle size={16} />} variant="ghost" />
            </HxTooltip>
          </div>
        </ExampleRow>
      </Section>

      {/* ── 8. Toolbar example ────────────────── */}
      <Section
        title="Toolbar Pattern"
        description="A common use case: tooltips on toolbar icon buttons to identify each action."
      >
        <ExampleGrid label="Text formatting toolbar">
          <div
            className="inline-flex items-center gap-0.5 p-1 rounded-lg border"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--background)",
            }}
          >
            <HxTooltip label="Bold" size="sm" placement="bottom">
              <ToolbarButton icon={<Bold size={16} />} />
            </HxTooltip>
            <HxTooltip label="Italic" size="sm" placement="bottom">
              <ToolbarButton icon={<Italic size={16} />} />
            </HxTooltip>
            <HxTooltip label="Underline" size="sm" placement="bottom">
              <ToolbarButton icon={<Underline size={16} />} />
            </HxTooltip>
            <div
              style={{
                width: "1px",
                height: "20px",
                backgroundColor: "var(--border)",
                margin: "0 4px",
              }}
            />
            <HxTooltip label="Align left" size="sm" placement="bottom">
              <ToolbarButton icon={<AlignLeft size={16} />} />
            </HxTooltip>
            <HxTooltip label="Align center" size="sm" placement="bottom">
              <ToolbarButton icon={<AlignCenter size={16} />} />
            </HxTooltip>
            <HxTooltip label="Align right" size="sm" placement="bottom">
              <ToolbarButton icon={<AlignRight size={16} />} />
            </HxTooltip>
          </div>
        </ExampleGrid>
      </Section>

      {/* ── 9. Delay variations ───────────────── */}
      <Section
        title="Delay Duration"
        description="Customise the delay before the tooltip appears. Instant (0ms), default (200ms), or slow (500ms)."
      >
        <ExampleRow label="Delay comparison">
          <div className="flex flex-wrap items-center" style={{ gap: "var(--space-5)" }}>
            <HxTooltip label="Instant (0ms)" delayDuration={0}>
              <DemoButton variant="outline">Instant</DemoButton>
            </HxTooltip>
            <HxTooltip label="Default (200ms)" delayDuration={200}>
              <DemoButton variant="outline">Default</DemoButton>
            </HxTooltip>
            <HxTooltip label="Slow (500ms)" delayDuration={500}>
              <DemoButton variant="outline">Slow</DemoButton>
            </HxTooltip>
          </div>
        </ExampleRow>
      </Section>

      {/* ── 10. Disabled ──────────────────────── */}
      <Section
        title="Disabled"
        description="When disabled, the tooltip is not shown and the trigger renders normally."
      >
        <ExampleRow label="Tooltip disabled">
          <HxTooltip label="You won't see this" disabled>
            <DemoButton variant="outline">Disabled tooltip</DemoButton>
          </HxTooltip>
        </ExampleRow>
      </Section>

      {/* ── 11. All Variants + Placements ─────── */}
      <Section
        title="Variant &times; Placement Matrix"
        description="Overview of every variant combined with each placement."
      >
        {(["dark", "light", "brand"] as const).map((v) => (
          <ExampleRow key={v} label={v.charAt(0).toUpperCase() + v.slice(1)}>
            <div className="flex flex-wrap items-center" style={{ gap: "var(--space-5)" }}>
              {(["top", "right", "bottom", "left"] as const).map((p) => (
                <HxTooltip
                  key={`${v}-${p}`}
                  label={`${v} / ${p}`}
                  variant={v}
                  placement={p}
                  size="sm"
                >
                  <DemoButton variant="outline">{p}</DemoButton>
                </HxTooltip>
              ))}
            </div>
          </ExampleRow>
        ))}
      </Section>

      {/* ── 12. Interactive Playground ─────────── */}
      <Section
        title="Playground"
        description="Experiment with tooltip configuration in real time."
      >
        <ExampleGrid label="Configure & preview">
          {/* Controls */}
          <div className="flex flex-wrap" style={{ gap: "var(--space-7)" }}>
            {/* Placement */}
            <ControlGroup label="Placement">
              {(["top", "right", "bottom", "left"] as const).map((p) => (
                <PillButton
                  key={p}
                  active={pgPlacement === p}
                  onClick={() => setPgPlacement(p)}
                >
                  {p}
                </PillButton>
              ))}
            </ControlGroup>
            {/* Variant */}
            <ControlGroup label="Variant">
              {(["dark", "light", "brand"] as const).map((v) => (
                <PillButton
                  key={v}
                  active={pgVariant === v}
                  onClick={() => setPgVariant(v)}
                >
                  {v}
                </PillButton>
              ))}
            </ControlGroup>
            {/* Size */}
            <ControlGroup label="Size">
              {(["sm", "md", "lg"] as const).map((s) => (
                <PillButton
                  key={s}
                  active={pgSize === s}
                  onClick={() => setPgSize(s)}
                >
                  {s}
                </PillButton>
              ))}
            </ControlGroup>
            {/* Arrow */}
            <ControlGroup label="Arrow">
              <PillButton active={pgArrow} onClick={() => setPgArrow(true)}>
                On
              </PillButton>
              <PillButton active={!pgArrow} onClick={() => setPgArrow(false)}>
                Off
              </PillButton>
            </ControlGroup>
            {/* Description */}
            <ControlGroup label="Description">
              <PillButton active={pgDesc} onClick={() => setPgDesc(true)}>
                On
              </PillButton>
              <PillButton active={!pgDesc} onClick={() => setPgDesc(false)}>
                Off
              </PillButton>
            </ControlGroup>
          </div>

          {/* Preview */}
          <div
            className="flex items-center justify-center rounded-lg border"
            style={{
              height: "160px",
              borderColor: "var(--border)",
              backgroundColor: "var(--secondary-subtle)",
            }}
          >
            <HxTooltip
              label="Playground tooltip"
              description={
                pgDesc
                  ? "This is an optional description to provide extra context."
                  : undefined
              }
              placement={pgPlacement}
              variant={pgVariant}
              size={pgSize}
              arrow={pgArrow}
            >
              <DemoButton variant="primary" icon={<Info size={16} />}>
                Hover to preview
              </DemoButton>
            </HxTooltip>
          </div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}

/* ── Playground helpers ──────────────────────── */

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        style={{
          fontSize: "10px",
          fontWeight: "var(--font-weight-bold)",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "var(--muted-foreground)",
          fontFamily: "var(--font-family-supreme)",
        }}
      >
        {label}
      </span>
      <div className="flex gap-1">{children}</div>
    </div>
  );
}

function PillButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "28px",
        padding: "0 10px",
        borderRadius: "var(--radius-chip)",
        fontSize: "11px",
        fontWeight: "var(--font-weight-medium)",
        fontFamily: "var(--font-family-supreme)",
        border: active ? "1px solid var(--brand-default)" : "1px solid var(--border)",
        backgroundColor: active ? "var(--brand-subtle)" : "transparent",
        color: active ? "var(--brand-default)" : "var(--color-text-secondary)",
        cursor: "pointer",
        transition: "all 0.15s ease",
        textTransform: "capitalize" as const,
      }}
    >
      {children}
    </button>
  );
}