import * as React from "react";
import { cn } from "./utils";
import { Check, X } from "lucide-react";

/* ── Types ─────────────────────────────────────────── */

export type StepStatus = "completed" | "active" | "pending" | "error";

export interface Step {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  status?: StepStatus;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
  onStepClick?: (index: number) => void;
  /** When true, connector between completed steps fills with brand color */
  connector?: boolean;
}

/* ── Helpers ───────────────────────────────────────── */

function resolveStatus(step: Step, index: number, activeStep: number): StepStatus {
  if (step.status) return step.status;
  if (index < activeStep) return "completed";
  if (index === activeStep) return "active";
  return "pending";
}

const sizeMap = {
  sm: "var(--stepper-indicator-size-sm)",
  md: "var(--stepper-indicator-size)",
  lg: "var(--stepper-indicator-size-lg)",
} as const;

const fontSizeMap = { sm: "10px", md: "12px", lg: "14px" } as const;
const iconSizeMap = { sm: 12, md: 14, lg: 16 } as const;
const labelSizeMap = { sm: "12px", md: "var(--text-label)", lg: "var(--text-base)" } as const;
const descSizeMap = { sm: "10px", md: "12px", lg: "var(--text-label)" } as const;

function getStatusStyles(status: StepStatus) {
  switch (status) {
    case "completed":
      return {
        bg: "var(--stepper-completed-bg)",
        fg: "var(--stepper-completed-fg)",
        border: "var(--stepper-completed-border)",
        label: "var(--stepper-label-completed)",
      };
    case "active":
      return {
        bg: "var(--stepper-active-bg)",
        fg: "var(--stepper-active-fg)",
        border: "var(--stepper-active-border)",
        label: "var(--stepper-label-active)",
      };
    case "error":
      return {
        bg: "var(--stepper-error-bg)",
        fg: "var(--stepper-error-fg)",
        border: "var(--stepper-error-border)",
        label: "var(--stepper-label-error)",
      };
    default:
      return {
        bg: "var(--stepper-pending-bg)",
        fg: "var(--stepper-pending-fg)",
        border: "var(--stepper-pending-border)",
        label: "var(--stepper-label-pending)",
      };
  }
}

/* ── StepIndicator ─────────────────────────────────── */

function StepIndicator({
  status,
  index,
  size,
  icon,
}: {
  status: StepStatus;
  index: number;
  size: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}) {
  const styles = getStatusStyles(status);
  const dim = sizeMap[size];
  const iconSize = iconSizeMap[size];

  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full transition-all duration-[var(--duration-medium-2)]"
      style={{
        width: dim,
        height: dim,
        backgroundColor: styles.bg,
        border: `var(--stepper-connector-thickness) solid ${styles.border}`,
        color: styles.fg,
        fontFamily: "var(--font-family-supreme)",
        fontSize: fontSizeMap[size],
        fontWeight: "var(--font-weight-medium)",
      }}
    >
      {status === "completed" ? (
        <Check size={iconSize} strokeWidth={2.5} style={{ animation: "hx-check-pop var(--duration-short-4) var(--ease-emphasized-decelerate)" }} />
      ) : status === "error" ? (
        <X size={iconSize} strokeWidth={2.5} style={{ animation: "hx-check-pop var(--duration-short-4) var(--ease-emphasized-decelerate)" }} />
      ) : icon ? (
        icon
      ) : (
        <span>{index + 1}</span>
      )}
    </div>
  );
}

/* ── Connector ─────────────────────────────────────── */

function Connector({
  completed,
  orientation,
  size,
}: {
  completed: boolean;
  orientation: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
}) {
  const color = completed
    ? "var(--stepper-connector-completed)"
    : "var(--stepper-connector-default)";

  if (orientation === "horizontal") {
    return (
      <div
        className="flex-1 self-center transition-colors duration-[var(--duration-medium-2)]"
        style={{
          height: "var(--stepper-connector-thickness)",
          backgroundColor: color,
          minWidth: "24px",
        }}
      />
    );
  }

  /* vertical */
  const leftOffset = size === "sm" ? "11px" : size === "lg" ? "19px" : "15px";
  return (
    <div
      className="transition-colors duration-[var(--duration-medium-2)]"
      style={{
        width: "var(--stepper-connector-thickness)",
        backgroundColor: color,
        minHeight: "24px",
        flexGrow: 1,
        marginLeft: leftOffset,
      }}
    />
  );
}

/* ── Stepper (Horizontal) ──────────────────────────── */

