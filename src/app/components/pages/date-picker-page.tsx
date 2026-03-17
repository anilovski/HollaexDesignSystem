import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../ui/utils";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["M","T","W","T","F","S","S"];

function formatDate(d: Date) { return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}` }
function isSameDay(a: Date, b: Date) { return a.getDate()===b.getDate() && a.getMonth()===b.getMonth() && a.getFullYear()===b.getFullYear() }
function buildGrid(year: number, month: number) {
  const firstDay = new Date(year,month,1); const startOffset = (firstDay.getDay()+6)%7; const days: { date: Date; cur: boolean }[] = [];
  for (let i=startOffset;i>0;i--) days.push({ date: new Date(year,month,1-i), cur: false });
  const lastDate = new Date(year,month+1,0).getDate(); for (let d=1;d<=lastDate;d++) days.push({ date: new Date(year,month,d), cur: true });
  while (days.length<35||days.length%7!==0) { const last = days[days.length-1].date; days.push({ date: new Date(last.getFullYear(),last.getMonth(),last.getDate()+1), cur: false }) }
  return days;
}

function DatePicker({ size = "lg", label, placeholder = "dd/mm/yyyy", state = "default", errorText, warningText, calendarStyle = "gray" }: {
  size?: "xs"|"sm"|"md"|"lg"|"xl"; label?: string; placeholder?: string; state?: "default"|"error"|"warning"|"disabled"; errorText?: string; warningText?: string; calendarStyle?: "gray"|"white"
}) {
  const [selected, setSelected] = useState<Date|null>(null); const [open, setOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear()); const [month, setMonth] = useState(new Date().getMonth());
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (!open) return; const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h) }, [open]);
  const isDisabled = state === "disabled"; const isError = state === "error";
  const heights: Record<string, string> = { xl: "h-[64px]", lg: "h-[48px]", md: "h-[40px]", sm: "h-[32px]", xs: "h-[24px]" };
  const days = buildGrid(year, month); const today = new Date();

  return (
    <div ref={ref} className="relative flex flex-col">
      {label && <span className={cn("text-[12px] leading-[16px] pb-[8px]", isDisabled ? "text-[#c8c8c8]" : "text-[var(--color-text-secondary)]")}>{label}</span>}
      <div className="relative rounded-[8px] overflow-clip">
        <button type="button" disabled={isDisabled} onClick={() => !isDisabled && setOpen(v => !v)}
          className={cn("flex items-center gap-[8px] px-[12px] w-full bg-[#f4f4f4] rounded-[8px]", heights[size], isError ? "border-2 border-[var(--danger-default)]" : "border-b border-[#e1e1e1]", isDisabled && "cursor-not-allowed opacity-50")}>
          <span className={cn("flex-1 text-left text-[14px] font-sans", selected ? "text-[var(--color-text-primary)]" : "text-[#a0a0a0]")}>{selected ? formatDate(selected) : placeholder}</span>
          <Calendar size={16} className="shrink-0 text-[#a0a0a0]" />
        </button>
        <span aria-hidden className={cn("absolute bottom-0 left-0 right-0 h-[2px] origin-left transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]", open ? "scale-x-100" : "scale-x-0")} style={{ backgroundColor: isError ? "var(--danger-default)" : "var(--brand-default)" }} />
      </div>
      {isError && errorText && <span className="text-[12px] pt-[4px] text-[var(--danger-default)]">{errorText}</span>}
      {state === "warning" && warningText && <span className="text-[12px] pt-[4px] text-[#D4A017]">{warningText}</span>}
      {open && (
        <div className="absolute top-full mt-[4px] left-0 z-50">
          <div className={cn("flex flex-col gap-[4px] w-[288px] rounded-[6px] pt-[4px] pb-[8px] px-[4px] shadow-lg", calendarStyle === "gray" ? "bg-[#f4f4f4]" : "bg-white")}>
            <div className="flex items-center justify-between h-[40px]">
              <button type="button" onClick={() => { if (month===0) { setYear(y=>y-1); setMonth(11) } else setMonth(m=>m-1) }} className="flex items-center justify-center size-[40px] rounded-[4px] hover:bg-[rgba(0,0,0,0.05)] cursor-pointer"><ChevronLeft size={16} /></button>
              <span className="text-[14px] font-bold">{MONTH_NAMES[month]} {year}</span>
              <button type="button" onClick={() => { if (month===11) { setYear(y=>y+1); setMonth(0) } else setMonth(m=>m+1) }} className="flex items-center justify-center size-[40px] rounded-[4px] hover:bg-[rgba(0,0,0,0.05)] cursor-pointer"><ChevronRight size={16} /></button>
            </div>
            <div className="flex">{DAY_LABELS.map((l,i) => <div key={i} className="flex items-center justify-center size-[40px] text-[14px] text-[#a0a0a0]">{l}</div>)}</div>
            <div className="flex flex-col">
              {Array.from({ length: Math.ceil(days.length/7) }, (_, row) => (
                <div key={row} className="flex">
                  {days.slice(row*7, row*7+7).map((day, col) => {
                    const sel = selected ? isSameDay(day.date, selected) : false;
                    const isToday = isSameDay(day.date, today);
                    return (
                      <button key={col} type="button" onClick={() => { setSelected(day.date); setOpen(false) }}
                        className={cn("relative flex items-center justify-center size-[40px] rounded-[4px] transition-colors cursor-pointer",
                          sel ? "bg-[var(--brand-default)]" : "hover:bg-[rgba(0,0,0,0.05)]")}>
                        <span className={cn("text-[14px]", sel ? "text-white" : !day.cur ? "text-[#c8c8c8]" : isToday ? "text-[var(--brand-default)] font-bold" : "text-[var(--color-text-primary)]")}>{day.date.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function DatePickerPage() {
  return (
    <ComponentPage name="Date Picker" description="Calendar date selection with a popup calendar. Supports multiple sizes, validation states, and date formats.">
      <Section title="Default" description="Click to open the calendar popup.">
        <ExampleGrid label="Calendar">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-64"><DatePicker label="Select date" placeholder="dd/mm/yyyy" /></div></div>
        </ExampleGrid>
      </Section>
      <Section title="Sizes" description="Five sizes from xs to xl.">
        <ExampleGrid label="All sizes">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            {(["xs","sm","md","lg","xl"] as const).map(size => <div key={size} className="w-64"><DatePicker size={size} label={`Size ${size}`} placeholder="dd/mm/yyyy" /></div>)}
          </div>
        </ExampleGrid>
      </Section>
      <Section title="Calendar Styles" description="Gray and white calendar popup backgrounds.">
        <ExampleGrid label="Calendar styles">
          <div className="flex" style={{ gap: "var(--space-7)" }}><div className="w-64"><DatePicker calendarStyle="gray" label="Gray calendar" /></div><div className="w-64"><DatePicker calendarStyle="white" label="White calendar" /></div></div>
        </ExampleGrid>
      </Section>
      <Section title="Validation States" description="Error, warning, and disabled states.">
        <ExampleGrid label="States">
          <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
            <div className="w-64"><DatePicker state="error" label="Error state" errorText="Please select a valid date" /></div>
            <div className="w-64"><DatePicker state="warning" label="Warning state" warningText="Date is in the past" /></div>
            <div className="w-64"><DatePicker state="disabled" label="Disabled state" /></div>
          </div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}