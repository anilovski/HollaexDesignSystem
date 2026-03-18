import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { useState, useCallback, useRef, useEffect } from "react";
import { CoinAmountField, type CoinAsset } from "../ui/hx-coin-amount-field";
import { ButtonGroup, ButtonGroupItem } from "../ui/hx-button-group";
import { Button } from "../ui/hollaex-button";
import { CryptoIcon, CRYPTO_COINS } from "../ui/crypto-icon";
import { HxSheet } from "../ui/hx-sheet";
import { ArrowDownUp, Search, Star, Clock, TrendingUp, X } from "lucide-react";
import { cn } from "../ui/utils";

/* ═══════════════════════════════════════════════════
   SWAP BUTTON
   ═══════════════════════════════════════════════════ */

function SwapButton({
  onClick,
  isSwapping,
}: {
  onClick: () => void;
  isSwapping: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex items-center justify-center" style={{ margin: "calc(var(--space-3) * -1) 0", zIndex: 2 }}>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center justify-center cursor-pointer active:scale-95"
        style={{
          width: 40,
          height: 40,
          borderRadius: "var(--radius-card)",
          border: "none",
          backgroundColor: "var(--secondary-default)",
          color: "var(--secondary-fg)",
          boxShadow: "var(--elevation-sm)",
          transitionDuration: "var(--duration-short-3)",
          transitionTimingFunction: "var(--ease-standard)",
          transform: isSwapping ? "rotate(180deg)" : "rotate(0deg)",
        }}
        aria-label="Swap convert direction"
      >
        {/* Custom ArrowDownUp SVG with independently animated arrows */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left arrow (down) — nudges down on hover */}
          <g style={{
            transition: "transform var(--duration-short-3) var(--ease-standard)",
            transform: hovered ? "translateY(3px)" : "translateY(0)",
          }}>
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
          </g>
          {/* Right arrow (up) — nudges up on hover */}
          <g style={{
            transition: "transform var(--duration-short-3) var(--ease-standard)",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
          }}>
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </g>
        </svg>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════ */

const COINS: (CoinAsset & { balance: string; price: number })[] = [
  { symbol: "usdt", name: "Tether", balance: "40,012.722", price: 1.0 },
  { symbol: "btc", name: "Bitcoin", balance: "1.2340", price: 67432.10 },
  { symbol: "eth", name: "Ethereum", balance: "24.881", price: 3521.80 },
  { symbol: "sol", name: "Solana", balance: "1,240.50", price: 142.65 },
  { symbol: "xrp", name: "XRP", balance: "15,200.00", price: 0.5432 },
  { symbol: "bnb", name: "BNB", balance: "12.450", price: 598.20 },
  { symbol: "ada", name: "Cardano", balance: "50,000.00", price: 0.45 },
  { symbol: "doge", name: "Dogecoin", balance: "120,000.00", price: 0.082 },
  { symbol: "avax", name: "Avalanche", balance: "340.00", price: 35.80 },
  { symbol: "dot", name: "Polkadot", balance: "2,800.00", price: 7.15 },
  { symbol: "link", name: "Chainlink", balance: "1,500.00", price: 14.32 },
  { symbol: "uni", name: "Uniswap", balance: "800.00", price: 9.85 },
  { symbol: "atom", name: "Cosmos", balance: "620.00", price: 8.92 },
  { symbol: "near", name: "NEAR Protocol", balance: "4,100.00", price: 5.60 },
  { symbol: "ltc", name: "Litecoin", balance: "45.00", price: 72.50 },
];

const RECENT = ["usdt", "btc", "eth", "sol"];
const FAVORITES = ["btc", "eth", "usdt", "xrp", "sol"];

/* ═══════════════════════════════════════════════════
   COIN SELECTOR SHEET
   ═══════════════════════════════════════════════════ */

function CoinSelectorSheet({
  open,
  onClose,
  onSelect,
  exclude,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (coin: typeof COINS[0]) => void;
  exclude?: string;
}) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "favorites">("all");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTab("all");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const filtered = COINS.filter((c) => {
    if (c.symbol === exclude) return false;
    if (!query) return tab === "favorites" ? FAVORITES.includes(c.symbol) : true;
    const q = query.toLowerCase();
    return c.symbol.includes(q) || c.name.toLowerCase().includes(q);
  });

  const recentCoins = COINS.filter(
    (c) => RECENT.includes(c.symbol) && c.symbol !== exclude,
  );

  return (
    <HxSheet open={open} onClose={onClose} title="Select Asset" side="right" width={400}>
      {/* Search */}
      <div
        className="flex items-center rounded-[var(--radius-card)] border"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background)",
          padding: "var(--space-3) var(--space-4)",
          gap: "var(--space-3)",
          marginBottom: "var(--space-5)",
        }}
      >
        <Search size={16} style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coins..."
          className="bg-transparent outline-none flex-1 min-w-0"
          style={{
            fontSize: "var(--text-body)",
            fontFamily: "var(--font-family-supreme)",
            color: "var(--color-text-primary)",
            lineHeight: "var(--lh-body)",
            border: "none",
            padding: 0,
          }}
          aria-label="Search coins"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="flex items-center justify-center cursor-pointer"
            style={{ color: "var(--color-text-tertiary)" }}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div
        className="flex items-center border-b"
        style={{
          gap: "var(--space-5)",
          marginBottom: "var(--space-5)",
          borderColor: "var(--border-subtle)",
        }}
      >
        {(["all", "favorites"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="cursor-pointer transition-colors"
            style={{
              fontSize: "var(--text-body-sm)",
              fontFamily: "var(--font-family-supreme)",
              fontWeight: tab === t ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
              color: tab === t ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
              padding: "var(--space-3) 0",
              background: "none",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottomWidth: "2px",
              borderBottomStyle: "solid",
              borderBottomColor: tab === t ? "var(--brand-default)" : "transparent",
              transitionDuration: "var(--duration-short-3)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            {t === "favorites" && <Star size={12} />}
            {t === "all" ? "All Coins" : "Favorites"}
          </button>
        ))}
      </div>

      {/* Recent (only when no search query and on "all" tab) */}
      {!query && tab === "all" && (
        <div style={{ marginBottom: "var(--space-6)" }}>
          <div
            className="flex items-center"
            style={{
              gap: "var(--space-2)",
              marginBottom: "var(--space-3)",
            }}
          >
            <Clock size={12} style={{ color: "var(--color-text-tertiary)" }} />
            <span
              style={{
                fontSize: "var(--text-caption)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--color-text-tertiary)",
                fontFamily: "var(--font-family-supreme)",
                textTransform: "uppercase",
                letterSpacing: "var(--ls-overline)",
              }}
            >
              Recent
            </span>
          </div>
          <div className="flex flex-wrap" style={{ gap: "var(--space-2)" }}>
            {recentCoins.map((coin) => (
              <button
                key={coin.symbol}
                type="button"
                onClick={() => { onSelect(coin); onClose(); }}
                className="flex items-center rounded-[var(--radius-chip)] border cursor-pointer transition-all"
                style={{
                  padding: "var(--space-2) var(--space-4) var(--space-2) var(--space-2)",
                  gap: "var(--space-2)",
                  borderColor: "var(--border)",
                  backgroundColor: "var(--background)",
                  transitionDuration: "var(--duration-short-3)",
                  transitionTimingFunction: "var(--ease-standard)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--brand-default)";
                  e.currentTarget.style.backgroundColor = "var(--brand-subtle)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <CryptoIcon symbol={coin.symbol} size={18} />
                <span
                  style={{
                    fontSize: "var(--text-body-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-family-supreme)",
                  }}
                >
                  {coin.symbol.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Coin list */}
      <div className="flex flex-col" style={{ gap: "var(--space-1)" }}>
        {filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center"
            style={{ padding: "var(--space-10) 0" }}
          >
            <Search size={32} style={{ color: "var(--color-text-disabled)", marginBottom: "var(--space-4)" }} />
            <span
              style={{
                fontSize: "var(--text-body)",
                color: "var(--color-text-tertiary)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              No coins found
            </span>
          </div>
        )}
        {filtered.map((coin) => (
          <button
            key={coin.symbol}
            type="button"
            onClick={() => { onSelect(coin); onClose(); }}
            className="flex items-center justify-between rounded-[var(--radius-card)] cursor-pointer transition-all"
            style={{
              padding: "var(--space-4) var(--space-4)",
              backgroundColor: "transparent",
              border: "none",
              transitionDuration: "var(--duration-short-3)",
              transitionTimingFunction: "var(--ease-standard)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--secondary-subtle)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
              <CryptoIcon symbol={coin.symbol} size={32} />
              <div className="flex flex-col items-start">
                <span
                  style={{
                    fontSize: "var(--text-body)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-family-supreme)",
                    lineHeight: "var(--lh-body)",
                  }}
                >
                  {coin.name}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-meta)",
                    color: "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-supreme)",
                    lineHeight: "var(--lh-meta)",
                  }}
                >
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span
                style={{
                  fontSize: "var(--text-body)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-family-mono)",
                  lineHeight: "var(--lh-body)",
                }}
              >
                {coin.balance}
              </span>
              <span
                style={{
                  fontSize: "var(--text-meta)",
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-family-mono)",
                  lineHeight: "var(--lh-meta)",
                }}
              >
                ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </button>
        ))}
      </div>
    </HxSheet>
  );
}

/* ═══════════════════════════════════════════════════
   QUICK TRADE MODULE
   ═══════════════════════════════════════════════════ */

function QuickTradeModule({ compact = false }: { compact?: boolean }) {
  const [fromCoin, setFromCoin] = useState(COINS[0]); // USDT
  const [toCoin, setToCoin] = useState(COINS[1]); // BTC
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorTarget, setSelectorTarget] = useState<"from" | "to">("from");
  const [isSwapping, setIsSwapping] = useState(false);
  const [reviewState, setReviewState] = useState<"idle" | "reviewing" | "success">("idle");

  // Calculate conversion
  const rate = fromCoin.price / toCoin.price;
  const rateDisplay = rate < 0.001
    ? rate.toFixed(8)
    : rate < 1
      ? rate.toFixed(6)
      : rate.toFixed(4);

  const updateToAmount = useCallback(
    (val: string) => {
      setFromAmount(val);
      const num = parseFloat(val.replace(/,/g, ""));
      if (!isNaN(num) && num > 0) {
        const converted = num * rate;
        setToAmount(
          converted < 0.001
            ? converted.toFixed(8)
            : converted < 1
              ? converted.toFixed(6)
              : converted.toFixed(4),
        );
      } else {
        setToAmount("");
      }
    },
    [rate],
  );

  const handlePercentage = useCallback(
    (pct: number) => {
      const balance = parseFloat(fromCoin.balance.replace(/,/g, ""));
      const val = (balance * pct) / 100;
      updateToAmount(
        val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
      );
    },
    [fromCoin.balance, updateToAmount],
  );

  const handleSwap = useCallback(() => {
    setIsSwapping(true);
    setTimeout(() => {
      setFromCoin(toCoin);
      setToCoin(fromCoin);
      setFromAmount("");
      setToAmount("");
      setIsSwapping(false);
    }, 200);
  }, [fromCoin, toCoin]);

  const openSelector = useCallback((target: "from" | "to") => {
    setSelectorTarget(target);
    setSelectorOpen(true);
  }, []);

  const handleCoinSelect = useCallback(
    (coin: typeof COINS[0]) => {
      if (selectorTarget === "from") {
        // If user picks the same coin as "to", swap them
        if (coin.symbol === toCoin.symbol) {
          setToCoin(fromCoin);
        }
        setFromCoin(coin);
      } else {
        if (coin.symbol === fromCoin.symbol) {
          setFromCoin(toCoin);
        }
        setToCoin(coin);
      }
      setFromAmount("");
      setToAmount("");
    },
    [selectorTarget, fromCoin, toCoin],
  );

  const handleReview = useCallback(() => {
    setReviewState("reviewing");
    setTimeout(() => setReviewState("success"), 1800);
    setTimeout(() => {
      setReviewState("idle");
      setFromAmount("");
      setToAmount("");
    }, 3500);
  }, []);

  const hasValidAmount = fromAmount !== "" && parseFloat(fromAmount.replace(/,/g, "")) > 0;
  const balance = parseFloat(fromCoin.balance.replace(/,/g, ""));
  const enteredAmount = parseFloat(fromAmount.replace(/,/g, "")) || 0;
  const isOverBalance = enteredAmount > balance;

  return (
    <div
      className="flex flex-col"
      style={{
        maxWidth: compact ? 380 : 440,
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "var(--space-5)" }}
      >
        <span
          style={{
            fontSize: "var(--text-h5)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-supreme)",
            lineHeight: "var(--lh-h5)",
          }}
        >
          Quick Trade
        </span>
        <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
          <TrendingUp size={14} style={{ color: "var(--chart-positive)" }} />
          <span
            style={{
              fontSize: "var(--text-meta)",
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-family-mono)",
              lineHeight: "var(--lh-meta)",
            }}
          >
            1 {fromCoin.symbol.toUpperCase()} = {rateDisplay} {toCoin.symbol.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Convert From */}
      <CoinAmountField
        label="Convert From"
        asset={fromCoin}
        onAssetClick={() => openSelector("from")}
        amount={fromAmount}
        onAmountChange={updateToAmount}
        balance={fromCoin.balance}
        showBalanceInfo
        error={isOverBalance ? `Insufficient ${fromCoin.symbol.toUpperCase()} balance` : undefined}
        footer={
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <ButtonGroup size="xs">
              <ButtonGroupItem onClick={() => handlePercentage(25)}>25%</ButtonGroupItem>
              <ButtonGroupItem onClick={() => handlePercentage(50)}>50%</ButtonGroupItem>
              <ButtonGroupItem onClick={() => handlePercentage(75)}>75%</ButtonGroupItem>
              <ButtonGroupItem onClick={() => handlePercentage(100)}>Max</ButtonGroupItem>
            </ButtonGroup>
          </div>
        }
      />

      {/* Swap button */}
      <SwapButton
        onClick={handleSwap}
        isSwapping={isSwapping}
      />

      {/* Convert To */}
      <CoinAmountField
        label="Convert To"
        asset={toCoin}
        onAssetClick={() => openSelector("to")}
        amount={toAmount}
        balance={toCoin.balance}
        readOnly
      />

      {/* Rate info bar */}
      <div
        className="flex items-center justify-between"
        style={{
          marginTop: "var(--space-5)",
          padding: "var(--space-4) var(--space-5)",
          backgroundColor: "var(--secondary-subtle)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-meta)",
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-family-supreme)",
          }}
        >
          Exchange Rate
        </span>
        <span
          style={{
            fontSize: "var(--text-meta)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-family-mono)",
          }}
        >
          1 {fromCoin.symbol.toUpperCase()} = {rateDisplay} {toCoin.symbol.toUpperCase()}
        </span>
      </div>

      {/* Review CTA */}
      <div style={{ marginTop: "var(--space-6)" }}>
        <Button
          variant="primary"
          size="xl"
          disabled={!hasValidAmount || isOverBalance || reviewState !== "idle"}
          loading={reviewState === "reviewing"}
          onClick={handleReview}
          className="w-full"
          style={{ borderRadius: "var(--radius-card)" }}
        >
          {reviewState === "success"
            ? "Trade Confirmed!"
            : reviewState === "reviewing"
              ? "Processing..."
              : "Review Your Quick Trade"}
        </Button>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          marginTop: "var(--space-4)",
          fontSize: "var(--text-caption)",
          color: "var(--color-text-tertiary)",
          fontFamily: "var(--font-family-supreme)",
          lineHeight: "var(--lh-caption)",
          textAlign: "center",
        }}
      >
        Rates are estimated. Final rate will be confirmed before execution.
      </p>

      {/* Coin Selector Sheet */}
      <CoinSelectorSheet
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={handleCoinSelect}
        exclude={selectorTarget === "from" ? toCoin.symbol : fromCoin.symbol}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SIDEBAR QUICK COINS
   ═══════════════════════════════════════════════════ */

function QuickCoinsSidebar({
  onSelect,
  activePair,
}: {
  onSelect: (from: typeof COINS[0], to: typeof COINS[0]) => void;
  activePair: string;
}) {
  const pairs = [
    { from: COINS[0], to: COINS[1], label: "USDT → BTC" },
    { from: COINS[0], to: COINS[2], label: "USDT → ETH" },
    { from: COINS[0], to: COINS[3], label: "USDT → SOL" },
    { from: COINS[1], to: COINS[2], label: "BTC → ETH" },
    { from: COINS[1], to: COINS[0], label: "BTC → USDT" },
    { from: COINS[2], to: COINS[0], label: "ETH → USDT" },
  ];

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-3)" }}>
      <span
        style={{
          fontSize: "var(--text-caption)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text-tertiary)",
          fontFamily: "var(--font-family-supreme)",
          textTransform: "uppercase",
          letterSpacing: "var(--ls-overline)",
          marginBottom: "var(--space-2)",
        }}
      >
        Popular Pairs
      </span>
      {pairs.map((p) => {
        const key = `${p.from.symbol}-${p.to.symbol}`;
        const isActive = key === activePair;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(p.from, p.to)}
            className="flex items-center rounded-[var(--radius-card)] cursor-pointer transition-all"
            style={{
              padding: "var(--space-3) var(--space-4)",
              gap: "var(--space-3)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: isActive ? "var(--brand-default)" : "var(--border-subtle)",
              backgroundColor: isActive ? "var(--brand-subtle)" : "var(--card)",
              transitionDuration: "var(--duration-short-3)",
              transitionTimingFunction: "var(--ease-standard)",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.borderColor = "var(--border)";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.borderColor = "var(--border-subtle)";
            }}
          >
            <div className="flex items-center" style={{ marginRight: "auto" }}>
              <CryptoIcon symbol={p.from.symbol} size={20} />
              <CryptoIcon
                symbol={p.to.symbol}
                size={20}
                style={{ marginLeft: -6 }}
              />
            </div>
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                fontWeight: isActive ? "var(--font-weight-semibold)" : "var(--font-weight-medium)",
                color: isActive ? "var(--brand-default)" : "var(--color-text-primary)",
                fontFamily: "var(--font-family-supreme)",
                lineHeight: "var(--lh-body-sm)",
              }}
            >
              {p.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FULL MODULE WITH SIDEBAR
   ═══════════════════════════════════════════════════ */

function QuickTradeWithSidebar() {
  const [fromCoin, setFromCoin] = useState(COINS[0]);
  const [toCoin, setToCoin] = useState(COINS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorTarget, setSelectorTarget] = useState<"from" | "to">("from");
  const [isSwapping, setIsSwapping] = useState(false);

  const rate = fromCoin.price / toCoin.price;
  const rateDisplay = rate < 0.001
    ? rate.toFixed(8)
    : rate < 1
      ? rate.toFixed(6)
      : rate.toFixed(4);

  const updateToAmount = useCallback(
    (val: string) => {
      setFromAmount(val);
      const num = parseFloat(val.replace(/,/g, ""));
      if (!isNaN(num) && num > 0) {
        const converted = num * rate;
        setToAmount(
          converted < 0.001
            ? converted.toFixed(8)
            : converted < 1
              ? converted.toFixed(6)
              : converted.toFixed(4),
        );
      } else {
        setToAmount("");
      }
    },
    [rate],
  );

  const handlePercentage = useCallback(
    (pct: number) => {
      const balance = parseFloat(fromCoin.balance.replace(/,/g, ""));
      const val = (balance * pct) / 100;
      updateToAmount(
        val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
      );
    },
    [fromCoin.balance, updateToAmount],
  );

  const handleSwap = useCallback(() => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = fromCoin;
      setFromCoin(toCoin);
      setToCoin(temp);
      setFromAmount("");
      setToAmount("");
      setIsSwapping(false);
    }, 200);
  }, [fromCoin, toCoin]);

  const handlePairSelect = useCallback((from: typeof COINS[0], to: typeof COINS[0]) => {
    setFromCoin(from);
    setToCoin(to);
    setFromAmount("");
    setToAmount("");
  }, []);

  const handleCoinSelect = useCallback(
    (coin: typeof COINS[0]) => {
      if (selectorTarget === "from") {
        if (coin.symbol === toCoin.symbol) setToCoin(fromCoin);
        setFromCoin(coin);
      } else {
        if (coin.symbol === fromCoin.symbol) setFromCoin(toCoin);
        setToCoin(coin);
      }
      setFromAmount("");
      setToAmount("");
    },
    [selectorTarget, fromCoin, toCoin],
  );

  const hasValidAmount = fromAmount !== "" && parseFloat(fromAmount.replace(/,/g, "")) > 0;
  const balance = parseFloat(fromCoin.balance.replace(/,/g, ""));
  const enteredAmount = parseFloat(fromAmount.replace(/,/g, "")) || 0;
  const isOverBalance = enteredAmount > balance;

  return (
    <div className="flex" style={{ gap: "var(--space-8)", width: "100%" }}>
      {/* Main trade card */}
      <div
        className="flex-1 rounded-[var(--radius-card)]"
        style={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--card)",
          padding: "var(--space-7)",
          maxWidth: 480,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "var(--space-6)" }}
        >
          <span
            style={{
              fontSize: "var(--text-h5)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-supreme)",
              lineHeight: "var(--lh-h5)",
            }}
          >
            Quick Trade
          </span>
          <div className="flex items-center" style={{ gap: "var(--space-2)" }}>
            <TrendingUp size={14} style={{ color: "var(--chart-positive)" }} />
            <span
              style={{
                fontSize: "var(--text-meta)",
                color: "var(--color-text-tertiary)",
                fontFamily: "var(--font-family-mono)",
              }}
            >
              1 {fromCoin.symbol.toUpperCase()} = {rateDisplay} {toCoin.symbol.toUpperCase()}
            </span>
          </div>
        </div>

        {/* From */}
        <CoinAmountField
          label="Convert From"
          asset={fromCoin}
          onAssetClick={() => { setSelectorTarget("from"); setSelectorOpen(true); }}
          amount={fromAmount}
          onAmountChange={updateToAmount}
          balance={fromCoin.balance}
          showBalanceInfo
          error={isOverBalance ? `Insufficient ${fromCoin.symbol.toUpperCase()} balance` : undefined}
          footer={
            <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
              <ButtonGroup size="xs">
                <ButtonGroupItem onClick={() => handlePercentage(25)}>25%</ButtonGroupItem>
                <ButtonGroupItem onClick={() => handlePercentage(50)}>50%</ButtonGroupItem>
                <ButtonGroupItem onClick={() => handlePercentage(75)}>75%</ButtonGroupItem>
                <ButtonGroupItem onClick={() => handlePercentage(100)}>Max</ButtonGroupItem>
              </ButtonGroup>
            </div>
          }
        />

        {/* Swap */}
        <SwapButton
          onClick={handleSwap}
          isSwapping={isSwapping}
        />

        {/* To */}
        <CoinAmountField
          label="Convert To"
          asset={toCoin}
          onAssetClick={() => { setSelectorTarget("to"); setSelectorOpen(true); }}
          amount={toAmount}
          balance={toCoin.balance}
          readOnly
        />

        {/* Rate bar */}
        <div
          className="flex items-center justify-between"
          style={{
            marginTop: "var(--space-5)",
            padding: "var(--space-4) var(--space-5)",
            backgroundColor: "var(--secondary-subtle)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <span style={{ fontSize: "var(--text-meta)", color: "var(--color-text-tertiary)", fontFamily: "var(--font-family-supreme)" }}>
            Exchange Rate
          </span>
          <span style={{ fontSize: "var(--text-meta)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", fontFamily: "var(--font-family-mono)" }}>
            1 {fromCoin.symbol.toUpperCase()} = {rateDisplay} {toCoin.symbol.toUpperCase()}
          </span>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "var(--space-6)" }}>
          <Button
            variant="primary"
            size="xl"
            disabled={!hasValidAmount || isOverBalance}
            className="w-full"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            Review Your Quick Trade
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="shrink-0 hidden md:block" style={{ width: 200 }}>
        <QuickCoinsSidebar
          onSelect={handlePairSelect}
          activePair={`${fromCoin.symbol}-${toCoin.symbol}`}
        />
      </div>

      {/* Coin Selector Sheet */}
      <CoinSelectorSheet
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={handleCoinSelect}
        exclude={selectorTarget === "from" ? toCoin.symbol : fromCoin.symbol}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PATTERN PAGE
   ═══════════════════════════════════════════════════ */

export function QuickTradePage() {
  return (
    <ComponentPage
      name="Quick Trade"
      description="A complete conversion flow composing CoinAmountField, ButtonGroup, Button, and a coin-selector Sheet into a full Quick Trade module. Click the coin pill on any field to open the asset picker."
      breadcrumbPrefix="Patterns"
    >
      <Section
        title="Complete Module"
        description="The full Quick Trade experience: two CoinAmountFields, a swap button, percentage shortcuts, exchange rate display, and a review CTA. Click any coin selector to open the asset picker sheet."
      >
        <ExampleGrid label="Interactive demo">
          <div className="flex items-start justify-center w-full" style={{ padding: "var(--space-5) 0" }}>
            <QuickTradeModule />
          </div>
        </ExampleGrid>
      </Section>

      <Section
        title="With Sidebar"
        description="Full layout with a popular-pairs sidebar. Clicking a pair instantly updates both fields. The sidebar highlights the active trading pair."
      >
        <ExampleGrid label="Full layout">
          <div className="w-full" style={{ padding: "var(--space-5) 0" }}>
            <QuickTradeWithSidebar />
          </div>
        </ExampleGrid>
      </Section>

      <Section
        title="Anatomy"
        description="The Quick Trade module is composed entirely from existing design system components. No custom one-off elements needed."
      >
        <ExampleGrid label="Component breakdown">
          <div
            className="flex flex-col w-full"
            style={{ gap: "var(--space-5)", maxWidth: 560 }}
          >
            {[
              { component: "CoinAmountField", role: "Input container — coin selector + numeric input + balance", path: "/components/coin-amount-field" },
              { component: "ButtonGroup", role: "Percentage quick-select buttons in the footer slot", path: "/components/button-group" },
              { component: "Button", role: "Primary CTA — 'Review Your Quick Trade'", path: "/components/button" },
              { component: "Sheet", role: "Coin selector overlay with search, tabs, and coin list", path: "/components/sheet" },
              { component: "CryptoIcon", role: "CDN-sourced coin icon rendering with fallback", path: "/components/coin-card" },
            ].map((item) => (
              <div
                key={item.component}
                className="flex items-start rounded-[var(--radius-card)] border"
                style={{
                  padding: "var(--space-5)",
                  gap: "var(--space-5)",
                  borderColor: "var(--border-subtle)",
                  backgroundColor: "var(--card)",
                }}
              >
                <span
                  className="shrink-0 rounded-[var(--radius-xs)] border"
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    fontSize: "var(--text-meta)",
                    fontWeight: "var(--font-weight-semibold)",
                    fontFamily: "var(--font-family-mono)",
                    color: "var(--brand-default)",
                    borderColor: "var(--brand-subtle)",
                    backgroundColor: "var(--brand-subtle)",
                    lineHeight: "var(--lh-meta)",
                  }}
                >
                  {item.component}
                </span>
                <span
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-family-supreme)",
                    lineHeight: "var(--lh-body-sm)",
                  }}
                >
                  {item.role}
                </span>
              </div>
            ))}
          </div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}