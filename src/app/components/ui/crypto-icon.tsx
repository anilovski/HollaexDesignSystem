import { useState, useEffect } from "react";

const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/nicehash/cryptocurrency-icons@master/SVG";

export type CryptoIconVariant = "color" | "black" | "white" | "icon";

export interface CryptoIconProps {
  symbol: string;
  size?: number;
  variant?: CryptoIconVariant;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders a crypto-currency SVG icon from the nicehash/cryptocurrency-icons
 * open-source repo, served via jsDelivr CDN.
 *
 * symbol  – the coin ticker, e.g. "btc", "eth", "xrp"
 * variant – "color" (default), "black", "white", or "icon" (simpler glyph)
 */
export function CryptoIcon({
  symbol,
  size = 32,
  variant = "color",
  className,
  style,
}: CryptoIconProps) {
  const [err, setErr] = useState(false);
  const lower = symbol.toLowerCase();

  // Reset error state when symbol or variant changes
  useEffect(() => {
    setErr(false);
  }, [symbol, variant]);

  const src = `${CDN_BASE}/${lower}.svg`;

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
          borderRadius: "var(--radius-circle)",
          backgroundColor: "var(--secondary)",
          color: "var(--muted-foreground)",
          fontFamily: "var(--font-family-supreme)",
          fontWeight: "var(--font-weight-bold)" as any,
          fontSize: Math.max(8, size * 0.32),
          lineHeight: 1,
          userSelect: "none",
          flexShrink: 0,
          ...style,
        }}
      >
        {symbol.toUpperCase().slice(0, 3)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${symbol.toUpperCase()} icon`}
      width={size}
      height={size}
      className={className}
      style={{ flexShrink: 0, ...style }}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}

/** Comprehensive list of popular crypto coins */
export const CRYPTO_COINS: { symbol: string; name: string }[] = [
  { symbol: "btc", name: "Bitcoin" },
  { symbol: "eth", name: "Ethereum" },
  { symbol: "usdt", name: "Tether" },
  { symbol: "bnb", name: "BNB" },
  { symbol: "sol", name: "Solana" },
  { symbol: "usdc", name: "USD Coin" },
  { symbol: "xrp", name: "XRP" },
  { symbol: "doge", name: "Dogecoin" },
  { symbol: "ada", name: "Cardano" },
  { symbol: "trx", name: "TRON" },
  { symbol: "avax", name: "Avalanche" },
  { symbol: "shib", name: "Shiba Inu" },
  { symbol: "dot", name: "Polkadot" },
  { symbol: "link", name: "Chainlink" },
  { symbol: "bch", name: "Bitcoin Cash" },
  { symbol: "dai", name: "Dai" },
  { symbol: "ltc", name: "Litecoin" },
  { symbol: "near", name: "NEAR Protocol" },
  { symbol: "matic", name: "Polygon" },
  { symbol: "uni", name: "Uniswap" },
  { symbol: "leo", name: "UNUS SED LEO" },
  { symbol: "atom", name: "Cosmos" },
  { symbol: "etc", name: "Ethereum Classic" },
  { symbol: "xlm", name: "Stellar" },
  { symbol: "okb", name: "OKB" },
  { symbol: "xmr", name: "Monero" },
  { symbol: "fil", name: "Filecoin" },
  { symbol: "hbar", name: "Hedera" },
  { symbol: "apt", name: "Aptos" },
  { symbol: "arb", name: "Arbitrum" },
  { symbol: "mkr", name: "Maker" },
  { symbol: "op", name: "Optimism" },
  { symbol: "vet", name: "VeChain" },
  { symbol: "algo", name: "Algorand" },
  { symbol: "grt", name: "The Graph" },
  { symbol: "ftm", name: "Fantom" },
  { symbol: "sand", name: "The Sandbox" },
  { symbol: "mana", name: "Decentraland" },
  { symbol: "aave", name: "Aave" },
  { symbol: "axs", name: "Axie Infinity" },
  { symbol: "theta", name: "Theta Network" },
  { symbol: "egld", name: "MultiversX" },
  { symbol: "eos", name: "EOS" },
  { symbol: "xtz", name: "Tezos" },
  { symbol: "iota", name: "IOTA" },
  { symbol: "flow", name: "Flow" },
  { symbol: "snx", name: "Synthetix" },
  { symbol: "neo", name: "NEO" },
  { symbol: "zec", name: "Zcash" },
  { symbol: "dash", name: "Dash" },
  { symbol: "enj", name: "Enjin Coin" },
  { symbol: "bat", name: "Basic Attention Token" },
  { symbol: "comp", name: "Compound" },
  { symbol: "crv", name: "Curve DAO" },
  { symbol: "lrc", name: "Loopring" },
  { symbol: "1inch", name: "1inch" },
  { symbol: "sushi", name: "SushiSwap" },
  { symbol: "zil", name: "Zilliqa" },
  { symbol: "ont", name: "Ontology" },
  { symbol: "waves", name: "Waves" },
  { symbol: "ankr", name: "Ankr" },
  { symbol: "icx", name: "ICON" },
  { symbol: "qtum", name: "Qtum" },
  { symbol: "ren", name: "Ren" },
  { symbol: "bal", name: "Balancer" },
  { symbol: "knc", name: "Kyber Network" },
  { symbol: "omg", name: "OMG Network" },
  { symbol: "zrx", name: "0x" },
  { symbol: "yfi", name: "yearn.finance" },
  { symbol: "celo", name: "Celo" },
  { symbol: "storj", name: "Storj" },
  { symbol: "skl", name: "SKALE" },
  { symbol: "ckb", name: "Nervos Network" },
  { symbol: "sc", name: "Siacoin" },
  { symbol: "dgb", name: "DigiByte" },
  { symbol: "rvn", name: "Ravencoin" },
  { symbol: "xem", name: "NEM" },
  { symbol: "kava", name: "Kava" },
  { symbol: "lsk", name: "Lisk" },
  { symbol: "rune", name: "THORChain" },
  { symbol: "dydx", name: "dYdX" },
  { symbol: "stx", name: "Stacks" },
  { symbol: "kcs", name: "KuCoin Token" },
  { symbol: "gt", name: "Gate Token" },
  { symbol: "ht", name: "Huobi Token" },
  { symbol: "tusd", name: "TrueUSD" },
  { symbol: "pax", name: "Pax Dollar" },
  { symbol: "busd", name: "Binance USD" },
];
