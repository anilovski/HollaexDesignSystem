import React from "react";

/**
 * Page-specific loading illustrations for the HollaEx Design System.
 *
 * Each variant is a themed SVG that hints at the content being loaded.
 * Follows the 2-color illustration system:
 *   Light: navy #182D53 outlines + var(--brand-default) accent
 *   Dark:  silver #CBD2D7 outlines + var(--brand-default) accent
 *
 * All illustrations share the same 180×160 viewBox and animation language.
 */

const SHARED_STYLES = `
  @keyframes hx-ill-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
  @keyframes hx-ill-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes hx-ill-pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }
  @keyframes hx-ill-sparkle { 0%,100%{opacity:.2;transform:scale(.6)} 50%{opacity:1;transform:scale(1.1)} }
  @keyframes hx-ill-slide-in { 0%,100%{transform:translateX(0);opacity:.4} 50%{transform:translateX(2px);opacity:1} }
  @keyframes hx-ill-scale { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
  @keyframes hx-ill-wave { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  @keyframes hx-ill-blink { 0%,100%{opacity:.2} 50%{opacity:.8} }
  @keyframes hx-ill-draw { from{stroke-dashoffset:100} to{stroke-dashoffset:0} }
`;

/* Shared sparkle decorations */
function Sparkles() {
  return (
    <>
      <g style={{ transformOrigin: "156px 18px", animation: "hx-ill-sparkle 2s ease-in-out infinite" }}>
        <path d="M156 12L157.5 16.5L162 18L157.5 19.5L156 24L154.5 19.5L150 18L154.5 16.5L156 12Z" className="fill-[#182D53] dark:fill-[#CBD2D7]" />
      </g>
      <g style={{ transformOrigin: "18px 120px", animation: "hx-ill-sparkle 2.5s ease-in-out .8s infinite" }}>
        <path d="M18 116L19 119L22 120L19 121L18 124L17 121L14 120L17 119L18 116Z" className="fill-[#182D53] dark:fill-[#CBD2D7]" />
      </g>
      <g style={{ transformOrigin: "26px 32px", animation: "hx-ill-sparkle 1.8s ease-in-out .4s infinite" }}>
        <path d="M26 28L27 30.5L29.5 31.5L27 32.5L26 35L25 32.5L22.5 31.5L25 30.5L26 28Z" style={{ fill: "var(--brand-default)" }} />
      </g>
    </>
  );
}

function Bg() {
  return <circle cx="90" cy="80" r="62" className="fill-[#F2F4F5] dark:fill-[#1a2333]" />;
}

