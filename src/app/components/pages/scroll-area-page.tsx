import { useState, useRef, useEffect } from "react";
import {
  ComponentPage,
  Section,
  ExampleRow,
  ExampleGrid,
} from "../docs/component-page";
import { useScrollbar } from "../ui/use-scrollbar";

/* ── Reusable demo wrapper ────────────────────── */
function ScrollDemo({
  height = 240,
  children,
  style,
}: {
  height?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const scrollRef = useScrollbar<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      style={{
        height,
        overflowY: "auto",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--background)",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Placeholder content generators ───────────── */
function TextLines({ count = 30 }: { count?: number }) {
  const lines = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      style={{
        padding: "10px 16px",
        borderBottom: "1px solid var(--border-subtle)",
        fontSize: "var(--text-label)",
        fontFamily: "var(--font-family-supreme)",
        color: "var(--color-text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>Item {i + 1}</span>
      <span
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "11px",
          color: "var(--color-text-tertiary)",
        }}
      >
        row-{String(i + 1).padStart(3, "0")}
      </span>
    </div>
  ));
  return <>{lines}</>;
}

function ParagraphContent() {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "var(--font-family-supreme)",
        fontSize: "var(--text-base)",
        color: "var(--color-text-secondary)",
        lineHeight: 1.7,
      }}
    >
      <p style={{ marginBottom: "16px" }}>
        The custom scrollbar replaces the native browser scrollbar with a
        macOS-style overlay thumb that auto-hides after a configurable delay.
        It supports click-and-drag interaction, smooth fade-in/out transitions,
        and hover expansion.
      </p>
      <p style={{ marginBottom: "16px" }}>
        All styling is driven by CSS variables: <code style={codeSt}>--scrollbar-size</code>,{" "}
        <code style={codeSt}>--scrollbar-thumb</code>,{" "}
        <code style={codeSt}>--scrollbar-thumb-hover</code>,{" "}
        <code style={codeSt}>--scrollbar-thumb-active</code>,{" "}
        <code style={codeSt}>--scrollbar-radius</code>,{" "}
        <code style={codeSt}>--scrollbar-fade-in</code>,{" "}
        <code style={codeSt}>--scrollbar-fade-out</code>, and{" "}
        <code style={codeSt}>--scrollbar-margin</code>.
      </p>
      <p style={{ marginBottom: "16px" }}>
        The hook uses a <code style={codeSt}>ResizeObserver</code> to
        recalculate the thumb size and position whenever the container or its
        content resizes — so expanding accordions, lazy-loaded lists, and
        dynamic content all work correctly.
      </p>
      <p style={{ marginBottom: "16px" }}>
        The thumb is positioned using <code style={codeSt}>position: absolute</code> inside the
        scroll container. To stay fixed in the visible viewport while the
        container scrolls, the <code style={codeSt}>translateY</code> value includes the
        container's <code style={codeSt}>scrollTop</code> offset.
      </p>
      <p style={{ marginBottom: "16px" }}>
        During drag interactions, text selection is disabled on the body to
        prevent accidental highlighting, and the thumb stays visible until the
        user releases the mouse button.
      </p>
      <p>
        The native scrollbar is hidden via <code style={codeSt}>.hx-scrollbar</code> which
        applies <code style={codeSt}>scrollbar-width: none</code> (Firefox) and{" "}
        <code style={codeSt}>::-webkit-scrollbar &#123; display: none &#125;</code> (WebKit/Blink).
      </p>
    </div>
  );
}

const codeSt: React.CSSProperties = {
  fontFamily: "var(--font-family-mono)",
  fontSize: "11px",
  backgroundColor: "var(--secondary)",
  padding: "2px 6px",
  borderRadius: "var(--radius-xs)",
  color: "var(--foreground)",
};

