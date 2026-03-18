/**
 * No-results illustration for search empty state.
 * Matches HollaEx illustration system (2-color palette per theme):
 *   Light: navy #182D53 outlines + var(--brand-default) blue accent
 *   Dark:  silver #CBD2D7 outlines + var(--brand-default) blue accent
 */
export function NoResultsIllustration({ className }: { className?: string }) {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="72" cy="62" r="56" className="fill-[#F2F4F5] dark:fill-[#1a2333]" />

      {/* Magnifying glass body (circle) */}
      <circle cx="68" cy="56" r="32" strokeWidth="4" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
      <circle cx="68" cy="56" r="26" strokeWidth="2" fill="none" className="stroke-[#182D53]/10 dark:stroke-[#CBD2D7]/10" />

      {/* Magnifying glass handle */}
      <rect
        x="91.5"
        y="80"
        width="12"
        height="32"
        rx="6"
        transform="rotate(-45 91.5 80)"
        className="fill-[#182D53] dark:fill-[#CBD2D7]"
      />
      {/* Handle accent stripe */}
      <rect
        x="94.5"
        y="83"
        width="6"
        height="18"
        rx="3"
        transform="rotate(-45 94.5 83)"
        style={{ fill: "var(--brand-default)" }}
      />

      {/* Sad face - X eyes */}
      <path d="M56 50L60 54M60 50L56 54" strokeWidth="2.5" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
      <path d="M76 50L80 54M80 50L76 54" strokeWidth="2.5" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />

      {/* Sad mouth - frown */}
      <path d="M60 66C62 63 74 63 76 66" strokeWidth="2.5" strokeLinecap="round" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />

      {/* Document/page behind glass */}
      <rect x="104" y="12" width="36" height="46" rx="4" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#E2E8F0]" />
      {/* Document top line (bold) */}
      <line x1="112" y1="24" x2="132" y2="24" strokeWidth="2.5" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
      {/* Document body lines (muted) */}
      <line x1="112" y1="32" x2="128" y2="32" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
      <line x1="112" y1="39" x2="130" y2="39" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
      <line x1="112" y1="46" x2="124" y2="46" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
      {/* Document accent bar */}
      <rect x="108" y="18" width="3" height="18" rx="1.5" style={{ fill: "var(--brand-default)" }} />

      {/* Sparkle top-right — navy/silver */}
      <path
        d="M140 8L141.5 12.5L146 14L141.5 15.5L140 20L138.5 15.5L134 14L138.5 12.5L140 8Z"
        className="fill-[#182D53] dark:fill-[#CBD2D7]"
      />
      {/* Sparkle small bottom-left — navy/silver */}
      <path
        d="M16 100L17 103L20 104L17 105L16 108L15 105L12 104L15 103L16 100Z"
        className="fill-[#182D53] dark:fill-[#CBD2D7]"
      />
      {/* Sparkle small top-left — brand accent */}
      <path
        d="M28 16L29 18.5L31.5 19.5L29 20.5L28 23L27 20.5L24.5 19.5L27 18.5L28 16Z"
        style={{ fill: "var(--brand-default)" }}
      />

      {/* Question mark */}
      <text
        x="100"
        y="72"
        className="fill-[#182D53]/30 dark:fill-[#CBD2D7]/30"
        style={{ fontSize: "18px", fontFamily: "var(--font-family-supreme)", fontWeight: 700 }}
      >
        ?
      </text>
    </svg>
  );
}