function SvgWrap({ children }: { children: React.ReactNode }) {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <style>{SHARED_STYLES}</style>
      <Bg />
      {children}
      <Sparkles />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   FOUNDATION VARIANTS
   ═══════════════════════════════════════════════════════ */

/** Colors — A fan of color swatches */
function ColorsIllustration() {
  const swatches = [
    { x: 52, color: "var(--brand-default)", delay: 0 },
    { x: 68, color: "#182D53", delay: 0.15 },
    { x: 84, color: "var(--brand-default)", delay: 0.3 },
    { x: 100, color: "#182D53", delay: 0.45 },
    { x: 116, color: "var(--brand-default)", delay: 0.6 },
  ];
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Palette base card */}
        <rect x="42" y="32" width="96" height="96" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="33.5" width="93" height="93" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Color swatches */}
        {swatches.map((s, i) => (
          <g key={i} style={{ animation: `hx-ill-scale 2.4s ease-in-out ${s.delay}s infinite` }}>
            <rect x={s.x} y="44" width="12" height="44" rx="3"
              style={{ fill: s.color, opacity: i % 2 === 0 ? 1 : undefined }}
              className={i % 2 !== 0 ? "fill-[#182D53] dark:fill-[#CBD2D7]" : ""}
            />
          </g>
        ))}

        {/* Hex label placeholder lines */}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={54 + i * 28} y="98" width="20" height="4" rx="2"
            className="fill-[#182D53]/20 dark:fill-[#CBD2D7]/20"
            style={{ animation: `hx-ill-blink 2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}

        {/* Eyedropper icon */}
        <g style={{ transformOrigin: "134px 46px", animation: "hx-ill-pulse 2s ease-in-out infinite" }}>
          <circle cx="134" cy="46" r="6" style={{ fill: "var(--brand-default)", opacity: 0.2 }} />
          <circle cx="134" cy="46" r="2.5" style={{ fill: "var(--brand-default)" }} />
        </g>
      </g>
    </SvgWrap>
  );
}

/** Typography — Large Aa letterform */
function TypographyIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Page */}
        <rect x="42" y="28" width="96" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="29.5" width="93" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Large "Aa" */}
        <text x="90" y="82" textAnchor="middle" style={{ fontSize: "38px", fontFamily: "var(--font-family-supreme)", fontWeight: 700, fill: "var(--brand-default)" }}>
          Aa
        </text>

        {/* Baseline grid lines */}
        {[94, 100, 106].map((y, i) => (
          <line key={i} x1="54" y1={y} x2={54 + 28 + i * 8} y2={y} strokeWidth="2" strokeLinecap="round"
            className="stroke-[#182D53]/25 dark:stroke-[#CBD2D7]/25"
            style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}

        {/* Type scale indicator */}
        <g style={{ animation: "hx-ill-pulse 2.5s ease-in-out .5s infinite" }}>
          <line x1="52" y1="44" x2="52" y2="88" strokeWidth="1.5" strokeDasharray="3 3" style={{ stroke: "var(--brand-default)", opacity: 0.5 }} />
          <line x1="49" y1="44" x2="55" y2="44" strokeWidth="1.5" style={{ stroke: "var(--brand-default)", opacity: 0.5 }} />
          <line x1="49" y1="88" x2="55" y2="88" strokeWidth="1.5" style={{ stroke: "var(--brand-default)", opacity: 0.5 }} />
        </g>
      </g>
    </SvgWrap>
  );
}

/** Spacing — Ruler with measurement marks */
function SpacingIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Grid background */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <line key={`v${i}`} x1={44 + i * 14} y1="28" x2={44 + i * 14} y2="132" strokeWidth="0.5"
            className="stroke-[#182D53]/8 dark:stroke-[#CBD2D7]/8" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <line key={`h${i}`} x1="44" y1={28 + i * 14} x2={44 + 7 * 14} y2={28 + i * 14} strokeWidth="0.5"
            className="stroke-[#182D53]/8 dark:stroke-[#CBD2D7]/8" />
        ))}

        {/* Horizontal ruler */}
        <rect x="44" y="58" width="98" height="12" rx="2" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <line key={i} x1={58 + i * 14} y1="58" x2={58 + i * 14} y2={58 + (i % 2 === 0 ? 12 : 8)} strokeWidth="1.5"
            className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        ))}

        {/* Measurement bracket */}
        <g style={{ animation: "hx-ill-pulse 2s ease-in-out infinite" }}>
          <line x1="58" y1="84" x2="100" y2="84" strokeWidth="1.5" style={{ stroke: "var(--brand-default)" }} />
          <line x1="58" y1="80" x2="58" y2="88" strokeWidth="1.5" style={{ stroke: "var(--brand-default)" }} />
          <line x1="100" y1="80" x2="100" y2="88" strokeWidth="1.5" style={{ stroke: "var(--brand-default)" }} />
          <rect x="68" y="78" width="22" height="12" rx="3" style={{ fill: "var(--brand-default)", opacity: 0.15 }} />
          <text x="79" y="87" textAnchor="middle" style={{ fontSize: "7px", fontFamily: "var(--font-family-mono)", fill: "var(--brand-default)" }}>24px</text>
        </g>

        {/* Spacing blocks */}
        {[0, 1, 2].map(i => (
          <rect key={i} x="58" y={100 + i * 10} width={14 + i * 14} height="6" rx="2"
            style={{ fill: "var(--brand-default)", opacity: 0.15 + i * 0.15 }}
            className=""
          />
        ))}
      </g>
    </SvgWrap>
  );
}

/** Icons — Grid of abstract shapes */
function IconsIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Grid card */}
        <rect x="42" y="28" width="96" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="29.5" width="93" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* 3x3 icon grid */}
        {[0, 1, 2].map(row =>
          [0, 1, 2].map(col => {
            const cx = 64 + col * 26;
            const cy = 52 + row * 26;
            const delay = (row * 3 + col) * 0.12;
            const shapes = [
              <circle key="c" cx={cx} cy={cy} r="8" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />,
              <rect key="r" x={cx - 7} y={cy - 7} width="14" height="14" rx="3" strokeWidth="2" fill="none" style={{ stroke: "var(--brand-default)" }} />,
              <polygon key="t" points={`${cx},${cy - 8} ${cx + 8},${cy + 6} ${cx - 8},${cy + 6}`} strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />,
              <line key="l" x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} strokeWidth="2.5" strokeLinecap="round" style={{ stroke: "var(--brand-default)" }} />,
              <g key="star">
                <path d={`M${cx} ${cy - 7}L${cx + 2} ${cy - 2}L${cx + 7} ${cy}L${cx + 2} ${cy + 2}L${cx} ${cy + 7}L${cx - 2} ${cy + 2}L${cx - 7} ${cy}L${cx - 2} ${cy - 2}Z`} strokeWidth="1.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
              </g>,
              <circle key="fc" cx={cx} cy={cy} r="6" style={{ fill: "var(--brand-default)", opacity: 0.25 }} />,
              <rect key="fr" x={cx - 6} y={cy - 6} width="12" height="12" rx="6" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />,
              <g key="plus">
                <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
                <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
              </g>,
              <path key="hex" d={`M${cx} ${cy - 8}L${cx + 7} ${cy - 4}L${cx + 7} ${cy + 4}L${cx} ${cy + 8}L${cx - 7} ${cy + 4}L${cx - 7} ${cy - 4}Z`} strokeWidth="1.5" fill="none" style={{ stroke: "var(--brand-default)" }} />,
            ];
            const idx = row * 3 + col;
            return (
              <g key={`${row}-${col}`} style={{ animation: `hx-ill-pulse 2.4s ease-in-out ${delay}s infinite` }}>
                {shapes[idx % shapes.length]}
              </g>
            );
          })
        )}
      </g>
    </SvgWrap>
  );
}

/** Motion — Easing curves and keyframes */
function MotionIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Canvas */}
        <rect x="42" y="28" width="96" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="29.5" width="93" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Easing curve */}
        <path d="M56 100 C56 100, 60 48, 82 48 C104 48, 108 100, 128 44"
          strokeWidth="2.5" fill="none" strokeLinecap="round"
          style={{ stroke: "var(--brand-default)" }}
        />

        {/* Control point handles */}
        <line x1="56" y1="100" x2="60" y2="48" strokeWidth="1" strokeDasharray="3 2" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />
        <line x1="128" y1="44" x2="108" y2="100" strokeWidth="1" strokeDasharray="3 2" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />

        {/* Control points */}
        <circle cx="60" cy="48" r="3" style={{ fill: "var(--brand-default)" }} />
        <circle cx="108" cy="100" r="3" style={{ fill: "var(--brand-default)" }} />

        {/* End points */}
        <circle cx="56" cy="100" r="3.5" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <circle cx="128" cy="44" r="3.5" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />

        {/* Moving dot along curve */}
        <circle r="4" style={{ fill: "var(--brand-default)" }}>
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M56 100 C60 48, 104 48, 128 44" />
        </circle>

        {/* Timeline ticks at bottom */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <rect key={i} x={56 + i * 14} y="114" width="8" height="4" rx="1"
            className="fill-[#182D53]/15 dark:fill-[#CBD2D7]/15"
            style={{ animation: `hx-ill-blink 1.8s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
      </g>
    </SvgWrap>
  );
}