function ColorCards({ count = 24 }: { count?: number }) {
  const hues = [
    "var(--status-info)",
    "var(--status-success)",
    "var(--status-warning)",
    "var(--status-error)",
    "var(--brand-default)",
    "var(--color-text-tertiary)",
  ];
  return (
    <div
      style={{
        padding: "16px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: "12px",
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          style={{
            height: "64px",
            borderRadius: "var(--radius)",
            backgroundColor: hues[i % hues.length],
            opacity: 0.15 + (i % 6) * 0.14,
            border: "1px solid var(--border-subtle)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Dynamic content demo ─────────────────────── */
function DynamicContentDemo() {
  const [itemCount, setItemCount] = useState(8);
  const scrollRef = useScrollbar<HTMLDivElement>();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={() => setItemCount((c) => Math.max(1, c - 4))}
          style={btnSt}
        >
          – 4 items
        </button>
        <button
          onClick={() => setItemCount((c) => c + 4)}
          style={btnSt}
        >
          + 4 items
        </button>
        <span
          style={{
            fontSize: "var(--text-label)",
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-family-supreme)",
          }}
        >
          {itemCount} items
        </span>
      </div>
      <div
        ref={scrollRef}
        style={{
          height: 220,
          overflowY: "auto",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--border-subtle)",
          backgroundColor: "var(--background)",
          position: "relative",
        }}
      >
        <TextLines count={itemCount} />
      </div>
    </div>
  );
}

const btnSt: React.CSSProperties = {
  padding: "6px 14px",
  borderRadius: "var(--radius)",
  border: "1px solid var(--border)",
  backgroundColor: "var(--secondary)",
  color: "var(--foreground)",
  fontFamily: "var(--font-family-supreme)",
  fontWeight: "var(--font-weight-medium)",
  fontSize: "var(--text-label)",
  cursor: "pointer",
};

/* ── Configurable hide-delay demo ─────────────── */
function HideDelayDemo() {
  const [delay, setDelay] = useState<600 | 1200 | 3000>(1200);
  const fastRef = useScrollbar<HTMLDivElement>(delay);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {([600, 1200, 3000] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDelay(d)}
            style={{
              ...btnSt,
              backgroundColor:
                delay === d ? "var(--foreground)" : "var(--secondary)",
              color:
                delay === d ? "var(--background)" : "var(--foreground)",
            }}
          >
            {d}ms
          </button>
        ))}
        <span
          style={{
            fontSize: "var(--text-label)",
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-family-supreme)",
          }}
        >
          Hide delay
        </span>
      </div>
      <div
        key={delay}
        ref={fastRef}
        style={{
          height: 200,
          overflowY: "auto",
          borderRadius: "var(--radius-card)",
          border: "1px solid var(--border-subtle)",
          backgroundColor: "var(--background)",
          position: "relative",
        }}
      >
        <TextLines count={25} />
      </div>
    </div>
  );
}

/* ── Few items (no scrollbar needed) demo ─────── */
function FewItemsDemo() {
  const scrollRef = useScrollbar<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      style={{
        height: 240,
        overflowY: "auto",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--border-subtle)",
        backgroundColor: "var(--background)",
        position: "relative",
      }}
    >
      <TextLines count={3} />
    </div>
  );
}

/* ── Code block helper ────────────────────────── */
function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      style={{
        fontFamily: "var(--font-family-mono)",
        fontSize: "12px",
        lineHeight: 1.7,
        backgroundColor: "var(--secondary)",
        borderRadius: "var(--radius-card)",
        padding: "20px 24px",
        overflowX: "auto",
        color: "var(--foreground)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <code>{code}</code>
    </pre>
  );
}

/* ── API Prop row ─────────────────────────────── */
function PropRow({
  name,
  type,
  defaultVal,
  description,
}: {
  name: string;
  type: string;
  defaultVal: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 160px 100px 1fr",
        gap: "12px",
        padding: "12px 0",
        borderBottom: "1px solid var(--border-subtle)",
        alignItems: "baseline",
      }}
    >
      <code
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "12px",
          color: "var(--brand-default)",
        }}
      >
        {name}
      </code>
      <code
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "11px",
          color: "var(--color-text-secondary)",
        }}
      >
        {type}
      </code>
      <code
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "11px",
          color: "var(--color-text-tertiary)",
        }}
      >
        {defaultVal}
      </code>
      <span
        style={{
          fontFamily: "var(--font-family-supreme)",
          fontSize: "var(--text-label)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </span>
    </div>
  );
}

