import svgPaths from "./svg-jpsgnunknr";

function Search() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="search">
          <path clipRule="evenodd" d={svgPaths.p1fe58400} fill="var(--fill-0, #525252)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Left Icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="Left Icon">
        <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
          <Search />
        </div>
      </div>
    </div>
  );
}

function TextOverflow() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="Text Overflow">
      <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#929292] text-[18px] whitespace-nowrap">{`Search for coins, functions & more`}</p>
    </div>
  );
}

function TrailingItems() {
  return <div className="content-stretch flex gap-[8px] h-[24px] items-center shrink-0 w-[43px]" data-name="Trailing Items" />;
}

function InputArea() {
  return (
    <div className="bg-[#f8f8f8] relative shrink-0 w-full" data-name="Input Area">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[12px] pr-[16px] py-[22px] relative w-full">
          <LeftIcon />
          <TextOverflow />
          <TrailingItems />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#dedede] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Contents() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Contents">
      <InputArea />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0" data-name="Text">
      <div className="flex flex-col font-['Supreme:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">Search</p>
      </div>
    </div>
  );
}

function ButtonContent() {
  return (
    <div className="content-stretch flex items-center justify-center px-[32px] py-[20px] relative shrink-0" data-name="Button Content">
      <Text />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[24px] items-center left-1/2 top-[32px] w-[1160px]" data-name="Search Bar">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="Search">
        <Contents />
      </div>
      <div className="bg-[#2463eb] content-stretch cursor-pointer flex h-[72px] items-center justify-center relative rounded-[8px] shrink-0" data-name="Button">
        <ButtonContent />
      </div>
    </div>
  );
}

function Xht() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="xht">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="surface1">
          <path d={svgPaths.p2a0de300} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p1a44c400} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p14eb5500} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2459c100} fill="var(--fill-0, #6ECDDD)" id="Vector_4" />
          <path d={svgPaths.p27dc6600} fill="var(--fill-0, #6ECDDD)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function CoinTextIcon() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Coin + Text + Icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[22px]" data-name="Coin">
        <Xht />
      </div>
      <p className="font-['Supreme:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">XHT</p>
    </div>
  );
}

function Contents1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Contents">
      <CoinTextIcon />
    </div>
  );
}

function Usdt() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="usdt">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="surface1">
          <path d={svgPaths.p2a0de300} fill="var(--fill-0, #53AE94)" id="Vector" />
          <path d={svgPaths.p7aee900} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function CoinTextIcon1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Coin + Text + Icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[22px]" data-name="Coin">
        <Usdt />
      </div>
      <p className="font-['Supreme:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">USDT</p>
    </div>
  );
}

function Contents2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Contents">
      <CoinTextIcon1 />
    </div>
  );
}

function CreditCard() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="credit-card">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="credit-card">
          <g id="Vector">
            <path d={svgPaths.p10a36060} fill="var(--fill-0, #7A7A7A)" />
            <path d={svgPaths.p2c6ddd00} fill="var(--fill-0, #7A7A7A)" />
            <path clipRule="evenodd" d={svgPaths.p34f55400} fill="var(--fill-0, #7A7A7A)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function CoinTextIcon2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Coin + Text + Icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="Left Icon">
        <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
          <CreditCard />
        </div>
      </div>
      <p className="font-['Supreme:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">Buy Crypto</p>
    </div>
  );
}

function Contents3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Contents">
      <CoinTextIcon2 />
    </div>
  );
}

function World() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="world">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="world">
          <path clipRule="evenodd" d={svgPaths.pa2cf900} fill="var(--fill-0, #7A7A7A)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CoinTextIcon3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Coin + Text + Icon">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="Left Icon">
        <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
          <World />
        </div>
      </div>
      <p className="font-['Supreme:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">Language</p>
    </div>
  );
}

function Contents4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Contents">
      <CoinTextIcon3 />
    </div>
  );
}