/** Agent Legibility — Eye/scan icon */
function AgentIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Monitor */}
        <rect x="42" y="28" width="96" height="80" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="29.5" width="93" height="77" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />
        {/* Stand */}
        <line x1="90" y1="108" x2="90" y2="120" strokeWidth="2.5" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <line x1="74" y1="120" x2="106" y2="120" strokeWidth="2.5" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />

        {/* Scan eye */}
        <g style={{ transformOrigin: "90px 68px", animation: "hx-ill-scale 2.5s ease-in-out infinite" }}>
          <ellipse cx="90" cy="68" rx="22" ry="14" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
          <circle cx="90" cy="68" r="7" style={{ fill: "var(--brand-default)", opacity: 0.2 }} />
          <circle cx="90" cy="68" r="4" style={{ fill: "var(--brand-default)" }} />
          <circle cx="88" cy="66" r="1.5" fill="white" opacity="0.6" />
        </g>

        {/* Scan lines */}
        {[-12, -6, 0, 6, 12].map((offset, i) => (
          <line key={i} x1="56" y1={68 + offset} x2="124" y2={68 + offset} strokeWidth="0.5"
            style={{ stroke: "var(--brand-default)", opacity: 0.1 }}
          />
        ))}

        {/* Code lines on sides */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x="52" y={44 + i * 8} width={8 + i * 4} height="3" rx="1.5"
              className="fill-[#182D53]/15 dark:fill-[#CBD2D7]/15"
              style={{ animation: `hx-ill-blink 2s ease-in-out ${i * 0.3}s infinite` }}
            />
            <rect x={118 - i * 4} y={44 + i * 8} width={8 + i * 2} height="3" rx="1.5"
              className="fill-[#182D53]/15 dark:fill-[#CBD2D7]/15"
              style={{ animation: `hx-ill-blink 2s ease-in-out ${i * 0.3 + 0.5}s infinite` }}
            />
          </g>
        ))}
      </g>
    </SvgWrap>
  );
}

/* ═══════════════════════════════════════════════════════
   COMPONENT VARIANTS
   ═══════════════════════════════════════════════════════ */

/** Button — Rounded rect with cursor */
function ButtonIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Three button variants stacked */}
        {[
          { y: 42, w: 72, filled: true },
          { y: 68, w: 64, filled: false },
          { y: 94, w: 56, filled: false },
        ].map((btn, i) => (
          <g key={i} style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.2}s infinite` }}>
            <rect x={90 - btn.w / 2} y={btn.y} width={btn.w} height="20" rx="6"
              strokeWidth="2"
              style={btn.filled ? { fill: "var(--brand-default)", stroke: "var(--brand-default)" } : undefined}
              className={!btn.filled ? "fill-none stroke-[#182D53] dark:stroke-[#CBD2D7]" : ""}
            />
            {/* Label line */}
            <line x1={90 - btn.w / 4} y1={btn.y + 10} x2={90 + btn.w / 4} y2={btn.y + 10}
              strokeWidth="2" strokeLinecap="round"
              style={btn.filled ? { stroke: "white" } : undefined}
              className={!btn.filled ? "stroke-[#182D53]/50 dark:stroke-[#CBD2D7]/50" : ""}
            />
          </g>
        ))}

        {/* Cursor pointer */}
        <g style={{ animation: "hx-ill-pulse 2s ease-in-out .3s infinite" }}>
          <path d="M118 54L118 68L123 64L127 72L130 70.5L126 63L132 62Z"
            strokeWidth="1.5" strokeLinejoin="round"
            style={{ fill: "var(--brand-default)" }}
            className="stroke-[#182D53] dark:stroke-[#CBD2D7]"
          />
        </g>
      </g>
    </SvgWrap>
  );
}

/** Input — Text field with cursor blink */
function InputIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Input field */}
        <rect x="42" y="50" width="96" height="28" rx="6" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="51.5" width="93" height="25" rx="5" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Typed text placeholder */}
        <line x1="52" y1="64" x2="88" y2="64" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />

        {/* Blinking cursor */}
        <line x1="92" y1="56" x2="92" y2="72" strokeWidth="2" style={{ stroke: "var(--brand-default)" }}>
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Label above */}
        <line x1="42" y1="40" x2="72" y2="40" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/50 dark:stroke-[#CBD2D7]/50" />

        {/* Helper text below */}
        <line x1="42" y1="90" x2="98" y2="90" strokeWidth="1.5" strokeLinecap="round" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />

        {/* Second input (outlined) */}
        <rect x="42" y="102" width="96" height="24" rx="6" strokeWidth="1.5" fill="none"
          className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20"
          style={{ animation: "hx-ill-blink 2.5s ease-in-out .5s infinite" }}
        />
      </g>
    </SvgWrap>
  );
}

/** Controls — Checkboxes, toggles, radios */
function ControlIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Checkbox checked */}
        <g style={{ animation: "hx-ill-scale 2.4s ease-in-out infinite" }}>
          <rect x="52" y="42" width="18" height="18" rx="4" strokeWidth="2" style={{ fill: "var(--brand-default)", stroke: "var(--brand-default)" }} />
          <path d="M57 51L60 54.5L67 47" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="white" />
          <line x1="78" y1="51" x2="112" y2="51" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        </g>

        {/* Radio selected */}
        <g style={{ animation: "hx-ill-scale 2.4s ease-in-out .3s infinite" }}>
          <circle cx="61" cy="80" r="9" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
          <circle cx="61" cy="80" r="4.5" style={{ fill: "var(--brand-default)" }} />
          <line x1="78" y1="80" x2="106" y2="80" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        </g>

        {/* Toggle on */}
        <g style={{ animation: "hx-ill-scale 2.4s ease-in-out .6s infinite" }}>
          <rect x="52" y="101" width="34" height="18" rx="9" style={{ fill: "var(--brand-default)" }} />
          <circle cx="77" cy="110" r="6" fill="white" />
          <line x1="94" y1="110" x2="118" y2="110" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        </g>
      </g>
    </SvgWrap>
  );
}

/** Overlay — Floating layer/modal */
function OverlayIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Background dimmed card */}
        <rect x="36" y="28" width="88" height="104" rx="6" className="fill-[#182D53]/8 dark:fill-[#CBD2D7]/8" />

        {/* Foreground modal */}
        <g style={{ animation: "hx-ill-scale 2.5s ease-in-out infinite" }}>
          <rect x="52" y="42" width="84" height="76" rx="8" strokeWidth="2.5" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
          <rect x="53.5" y="43.5" width="81" height="73" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

          {/* Modal header */}
          <line x1="62" y1="56" x2="98" y2="56" strokeWidth="2.5" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
          {/* Close X */}
          <g className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40">
            <line x1="122" y1="52" x2="128" y2="58" strokeWidth="2" strokeLinecap="round" />
            <line x1="128" y1="52" x2="122" y2="58" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Body lines */}
          {[0, 1].map(i => (
            <line key={i} x1="62" y1={68 + i * 8} x2={118 - i * 14} y2={68 + i * 8} strokeWidth="1.5" strokeLinecap="round"
              className="stroke-[#182D53]/25 dark:stroke-[#CBD2D7]/25" />
          ))}

          {/* Action buttons */}
          <rect x="88" y="94" width="40" height="16" rx="5" style={{ fill: "var(--brand-default)" }} />
          <line x1="96" y1="102" x2="120" y2="102" strokeWidth="1.5" strokeLinecap="round" stroke="white" />
          <rect x="62" y="94" width="22" height="16" rx="5" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />
        </g>
      </g>
    </SvgWrap>
  );
}

/** Navigation — Links and breadcrumb-like nav */
function NavIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Top bar */}
        <rect x="36" y="28" width="108" height="20" rx="4" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="37.5" y="29.5" width="105" height="17" rx="3" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Nav items */}
        {[0, 1, 2, 3].map(i => (
          <g key={i} style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.15}s infinite` }}>
            <line x1={46 + i * 24} y1="38" x2={60 + i * 24} y2="38" strokeWidth="2" strokeLinecap="round"
              style={i === 1 ? { stroke: "var(--brand-default)" } : undefined}
              className={i !== 1 ? "stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" : ""}
            />
            {i === 1 && <rect x={46 + i * 24} y="42" width={14 + i * 0} height="2" rx="1" style={{ fill: "var(--brand-default)" }} />}
          </g>
        ))}

        {/* Sidebar nav */}
        <rect x="36" y="54" width="32" height="78" rx="4" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <rect x="42" y={62 + i * 14} width={i === 1 ? 22 : 18} height="6" rx="2"
              style={i === 1 ? { fill: "var(--brand-default)", opacity: 0.2 } : undefined}
              className={i !== 1 ? "fill-[#182D53]/12 dark:fill-[#CBD2D7]/12" : ""}
            />
            {i === 1 && <rect x="39" y={62 + i * 14} width="2" height="6" rx="1" style={{ fill: "var(--brand-default)" }} />}
          </g>
        ))}

        {/* Content area placeholder */}
        <rect x="74" y="54" width="70" height="78" rx="4" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/10 dark:stroke-[#CBD2D7]/10" />
        {[0, 1, 2].map(i => (
          <line key={i} x1="82" y1={66 + i * 10} x2={126 - i * 8} y2={66 + i * 10} strokeWidth="1.5" strokeLinecap="round"
            className="stroke-[#182D53]/15 dark:stroke-[#CBD2D7]/15"
            style={{ animation: `hx-ill-blink 2.5s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </g>
    </SvgWrap>
  );
}

/** Data — Table rows */
function DataIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Table container */}
        <rect x="36" y="28" width="108" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="37.5" y="29.5" width="105" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Header row */}
        <rect x="37.5" y="29.5" width="105" height="18" rx="7" className="fill-[#182D53]/5 dark:fill-[#CBD2D7]/5" />
        {[0, 1, 2].map(i => (
          <line key={i} x1={46 + i * 32} y1="39" x2={64 + i * 32} y2="39" strokeWidth="2" strokeLinecap="round"
            className="stroke-[#182D53]/50 dark:stroke-[#CBD2D7]/50" />
        ))}

        {/* Data rows */}
        {[0, 1, 2, 3, 4].map(row => (
          <g key={row} style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${row * 0.12}s infinite` }}>
            <line x1="37.5" y1={53 + row * 16} x2="142.5" y2={53 + row * 16} strokeWidth="0.5" className="stroke-[#182D53]/10 dark:stroke-[#CBD2D7]/10" />
            {[0, 1, 2].map(col => (
              <rect key={col} x={46 + col * 32} y={57 + row * 16} width={14 + (col === 0 ? 4 : 0)} height="4" rx="2"
                style={col === 0 && row === 1 ? { fill: "var(--brand-default)", opacity: 0.3 } : undefined}
                className={!(col === 0 && row === 1) ? "fill-[#182D53]/15 dark:fill-[#CBD2D7]/15" : ""}
              />
            ))}
          </g>
        ))}
      </g>
    </SvgWrap>
  );
}

