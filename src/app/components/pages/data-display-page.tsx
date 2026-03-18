import { ComponentPage, Section, ExampleGrid, slugify } from "../docs/component-page";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconPalette,
  IconTrendingUp,
  IconStack2,
  IconGridDots,
  IconChartBar,
  IconChartDonut,
  IconChartPie,
  IconSparkles,
  IconTable,
  IconChartCandle,
  IconChartDots,
  IconChartTreemap,
  IconCards,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import {
  PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, Sector,
} from "recharts";

/* ═══════════════════════════════════════════════════
   CHART COLOR PALETTE DEFINITIONS
   ═══════════════════════════════════════════════════ */

const CHART_PALETTE = [
  { name: "Red", prefix: "red" },
  { name: "Orange", prefix: "orange" },
  { name: "Amber", prefix: "amber" },
  { name: "Yellow", prefix: "yellow" },
  { name: "Lime", prefix: "lime" },
  { name: "Green", prefix: "green" },
  { name: "Emerald", prefix: "emerald" },
  { name: "Teal", prefix: "teal" },
  { name: "Cyan", prefix: "cyan" },
  { name: "Sky", prefix: "sky" },
  { name: "Blue", prefix: "blue" },
  { name: "Indigo", prefix: "indigo" },
  { name: "Violet", prefix: "violet" },
  { name: "Purple", prefix: "purple" },
  { name: "Fuchsia", prefix: "fuchsia" },
  { name: "Pink", prefix: "pink" },
  { name: "Rose", prefix: "rose" },
] as const;

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

/* ═══════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════ */

function generateTimeSeries(days: number, baseValue: number, volatility: number) {
  const data = [];
  let value = baseValue;
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now - i * 24 * 60 * 60 * 1000);
    value += (Math.random() - 0.45) * volatility;
    value = Math.max(value * 0.85, value);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value * 100) / 100,
      timestamp: date.getTime(),
      key: `d-${i}`,
    });
  }
  return data;
}

const PORTFOLIO_DATA = [
  { name: "BTC", fullName: "Bitcoin", value: 49.2, amount: 0.52, usd: 34440, color: "var(--coin-btc)" },
  { name: "ETH", fullName: "Ethereum", value: 20.5, amount: 4.8, usd: 14350, color: "var(--coin-eth)" },
  { name: "USDT", fullName: "Tether", value: 15.1, amount: 10570, usd: 10570, color: "var(--coin-usdt)" },
  { name: "XRP", fullName: "XRP", value: 8.7, amount: 12500, usd: 6090, color: "var(--coin-xrp)" },
  { name: "TRX", fullName: "Tron", value: 4.2, amount: 28500, usd: 2940, color: "var(--coin-trx)" },
  { name: "SOL", fullName: "Solana", value: 2.3, amount: 12.5, usd: 1610, color: "var(--coin-sol)" },
];

const PORTFOLIO_PIE_DATA = [
  { name: "BTC", fullName: "Bitcoin", pct: 49.2, usd: 120000, amount: "1.49", color: "var(--coin-btc)" },
  { name: "ETH", fullName: "Ethereum", pct: 20.5, usd: 50000, amount: "31.42", color: "var(--coin-eth)" },
  { name: "USDT", fullName: "Tether", pct: 16.4, usd: 40000, amount: "40,012.72", color: "var(--coin-usdt)" },
  { name: "XRP", fullName: "XRP", pct: 8.2, usd: 20000, amount: "10,472.20", color: "var(--coin-xrp)" },
  { name: "TRX", fullName: "Tron", pct: 5.8, usd: 13968, amount: "59,809.35", color: "var(--coin-trx)" },
];

const WATCHLIST_DATA = [
  { symbol: "BTC", name: "Bitcoin", price: 66230.45, change: 2.34, sparkline: generateTimeSeries(20, 64000, 800), color: "var(--coin-btc)" },
  { symbol: "ETH", name: "Ethereum", price: 2989.12, change: -1.23, sparkline: generateTimeSeries(20, 3050, 40), color: "var(--coin-eth)" },
  { symbol: "SOL", name: "Solana", price: 128.90, change: 5.67, sparkline: generateTimeSeries(20, 120, 4), color: "var(--coin-sol)" },
  { symbol: "XRP", name: "XRP", price: 0.487, change: -0.45, sparkline: generateTimeSeries(20, 0.49, 0.01), color: "var(--coin-xrp)" },
  { symbol: "TRX", name: "Tron", price: 0.1032, change: 1.12, sparkline: generateTimeSeries(20, 0.10, 0.003), color: "var(--coin-trx)" },
];

const COIN_TABLE_DATA = [
  { rank: 1, symbol: "BTC", name: "Bitcoin", price: 66230.45, change24h: 2.34, change7d: 8.12, marketCap: 1.3e12, volume: 28.5e9, color: "var(--coin-btc)" },
  { rank: 2, symbol: "ETH", name: "Ethereum", price: 2989.12, change24h: -1.23, change7d: 3.45, marketCap: 359e9, volume: 14.2e9, color: "var(--coin-eth)" },
  { rank: 3, symbol: "USDT", name: "Tether", price: 1.00, change24h: 0.01, change7d: 0.02, marketCap: 112e9, volume: 52.1e9, color: "var(--coin-usdt)" },
  { rank: 4, symbol: "SOL", name: "Solana", price: 128.90, change24h: 5.67, change7d: 12.34, marketCap: 56.8e9, volume: 2.8e9, color: "var(--coin-sol)" },
  { rank: 5, symbol: "XRP", name: "XRP", price: 0.487, change24h: -0.45, change7d: -2.10, marketCap: 26.7e9, volume: 1.1e9, color: "var(--coin-xrp)" },
  { rank: 6, symbol: "TRX", name: "Tron", price: 0.1032, change24h: 1.12, change7d: 4.56, marketCap: 9.1e9, volume: 420e6, color: "var(--coin-trx)" },
];

const STAT_CARDS = [
  { label: "Year-to-Date Performance", value: "+32.4%", subtext: "vs. +18.2% S&P 500", positive: true },
  { label: "Top Contributor (24h P&L)", value: "BTC", subtext: "+$1,247.32", positive: true, coinColor: "var(--coin-btc)" },
  { label: "Top Gainer (Not Held)", value: "SOL", subtext: "+5.67% today", positive: true, coinColor: "var(--coin-sol)" },
];

/* Candlestick OHLC data generator */
function generateCandlestickData(count: number, intervalLabel: string) {
  const data: { date: string; open: number; high: number; low: number; close: number; volume: number }[] = [];
  let prevClose = 66000;
  const now = Date.now();
  const intervalMs = intervalLabel === "1D" ? 60 * 60 * 1000 : intervalLabel === "1W" ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
  const dateFmt = (d: Date) =>
    intervalLabel === "1D"
      ? d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now - i * intervalMs);
    const vol = 0.02 + Math.random() * 0.03;
    const open = prevClose + (Math.random() - 0.48) * prevClose * 0.01;
    const close = open + (Math.random() - 0.45) * open * vol;
    const high = Math.max(open, close) + Math.random() * Math.abs(close - open) * 0.8;
    const low = Math.min(open, close) - Math.random() * Math.abs(close - open) * 0.8;
    const volume = 20 + Math.random() * 30;
    data.push({
      date: dateFmt(date),
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.round(volume * 10) / 10,
    });
    prevClose = close;
  }
  return data;
}

const CANDLESTICK_RANGES: Record<string, { count: number; label: string }> = {
  "1D": { count: 24, label: "Hourly candles" },
  "1W": { count: 30, label: "Daily candles" },
  "1M": { count: 16, label: "Weekly candles" },
};

/* Compare overlay coins — normalized price series for multi-coin comparison */
const COMPARE_COINS = [
  { symbol: "ETH", color: "var(--coin-eth)", basePrice: 2989 },
  { symbol: "SOL", color: "var(--coin-sol)", basePrice: 128 },
  { symbol: "XRP", color: "var(--coin-xrp)", basePrice: 0.487 },
] as const;

function generateNormalizedSeries(count: number, volatility: number) {
  const points: number[] = [];
  let val = 100; // start at 100 (normalized %)
  for (let i = 0; i < count; i++) {
    val += (Math.random() - 0.47) * volatility;
    points.push(Math.round(val * 100) / 100);
  }
  return points;
}

/* Correlation matrix data */
const CORR_COINS = ["BTC", "ETH", "SOL", "XRP", "TRX", "USDT"];
const CORR_COLORS = ["var(--coin-btc)", "var(--coin-eth)", "var(--coin-sol)", "var(--coin-xrp)", "var(--coin-trx)", "var(--coin-usdt)"];
const CORR_MATRIX: number[][] = [
  [1.00, 0.87, 0.72, 0.55, 0.43, 0.05],
  [0.87, 1.00, 0.78, 0.52, 0.39, 0.03],
  [0.72, 0.78, 1.00, 0.48, 0.35, -0.02],
  [0.55, 0.52, 0.48, 1.00, 0.41, 0.08],
  [0.43, 0.39, 0.35, 0.41, 1.00, 0.06],
  [0.05, 0.03, -0.02, 0.08, 0.06, 1.00],
];

/* Treemap data — market cap weighted with categories */
type TreemapItem = { name: string; fullName: string; marketCap: number; color: string; category: string };
type TreemapCategory = { name: string; color: string; items: TreemapItem[] };

const TREEMAP_CATEGORIES: TreemapCategory[] = [
  {
    name: "L1",
    color: "var(--chart-blue-500)",
    items: [
      { name: "BTC", fullName: "Bitcoin", marketCap: 1300, color: "var(--coin-btc)", category: "L1" },
      { name: "ETH", fullName: "Ethereum", marketCap: 359, color: "var(--coin-eth)", category: "L1" },
      { name: "SOL", fullName: "Solana", marketCap: 56.8, color: "var(--coin-sol)", category: "L1" },
      { name: "ADA", fullName: "Cardano", marketCap: 15.2, color: "var(--chart-blue-500)", category: "L1" },
      { name: "AVAX", fullName: "Avalanche", marketCap: 12.4, color: "var(--chart-red-500)", category: "L1" },
      { name: "TRX", fullName: "Tron", marketCap: 9.1, color: "var(--coin-trx)", category: "L1" },
    ],
  },
  {
    name: "L2",
    color: "var(--chart-purple-500)",
    items: [
      { name: "MATIC", fullName: "Polygon", marketCap: 7.3, color: "var(--chart-purple-500)", category: "L2" },
      { name: "ARB", fullName: "Arbitrum", marketCap: 3.2, color: "var(--chart-sky-500)", category: "L2" },
      { name: "OP", fullName: "Optimism", marketCap: 2.8, color: "var(--chart-red-400)", category: "L2" },
    ],
  },
  {
    name: "DeFi",
    color: "var(--chart-emerald-500)",
    items: [
      { name: "UNI", fullName: "Uniswap", marketCap: 4.5, color: "var(--chart-fuchsia-500)", category: "DeFi" },
      { name: "LINK", fullName: "Chainlink", marketCap: 6.8, color: "var(--chart-indigo-500)", category: "DeFi" },
      { name: "AAVE", fullName: "Aave", marketCap: 3.9, color: "var(--chart-cyan-500)", category: "DeFi" },
      { name: "MKR", fullName: "Maker", marketCap: 2.1, color: "var(--chart-teal-500)", category: "DeFi" },
    ],
  },
  {
    name: "Stablecoins",
    color: "var(--chart-emerald-300)",
    items: [
      { name: "USDT", fullName: "Tether", marketCap: 112, color: "var(--coin-usdt)", category: "Stablecoins" },
      { name: "USDC", fullName: "USD Coin", marketCap: 33, color: "var(--chart-blue-300)", category: "Stablecoins" },
    ],
  },
  {
    name: "Other",
    color: "var(--chart-amber-500)",
    items: [
      { name: "XRP", fullName: "XRP", marketCap: 26.7, color: "var(--coin-xrp)", category: "Other" },
      { name: "DOT", fullName: "Polkadot", marketCap: 8.9, color: "var(--chart-pink-500)", category: "Other" },
    ],
  },
];

const ALL_TREEMAP_ITEMS = TREEMAP_CATEGORIES.flatMap(c => c.items);

/* Multi-series bar chart data */
const MONTHLY_VOLUME = [
  { month: "Jan", btc: 28.5, eth: 14.2, sol: 2.8, xrp: 1.1, trx: 0.42 },
  { month: "Feb", btc: 32.1, eth: 16.8, sol: 3.4, xrp: 1.5, trx: 0.55 },
  { month: "Mar", btc: 29.7, eth: 13.9, sol: 4.1, xrp: 1.3, trx: 0.48 },
  { month: "Apr", btc: 35.4, eth: 18.2, sol: 5.2, xrp: 1.8, trx: 0.61 },
  { month: "May", btc: 31.2, eth: 15.5, sol: 3.9, xrp: 1.4, trx: 0.52 },
  { month: "Jun", btc: 38.8, eth: 20.1, sol: 6.1, xrp: 2.0, trx: 0.7 },
];