function Surface() {
  return (
    <div className="absolute inset-[-0.02%_-0.02%_-0.02%_-0.05%]" data-name="surface1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0162 22.0101">
        <g id="surface1">
          <path d={svgPaths.p363428c0} fill="var(--fill-0, #FF9D00)" id="Vector" />
          <path d={svgPaths.pc7f84f0} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Btc() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="btc">
      <Surface />
    </div>
  );
}

function CoinTextIcon4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Coin + Text + Icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[22px]" data-name="Coin">
        <Btc />
      </div>
      <p className="font-['Supreme:Medium',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] whitespace-nowrap">BTC</p>
    </div>
  );
}

function Contents5() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Contents">
      <CoinTextIcon4 />
    </div>
  );
}

function Chips() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Chips">
      <div className="bg-[#e1e1e1] content-stretch flex gap-[8px] items-center max-h-[40px] min-h-[40px] pl-[12px] pr-[8px] py-[8px] relative rounded-[1000px] shrink-0" data-name="Chips">
        <div aria-hidden="true" className="absolute border border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[1000px]" />
        <Contents1 />
      </div>
      <div className="bg-[#e1e1e1] content-stretch flex gap-[8px] items-center max-h-[40px] min-h-[40px] pl-[12px] pr-[8px] py-[8px] relative rounded-[1000px] shrink-0" data-name="Chips">
        <div aria-hidden="true" className="absolute border border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[1000px]" />
        <Contents2 />
      </div>
      <div className="bg-[#e1e1e1] content-stretch flex gap-[8px] items-center max-h-[40px] min-h-[40px] pl-[12px] pr-[8px] py-[8px] relative rounded-[1000px] shrink-0" data-name="Chips">
        <div aria-hidden="true" className="absolute border border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[1000px]" />
        <Contents3 />
      </div>
      <div className="bg-[#e1e1e1] content-stretch flex gap-[8px] items-center max-h-[40px] min-h-[40px] pl-[12px] pr-[8px] py-[8px] relative rounded-[1000px] shrink-0" data-name="Chips">
        <div aria-hidden="true" className="absolute border border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[1000px]" />
        <Contents4 />
      </div>
      <div className="bg-[#e1e1e1] content-stretch flex gap-[8px] items-center max-h-[40px] min-h-[40px] pl-[12px] pr-[8px] py-[8px] relative rounded-[1000px] shrink-0" data-name="Chips">
        <div aria-hidden="true" className="absolute border border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[1000px]" />
        <Contents5 />
      </div>
    </div>
  );
}

function RecentSearches() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[32px] top-[136px]" data-name="Recent Searches">
      <p className="font-['Supreme:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Recent Searches:</p>
      <Chips />
    </div>
  );
}

function Click() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="click">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p3010a500} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2d707100} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pec69c00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p17a08700} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3dc12300} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p8f10f80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Actions() {
  return (
    <div className="bg-[rgba(16,18,20,0.5)] relative rounded-[8px] shrink-0 w-full" data-name="Actions">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <Click />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">All</p>
        </div>
      </div>
    </div>
  );
}

function Coins() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="coins">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="coins">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p1aac7e80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p1a028380} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function TrendingCoins() {
  return (
    <div className="relative shrink-0 w-full" data-name="Trending Coins">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <Coins />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Assets & Tokens`}</p>
        </div>
      </div>
    </div>
  );
}

function ChartArrowsVertical() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="chart-arrows-vertical">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-arrows-vertical">
          <path d={svgPaths.p2b73e280} fill="var(--fill-0, #C4C4C4)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Wallet() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wallet">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <ChartArrowsVertical />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Trading Tools</p>
        </div>
      </div>
    </div>
  );
}

function Shield() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="shield">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="shield">
          <path d={svgPaths.p11794640} fill="var(--fill-0, #C4C4C4)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function History() {
  return (
    <div className="relative shrink-0 w-full" data-name="History">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <Shield />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Account & Security`}</p>
        </div>
      </div>
    </div>
  );
}