/** Panels — Accordion/tab expanding sections */
function PanelsIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Container */}
        <rect x="42" y="28" width="96" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="29.5" width="93" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Collapsed panel 1 */}
        <rect x="50" y="36" width="80" height="16" rx="4" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />
        <line x1="56" y1="44" x2="82" y2="44" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        <path d="M122 41L126 44L122 47" strokeWidth="1.5" fill="none" strokeLinecap="round" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />

        {/* Expanded panel 2 — active */}
        <g style={{ animation: "hx-ill-scale 3s ease-in-out infinite" }}>
          <rect x="50" y="56" width="80" height="44" rx="4" strokeWidth="2" style={{ stroke: "var(--brand-default)" }} fill="none" />
          <rect x="50" y="56" width="80" height="16" rx="4" style={{ fill: "var(--brand-default)", opacity: 0.08 }} />
          <line x1="56" y1="64" x2="88" y2="64" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--brand-default)" }} />
          <path d="M122 60L126 64L130 60" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ stroke: "var(--brand-default)" }} />

          {/* Content lines inside */}
          {[0, 1, 2].map(i => (
            <line key={i} x1="58" y1={78 + i * 7} x2={110 - i * 12} y2={78 + i * 7} strokeWidth="1.5" strokeLinecap="round"
              className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20"
              style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </g>

        {/* Collapsed panel 3 */}
        <rect x="50" y="104" width="80" height="16" rx="4" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />
        <line x1="56" y1="112" x2="78" y2="112" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        <path d="M122 109L126 112L122 115" strokeWidth="1.5" fill="none" strokeLinecap="round" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />
      </g>
    </SvgWrap>
  );
}

/** Tags — Badges, chips, avatars */
function TagsIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Row 1: Badges */}
        {[0, 1, 2].map(i => (
          <g key={i} style={{ animation: `hx-ill-scale 2.4s ease-in-out ${i * 0.2}s infinite` }}>
            <rect x={44 + i * 32} y="44" width={26 + (i === 1 ? 4 : 0)} height="16" rx="8"
              strokeWidth="2"
              style={i === 0 ? { fill: "var(--brand-default)", stroke: "var(--brand-default)" } : undefined}
              className={i !== 0 ? "fill-none stroke-[#182D53] dark:stroke-[#CBD2D7]" : ""}
            />
            <line x1={50 + i * 32} y1="52" x2={62 + i * 32 + (i === 1 ? 4 : 0)} y2="52" strokeWidth="1.5" strokeLinecap="round"
              style={i === 0 ? { stroke: "white" } : undefined}
              className={i !== 0 ? "stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" : ""}
            />
          </g>
        ))}

        {/* Row 2: Chips with close */}
        {[0, 1].map(i => (
          <g key={i} style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.3}s infinite` }}>
            <rect x={50 + i * 42} y="72" width="36" height="18" rx="9" strokeWidth="1.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
            <circle cx={60 + i * 42} cy="81" r="5" className="fill-[#182D53]/10 dark:fill-[#CBD2D7]/10" />
            <line x1={68 + i * 42} y1="81" x2={78 + i * 42} y2="81" strokeWidth="1.5" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
          </g>
        ))}

        {/* Row 3: Avatars */}
        {[0, 1, 2, 3].map(i => (
          <g key={i} style={{ animation: `hx-ill-pulse 2.4s ease-in-out ${i * 0.15}s infinite` }}>
            <circle cx={58 + i * 22} cy="110" r="10" strokeWidth="2"
              style={i === 0 ? { fill: "var(--brand-default)", opacity: 0.2, stroke: "var(--brand-default)" } : undefined}
              className={i !== 0 ? "fill-[#182D53]/8 dark:fill-[#CBD2D7]/8 stroke-[#182D53] dark:stroke-[#CBD2D7]" : ""}
            />
            {/* Simple avatar silhouette */}
            <circle cx={58 + i * 22} cy={107} r="3" className="fill-[#182D53]/25 dark:fill-[#CBD2D7]/25" />
            <path d={`M${52 + i * 22} 118 Q${58 + i * 22} 112 ${64 + i * 22} 118`} fill="none" strokeWidth="1.5" className="stroke-[#182D53]/25 dark:stroke-[#CBD2D7]/25" />
          </g>
        ))}
      </g>
    </SvgWrap>
  );
}

/** Progress — Loading bars and steppers */
function ProgressIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Progress bar */}
        <rect x="42" y="50" width="96" height="8" rx="4" className="fill-[#182D53]/10 dark:fill-[#CBD2D7]/10" />
        <rect x="42" y="50" width="62" height="8" rx="4" style={{ fill: "var(--brand-default)" }}>
          <animate attributeName="width" values="20;62;20" dur="3s" repeatCount="indefinite" />
        </rect>

        {/* Percentage label */}
        <text x="90" y="44" textAnchor="middle" style={{ fontSize: "9px", fontFamily: "var(--font-family-mono)", fill: "var(--brand-default)" }}>
          65%
        </text>

        {/* Stepper */}
        <line x1="56" y1="82" x2="124" y2="82" strokeWidth="2" className="stroke-[#182D53]/15 dark:stroke-[#CBD2D7]/15" />
        {[0, 1, 2, 3].map(i => (
          <g key={i} style={{ animation: `hx-ill-scale 2.4s ease-in-out ${i * 0.2}s infinite` }}>
            <circle cx={56 + i * 22.7} cy="82" r={i <= 1 ? 8 : 6} strokeWidth="2"
              style={i <= 1 ? { fill: "var(--brand-default)", stroke: "var(--brand-default)" } : undefined}
              className={i > 1 ? "fill-none stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" : ""}
            />
            {i <= 1 && <path d={`M${53 + i * 22.7} 82L${55 + i * 22.7} 84.5L${60 + i * 22.7} 79`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="white" />}
            {i > 1 && <text x={56 + i * 22.7} y="85" textAnchor="middle" style={{ fontSize: "8px", fontFamily: "var(--font-family-mono)" }} className="fill-[#182D53]/40 dark:fill-[#CBD2D7]/40">{i + 1}</text>}
          </g>
        ))}

        {/* Skeleton bars */}
        {[0, 1, 2].map(i => (
          <rect key={i} x="50" y={100 + i * 10} width={80 - i * 16} height="5" rx="2.5"
            className="fill-[#182D53]/8 dark:fill-[#CBD2D7]/8"
            style={{ animation: `hx-ill-blink 1.5s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </g>
    </SvgWrap>
  );
}