/* Stacked area chart — DeFi protocol TVL over time */
const STACKED_AREA_DATA = (() => {
  const protocols = [
    { key: "lending", base: 22, vol: 3 },
    { key: "dex", base: 18, vol: 2.5 },
    { key: "yield", base: 12, vol: 2 },
    { key: "bridge", base: 8, vol: 1.5 },
    { key: "derivatives", base: 6, vol: 1.2 },
    { key: "liquid_staking", base: 15, vol: 2 },
  ];
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((m, i) => {
    const entry: Record<string, string | number> = { month: m };
    protocols.forEach(p => {
      const growth = 1 + i * 0.04;
      entry[p.key] = Math.round((p.base * growth + (Math.random() - 0.4) * p.vol) * 10) / 10;
    });
    return entry;
  });
})();

/* Heatmap data — hourly trading volume by day-of-week */
const HEATMAP_HOURS = Array.from({ length: 24 }, (_, i) => i);
const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_DATA = (() => {
  const data: { day: number; hour: number; value: number }[] = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      // Simulate higher volume during US/EU trading hours, lower on weekends
      const hourFactor = h >= 8 && h <= 20 ? 1.5 : 0.6;
      const dayFactor = d < 5 ? 1.2 : 0.7;
      const base = hourFactor * dayFactor;
      const noise = 0.3 + Math.random() * 0.7;
      data.push({ day: d, hour: h, value: Math.round(base * noise * 100) / 100 });
    }
  }
  return data;
})();

/* ═══════════════════════════════════════════════════
   SHARED HELPERS
   ═══════════════════════════════════════════════════ */

function formatCurrency(v: number, compact?: boolean): string {
  if (compact) {
    if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
    if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  }
  return v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: v < 1 ? 4 : 2 });
}

function ChangeIndicator({ value }: { value: number }) {
  const isPos = value >= 0;
  return (
    <span style={{
      color: isPos ? "var(--chart-positive)" : "var(--chart-negative)",
      fontFamily: "var(--font-family-mono)",
      fontSize: "var(--text-body-sm)",
      fontWeight: "var(--font-weight-medium)",
    }}>
      {isPos ? "+" : ""}{value.toFixed(2)}%
    </span>
  );
}

