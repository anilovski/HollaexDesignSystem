import { useState, useEffect } from "react";

const CDN_BASE_OUTLINE =
  "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/outline";
const CDN_BASE_FILLED =
  "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/filled";

export type TablerIconVariant = "outline" | "filled";

export interface TablerIconProps {
  name: string;
  size?: number;
  variant?: TablerIconVariant;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
}

/**
 * Renders a Tabler icon SVG from the CDN.
 * name    – the kebab-case icon name, e.g. "arrow-right", "home"
 * variant – "outline" (default) or "filled"
 */
export function TablerIcon({
  name,
  size = 24,
  variant = "outline",
  className,
  style,
}: TablerIconProps) {
  const [filledFailed, setFilledFailed] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setFilledFailed(false);
    setErr(false);
  }, [name, variant]);

  // If filled was requested but 404'd, gracefully fall back to outline
  const effectiveVariant =
    variant === "filled" && filledFailed ? "outline" : variant;
  const base =
    effectiveVariant === "filled" ? CDN_BASE_FILLED : CDN_BASE_OUTLINE;
  const src = `${base}/${name}.svg`;

  if (err) {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          borderRadius: "var(--radius-xs)",
          backgroundColor: "var(--secondary)",
          color: "var(--muted-foreground)",
          fontFamily: "var(--font-family-supreme)",
          fontSize: Math.max(7, size * 0.28),
          lineHeight: 1,
          userSelect: "none",
          flexShrink: 0,
          ...style,
        }}
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      style={{
        flexShrink: 0,
        ...style,
      }}
      onError={() => {
        // If we were trying filled and it failed, fall back to outline
        if (variant === "filled" && !filledFailed) {
          setFilledFailed(true);
        } else {
          setErr(true);
        }
      }}
      loading="lazy"
    />
  );
}

/** Curated list of popular Tabler icons — grouped by category */
export type TablerIconCategory = {
  category: string;
  /** A single icon name that represents this category */
  representativeIcon: string;
  icons: string[];
};