/** Feedback — Alert/notification bell */
function FeedbackIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Alert banner */}
        <g style={{ animation: "hx-ill-slide-in 2.4s ease-in-out infinite" }}>
          <rect x="42" y="38" width="96" height="28" rx="6" strokeWidth="2" fill="none" style={{ stroke: "var(--brand-default)" }} />
          <rect x="43.5" y="39.5" width="93" height="25" rx="5" style={{ fill: "var(--brand-default)", opacity: 0.06 }} />
          {/* Icon circle */}
          <circle cx="58" cy="52" r="7" style={{ fill: "var(--brand-default)", opacity: 0.2 }} />
          <text x="58" y="55.5" textAnchor="middle" style={{ fontSize: "10px", fill: "var(--brand-default)", fontFamily: "var(--font-family-supreme)", fontWeight: 700 }}>!</text>
          {/* Text lines */}
          <line x1="72" y1="49" x2="124" y2="49" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
          <line x1="72" y1="57" x2="110" y2="57" strokeWidth="1.5" strokeLinecap="round" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
        </g>

        {/* Toast notification */}
        <g style={{ animation: "hx-ill-slide-in 2.4s ease-in-out .4s infinite" }}>
          <rect x="52" y="80" width="86" height="24" rx="6" strokeWidth="2" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
          <rect x="53.5" y="81.5" width="83" height="21" rx="5" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />
          {/* Check icon */}
          <circle cx="66" cy="92" r="6" style={{ fill: "var(--brand-default)", opacity: 0.2 }} />
          <path d="M63 92L65 94.5L70 89" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ stroke: "var(--brand-default)" }} />
          <line x1="78" y1="92" x2="126" y2="92" strokeWidth="1.5" strokeLinecap="round" className="stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" />
        </g>

        {/* Small toast sliding in */}
        <g style={{ animation: "hx-ill-slide-in 2.4s ease-in-out .8s infinite" }}>
          <rect x="62" y="112" width="66" height="18" rx="5" strokeWidth="1.5" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
          <rect x="68" y="118" width="24" height="4" rx="2" className="fill-[#182D53]/12 dark:fill-[#CBD2D7]/12" />
        </g>
      </g>
    </SvgWrap>
  );
}

