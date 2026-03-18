import { ComponentPage, Section } from "../docs/component-page";
import { useState, type ReactNode } from "react";
import {
  IconMail,
  IconKey,
  IconLock,
  IconUserCheck,
  IconAlertTriangle,
  IconArrowRight,
  IconCopy,
  IconCheck,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconCode,
  IconEye,
  IconCoin,
  IconArrowUpRight,
  IconShieldCheck,
  IconMoon,
  IconSun,
  IconShieldX,
  IconArrowsExchange,
  IconBell,
} from "@tabler/icons-react";
import { Button } from "../ui/hollaex-button";
import exampleImage from "figma:asset/51cafdda4325661157e7f9effef80e1612171c6a.png";

/* ═══════════════════════════════════════════════════
   DARK MODE CSS SNIPPET (shared across all templates)
   ═══════════════════════════════════════════════════ */

const DARK_MODE_CSS = `
<!-- Dark Mode Support (prefers-color-scheme) -->
<!--
  Add CSS classes to your HTML elements and include this <style> block.
  Supported by: Apple Mail, Outlook.com, Gmail (Android), Hey, Fastmail.
  Falls back gracefully to light mode in unsupported clients.
-->
<style>
  @media (prefers-color-scheme: dark) {
    .email-bg { background-color: #121212 !important; }
    .email-body { background-color: #1E1E1E !important; color: #E0E0E0 !important; }
    .email-card { background-color: #2A2A2A !important; border-color: #3A3A3A !important; }
    .email-text { color: #E0E0E0 !important; }
    .email-text-secondary { color: #A0A0A0 !important; }
    .email-text-muted { color: #8A8A8A !important; }
    .email-border { border-color: #3A3A3A !important; }
    .email-footer { border-color: #2E2E2E !important; }
    .email-footer-text { color: #555555 !important; }
    .email-code-box { background-color: #2A2A2A !important; border-color: #3A3A3A !important; }
    .email-code-text { color: #F0F0F0 !important; }
    .email-info-box { background-color: #1A1F2E !important; }
    .email-warning-box { background-color: #2E2516 !important; }
    .email-danger-box { background-color: #1E1E2E !important; }
  }
</style>`;

/* ═══════════════════════════════════════════════════
   EMAIL TEMPLATE DATA
   ═══════════════════════════════════════════════════ */

type EmailTemplate = {
  id: string;
  name: string;
  description: string;
  icon: typeof IconMail;
  subject: string;
  render: (props: { exchangeName: string; accentColor: string; darkMode?: boolean }) => JSX.Element;
  htmlSnippet: string;
};

