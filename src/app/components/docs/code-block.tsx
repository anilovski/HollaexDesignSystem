import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { highlightJsx } from "./syntax-highlight";

export interface CodeBlockProps {
  /** Raw source code string */
  code: string;
  /** Language label, default "tsx" */
  language?: string;
  /** Allow collapsing the code panel, default true */
  collapsible?: boolean;
  /** Start expanded, default false */
  defaultExpanded?: boolean;
  /** Embedded mode: no outer border (used inside ExampleRow/ExampleGrid) */
  embedded?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  collapsible = true,
  defaultExpanded = false,
  embedded = false,
}: CodeBlockProps) {
  const [expanded, setExpanded] = useState(!collapsible || defaultExpanded);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const contentRef = useRef<HTMLDivElement>(null);

  const trimmed = code.trim();
  const highlighted = highlightJsx(trimmed);
  const lineCount = trimmed.split("\n").length;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(trimmed);
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={embedded ? "" : "rounded-xl border"}
      style={{
        borderColor: embedded ? undefined : "var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "var(--space-3) var(--space-5)",
          backgroundColor: "var(--code-block-bg)",
          borderBottom: expanded ? "1px solid var(--border-subtle)" : "none",
        }}
      >
        <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "var(--font-weight-bold)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family-mono)",
            }}
          >
            {language}
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "var(--muted-foreground)",
              opacity: 0.5,
              fontFamily: "var(--font-family-mono)",
            }}
          >
            {lineCount} {lineCount === 1 ? "line" : "lines"}
          </span>
        </div>

        <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center cursor-pointer transition-colors"
            style={{
              width: 28,
              height: 28,
              borderRadius: "var(--radius)",
              border: "none",
              backgroundColor: "transparent",
              color: copied ? "var(--toggle-on-bg)" : "var(--muted-foreground)",
            }}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>

          {/* Toggle button */}
          {collapsible && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center cursor-pointer transition-colors"
              style={{
                gap: "var(--space-2)",
                height: 28,
                padding: "0 var(--space-3)",
                borderRadius: "var(--radius)",
                border: "none",
                backgroundColor: "transparent",
                color: "var(--muted-foreground)",
                fontSize: "11px",
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-medium)",
              }}
              aria-expanded={expanded}
            >
              {expanded ? "Hide" : "Show"}
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
      </div>

      {/* Code body */}
      <div
        ref={contentRef}
        style={{
          maxHeight: expanded ? 600 : 0,
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease",
        }}
      >
        <pre
          style={{
            margin: 0,
            padding: "var(--space-5) var(--space-5)",
            backgroundColor: "var(--code-block-bg)",
            overflowX: "auto",
            fontFamily: "var(--font-family-mono)",
            fontSize: "13px",
            lineHeight: 1.65,
            color: "var(--foreground)",
            tabSize: 2,
          }}
        >
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
}
