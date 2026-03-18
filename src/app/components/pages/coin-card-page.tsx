import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { cn } from "../ui/utils";
import { TrendingUp, TrendingDown, X } from "lucide-react";

function Sparkline({ data, positive }: { data: number[]; positive?: boolean }) {
  const W = 180; const H = 50; const PAD = 4;
  if (!data || data.length < 2) return null;
  const minV = Math.min(...data); const maxV = Math.max(...data); const rangeV = maxV - minV || 1;
  const toX = (i: number) => (i / (data.length - 1)) * W;
  const toY = (v: number) => H - PAD - ((v - minV) / rangeV) * (H - PAD * 2);
  const points = data.map((d, i) => `${toX(i)},${toY(d)}`).join(" ");
  const color = positive ? "#16A249" : "#DC2828";
  return <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} preserveAspectRatio="none" aria-hidden><polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" /></svg>;
}

function CoinCard({ symbol, name, price, change, positive, sparklineData, onRemove, skeleton }: {
  symbol: string; name: string; price: string; change: string; positive?: boolean; sparklineData: number[]; onRemove?: () => void; skeleton?: boolean
}) {
  if (skeleton) return (
    <div className="relative w-[212px] h-[224px] rounded-[8px] overflow-hidden border border-[var(--border-subtle)] pl-[16px] pr-[8px] py-[16px] flex flex-col justify-between" style={{ backgroundColor: "var(--card)" }}>
      <div className="flex items-start gap-[8px]"><div className="size-[32px] rounded-full hx-shimmer shrink-0" /><div className="flex flex-col gap-[6px] pt-[2px]"><div className="h-[14px] w-[72px] rounded hx-shimmer" /><div className="h-[10px] w-[40px] rounded hx-shimmer" /></div></div>
      <div className="flex flex-col gap-[4px]"><div className="h-[14px] w-[48px] rounded hx-shimmer" /><div className="h-[28px] w-[120px] rounded hx-shimmer" /></div>
    </div>
  );
  return (
    <div className="group/card relative w-[212px] h-[224px] rounded-[8px] overflow-hidden border border-[#e1e1e1] bg-white pl-[16px] pr-[8px] py-[16px] flex flex-col justify-between cursor-pointer isolate">
      <div className={cn("absolute inset-[-1px] z-[4] backdrop-blur-[8px] bg-[rgba(255,255,255,0.30)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-[var(--duration-short-4)]")} />
      {onRemove && <div className="absolute inset-0 z-[6] flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-[var(--duration-short-4)] pointer-events-none group-hover/card:pointer-events-auto"><span className="text-[16px] font-bold text-[#1a1a1a]">Remove From Watchlist</span></div>}
      <div className="relative z-[3] flex items-start justify-between">
        <div className="flex items-start gap-[8px]">
          <div className="size-[32px] rounded-full bg-[#f4f4f4] flex items-center justify-center shrink-0"><span className="text-[10px] font-bold text-[#525252]">{symbol.slice(0, 2)}</span></div>
          <div className="flex flex-col"><span className="text-[16px] font-medium leading-[24px]" style={{ color: "var(--color-text-primary)" }}>{name}</span><span className="text-[12px] leading-[16px]" style={{ color: "var(--color-text-tertiary)" }}>{symbol}</span></div>
        </div>
        {onRemove && <button type="button" onClick={e => { e.stopPropagation(); onRemove() }} className="relative z-[6] flex items-center justify-center shrink-0 size-[22px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-[var(--duration-short-4)] cursor-pointer" style={{ color: "var(--color-text-primary)" }}><X size={16} /></button>}
      </div>
      <div className="absolute left-0 top-[80px] z-[1] w-full h-[50px] pointer-events-none flex items-center justify-center"><Sparkline data={sparklineData} positive={positive} /></div>
      <div className="relative z-[2] flex flex-col gap-0">
        <div className="flex items-center gap-[4px]">{positive ? <TrendingUp size={16} className="text-[#16A249]" /> : <TrendingDown size={16} className="text-[#DC2828]" />}<span className={cn("text-[14px] leading-[22px] font-medium", positive ? "text-[#16A249]" : "text-[#DC2828]")}>{change}%</span></div>
        <span className="text-[24px] font-bold leading-[38px]" style={{ color: "var(--color-text-primary)" }}>{price}</span>
      </div>
    </div>
  );
}

const sparkUp = [20, 22, 18, 25, 30, 28, 35, 32, 40, 38, 42, 45];
const sparkDown = [45, 42, 38, 40, 35, 32, 30, 28, 25, 22, 20, 18];

export function CoinCardPage() {
  return (
    <ComponentPage name="Coin Card" description="Crypto coin display card with price, trend direction, sparkline chart, and hover-to-remove action. Designed for watchlist displays.">
      <Section title="Positive Trend" description="Green sparkline and upward trend indicator.">
        <ExampleRow label="Positive">
          <CoinCard symbol="BTC" name="Bitcoin" price="$67,432.10" change="+2.45" positive sparklineData={sparkUp} />
          <CoinCard symbol="ETH" name="Ethereum" price="$3,521.80" change="+1.12" positive sparklineData={sparkUp} />
        </ExampleRow>
      </Section>
      <Section title="Negative Trend" description="Red sparkline and downward trend indicator.">
        <ExampleRow label="Negative">
          <CoinCard symbol="XRP" name="Ripple" price="$0.5432" change="-3.21" positive={false} sparklineData={sparkDown} />
          <CoinCard symbol="SOL" name="Solana" price="$142.65" change="-0.85" positive={false} sparklineData={sparkDown} />
        </ExampleRow>
      </Section>
      <Section title="With Remove Action" description="Hover to see the frosted glass remove overlay.">
        <ExampleRow label="Removable"><CoinCard symbol="BTC" name="Bitcoin" price="$67,432.10" change="+2.45" positive sparklineData={sparkUp} onRemove={() => {}} /></ExampleRow>
      </Section>
      <Section title="Skeleton" description="Loading placeholder.">
        <ExampleRow label="Loading"><CoinCard skeleton symbol="" name="" price="" change="" sparklineData={[]} /></ExampleRow>
      </Section>
    </ComponentPage>
  );
}