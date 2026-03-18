/**
 * Loading illustration for page loader empty/loading state.
 * Matches HollaEx illustration system (2-color palette per theme):
 *   Light: navy #182D53 outlines + var(--brand-default) blue accent
 *   Dark:  silver #CBD2D7 outlines + var(--brand-default) blue accent
 *
 * Scene: A document page being assembled — blocks slide in,
 * a progress ring spins, and sparkles twinkle around the edges.
 */
export function LoadingIllustration({ className }: { className?: string }) {
  return (
    <svg
      width="180"
      height="160"
      viewBox="0 0 180 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Inline animations ──────────────────────── */}
      <style>{`
        @keyframes hx-ill-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hx-ill-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1); }
        }
        @keyframes hx-ill-slide-1 {
          0%, 100% { transform: translateX(0); opacity: 0.45; }
          50%      { transform: translateX(2px); opacity: 1; }
        }
        @keyframes hx-ill-slide-2 {
          0%, 100% { transform: translateX(0); opacity: 0.35; }
          50%      { transform: translateX(3px); opacity: 0.85; }
        }
        @keyframes hx-ill-slide-3 {
          0%, 100% { transform: translateX(0); opacity: 0.25; }
          50%      { transform: translateX(1px); opacity: 0.7; }
        }
        @keyframes hx-ill-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes hx-ill-sparkle {
          0%, 100% { opacity: 0.2; transform: scale(0.6); }
          50%      { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      {/* ── Background soft circle ─────────────────── */}
      <circle cx="82" cy="76" r="62" className="fill-[#F2F4F5] dark:fill-[#1a2333]" />

      {/* ── Main document page ─────────────────────── */}
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Page shadow */}
        <rect
          x="47" y="28" width="70" height="92" rx="6"
          className="fill-[#182D53]/5 dark:fill-[#CBD2D7]/5"
        />
        {/* Page body */}
        <rect
          x="44" y="25" width="70" height="92" rx="6"
          strokeWidth="2.5" fill="none"
          className="stroke-[#182D53] dark:stroke-[#CBD2D7]"
        />
        {/* Page inner fill — matches background */}
        <rect
          x="45.5" y="26.5" width="67" height="89" rx="5"
          className="fill-[#FAFBFC] dark:fill-[#0f1724]"
        />

        {/* Accent bar left edge */}
        <rect x="50" y="35" width="3.5" height="22" rx="1.75" style={{ fill: "var(--brand-default)" }} />

        {/* Document header line (bold) */}
        <line
          x1="58" y1="38" x2="98" y2="38" strokeWidth="3" strokeLinecap="round"
          className="stroke-[#182D53] dark:stroke-[#CBD2D7]"
        />

        {/* Content block lines — animated staggered slide-in */}
        <g style={{ animation: "hx-ill-slide-1 2.4s ease-in-out infinite" }}>
          <line x1="58" y1="48" x2="104" y2="48" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        </g>
        <g style={{ animation: "hx-ill-slide-2 2.4s ease-in-out 0.3s infinite" }}>
          <line x1="58" y1="56" x2="96" y2="56" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        </g>
        <g style={{ animation: "hx-ill-slide-3 2.4s ease-in-out 0.6s infinite" }}>
          <line x1="58" y1="64" x2="88" y2="64" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        </g>

        {/* Separator */}
        <line x1="52" y1="74" x2="108" y2="74" strokeWidth="1" className="stroke-[#182D53]/10 dark:stroke-[#CBD2D7]/10" />

        {/* Placeholder block rectangles (like UI skeleton) */}
        <g style={{ animation: "hx-ill-slide-1 3s ease-in-out 0.2s infinite" }}>
          <rect x="52" y="80" width="24" height="16" rx="3" className="fill-[#182D53]/8 dark:fill-[#CBD2D7]/8" />
          <rect x="52" y="80" width="24" height="16" rx="3" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
        </g>
        <g style={{ animation: "hx-ill-slide-2 3s ease-in-out 0.5s infinite" }}>
          <rect x="80" y="80" width="28" height="16" rx="3" className="fill-[#182D53]/8 dark:fill-[#CBD2D7]/8" />
          <rect x="80" y="80" width="28" height="16" rx="3" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
        </g>
        <g style={{ animation: "hx-ill-slide-3 3s ease-in-out 0.8s infinite" }}>
          <rect x="52" y="100" width="56" height="10" rx="3" className="fill-[#182D53]/6 dark:fill-[#CBD2D7]/6" />
        </g>
      </g>

      {/* ── Progress ring (spinning) ──────────────── */}
      <g style={{ transformOrigin: "140px 52px", animation: "hx-ill-spin 3s linear infinite" }}>
        {/* Track */}
        <circle cx="140" cy="52" r="20" strokeWidth="3" fill="none" className="stroke-[#182D53]/10 dark:stroke-[#CBD2D7]/10" />
        {/* Active arc — brand accent */}
        <circle
          cx="140" cy="52" r="20"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="32 94"
          style={{ stroke: "var(--brand-default)" }}
        />
      </g>
      {/* Center dot in ring */}
      <circle cx="140" cy="52" r="3" style={{ fill: "var(--brand-default)", opacity: 0.5 }}>
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* ── Small gear/cog icon ───────────────────── */}
      <g style={{ transformOrigin: "148px 100px", animation: "hx-ill-spin 5s linear infinite reverse" }}>
        <circle cx="148" cy="100" r="8" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <circle cx="148" cy="100" r="3" className="fill-[#182D53] dark:fill-[#CBD2D7]" />
        {/* Gear teeth */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={148 + Math.cos((angle * Math.PI) / 180) * 8}
            y1={100 + Math.sin((angle * Math.PI) / 180) * 8}
            x2={148 + Math.cos((angle * Math.PI) / 180) * 11}
            y2={100 + Math.sin((angle * Math.PI) / 180) * 11}
            strokeWidth="2"
            strokeLinecap="round"
            className="stroke-[#182D53] dark:stroke-[#CBD2D7]"
          />
        ))}
      </g>

      {/* ── Sparkle top-right — navy/silver ─────── */}
      <g style={{ transformOrigin: "156px 18px", animation: "hx-ill-sparkle 2s ease-in-out infinite" }}>
        <path
          d="M156 12L157.5 16.5L162 18L157.5 19.5L156 24L154.5 19.5L150 18L154.5 16.5L156 12Z"
          className="fill-[#182D53] dark:fill-[#CBD2D7]"
        />
      </g>

      {/* ── Sparkle small bottom-left — navy/silver */}
      <g style={{ transformOrigin: "18px 120px", animation: "hx-ill-sparkle 2.5s ease-in-out 0.8s infinite" }}>
        <path
          d="M18 116L19 119L22 120L19 121L18 124L17 121L14 120L17 119L18 116Z"
          className="fill-[#182D53] dark:fill-[#CBD2D7]"
        />
      </g>

      {/* ── Sparkle small top-left — brand accent */}
      <g style={{ transformOrigin: "26px 32px", animation: "hx-ill-sparkle 1.8s ease-in-out 0.4s infinite" }}>
        <path
          d="M26 28L27 30.5L29.5 31.5L27 32.5L26 35L25 32.5L22.5 31.5L25 30.5L26 28Z"
          style={{ fill: "var(--brand-default)" }}
        />
      </g>

      {/* ── Sparkle mid-right — brand accent */}
      <g style={{ transformOrigin: "166px 78px", animation: "hx-ill-sparkle 2.2s ease-in-out 1.2s infinite" }}>
        <path
          d="M166 74L167 76.5L169.5 77.5L167 78.5L166 81L165 78.5L162.5 77.5L165 76.5L166 74Z"
          style={{ fill: "var(--brand-default)" }}
        />
      </g>

      {/* ── Small floating dots ────────────────────── */}
      <circle cx="30" cy="90" r="2" className="fill-[#182D53]/20 dark:fill-[#CBD2D7]/20">
        <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="132" cy="130" r="1.5" className="fill-[#182D53]/20 dark:fill-[#CBD2D7]/20">
        <animate attributeName="opacity" values="0.1;0.45;0.1" dur="3s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="56" r="1.5" style={{ fill: "var(--brand-default)", opacity: 0.3 }}>
        <animate attributeName="opacity" values="0.15;0.6;0.15" dur="2.8s" begin="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