function Wallet1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="wallet">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="wallet">
          <path clipRule="evenodd" d={svgPaths.p18194c80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Security() {
  return (
    <div className="relative shrink-0 w-full" data-name="Security">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <Wallet1 />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Wallet</p>
        </div>
      </div>
    </div>
  );
}

function Adjustments() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="adjustments">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="adjustments">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p2718a00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2c40fe80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p254a0300} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Settings() {
  return (
    <div className="relative shrink-0 w-full" data-name="Settings">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <Adjustments />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Settings & Interface`}</p>
        </div>
      </div>
    </div>
  );
}

function Help() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="help">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="help">
          <g id="Icon">
            <path d={svgPaths.p3b4bc5c0} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.pff12d00} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p316c8000} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Settings1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Settings">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <Help />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Support</p>
        </div>
      </div>
    </div>
  );
}

function Dots() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="dots">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="dots">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p2e229500} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p3a850d00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p115ed200} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Settings2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Settings">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
              <Dots />
            </div>
          </div>
          <p className="font-['Supreme:Regular',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">Other</p>
        </div>
      </div>
    </div>
  );
}

function SearchMenu() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[304px]" data-name="Search Menu">
      <Actions />
      <TrendingCoins />
      <Wallet />
      <History />
      <Security />
      <Settings />
      <Settings1 />
      <Settings2 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative rounded-[8px] shrink-0 w-full" data-name="Actions">
      <p className="font-['Supreme:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#dfe3e6] text-[16px] whitespace-nowrap">Popular Actions</p>
    </div>
  );
}

function Deposit1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="deposit">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="deposit">
          <g id="Vector">
            <path d={svgPaths.p18e1b240} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3a855000} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p1644c800} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p32421d00} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p19b6ba00} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Deposit</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Add crypto to your wallet from another address</p>
    </div>
  );
}

function Deposit() {
  return (
    <div className="bg-[rgba(16,18,20,0.5)] relative rounded-[8px] shrink-0 w-full" data-name="Deposit">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Deposit1 />
          </div>
        </div>
        <Text1 />
      </div>
    </div>
  );
}

function ArrowsUpDown() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="arrows-up-down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrows-up-down">
          <path clipRule="evenodd" d={svgPaths.pe756100} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Convert</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Swap one crypto for another instantly</p>
    </div>
  );
}

function Convert() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Convert">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <ArrowsUpDown />
          </div>
        </div>
        <Text2 />
      </div>
    </div>
  );
}

function Withdraw1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="withdraw">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="withdraw">
          <g id="Vector">
            <path d={svgPaths.p1a9cee80} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p1320600} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p3133c100} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p14366400} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3c28f000} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Withdraw</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Send crypto to an external wallet</p>
    </div>
  );
}

function Withdraw() {
  return (
    <div className="relative shrink-0 w-full" data-name="Withdraw">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Withdraw1 />
          </div>
        </div>
        <Text3 />
      </div>
    </div>
  );
}

function Transform() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="transform">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="transform">
          <g id="Vector">
            <path d={svgPaths.p179e8900} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p903d300} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p1d78a780} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.pe076000} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Trade</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Buy or sell digital assets on the exchange</p>
    </div>
  );
}

function Trade() {
  return (
    <div className="relative shrink-0 w-full" data-name="Trade">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Transform />
          </div>
        </div>
        <Text4 />
      </div>
    </div>
  );
}

function CreditCard1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="credit-card">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="credit-card">
          <g id="Vector">
            <path d={svgPaths.p10a36060} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2c6ddd00} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p34f55400} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Buy Crypto</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Purchase crypto using fiat payment methods</p>
    </div>
  );
}

function BuyCrypto() {
  return (
    <div className="relative shrink-0 w-full" data-name="Buy Crypto">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <CreditCard1 />
          </div>
        </div>
        <Text5 />
      </div>
    </div>
  );
}

function Coin() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="coin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="coin">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p31571000} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29efc500} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Check Prices</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Check out live crypto prices</p>
    </div>
  );
}

function CheckPrices() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Coin />
          </div>
        </div>
        <Text6 />
      </div>
    </div>
  );
}

function Surface1() {
  return (
    <div className="absolute inset-[-0.02%_-0.02%_-0.02%_-0.05%]" data-name="surface1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0162 22.0101">
        <g id="surface1">
          <path d={svgPaths.p363428c0} fill="var(--fill-0, #FF9D00)" id="Vector" />
          <path d={svgPaths.pc7f84f0} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Btc1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="btc">
      <Surface1 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">BTC</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Learn, trade, and track Bitcoin (BTC)</p>
    </div>
  );
}

function Deposit2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[76px] items-start px-[16px] py-[12px] relative shrink-0 w-[62px]" data-name="Deposit">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Coin">
        <Btc1 />
      </div>
      <Text7 />
    </div>
  );
}

function Xrp() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="xrp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="surface1">
          <path d={svgPaths.p25be1780} fill="var(--fill-0, #4C4C4C)" id="Vector" />
          <path d={svgPaths.p29ed4680} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p2c590860} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">XRP</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Learn, trade, and track Ripple (XRP)</p>
    </div>
  );
}

function Convert1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[76px] items-start px-[16px] py-[12px] relative rounded-[8px] shrink-0 w-[62px]" data-name="Convert">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Coin">
        <Xrp />
      </div>
      <Text8 />
    </div>
  );
}

function Usdt1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="usdt">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="surface1">
          <path d={svgPaths.p2a0de300} fill="var(--fill-0, #53AE94)" id="Vector" />
          <path d={svgPaths.p7aee900} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">USDT</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Learn, trade, and track HollaEx Token (XHT)</p>
    </div>
  );
}

function Deposit3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[76px] items-start px-[16px] py-[12px] relative shrink-0 w-[62px]" data-name="Deposit">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Coin">
        <Usdt1 />
      </div>
      <Text9 />
    </div>
  );
}

function Trx() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="trx">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="surface1">
          <path d={svgPaths.p25be1780} fill="var(--fill-0, #BE1E2D)" id="Vector" />
          <path d={svgPaths.p1f37eb00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">TRX</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Learn, trade, and track TRON (TRX)</p>
    </div>
  );
}

function Deposit4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[76px] items-start px-[16px] py-[12px] relative shrink-0 w-[62px]" data-name="Deposit">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Coin">
        <Trx />
      </div>
      <Text10 />
    </div>
  );
}

function Eth() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="eth">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="surface1">
          <path d={svgPaths.p25be1780} fill="var(--fill-0, #2E71CC)" id="Vector" />
          <path d={svgPaths.p3d866000} fill="var(--fill-0, #C1CCF5)" id="Vector_2" />
          <path d="M12 2L6 11.9L12 15.4V2Z" fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p19634800} fill="var(--fill-0, #C1CCF5)" id="Vector_4" />
          <path d="M12 21.4V16.6L6 13L12 21.4Z" fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p16702e00} fill="var(--fill-0, #8297EB)" id="Vector_6" />
          <path d="M6 11.9L12 15.4V9.2L6 11.9Z" fill="var(--fill-0, #C1CCF5)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">ETH</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Learn, trade, and track Ethereum (ETH)</p>
    </div>
  );
}

function Deposit5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[76px] items-start px-[16px] py-[12px] relative shrink-0 w-[62px]" data-name="Deposit">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Coin">
        <Eth />
      </div>
      <Text11 />
    </div>
  );
}

function Xht1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px overflow-clip relative" data-name="xht">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="surface1">
          <path d={svgPaths.p2a0de300} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p1a44c400} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p14eb5500} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2459c100} fill="var(--fill-0, #6ECDDD)" id="Vector_4" />
          <path d={svgPaths.p27dc6600} fill="var(--fill-0, #6ECDDD)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">XHT</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Learn, trade, and track HollaEx Token (XHT)</p>
    </div>
  );
}

function Deposit6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[76px] items-start px-[16px] py-[12px] relative shrink-0 w-[62px]" data-name="Deposit">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Coin">
        <Xht1 />
      </div>
      <Text12 />
    </div>
  );
}

function Actions2() {
  return <div className="h-[40px] rounded-[8px] shrink-0 w-full" data-name="Actions" />;
}

function Actions3() {
  return (
    <div className="content-stretch flex items-center py-[8px] relative rounded-[8px] shrink-0 w-full" data-name="Actions">
      <p className="font-['Supreme:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#dfe3e6] text-[16px] whitespace-nowrap">Other Functions</p>
    </div>
  );
}

function LayoutDashboard() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="layout-dashboard">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="layout-dashboard">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p23c1c900} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p2be2c400} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pda25bf2} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p415d900} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Summary</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Account level information and accessibility</p>
    </div>
  );
}

function CheckPrices1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <LayoutDashboard />
          </div>
        </div>
        <Text13 />
      </div>
    </div>
  );
}

function ApiApp() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="api-app">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="api-app">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.pc88d600} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p22fd7300} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p378b6d00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p15aacc00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">API</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Use API keys to programatically access your account</p>
    </div>
  );
}

function CheckPrices2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <ApiApp />
          </div>
        </div>
        <Text14 />
      </div>
    </div>
  );
}

function PlugConnected() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="plug-connected">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="plug-connected">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p3efbf380} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p273c0180} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Onramper</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Use a crypto Onramper</p>
    </div>
  );
}

function CheckPrices3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <PlugConnected />
          </div>
        </div>
        <Text15 />
      </div>
    </div>
  );
}

function CreditCard2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="credit-card">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="credit-card">
          <g id="Vector">
            <path d={svgPaths.p10a36060} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2c6ddd00} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p34f55400} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Debit Card</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Use a crypto debit card</p>
    </div>
  );
}

function CheckPrices4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <CreditCard2 />
          </div>
        </div>
        <Text16 />
      </div>
    </div>
  );
}

function BrandMinecraft() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="brand-minecraft">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="brand-minecraft">
          <path clipRule="evenodd" d={svgPaths.p2cc55c80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">DeFi Stake</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Connect wallet and stake your asset</p>
    </div>
  );
}

function CheckPrices5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <BrandMinecraft />
          </div>
        </div>
        <Text17 />
      </div>
    </div>
  );
}

function BoxModel() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="box-model">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="box-model">
          <path clipRule="evenodd" d={svgPaths.p2cf40f30} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">CeFi Stake</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Wallet profit and loss, Asset % breakdown</p>
    </div>
  );
}

function CheckPrices6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <BoxModel />
          </div>
        </div>
        <Text18 />
      </div>
    </div>
  );
}

function ChartPie() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="chart-pie-4">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-pie-4">
          <path clipRule="evenodd" d={svgPaths.p316bc40} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">{`P&L`}</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Wallet profit and loss, Asset % breakdown</p>
    </div>
  );
}

function CheckPrices7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <ChartPie />
          </div>
        </div>
        <Text19 />
      </div>
    </div>
  );
}

function Percentage() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="percentage">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="percentage">
          <g id="Vector">
            <path d={svgPaths.p39724e80} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p15d5d420} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.pf296f00} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Fees</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Fees for trading, deposits and withdrawals for each account tier</p>
    </div>
  );
}

function CheckPrices8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Percentage />
          </div>
        </div>
        <Text20 />
      </div>
    </div>
  );
}

function RulerMeasure() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="ruler-measure-2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ruler-measure-2">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.pbc59d00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p32557500} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Limits</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Withdrawal limits for account level tiers</p>
    </div>
  );
}

function CheckPrices9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <RulerMeasure />
          </div>
        </div>
        <Text21 />
      </div>
    </div>
  );
}

function Wallet2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="wallet">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="wallet">
          <path clipRule="evenodd" d={svgPaths.p18194c80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Wallet</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Your balances and asset performance</p>
    </div>
  );
}

function CheckPrices10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Wallet2 />
          </div>
        </div>
        <Text22 />
      </div>
    </div>
  );
}

function Language() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="language">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="language">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p3f051680} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p21c1b100} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text23() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Language</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Change language preference</p>
    </div>
  );
}

function CheckPrices11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Language />
          </div>
        </div>
        <Text23 />
      </div>
    </div>
  );
}

function Users() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="users">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="users">
          <g id="Vector">
            <path d={svgPaths.p31308b00} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p35c6c800} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p1b78e500} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p247a2400} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">P2P</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Direct user peer-to-peer trading</p>
    </div>
  );
}

function CheckPrices12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Users />
          </div>
        </div>
        <Text24 />
      </div>
    </div>
  );
}

function Clock() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="clock">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="clock">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p2070af00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p271f6080} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">History</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">{`Review all trades, orders, deposits & withdrawals`}</p>
    </div>
  );
}

function CheckPrices13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Clock />
          </div>
        </div>
        <Text25 />
      </div>
    </div>
  );
}

function ChartInfographic() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="chart-infographic">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-infographic">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p1ba2500} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p300a1300} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3caeae00} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p1f1bcb00} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3899fd00} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Volume</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Your trading volume account activity over time</p>
    </div>
  );
}

function CheckPrices14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <ChartInfographic />
          </div>
        </div>
        <Text26 />
      </div>
    </div>
  );
}

function Coin1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="coin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="coin">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p31571000} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29efc500} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text27() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Assets</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Price list for all assets</p>
    </div>
  );
}

function CheckPrices15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Coin1 />
          </div>
        </div>
        <Text27 />
      </div>
    </div>
  );
}

function LockPassword() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="lock-password">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="lock-password">
          <g id="Icon">
            <path d={svgPaths.p18ec3900} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3db49980} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3ad3d500} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p215a3000} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text28() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">2FA</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Two-factor authentication security (2FA OTP)</p>
    </div>
  );
}

function CheckPrices16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <LockPassword />
          </div>
        </div>
        <Text28 />
      </div>
    </div>
  );
}

function Password() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="password">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="password">
          <g id="Vector">
            <path d={svgPaths.p28d68700} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2392d000} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p23da1900} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text29() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Password</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Change password</p>
    </div>
  );
}

function CheckPrices17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Password />
          </div>
        </div>
        <Text29 />
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="login-2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="login-2">
          <g id="Icon">
            <path d={svgPaths.p24ed5780} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2eb06510} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text30() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Logins</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Historical record of all login on your account</p>
    </div>
  );
}

function CheckPrices18() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Login />
          </div>
        </div>
        <Text30 />
      </div>
    </div>
  );
}

function UserScreen() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="user-screen">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="user-screen">
          <g id="Vector">
            <path d={svgPaths.p79f1700} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3b623b00} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p1e569d80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text31() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Sessions</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Check currently active logged in sessions</p>
    </div>
  );
}

function CheckPrices19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <UserScreen />
          </div>
        </div>
        <Text31 />
      </div>
    </div>
  );
}

function BuildingBank() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="building-bank">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="building-bank">
          <g id="Icon">
            <path d={svgPaths.p3816b7f1} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p25700000} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2a08f100} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2db0cd00} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p2a0d0480} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text32() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Bank</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Your banking and payment information</p>
    </div>
  );
}

function CheckPrices20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <BuildingBank />
          </div>
        </div>
        <Text32 />
      </div>
    </div>
  );
}

function Volume() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="volume">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="volume">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.pd3ea5f0} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p36373400} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p10c09980} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text33() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Audio</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Audio sound effects and trading feedback</p>
    </div>
  );
}

function CheckPrices21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Volume />
          </div>
        </div>
        <Text33 />
      </div>
    </div>
  );
}

function AddressBook() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="address-book">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="address-book">
          <g id="Vector">
            <path d={svgPaths.p585fe00} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p1d500400} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p24a04000} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text34() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Addresses</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">{`Recurring automatic buy & sell transactions`}</p>
    </div>
  );
}

function CheckPrices22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <AddressBook />
          </div>
        </div>
        <Text34 />
      </div>
    </div>
  );
}

function Robot() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="robot">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="robot">
          <g id="Vector">
            <path d={svgPaths.p173b5880} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p17e75df0} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p104d7980} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text35() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Auto Trader</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">{`Recurring automatic buy & sell transactions`}</p>
    </div>
  );
}

function CheckPrices23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Robot />
          </div>
        </div>
        <Text35 />
      </div>
    </div>
  );
}

function ChartCovariate() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="chart-covariate">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-covariate">
          <g id="Icon">
            <path d={svgPaths.p2e350400} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2a0e8d00} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p35ffbc00} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p126ca200} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p2c95d80} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text36() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Margin Trading</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Borrow funds and trade on margin</p>
    </div>
  );
}

function CheckPrices24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <ChartCovariate />
          </div>
        </div>
        <Text36 />
      </div>
    </div>
  );
}

function LayoutBoard() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="layout-board">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="layout-board">
          <path clipRule="evenodd" d={svgPaths.p31215680} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Text37() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Interface</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">User interface customizations and color theme</p>
    </div>
  );
}

function CheckPrices25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <LayoutBoard />
          </div>
        </div>
        <Text37 />
      </div>
    </div>
  );
}

function BellRinging() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="bell-ringing">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="bell-ringing">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p3bb80500} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p319c00} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p1050c300} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text38() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Notification</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Alert and notification and pop ups</p>
    </div>
  );
}

function CheckPrices26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <BellRinging />
          </div>
        </div>
        <Text38 />
      </div>
    </div>
  );
}

function Messages() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="messages">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="messages">
          <g id="Icon">
            <path d={svgPaths.p2a813980} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p35edff80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text39() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Chat</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Chat settings</p>
    </div>
  );
}

function CheckPrices27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Messages />
          </div>
        </div>
        <Text39 />
      </div>
    </div>
  );
}

function Help1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="help">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="help">
          <g id="Icon">
            <path d={svgPaths.p3b4bc5c0} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.pff12d00} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p316c8000} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text40() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Help</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Get help. Support contact</p>
    </div>
  );
}

function CheckPrices28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Help1 />
          </div>
        </div>
        <Text40 />
      </div>
    </div>
  );
}

function News() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="news">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="news">
          <g id="Vector">
            <path d={svgPaths.p2b81d180} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p39c008c0} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.pedabef0} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p177a1880} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text41() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Announcements</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Updates, listings and other news</p>
    </div>
  );
}

function CheckPrices29() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <News />
          </div>
        </div>
        <Text41 />
      </div>
    </div>
  );
}

function Withdraw2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="withdraw">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="withdraw">
          <g id="Vector">
            <path d={svgPaths.p1a9cee80} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p1320600} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p3133c100} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p14366400} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3c28f000} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text42() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Withdraw</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">{`Wallet withdrawals & transfers`}</p>
    </div>
  );
}

function CheckPrices30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Withdraw2 />
          </div>
        </div>
        <Text42 />
      </div>
    </div>
  );
}

function UserScan() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="user-scan">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="user-scan">
          <g id="Vector">
            <path d={svgPaths.p2c76fa80} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p214fb600} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.pa758680} fill="var(--fill-0, #C4C4C4)" />
            <path clipRule="evenodd" d={svgPaths.p228bf100} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path d={svgPaths.p208ed700} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p3462ab00} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text43() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Identity</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Account identity verification</p>
    </div>
  );
}

function CheckPrices31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <UserScan />
          </div>
        </div>
        <Text43 />
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="phone">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="phone">
          <path d={svgPaths.p1ca7ef00} fill="var(--fill-0, #C4C4C4)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Text44() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Phone</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Email associated with your account</p>
    </div>
  );
}

function CheckPrices32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Phone />
          </div>
        </div>
        <Text44 />
      </div>
    </div>
  );
}

function ChartAreaLine() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="chart-area-line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chart-area-line">
          <g id="Icon">
            <path clipRule="evenodd" d={svgPaths.p37dbc600} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p388a9d80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text45() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Margin</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">{`Borrow on margin & leverage trade`}</p>
    </div>
  );
}

function CheckPrices33() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <ChartAreaLine />
          </div>
        </div>
        <Text45 />
      </div>
    </div>
  );
}

function Mail() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="mail">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mail">
          <path clipRule="evenodd" d={svgPaths.p3c50fd80} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Text46() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Email</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Email associated with your account</p>
    </div>
  );
}

function CheckPrices34() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Mail />
          </div>
        </div>
        <Text46 />
      </div>
    </div>
  );
}

function Logout() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="logout-2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="logout-2">
          <g id="Icon">
            <path d={svgPaths.p37cf6200} fill="var(--fill-0, #C4C4C4)" />
            <path d={svgPaths.p1bd33600} fill="var(--fill-0, #C4C4C4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Text47() {
  return (
    <div className="content-stretch flex flex-col font-['Supreme:Regular',sans-serif] items-start not-italic relative shrink-0 whitespace-nowrap" data-name="Text">
      <p className="leading-[28px] relative shrink-0 text-[18px] text-white">Sign Out</p>
      <p className="leading-[24px] relative shrink-0 text-[#dfe3e6] text-[16px]">Log out of your account</p>
    </div>
  );
}

function CheckPrices35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Check Prices">
      <div className="content-stretch flex gap-[8px] items-start px-[16px] py-[12px] relative w-full">
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[24px]" data-name="icon Modifier">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-full" data-name="Icon">
            <Logout />
          </div>
        </div>
        <Text47 />
      </div>
    </div>
  );
}

function SearchMenu1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Search Menu">
      <Actions1 />
      <Deposit />
      <Convert />
      <Withdraw />
      <Trade />
      <BuyCrypto />
      <CheckPrices />
      <Deposit2 />
      <Convert1 />
      <Deposit3 />
      <Deposit4 />
      <Deposit5 />
      <Deposit6 />
      <Actions2 />
      <Actions3 />
      <CheckPrices1 />
      <CheckPrices2 />
      <CheckPrices3 />
      <CheckPrices4 />
      <CheckPrices5 />
      <CheckPrices6 />
      <CheckPrices7 />
      <CheckPrices8 />
      <CheckPrices9 />
      <CheckPrices10 />
      <CheckPrices11 />
      <CheckPrices12 />
      <CheckPrices13 />
      <CheckPrices14 />
      <CheckPrices15 />
      <CheckPrices16 />
      <CheckPrices17 />
      <CheckPrices18 />
      <CheckPrices19 />
      <CheckPrices20 />
      <CheckPrices21 />
      <CheckPrices22 />
      <CheckPrices23 />
      <CheckPrices24 />
      <CheckPrices25 />
      <CheckPrices26 />
      <CheckPrices27 />
      <CheckPrices28 />
      <CheckPrices29 />
      <CheckPrices30 />
      <CheckPrices31 />
      <CheckPrices32 />
      <CheckPrices33 />
      <CheckPrices34 />
      <CheckPrices35 />
    </div>
  );
}

function MenuArea() {
  return (
    <div className="absolute content-stretch flex gap-[40px] items-start justify-center left-[32px] pb-[24px] top-[212px] w-[1160px]" data-name="Menu Area">
      <SearchMenu />
      <SearchMenu1 />
    </div>
  );
}

function SearchContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[4320px] items-start relative shrink-0 w-[1224px]" data-name="Search Container">
      <div className="backdrop-blur-[28px] bg-[rgba(16,18,20,0.85)] flex-[1_0_0] min-h-px min-w-px rounded-[24px] w-full" data-name="Overlay" />
      <SearchBar />
      <RecentSearches />
      <MenuArea />
    </div>
  );
}

function X() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="x">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="x">
          <path d={svgPaths.pdb87a00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="bg-[#525252] content-stretch flex items-center justify-center relative rounded-[1000px] shrink-0 size-[48px]" data-name="Close Icon">
      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Close Icon">
        <X />
      </div>
    </div>
  );
}

export default function SearchClose() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative size-full" data-name="Search + Close">
      <SearchContainer />
      <CloseIcon />
    </div>
  );
}