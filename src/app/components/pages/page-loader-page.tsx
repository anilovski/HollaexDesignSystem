import { useState } from "react";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { PageLoader, FadeInContent } from "../ui/page-loader";
import { LoadingIllustration } from "../ui/loading-illustration";
import { PageLoadingIllustration, type IllustrationVariant } from "../ui/loading-illustrations";

export function PageLoaderPage() {
  return (
    <ComponentPage
      name="Page Loader"
      description="A creative animated loading illustration with a spinning progress ring, assembling document, rotating gear, and twinkling sparkles — all in the HollaEx 2-color illustration system. Paired with rotating status messages and a FadeInContent wrapper for smooth page transitions."
    >
      {/* ── Illustration standalone ───────────────────── */}
      <Section
        title="Loading Illustration"
        description="The standalone SVG illustration used inside the PageLoader. Uses the same 2-color system as the search no-results illustration: navy #182D53 outlines on light, silver #CBD2D7 on dark, with var(--brand-default) accent."
      >
        <ExampleRow label="LoadingIllustration">
          <div className="flex items-center justify-center" style={{ width: "100%", padding: "var(--space-8) 0" }}>
            <LoadingIllustration />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Default ───────────────────────────────────── */}
      <Section
        title="Default"
        description="The standard page loader with three bouncing dots and rotating messages. This is what users see while a lazy-loaded page is being fetched."
      >
        <ExampleRow label="Default (medium)">
          <div style={{ width: "100%", minHeight: 320, position: "relative" }}>
            <PageLoader delay={0} />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Sizes ─────────────────────────────────────── */}
      <Section
        title="Sizes"
        description="Three size presets — sm for inline areas, md (default) for full pages, and lg for prominent splash screens."
      >
        <ExampleRow label="Small">
          <div style={{ width: "100%", minHeight: 180, position: "relative" }}>
            <PageLoader size="sm" delay={0} />
          </div>
        </ExampleRow>
        <ExampleRow label="Medium (default)">
          <div style={{ width: "100%", minHeight: 280, position: "relative" }}>
            <PageLoader size="md" delay={0} />
          </div>
        </ExampleRow>
        <ExampleRow label="Large">
          <div style={{ width: "100%", minHeight: 360, position: "relative" }}>
            <PageLoader size="lg" delay={0} />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Custom messages ────────────────────────────── */}
      <Section
        title="Custom Messages"
        description="Pass an array of strings to customise the rotating status text. Useful for giving context about what's loading."
      >
        <ExampleRow label="Exchange context">
          <div style={{ width: "100%", minHeight: 280, position: "relative" }}>
            <PageLoader
              delay={0}
              messages={[
                "Fetching market data…",
                "Loading order book…",
                "Syncing balances…",
                "Preparing charts…",
              ]}
              messageInterval={1800}
            />
          </div>
        </ExampleRow>
      </Section>

      {/* ── Custom dot count ──────────────────────────── */}
      <Section
        title="Dot Count"
        description="Adjust the number of bouncing dots for visual variety."
      >
        <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
          <ExampleRow label="2 dots">
            <div style={{ width: "100%", minHeight: 200, position: "relative" }}>
              <PageLoader dotCount={2} messages={["Loading…"]} delay={0} />
            </div>
          </ExampleRow>
          <ExampleRow label="5 dots">
            <div style={{ width: "100%", minHeight: 200, position: "relative" }}>
              <PageLoader dotCount={5} messages={["Processing…"]} delay={0} />
            </div>
          </ExampleRow>
        </div>
      </Section>

      {/* ── FadeInContent wrapper ─────────────────────── */}
      <Section
        title="FadeInContent"
        description="Wrap any content in FadeInContent to give it a subtle enter animation after the loader resolves. Prevents a hard jump from loader to content."
      >
        <FadeInDemo />
      </Section>

      {/* ── Page-Specific Illustrations ────────────────── */}
      <Section
        title="Page-Specific Variants"
        description="Each page category gets a unique loading illustration that hints at the content being loaded. 22 variants cover all foundation, component, and pattern pages."
      >
        <IllustrationGallery />
      </Section>

      {/* ── Usage / code snippet ──────────────────────── */}
      <Section
        title="Usage"
        description="How to use PageLoader as a Suspense fallback for lazy-loaded routes, and FadeInContent for smooth page entry."
      >
        <div
          className="rounded-xl border"
          style={{
            borderColor: "var(--border-subtle)",
            overflow: "hidden",
          }}
        >
          <div
            className="flex items-center border-b rounded-t-xl"
            style={{
              padding: "var(--space-4) var(--space-7)",
              backgroundColor: "var(--preview-header-bg)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-overline)",
                fontWeight: "var(--font-weight-bold)",
                letterSpacing: "var(--ls-overline)",
                textTransform: "uppercase",
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              Route Setup
            </span>
          </div>
          <pre
            style={{
              padding: "var(--space-7)",
              margin: 0,
              fontSize: "var(--text-body-sm)",
              lineHeight: "var(--lh-body)",
              fontFamily: "var(--font-family-mono)",
              color: "var(--foreground)",
              backgroundColor: "var(--background)",
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
{`import { lazy, Suspense } from "react";
import { PageLoader } from "./components/ui/page-loader";

const MyPage = lazy(() => import("./pages/my-page"));

function MyPageRoute() {
  return (
    <Suspense fallback={<PageLoader />}>
      <MyPage />
    </Suspense>
  );
}`}
          </pre>
        </div>

        <div style={{ marginTop: "var(--space-5)" }}>
          <div
            className="rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              overflow: "hidden",
            }}
          >
            <div
              className="flex items-center border-b rounded-t-xl"
              style={{
                padding: "var(--space-4) var(--space-7)",
                backgroundColor: "var(--preview-header-bg)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-overline)",
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "var(--ls-overline)",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-family-supreme)",
                }}
              >
                FadeInContent Wrapper
              </span>
            </div>
            <pre
              style={{
                padding: "var(--space-7)",
                margin: 0,
                fontSize: "var(--text-body-sm)",
                lineHeight: "var(--lh-body)",
                fontFamily: "var(--font-family-mono)",
                color: "var(--foreground)",
                backgroundColor: "var(--background)",
                overflowX: "auto",
                whiteSpace: "pre",
              }}
            >
{`import { FadeInContent } from "./components/ui/page-loader";

export function MyPage() {
  return (
    <FadeInContent>
      <h1>Page Content</h1>
      <p>Fades in smoothly after loading.</p>
    </FadeInContent>
  );
}`}
            </pre>
          </div>
        </div>

        <div style={{ marginTop: "var(--space-5)" }}>
          <div
            className="rounded-xl border"
            style={{
              borderColor: "var(--border-subtle)",
              overflow: "hidden",
            }}
          >
            <div
              className="flex items-center border-b rounded-t-xl"
              style={{
                padding: "var(--space-4) var(--space-7)",
                backgroundColor: "var(--preview-header-bg)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--text-overline)",
                  fontWeight: "var(--font-weight-bold)",
                  letterSpacing: "var(--ls-overline)",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-family-supreme)",
                }}
              >
                Custom Props
              </span>
            </div>
            <pre
              style={{
                padding: "var(--space-7)",
                margin: 0,
                fontSize: "var(--text-body-sm)",
                lineHeight: "var(--lh-body)",
                fontFamily: "var(--font-family-mono)",
                color: "var(--foreground)",
                backgroundColor: "var(--background)",
                overflowX: "auto",
                whiteSpace: "pre",
              }}
            >
{`<PageLoader
  size="sm"               // "sm" | "md" | "lg"
  dotCount={4}            // number of bouncing dots
  messages={[             // rotating status messages
    "Fetching data…",
    "Preparing view…",
  ]}
  messageInterval={2000}  // ms between rotations
/>`}
            </pre>
          </div>
        </div>
      </Section>

      {/* ── Props table ───────────────────────────────── */}
      <Section
        title="Props"
        description="All props are optional — the component works out of the box with sensible defaults."
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
              fontSize: "var(--text-body-sm)",
              lineHeight: "var(--lh-body-sm)",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "var(--preview-header-bg, var(--secondary))",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "var(--space-4) var(--space-5)",
                      fontWeight: "var(--font-weight-semibold)",
                      fontSize: "var(--text-overline)",
                      letterSpacing: "var(--ls-overline)",
                      textTransform: "uppercase",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  prop: "size",
                  type: '"sm" | "md" | "lg"',
                  def: '"md"',
                  desc: "Visual size preset controlling dot size and vertical spacing.",
                },
                {
                  prop: "messages",
                  type: "string[]",
                  def: '[\"Loading…\", \"Preparing…\", \"Almost ready…\"]',
                  desc: "Array of status strings that rotate below the dots. If omitted, auto-resolves contextual messages from the variant (e.g. 'Loading color tokens…' for the colors variant).",
                },
                {
                  prop: "messageInterval",
                  type: "number",
                  def: "2400",
                  desc: "Milliseconds between message rotations.",
                },
                {
                  prop: "dotCount",
                  type: "number",
                  def: "3",
                  desc: "Number of bouncing dots rendered.",
                },
                {
                  prop: "variant",
                  type: "IllustrationVariant",
                  def: '"default"',
                  desc: "Page-specific illustration variant. 22 options that hint at the loading content.",
                },
                {
                  prop: "delay",
                  type: "number",
                  def: "180",
                  desc: "Milliseconds to wait before showing the loader. Prevents flash on fast-loading pages. Set to 0 to disable.",
                },
              ].map((row, i) => (
                <tr
                  key={row.prop}
                  style={{
                    borderBottom:
                      i < 5 ? "1px solid var(--border-subtle)" : undefined,
                    backgroundColor: "var(--background)",
                  }}
                >
                  <td
                    style={{
                      padding: "var(--space-4) var(--space-5)",
                      fontFamily: "var(--font-family-mono)",
                      color: "var(--primary)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    {row.prop}
                  </td>
                  <td
                    style={{
                      padding: "var(--space-4) var(--space-5)",
                      fontFamily: "var(--font-family-mono)",
                      color: "var(--foreground)",
                    }}
                  >
                    {row.type}
                  </td>
                  <td
                    style={{
                      padding: "var(--space-4) var(--space-5)",
                      fontFamily: "var(--font-family-mono)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {row.def}
                  </td>
                  <td
                    style={{
                      padding: "var(--space-4) var(--space-5)",
                      color: "var(--foreground)",
                    }}
                  >
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </ComponentPage>
  );
}

/* ── Interactive FadeInContent demo ──────────────────────────── */
function FadeInDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
      <button
        onClick={() => setKey((k) => k + 1)}
        style={{
          alignSelf: "flex-start",
          padding: "var(--space-3) var(--space-6)",
          borderRadius: "var(--radius-button)",
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          fontFamily: "var(--font-family-supreme)",
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-medium)",
          border: "none",
          cursor: "pointer",
          transition: "opacity var(--motion-hover)",
        }}
      >
        Replay animation
      </button>
      <ExampleRow label="FadeInContent">
        <div style={{ width: "100%" }}>
          <FadeInContent key={key}>
            <div
              className="flex flex-col"
              style={{
                gap: "var(--space-4)",
                padding: "var(--space-5)",
              }}
            >
              <div
                className="rounded-lg"
                style={{
                  height: 12,
                  width: "60%",
                  backgroundColor: "var(--muted)",
                  borderRadius: "var(--radius)",
                }}
              />
              <div
                className="rounded-lg"
                style={{
                  height: 12,
                  width: "90%",
                  backgroundColor: "var(--muted)",
                  borderRadius: "var(--radius)",
                }}
              />
              <div
                className="rounded-lg"
                style={{
                  height: 12,
                  width: "75%",
                  backgroundColor: "var(--muted)",
                  borderRadius: "var(--radius)",
                }}
              />
              <p
                style={{
                  marginTop: "var(--space-3)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-family-mono)",
                }}
              >
                Content fades in with a subtle upward slide.
              </p>
            </div>
          </FadeInContent>
        </div>
      </ExampleRow>
    </div>
  );
}

/* ── Illustration Gallery ────────────────────────────────────── */
function IllustrationGallery() {
  const variants: { variant: IllustrationVariant; label: string; pages: string }[] = [
    { variant: "default", label: "Default", pages: "Generic fallback" },
    { variant: "colors", label: "Colors", pages: "Colors" },
    { variant: "typography", label: "Typography", pages: "Typography" },
    { variant: "spacing", label: "Spacing", pages: "Spacing" },
    { variant: "icons", label: "Icons", pages: "Icons" },
    { variant: "motion", label: "Motion", pages: "Motion" },
    { variant: "agent", label: "Agent", pages: "Agent Legibility" },
    { variant: "button", label: "Button", pages: "Button, FAB, Link" },
    { variant: "input", label: "Input", pages: "Input, Textarea, Search" },
    { variant: "control", label: "Control", pages: "Checkbox, Radio, Toggle" },
    { variant: "slider", label: "Slider", pages: "Slider" },
    { variant: "select", label: "Select", pages: "Select, Dropdown, Context Menu" },
    { variant: "picker", label: "Picker", pages: "Date Picker" },
    { variant: "panels", label: "Panels", pages: "Accordion, Tab, Collapsible" },
    { variant: "overlay", label: "Overlay", pages: "Modal, Sheet, Popover, Tooltip" },
    { variant: "nav", label: "Navigation", pages: "Header, Sidebar, Breadcrumb" },
    { variant: "data", label: "Data", pages: "Table, List, Pagination" },
    { variant: "tags", label: "Tags", pages: "Badge, Chip, Avatar" },
    { variant: "progress", label: "Progress", pages: "Progress, Stepper, Skeleton" },
    { variant: "feedback", label: "Feedback", pages: "Alert, Toast" },
    { variant: "layout", label: "Layout", pages: "Carousel, Resizable" },
    { variant: "card", label: "Card", pages: "Coin Card" },
    { variant: "patterns", label: "Patterns", pages: "Data Display, Email, Testing" },
  ];

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "var(--space-4)",
      }}
    >
      {variants.map(({ variant, label, pages }) => (
        <div
          key={variant}
          className="flex flex-col items-center rounded-xl border"
          style={{
            borderColor: "var(--border-subtle)",
            padding: "var(--space-5) var(--space-3)",
            backgroundColor: "var(--background)",
            gap: "var(--space-2)",
          }}
        >
          <div style={{ transform: "scale(0.65)", transformOrigin: "center center", margin: "-20px 0" }}>
            <PageLoadingIllustration variant={variant} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "var(--text-body-sm)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--foreground)",
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontSize: "var(--text-caption)",
              color: "var(--muted-foreground)",
              textAlign: "center",
            }}
          >
            {pages}
          </span>
        </div>
      ))}
    </div>
  );
}