function TokenRow({
  token,
  description,
}: {
  token: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "12px",
        padding: "10px 0",
        borderBottom: "1px solid var(--border-subtle)",
        alignItems: "baseline",
      }}
    >
      <code
        style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "11px",
          color: "var(--brand-default)",
        }}
      >
        {token}
      </code>
      <span
        style={{
          fontFamily: "var(--font-family-supreme)",
          fontSize: "var(--text-label)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.5,
        }}
      >
        {description}
      </span>
    </div>
  );
}

/* ── Page ──────────────────────────────────────── */
export function ScrollAreaPage() {
  return (
    <ComponentPage
      name="Scroll Area"
      description="A macOS-style custom scrollbar hook that replaces the native browser scrollbar with a draggable, auto-hiding overlay thumb. All styling is CSS-variable driven for full theme control."
    >
      {/* ── 1. Basic usage ──────────────────────── */}
      <Section
        title="Basic Usage"
        description="Call useScrollbar() and attach the returned ref to any scrollable container. The native scrollbar is hidden and replaced with an overlay thumb."
      >
        <ExampleGrid label="Scrollable list">
          <ScrollDemo>
            <TextLines count={30} />
          </ScrollDemo>
        </ExampleGrid>
      </Section>

      {/* ── 2. Paragraph / mixed content ────────── */}
      <Section
        title="Mixed Content"
        description="Works with any content — paragraphs, images, cards. The thumb auto-sizes to match the scroll ratio."
      >
        <ExampleGrid label="Paragraph content">
          <ScrollDemo height={260}>
            <ParagraphContent />
          </ScrollDemo>
        </ExampleGrid>
      </Section>

      {/* ── 3. Grid content ─────────────────────── */}
      <Section
        title="Grid Content"
        description="The scrollbar adapts to any layout inside the container."
      >
        <ExampleGrid label="Color card grid">
          <ScrollDemo height={280}>
            <ColorCards count={36} />
          </ScrollDemo>
        </ExampleGrid>
      </Section>

      {/* ── 4. Dynamic content ──────────────────── */}
      <Section
        title="Dynamic Content"
        description="The thumb recalculates via ResizeObserver when content is added or removed. The scrollbar hides automatically when content fits."
      >
        <ExampleGrid label="Add / remove items">
          <DynamicContentDemo />
        </ExampleGrid>
      </Section>

      {/* ── 5. Few items (no scroll) ────────────── */}
      <Section
        title="No Overflow"
        description="When content fits within the container, the scrollbar thumb stays hidden — no empty track is shown."
      >
        <ExampleGrid label="3 items — no scrollbar">
          <FewItemsDemo />
        </ExampleGrid>
      </Section>

      {/* ── 6. Hide delay ───────────────────────── */}
      <Section
        title="Hide Delay"
        description="Pass a delay (in ms) to useScrollbar() to control how long the thumb stays visible after scrolling stops. Default is 1200ms."
      >
        <ExampleGrid label="Configurable delay">
          <HideDelayDemo />
        </ExampleGrid>
      </Section>

      {/* ── 7. Drag interaction ─────────────────── */}
      <Section
        title="Drag Interaction"
        description="Click and drag the thumb to scroll. During drag, the thumb stays visible and text selection is disabled to prevent accidental highlighting. Try it on any example above."
      >
        <ExampleGrid label="Drag the thumb to scroll">
          <ScrollDemo height={200}>
            <TextLines count={50} />
          </ScrollDemo>
        </ExampleGrid>
      </Section>

      {/* ── 8. Code example ─────────────────────── */}
      <Section
        title="Code"
        description="Import the hook and attach the ref to your scrollable container."
      >
        <CodeBlock
          code={`import { useScrollbar } from "../ui/use-scrollbar";

function MyComponent() {
  const scrollRef = useScrollbar<HTMLDivElement>();
  // optionally pass a hide delay: useScrollbar(2000)

  return (
    <div
      ref={scrollRef}
      style={{
        height: 300,
        overflowY: "auto",
        position: "relative", // required for absolute thumb
      }}
    >
      {/* your content */}
    </div>
  );
}`}
        />
      </Section>

      {/* ── 9. API ──────────────────────────────── */}
      <Section title="API" description="Hook signature and parameters.">
        <div
          style={{
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--background)",
            padding: "20px 24px",
          }}
        >
          <code
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "12px",
              color: "var(--foreground)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            useScrollbar&lt;T extends HTMLElement&gt;(hideDelay?: number):
            React.RefObject&lt;T&gt;
          </code>

          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 160px 100px 1fr",
              gap: "12px",
              padding: "8px 0",
              borderBottom: "2px solid var(--border)",
            }}
          >
            {["Param", "Type", "Default", "Description"].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          <PropRow
            name="hideDelay"
            type="number"
            defaultVal="1200"
            description="Milliseconds to wait after scroll stops before fading the thumb out."
          />
          <PropRow
            name="(return)"
            type="RefObject<T>"
            defaultVal="—"
            description="Attach this ref to your scrollable container element."
          />
        </div>
      </Section>

      {/* ── 10. CSS tokens ──────────────────────── */}
      <Section
        title="CSS Tokens"
        description="All visual properties are controlled by CSS variables defined in theme.css. Override them to customize the scrollbar across your app."
      >
        <div
          style={{
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--background)",
            padding: "20px 24px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "12px",
              padding: "8px 0",
              borderBottom: "2px solid var(--border)",
            }}
          >
            {["Token", "Description"].map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          <TokenRow
            token="--scrollbar-size"
            description="Width of the thumb track (default 6px)."
          />
          <TokenRow
            token="--scrollbar-thumb"
            description="Background color of the thumb in its default state."
          />
          <TokenRow
            token="--scrollbar-thumb-hover"
            description="Background color when hovering over the thumb."
          />
          <TokenRow
            token="--scrollbar-thumb-active"
            description="Background color when actively dragging the thumb."
          />
          <TokenRow
            token="--scrollbar-radius"
            description="Border radius of the thumb (default 100px / pill)."
          />
          <TokenRow
            token="--scrollbar-fade-in"
            description="Duration of the fade-in transition."
          />
          <TokenRow
            token="--scrollbar-fade-out"
            description="Duration of the fade-out transition."
          />
          <TokenRow
            token="--scrollbar-margin"
            description="Margin between the thumb and the container edge."
          />
        </div>
      </Section>

      {/* ── 11. CSS classes ─────────────────────── */}
      <Section
        title="CSS Classes"
        description="The hook automatically applies these classes. You can also use them manually."
      >
        <div
          style={{
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--border-subtle)",
            backgroundColor: "var(--background)",
            padding: "20px 24px",
          }}
        >
          <TokenRow
            token=".hx-scrollbar"
            description="Applied to the container. Hides the native scrollbar via scrollbar-width: none and ::-webkit-scrollbar { display: none }."
          />
          <TokenRow
            token=".hx-scrollbar-thumb"
            description="The overlay thumb element. Positioned absolutely inside the container."
          />
          <TokenRow
            token=".hx-scrollbar-thumb.visible"
            description="Added when the thumb should be visible. Enables pointer-events and sets opacity to 1."
          />
          <TokenRow
            token=".hx-hide-scrollbar"
            description="Utility class to hide the native scrollbar without adding a custom replacement."
          />
        </div>
      </Section>
    </ComponentPage>
  );
}