export const TABLER_ICON_CATEGORIES: TablerIconCategory[] = [
  {
    category: "Arrows",
    representativeIcon: "arrow-right",
    icons: [
      "arrow-up", "arrow-down", "arrow-left", "arrow-right",
      "arrow-up-left", "arrow-up-right", "arrow-down-left", "arrow-down-right",
      "arrow-narrow-up", "arrow-narrow-down", "arrow-narrow-left", "arrow-narrow-right",
      "arrows-maximize", "arrows-minimize", "arrows-sort", "arrows-exchange",
      "arrow-back-up", "arrow-forward-up", "arrow-bar-up", "arrow-bar-down",
      "chevron-up", "chevron-down", "chevron-left", "chevron-right",
      "chevrons-up", "chevrons-down", "chevrons-left", "chevrons-right",
      "caret-up", "caret-down", "caret-left", "caret-right",
      "switch-horizontal", "switch-vertical", "refresh", "rotate",
      "rotate-clockwise", "corner-up-left", "corner-up-right", "corner-down-left",
    ],
  },
  {
    category: "Interface",
    representativeIcon: "layout-dashboard",
    icons: [
      "home", "menu-2", "dots", "dots-vertical",
      "search", "settings", "adjustments", "filter",
      "sort-ascending", "sort-descending", "layout-grid", "layout-list",
      "layout-dashboard", "apps", "category", "grid-dots",
      "maximize", "minimize", "selector", "click",
      "pointer", "hand-click", "hand-move", "hand-stop",
      "external-link", "link", "unlink", "share",
      "share-2", "upload", "download", "cloud-upload",
      "cloud-download", "clipboard", "clipboard-check", "clipboard-list",
      "copy", "cut", "trash", "trash-x",
      "edit", "pencil", "eraser", "highlight",
      "pin", "pinned", "pinned-off", "bookmark",
      "bookmarks", "archive", "inbox", "send",
    ],
  },
  {
    category: "Media",
    representativeIcon: "player-play",
    icons: [
      "photo", "camera", "video", "movie",
      "music", "microphone", "volume", "volume-2",
      "volume-3", "volume-off", "player-play", "player-pause",
      "player-stop", "player-skip-forward", "player-skip-back", "player-record",
      "screen-share", "cast", "antenna", "broadcast",
      "headphones", "disc", "vinyl", "radio",
    ],
  },
  {
    category: "Communication",
    representativeIcon: "message-circle",
    icons: [
      "mail", "mail-opened", "inbox", "send",
      "message", "message-circle", "message-dots", "messages",
      "phone", "phone-call", "phone-incoming", "phone-off",
      "at", "brand-telegram", "brand-whatsapp", "brand-discord",
      "brand-slack", "brand-twitter", "brand-facebook", "brand-instagram",
      "brand-github", "brand-linkedin", "brand-youtube", "brand-google",
    ],
  },
  {
    category: "Files & Documents",
    representativeIcon: "file-text",
    icons: [
      "file", "file-text", "file-code", "file-analytics",
      "file-download", "file-upload", "file-check", "file-x",
      "file-plus", "file-minus", "file-zip", "file-spreadsheet",
      "files", "folder", "folder-open", "folder-plus",
      "folder-minus", "folder-x", "notebook", "notes",
      "report", "report-analytics", "article", "news",
    ],
  },
  {
    category: "Users & People",
    representativeIcon: "users",
    icons: [
      "user", "user-plus", "user-minus", "user-check",
      "user-x", "user-circle", "users", "users-group",
      "friends", "man", "woman", "genderless",
      "id", "id-badge", "id-badge-2", "address-book",
    ],
  },
  {
    category: "Alerts & Status",
    representativeIcon: "alert-circle",
    icons: [
      "alert-circle", "alert-triangle", "info-circle", "help",
      "question-mark", "exclamation-mark", "check", "x",
      "circle-check", "circle-x", "circle-plus", "circle-minus",
      "square-check", "square-x", "square-plus", "square-minus",
      "bell", "bell-off", "bell-ringing", "urgent",
      "bug", "shield", "shield-check", "shield-lock",
      "lock", "lock-open", "key", "fingerprint",
    ],
  },
  {
    category: "Data & Charts",
    representativeIcon: "chart-bar",
    icons: [
      "chart-bar", "chart-line", "chart-area", "chart-pie",
      "chart-dots", "chart-candle", "chart-bubble", "chart-radar",
      "trending-up", "trending-down", "activity", "pulse",
      "database", "server", "server-2", "cloud",
      "table", "columns", "list", "list-check",
      "list-numbers", "list-details", "list-search", "list-tree",
    ],
  },
  {
    category: "E-commerce & Finance",
    representativeIcon: "shopping-cart",
    icons: [
      "shopping-cart", "shopping-bag", "basket", "receipt",
      "receipt-2", "tag", "tags", "discount",
      "gift", "wallet", "credit-card", "cash",
      "coins", "currency-dollar", "currency-euro", "currency-bitcoin",
      "currency-ethereum", "currency-pound", "currency-yen", "currency-rupee",
      "building-bank", "building-store", "building-warehouse", "package",
    ],
  },
  {
    category: "Development",
    representativeIcon: "code",
    icons: [
      "code", "terminal", "terminal-2", "brand-html5",
      "brand-css3", "brand-javascript", "brand-typescript", "brand-react",
      "brand-python", "brand-nodejs-alt", "brand-docker", "brand-git",
      "api", "webhook", "database", "variable",
      "brackets", "braces", "regex", "bug",
      "test-pipe", "git-branch", "git-commit", "git-merge",
      "git-pull-request", "git-fork", "brand-npm", "brand-vscode",
    ],
  },
  {
    category: "Devices",
    representativeIcon: "device-laptop",
    icons: [
      "device-desktop", "device-laptop", "device-tablet", "device-mobile",
      "device-watch", "device-tv", "device-gamepad", "device-speaker",
      "printer", "keyboard", "mouse", "bluetooth",
      "wifi", "wifi-off", "antenna-bars-5", "satellite",
      "cpu", "cpu-2", "circuit-board", "plug",
      "battery", "battery-charging", "battery-1", "battery-4",
    ],
  },
  {
    category: "Map & Travel",
    representativeIcon: "map-pin",
    icons: [
      "map", "map-pin", "map-2", "compass",
      "world", "globe", "plane", "car",
      "ship", "train", "bike", "walk",
      "bus", "helicopter", "rocket", "parachute",
      "building", "home-2", "tent", "mountain",
      "trees", "sun", "moon", "cloud-rain",
    ],
  },
  {
    category: "Shapes & Math",
    representativeIcon: "star",
    icons: [
      "circle", "square", "triangle", "diamond",
      "hexagon", "octagon", "pentagon", "star",
      "heart", "thumb-up", "thumb-down", "flame",
      "bolt", "sparkles", "wand", "magic-wand",
      "plus", "minus", "equal", "percentage",
      "math-function", "calculator", "ruler", "ruler-2",
    ],
  },
  {
    category: "Text & Typography",
    representativeIcon: "typography",
    icons: [
      "bold", "italic", "underline", "strikethrough",
      "subscript", "superscript", "align-left", "align-center",
      "align-right", "align-justified", "indent-increase", "indent-decrease",
      "text-size", "text-color", "text-wrap", "typography",
      "heading", "letter-case", "letter-case-upper", "letter-case-lower",
      "quote", "blockquote", "text-direction-ltr", "text-direction-rtl",
    ],
  },
  {
    category: "Time & Calendar",
    representativeIcon: "clock",
    icons: [
      "clock", "clock-hour-3", "clock-hour-6", "clock-hour-9",
      "alarm", "hourglass", "timer", "stopwatch",
      "calendar", "calendar-event", "calendar-plus", "calendar-minus",
      "calendar-check", "calendar-x", "calendar-time", "calendar-stats",
    ],
  },
  {
    category: "Toggle & Controls",
    representativeIcon: "eye",
    icons: [
      "toggle-left", "toggle-right", "switch-2", "switch-3",
      "checkbox", "radio-button", "eye", "eye-off",
      "zoom-in", "zoom-out", "scan", "qrcode",
      "barcode", "crosshair", "focus", "focus-2",
    ],
  },
];

/** Flat list of all icon names */
export const ALL_TABLER_ICONS = TABLER_ICON_CATEGORIES.flatMap(
  (c) => c.icons.map((name) => ({ name, category: c.category }))
);