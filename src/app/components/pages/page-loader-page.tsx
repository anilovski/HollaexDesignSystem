import { useState } from "react";
import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { PageLoader, FadeInContent } from "../ui/page-loader";
import { LoadingIllustration } from "../ui/loading-illustration";

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
            <PageLoader />
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
            <PageLoader size="sm" />
          </div>
        </ExampleRow>
        <ExampleRow label="Medium (default)">
          <div style={{ width: "100%", minHeight: 280, position: "relative" }}>
            <PageLoader size="md" />
          </div>
        </ExampleRow>
        <ExampleRow label="Large">
          <div style={{ width: "100%", minHeight: 360, position: "relative" }}>
            <PageLoader size="lg" />
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
              <PageLoader dotCount={2} messages={["Loading…"]} />
            </div>
          </ExampleRow>
          <ExampleRow label="5 dots">
            <div style={{ width: "100%", minHeight: 200, position: "relative" }}>
              <PageLoader dotCount={5} messages={["Processing…"]} />
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
                  def: '["Loading…", "Preparing…", "Almost ready…"]',
                  desc: "Array of status strings that rotate below the dots.",
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
              ].map((row, i) => (
                <tr
                  key={row.prop}
                  style={{
                    borderBottom:
                      i < 3 ? "1px solid var(--border-subtle)" : undefined,
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