/** Layout — Resizable panels/carousel */
function LayoutIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Window frame */}
        <rect x="36" y="28" width="108" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="37.5" y="29.5" width="105" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Window title bar */}
        <rect x="37.5" y="29.5" width="105" height="14" rx="7" className="fill-[#182D53]/5 dark:fill-[#CBD2D7]/5" />
        {[0, 1, 2].map(i => (
          <circle key={i} cx={46 + i * 9} cy="37" r="2.5" className="fill-[#182D53]/15 dark:fill-[#CBD2D7]/15" />
        ))}

        {/* Split panels */}
        <line x1="84" y1="44" x2="84" y2="132" strokeWidth="1.5" className="stroke-[#182D53]/15 dark:stroke-[#CBD2D7]/15" />

        {/* Resize handle */}
        <g style={{ animation: "hx-ill-pulse 2s ease-in-out infinite" }}>
          <rect x="80" y="78" width="8" height="20" rx="4" style={{ fill: "var(--brand-default)", opacity: 0.2 }} />
          {[0, 1, 2].map(i => (
            <circle key={i} cx="84" cy={82 + i * 5} r="1" style={{ fill: "var(--brand-default)" }} />
          ))}
        </g>

        {/* Left panel content */}
        {[0, 1, 2].map(i => (
          <rect key={i} x="44" y={52 + i * 14} width={30 - i * 6} height="6" rx="2"
            className="fill-[#182D53]/12 dark:fill-[#CBD2D7]/12"
            style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}

        {/* Right panel content */}
        <rect x="92" y="52" width="42" height="28" rx="4" className="fill-[#182D53]/6 dark:fill-[#CBD2D7]/6"
          style={{ animation: "hx-ill-blink 2.5s ease-in-out infinite" }}
        />
        {[0, 1].map(i => (
          <rect key={i} x="92" y={88 + i * 10} width={36 - i * 10} height="4" rx="2"
            className="fill-[#182D53]/10 dark:fill-[#CBD2D7]/10" />
        ))}
      </g>
    </SvgWrap>
  );
}

/** Card — Content card with image */
function CardIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Card */}
        <rect x="48" y="28" width="84" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="49.5" y="29.5" width="81" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Image placeholder */}
        <rect x="49.5" y="29.5" width="81" height="40" rx="7" className="fill-[#182D53]/6 dark:fill-[#CBD2D7]/6" />
        {/* Mountain/landscape icon */}
        <path d="M72 58L82 44L92 58Z" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
        <circle cx="102" cy="42" r="4" className="fill-[#182D53]/10 dark:fill-[#CBD2D7]/10" />

        {/* Title */}
        <line x1="58" y1="80" x2="104" y2="80" strokeWidth="2.5" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />

        {/* Description lines */}
        {[0, 1].map(i => (
          <line key={i} x1="58" y1={90 + i * 8} x2={116 - i * 18} y2={90 + i * 8} strokeWidth="1.5" strokeLinecap="round"
            className="stroke-[#182D53]/25 dark:stroke-[#CBD2D7]/25"
            style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}

        {/* Price/value in mono */}
        <g style={{ animation: "hx-ill-pulse 2.5s ease-in-out infinite" }}>
          <rect x="58" y="110" width="32" height="12" rx="4" style={{ fill: "var(--brand-default)", opacity: 0.12 }} />
          <line x1="64" y1="116" x2="84" y2="116" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--brand-default)" }} />
        </g>
      </g>
    </SvgWrap>
  );
}

/** Slider — Range control */
function SliderIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Slider track */}
        <rect x="42" y="74" width="96" height="4" rx="2" className="fill-[#182D53]/12 dark:fill-[#CBD2D7]/12" />
        <rect x="42" y="74" width="52" height="4" rx="2" style={{ fill: "var(--brand-default)" }} />

        {/* Thumb */}
        <g style={{ animation: "hx-ill-pulse 2s ease-in-out infinite" }}>
          <circle cx="94" cy="76" r="10" style={{ fill: "var(--brand-default)", opacity: 0.15 }} />
          <circle cx="94" cy="76" r="7" strokeWidth="2.5" style={{ fill: "white", stroke: "var(--brand-default)" }} />
        </g>

        {/* Value tooltip */}
        <g style={{ animation: "hx-ill-scale 2.5s ease-in-out infinite" }}>
          <rect x="80" y="50" width="28" height="16" rx="4" style={{ fill: "var(--brand-default)" }} />
          <path d="M90 66L94 70L98 66" style={{ fill: "var(--brand-default)" }} />
          <text x="94" y="61" textAnchor="middle" style={{ fontSize: "8px", fontFamily: "var(--font-family-mono)", fill: "white" }}>54</text>
        </g>

        {/* Tick marks */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={42 + i * 24} y1="84" x2={42 + i * 24} y2="88" strokeWidth="1.5"
            className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
        ))}

        {/* Range labels */}
        <text x="42" y="100" style={{ fontSize: "7px", fontFamily: "var(--font-family-mono)" }} className="fill-[#182D53]/30 dark:fill-[#CBD2D7]/30">0</text>
        <text x="138" y="100" textAnchor="end" style={{ fontSize: "7px", fontFamily: "var(--font-family-mono)" }} className="fill-[#182D53]/30 dark:fill-[#CBD2D7]/30">100</text>
      </g>
    </SvgWrap>
  );
}

/** Picker — Date/calendar picker */
function PickerIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Calendar card */}
        <rect x="42" y="28" width="96" height="104" rx="8" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="29.5" width="93" height="101" rx="7" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

        {/* Month header */}
        <rect x="43.5" y="29.5" width="93" height="20" rx="7" style={{ fill: "var(--brand-default)", opacity: 0.06 }} />
        <line x1="64" y1="40" x2="100" y2="40" strokeWidth="2" strokeLinecap="round" style={{ stroke: "var(--brand-default)" }} />
        {/* Nav arrows */}
        <path d="M52 40L56 36L56 44Z" className="fill-[#182D53]/30 dark:fill-[#CBD2D7]/30" />
        <path d="M128 40L124 36L124 44Z" className="fill-[#182D53]/30 dark:fill-[#CBD2D7]/30" />

        {/* Day labels */}
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <text key={i} x={54 + i * 12} y="60" textAnchor="middle"
            style={{ fontSize: "6px", fontFamily: "var(--font-family-mono)" }}
            className="fill-[#182D53]/30 dark:fill-[#CBD2D7]/30"
          >{d}</text>
        ))}

        {/* Calendar grid */}
        {[0, 1, 2, 3].map(row =>
          [0, 1, 2, 3, 4, 5, 6].map(col => {
            const day = row * 7 + col + 1;
            if (day > 28) return null;
            const isSelected = day === 15;
            const cx = 54 + col * 12;
            const cy = 72 + row * 14;
            return (
              <g key={`${row}-${col}`} style={isSelected ? { animation: "hx-ill-pulse 2s ease-in-out infinite" } : undefined}>
                {isSelected && <circle cx={cx} cy={cy} r="6" style={{ fill: "var(--brand-default)" }} />}
                <text x={cx} y={cy + 3} textAnchor="middle"
                  style={{
                    fontSize: "7px",
                    fontFamily: "var(--font-family-mono)",
                    fill: isSelected ? "white" : undefined,
                  }}
                  className={!isSelected ? "fill-[#182D53]/40 dark:fill-[#CBD2D7]/40" : ""}
                >{day}</text>
              </g>
            );
          })
        )}
      </g>
    </SvgWrap>
  );
}

