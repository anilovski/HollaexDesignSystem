import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { cn } from "../ui/utils";
import { ChevronRight, Square, Info, Star, Bell, Settings, User, Mail, Shield } from "lucide-react";
import { Badge } from "../ui/hx-badge";

function ListItem({ icon, label, topSubtext, bottomSubtext, helperIcon, chevron = false, separator = true, active = false, disabled = false, trailing, topBadge, topRightText, variant = "gray", onClick }: {
  icon?: React.ReactNode; label: string; topSubtext?: string; bottomSubtext?: string; helperIcon?: React.ReactNode; chevron?: boolean; separator?: boolean; active?: boolean; disabled?: boolean; trailing?: React.ReactNode; topBadge?: React.ReactNode; topRightText?: string; variant?: "gray" | "white"; onClick?: () => void
}) {
  const bg = variant === "gray" ? "bg-[#f4f4f4] hover:bg-[#ebebeb]" : "bg-white hover:bg-[#f8f8f8]";
  return (
    <div className={cn("relative flex flex-col gap-2 items-start justify-center pl-4 pr-2 py-4 w-full font-sans transition-colors", bg, active && "bg-[#e9effd]", disabled && "opacity-50 pointer-events-none", onClick && !disabled && "cursor-pointer")} onClick={!disabled ? onClick : undefined}>
      {(topBadge || topRightText) && <div className="flex items-center gap-6 w-full">{topBadge}{topRightText && <p className="flex-1 text-right text-[12px] text-[var(--color-text-tertiary)]">{topRightText}</p>}</div>}
      <div className="flex items-center gap-2 w-full">
        <div className="flex flex-1 items-center justify-between min-w-0">
          <div className="flex flex-1 items-start gap-2 min-w-0">
            {icon && <span className="shrink-0 flex items-center justify-center size-6 text-[var(--color-text-secondary)]">{icon}</span>}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              {topSubtext && <p className="text-[12px] leading-[16px] text-[var(--color-text-tertiary)] truncate">{topSubtext}</p>}
              <p className={cn("text-[14px] leading-[22px] font-medium truncate", active ? "text-[var(--brand-default)]" : "text-[var(--color-text-primary)]")}>{label}</p>
              {bottomSubtext && <div className="flex items-center gap-1">{helperIcon && <span className="shrink-0 size-3 text-[var(--color-text-tertiary)]">{helperIcon}</span>}<p className="text-[12px] leading-[16px] text-[var(--color-text-tertiary)] truncate">{bottomSubtext}</p></div>}
            </div>
          </div>
          {trailing && <div className="shrink-0 flex items-center justify-end pl-1">{trailing}</div>}
        </div>
        {chevron && <ChevronRight size={20} className="shrink-0 text-[var(--color-text-tertiary)]" />}
      </div>
      {separator && <span aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-[#e1e1e1]" />}
    </div>
  );
}

export function ListPage() {
  return (
    <ComponentPage name="List" description="List items organize related content in a clear, scannable structure. Flexible building blocks for menus, settings, or data lists.">
      <Section title="Styles" description="Gray and white background variants.">
        <ExampleGrid label="Gray style">
          <div className="w-full max-w-[400px]">
            <ListItem icon={<Square size={20} />} label="First item" topSubtext="Category" bottomSubtext="Helper text" helperIcon={<Info size={12} />} chevron />
            <ListItem icon={<Square size={20} />} label="Second item" topSubtext="Category" bottomSubtext="Helper text" helperIcon={<Info size={12} />} chevron />
            <ListItem icon={<Square size={20} />} label="Third item" topSubtext="Category" bottomSubtext="Helper text" helperIcon={<Info size={12} />} chevron separator={false} />
          </div>
        </ExampleGrid>
        <div className="h-4" />
        <ExampleGrid label="White style">
          <div className="w-full max-w-[400px]">
            <ListItem variant="white" icon={<Square size={20} />} label="First item" topSubtext="Category" bottomSubtext="Helper text" helperIcon={<Info size={12} />} chevron />
            <ListItem variant="white" icon={<Square size={20} />} label="Second item" topSubtext="Category" bottomSubtext="Helper text" helperIcon={<Info size={12} />} chevron />
            <ListItem variant="white" icon={<Square size={20} />} label="Third item" topSubtext="Category" bottomSubtext="Helper text" helperIcon={<Info size={12} />} chevron separator={false} />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="States" description="Enabled, active (selected), and disabled states.">
        <ExampleGrid label="States">
          <div className="w-full max-w-[400px]">
            <ListItem icon={<Square size={20} />} label="Enabled" topSubtext="Default state" bottomSubtext="Helper text" helperIcon={<Info size={12} />} chevron />
            <ListItem icon={<Star size={20} />} label="Active / Selected" topSubtext="Selected state" bottomSubtext="Label turns brand blue" helperIcon={<Info size={12} />} active chevron />
            <ListItem icon={<Square size={20} />} label="Disabled" topSubtext="Disabled state" bottomSubtext="Cannot interact" helperIcon={<Info size={12} />} disabled chevron separator={false} />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Top Area" description="Optional badge and top-right text above the main content.">
        <ExampleGrid label="With badge and top-right text">
          <div className="w-full max-w-[400px]">
            <ListItem icon={<Star size={20} />} label="Featured item" topSubtext="Category" bottomSubtext="With top area" helperIcon={<Info size={12} />} topBadge={<Badge variant="informational" size="xs" leftIcon={<Star size={10} />}>Featured</Badge>} topRightText="2 min ago" chevron />
            <ListItem icon={<Bell size={20} />} label="Notification" topSubtext="Alert" bottomSubtext="New update available" helperIcon={<Info size={12} />} topBadge={<Badge variant="warning" size="xs">New</Badge>} chevron separator={false} />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Trailing Controls" description="Badges and other controls on the right side.">
        <ExampleGrid label="With badge">
          <div className="w-full max-w-[400px]">
            <ListItem icon={<Shield size={20} />} label="Security" topSubtext="Account" bottomSubtext="Two-factor authentication" helperIcon={<Info size={12} />} trailing={<Badge variant="success" size="sm">Enabled</Badge>} chevron />
            <ListItem icon={<Mail size={20} />} label="Notifications" topSubtext="Preferences" bottomSubtext="Manage notification settings" helperIcon={<Info size={12} />} trailing={<Badge variant="error" size="sm">3</Badge>} chevron separator={false} />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Minimal" description="List items with only a label and optional chevron.">
        <ExampleGrid label="Simple list">
          <div className="w-full max-w-[400px] border border-[#e1e1e1] rounded-lg overflow-hidden">
            <ListItem variant="white" label="Account settings" chevron />
            <ListItem variant="white" label="Privacy & security" chevron />
            <ListItem variant="white" label="Notifications" chevron />
            <ListItem variant="white" label="Help & support" chevron separator={false} />
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Clickable" description="List items with onClick handlers.">
        <ExampleGrid label="Interactive list">
          <div className="w-full max-w-[400px]">
            <ListItem icon={<User size={20} />} label="View profile" bottomSubtext="See your account details" chevron onClick={() => {}} />
            <ListItem icon={<Settings size={20} />} label="Preferences" bottomSubtext="Customize your experience" chevron onClick={() => {}} />
            <ListItem icon={<Bell size={20} />} label="Notifications" bottomSubtext="Manage alerts" chevron onClick={() => {}} separator={false} />
          </div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}