function TabSwitcher({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex items-center" style={{
      backgroundColor: "var(--secondary)",
      borderRadius: "var(--radius)",
      padding: "var(--space-1)",
      gap: "var(--space-1)",
    }}>
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="cursor-pointer"
          style={{
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius-xs)",
            fontSize: "var(--text-body-sm)",
            fontFamily: "var(--font-family-supreme)",
            fontWeight: active === t ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
            color: active === t ? "var(--foreground)" : "var(--muted-foreground)",
            backgroundColor: active === t ? "var(--background)" : "transparent",
            border: "none",
            boxShadow: active === t ? "var(--elevation-sm)" : "none",
            transition: "all var(--duration-short-3) var(--ease-standard)",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ── Inline copy toast ─────────────────────────── */
function useCopyToClipboard() {
  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(`var(${text})`).catch(() => {
      /* fallback: textarea copy */
      const ta = document.createElement("textarea");
      ta.value = `var(${text})`;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
    setCopiedVar(text);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopiedVar(null), 1600);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return { copiedVar, copy };
}

/* ═══════════════════════════════════════════════════
   1. CHART COLOR PALETTE REFERENCE (with copy-to-clipboard)
   ═══════════════════════════════════════════════════ */

function ChartColorPalette() {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const { copiedVar, copy } = useCopyToClipboard();

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)", position: "relative" }}>
      {/* Floating copy toast */}
      {copiedVar && (
        <div style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "var(--chart-tooltip-bg)",
          border: "1px solid var(--chart-tooltip-border)",
          borderRadius: "var(--radius)",
          padding: "var(--space-3) var(--space-5)",
          boxShadow: "var(--chart-tooltip-shadow)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          animation: "fadeInUp var(--duration-short-3) var(--ease-entrance)",
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="var(--chart-positive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            fontSize: "var(--text-body-sm)",
            fontFamily: "var(--font-family-mono)",
            color: "var(--chart-tooltip-fg)",
          }}>
            Copied <span style={{ color: "var(--chart-positive)" }}>var({copiedVar})</span>
          </span>
        </div>
      )}

      {/* Coin Colors Section */}
      <div style={{ marginBottom: "var(--space-8)" }}>
        <p style={{
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--foreground)",
          marginBottom: "var(--space-4)",
          letterSpacing: "var(--ls-label)",
        }}>
          Coin-Specific Tokens
        </p>
        <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
          {[
            { name: "Bitcoin", prefix: "btc", symbol: "BTC" },
            { name: "Ethereum", prefix: "eth", symbol: "ETH" },
            { name: "Tether", prefix: "usdt", symbol: "USDT" },
            { name: "XRP", prefix: "xrp", symbol: "XRP" },
            { name: "Tron", prefix: "trx", symbol: "TRX" },
            { name: "Solana", prefix: "sol", symbol: "SOL" },
          ].map(coin => (
            <div key={coin.prefix} className="flex items-center" style={{ gap: "var(--space-4)" }}>
              <span style={{
                fontSize: "var(--text-body-sm)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                minWidth: 80,
              }}>
                {coin.symbol}
              </span>
              <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                {(["light", "", "dark"] as const).map(variant => {
                  const varName = variant ? `--coin-${coin.prefix}-${variant}` : `--coin-${coin.prefix}`;
                  const label = variant || "default";
                  const isCopied = copiedVar === varName;
                  return (
                    <div
                      key={label}
                      className="flex flex-col items-center"
                      style={{ gap: "var(--space-1)", cursor: "pointer" }}
                      onClick={() => copy(varName)}
                    >
                      <span style={{
                        width: 40, height: 28, borderRadius: "var(--radius-xs)",
                        backgroundColor: `var(${varName})`,
                        border: label === "light" ? "1px solid var(--border-subtle)" : "none",
                        outline: isCopied ? "2px solid var(--chart-positive)" : "none",
                        outlineOffset: 1,
                        transition: "outline var(--duration-short-2) var(--ease-standard)",
                      }} />
                      <span style={{ fontSize: "8px", fontFamily: "var(--font-family-mono)", color: "var(--muted-foreground)" }}>{label}</span>
                    </div>
                  );
                })}
              </div>
              <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--muted-foreground)" }}>
                --coin-{coin.prefix}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Chart Colors */}
      <div style={{ marginBottom: "var(--space-8)" }}>
        <p style={{
          fontSize: "var(--text-body-sm)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--foreground)",
          marginBottom: "var(--space-4)",
          letterSpacing: "var(--ls-label)",
        }}>
          Semantic Tokens
        </p>
        <div className="flex items-center flex-wrap" style={{ gap: "var(--space-5)" }}>
          {[
            { label: "Positive", var: "--chart-positive" },
            { label: "Positive Light", var: "--chart-positive-light" },
            { label: "Negative", var: "--chart-negative" },
            { label: "Negative Light", var: "--chart-negative-light" },
          ].map(item => {
            const isCopied = copiedVar === item.var;
            return (
              <div
                key={item.var}
                className="flex items-center"
                style={{ gap: "var(--space-2)", cursor: "pointer" }}
                onClick={() => copy(item.var)}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: "var(--radius-xs)",
                  backgroundColor: `var(${item.var})`,
                  outline: isCopied ? "2px solid var(--foreground)" : "none",
                  outlineOffset: 1,
                  transition: "outline var(--duration-short-2) var(--ease-standard)",
                }} />
                <div>
                  <span style={{ fontSize: "var(--text-body-sm)", color: "var(--foreground)", display: "block" }}>{item.label}</span>
                  <span style={{ fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)", color: "var(--muted-foreground)" }}>{item.var}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Palette Grid */}
      <div>
        <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-4)" }}>
          <p style={{
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
            letterSpacing: "var(--ls-label)",
          }}>
            Extended Palette — 17 families × 10 shades
          </p>
          <span style={{
            fontSize: "var(--text-caption)",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            Click any swatch to copy CSS variable
          </span>
        </div>

        {/* Shade header row */}
        <div className="flex items-center" style={{ marginBottom: "var(--space-2)", paddingLeft: 80 }}>
          {SHADES.map(s => (
            <span key={s} style={{
              flex: 1, textAlign: "center",
              fontSize: "var(--text-caption)",
              fontFamily: "var(--font-family-mono)",
              color: "var(--muted-foreground)",
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* Color rows */}
        <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
          {CHART_PALETTE.map(color => (
            <div key={color.prefix} className="flex items-center" style={{ gap: 0 }}>
              <span style={{
                width: 80, flexShrink: 0,
                fontSize: "var(--text-body-sm)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}>
                {color.name}
              </span>
              <div className="flex flex-1" style={{ gap: "var(--space-1)" }}>
                {SHADES.map(shade => {
                  const varName = `--chart-${color.prefix}-${shade}`;
                  const isHovered = hoveredColor === varName;
                  const isCopied = copiedVar === varName;
                  return (
                    <div
                      key={shade}
                      className="flex flex-col items-center"
                      style={{ flex: 1, position: "relative", cursor: "pointer" }}
                      onMouseEnter={() => setHoveredColor(varName)}
                      onMouseLeave={() => setHoveredColor(null)}
                      onClick={() => copy(varName)}
                    >
                      <span style={{
                        width: "100%",
                        height: 32,
                        borderRadius: "var(--radius-xs)",
                        backgroundColor: `var(${varName})`,
                        border: shade <= 100 ? "1px solid var(--border-subtle)" : "none",
                        outline: isCopied ? "2px solid var(--chart-positive)" : "none",
                        outlineOffset: 1,
                        transition: "transform var(--duration-short-2) var(--ease-standard), outline var(--duration-short-2) var(--ease-standard)",
                        transform: isHovered ? "scaleY(1.15)" : "scaleY(1)",
                        display: "block",
                      }} />
                      {/* Tooltip */}
                      {isHovered && (
                        <div style={{
                          position: "absolute",
                          top: -40,
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "var(--chart-tooltip-bg)",
                          border: "1px solid var(--chart-tooltip-border)",
                          borderRadius: "var(--radius-xs)",
                          padding: "var(--space-1) var(--space-3)",
                          boxShadow: "var(--chart-tooltip-shadow)",
                          whiteSpace: "nowrap",
                          zIndex: 20,
                          pointerEvents: "none",
                        }}>
                          <span style={{
                            fontSize: "var(--text-caption)",
                            fontFamily: "var(--font-family-mono)",
                            color: "var(--chart-tooltip-fg)",
                          }}>
                            {isCopied ? "Copied!" : varName}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   2. AREA CHART — Performance Overview (Custom SVG)
   ═══════════════════════════════════════════════════ */

function PerformanceAreaChart() {
  const [range, setRange] = useState("1 Month");
  const ranges: Record<string, number> = { "7 Days": 7, "1 Month": 30, "3 Months": 90 };

  const data = useMemo(() => generateTimeSeries(ranges[range], 70000, 1200), [range]);
  const startVal = data[0]?.value ?? 0;
  const endVal = data[data.length - 1]?.value ?? 0;
  const totalChange = endVal - startVal;
  const pctChange = ((totalChange / startVal) * 100);
  const isPositive = totalChange >= 0;

  const lineColor = isPositive ? "var(--chart-positive)" : "var(--chart-negative)";

  const svgW = 700;
  const svgH = 280;
  const padL = 56;
  const padR = 8;
  const padT = 12;
  const padB = 28;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => padT + (1 - (v - minVal) / valRange) * chartH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(2)},${toY(d.value).toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L${toX(data.length - 1).toFixed(2)},${(padT + chartH).toFixed(2)} L${padL.toFixed(2)},${(padT + chartH).toFixed(2)} Z`;

  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const v = minVal + (valRange * i) / 4;
    return { v, y: toY(v), label: `$${(v / 1000).toFixed(0)}k` };
  });

  const xStep = Math.max(1, Math.floor(data.length / 5));
  const xTicks = data.filter((_, i) => i % xStep === 0 || i === data.length - 1).map((d) => ({
    x: toX(data.indexOf(d)),
    label: d.date,
  }));

  const [hover, setHover] = useState<{ x: number; y: number; val: number; date: string } | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGRectElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, (mx - padL) / chartW));
      const idx = Math.round(ratio * (data.length - 1));
      const d = data[idx];
      if (d) setHover({ x: toX(idx), y: toY(d.value), val: d.value, date: d.date });
    },
    [data, chartW]
  );

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="flex items-start justify-between" style={{ marginBottom: "var(--space-7)" }}>
        <div>
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", marginBottom: "var(--space-2)" }}>
            Total Balance
          </p>
          <p style={{
            fontSize: "var(--text-h2)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground)",
            letterSpacing: "var(--ls-h2)",
            lineHeight: "var(--lh-h2)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {formatCurrency(endVal)}
          </p>
          <p style={{
            fontSize: "var(--text-body-sm)",
            color: isPositive ? "var(--chart-positive)" : "var(--chart-negative)",
            marginTop: "var(--space-1)",
            fontFamily: "var(--font-family-mono)",
          }}>
            {isPositive ? "+" : ""}{formatCurrency(totalChange)} ({isPositive ? "+" : ""}{pctChange.toFixed(2)}%)
          </p>
        </div>
        <TabSwitcher tabs={Object.keys(ranges)} active={range} onChange={setRange} />
      </div>

      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        height={svgH}
        style={{ overflow: "visible" }}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="perfAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity={0.18} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {yTicks.map((t) => (
          <line key={`grid-${t.v}`} x1={padL} x2={svgW - padR} y1={t.y} y2={t.y} stroke="var(--chart-grid)" strokeDasharray="3 3" />
        ))}
        {yTicks.map((t) => (
          <text key={`ylab-${t.v}`} x={padL - 8} y={t.y + 3} textAnchor="end" fill="var(--chart-axis-fg)" fontSize={10} fontFamily="var(--font-family-supreme)">
            {t.label}
          </text>
        ))}
        {xTicks.map((t) => (
          <text key={`xlab-${t.label}-${t.x}`} x={t.x} y={svgH - 4} textAnchor="middle" fill="var(--chart-axis-fg)" fontSize={10} fontFamily="var(--font-family-supreme)">
            {t.label}
          </text>
        ))}

        <line x1={padL} x2={svgW - padR} y1={padT + chartH} y2={padT + chartH} stroke="var(--chart-grid)" />
        <path d={areaPath} fill="url(#perfAreaGrad)" />
        <path d={linePath} fill="none" stroke={lineColor} strokeWidth={2} />

        <rect
          x={padL} y={padT} width={chartW} height={chartH}
          fill="transparent" onMouseMove={handleMouseMove}
          style={{ cursor: "crosshair" }}
        />

        {hover && (
          <>
            <line x1={hover.x} x2={hover.x} y1={padT} y2={padT + chartH} stroke="var(--muted-foreground)" strokeDasharray="3 3" opacity={0.5} />
            <circle cx={hover.x} cy={hover.y} r={4} fill={lineColor} stroke="var(--background)" strokeWidth={2} />
          </>
        )}
      </svg>

      {hover && (
        <div style={{
          position: "relative",
          marginTop: -svgH + hover.y - 48,
          marginLeft: hover.x > svgW / 2 ? hover.x - 120 : hover.x + 12,
          width: "fit-content",
          backgroundColor: "var(--chart-tooltip-bg)",
          border: "1px solid var(--chart-tooltip-border)",
          borderRadius: "var(--radius)",
          padding: "var(--space-3) var(--space-4)",
          boxShadow: "var(--chart-tooltip-shadow)",
          fontFamily: "var(--font-family-supreme)",
          pointerEvents: "none",
          zIndex: 10,
        }}>
          <p style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginBottom: "var(--space-1)" }}>
            {hover.date}
          </p>
          <p style={{
            fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-bold)",
            color: "var(--chart-tooltip-fg)", fontFamily: "var(--font-family-mono)",
          }}>
            {formatCurrency(hover.val)}
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   3. STACKED AREA CHART — DeFi Protocol TVL
   Uses extended chart palette colors instead of coin tokens
   ═══════════════════════════════════════════════════ */

const STACKED_SERIES = [
  { key: "lending", name: "Lending", color: "var(--chart-blue-500)", lightColor: "var(--chart-blue-200)" },
  { key: "dex", name: "DEX", color: "var(--chart-emerald-500)", lightColor: "var(--chart-emerald-200)" },
  { key: "yield", name: "Yield", color: "var(--chart-amber-500)", lightColor: "var(--chart-amber-200)" },
  { key: "bridge", name: "Bridge", color: "var(--chart-violet-500)", lightColor: "var(--chart-violet-200)" },
  { key: "derivatives", name: "Derivatives", color: "var(--chart-rose-500)", lightColor: "var(--chart-rose-200)" },
  { key: "liquid_staking", name: "Liquid Staking", color: "var(--chart-cyan-500)", lightColor: "var(--chart-cyan-200)" },
];

function StackedAreaChart() {
  const totalTvl = useMemo(() => {
    const last = STACKED_AREA_DATA[STACKED_AREA_DATA.length - 1];
    return STACKED_SERIES.reduce((sum, s) => sum + (last[s.key] as number), 0);
  }, []);

  const gradId = (key: string) => `stacked-grad-${key}`;

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
        <div>
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", marginBottom: "var(--space-1)" }}>
            Total Value Locked — DeFi Protocols
          </p>
          <p style={{
            fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground)", lineHeight: "var(--lh-h5)",
            fontFamily: "var(--font-family-mono)",
          }}>
            ${totalTvl.toFixed(1)}B
          </p>
        </div>
        <div className="flex items-center flex-wrap" style={{ gap: "var(--space-4)" }}>
          {STACKED_SERIES.map(s => (
            <div key={s.key} className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "var(--radius-circle)", backgroundColor: s.color }} />
              <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", height: 300, minWidth: 0, overflow: "hidden" }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
          <AreaChart data={STACKED_AREA_DATA}>
            <defs>
              {STACKED_SERIES.map(s => (
                <linearGradient key={gradId(s.key)} id={gradId(s.key)} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "var(--chart-axis-fg)", fontFamily: "var(--font-family-supreme)" }}
              axisLine={{ stroke: "var(--chart-grid)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--chart-axis-fg)", fontFamily: "var(--font-family-supreme)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}B`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--chart-tooltip-shadow)",
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-body-sm)",
                color: "var(--chart-tooltip-fg)",
              }}
              formatter={(value: number, name: string) => {
                const label = STACKED_SERIES.find(s => s.key === name)?.name ?? name;
                return [`$${value}B`, label];
              }}
            />
            {STACKED_SERIES.map(s => (
              <Area
                key={`area-${s.key}`}
                type="monotone"
                dataKey={s.key}
                stackId="tvl"
                stroke={s.color}
                fill={`url(#${gradId(s.key)})`}
                strokeWidth={1.5}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown pills */}
      <div className="flex flex-wrap" style={{ gap: "var(--space-3)", marginTop: "var(--space-5)" }}>
        {STACKED_SERIES.map((s, i) => {
          const last = STACKED_AREA_DATA[STACKED_AREA_DATA.length - 1];
          const val = last[s.key] as number;
          const pct = ((val / totalTvl) * 100).toFixed(1);
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center"
              style={{
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--secondary)",
                gap: "var(--space-3)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "var(--radius-circle)", backgroundColor: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--foreground)", fontFamily: "var(--font-family-supreme)" }}>{s.name}</span>
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-mono)" }}>${val}B</span>
              <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-mono)" }}>{pct}%</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   4. MULTI-SERIES BAR CHART — Using Coin Tokens
   ═══════════════════════════════════════════════════ */

function VolumeBarChart() {
  const series = [
    { key: "btc", name: "BTC", color: "var(--coin-btc)" },
    { key: "eth", name: "ETH", color: "var(--coin-eth)" },
    { key: "sol", name: "SOL", color: "var(--coin-sol)" },
    { key: "xrp", name: "XRP", color: "var(--coin-xrp)" },
    { key: "trx", name: "TRX", color: "var(--coin-trx)" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
        <div>
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", marginBottom: "var(--space-1)" }}>
            Monthly Trading Volume
          </p>
          <p style={{
            fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground)", lineHeight: "var(--lh-h5)",
          }}>
            $192.4B Total
          </p>
        </div>
        <div className="flex items-center flex-wrap" style={{ gap: "var(--space-4)" }}>
          {series.map(s => (
            <div key={s.key} className="flex items-center" style={{ gap: "var(--space-2)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "var(--radius-circle)", backgroundColor: s.color }} />
              <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", height: 260, minWidth: 0, overflow: "hidden" }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
          <BarChart data={MONTHLY_VOLUME} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "var(--chart-axis-fg)", fontFamily: "var(--font-family-supreme)" }}
              axisLine={{ stroke: "var(--chart-grid)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--chart-axis-fg)", fontFamily: "var(--font-family-supreme)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}B`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--chart-tooltip-shadow)",
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-body-sm)",
                color: "var(--chart-tooltip-fg)",
              }}
              formatter={(value: number, name: string) => [`$${value}B`, name.toUpperCase()]}
            />
            {series.map(s => (
              <Bar key={`bar-${s.key}`} dataKey={s.key} fill={s.color} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   5. HEATMAP — Hourly Trading Activity
   Uses the extended green palette for intensity gradient
   ═══════════════════════════════════════════════════ */

function TradingHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<{ day: number; hour: number; value: number } | null>(null);
  const [colorScale, setColorScale] = useState<"emerald" | "blue" | "purple">("emerald");

  const maxVal = useMemo(() => Math.max(...HEATMAP_DATA.map(d => d.value)), []);

  /* Map intensity (0–1) to a shade from the selected color family */
  const getColor = useCallback((value: number) => {
    const intensity = value / maxVal;
    if (intensity < 0.15) return `var(--chart-${colorScale}-50)`;
    if (intensity < 0.3) return `var(--chart-${colorScale}-100)`;
    if (intensity < 0.4) return `var(--chart-${colorScale}-200)`;
    if (intensity < 0.5) return `var(--chart-${colorScale}-300)`;
    if (intensity < 0.6) return `var(--chart-${colorScale}-400)`;
    if (intensity < 0.7) return `var(--chart-${colorScale}-500)`;
    if (intensity < 0.8) return `var(--chart-${colorScale}-600)`;
    if (intensity < 0.9) return `var(--chart-${colorScale}-700)`;
    return `var(--chart-${colorScale}-800)`;
  }, [maxVal, colorScale]);

  const cellW = 26;
  const cellH = 28;
  const gap = 3;
  const labelW = 36;
  const headerH = 20;
  const svgW = labelW + HEATMAP_HOURS.length * (cellW + gap);
  const svgH = headerH + HEATMAP_DAYS.length * (cellH + gap);

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
        <div>
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", marginBottom: "var(--space-1)" }}>
            Trading Activity — Hourly Volume Intensity
          </p>
          <p style={{
            fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            Higher intensity = more trading volume (UTC)
          </p>
        </div>
        <TabSwitcher
          tabs={["emerald", "blue", "purple"]}
          active={colorScale}
          onChange={(t) => setColorScale(t as typeof colorScale)}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          width={svgW}
          height={svgH}
          style={{ display: "block" }}
          onMouseLeave={() => setHoveredCell(null)}
        >
          {/* Hour labels */}
          {HEATMAP_HOURS.map(h => (
            <text
              key={`h-${h}`}
              x={labelW + h * (cellW + gap) + cellW / 2}
              y={headerH - 6}
              textAnchor="middle"
              fill="var(--chart-axis-fg)"
              fontSize={9}
              fontFamily="var(--font-family-mono)"
            >
              {h.toString().padStart(2, "0")}
            </text>
          ))}

          {/* Day labels */}
          {HEATMAP_DAYS.map((d, i) => (
            <text
              key={`d-${d}`}
              x={labelW - 6}
              y={headerH + i * (cellH + gap) + cellH / 2 + 3}
              textAnchor="end"
              fill="var(--chart-axis-fg)"
              fontSize={10}
              fontFamily="var(--font-family-supreme)"
            >
              {d}
            </text>
          ))}

          {/* Heatmap cells */}
          {HEATMAP_DATA.map(cell => {
            const x = labelW + cell.hour * (cellW + gap);
            const y = headerH + cell.day * (cellH + gap);
            const isHovered = hoveredCell?.day === cell.day && hoveredCell?.hour === cell.hour;
            return (
              <motion.rect
                key={`${cell.day}-${cell.hour}`}
                x={x}
                y={y}
                width={cellW}
                height={cellH}
                rx={3}
                ry={3}
                animate={{ fill: getColor(cell.value) }}
                transition={{ duration: 0.3 }}
                stroke={isHovered ? "var(--foreground)" : "none"}
                strokeWidth={isHovered ? 1.5 : 0}
                style={{ cursor: "crosshair" }}
                onMouseEnter={() => setHoveredCell(cell)}
                whileHover={{ scale: 1.1 }}
              />
            );
          })}
        </svg>
      </div>

      {/* Tooltip below chart */}
      <div style={{
        minHeight: 36,
        marginTop: "var(--space-4)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-5)",
      }}>
        {hoveredCell ? (
          <>
            <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
              <span style={{
                width: 14, height: 14, borderRadius: "var(--radius-xs)",
                backgroundColor: getColor(hoveredCell.value),
                border: "1px solid var(--border-subtle)",
              }} />
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--foreground)" }}>
                {HEATMAP_DAYS[hoveredCell.day]}, {hoveredCell.hour.toString().padStart(2, "0")}:00 UTC
              </span>
            </div>
            <span style={{
              fontSize: "var(--text-body-sm)",
              fontFamily: "var(--font-family-mono)",
              color: "var(--foreground)",
              fontWeight: "var(--font-weight-medium)",
            }}>
              Intensity: {(hoveredCell.value / maxVal * 100).toFixed(0)}%
            </span>
            <span style={{
              fontSize: "var(--text-caption)",
              fontFamily: "var(--font-family-mono)",
              color: "var(--muted-foreground)",
            }}>
              Raw: {hoveredCell.value.toFixed(2)}
            </span>
          </>
        ) : (
          <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)" }}>
            Hover over a cell to see details
          </span>
        )}

        {/* Gradient legend */}
        <div className="flex items-center" style={{ gap: "var(--space-2)", marginLeft: "auto" }}>
          <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>Low</span>
          <div className="flex" style={{ gap: 1 }}>
            {[50, 200, 400, 600, 800].map(shade => (
              <motion.span
                key={`${colorScale}-${shade}`}
                layout
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: 16, height: 10, borderRadius: 2,
                  backgroundColor: `var(--chart-${colorScale}-${shade})`,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>High</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   6. DONUT CHART — Portfolio Allocation
   ═══════════════════════════════════════════════════ */

function PortfolioDonutChart() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const total = PORTFOLIO_DATA.reduce((s, d) => s + d.usd, 0);

  return (
    <div className="flex items-center" style={{ gap: "var(--space-10)", fontFamily: "var(--font-family-supreme)" }}>
      <div style={{ position: "relative", width: 220, height: 220, flexShrink: 0, overflow: "hidden" }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
          <PieChart>
            <Pie
              data={PORTFOLIO_DATA}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              onMouseEnter={(_, i) => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {PORTFOLIO_DATA.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  opacity={activeIdx !== null && activeIdx !== i ? 0.4 : 1}
                  style={{ transition: "opacity var(--duration-short-3) var(--ease-standard)", cursor: "pointer" }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", pointerEvents: "none",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx !== null ? PORTFOLIO_DATA[activeIdx].name : "total"}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)" }}>
                {activeIdx !== null ? PORTFOLIO_DATA[activeIdx].name : "Total"}
              </span>
              <span style={{
                fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}>
                {activeIdx !== null
                  ? `${PORTFOLIO_DATA[activeIdx].value}%`
                  : formatCurrency(total)}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: "var(--space-4)", flex: 1 }}>
        {PORTFOLIO_DATA.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between"
            style={{
              padding: "var(--space-3) var(--space-4)",
              borderRadius: "var(--radius)",
              backgroundColor: activeIdx === i ? "var(--secondary)" : "transparent",
              transition: "background-color var(--duration-short-3) var(--ease-standard)",
              cursor: "pointer",
            }}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
          >
            <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
              <span style={{
                width: 10, height: 10, borderRadius: "var(--radius-circle)",
                backgroundColor: item.color, flexShrink: 0,
              }} />
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>
                {item.name}
              </span>
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)" }}>
                {item.fullName}
              </span>
            </div>
            <div className="flex items-center" style={{ gap: "var(--space-5)" }}>
              <span style={{ fontSize: "var(--text-body-sm)", color: "var(--foreground)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)" }}>
                {formatCurrency(item.usd)}
              </span>
              <span style={{
                fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-mono)",
                minWidth: 50, textAlign: "right",
              }}>
                {item.value}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   6b. SOLID PIE CHART — Portfolio Breakdown (Figma style)
   ═══════════════════════════════════════════════════ */

/* ── Custom SVG variable-radius pie ───────────────── */
function sectorPath(
  cx: number, cy: number, r: number,
  startDeg: number, endDeg: number,
): string {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy - r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy - r * Math.sin(toRad(endDeg));
  const sweep = Math.abs(startDeg - endDeg);
  const largeArc = sweep > 180 ? 1 : 0;
  /* sweep-flag=1 for clockwise arcs in SVG's Y-down coordinate space */
  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
}

function PortfolioPieChart() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { copiedVar, copy } = useCopyToClipboard();
  const total = PORTFOLIO_PIE_DATA.reduce((s, d) => s + d.usd, 0);

  const pieSize = 320;
  const svgCx = pieSize / 2;
  const svgCy = pieSize / 2;
  const maxR = pieSize / 2 - 16; /* leave room for hover expansion */
  const minR = maxR * 0.76;
  const hoverGrow = 8;
  const hoverNudge = 6;

  /* Pre-compute per-slice radii + angles */
  const maxPct = Math.max(...PORTFOLIO_PIE_DATA.map(d => d.pct));
  const slices = useMemo(() => {
    let cumDeg = 90; /* start from 12 o'clock */
    return PORTFOLIO_PIE_DATA.map(d => {
      const sweep = (d.pct / 100) * 360;
      const startDeg = cumDeg;
      cumDeg -= sweep; /* clockwise */
      const endDeg = cumDeg;
      const r = minR + (d.pct / maxPct) * (maxR - minR);
      return { startDeg, endDeg, r, sweep };
    });
  }, [maxPct]);

  /* Render order: largest radius first (behind), smallest on top */
  const renderOrder = useMemo(() => {
    const indices = PORTFOLIO_PIE_DATA.map((_, i) => i);
    indices.sort((a, b) => slices[b].r - slices[a].r);
    return indices;
  }, [slices]);

  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const activeItem = activeIdx !== null ? PORTFOLIO_PIE_DATA[activeIdx] : null;

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const easing = "cubic-bezier(0.4, 0.14, 0.3, 1)";

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)", position: "relative" }}>
      {/* Copy toast */}
      <AnimatePresence>
        {copiedVar && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--chart-tooltip-bg)",
              border: "1px solid var(--chart-tooltip-border)",
              borderRadius: "var(--radius)",
              padding: "var(--space-3) var(--space-5)",
              boxShadow: "var(--chart-tooltip-shadow)",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="var(--chart-positive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontSize: "var(--text-body-sm)",
              fontFamily: "var(--font-family-mono)",
              color: "var(--chart-tooltip-fg)",
            }}>
              Copied <span style={{ color: "var(--chart-positive)" }}>var({copiedVar})</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Total portfolio header */}
      <div style={{ marginBottom: "var(--space-6)" }}>
        <span style={{
          fontSize: "var(--text-body-sm)",
          color: "var(--muted-foreground)",
          fontFamily: "var(--font-family-supreme)",
        }}>
          Total Portfolio Value
        </span>
        <div className="flex items-baseline" style={{ gap: "var(--space-3)", marginTop: "var(--space-1)" }}>
          <span style={{
            fontSize: "var(--text-h3)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground)",
            fontFamily: "var(--font-family-supreme)",
          }}>
            {formatCurrency(total)}
          </span>
          <span style={{
            fontSize: "var(--text-body-sm)",
            color: "var(--chart-positive)",
            fontFamily: "var(--font-family-mono)",
          }}>
            {PORTFOLIO_PIE_DATA.length} assets
          </span>
        </div>
      </div>

      {/* Chart + Legend row */}
      <div className="flex items-center" style={{ gap: "var(--space-8)" }}>
        {/* Custom SVG pie with variable radii */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <svg
            width={pieSize}
            height={pieSize}
            viewBox={`0 0 ${pieSize} ${pieSize}`}
            style={{ overflow: "visible", display: "block" }}
            onMouseMove={handleSvgMouseMove}
            onMouseLeave={() => { setActiveIdx(null); setTooltipPos(null); }}
          >
            <defs>
              <filter id="pie-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.18" />
              </filter>
            </defs>
            {/* Render largest-radius slices first (behind), active slice last */}
            {renderOrder
              .filter(i => i !== activeIdx)
              .map(i => {
                const entry = PORTFOLIO_PIE_DATA[i];
                const { startDeg, endDeg, r } = slices[i];
                const isDimmed = activeIdx !== null;
                return (
                  <path
                    key={entry.name}
                    d={sectorPath(svgCx, svgCy, r, startDeg, endDeg)}
                    fill={entry.color}
                    opacity={isDimmed ? 0.4 : 1}
                    style={{
                      cursor: "pointer",
                      transition: `opacity 0.35s ${easing}`,
                    }}
                    onMouseEnter={() => setActiveIdx(i)}
                  />
                );
              })}
            {/* Active slice on top with nudge + grow + shadow */}
            {activeIdx !== null && (() => {
              const i = activeIdx;
              const entry = PORTFOLIO_PIE_DATA[i];
              const { startDeg, endDeg, r } = slices[i];
              const midDeg = (startDeg + endDeg) / 2;
              const nudgeX = hoverNudge * Math.cos((midDeg * Math.PI) / 180);
              const nudgeY = -hoverNudge * Math.sin((midDeg * Math.PI) / 180);
              return (
                <path
                  key={entry.name + "-active"}
                  d={sectorPath(svgCx + nudgeX, svgCy + nudgeY, r + hoverGrow, startDeg, endDeg)}
                  fill={entry.color}
                  filter="url(#pie-shadow)"
                  style={{
                    cursor: "pointer",
                    filter: "url(#pie-shadow) brightness(1.08)",
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                />
              );
            })()}
            {/* Center overlay circle + white text label */}
            {activeItem && (
              <g style={{ pointerEvents: "none" }}>
                <circle
                  cx={svgCx}
                  cy={svgCy}
                  r={52}
                  fill="rgba(15, 23, 42, 0.82)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
                <text
                  x={svgCx}
                  y={svgCy - 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: "#ffffff",
                    fontFamily: "var(--font-family-supreme)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: 16,
                  }}
                >
                  {activeItem.name}
                </text>
                <text
                  x={svgCx}
                  y={svgCy + 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: "rgba(255, 255, 255, 0.72)",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: 11,
                  }}
                >
                  {formatCurrency(activeItem.usd)}
                </text>
                <text
                  x={svgCx}
                  y={svgCy + 20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fill: "rgba(255, 255, 255, 0.52)",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: 10,
                  }}
                >
                  {activeItem.pct}%
                </text>
              </g>
            )}
          </svg>

          {/* Floating tooltip near cursor */}
          <AnimatePresence>
            {activeItem && tooltipPos && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute",
                  left: tooltipPos.x + 16,
                  top: tooltipPos.y - 12,
                  pointerEvents: "none",
                  backgroundColor: "var(--chart-tooltip-bg)",
                  border: "1px solid var(--chart-tooltip-border)",
                  borderRadius: "var(--radius)",
                  padding: "var(--space-2) var(--space-4)",
                  boxShadow: "var(--chart-tooltip-shadow)",
                  whiteSpace: "nowrap",
                  zIndex: 10,
                }}
              >
                <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: "var(--radius-circle)",
                    backgroundColor: activeItem.color,
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "var(--font-family-supreme)",
                    fontWeight: "var(--font-weight-bold)",
                    fontSize: "var(--text-body-sm)",
                    color: "var(--chart-tooltip-fg)",
                  }}>
                    {activeItem.name}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "var(--text-caption)",
                    color: "var(--chart-tooltip-fg)",
                    opacity: 0.7,
                  }}>
                    {formatCurrency(activeItem.usd)} · {activeItem.pct}%
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashed connector line + Legend */}
        <div className="flex items-start" style={{ gap: 0, flex: 1, position: "relative" }}>
          {/* Dashed horizontal connector */}
          <div style={{
            width: 40,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "stretch",
          }}>
            <div style={{
              width: "100%",
              height: 0,
              borderTop: "1.5px dashed var(--brand-default)",
              opacity: 0.5,
            }} />
          </div>

          {/* Legend items */}
          <div className="flex flex-col" style={{ gap: "var(--space-5)", flex: 1 }}>
            {PORTFOLIO_PIE_DATA.map((item, i) => {
              const varName = `--coin-${item.name.toLowerCase()}`;
              const isCopied = copiedVar === varName;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center justify-between"
                  style={{
                    cursor: "pointer",
                    opacity: activeIdx !== null && activeIdx !== i ? 0.45 : 1,
                    transition: `all 0.35s ${easing}`,
                    padding: "var(--space-3) var(--space-4)",
                    borderRadius: "var(--radius)",
                    backgroundColor: activeIdx === i ? "var(--secondary)" : "transparent",
                  }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onClick={() => copy(varName)}
                >
                  <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
                    {/* Row 1: coin dot + ticker / percentage */}
                    <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                      <span style={{
                        width: 12,
                        height: 12,
                        borderRadius: "var(--radius-circle)",
                        backgroundColor: item.color,
                        flexShrink: 0,
                      }} />
                      <span style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontWeight: "var(--font-weight-bold)",
                        fontSize: "var(--text-body)",
                        color: "var(--foreground)",
                      }}>
                        {item.name}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontWeight: "var(--font-weight-regular)",
                        fontSize: "var(--text-body)",
                        color: "var(--muted-foreground)",
                      }}>
                        / {item.pct}%
                      </span>
                    </div>
                    {/* Row 2: $value • amount TICKER */}
                    <div style={{
                      marginLeft: 24,
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "var(--text-body-sm)",
                      color: "var(--muted-foreground)",
                      letterSpacing: "var(--ls-caption)",
                    }}>
                      ${item.usd.toLocaleString()} <span style={{ margin: "0 var(--space-1)" }}>&bull;</span> {item.amount} {item.name}
                    </div>
                  </div>
                  {/* Copy indicator */}
                  <div style={{
                    fontSize: "var(--text-caption)",
                    fontFamily: "var(--font-family-mono)",
                    color: isCopied ? "var(--chart-positive)" : "var(--muted-foreground)",
                    opacity: activeIdx === i ? 1 : 0,
                    transition: `opacity 0.35s ${easing}`,
                    whiteSpace: "nowrap",
                  }}>
                    {isCopied ? "Copied!" : "Click to copy"}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   7. SPARKLINES — Watchlist Cards
   ═══════════════════════════════════════════════════ */

function SparklineCard({ item }: { item: typeof WATCHLIST_DATA[0] }) {
  const isPos = item.change >= 0;
  const sparkColor = isPos ? "var(--chart-positive)" : "var(--chart-negative)";

  return (
    <div className="flex items-center border rounded-lg" style={{
      padding: "var(--space-5) var(--space-6)",
      borderColor: "var(--border-subtle)",
      backgroundColor: "var(--card)",
      gap: "var(--space-5)",
      fontFamily: "var(--font-family-supreme)",
      transition: "box-shadow var(--duration-short-3) var(--ease-standard)",
      flex: "1 1 0",
      minWidth: 220,
    }}>
      <div style={{ flex: 1 }}>
        <div className="flex items-center" style={{ gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
          <span style={{
            width: 8, height: 8, borderRadius: "var(--radius-circle)", backgroundColor: item.color,
          }} />
          <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>
            {item.symbol}
          </span>
          <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>
            {item.name}
          </span>
        </div>
        <p style={{
          fontSize: "var(--text-h6)", fontWeight: "var(--font-weight-bold)", color: "var(--foreground)",
          fontFamily: "var(--font-family-mono)", lineHeight: "var(--lh-h6)",
        }}>
          {formatCurrency(item.price)}
        </p>
        <ChangeIndicator value={item.change} />
      </div>

      <div style={{ width: 80, height: 36, minWidth: 0, overflow: "hidden" }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
          <LineChart data={item.sparkline}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={sparkColor}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function WatchlistSparklines() {
  return (
    <div className="flex flex-wrap" style={{ gap: "var(--space-4)" }}>
      {WATCHLIST_DATA.map((item, i) => (
        <motion.div
          key={item.symbol}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          whileHover={{ y: -2, boxShadow: "var(--elevation-sm)" }}
          style={{ flex: "1 1 0", minWidth: 220 }}
        >
          <SparklineCard item={item} />
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   8. DATA TABLE — Coin Prices
   ═══════════════════════════════════════════════════ */

function CoinPricesTable() {
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Gainers", "Losers"];

  const filtered = useMemo(() => {
    if (tab === "Gainers") return [...COIN_TABLE_DATA].filter(c => c.change24h > 0).sort((a, b) => b.change24h - a.change24h);
    if (tab === "Losers") return [...COIN_TABLE_DATA].filter(c => c.change24h < 0).sort((a, b) => a.change24h - b.change24h);
    return COIN_TABLE_DATA;
  }, [tab]);

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div style={{ marginBottom: "var(--space-5)" }}>
        <TabSwitcher tabs={tabs} active={tab} onChange={setTab} />
      </div>

      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--table-border)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--table-header-bg)" }}>
              {["#", "Name", "Price", "24h %", "7d %", "Market Cap", "Volume (24h)"].map((h) => (
                <th key={h} style={{
                  textAlign: h === "#" || h === "Name" ? "left" : "right",
                  padding: `var(--table-header-padding-y) var(--table-cell-padding-x)`,
                  fontSize: "var(--text-caption)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--table-header-fg)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-family-supreme)",
                  borderBottom: `1px solid var(--table-border)`,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((coin, idx) => (
              <motion.tr
                key={coin.symbol}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.015 }}
                className="group"
                style={{ backgroundColor: "var(--table-row-bg)", transition: "background-color var(--duration-short-2) var(--ease-standard)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--table-row-hover-bg)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--table-row-bg)")}
              >
                <td style={{ padding: `var(--table-cell-padding-y) var(--table-cell-padding-x)`, fontSize: "var(--text-body-sm)", color: "var(--table-cell-secondary-fg)", fontFamily: "var(--font-family-mono)" }}>
                  {coin.rank}
                </td>
                <td style={{ padding: `var(--table-cell-padding-y) var(--table-cell-padding-x)` }}>
                  <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: "var(--radius-circle)",
                      backgroundColor: coin.color, display: "inline-flex", alignItems: "center", justifyContent: "center",
                      fontSize: "9px", fontWeight: "var(--font-weight-bold)", color: "#fff", flexShrink: 0,
                    }}>
                      {coin.symbol.charAt(0)}
                    </span>
                    <div>
                      <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--table-cell-fg)" }}>
                        {coin.name}
                      </span>
                      <span style={{ fontSize: "var(--text-caption)", color: "var(--table-cell-secondary-fg)", marginLeft: "var(--space-2)" }}>
                        {coin.symbol}
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: `var(--table-cell-padding-y) var(--table-cell-padding-x)`, textAlign: "right", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-medium)", color: "var(--table-cell-fg)" }}>
                  {formatCurrency(coin.price)}
                </td>
                <td style={{ padding: `var(--table-cell-padding-y) var(--table-cell-padding-x)`, textAlign: "right" }}>
                  <ChangeIndicator value={coin.change24h} />
                </td>
                <td style={{ padding: `var(--table-cell-padding-y) var(--table-cell-padding-x)`, textAlign: "right" }}>
                  <ChangeIndicator value={coin.change7d} />
                </td>
                <td style={{ padding: `var(--table-cell-padding-y) var(--table-cell-padding-x)`, textAlign: "right", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", color: "var(--table-cell-fg)" }}>
                  {formatCurrency(coin.marketCap, true)}
                </td>
                <td style={{ padding: `var(--table-cell-padding-y) var(--table-cell-padding-x)`, textAlign: "right", fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", color: "var(--table-cell-secondary-fg)" }}>
                  {formatCurrency(coin.volume, true)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   10. CANDLESTICK CHART — OHLC Price Data + Compare Mode
   ═══════════════════════════════════════════════════ */

function CandlestickChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [range, setRange] = useState("1W");
  const [compareCoins, setCompareCoins] = useState<Set<string>>(new Set());
  const [showCompare, setShowCompare] = useState(false);

  const candleData = useMemo(() => generateCandlestickData(CANDLESTICK_RANGES[range].count, range), [range]);

  /* Generate normalized compare series for each enabled coin */
  const compareSeries = useMemo(() => {
    const count = candleData.length;
    // Normalize BTC candle closes to 100-base
    const btcBase = candleData[0].close;
    const btcNorm = candleData.map(d => (d.close / btcBase) * 100);

    const series: { symbol: string; color: string; data: number[] }[] = [
      { symbol: "BTC", color: "var(--coin-btc)", data: btcNorm },
    ];
    COMPARE_COINS.forEach(coin => {
      if (compareCoins.has(coin.symbol)) {
        series.push({
          symbol: coin.symbol,
          color: coin.color,
          data: generateNormalizedSeries(count, 2.5 + Math.random()),
        });
      }
    });
    return series;
  }, [candleData, compareCoins]);

  const toggleCompare = (symbol: string) => {
    setCompareCoins(prev => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  };

  const svgW = 700;
  const svgH = 340;
  const padL = 64;
  const padR = 12;
  const padT = 16;
  const padB = 32;
  const volH = showCompare ? 0 : 60;
  const chartH = svgH - padT - padB - volH - (showCompare ? 0 : 12);
  const chartW = svgW - padL - padR;

  const allHigh = Math.max(...candleData.map(d => d.high));
  const allLow = Math.min(...candleData.map(d => d.low));
  const priceRange = allHigh - allLow || 1;
  const maxVol = Math.max(...candleData.map(d => d.volume));

  const candleW = Math.max(4, (chartW / candleData.length) * 0.6);
  const stepX = chartW / candleData.length;

  const toX = (i: number) => padL + i * stepX + stepX / 2;
  const toY = (v: number) => padT + (1 - (v - allLow) / priceRange) * chartH;
  const volTop = padT + chartH + 12;
  const toVolH = (v: number) => (v / maxVol) * volH;

  /* Compare mode Y scale (normalized %) */
  const compareMin = useMemo(() => Math.min(...compareSeries.flatMap(s => s.data)), [compareSeries]);
  const compareMax = useMemo(() => Math.max(...compareSeries.flatMap(s => s.data)), [compareSeries]);
  const compareRange = compareMax - compareMin || 1;
  const toCompareY = (v: number) => padT + (1 - (v - compareMin) / compareRange) * chartH;

  const yTicks = showCompare
    ? Array.from({ length: 5 }, (_, i) => {
        const v = compareMin + (compareRange * i) / 4;
        return { v, y: toCompareY(v), label: `${v.toFixed(0)}%` };
      })
    : Array.from({ length: 5 }, (_, i) => {
        const v = allLow + (priceRange * i) / 4;
        return { v, y: toY(v), label: `$${(v / 1000).toFixed(1)}k` };
      });

  const xStep = Math.max(1, Math.floor(candleData.length / 6));

  const hovered = hoveredIdx !== null ? candleData[hoveredIdx] : null;
  const lastCandle = candleData[candleData.length - 1];
  const firstCandle = candleData[0];
  const periodChange = ((lastCandle.close - firstCandle.open) / firstCandle.open * 100);

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="flex items-start justify-between" style={{ marginBottom: "var(--space-5)" }}>
        <div>
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", marginBottom: "var(--space-1)" }}>
            BTC/USD — {CANDLESTICK_RANGES[range].label}{showCompare ? " (Normalized %)" : ""}
          </p>
          <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
            <span style={{
              fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)",
              color: "var(--foreground)", lineHeight: "var(--lh-h5)",
              fontFamily: "var(--font-family-mono)",
            }}>
              {showCompare ? `${((lastCandle.close / firstCandle.open) * 100).toFixed(1)}%` : formatCurrency(lastCandle.close)}
            </span>
            <span style={{
              fontSize: "var(--text-body-sm)",
              fontFamily: "var(--font-family-mono)",
              color: periodChange >= 0 ? "var(--chart-positive)" : "var(--chart-negative)",
            }}>
              {periodChange >= 0 ? "+" : ""}{periodChange.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
          {/* OHLC legend */}
          <AnimatePresence>
            {hovered && !showCompare && (
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                style={{ gap: "var(--space-5)", padding: "var(--space-3) var(--space-4)", backgroundColor: "var(--secondary)", borderRadius: "var(--radius)" }}
              >
                {(["open", "high", "low", "close"] as const).map(k => (
                  <div key={k} className="flex items-center" style={{ gap: "var(--space-2)" }}>
                    <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{k.charAt(0)}</span>
                    <span style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>
                      {formatCurrency(hovered[k])}
                    </span>
                  </div>
                ))}
                <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
                  <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Vol</span>
                  <span style={{ fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)", color: "var(--foreground)" }}>{hovered.volume}B</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <TabSwitcher tabs={Object.keys(CANDLESTICK_RANGES)} active={range} onChange={(t) => { setRange(t); setHoveredIdx(null); }} />
        </div>
      </div>

      {/* Compare controls */}
      <div className="flex items-center" style={{ gap: "var(--space-3)", marginBottom: "var(--space-5)" }}>
        <button
          onClick={() => { setShowCompare(!showCompare); setHoveredIdx(null); }}
          className="cursor-pointer"
          style={{
            display: "flex", alignItems: "center", gap: "var(--space-2)",
            padding: "var(--space-2) var(--space-4)",
            borderRadius: "var(--radius)",
            border: `1px solid ${showCompare ? "var(--brand-default)" : "var(--border-subtle)"}`,
            backgroundColor: showCompare ? "var(--brand-default)" : "transparent",
            color: showCompare ? "var(--brand-fg)" : "var(--muted-foreground)",
            fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)",
            fontWeight: "var(--font-weight-medium)",
            transition: "all var(--duration-short-3) var(--ease-standard)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 10L4.5 5L7.5 7.5L13 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 12L5 8.5L8 10L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </svg>
          Compare
        </button>
        <AnimatePresence>
          {showCompare && COMPARE_COINS.map(coin => (
            <motion.button
              key={coin.symbol}
              initial={{ opacity: 0, scale: 0.9, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -8 }}
              transition={{ duration: 0.2 }}
              onClick={() => toggleCompare(coin.symbol)}
              className="cursor-pointer"
              style={{
                display: "flex", alignItems: "center", gap: "var(--space-2)",
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius)",
                border: `1px solid ${compareCoins.has(coin.symbol) ? coin.color : "var(--border-subtle)"}`,
                backgroundColor: compareCoins.has(coin.symbol) ? coin.color : "transparent",
                color: compareCoins.has(coin.symbol) ? "#FFFFFF" : "var(--muted-foreground)",
                fontSize: "var(--text-caption)", fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-medium)",
                transition: "background-color var(--duration-short-3) var(--ease-standard), border-color var(--duration-short-3) var(--ease-standard), color var(--duration-short-3) var(--ease-standard)",
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "var(--radius-circle)",
                backgroundColor: compareCoins.has(coin.symbol) ? "#FFFFFF" : coin.color,
              }} />
              {coin.symbol}
            </motion.button>
          ))}
        </AnimatePresence>
        {showCompare && compareCoins.size > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
            style={{ gap: "var(--space-3)", marginLeft: "auto" }}
          >
            {compareSeries.map(s => {
              const last = s.data[s.data.length - 1];
              const change = last - 100;
              return (
                <span key={s.symbol} style={{
                  fontSize: "var(--text-caption)", fontFamily: "var(--font-family-mono)",
                  fontWeight: "var(--font-weight-medium)",
                  color: s.color,
                }}>
                  {s.symbol} {change >= 0 ? "+" : ""}{change.toFixed(1)}%
                </span>
              );
            })}
          </motion.div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        height={svgH}
        style={{ overflow: "visible" }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        {/* Grid lines */}
        {yTicks.map(t => (
          <line key={`cg-${t.v}`} x1={padL} x2={svgW - padR} y1={t.y} y2={t.y} stroke="var(--chart-grid)" strokeDasharray="3 3" />
        ))}
        {yTicks.map(t => (
          <text key={`cy-${t.v}`} x={padL - 8} y={t.y + 3} textAnchor="end" fill="var(--chart-axis-fg)" fontSize={10} fontFamily="var(--font-family-supreme)">{t.label}</text>
        ))}

        {/* X-axis labels */}
        {candleData.map((d, i) => (
          i % xStep === 0 ? (
            <text key={`cx-${i}`} x={toX(i)} y={padT + chartH + 16} textAnchor="middle" fill="var(--chart-axis-fg)" fontSize={10} fontFamily="var(--font-family-supreme)">{d.date}</text>
          ) : null
        ))}

        {/* Baseline */}
        <line x1={padL} x2={svgW - padR} y1={padT + chartH} y2={padT + chartH} stroke="var(--chart-grid)" />

        {/* Compare mode: normalized line overlays */}
        {showCompare ? (
          <>
            {/* 100% baseline */}
            <line
              x1={padL} x2={svgW - padR}
              y1={toCompareY(100)} y2={toCompareY(100)}
              stroke="var(--muted-foreground)" strokeDasharray="6 4" opacity={0.3}
            />
            <text x={svgW - padR + 4} y={toCompareY(100) + 3} fill="var(--muted-foreground)" fontSize={9} fontFamily="var(--font-family-mono)">100%</text>

            {compareSeries.map(s => {
              const path = s.data.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(2)},${toCompareY(v).toFixed(2)}`).join(" ");
              return (
                <g key={`compare-${s.symbol}`}>
                  <path d={path} fill="none" stroke={s.color} strokeWidth={2} opacity={0.85} strokeLinejoin="round" />
                  {/* End label */}
                  <circle cx={toX(s.data.length - 1)} cy={toCompareY(s.data[s.data.length - 1])} r={3} fill={s.color} />
                  <text
                    x={toX(s.data.length - 1) + 8}
                    y={toCompareY(s.data[s.data.length - 1]) + 4}
                    fill={s.color}
                    fontSize={10}
                    fontFamily="var(--font-family-supreme)"
                    fontWeight="600"
                  >
                    {s.symbol}
                  </text>
                </g>
              );
            })}
          </>
        ) : (
          <>
            {/* Candlesticks */}
            {candleData.map((d, i) => {
              const x = toX(i);
              const isBull = d.close >= d.open;
              const color = isBull ? "var(--chart-positive)" : "var(--chart-negative)";
              const bodyTop = toY(Math.max(d.open, d.close));
              const bodyBot = toY(Math.min(d.open, d.close));
              const bodyH = Math.max(1, bodyBot - bodyTop);
              const isHov = hoveredIdx === i;

              return (
                <g key={`candle-${i}`} style={{ cursor: "crosshair" }}>
                  <line x1={x} x2={x} y1={toY(d.high)} y2={toY(d.low)} stroke={color} strokeWidth={1.2} opacity={isHov ? 1 : 0.7} />
                  <rect
                    x={x - candleW / 2} y={bodyTop}
                    width={candleW} height={bodyH}
                    fill={color} rx={1}
                    opacity={isHov ? 1 : 0.85}
                    stroke={isHov ? "var(--foreground)" : "none"}
                    strokeWidth={isHov ? 1 : 0}
                  />
                  <rect
                    x={x - stepX / 2} y={padT}
                    width={stepX} height={chartH + volH + 12}
                    fill="transparent"
                    onMouseEnter={() => setHoveredIdx(i)}
                  />
                </g>
              );
            })}

            {/* Volume bars */}
            {candleData.map((d, i) => {
              const x = toX(i);
              const isBull = d.close >= d.open;
              const barH = toVolH(d.volume);
              return (
                <rect
                  key={`vol-${i}`}
                  x={x - candleW / 2}
                  y={volTop + volH - barH}
                  width={candleW} height={barH}
                  fill={isBull ? "var(--chart-positive)" : "var(--chart-negative)"}
                  opacity={hoveredIdx === i ? 0.6 : 0.25}
                  rx={1}
                />
              );
            })}
          </>
        )}

        {/* Hover crosshair */}
        {hoveredIdx !== null && (
          <line
            x1={toX(hoveredIdx)} x2={toX(hoveredIdx)}
            y1={padT} y2={showCompare ? padT + chartH : volTop + volH}
            stroke="var(--muted-foreground)" strokeDasharray="3 3" opacity={0.4}
          />
        )}

        {/* Compare hover dots */}
        {showCompare && hoveredIdx !== null && compareSeries.map(s => (
          <g key={`hover-${s.symbol}`}>
            <circle cx={toX(hoveredIdx)} cy={toCompareY(s.data[hoveredIdx])} r={4} fill={s.color} stroke="var(--background)" strokeWidth={2} />
            <text
              x={toX(hoveredIdx) + 8} y={toCompareY(s.data[hoveredIdx]) + 4}
              fill={s.color} fontSize={9} fontFamily="var(--font-family-mono)" fontWeight="600"
            >
              {s.data[hoveredIdx].toFixed(1)}%
            </text>
          </g>
        ))}

        {/* Invisible hover rect for compare mode */}
        {showCompare && (
          <rect
            x={padL} y={padT} width={chartW} height={chartH}
            fill="transparent" style={{ cursor: "crosshair" }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const mx = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, mx / chartW));
              const idx = Math.round(ratio * (candleData.length - 1));
              setHoveredIdx(idx);
            }}
          />
        )}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   11. CORRELATION MATRIX — Diverging Color Scale
   ═══════════════════════════════════════════════════ */

type CorrSortMode = "default" | "similarity" | "strength";
const CORR_SORT_MODES: { key: CorrSortMode; label: string; desc: string }[] = [
  { key: "default", label: "Default", desc: "Original coin order" },
  { key: "similarity", label: "Similarity", desc: "Greedy nearest-neighbor clustering" },
  { key: "strength", label: "Strength", desc: "Sorted by avg correlation magnitude" },
];

function computeCorrOrder(mode: CorrSortMode): number[] {
  const n = CORR_COINS.length;
  if (mode === "default") return CORR_COINS.map((_, i) => i);

  if (mode === "strength") {
    // Sort by average absolute correlation (descending)
    const avgAbs = Array.from({ length: n }, (_, i) =>
      CORR_MATRIX[i].reduce((s, v, j) => s + (i === j ? 0 : Math.abs(v)), 0) / (n - 1)
    );
    return [...Array(n).keys()].sort((a, b) => avgAbs[b] - avgAbs[a]);
  }

  // similarity: greedy nearest-neighbor
  const avgCorr = Array.from({ length: n }, (_, i) =>
    CORR_MATRIX[i].reduce((s, v, j) => s + (i === j ? 0 : v), 0) / (n - 1)
  );
  const visited = new Set<number>();
  const order: number[] = [];
  let current = avgCorr.indexOf(Math.max(...avgCorr));
  for (let step = 0; step < n; step++) {
    order.push(current);
    visited.add(current);
    let bestNext = -1;
    let bestVal = -Infinity;
    for (let j = 0; j < n; j++) {
      if (!visited.has(j) && CORR_MATRIX[current][j] > bestVal) {
        bestVal = CORR_MATRIX[current][j];
        bestNext = j;
      }
    }
    if (bestNext >= 0) current = bestNext;
  }
  return order;
}

function CorrelationMatrix() {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [sortMode, setSortMode] = useState<CorrSortMode>("default");
  const [highlightThreshold, setHighlightThreshold] = useState<number | null>(null);

  const sortedOrder = useMemo(() => computeCorrOrder(sortMode), [sortMode]);

  const orderedCoins = sortedOrder.map(i => CORR_COINS[i]);
  const orderedColors = sortedOrder.map(i => CORR_COLORS[i]);
  const orderedMatrix = sortedOrder.map(ri => sortedOrder.map(ci => CORR_MATRIX[ri][ci]));

  const n = orderedCoins.length;
  const cellSize = 64;
  const labelW = 56;
  const headerH = 56;
  const svgW = labelW + n * cellSize;
  const svgH = headerH + n * cellSize;

  const getColor = (v: number) => {
    if (v >= 0.95) return "var(--chart-blue-700)";
    if (v >= 0.75) return "var(--chart-blue-500)";
    if (v >= 0.5) return "var(--chart-blue-300)";
    if (v >= 0.25) return "var(--chart-blue-100)";
    if (v >= -0.25) return "var(--secondary)";
    if (v >= -0.5) return "var(--chart-red-100)";
    if (v >= -0.75) return "var(--chart-red-300)";
    return "var(--chart-red-500)";
  };

  const getTextColor = (v: number) => {
    if (Math.abs(v) >= 0.75) return "var(--color-text-inverse)";
    return "var(--foreground)";
  };

  /* Highlight filter: dims cells below threshold */
  const isHighlighted = (v: number) => {
    if (highlightThreshold === null) return true;
    return Math.abs(v) >= highlightThreshold;
  };

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      <div className="flex items-center justify-between flex-wrap" style={{ marginBottom: "var(--space-5)", gap: "var(--space-4)" }}>
        <div>
          <p style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", marginBottom: "var(--space-1)" }}>
            30-Day Price Correlation — Pearson Coefficient
          </p>
          <p style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>
            Values range from -1 (inverse) to +1 (perfectly correlated)
          </p>
        </div>
        <div className="flex items-center flex-wrap" style={{ gap: "var(--space-3)" }}>
          {/* Sort mode selector */}
          <TabSwitcher
            tabs={CORR_SORT_MODES.map(m => m.label)}
            active={CORR_SORT_MODES.find(m => m.key === sortMode)!.label}
            onChange={(label) => {
              const mode = CORR_SORT_MODES.find(m => m.label === label)!;
              setSortMode(mode.key);
              setHoveredCell(null);
            }}
          />
          {/* Threshold filter */}
          <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>Filter</span>
            {[null, 0.25, 0.5, 0.75].map(t => (
              <button
                key={String(t)}
                onClick={() => setHighlightThreshold(highlightThreshold === t ? null : t)}
                className="cursor-pointer"
                style={{
                  padding: "var(--space-1) var(--space-3)",
                  borderRadius: "var(--radius-xs)",
                  border: `1px solid ${highlightThreshold === t ? "var(--brand-default)" : "var(--border-subtle)"}`,
                  backgroundColor: highlightThreshold === t ? "var(--brand-default)" : "transparent",
                  color: highlightThreshold === t ? "var(--brand-fg)" : "var(--muted-foreground)",
                  fontSize: "var(--text-caption)",
                  fontFamily: "var(--font-family-mono)",
                  fontWeight: "var(--font-weight-medium)",
                  transition: "all var(--duration-short-3) var(--ease-standard)",
                }}
              >
                {t === null ? "All" : `≥${t}`}
              </button>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>-1</span>
            <div className="flex" style={{ gap: 1 }}>
              {["var(--chart-red-500)", "var(--chart-red-300)", "var(--chart-red-100)", "var(--secondary)", "var(--chart-blue-100)", "var(--chart-blue-300)", "var(--chart-blue-500)", "var(--chart-blue-700)"].map((c, i) => (
                <span key={i} style={{ width: 16, height: 10, borderRadius: 2, backgroundColor: c }} />
              ))}
            </div>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)" }}>+1</span>
          </div>
        </div>
      </div>

      {/* Sort mode description */}
      <motion.p
        key={sortMode}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginBottom: "var(--space-4)" }}
      >
        Ordering: {CORR_SORT_MODES.find(m => m.key === sortMode)!.desc}
      </motion.p>

      <div style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH} style={{ display: "block" }} onMouseLeave={() => setHoveredCell(null)}>
          {/* Column headers — animated positions */}
          {orderedCoins.map((coin, i) => {
            const cx = labelW + i * cellSize + cellSize / 2;
            return (
              <motion.g
                key={`ch-${coin}`}
                animate={{ x: cx - (labelW + CORR_COINS.indexOf(coin) * cellSize + cellSize / 2) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <circle cx={labelW + CORR_COINS.indexOf(coin) * cellSize + cellSize / 2} cy={20} r={10} fill={orderedColors[i]} />
                <text
                  x={labelW + CORR_COINS.indexOf(coin) * cellSize + cellSize / 2}
                  y={42}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize={11}
                  fontFamily="var(--font-family-supreme)"
                  fontWeight="500"
                >
                  {coin}
                </text>
              </motion.g>
            );
          })}

          {/* Row labels — animated positions */}
          {orderedCoins.map((coin, i) => {
            const cy = headerH + i * cellSize + cellSize / 2;
            return (
              <motion.g
                key={`rh-${coin}`}
                animate={{ y: cy - (headerH + CORR_COINS.indexOf(coin) * cellSize + cellSize / 2) }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <circle cx={20} cy={headerH + CORR_COINS.indexOf(coin) * cellSize + cellSize / 2} r={10} fill={orderedColors[i]} />
                <text
                  x={42}
                  y={headerH + CORR_COINS.indexOf(coin) * cellSize + cellSize / 2 + 4}
                  textAnchor="start"
                  fill="var(--foreground)"
                  fontSize={11}
                  fontFamily="var(--font-family-supreme)"
                  fontWeight="500"
                >
                  {coin}
                </text>
              </motion.g>
            );
          })}

          {/* Matrix cells — animated reordering */}
          {orderedMatrix.map((row, ri) =>
            row.map((val, ci) => {
              const x = labelW + ci * cellSize;
              const y = headerH + ri * cellSize;
              const isHov = hoveredCell?.row === ri && hoveredCell?.col === ci;
              const isDiag = ri === ci;
              const highlighted = isHighlighted(val) || isDiag;
              const origRi = sortedOrder[ri];
              const origCi = sortedOrder[ci];
              const origX = labelW + origCi * cellSize;
              const origY = headerH + origRi * cellSize;

              return (
                <motion.g
                  key={`mc-${CORR_COINS[origRi]}-${CORR_COINS[origCi]}`}
                  animate={{ x: x - origX, y: y - origY }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ cursor: "crosshair" }}
                  onMouseEnter={() => setHoveredCell({ row: ri, col: ci })}
                >
                  <rect
                    x={origX + 2} y={origY + 2}
                    width={cellSize - 4} height={cellSize - 4}
                    rx={4}
                    fill={getColor(val)}
                    stroke={isHov ? "var(--foreground)" : "var(--border-subtle)"}
                    strokeWidth={isHov ? 1.5 : 0.5}
                    opacity={highlighted ? 1 : 0.15}
                    style={{ transition: "fill 0.15s ease, opacity 0.2s ease" }}
                  />
                  <text
                    x={origX + cellSize / 2}
                    y={origY + cellSize / 2 + 4}
                    textAnchor="middle"
                    fill={getTextColor(val)}
                    fontSize={isDiag ? 10 : 12}
                    fontFamily="var(--font-family-mono)"
                    fontWeight={isDiag ? "400" : "500"}
                    opacity={highlighted ? 1 : 0.15}
                    style={{ transition: "opacity 0.2s ease" }}
                  >
                    {isDiag ? "1.00" : val.toFixed(2)}
                  </text>
                </motion.g>
              );
            })
          )}
        </svg>
      </div>

      {/* Hover info */}
      <div style={{ minHeight: 28, marginTop: "var(--space-4)" }}>
        <AnimatePresence mode="wait">
          {hoveredCell ? (
            <motion.p
              key={`${hoveredCell.row}-${hoveredCell.col}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              style={{ fontSize: "var(--text-body-sm)", color: "var(--foreground)" }}
            >
              <span style={{ fontWeight: "var(--font-weight-medium)" }}>{orderedCoins[hoveredCell.row]}</span>
              <span style={{ color: "var(--muted-foreground)" }}> × </span>
              <span style={{ fontWeight: "var(--font-weight-medium)" }}>{orderedCoins[hoveredCell.col]}</span>
              <span style={{ color: "var(--muted-foreground)" }}> = </span>
              <span style={{
                fontFamily: "var(--font-family-mono)", fontWeight: "var(--font-weight-bold)",
                color: orderedMatrix[hoveredCell.row][hoveredCell.col] >= 0.5 ? "var(--chart-blue-600)" :
                       orderedMatrix[hoveredCell.row][hoveredCell.col] <= -0.25 ? "var(--chart-red-600)" : "var(--foreground)",
              }}>
                {orderedMatrix[hoveredCell.row][hoveredCell.col].toFixed(2)}
              </span>
              <span style={{ color: "var(--muted-foreground)", fontSize: "var(--text-caption)", marginLeft: "var(--space-3)" }}>
                {orderedMatrix[hoveredCell.row][hoveredCell.col] >= 0.75 ? "Strongly correlated" :
                 orderedMatrix[hoveredCell.row][hoveredCell.col] >= 0.5 ? "Moderately correlated" :
                 orderedMatrix[hoveredCell.row][hoveredCell.col] >= 0.25 ? "Weakly correlated" :
                 orderedMatrix[hoveredCell.row][hoveredCell.col] >= -0.25 ? "Uncorrelated" :
                 "Inversely correlated"}
              </span>
            </motion.p>
          ) : (
            <motion.span
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)" }}
            >
              Hover over a cell to see correlation details
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   12. TREEMAP — Market Cap Portfolio Composition
   ═══════════════════════════════════════════════════ */

/* Helper: resolve CSS variables to computed colors and determine luminance */
function useResolvedLuminanceMap(colorVars: string[]) {
  const [lightMap, setLightMap] = useState<Record<string, boolean>>({});
  const key = colorVars.join(",");
  useEffect(() => {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.opacity = "0";
    el.style.pointerEvents = "none";
    document.body.appendChild(el);
    const map: Record<string, boolean> = {};
    for (const cv of colorVars) {
      el.style.backgroundColor = cv;
      const rgb = getComputedStyle(el).backgroundColor;
      const match = rgb.match(/(\d+)/g);
      if (match) {
        const [r, g, b] = match.map(Number);
        const lum = [r, g, b].map(c => {
          const s = c / 255;
          return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        const L = 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
        map[cv] = L > 0.35;
      }
    }
    document.body.removeChild(el);
    setLightMap(map);
  }, [key]);
  return lightMap;
}

/* Extract CSS variable name from `var(--foo)` string */
function extractCssVarName(colorStr: string): string {
  const m = colorStr.match(/var\(([^)]+)\)/);
  return m ? m[1] : colorStr;
}

function MarketCapTreemap() {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [drillCategory, setDrillCategory] = useState<string | null>(null);
  const [drillKey, setDrillKey] = useState(0);
  const { copiedVar, copy } = useCopyToClipboard();

  const handleDrill = (cat: string | null) => {
    setDrillCategory(cat);
    setHoveredName(null);
    setDrillKey(k => k + 1);
  };

  const activeItems = useMemo(() => {
    if (drillCategory) {
      const cat = TREEMAP_CATEGORIES.find(c => c.name === drillCategory);
      return cat ? cat.items : ALL_TREEMAP_ITEMS;
    }
    return TREEMAP_CATEGORIES.map(c => ({
      name: c.name,
      fullName: c.name,
      marketCap: c.items.reduce((s, i) => s + i.marketCap, 0),
      color: c.color,
      category: c.name,
    }));
  }, [drillCategory]);

  const totalCap = activeItems.reduce((s, d) => s + d.marketCap, 0);
  const sorted = [...activeItems].sort((a, b) => b.marketCap - a.marketCap);
  const isCategory = !drillCategory;

  /* Resolve luminance for all active item colors */
  const colorVars = useMemo(() => sorted.map(i => i.color), [sorted.map(i => i.color).join(",")]);
  const lightMap = useResolvedLuminanceMap(colorVars);

  return (
    <div style={{ fontFamily: "var(--font-family-supreme)" }}>
      {/* Copy toast */}
      <AnimatePresence>
        {copiedVar && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
              zIndex: 100, padding: "var(--space-3) var(--space-5)",
              borderRadius: "var(--radius-card)",
              backgroundColor: "var(--foreground)", color: "var(--background)",
              fontSize: "var(--text-body-sm)", fontFamily: "var(--font-family-mono)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            Copied <span style={{ fontWeight: "var(--font-weight-bold)" }}>var({copiedVar})</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center" style={{ gap: "var(--space-2)", marginBottom: "var(--space-2)" }}>
            <button
              onClick={() => handleDrill(null)}
              className="cursor-pointer"
              style={{
                background: "none", border: "none", padding: 0,
                fontSize: "var(--text-body-sm)",
                fontFamily: "var(--font-family-supreme)",
                color: drillCategory ? "var(--brand-default)" : "var(--muted-foreground)",
                fontWeight: drillCategory ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                textDecoration: drillCategory ? "underline" : "none",
                textUnderlineOffset: "3px",
              }}
            >
              All Categories
            </button>
            <AnimatePresence>
              {drillCategory && (
                <motion.span
                  className="flex items-center"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ gap: "var(--space-2)", display: "inline-flex" }}
                >
                  <span style={{ color: "var(--muted-foreground)", fontSize: "var(--text-caption)" }}>&rsaquo;</span>
                  <span style={{ fontSize: "var(--text-body-sm)", color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>
                    {drillCategory}
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <motion.p
            key={`total-${drillCategory}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              fontSize: "var(--text-h5)", fontWeight: "var(--font-weight-bold)",
              color: "var(--foreground)", lineHeight: "var(--lh-h5)",
              fontFamily: "var(--font-family-mono)",
            }}
          >
            ${totalCap >= 1000 ? `${(totalCap / 1000).toFixed(2)}T` : `${totalCap.toFixed(1)}B`} {drillCategory ? drillCategory : "Total"}
          </motion.p>
        </div>
        {/* Category pills */}
        <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
          <button
            onClick={() => handleDrill(null)}
            className="cursor-pointer"
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "var(--radius)",
              border: `1px solid ${!drillCategory ? "var(--foreground)" : "var(--border-subtle)"}`,
              backgroundColor: !drillCategory ? "var(--foreground)" : "transparent",
              color: !drillCategory ? "var(--background)" : "var(--muted-foreground)",
              fontSize: "var(--text-caption)",
              fontFamily: "var(--font-family-supreme)",
              fontWeight: "var(--font-weight-medium)",
              transition: "all var(--duration-short-3) var(--ease-standard)",
            }}
          >
            All
          </button>
          {TREEMAP_CATEGORIES.map(c => (
            <button
              key={c.name}
              onClick={() => handleDrill(c.name)}
              className="cursor-pointer"
              style={{
                padding: "var(--space-2) var(--space-4)",
                borderRadius: "var(--radius)",
                border: `1px solid ${drillCategory === c.name ? c.color : "var(--border-subtle)"}`,
                backgroundColor: drillCategory === c.name ? c.color : "transparent",
                color: drillCategory === c.name ? "#FFFFFF" : "var(--muted-foreground)",
                fontSize: "var(--text-caption)",
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-medium)",
                transition: "all var(--duration-short-3) var(--ease-standard)",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Card-based treemap grid — mirrors Colors page swatch card hierarchy */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`treemap-grid-${drillKey}`}
          className="grid"
          style={{
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "var(--space-4)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.4, 0.14, 0.3, 1] }}
        >
          {sorted.map((item, i) => {
            const pct = ((item.marketCap / totalCap) * 100).toFixed(1);
            const isHov = hoveredName === item.name;
            const colSpan = i === 0 ? 3 : i === 1 ? 2 : i < 4 ? 2 : 1;
            const minH = i === 0 ? 172 : i < 3 ? 148 : 120;
            const cssVarName = extractCssVarName(item.color);
            const isCopied = copiedVar === cssVarName;

            /* Contrast-aware foreground colors */
            const isLight = lightMap[item.color] ?? false;
            const fg = isLight ? "rgba(0,0,0,0.82)" : "rgba(255,255,255,0.92)";
            const fgSub = isLight ? "rgba(0,0,0,0.48)" : "rgba(255,255,255,0.56)";
            const footerBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)";
            const footerBorder = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)";
            const badgeBg = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)";
            const cardBorder = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)";

            return (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex flex-col"
                style={{
                  gridColumn: `span ${Math.min(colSpan, 6)}`,
                  backgroundColor: item.color,
                  borderRadius: "var(--radius-card)",
                  border: `1px solid ${cardBorder}`,
                  minHeight: minH,
                  overflow: "hidden",
                  cursor: isCategory ? "pointer" : "default",
                  transform: isHov ? "translateY(-2px)" : "translateY(0)",
                  boxShadow: isHov
                    ? "0 2px 8px rgba(0,0,0,0.10)"
                    : "0 1px 2px rgba(0,0,0,0.06)",
                  transition: "transform var(--duration-short-3) var(--ease-standard), box-shadow var(--duration-short-3) var(--ease-standard)",
                }}
                onMouseEnter={() => setHoveredName(item.name)}
                onMouseLeave={() => setHoveredName(null)}
                onClick={() => { if (isCategory) handleDrill(item.name); }}
              >
                {/* Top area — ticker + full name */}
                <div
                  className="flex-1 flex flex-col justify-center"
                  style={{ padding: "var(--space-4) var(--space-5)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-supreme)",
                      fontWeight: "var(--font-weight-bold)",
                      fontSize: i < 2 ? "var(--text-h4)" : "var(--text-h5)",
                      color: fg,
                      lineHeight: "var(--lh-h4)",
                      letterSpacing: "var(--ls-h4)",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-family-supreme)",
                      fontWeight: "var(--font-weight-regular)",
                      fontSize: "var(--text-caption)",
                      color: fgSub,
                      marginTop: "var(--space-1)",
                      letterSpacing: "var(--ls-caption)",
                    }}
                  >
                    {item.fullName}
                  </span>
                </div>
                {/* Footer strip — pct + market cap value (stacked left) + drill hint */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    backgroundColor: footerBg,
                    padding: "var(--space-3) var(--space-4)",
                    borderTop: `1px solid ${footerBorder}`,
                  }}
                >
                  <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "var(--text-caption)",
                        color: fg,
                        backgroundColor: badgeBg,
                        padding: "var(--space-1) var(--space-3)",
                        borderRadius: "var(--radius)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pct}%
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "var(--text-caption)",
                        color: fgSub,
                        letterSpacing: "var(--ls-caption)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${item.marketCap >= 1000 ? `${(item.marketCap / 1000).toFixed(2)}T` : `${item.marketCap.toFixed(1)}B`}
                    </span>
                  </div>
                  <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
                    {isCategory && (
                      <span
                        style={{
                          fontFamily: "var(--font-family-supreme)",
                          fontWeight: "var(--font-weight-regular)",
                          fontSize: "var(--text-caption)",
                          color: fgSub,
                        }}
                      >
                        Explore &rarr;
                      </span>
                    )}
                    {/* Copy CSS variable button */}
                    <button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(cssVarName);
                      }}
                      title={`Copy var(${cssVarName})`}
                      style={{
                        background: "none", border: "none", padding: "var(--space-1)",
                        borderRadius: "var(--radius-sm)",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        color: fg,
                        opacity: isHov || isCopied ? 1 : 0.5,
                        transition: "opacity var(--duration-short-3) var(--ease-standard)",
                      }}
                    >
                      {isCopied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend — ensures all items are visible even when blocks are too small for labels */}
      <div
        className="flex flex-wrap"
        style={{
          gap: "var(--space-3) var(--space-6)",
          marginTop: "var(--space-6)",
          paddingTop: "var(--space-5)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        {sorted.map((item) => {
          const pctVal = ((item.marketCap / totalCap) * 100).toFixed(1);
          const isHov = hoveredName === item.name;
          return (
            <div
              key={item.name + "-legend"}
              className="flex items-center"
              style={{
                gap: "var(--space-2)",
                opacity: hoveredName && !isHov ? 0.45 : 1,
                transition: "opacity 0.25s cubic-bezier(0.4, 0.14, 0.3, 1)",
                cursor: "default",
              }}
              onMouseEnter={() => setHoveredName(item.name)}
              onMouseLeave={() => setHoveredName(null)}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "var(--radius-circle)",
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-medium)",
                  fontSize: "var(--text-caption)",
                  color: "var(--foreground)",
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "var(--text-caption)",
                  color: "var(--muted-foreground)",
                }}
              >
                {pctVal}%
              </span>
              <span
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "var(--text-caption)",
                  color: "var(--muted-foreground)",
                  opacity: 0.6,
                }}
              >
                ${item.marketCap >= 1000 ? `${(item.marketCap / 1000).toFixed(2)}T` : `${item.marketCap.toFixed(1)}B`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   9. STAT CARDS
   ═══════════════════════════════════════════════════ */

function StatCards() {
  return (
    <div className="flex flex-wrap" style={{ gap: "var(--space-5)" }}>
      {STAT_CARDS.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          whileHover={{ y: -2, boxShadow: "var(--elevation-sm)" }}
          className="flex flex-col border rounded-lg"
          style={{
            flex: "1 1 0",
            minWidth: 200,
            padding: "var(--space-6)",
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--card)",
            fontFamily: "var(--font-family-supreme)",
            gap: "var(--space-3)",
          }}
        >
          <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)" }}>
            {card.label}
          </span>
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            {card.coinColor && (
              <span style={{
                width: 28, height: 28, borderRadius: "var(--radius-circle)",
                backgroundColor: card.coinColor, display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: "var(--font-weight-bold)", color: "#fff",
              }}>
                {card.value.charAt(0)}
              </span>
            )}
            <span style={{
              fontSize: "var(--text-h4)",
              fontWeight: "var(--font-weight-bold)",
              color: !card.coinColor && card.positive ? "var(--chart-positive)" : "var(--foreground)",
              lineHeight: "var(--lh-h4)",
              fontFamily: card.coinColor ? "var(--font-family-supreme)" : "var(--font-family-mono)",
            }}>
              {card.value}
            </span>
          </div>
          <span style={{
            fontSize: "var(--text-body-sm)",
            color: card.positive ? "var(--chart-positive)" : "var(--chart-negative)",
            fontFamily: "var(--font-family-mono)",
          }}>
            {card.subtext}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

const DATA_DISPLAY_SECTIONS: { label: string; Icon: TablerIcon }[] = [
  { label: "Chart Color Palette", Icon: IconPalette },
  { label: "Area Chart", Icon: IconTrendingUp },
  { label: "Stacked Area Chart", Icon: IconStack2 },
  { label: "Heatmap", Icon: IconGridDots },
  { label: "Bar Chart", Icon: IconChartBar },
  { label: "Donut Chart", Icon: IconChartDonut },
  { label: "Pie Chart", Icon: IconChartPie },
  { label: "Sparklines", Icon: IconSparkles },
  { label: "Data Table", Icon: IconTable },
  { label: "Candlestick Chart", Icon: IconChartCandle },
  { label: "Correlation Matrix", Icon: IconChartDots },
  { label: "Treemap", Icon: IconChartTreemap },
  { label: "Stat Cards", Icon: IconCards },
];

/* Build icon map for the FAB from section config */
const FAB_ICON_MAP: Record<string, TablerIcon> = Object.fromEntries(
  DATA_DISPLAY_SECTIONS.map(({ label, Icon }) => [label, Icon]),
);

function DataDisplaySideNav({ activeId }: { activeId: string }) {
  return (
    <nav
      className="sticky flex flex-col"
      style={{
        top: "120px",
        width: "160px",
        flexShrink: 0,
        fontFamily: "var(--font-family-supreme)",
        gap: "2px",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-overline)",
          fontWeight: "var(--font-weight-bold)" as any,
          letterSpacing: "var(--ls-overline)",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          padding: "0 var(--space-3) var(--space-3)",
          marginBottom: "var(--space-1)",
        }}
      >
        On this page
      </span>
      {DATA_DISPLAY_SECTIONS.map(({ label, Icon }) => {
        const id = slugify(label);
        const isActive = id === activeId;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(id);
              if (el) {
                const offset = 72 + 24;
                const top = window.scrollY + el.getBoundingClientRect().top - offset;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 truncate transition-colors duration-[var(--duration-short-3)]"
            style={{
              fontSize: "var(--text-body-sm)",
              fontWeight: isActive
                ? "var(--font-weight-medium)"
                : "var(--font-weight-regular)",
              color: isActive
                ? "var(--foreground)"
                : "var(--color-text-tertiary)",
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-xs)",
              backgroundColor: isActive
                ? "var(--secondary-subtle)"
                : "transparent",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = "var(--color-text-tertiary)";
            }}
          >
            <Icon size={14} stroke={isActive ? 2 : 1.5} />
            <span className="truncate">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function DataDisplayPage() {
  const [activeSection, setActiveSection] = useState(slugify(DATA_DISPLAY_SECTIONS[0].label));

  useEffect(() => {
    const ids = DATA_DISPLAY_SECTIONS.map((s) => slugify(s.label));
    const elems = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elems.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );
    elems.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <ComponentPage
      name="Data Display"
      description="Chart patterns and data visualization components for crypto exchange dashboards. Built with Recharts and custom SVG, themed via CSS variables for coin-specific and extended chart color tokens. Click any color swatch to copy its CSS variable."
      breadcrumbPrefix="Patterns"
      sideNav={<DataDisplaySideNav activeId={activeSection} />}
      fabIconMap={FAB_ICON_MAP}
    >
      <Section
        title="Chart Color Palette"
        description="The complete color system for data visualization. Includes 6 coin-specific tokens (3 shades each), 4 semantic tokens (positive/negative), and 17 extended color families with a full 10-shade scale (50–900). Click any swatch to copy its CSS variable to clipboard."
      >
        <ExampleGrid label="Color reference — click to copy">
          <ChartColorPalette />
        </ExampleGrid>
      </Section>

      <Section
        title="Area Chart"
        description="Time-series performance overview with gradient fill. The gradient and line color automatically switch between positive (green) and negative (red) based on the period's performance. Uses --chart-positive / --chart-negative semantic tokens."
      >
        <ExampleGrid label="Performance overview">
          <PerformanceAreaChart />
        </ExampleGrid>
      </Section>

      <Section
        title="Stacked Area Chart"
        description="Multi-series stacked area chart showing DeFi protocol TVL over time. Each series uses a distinct color from the extended chart palette (--chart-blue-500, --chart-emerald-500, --chart-amber-500, etc.) with gradient fills derived from the same family's lighter shades."
      >
        <ExampleGrid label="DeFi TVL breakdown">
          <StackedAreaChart />
        </ExampleGrid>
      </Section>

      <Section
        title="Heatmap"
        description="Hourly trading activity visualized as a 7×24 heatmap grid. Intensity maps to shades within a single color family from the extended palette. Switch between Emerald, Blue, and Purple palettes to see how the full shade scale renders in practice."
      >
        <ExampleGrid label="Weekly activity grid">
          <TradingHeatmap />
        </ExampleGrid>
      </Section>

      <Section
        title="Bar Chart"
        description="Multi-series grouped bar chart showing monthly trading volume per coin. Each bar uses its coin-specific color token (--coin-btc, --coin-eth, etc.) with chart semantic tokens for grid, axes, and tooltips."
      >
        <ExampleGrid label="Monthly volume">
          <VolumeBarChart />
        </ExampleGrid>
      </Section>

      <Section
        title="Donut Chart"
        description="Portfolio allocation with interactive hover states. Hovering a segment or legend row highlights the corresponding slice and updates the center label. All 6 coin colors are used."
      >
        <ExampleGrid label="Portfolio allocation">
          <PortfolioDonutChart />
        </ExampleGrid>
      </Section>

      <Section
        title="Pie Chart"
        description="Solid pie chart with total portfolio header, animated slice pull-out on hover, click-to-copy coin CSS variable names with toast notification, and a right-aligned legend showing ticker, allocation percentage, USD value, and token amount."
      >
        <ExampleGrid label="Portfolio breakdown">
          <PortfolioPieChart />
        </ExampleGrid>
      </Section>

      <Section
        title="Sparklines"
        description="Compact inline charts embedded in watchlist cards. Line color switches between --chart-positive and --chart-negative based on the 24h change direction."
      >
        <ExampleGrid label="Watchlist cards">
          <WatchlistSparklines />
        </ExampleGrid>
      </Section>

      <Section
        title="Data Table"
        description="Tabular coin market data with sortable tab filters (All, Gainers, Losers). Uses table tokens for header, row hover, and border styling, with coin color tokens for the avatar circles."
      >
        <ExampleGrid label="Coin prices">
          <CoinPricesTable />
        </ExampleGrid>
      </Section>

      <Section
        title="Candlestick Chart"
        description="OHLC candlestick chart with a time-range switcher (1D/1W/1M) and a Compare mode that overlays normalized price lines for ETH, SOL, and XRP against BTC. Compare toggle animates coin buttons in with Motion staggering, switching between candlestick and multi-line views. Uses --chart-positive, --chart-negative, and coin-specific color tokens."
      >
        <ExampleGrid label="BTC/USD OHLC">
          <CandlestickChart />
        </ExampleGrid>
      </Section>

      <Section
        title="Correlation Matrix"
        description="Pearson correlation heatmap with 3 sorting algorithms (Default, Similarity via greedy nearest-neighbor, Strength by avg magnitude) and a threshold filter (≥0.25/0.5/0.75) that dims weaker correlations. Cells and headers animate positions with spring physics via Motion when reordered. Uses the extended chart-blue and chart-red palette families."
      >
        <ExampleGrid label="Coin correlation (30d)">
          <CorrelationMatrix />
        </ExampleGrid>
      </Section>

      <Section
        title="Treemap"
        description="Market-cap-weighted composition with animated drill-down. Top level shows 5 categories (L1, L2, DeFi, Stablecoins, Other) — click any block or pill to drill in. Blocks enter with staggered scale-in animation via Motion AnimatePresence, and legend items animate with popLayout. A persistent pill bar enables quick category switching."
      >
        <ExampleGrid label="Market cap composition">
          <MarketCapTreemap />
        </ExampleGrid>
      </Section>

      <Section
        title="Stat Cards"
        description="Summary metric cards for key portfolio stats. Pair with coin color tokens and semantic positive/negative colors to surface the most important numbers at a glance."
      >
        <ExampleGrid label="Key metrics">
          <StatCards />
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}