function HorizontalStepper({
  steps,
  activeStep,
  size,
  clickable,
  onStepClick,
  orientation: _o,
  connector: _c,
  className,
  ...props
}: StepperProps) {
  const s = size ?? "md";
  const active = activeStep ?? 0;

  return (
    <div
      className={cn("flex items-start w-full", className)}
      style={{ fontFamily: "var(--font-family-supreme)" }}
      {...props}
    >
      {steps.map((step, i) => {
        const status = resolveStatus(step, i, active);
        const styles = getStatusStyles(status);
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="contents">
            <div
              className={cn(
                "flex flex-col items-center gap-[6px] min-w-0",
                clickable && status !== "pending" && "cursor-pointer"
              )}
              onClick={
                clickable && onStepClick ? () => onStepClick(i) : undefined
              }
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              onKeyDown={
                clickable && onStepClick
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onStepClick(i);
                      }
                    }
                  : undefined
              }
            >
              <StepIndicator
                status={status}
                index={i}
                size={s}
                icon={step.icon}
              />
              <div className="flex flex-col items-center text-center max-w-[120px]">
                <span
                  className="transition-colors duration-[var(--duration-medium-2)]"
                  style={{
                    fontSize: labelSizeMap[s],
                    fontWeight: "var(--font-weight-medium)",
                    color: styles.label,
                    lineHeight: "1.3",
                    fontFamily: "var(--font-family-supreme)",
                  }}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span
                    style={{
                      fontSize: descSizeMap[s],
                      color: "var(--stepper-desc-color)",
                      lineHeight: "1.3",
                      marginTop: "2px",
                      fontFamily: "var(--font-family-supreme)",
                    }}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </div>
            {!isLast && (
              <Connector
                completed={i < active}
                orientation="horizontal"
                size={s}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Stepper (Vertical) ────────────────────────────── */

function VerticalStepper({
  steps,
  activeStep,
  size,
  clickable,
  onStepClick,
  orientation: _o,
  connector: _c,
  className,
  ...props
}: StepperProps) {
  const s = size ?? "md";
  const active = activeStep ?? 0;

  return (
    <div
      className={cn("flex flex-col", className)}
      style={{ fontFamily: "var(--font-family-supreme)" }}
      {...props}
    >
      {steps.map((step, i) => {
        const status = resolveStatus(step, i, active);
        const styles = getStatusStyles(status);
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="flex">
            {/* Indicator + connector column */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  clickable && status !== "pending" && "cursor-pointer"
                )}
                onClick={
                  clickable && onStepClick ? () => onStepClick(i) : undefined
                }
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={
                  clickable && onStepClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onStepClick(i);
                        }
                      }
                    : undefined
                }
              >
                <StepIndicator
                  status={status}
                  index={i}
                  size={s}
                  icon={step.icon}
                />
              </div>
              {!isLast && (
                <Connector
                  completed={i < active}
                  orientation="vertical"
                  size={s}
                />
              )}
            </div>

            {/* Label / description */}
            <div
              className={cn(
                "flex flex-col min-w-0 pl-[12px]",
                clickable && status !== "pending" && "cursor-pointer"
              )}
              style={{ paddingTop: s === "sm" ? "2px" : s === "lg" ? "8px" : "4px" }}
              onClick={
                clickable && onStepClick ? () => onStepClick(i) : undefined
              }
            >
              <span
                className="transition-colors duration-[var(--duration-medium-2)]"
                style={{
                  fontSize: labelSizeMap[s],
                  fontWeight: "var(--font-weight-medium)",
                  color: styles.label,
                  lineHeight: "1.3",
                  fontFamily: "var(--font-family-supreme)",
                }}
              >
                {step.label}
              </span>
              {step.description && (
                <span
                  style={{
                    fontSize: descSizeMap[s],
                    color: "var(--stepper-desc-color)",
                    lineHeight: "1.4",
                    marginTop: "2px",
                    fontFamily: "var(--font-family-supreme)",
                    paddingBottom: isLast ? "0" : "16px",
                  }}
                >
                  {step.description}
                </span>
              )}
              {!step.description && !isLast && <div style={{ height: "16px" }} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main export ───────────────────────────────────── */

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => {
    const { orientation = "horizontal", ...rest } = props;
    if (orientation === "vertical") {
      return <VerticalStepper ref={ref} {...rest} orientation="vertical" />;
    }
    return <HorizontalStepper ref={ref} {...rest} orientation="horizontal" />;
  }
);
Stepper.displayName = "Stepper";