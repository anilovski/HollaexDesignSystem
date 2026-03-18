import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "../ui/input-otp";
import type { OTPSize } from "../ui/input-otp";
import { useState } from "react";

function OTPDemo({
  maxLength = 6,
  size = "md",
  variant = "gray",
  corners = "sharp",
  separated = true,
}: {
  maxLength?: number;
  size?: OTPSize;
  variant?: "gray" | "white";
  corners?: "sharp" | "rounded";
  separated?: boolean;
}) {
  const half = Math.ceil(maxLength / 2);
  const first = Array.from({ length: separated ? half : maxLength }, (_, i) => i);
  const second = separated ? Array.from({ length: maxLength - half }, (_, i) => i + half) : [];

  return (
    <InputOTP maxLength={maxLength} size={size} variant={variant} corners={corners}>
      <InputOTPGroup>
        {first.map((i) => (
          <InputOTPSlot key={i} index={i} size={size} variant={variant} corners={corners} />
        ))}
      </InputOTPGroup>
      {separated && second.length > 0 && (
        <>
          <InputOTPSeparator />
          <InputOTPGroup>
            {second.map((i) => (
              <InputOTPSlot key={i} index={i} size={size} variant={variant} corners={corners} />
            ))}
          </InputOTPGroup>
        </>
      )}
    </InputOTP>
  );
}

export function InputOTPPage() {
  const [controlledValue, setControlledValue] = useState("");

  return (
    <ComponentPage
      name="Input OTP"
      description="A one-time password input component with individual character slots. Used for 2FA verification, email confirmation codes, and phone verification flows."
    >
      {/* ── Styles ─────────────────────────────────────────── */}
      <Section title="Styles" description="Two background styles matching the text input system — gray (default) for on-white surfaces, and white (outlined) for on-gray surfaces.">
        <ExampleRow label="Gray (default)">
          <OTPDemo variant="gray" />
        </ExampleRow>
        <ExampleRow label="White / outlined">
          <OTPDemo variant="white" />
        </ExampleRow>
      </Section>

      {/* ── Corners ────────────────────────────────────────── */}
      <Section title="Corners" description="Sharp corners for the standard look, or rounded for card-based layouts.">
        <ExampleRow label="Sharp (default)">
          <OTPDemo corners="sharp" />
        </ExampleRow>
        <ExampleRow label="Rounded">
          <OTPDemo corners="rounded" />
        </ExampleRow>
        <ExampleRow label="Rounded + White">
          <OTPDemo corners="rounded" variant="white" />
        </ExampleRow>
      </Section>

      {/* ── Sizes ──────────────────────────────────────────── */}
      <Section title="Sizes" description="Three sizes — sm for compact areas, md (default) for forms, and lg for prominent verification flows.">
        <ExampleRow label="Small">
          <OTPDemo size="sm" />
        </ExampleRow>
        <ExampleRow label="Medium (default)">
          <OTPDemo size="md" />
        </ExampleRow>
        <ExampleRow label="Large">
          <OTPDemo size="lg" />
        </ExampleRow>
      </Section>

      {/* ── Lengths ─────────────────────────────────────────── */}
      <Section title="Code lengths" description="4-digit and 6-digit variations for different verification flows.">
        <ExampleRow label="4-digit">
          <OTPDemo maxLength={4} />
        </ExampleRow>
        <ExampleRow label="6-digit with separator">
          <OTPDemo maxLength={6} />
        </ExampleRow>
        <ExampleRow label="6-digit continuous">
          <OTPDemo maxLength={6} separated={false} />
        </ExampleRow>
      </Section>

      {/* ── Controlled ──────────────────────────────────────── */}
      <Section title="Controlled" description="Controlled value with live readout. The mono font and tabular-nums ensure digits stay aligned.">
        <ExampleRow label="Controlled value">
          <div className="flex flex-col items-start" style={{ gap: "var(--space-4)" }}>
            <InputOTP maxLength={6} value={controlledValue} onChange={setControlledValue}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <span
              style={{
                fontSize: "var(--text-caption)",
                fontFamily: "var(--font-family-mono)",
                fontVariantNumeric: "tabular-nums",
                color: controlledValue.length === 6 ? "var(--alert-success-icon)" : "var(--color-text-tertiary)",
                transition: "color var(--duration-short-3) ease",
              }}
            >
              {controlledValue.length > 0
                ? `Value: ${controlledValue} (${controlledValue.length}/6)`
                : "Start typing…"}
            </span>
          </div>
        </ExampleRow>
      </Section>

      {/* ── With context ─────────────────────────────────────── */}
      <Section title="With label" description="Add contextual labels and helper text above and below the OTP input.">
        <ExampleRow label="2FA verification">
          <div className="flex flex-col items-center w-full" style={{ gap: "var(--space-5)" }}>
            <div className="text-center" style={{ marginBottom: "var(--space-1)" }}>
              <p
                style={{
                  fontSize: "var(--text-body-sm)",
                  fontWeight: "var(--font-weight-medium)" as any,
                  fontFamily: "var(--font-family-supreme)",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Two-Factor Authentication
              </p>
              <p
                style={{
                  fontSize: "var(--text-caption)",
                  fontFamily: "var(--font-family-supreme)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                Enter the 6-digit code from your authenticator app
              </p>
            </div>
            <OTPDemo size="lg" corners="rounded" />
            <p
              style={{
                fontSize: "var(--text-caption)",
                fontFamily: "var(--font-family-supreme)",
                color: "var(--color-text-tertiary)",
              }}
            >
              Didn&apos;t receive a code?{" "}
              <span
                style={{
                  color: "var(--brand-default)",
                  cursor: "pointer",
                  fontWeight: "var(--font-weight-medium)" as any,
                }}
              >
                Resend
              </span>
            </p>
          </div>
        </ExampleRow>
      </Section>

      {/* ── Disabled ─────────────────────────────────────────── */}
      <Section title="Disabled" description="Disabled state with reduced opacity.">
        <ExampleRow label="Disabled">
          <InputOTP maxLength={6} disabled>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
