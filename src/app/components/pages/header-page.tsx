import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { Search, Bell, PanelLeft, Menu } from "lucide-react";
import { cn } from "../ui/utils";

function HollaExLogo() { return <span className="font-sans font-extrabold text-[22px] leading-none tracking-tight text-[var(--color-text-primary)]">Holla<span className="text-[var(--brand-default)]">Ex</span></span> }
function AvatarBtn({ initials = "JD", size = 40 }: { initials?: string; size?: number }) {
  return <div style={{ width: size, height: size }} className="rounded-full shrink-0 overflow-hidden flex items-center justify-center bg-[#282C32] text-white text-[13px] font-bold font-sans ring-2 ring-[var(--brand-default)]">{initials}</div>
}

function HeaderDemo({ variant = "desktop", loggedIn = true, userName, userInitials = "JD", notificationCount = 0, skeleton = false, subAccountName }: {
  variant?: "desktop"|"mobile"; loggedIn?: boolean; userName?: string; userInitials?: string; notificationCount?: number; skeleton?: boolean; subAccountName?: string
}) {
  const pulse = "hx-shimmer rounded";
  if (skeleton) return (
    <div className="flex items-center justify-between h-[80px] pl-[20px] pr-[32px] py-[16px] border-b border-[var(--border-subtle)]" style={{ backgroundColor: "var(--card)" }}>
      <div className="flex items-center gap-[12px] flex-1"><div className={cn(pulse,"w-[32px] h-[32px] rounded-[6px]")} /><div className={cn(pulse,"h-[40px] max-w-[440px] w-full rounded-[8px]")} /></div>
      <div className="flex items-center gap-[12px]"><div className={cn(pulse,"w-[88px] h-[36px] rounded-[7px]")} /><div className={cn(pulse,"w-[28px] h-[28px] rounded-full")} /><div className={cn(pulse,"w-[40px] h-[40px] rounded-full")} /></div>
    </div>
  );

  if (variant === "mobile") return (
    <div className="flex items-center justify-between px-[16px] pt-[12px] pb-[12px] bg-white border-b border-[#e1e1e1]">
      <div className="flex items-center gap-[12px]"><button className="flex items-center justify-center w-[32px] h-[32px] rounded-[6px] text-[var(--color-text-primary)]"><Menu size={20} /></button><HollaExLogo /></div>
      {loggedIn ? (
        <div className="flex items-center gap-[10px]">
          <div className="relative"><button className="flex items-center justify-center w-[32px] h-[32px] rounded-[6px] text-[var(--color-text-primary)]"><Bell size={20} /></button>{notificationCount>0 && <span className="absolute -top-[4px] -right-[4px] min-w-[16px] h-[16px] px-[3px] rounded-full bg-[var(--danger-default)] text-[10px] font-bold leading-[16px] text-white text-center">{notificationCount>9?"9+":notificationCount}</span>}</div>
          <AvatarBtn initials={userInitials} size={36} />
        </div>
      ) : <span className="text-[20px]">🇬🇧</span>}
    </div>
  );

  return (
    <div className="flex flex-col bg-white">
      <div className="relative flex items-center h-[80px] pl-[20px] pr-[32px] py-[16px] border-b border-[#e1e1e1]">
        {loggedIn ? (
          <>
            <div className="flex items-center gap-[12px] flex-1 min-w-0 mr-[16px]">
              <button className="shrink-0 flex items-center justify-center w-[32px] h-[32px] rounded-[6px] text-[var(--color-text-primary)] hover:bg-[#f4f4f4]"><PanelLeft size={20} /></button>
              <button className="flex items-center gap-[10px] h-[40px] w-full max-w-[440px] px-[12px] rounded-[8px] bg-[#f4f4f4] border-b border-[#e1e1e1] hover:bg-[#ebebeb] cursor-text">
                <Search size={16} className="shrink-0 text-[#a0a0a0]" /><span className="flex-1 text-left text-[14px] text-[#a0a0a0] font-sans">Search</span><span className="shrink-0 h-[22px] px-[6px] rounded-[4px] border border-[#e1e1e1] bg-[#f4f4f4] text-[11px] font-mono text-[#a0a0a0] flex items-center">⌘K</span>
              </button>
            </div>
            <div className="flex items-center gap-[10px] shrink-0">
              <button className="flex items-center gap-[6px] h-[36px] px-[14px] rounded-[7px] bg-[var(--brand-default)] text-white text-[13px] font-semibold font-sans hover:bg-[var(--brand-hover)]">Deposit</button>
              <div className="relative"><button className="flex items-center justify-center w-[36px] h-[36px] rounded-[6px] text-[var(--color-text-primary)] hover:bg-[#f4f4f4]"><Bell size={20} /></button>{notificationCount>0 && <span className="absolute -top-[4px] -right-[4px] min-w-[16px] h-[16px] px-[3px] rounded-full bg-[var(--danger-default)] text-[10px] font-bold leading-[16px] text-white text-center">{notificationCount>9?"9+":notificationCount}</span>}</div>
              <AvatarBtn initials={userInitials} />
            </div>
          </>
        ) : (
          <><div className="flex-1"><HollaExLogo /></div><div className="flex items-center gap-[10px]"><span className="text-[20px]">🇬🇧</span></div></>
        )}
      </div>
      {subAccountName && <div className="w-full flex items-center justify-center gap-[8px] h-[32px] px-[16px] bg-[#fffae8] text-[#4B3D06] text-[12px] font-medium">Sub-account: <strong>{subAccountName}</strong></div>}
    </div>
  );
}

export function HeaderPage() {
  return (
    <ComponentPage name="Header" description="Top navigation bar for desktop and mobile with search, notifications, user menu, dark mode toggle, and deposit button. Supports logged-in and logged-out states.">
      <Section title="Desktop — Logged In" description="Full header with all interactive elements.">
        <ExampleGrid label="Desktop logged in"><div className="w-full border border-[#E8E8E8] rounded-xl overflow-hidden"><HeaderDemo variant="desktop" loggedIn userName="John Doe" userInitials="JD" notificationCount={3} /></div></ExampleGrid>
      </Section>
      <Section title="Desktop — Logged Out" description="Minimal header without user-specific elements.">
        <ExampleGrid label="Desktop logged out"><div className="w-full border border-[#E8E8E8] rounded-xl overflow-hidden"><HeaderDemo variant="desktop" loggedIn={false} /></div></ExampleGrid>
      </Section>
      <Section title="Mobile" description="Compact mobile header with hamburger menu.">
        <ExampleGrid label="Mobile"><div className="w-[375px] border border-[#E8E8E8] rounded-xl overflow-hidden"><HeaderDemo variant="mobile" loggedIn userInitials="JD" notificationCount={5} /></div></ExampleGrid>
      </Section>
      <Section title="With Sub Account" description="Sub-account banner displayed below the header.">
        <ExampleGrid label="Sub account banner"><div className="w-full border border-[#E8E8E8] rounded-xl overflow-hidden"><HeaderDemo variant="desktop" loggedIn userName="John Doe" userInitials="JD" subAccountName="Trading Account" /></div></ExampleGrid>
      </Section>
      <Section title="Skeleton" description="Loading placeholder state.">
        <ExampleGrid label="Skeleton"><div className="w-full border border-[#E8E8E8] rounded-xl overflow-hidden"><HeaderDemo skeleton /></div></ExampleGrid>
      </Section>
    </ComponentPage>
  );
}