const TEMPLATES: EmailTemplate[] = [
  {
    id: "confirmation",
    name: "Email Confirmation",
    description: "Sent when a user signs up and needs to verify their email address.",
    icon: IconMail,
    subject: "Confirm your email address",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#E0E0E0" : "#3C3C3C", margin: "0 0 16px" }}>
          Welcome! You need to confirm your email account by clicking the button below.
        </p>
        <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#A0A0A0" : "#6B6B6B", margin: "0 0 32px" }}>
          If you have any questions, feel free to contact us by replying to this email.
        </p>
        <EmailButton label="Confirm Email" accentColor={accentColor} />
        <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#8A8A8A" : "#9E9E9E", margin: "24px 0 0" }}>
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style={{ fontSize: "13px", lineHeight: "20px", color: accentColor, margin: "4px 0 0", wordBreak: "break-all" }}>
          https://{exchangeName.toLowerCase().replace(/\s/g, "")}.com/confirm?token=abc123def456
        </p>
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Email Confirmation Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <!-- Body -->
      <tr><td style="padding: 40px 40px 32px;">
        <p class="email-text" style="font-size: 15px; color: #3C3C3C;">
          Welcome! Confirm your email by clicking below.
        </p>
        <a href="{{CONFIRM_URL}}" style="display: inline-block; background: var(--primary);
          color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
          font-weight: 500; font-size: 14px;">
          Confirm Email &rarr;
        </a>
        <p class="email-text-muted" style="font-size: 13px; color: #9E9E9E; margin-top: 24px;">
          Or copy this link: {{CONFIRM_URL}}
        </p>
      </td></tr>
      <!-- Footer -->
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "passcode",
    name: "Login Passcode",
    description: "OTP / passcode for two-factor authentication during login.",
    icon: IconKey,
    subject: "Your login verification code",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#E0E0E0" : "#3C3C3C", margin: "0 0 8px" }}>
          Use the following code to complete your sign-in:
        </p>
        <div style={{
          margin: "24px 0",
          padding: "20px 0",
          textAlign: "center",
          backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
          borderRadius: "8px",
          border: darkMode ? "1px dashed #3A3A3A" : "1px dashed #E0E0E0",
        }}>
          <span style={{
            fontSize: "36px",
            fontWeight: 600,
            letterSpacing: "0.25em",
            color: darkMode ? "#F0F0F0" : "#1A1A1A",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            482 917
          </span>
        </div>
        <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#8A8A8A" : "#9E9E9E", margin: "0 0 4px" }}>
          This code expires in <strong style={{ color: darkMode ? "#C0C0C0" : "#6B6B6B" }}>10 minutes</strong>.
        </p>
        <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#8A8A8A" : "#9E9E9E", margin: "0" }}>
          If you did not request this code, you can safely ignore this email.
        </p>
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Login Passcode Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px;">
        <p class="email-text" style="font-size: 15px; color: #3C3C3C;">
          Use this code to complete your sign-in:
        </p>
        <div class="email-code-box" style="text-align: center; padding: 20px; background: #F8F9FA;
          border-radius: 8px; border: 1px dashed #E0E0E0; margin: 24px 0;">
          <span class="email-code-text" style="font-size: 36px; font-weight: 600; letter-spacing: 0.25em;
            font-family: 'JetBrains Mono', monospace; color: #1A1A1A;">
            {{OTP_CODE}}
          </span>
        </div>
        <p class="email-text-muted" style="font-size: 13px; color: #9E9E9E;">
          Code expires in <strong>10 minutes</strong>.
        </p>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "password-reset",
    name: "Password Reset",
    description: "Sent when a user requests to reset their password.",
    icon: IconLock,
    subject: "Reset your password",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#E0E0E0" : "#3C3C3C", margin: "0 0 8px" }}>
          We received a request to reset your password.
        </p>
        <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#A0A0A0" : "#6B6B6B", margin: "0 0 32px" }}>
          Click the button below to create a new password. This link will expire in 1 hour.
        </p>
        <EmailButton label="Reset Password" accentColor={accentColor} />
        <div style={{
          margin: "32px 0 0",
          padding: "16px",
          backgroundColor: darkMode ? "#2E2516" : "#FFF8E1",
          borderRadius: "6px",
          borderLeft: "3px solid #FFB300",
        }}>
          <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#FBBF24" : "#795548", margin: 0 }}>
            If you didn't request a password reset, please ignore this email or contact support if you have concerns about your account security.
          </p>
        </div>
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Password Reset Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px;">
        <p class="email-text" style="font-size: 15px; color: #3C3C3C;">
          We received a request to reset your password.
        </p>
        <a href="{{RESET_URL}}" style="display: inline-block; background: var(--primary);
          color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
          font-weight: 500;">Reset Password &rarr;</a>
        <div class="email-warning-box" style="margin-top: 32px; padding: 16px; background: #FFF8E1;
          border-radius: 6px; border-left: 3px solid #FFB300;">
          <p class="email-text" style="font-size: 13px; color: #795548; margin: 0;">
            Didn't request this? Ignore or contact support.
          </p>
        </div>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "welcome",
    name: "Welcome",
    description: "Onboarding email sent after a user successfully verifies their account.",
    icon: IconUserCheck,
    subject: "Welcome to {{EXCHANGE_NAME}}!",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <p style={{ fontSize: "20px", lineHeight: "28px", color: darkMode ? "#F0F0F0" : "#1A1A1A", margin: "0 0 8px", fontWeight: 600 }}>
          You're all set!
        </p>
        <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#E0E0E0" : "#3C3C3C", margin: "0 0 24px" }}>
          Your account has been verified and you're ready to start trading on {exchangeName}.
        </p>
        <div style={{
          display: "flex",
          gap: "12px",
          margin: "0 0 32px",
        }}>
          {[
            { step: "1", label: "Deposit funds" },
            { step: "2", label: "Explore markets" },
            { step: "3", label: "Start trading" },
          ].map((s) => (
            <div key={s.step} style={{
              flex: 1,
              padding: "16px",
              backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
              borderRadius: "6px",
              textAlign: "center",
            }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: accentColor,
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}>
                {s.step}
              </div>
              <p style={{ fontSize: "13px", color: darkMode ? "#D0D0D0" : "#3C3C3C", margin: 0, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <EmailButton label="Go to Dashboard" accentColor={accentColor} />
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Welcome Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px;">
        <h1 class="email-text" style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">
          You're all set!
        </h1>
        <p class="email-text" style="font-size: 15px; color: #3C3C3C;">
          Your account is verified. Start trading now.
        </p>
        <!-- Step cards -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
          <tr>
            <td class="email-card" style="background: #F8F9FA; border-radius: 6px;
              text-align: center; padding: 16px; width: 33%;">1. Deposit</td>
            <td width="12"></td>
            <td class="email-card" style="background: #F8F9FA; border-radius: 6px;
              text-align: center; padding: 16px; width: 33%;">2. Explore</td>
            <td width="12"></td>
            <td class="email-card" style="background: #F8F9FA; border-radius: 6px;
              text-align: center; padding: 16px; width: 33%;">3. Trade</td>
          </tr>
        </table>
        <a href="{{DASHBOARD_URL}}" style="display: inline-block; background: var(--primary);
          color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
          font-weight: 500;">Go to Dashboard &rarr;</a>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "suspicious-login",
    name: "Suspicious Login",
    description: "Security alert for unrecognized login attempts.",
    icon: IconAlertTriangle,
    subject: "Unusual login activity detected",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <div style={{
          padding: "16px",
          backgroundColor: darkMode ? "#1E1E2E" : "#FEF2F2",
          borderRadius: "8px",
          borderLeft: "3px solid #EF4444",
          marginBottom: "24px",
        }}>
          <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#FCA5A5" : "#991B1B", margin: 0, fontWeight: 500 }}>
            We detected a login to your account from an unrecognized device.
          </p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
          <tbody>
          {[
            { label: "Time", value: "March 18, 2026 at 10:54 AM UTC" },
            { label: "Device", value: "Chrome on Windows 11" },
            { label: "Location", value: "Istanbul, Turkey" },
            { label: "IP Address", value: "192.168.1.***" },
          ].map((row, i) => (
            <tr key={row.label}>
              <td style={{
                padding: "10px 0",
                fontSize: "13px",
                color: darkMode ? "#8A8A8A" : "#9E9E9E",
                borderBottom: i < 3 ? `1px solid ${darkMode ? "#3A3A3A" : "#F0F0F0"}` : "none",
                width: "120px",
                verticalAlign: "top",
              }}>
                {row.label}
              </td>
              <td style={{
                padding: "10px 0",
                fontSize: "13px",
                color: darkMode ? "#D0D0D0" : "#3C3C3C",
                borderBottom: i < 3 ? `1px solid ${darkMode ? "#3A3A3A" : "#F0F0F0"}` : "none",
                fontWeight: 500,
              }}>
                {row.value}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#A0A0A0" : "#6B6B6B", margin: "0 0 24px" }}>
          If this was you, no further action is needed. Otherwise, secure your account immediately.
        </p>
        <EmailButton label="Secure My Account" accentColor="#EF4444" />
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Suspicious Login Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px;">
        <div class="email-danger-box" style="padding: 16px; background: #FEF2F2; border-radius: 8px;
          border-left: 3px solid #EF4444; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #991B1B; font-weight: 500; margin: 0;">
            Unrecognized login detected.
          </p>
        </div>
        <!-- Device details table with class="email-border" on rows -->
        <a href="{{SECURE_URL}}" style="display: inline-block; background: #EF4444;
          color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
          font-weight: 500;">Secure My Account &rarr;</a>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "deposit",
    name: "Deposit Confirmation",
    description: "Notification when a deposit is confirmed on-chain.",
    icon: IconCoin,
    subject: "Your deposit has been confirmed",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#E0E0E0" : "#3C3C3C", margin: "0 0 24px" }}>
          Your deposit has been successfully confirmed and credited to your account.
        </p>
        <div style={{
          backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
        }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "32px", fontWeight: 700, color: darkMode ? "#F0F0F0" : "#1A1A1A" }}>0.0842 BTC</span>
          </div>
          <div style={{ borderTop: `1px solid ${darkMode ? "#3A3A3A" : "#E8E8E8"}`, paddingTop: "16px" }}>
            {[
              { label: "Status", value: "Confirmed", color: "#16A34A" },
              { label: "Network", value: "Bitcoin" },
              { label: "Confirmations", value: "3 / 3" },
              { label: "Transaction ID", value: "4a5b6c...d7e8f9", mono: true },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
              }}>
                <span style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E" }}>{row.label}</span>
                <span style={{
                  fontSize: "13px",
                  color: (row as any).color || (darkMode ? "#D0D0D0" : "#3C3C3C"),
                  fontWeight: 500,
                  fontFamily: (row as any).mono ? "'JetBrains Mono', monospace" : "inherit",
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <EmailButton label="View Transaction" accentColor={accentColor} />
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Deposit Confirmation Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px;">
        <p class="email-text" style="font-size: 15px; color: #3C3C3C;">
          Your deposit has been confirmed and credited.
        </p>
        <div class="email-card" style="background: #F8F9FA; border-radius: 8px; padding: 24px;
          text-align: center; margin: 24px 0;">
          <span class="email-text" style="font-size: 32px; font-weight: 700;">
            {{AMOUNT}} {{CURRENCY}}
          </span>
          <!-- Transaction details rows with class="email-text-muted" labels -->
        </div>
        <a href="{{TX_URL}}" style="display: inline-block; background: var(--primary);
          color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
          font-weight: 500;">View Transaction &rarr;</a>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "withdrawal",
    name: "Withdrawal Confirmation",
    description: "Sent when a user initiates a withdrawal that requires confirmation.",
    icon: IconArrowUpRight,
    subject: "Confirm your withdrawal request",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <div style={{
          padding: "16px",
          backgroundColor: darkMode ? "#1A1A2E" : "#FFF7ED",
          borderRadius: "8px",
          borderLeft: "3px solid #F97316",
          marginBottom: "24px",
        }}>
          <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#FDBA74" : "#9A3412", margin: 0, fontWeight: 500 }}>
            A withdrawal request has been initiated from your account. Please confirm below.
          </p>
        </div>
        <div style={{
          backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
        }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "32px", fontWeight: 700, color: darkMode ? "#F0F0F0" : "#1A1A1A" }}>1.5000 ETH</span>
          </div>
          <div style={{ borderTop: darkMode ? "1px solid #3A3A3A" : "1px solid #E8E8E8", paddingTop: "16px" }}>
            {[
              { label: "Status", value: "Pending Confirmation", color: "#F97316" },
              { label: "Network", value: "Ethereum (ERC-20)" },
              { label: "Destination", value: "0x7a3B...9e2F", mono: true },
              { label: "Network Fee", value: "0.0021 ETH" },
              { label: "Requested", value: "March 18, 2026 at 2:30 PM UTC" },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
              }}>
                <span style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E" }}>{row.label}</span>
                <span style={{
                  fontSize: "13px",
                  color: (row as any).color || (darkMode ? "#D0D0D0" : "#3C3C3C"),
                  fontWeight: 500,
                  fontFamily: (row as any).mono ? "'JetBrains Mono', monospace" : "inherit",
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <EmailButton label="Confirm Withdrawal" accentColor={accentColor} />
        <div style={{
          margin: "24px 0 0",
          padding: "16px",
          backgroundColor: darkMode ? "#1E1E2E" : "#FEF2F2",
          borderRadius: "6px",
          borderLeft: "3px solid #EF4444",
        }}>
          <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#FCA5A5" : "#991B1B", margin: 0 }}>
            If you did not initiate this withdrawal, do NOT click the button above. Instead, immediately secure your account and contact support.
          </p>
        </div>
        <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#6A6A6A" : "#9E9E9E", margin: "16px 0 0" }}>
          This confirmation link expires in <strong style={{ color: darkMode ? "#A0A0A0" : "#6B6B6B" }}>30 minutes</strong>.
        </p>
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Withdrawal Confirmation Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px;">
        <div class="email-info-box" style="padding: 16px; background: #FFF7ED; border-radius: 8px;
          border-left: 3px solid #F97316; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #9A3412; font-weight: 500; margin: 0;">
            A withdrawal request has been initiated. Please confirm.
          </p>
        </div>
        <div class="email-card" style="background: #F8F9FA; border-radius: 8px; padding: 24px;
          text-align: center; margin-bottom: 24px;">
          <span class="email-text" style="font-size: 32px; font-weight: 700;">
            {{AMOUNT}} {{CURRENCY}}
          </span>
          <!-- Transaction details rows -->
        </div>
        <a href="{{CONFIRM_URL}}" style="display: inline-block; background: var(--primary);
          color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
          font-weight: 500;">Confirm Withdrawal &rarr;</a>
        <div class="email-danger-box" style="margin-top: 24px; padding: 16px; background: #FEF2F2;
          border-radius: 6px; border-left: 3px solid #EF4444;">
          <p style="font-size: 13px; color: #991B1B; margin: 0;">
            Didn't initiate this? Do NOT confirm. Secure your account immediately.
          </p>
        </div>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "kyc-verification",
    name: "KYC Approved",
    description: "Sent when a user's identity verification is approved.",
    icon: IconShieldCheck,
    subject: "Your identity verification is complete",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <div style={{
          textAlign: "center",
          marginBottom: "24px",
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: darkMode ? "#052E16" : "#F0FDF4",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <p style={{ fontSize: "20px", lineHeight: "28px", color: darkMode ? "#F0F0F0" : "#1A1A1A", margin: "0 0 8px", fontWeight: 600 }}>
            Identity Verified
          </p>
          <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#A0A0A0" : "#6B6B6B", margin: 0 }}>
            Your KYC verification has been successfully completed.
          </p>
        </div>
        <div style={{
          backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
        }}>
          {[
            { label: "Verification Level", value: "Level 2 \u2014 Enhanced" },
            { label: "Status", value: "Approved", color: "#16A34A" },
            { label: "Verified On", value: "March 18, 2026" },
            { label: "Document Type", value: "Passport" },
          ].map((row) => (
            <div key={row.label} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: row.label !== "Document Type" ? `1px solid ${darkMode ? "#3A3A3A" : "#F0F0F0"}` : "none",
            }}>
              <span style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E" }}>{row.label}</span>
              <span style={{
                fontSize: "13px",
                color: (row as any).color || (darkMode ? "#D0D0D0" : "#3C3C3C"),
                fontWeight: 500,
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          backgroundColor: darkMode ? "#1A1F2E" : "#EFF6FF",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#93C5FD" : "#1E40AF", margin: "0 0 12px", fontWeight: 500 }}>
            What's unlocked:
          </p>
          {[
            "Increased daily withdrawal limit to 100 BTC",
            "Access to OTC trading desk",
            "Priority customer support",
            "Fiat currency deposits & withdrawals",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span style={{ fontSize: "13px", color: darkMode ? "#C0C0C0" : "#3C3C3C" }}>{item}</span>
            </div>
          ))}
        </div>
        <EmailButton label="Go to Dashboard" accentColor={accentColor} />
      </EmailFrame>
    ),
    htmlSnippet: `<!-- KYC Approved Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px; text-align: center;">
        <div style="width: 56px; height: 56px; border-radius: 50%;
          background: #F0FDF4; display: inline-flex; align-items: center;
          justify-content: center; margin-bottom: 16px;">
          <!-- Shield check icon SVG -->
        </div>
        <h1 class="email-text" style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">
          Identity Verified
        </h1>
        <p class="email-text-secondary" style="font-size: 15px; color: #6B6B6B; margin: 0 0 24px;">
          Your KYC verification has been completed.
        </p>
        <div class="email-card" style="background: #F8F9FA; border-radius: 8px; padding: 24px;
          text-align: left; margin-bottom: 24px;">
          <!-- Verification details rows -->
        </div>
        <div class="email-info-box" style="background: #EFF6FF; border-radius: 8px; padding: 20px;
          text-align: left; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #1E40AF; font-weight: 500;
            margin: 0 0 12px;">What's unlocked:</p>
          <!-- Unlocked features list -->
        </div>
        <a href="{{DASHBOARD_URL}}" style="display: inline-block;
          background: var(--primary); color: #fff; padding: 12px 32px;
          border-radius: 6px; text-decoration: none; font-weight: 500;">
          Go to Dashboard &rarr;
        </a>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "kyc-rejected",
    name: "KYC Rejected",
    description: "Sent when a user's identity verification is rejected with reasons.",
    icon: IconShieldX,
    subject: "Your identity verification requires attention",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <div style={{
          textAlign: "center",
          marginBottom: "24px",
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: darkMode ? "#450A0A" : "#FEF2F2",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 9l6 6" />
              <path d="M15 9l-6 6" />
            </svg>
          </div>
          <p style={{ fontSize: "20px", lineHeight: "28px", color: darkMode ? "#F0F0F0" : "#1A1A1A", margin: "0 0 8px", fontWeight: 600 }}>
            Verification Unsuccessful
          </p>
          <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#A0A0A0" : "#6B6B6B", margin: 0 }}>
            We were unable to verify your identity. Please review the details below and resubmit.
          </p>
        </div>
        <div style={{
          backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
        }}>
          {[
            { label: "Verification Level", value: "Level 2 \u2014 Enhanced" },
            { label: "Status", value: "Rejected", color: "#EF4444" },
            { label: "Submitted On", value: "March 15, 2026" },
            { label: "Reviewed On", value: "March 18, 2026" },
          ].map((row) => (
            <div key={row.label} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: row.label !== "Reviewed On" ? `1px solid ${darkMode ? "#3A3A3A" : "#F0F0F0"}` : "none",
            }}>
              <span style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E" }}>{row.label}</span>
              <span style={{
                fontSize: "13px",
                color: (row as any).color || (darkMode ? "#D0D0D0" : "#3C3C3C"),
                fontWeight: 500,
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          backgroundColor: darkMode ? "#1E1E2E" : "#FEF2F2",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#FCA5A5" : "#991B1B", margin: "0 0 12px", fontWeight: 500 }}>
            Reasons for rejection:
          </p>
          {[
            "Document image is blurry or unreadable",
            "Name on document does not match account name",
            "Document has expired — please provide a valid ID",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "4px 0" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px", flexShrink: 0 }}>
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
              <span style={{ fontSize: "13px", color: darkMode ? "#FCA5A5" : "#991B1B" }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{
          backgroundColor: darkMode ? "#1A1F2E" : "#EFF6FF",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
        }}>
          <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#93C5FD" : "#1E40AF", margin: "0 0 8px", fontWeight: 500 }}>
            What to do next:
          </p>
          <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#A0A0A0" : "#6B6B6B", margin: 0 }}>
            Please ensure your document is clear, valid, and matches the name on your account. You can re-submit your verification at any time from your account settings.
          </p>
        </div>
        <EmailButton label="Re-submit Verification" accentColor={accentColor} />
        <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#6A6A6A" : "#9E9E9E", margin: "16px 0 0" }}>
          Need help? <a href="#" onClick={(e) => e.preventDefault()} style={{ color: accentColor, textDecoration: "underline" }}>Contact our support team</a>.
        </p>
      </EmailFrame>
    ),
    htmlSnippet: `<!-- KYC Rejected Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px; text-align: center;">
        <div style="width: 56px; height: 56px; border-radius: 50%;
          background: #FEF2F2; display: inline-flex; align-items: center;
          justify-content: center; margin-bottom: 16px;">
          <!-- Shield X icon SVG -->
        </div>
        <h1 class="email-text" style="font-size: 20px; font-weight: 600; margin: 0 0 8px;">
          Verification Unsuccessful
        </h1>
        <p class="email-text-secondary" style="font-size: 15px; color: #6B6B6B; margin: 0 0 24px;">
          We were unable to verify your identity.
        </p>
        <div class="email-card" style="background: #F8F9FA; border-radius: 8px; padding: 24px;
          text-align: left; margin-bottom: 24px;">
          <!-- Verification details rows -->
        </div>
        <div class="email-danger-box" style="background: #FEF2F2; border-radius: 8px; padding: 20px;
          text-align: left; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #991B1B; font-weight: 500;
            margin: 0 0 12px;">Reasons for rejection:</p>
          <!-- Rejection reasons list -->
        </div>
        <div class="email-info-box" style="background: #EFF6FF; border-radius: 8px; padding: 20px;
          text-align: left; margin-bottom: 24px;">
          <p style="font-size: 14px; color: #1E40AF; font-weight: 500;
            margin: 0 0 8px;">What to do next:</p>
          <p style="font-size: 13px; color: #6B6B6B; margin: 0;">
            Ensure your document is clear, valid, and matches your account name.
          </p>
        </div>
        <a href="{{RESUBMIT_URL}}" style="display: inline-block;
          background: var(--primary); color: #fff; padding: 12px 32px;
          border-radius: 6px; text-decoration: none; font-weight: 500;">
          Re-submit Verification &rarr;
        </a>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "trade-executed",
    name: "Trade Executed",
    description: "Notification when a limit or market order has been filled.",
    icon: IconArrowsExchange,
    subject: "Your trade has been executed",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <p style={{ fontSize: "15px", lineHeight: "24px", color: darkMode ? "#E0E0E0" : "#3C3C3C", margin: "0 0 24px" }}>
          Your order has been successfully filled. Here are the details:
        </p>
        <div style={{
          backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
        }}>
          {/* Trade direction badge */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <span style={{
              display: "inline-block",
              padding: "4px 16px",
              borderRadius: "20px",
              backgroundColor: "#DCFCE7",
              color: "#16A34A",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}>
              BUY
            </span>
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: darkMode ? "#F0F0F0" : "#1A1A1A" }}>
              0.2500 BTC
            </span>
            <p style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E", margin: "4px 0 0" }}>
              @ $67,842.50 per BTC
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${darkMode ? "#3A3A3A" : "#E8E8E8"}`, paddingTop: "16px" }}>
            {[
              { label: "Pair", value: "BTC / USDT" },
              { label: "Type", value: "Limit Order" },
              { label: "Total", value: "$16,960.63", mono: true },
              { label: "Fee", value: "$16.96 (0.10%)" },
              { label: "Filled At", value: "March 18, 2026 at 3:14 PM UTC" },
              { label: "Order ID", value: "ORD-8F3A2B", mono: true },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
              }}>
                <span style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E" }}>{row.label}</span>
                <span style={{
                  fontSize: "13px",
                  color: darkMode ? "#D0D0D0" : "#3C3C3C",
                  fontWeight: 500,
                  fontFamily: (row as any).mono ? "'JetBrains Mono', monospace" : "inherit",
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <EmailButton label="View Trade History" accentColor={accentColor} />
        <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#6A6A6A" : "#9E9E9E", margin: "16px 0 0" }}>
          To manage your trade notifications, visit your <a href="#" onClick={(e) => e.preventDefault()} style={{ color: accentColor, textDecoration: "underline" }}>notification settings</a>.
        </p>
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Trade Executed Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px;">
        <p class="email-text" style="font-size: 15px; color: #3C3C3C;">
          Your order has been successfully filled.
        </p>
        <div class="email-card" style="background: #F8F9FA; border-radius: 8px; padding: 24px;
          margin: 24px 0; text-align: center;">
          <span style="display: inline-block; padding: 4px 16px; border-radius: 20px;
            background: #DCFCE7; color: #16A34A; font-size: 13px; font-weight: 600;">
            {{SIDE}} <!-- BUY or SELL -->
          </span>
          <div style="margin: 12px 0;">
            <span class="email-text" style="font-size: 28px; font-weight: 700;">
              {{AMOUNT}} {{BASE_CURRENCY}}
            </span>
            <p class="email-text-muted" style="font-size: 13px; color: #9E9E9E; margin: 4px 0 0;">
              @ {{PRICE}} per {{BASE_CURRENCY}}
            </p>
          </div>
          <!-- Trade details rows -->
        </div>
        <a href="{{HISTORY_URL}}" style="display: inline-block; background: var(--primary);
          color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
          font-weight: 500;">View Trade History &rarr;</a>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
  {
    id: "price-alert",
    name: "Price Alert",
    description: "Triggered when an asset hits a user-defined price target.",
    icon: IconBell,
    subject: "Price alert: {{CURRENCY}} has reached your target",
    render: ({ exchangeName, accentColor, darkMode }) => (
      <EmailFrame exchangeName={exchangeName} accentColor={accentColor} darkMode={darkMode}>
        <div style={{
          textAlign: "center",
          marginBottom: "24px",
        }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: darkMode ? "#1A1F2E" : "#EFF6FF",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <p style={{ fontSize: "20px", lineHeight: "28px", color: darkMode ? "#F0F0F0" : "#1A1A1A", margin: "0 0 4px", fontWeight: 600 }}>
            Price Alert Triggered
          </p>
          <p style={{ fontSize: "14px", lineHeight: "22px", color: darkMode ? "#A0A0A0" : "#6B6B6B", margin: 0 }}>
            Bitcoin (BTC) has hit your target price.
          </p>
        </div>
        <div style={{
          backgroundColor: darkMode ? "#2A2A2A" : "#F8F9FA",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          textAlign: "center",
        }}>
          <div style={{ marginBottom: "4px" }}>
            <span style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E" }}>Current Price</span>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <span style={{
              fontSize: "36px",
              fontWeight: 700,
              color: darkMode ? "#F0F0F0" : "#1A1A1A",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              $70,000
            </span>
          </div>
          <div style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "20px",
            backgroundColor: "#DCFCE7",
            color: "#16A34A",
            fontSize: "13px",
            fontWeight: 600,
          }}>
            +4.28% (24h)
          </div>
          <div style={{ borderTop: `1px solid ${darkMode ? "#3A3A3A" : "#E8E8E8"}`, paddingTop: "16px", marginTop: "16px", textAlign: "left" }}>
            {[
              { label: "Alert Type", value: "Price Above" },
              { label: "Target Price", value: "$70,000.00", mono: true },
              { label: "Set On", value: "March 10, 2026" },
              { label: "Triggered At", value: "March 18, 2026 at 4:02 PM UTC" },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
              }}>
                <span style={{ fontSize: "13px", color: darkMode ? "#8A8A8A" : "#9E9E9E" }}>{row.label}</span>
                <span style={{
                  fontSize: "13px",
                  color: darkMode ? "#D0D0D0" : "#3C3C3C",
                  fontWeight: 500,
                  fontFamily: (row as any).mono ? "'JetBrains Mono', monospace" : "inherit",
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <EmailButton label="Trade Now" accentColor={accentColor} />
          <div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                display: "inline-block",
                padding: "12px 24px",
                borderRadius: "6px",
                border: `1px solid ${darkMode ? "#3A3A3A" : "#E0E0E0"}`,
                color: darkMode ? "#D0D0D0" : "#3C3C3C",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "'Supreme', Arial, sans-serif",
                lineHeight: "20px",
                backgroundColor: "transparent",
              }}
            >
              Manage Alerts
            </a>
          </div>
        </div>
        <p style={{ fontSize: "13px", lineHeight: "20px", color: darkMode ? "#6A6A6A" : "#9E9E9E", margin: "20px 0 0" }}>
          This alert has been automatically deactivated. Set a new alert from your dashboard.
        </p>
      </EmailFrame>
    ),
    htmlSnippet: `<!-- Price Alert Template -->
${DARK_MODE_CSS}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
  class="email-bg"
  style="background-color: #F5F5F5; font-family: 'Supreme', Arial, sans-serif;">
  <tr><td align="center" style="padding: 40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" class="email-body"
      style="background: #FFFFFF; border-radius: 8px; overflow: hidden;">
      <tr><td style="background: var(--primary); padding: 32px; text-align: center;">
        <img src="{{LOGO_URL}}" alt="{{EXCHANGE_NAME}}" height="28" />
      </td></tr>
      <tr><td style="padding: 40px; text-align: center;">
        <h1 class="email-text" style="font-size: 20px; font-weight: 600; margin: 0 0 4px;">
          Price Alert Triggered
        </h1>
        <p class="email-text-secondary" style="font-size: 14px; color: #6B6B6B; margin: 0 0 24px;">
          {{CURRENCY}} has hit your target price.
        </p>
        <div class="email-card" style="background: #F8F9FA; border-radius: 8px; padding: 24px;
          margin-bottom: 24px;">
          <p class="email-text-muted" style="font-size: 13px; color: #9E9E9E; margin: 0 0 4px;">
            Current Price
          </p>
          <span class="email-code-text" style="font-size: 36px; font-weight: 700;
            font-family: 'JetBrains Mono', monospace;">
            {{CURRENT_PRICE}}
          </span>
          <div style="margin-top: 12px;">
            <span style="display: inline-block; padding: 4px 12px; border-radius: 20px;
              background: #DCFCE7; color: #16A34A; font-size: 13px; font-weight: 600;">
              {{CHANGE_PCT}} (24h)
            </span>
          </div>
          <!-- Alert details rows -->
        </div>
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td>
              <a href="{{TRADE_URL}}" style="display: inline-block; background: var(--primary);
                color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none;
                font-weight: 500;">Trade Now &rarr;</a>
            </td>
            <td width="12"></td>
            <td>
              <a href="{{ALERTS_URL}}" class="email-border" style="display: inline-block;
                padding: 12px 24px; border-radius: 6px; border: 1px solid #E0E0E0;
                text-decoration: none; font-weight: 500; color: #3C3C3C;">
                Manage Alerts
              </a>
            </td>
          </tr>
        </table>
      </td></tr>
      <tr><td class="email-footer" style="padding: 24px 40px; border-top: 1px solid #EBEBEB;">
        <p class="email-footer-text" style="font-size: 12px; color: #9E9E9E;">
          &copy; {{YEAR}} {{EXCHANGE_NAME}}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>`,
  },
];

/* ═══════════════════════════════════════════════════
   SHARED EMAIL COMPONENTS
   ═══════════════════════════════════════════════════ */

function EmailButton({ label, accentColor }: { label: string; accentColor: string }) {
  return (
    <div>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{
          display: "inline-block",
          backgroundColor: accentColor,
          color: "#FFFFFF",
          padding: "12px 32px",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "'Supreme', Arial, sans-serif",
          lineHeight: "20px",
        }}
      >
        {label} <span style={{ marginLeft: "4px" }}>&rarr;</span>
      </a>
    </div>
  );
}

function EmailFrame({
  exchangeName,
  accentColor,
  children,
  darkMode,
}: {
  exchangeName: string;
  accentColor: string;
  children: ReactNode;
  darkMode?: boolean;
}) {
  return (
    <div style={{
      fontFamily: "'Supreme', Arial, Helvetica, sans-serif",
      backgroundColor: darkMode ? "#121212" : "#F5F5F5",
      padding: "40px 20px",
      transition: "background-color 200ms ease",
    }}>
      <div style={{
        maxWidth: "560px",
        margin: "0 auto",
        backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: darkMode ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.08)",
        transition: "background-color 200ms ease",
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: accentColor,
          padding: "28px 40px",
          textAlign: "center",
        }}>
          <span style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
          }}>
            {exchangeName}
          </span>
        </div>
        {/* Body */}
        <div style={{ padding: "40px 40px 32px" }}>
          {children}
        </div>
        {/* Footer */}
        <div style={{
          padding: "20px 40px",
          borderTop: darkMode ? "1px solid #2E2E2E" : "1px solid #EBEBEB",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: darkMode ? "#555555" : "#BDBDBD" }}>
              &copy; 2026 {exchangeName}
            </span>
            <span style={{ fontSize: "12px", color: darkMode ? "#555555" : "#BDBDBD" }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: darkMode ? "#555555" : "#BDBDBD", textDecoration: "underline" }}>
                Unsubscribe
              </a>
              {" "}&middot;{" "}
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: darkMode ? "#555555" : "#BDBDBD", textDecoration: "underline" }}>
                Privacy
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CODE SNIPPET VIEWER
   ═══════════════════════════════════════════════════ */

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: "var(--radius)",
      overflow: "hidden",
      border: "1px solid var(--border-subtle)",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "var(--space-3) var(--space-5)",
        backgroundColor: "var(--card)",
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        <span style={{
          fontSize: "var(--text-caption)",
          fontFamily: "var(--font-family-mono)",
          color: "var(--muted-foreground)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}>
          HTML
        </span>
        <Button
          variant="outline-secondary"
          size="xs"
          copyText={code}
          style={{ borderRadius: "var(--radius)", fontSize: "var(--text-caption)" }}
        >
          Copy
        </Button>
      </div>
      <pre style={{
        margin: 0,
        padding: "var(--space-5)",
        backgroundColor: "var(--secondary-subtle)",
        overflowX: "auto",
        fontSize: "12px",
        lineHeight: "20px",
        fontFamily: "var(--font-family-mono)",
        color: "var(--foreground)",
        maxHeight: "320px",
        overflowY: "auto",
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE SELECTOR & PREVIEW
   ═══════════════════════════════════════════════════ */

function TemplateCard({
  template,
  isActive,
  onClick,
}: {
  template: EmailTemplate;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = template.icon;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        width: "100%",
        padding: "var(--space-4) var(--space-5)",
        borderRadius: "var(--radius)",
        border: isActive ? "1px solid var(--primary)" : "1px solid var(--border-subtle)",
        backgroundColor: isActive
          ? "var(--secondary)"
          : hovered
            ? "var(--secondary-subtle)"
            : "var(--background)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-family-supreme)",
        transition: "all 150ms ease",
      }}
    >
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "var(--radius)",
        backgroundColor: isActive ? "var(--primary)" : "var(--secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background-color 150ms ease",
      }}>
        <Icon
          size={18}
          stroke={1.5}
          style={{ color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-medium)",
          color: isActive ? "var(--primary)" : "var(--foreground)",
          margin: 0,
          lineHeight: "var(--lh-label)",
        }}>
          {template.name}
        </p>
        <p style={{
          fontSize: "var(--text-caption)",
          color: "var(--muted-foreground)",
          margin: 0,
          lineHeight: "var(--lh-caption)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {template.description}
        </p>
      </div>
    </button>
  );
}

function EmailTemplatesShowcase() {
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [emailDarkMode, setEmailDarkMode] = useState(false);
  const [exchangeName] = useState("HollaEx");

  const active = TEMPLATES.find((t) => t.id === activeId)!;

  // Use CSS variable for accent color
  const accentColor = "#2463EB"; // matches --primary in light mode

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* Before / After comparison */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-6)",
        alignItems: "start",
      }}>
        <div>
          <p style={{
            fontSize: "var(--text-overline)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "var(--ls-overline)",
            textTransform: "uppercase",
            color: "var(--destructive)",
            marginBottom: "var(--space-3)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            Before
          </p>
          <div style={{
            borderRadius: "var(--radius)",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
          }}>
            <img
              src={exampleImage}
              alt="Current ugly email template"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
        <div>
          <p style={{
            fontSize: "var(--text-overline)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "var(--ls-overline)",
            textTransform: "uppercase",
            color: "#16A34A",
            marginBottom: "var(--space-3)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            After
          </p>
          <div style={{
            borderRadius: "var(--radius)",
            overflow: "hidden",
            border: "1px solid var(--border-subtle)",
            maxHeight: "420px",
            overflowY: "hidden",
          }}>
            <div style={{ transform: "scale(0.58)", transformOrigin: "top left", width: "172.4%" }}>
              {TEMPLATES[0].render({ exchangeName, accentColor })}
            </div>
          </div>
        </div>
      </div>

      {/* Template selector + preview */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "var(--space-6)",
        alignItems: "start",
      }}>
        {/* Left: template list */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
          maxHeight: "720px",
          overflowY: "auto",
        }}>
          <p style={{
            fontSize: "var(--text-overline)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "var(--ls-overline)",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            margin: "0 0 var(--space-3)",
            padding: "0 var(--space-2)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            Templates ({TEMPLATES.length})
          </p>
          {TEMPLATES.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              isActive={t.id === activeId}
              onClick={() => setActiveId(t.id)}
            />
          ))}
        </div>

        {/* Right: preview area */}
        <div style={{
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
          backgroundColor: "var(--background)",
        }}>
          {/* Toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--space-3) var(--space-5)",
            borderBottom: "1px solid var(--border-subtle)",
            backgroundColor: "var(--card)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <span style={{
                fontSize: "var(--text-body-sm)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}>
                {active.name}
              </span>
              <span style={{
                fontSize: "var(--text-caption)",
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-family-mono)",
                padding: "var(--space-1) var(--space-3)",
                backgroundColor: "var(--secondary)",
                borderRadius: "var(--radius)",
              }}>
                {active.subject}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              {/* Viewport toggle */}
              {viewMode === "preview" && (
                <>
                  <ToolbarButton
                    icon={<IconDeviceDesktop size={15} stroke={1.5} />}
                    isActive={viewport === "desktop"}
                    onClick={() => setViewport("desktop")}
                  />
                  <ToolbarButton
                    icon={<IconDeviceMobile size={15} stroke={1.5} />}
                    isActive={viewport === "mobile"}
                    onClick={() => setViewport("mobile")}
                  />
                  <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border)", margin: "0 var(--space-2)" }} />
                  <ToolbarButton
                    icon={emailDarkMode ? <IconSun size={15} stroke={1.5} /> : <IconMoon size={15} stroke={1.5} />}
                    isActive={emailDarkMode}
                    onClick={() => setEmailDarkMode(!emailDarkMode)}
                    label={emailDarkMode ? "Light" : "Dark"}
                  />
                  <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border)", margin: "0 var(--space-2)" }} />
                </>
              )}
              {/* View mode toggle */}
              <ToolbarButton
                icon={<IconEye size={15} stroke={1.5} />}
                isActive={viewMode === "preview"}
                onClick={() => setViewMode("preview")}
                label="Preview"
              />
              <ToolbarButton
                icon={<IconCode size={15} stroke={1.5} />}
                isActive={viewMode === "code"}
                onClick={() => setViewMode("code")}
                label="Code"
              />
            </div>
          </div>

          {/* Content */}
          {viewMode === "preview" ? (
            <div style={{
              display: "flex",
              justifyContent: "center",
              padding: "var(--space-5)",
              backgroundColor: emailDarkMode ? "#0A0A0A" : "#E8E8E8",
              minHeight: "500px",
              transition: "background-color 200ms ease",
            }}>
              <div style={{
                width: viewport === "mobile" ? "375px" : "100%",
                maxWidth: viewport === "mobile" ? "375px" : "640px",
                transition: "width 300ms ease, max-width 300ms ease",
              }}>
                {active.render({ exchangeName, accentColor, darkMode: emailDarkMode })}
              </div>
            </div>
          ) : (
            <div style={{ padding: "var(--space-5)" }}>
              <CodeBlock code={active.htmlSnippet} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon,
  isActive,
  onClick,
  label,
}: {
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  label?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: label ? "var(--space-2) var(--space-3)" : "var(--space-2)",
        borderRadius: "var(--radius)",
        border: "none",
        backgroundColor: isActive ? "var(--secondary)" : hovered ? "var(--secondary-subtle)" : "transparent",
        color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
        cursor: "pointer",
        fontSize: "var(--text-caption)",
        fontFamily: "var(--font-family-supreme)",
        fontWeight: "var(--font-weight-medium)",
      }}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   GUIDELINES SECTION
   ═══════════════════════════════════════════════════ */

function GuidelinesSection() {
  const guidelines = [
    {
      title: "Layout",
      items: [
        "Max width of 560px for the email body",
        "40px horizontal padding inside the content area",
        "Use table-based layout for maximum client compatibility",
        "8px border-radius on the outer container",
      ],
    },
    {
      title: "Typography",
      items: [
        "Primary font: Supreme (fallback to Arial, sans-serif)",
        "Monospace: JetBrains Mono for codes and transaction IDs",
        "Body text: 15px / 24px line-height, color #3C3C3C",
        "Secondary text: 13px / 20px line-height, color #9E9E9E",
      ],
    },
    {
      title: "Colors",
      items: [
        "Header background: var(--primary) for brand consistency",
        "Body background: #FFFFFF with #F5F5F5 outer wrapper",
        "CTA buttons inherit the primary accent color",
        "Destructive actions use #EF4444 (e.g., security alerts)",
      ],
    },
    {
      title: "Components",
      items: [
        "Buttons: 12px 32px padding, 6px radius, 14px font",
        "Info boxes: 16px padding, colored left border (3px)",
        "Data tables: 13px text, #F0F0F0 row dividers",
        "Footer: 12px text, unsubscribe + privacy links",
      ],
    },
    {
      title: "Dark Mode",
      items: [
        "Use @media (prefers-color-scheme: dark) in <style> block",
        "Outer bg: #121212, card bg: #1E1E1E, inner cards: #2A2A2A",
        "Body text: #E0E0E0, muted text: #8A8A8A, borders: #3A3A3A",
        "Supported by Apple Mail, Outlook.com, Gmail (Android)",
      ],
    },
    {
      title: "Dark Mode Implementation",
      items: [
        "Add CSS classes (email-bg, email-body, email-card, etc.) to HTML elements",
        "Include the shared <style> block with @media query at the top",
        "Use !important on all dark overrides for client compatibility",
        "Falls back gracefully to light mode in unsupported clients",
      ],
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)",
    }}>
      {guidelines.map((g) => (
        <div
          key={g.title}
          style={{
            padding: "var(--space-6)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--card)",
          }}
        >
          <p style={{
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--foreground)",
            margin: "0 0 var(--space-4)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {g.title}
          </p>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
          }}>
            {g.items.map((item, i) => (
              <li
                key={i}
                style={{
                  fontSize: "var(--text-body-sm)",
                  lineHeight: "var(--lh-body-sm)",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-family-supreme)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "var(--space-3)",
                }}
              >
                <span style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary)",
                  flexShrink: 0,
                  marginTop: "8px",
                }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════ */

export function EmailTemplatesPage() {
  return (
    <ComponentPage
      name="Email Templates"
      description="Standardized, on-brand email templates for transactional and security communications. Built with table-based HTML for maximum email client compatibility."
      breadcrumbPrefix="Patterns"
      fabIconMap={{
        "Templates": IconMail,
        "Guidelines": IconArrowRight,
      }}
    >
      <Section title="Templates" description="Select a template to preview it at desktop or mobile widths, toggle dark mode, and copy the HTML source for integration.">
        <EmailTemplatesShowcase />
      </Section>

      <Section title="Guidelines" description="Follow these conventions to keep email templates consistent with the HollaEx design system.">
        <GuidelinesSection />
      </Section>
    </ComponentPage>
  );
}
