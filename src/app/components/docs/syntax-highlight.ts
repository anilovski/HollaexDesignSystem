/**
 * Lightweight regex-based JSX/TSX syntax highlighter.
 * Returns an HTML string with <span class="hl-*"> wrappers for token coloring.
 * Colors are controlled by CSS custom properties defined in theme.css.
 */

const ESCAPE: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ESCAPE[c] ?? c);
}

interface Token {
  pattern: RegExp;
  className: string;
}

const TOKENS: Token[] = [
  // Block comments
  { pattern: /\/\*[\s\S]*?\*\//g, className: "hl-comment" },
  // Line comments
  { pattern: /\/\/[^\n]*/g, className: "hl-comment" },
  // Template literals (simple — no nested expressions)
  { pattern: /`[^`]*`/g, className: "hl-string" },
  // Double-quoted strings
  { pattern: /"(?:[^"\\]|\\.)*"/g, className: "hl-string" },
  // Single-quoted strings
  { pattern: /'(?:[^'\\]|\\.)*'/g, className: "hl-string" },
  // JSX self-closing or opening tags: <Component or </Component
  { pattern: /<\/?[A-Z][A-Za-z0-9.]*/g, className: "hl-tag" },
  // HTML-like tags: <div, </div, <span, etc.
  { pattern: /<\/?(?:div|span|p|h[1-6]|ul|ol|li|a|img|button|input|form|label|section|nav|header|footer|main|table|tr|td|th|thead|tbody)\b/g, className: "hl-tag" },
  // Self-closing end />
  { pattern: /\/>/g, className: "hl-tag" },
  // Keywords
  { pattern: /\b(?:import|from|export|default|const|let|var|function|return|if|else|switch|case|break|new|typeof|instanceof|void|null|undefined|true|false|async|await|class|extends|type|interface)\b/g, className: "hl-keyword" },
  // JSX attribute names (word followed by = in tag context)
  { pattern: /\b[a-zA-Z][\w-]*(?==)/g, className: "hl-attr" },
  // Numbers
  { pattern: /\b\d+(?:\.\d+)?\b/g, className: "hl-number" },
  // Braces in JSX expressions
  { pattern: /[{}()[\]]/g, className: "hl-punct" },
];

export function highlightJsx(code: string): string {
  // Collect all matches with their positions
  const spans: { start: number; end: number; className: string; text: string }[] = [];

  for (const { pattern, className } of TOKENS) {
    const re = new RegExp(pattern.source, pattern.flags);
    let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) {
      spans.push({ start: m.index, end: m.index + m[0].length, className, text: m[0] });
    }
  }

  // Sort by start position, longer matches first for ties
  spans.sort((a, b) => a.start - b.start || b.end - a.end);

  // Remove overlapping spans (first match wins)
  const filtered: typeof spans = [];
  let lastEnd = 0;
  for (const span of spans) {
    if (span.start >= lastEnd) {
      filtered.push(span);
      lastEnd = span.end;
    }
  }

  // Build output
  let result = "";
  let pos = 0;
  for (const span of filtered) {
    if (span.start > pos) {
      result += esc(code.slice(pos, span.start));
    }
    result += `<span class="${span.className}">${esc(span.text)}</span>`;
    pos = span.end;
  }
  if (pos < code.length) {
    result += esc(code.slice(pos));
  }

  return result;
}