/** Dropdown/Select — Menu with options */
function SelectIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Trigger */}
        <rect x="42" y="42" width="96" height="24" rx="6" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="43.5" y="43.5" width="93" height="21" rx="5" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />
        <line x1="52" y1="54" x2="92" y2="54" strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
        <path d="M126 50L130 54L134 50" strokeWidth="2" strokeLinecap="round" fill="none" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />

        {/* Dropdown panel */}
        <g style={{ animation: "hx-ill-scale 2.5s ease-in-out infinite" }}>
          <rect x="42" y="70" width="96" height="64" rx="6" strokeWidth="2" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
          <rect x="43.5" y="71.5" width="93" height="61" rx="5" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />

          {/* Menu items */}
          {[0, 1, 2, 3].map(i => (
            <g key={i} style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.1}s infinite` }}>
              {i === 1 && <rect x="48" y={76 + i * 14} width="84" height="12" rx="3" style={{ fill: "var(--brand-default)", opacity: 0.1 }} />}
              <line x1="54" y1={82 + i * 14} x2={92 + (i === 2 ? 12 : 0)} y2={82 + i * 14} strokeWidth="2" strokeLinecap="round"
                style={i === 1 ? { stroke: "var(--brand-default)" } : undefined}
                className={i !== 1 ? "stroke-[#182D53]/30 dark:stroke-[#CBD2D7]/30" : ""}
              />
              {i === 1 && <path d="M122 79L125 82L128 79" strokeWidth="1.5" fill="none" strokeLinecap="round" style={{ stroke: "var(--brand-default)" }} />}
            </g>
          ))}
        </g>
      </g>
    </SvgWrap>
  );
}

/** Patterns — Grid of patterns/templates */
function PatternsIllustration() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        {/* Grid of mini cards */}
        {[0, 1].map(row =>
          [0, 1].map(col => {
            const x = 42 + col * 50;
            const y = 32 + row * 52;
            return (
              <g key={`${row}-${col}`} style={{ animation: `hx-ill-scale 2.4s ease-in-out ${(row * 2 + col) * 0.2}s infinite` }}>
                <rect x={x} y={y} width="44" height="44" rx="6" strokeWidth="2" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
                <rect x={x + 1.5} y={y + 1.5} width="41" height="41" rx="5" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />
                {/* Mini content */}
                <rect x={x + 6} y={y + 6} width={30} height="4" rx="2"
                  style={(row + col) % 2 === 0 ? { fill: "var(--brand-default)", opacity: 0.2 } : undefined}
                  className={(row + col) % 2 !== 0 ? "fill-[#182D53]/12 dark:fill-[#CBD2D7]/12" : ""}
                />
                {[0, 1, 2].map(i => (
                  <rect key={i} x={x + 6} y={y + 16 + i * 7} width={26 - i * 6} height="3" rx="1.5"
                    className="fill-[#182D53]/10 dark:fill-[#CBD2D7]/10" />
                ))}
              </g>
            );
          })
        )}
      </g>
    </SvgWrap>
  );
}


/* ═══════════════════════════════════════════════════════
   VARIANT MAP & EXPORT
   ═══════════════════════════════════════════════════════ */

export type IllustrationVariant =
  | "default"
  | "colors" | "typography" | "spacing" | "icons" | "motion" | "agent"
  | "button" | "input" | "control" | "overlay" | "nav" | "data"
  | "panels" | "tags" | "progress" | "feedback" | "layout" | "card"
  | "slider" | "picker" | "select" | "patterns";

const VARIANT_MAP: Record<IllustrationVariant, React.FC> = {
  default: DefaultIllustration,
  colors: ColorsIllustration,
  typography: TypographyIllustration,
  spacing: SpacingIllustration,
  icons: IconsIllustration,
  motion: MotionIllustration,
  agent: AgentIllustration,
  button: ButtonIllustration,
  input: InputIllustration,
  control: ControlIllustration,
  overlay: OverlayIllustration,
  nav: NavIllustration,
  data: DataIllustration,
  panels: PanelsIllustration,
  tags: TagsIllustration,
  progress: ProgressIllustration,
  feedback: FeedbackIllustration,
  layout: LayoutIllustration,
  card: CardIllustration,
  slider: SliderIllustration,
  picker: PickerIllustration,
  select: SelectIllustration,
  patterns: PatternsIllustration,
};

/** Renders the default (generic document) illustration */
function DefaultIllustration() {
  return <DefaultIllustrationSvg />;
}

// Inline a simple version of the default doc illustration to avoid circular deps
function DefaultIllustrationSvg() {
  return (
    <SvgWrap>
      <g style={{ animation: "hx-ill-float 3s ease-in-out infinite" }}>
        <rect x="47" y="28" width="70" height="92" rx="6" className="fill-[#182D53]/5 dark:fill-[#CBD2D7]/5" />
        <rect x="44" y="25" width="70" height="92" rx="6" strokeWidth="2.5" fill="none" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        <rect x="45.5" y="26.5" width="67" height="89" rx="5" className="fill-[#FAFBFC] dark:fill-[#0f1724]" />
        <rect x="50" y="35" width="3.5" height="22" rx="1.75" style={{ fill: "var(--brand-default)" }} />
        <line x1="58" y1="38" x2="98" y2="38" strokeWidth="3" strokeLinecap="round" className="stroke-[#182D53] dark:stroke-[#CBD2D7]" />
        {[0, 1, 2].map(i => (
          <g key={i} style={{ animation: `hx-ill-slide-in 2.4s ease-in-out ${i * 0.3}s infinite` }}>
            <line x1="58" y1={48 + i * 8} x2={104 - i * 8} y2={48 + i * 8} strokeWidth="2" strokeLinecap="round" className="stroke-[#182D53]/40 dark:stroke-[#CBD2D7]/40" />
          </g>
        ))}
        <line x1="52" y1="74" x2="108" y2="74" strokeWidth="1" className="stroke-[#182D53]/10 dark:stroke-[#CBD2D7]/10" />
        {[0, 1].map(i => (
          <g key={i} style={{ animation: `hx-ill-slide-in 3s ease-in-out ${i * 0.3}s infinite` }}>
            <rect x={52 + i * 28} y="80" width={24 + i * 4} height="16" rx="3" className="fill-[#182D53]/8 dark:fill-[#CBD2D7]/8" />
            <rect x={52 + i * 28} y="80" width={24 + i * 4} height="16" rx="3" strokeWidth="1.5" fill="none" className="stroke-[#182D53]/20 dark:stroke-[#CBD2D7]/20" />
          </g>
        ))}
      </g>
      <g style={{ transformOrigin: "140px 52px", animation: "hx-ill-spin 3s linear infinite" }}>
        <circle cx="140" cy="52" r="20" strokeWidth="3" fill="none" className="stroke-[#182D53]/10 dark:stroke-[#CBD2D7]/10" />
        <circle cx="140" cy="52" r="20" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="32 94" style={{ stroke: "var(--brand-default)" }} />
      </g>
    </SvgWrap>
  );
}

export function PageLoadingIllustration({ variant = "default" }: { variant?: IllustrationVariant }) {
  const Component = VARIANT_MAP[variant] || VARIANT_MAP.default;
  return <Component />;
}

/** Per-variant contextual loading messages */
export const VARIANT_MESSAGES: Record<IllustrationVariant, string[]> = {
  default:  ["Loading components…", "Preparing examples…", "Almost ready…"],
  colors:   ["Loading color tokens…", "Rendering swatches…", "Calibrating palette…"],
  typography: ["Loading type scale…", "Setting font metrics…", "Rendering specimens…"],
  spacing:  ["Loading spacing tokens…", "Measuring distances…", "Aligning the grid…"],
  icons:    ["Loading icon set…", "Rendering glyphs…", "Organizing symbols…"],
  motion:   ["Loading easing curves…", "Calibrating durations…", "Animating tokens…"],
  agent:    ["Loading legibility rules…", "Scanning for agents…", "Preparing audit view…"],
  button:   ["Loading button variants…", "Rendering states…", "Preparing interactions…"],
  input:    ["Loading form fields…", "Preparing input states…", "Rendering validation…"],
  control:  ["Loading form controls…", "Toggling states…", "Preparing interactions…"],
  slider:   ["Loading range controls…", "Setting track values…", "Calibrating thumbs…"],
  select:   ["Loading menu options…", "Building dropdown list…", "Preparing selections…"],
  picker:   ["Loading calendar grid…", "Setting date range…", "Rendering months…"],
  panels:   ["Loading panel sections…", "Expanding content…", "Preparing transitions…"],
  overlay:  ["Loading dialog layers…", "Preparing overlays…", "Setting focus traps…"],
  nav:      ["Loading navigation…", "Building route tree…", "Rendering menu items…"],
  data:     ["Loading data grid…", "Rendering table rows…", "Preparing pagination…"],
  tags:     ["Loading tag variants…", "Rendering badges…", "Preparing chip states…"],
  progress: ["Loading progress states…", "Rendering indicators…", "Stepping through…"],
  feedback: ["Loading alert variants…", "Preparing notifications…", "Queuing toasts…"],
  layout:   ["Loading layout panels…", "Measuring resize handles…", "Preparing viewport…"],
  card:     ["Loading card templates…", "Rendering content blocks…", "Preparing previews…"],
  patterns: ["Loading pattern library…", "Composing templates…", "Preparing examples…"],
};

/** Resolves variant + messages from a route slug */
export function resolveRouteLoader(slug: string): {
  variant: IllustrationVariant;
  messages: string[];
} {
  const variant = ROUTE_ILLUSTRATION_MAP[slug] || "default";
  const messages = VARIANT_MESSAGES[variant] || VARIANT_MESSAGES.default;
  return { variant, messages };
}

/** Maps route slugs to illustration variants */
export const ROUTE_ILLUSTRATION_MAP: Record<string, IllustrationVariant> = {
  // Foundation
  "colors": "colors",
  "typography": "typography",
  "spacing": "spacing",
  "icons": "icons",
  "motion": "motion",
  "agent-legibility": "agent",

  // Buttons & Actions
  "button": "button",
  "button-group": "button",
  "fab": "button",
  "link": "button",

  // Inputs & Forms
  "input": "input",
  "textarea": "input",
  "search": "input",
  "input-dropdown": "input",
  "input-otp": "input",

  // Form Controls
  "checkbox": "control",
  "radio": "control",
  "toggle": "control",

  // Sliders
  "slider": "slider",

  // Select / Dropdown
  "select": "select",
  "dropdown": "select",
  "context-menu": "select",

  // Pickers
  "date-picker": "picker",

  // Panels / Sections
  "accordion": "panels",
  "collapsible": "panels",
  "tab": "panels",
  "content-switcher": "panels",

  // Overlays & Dialogs
  "modal": "overlay",
  "sheet": "overlay",
  "alert-dialog": "overlay",
  "popover": "overlay",
  "hover-card": "overlay",
  "tooltip": "overlay",

  // Navigation
  "breadcrumb": "nav",
  "navigation-menu": "nav",
  "menubar": "nav",
  "side-nav": "nav",
  "header": "nav",

  // Data Display
  "table": "data",
  "list": "data",
  "pagination": "data",
  "scroll-area": "data",

  // Tags & Labels
  "badge": "tags",
  "chip": "tags",
  "avatar": "tags",

  // Progress & Loading
  "progress": "progress",
  "stepper": "progress",
  "skeleton": "progress",
  "page-loader": "progress",

  // Feedback
  "alert": "feedback",
  "toast": "feedback",

  // Layout
  "carousel": "layout",
  "resizable": "layout",

  // Cards
  "coin-card": "card",

  // Patterns
  "data-display": "patterns",
  "email-templates": "patterns",
  "testing-with-agents": "patterns",
};
