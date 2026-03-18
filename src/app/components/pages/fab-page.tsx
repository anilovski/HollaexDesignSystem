import { ComponentPage, Section, ExampleGrid } from "../docs/component-page";
import { useState, useRef, useEffect, useCallback } from "react";
import { Plus, X, Send, Pencil, Image, Link2, Mic } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ── Reusable FAB Component ─────────────────────────────── */
function Fab({
  size = "md",
  variant = "brand",
  position = "bottom-right",
  morphTo = "input",
  placeholder = "Type something…",
  onSubmit,
  icon,
  disabled = false,
}: {
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "secondary" | "danger";
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  morphTo?: "input" | "textarea" | "actions";
  placeholder?: string;
  onSubmit?: (value: string) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizes: Record<string, { button: number; icon: number }> = {
    sm: { button: 40, icon: 18 },
    md: { button: 56, icon: 24 },
    lg: { button: 64, icon: 28 },
  };

  const variants: Record<string, { bg: string; hover: string; fg: string }> = {
    brand: { bg: "var(--brand-default)", hover: "var(--brand-hover)", fg: "var(--brand-fg)" },
    secondary: { bg: "var(--secondary-default)", hover: "var(--secondary-hover)", fg: "var(--secondary-fg)" },
    danger: { bg: "var(--danger-default)", hover: "var(--danger-hover)", fg: "var(--danger-fg)" },
  };

  const s = sizes[size];
  const v = variants[variant];

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setValue("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (value.trim()) {
      onSubmit?.(value.trim());
      setValue("");
      setIsOpen(false);
    }
  }, [value, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
      setValue("");
    }
  };

  /* Expanded widths by morph type */
  const expandedWidth = morphTo === "textarea" ? 320 : morphTo === "actions" ? 220 : 280;
  const expandedHeight = morphTo === "textarea" ? 140 : morphTo === "actions" ? s.button : 48;

  if (disabled) {
    return (
      <button
        disabled
        style={{
          width: s.button,
          height: s.button,
          borderRadius: "var(--radius-circle)",
          backgroundColor: "var(--brand-disabled)",
          color: "var(--brand-disabled-fg)",
          border: "none",
          cursor: "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.6,
          fontFamily: "var(--font-family-supreme)",
        }}
      >
        {icon || <Plus size={s.icon} />}
      </button>
    );
  }

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-flex" }}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ── Collapsed: circular FAB ── */
          <motion.button
            key="fab-button"
            onClick={() => setIsOpen(true)}
            initial={false}
            animate={{
              width: s.button,
              height: s.button,
              borderRadius: s.button / 2,
            }}
            exit={{
              scale: 0.85,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0, 0, 0.3, 1], /* --ease-emphasized-decelerate */
            }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            style={{
              backgroundColor: v.bg,
              color: v.fg,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px -4px rgba(0,0,0,0.25), 0 2px 6px -2px rgba(0,0,0,0.15)",
              fontFamily: "var(--font-family-supreme)",
              overflow: "hidden",
            }}
          >
            {icon || <Plus size={s.icon} strokeWidth={2} />}
          </motion.button>
        ) : (
          /* ── Expanded: morphed panel ── */
          <motion.div
            key="fab-expanded"
            initial={{
              width: s.button,
              height: s.button,
              borderRadius: s.button / 2,
              opacity: 0.9,
            }}
            animate={{
              width: expandedWidth,
              height: expandedHeight,
              borderRadius: 16,
              opacity: 1,
            }}
            exit={{
              width: s.button,
              height: s.button,
              borderRadius: s.button / 2,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0, 0, 0.3, 1],
            }}
            style={{
              backgroundColor: v.bg,
              boxShadow: "0 12px 40px -8px rgba(0,0,0,0.30), 0 4px 12px -4px rgba(0,0,0,0.18)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              fontFamily: "var(--font-family-supreme)",
            }}
          >
            {/* Inner content fades in after the morph */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.2, ease: [0, 0, 0.3, 1] }}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: morphTo === "actions" ? 0 : undefined,
              }}
            >
              {morphTo === "input" && (
                <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 6px 0 16px", gap: 4 }}>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: v.fg,
                      fontSize: "var(--text-body)",
                      fontFamily: "var(--font-family-supreme)",
                      letterSpacing: "var(--ls-body)",
                    }}
                  />
                  <button
                    onClick={handleSubmit}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-circle)",
                      backgroundColor: value.trim() ? "rgba(255,255,255,0.2)" : "transparent",
                      border: "none",
                      cursor: value.trim() ? "pointer" : "default",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: v.fg,
                      opacity: value.trim() ? 1 : 0.4,
                      transition: "opacity var(--motion-hover), background-color var(--motion-hover)",
                    }}
                  >
                    <Send size={16} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => { setIsOpen(false); setValue(""); }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-circle)",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: v.fg,
                      opacity: 0.7,
                      transition: "opacity var(--motion-hover)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>
              )}

              {morphTo === "textarea" && (
                <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "12px 12px 6px" }}>
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    rows={3}
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: v.fg,
                      fontSize: "var(--text-body)",
                      fontFamily: "var(--font-family-supreme)",
                      letterSpacing: "var(--ls-body)",
                      resize: "none",
                      lineHeight: "var(--lh-body)",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, paddingTop: 4 }}>
                    <button
                      onClick={() => { setIsOpen(false); setValue(""); }}
                      style={{
                        height: 32,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: "var(--radius)",
                        backgroundColor: "rgba(255,255,255,0.12)",
                        border: "none",
                        cursor: "pointer",
                        color: v.fg,
                        fontSize: "var(--text-body-sm)",
                        fontFamily: "var(--font-family-supreme)",
                        fontWeight: "var(--font-weight-medium)",
                        transition: "background-color var(--motion-hover)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!value.trim()}
                      style={{
                        height: 32,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: "var(--radius)",
                        backgroundColor: value.trim() ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                        border: "none",
                        cursor: value.trim() ? "pointer" : "default",
                        color: v.fg,
                        fontSize: "var(--text-body-sm)",
                        fontFamily: "var(--font-family-supreme)",
                        fontWeight: "var(--font-weight-medium)",
                        opacity: value.trim() ? 1 : 0.5,
                        transition: "opacity var(--motion-hover), background-color var(--motion-hover)",
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {morphTo === "actions" && (
                <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 8px", gap: 2 }}>
                  {[
                    { icon: <Pencil size={18} />, label: "Note" },
                    { icon: <Image size={18} />, label: "Photo" },
                    { icon: <Link2 size={18} />, label: "Link" },
                    { icon: <Mic size={18} />, label: "Voice" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      style={{
                        flex: 1,
                        height: "calc(100% - 12px)",
                        borderRadius: "var(--radius)",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        color: v.fg,
                        fontSize: "10px",
                        fontFamily: "var(--font-family-supreme)",
                        fontWeight: "var(--font-weight-medium)",
                        letterSpacing: "0.02em",
                        transition: "background-color var(--motion-hover)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      onClick={() => { setIsOpen(false); }}
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                  <div style={{ width: 1, height: "60%", backgroundColor: "rgba(255,255,255,0.2)", margin: "0 2px" }} />
                  <button
                    onClick={() => { setIsOpen(false); setValue(""); }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-circle)",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: v.fg,
                      opacity: 0.7,
                      transition: "opacity var(--motion-hover)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
                  >
                    <X size={18} strokeWidth={2} />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Interactive playground ─────────────────────────────── */
function FabPlayground() {
  const [items, setItems] = useState<string[]>(["Buy groceries", "Review pull request"]);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 420,
      height: 360,
      borderRadius: 16,
      backgroundColor: "var(--card)",
      border: "1px solid var(--border-subtle)",
      overflow: "hidden",
      fontFamily: "var(--font-family-supreme)",
    }}>
      {/* Header */}
      <div style={{
        padding: "var(--space-5) var(--space-6)",
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontSize: "var(--text-h6)",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--foreground)",
          letterSpacing: "var(--ls-h6)",
        }}>
          My Tasks
        </span>
        <span style={{
          fontSize: "var(--text-caption)",
          color: "var(--muted-foreground)",
          fontWeight: "var(--font-weight-medium)",
        }}>
          {items.length} items
        </span>
      </div>

      {/* List */}
      <div style={{ padding: "var(--space-3) 0", overflowY: "auto", height: "calc(100% - 53px - 80px)" }}>
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: [0, 0, 0.3, 1], delay: i * 0.03 }}
              style={{
                padding: "var(--space-4) var(--space-6)",
                fontSize: "var(--text-body)",
                color: "var(--foreground)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
                cursor: "pointer",
                transition: "background-color var(--motion-hover)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-subtle)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
            >
              <div style={{
                width: 18,
                height: 18,
                borderRadius: "var(--radius-xs)",
                border: "1.5px solid var(--border)",
                flexShrink: 0,
              }} />
              <span>{item}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <div style={{
            padding: "var(--space-10) var(--space-6)",
            textAlign: "center",
            fontSize: "var(--text-body-sm)",
            color: "var(--muted-foreground)",
          }}>
            No tasks yet. Tap + to add one.
          </div>
        )}
      </div>

      {/* FAB in corner */}
      <div style={{ position: "absolute", bottom: 16, right: 16 }}>
        <Fab
          morphTo="input"
          placeholder="Add a new task…"
          onSubmit={(val) => setItems((prev) => [...prev, val])}
        />
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export function FabPage() {
  return (
    <ComponentPage
      name="FAB"
      description="Floating Action Button that morphs into an input, textarea, or action menu. Inspired by mobile FAB patterns — the circular button expands with a smooth shape-morph animation into a contextual input surface, then collapses back when dismissed."
    >
      <Section title="Interactive Playground" description="A mini task list powered by a morphing FAB. Click the + button to add tasks, click a task to remove it.">
        <ExampleGrid label="Live demo">
          <FabPlayground />
        </ExampleGrid>
      </Section>

      <Section title="Morph Targets" description="The FAB can morph into three different surfaces depending on use case.">
        <ExampleGrid label="Morph to: Input">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
            <Fab morphTo="input" placeholder="Add item…" onSubmit={() => {}} />
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Single-line text entry</span>
          </div>
        </ExampleGrid>
        <ExampleGrid label="Morph to: Textarea">
          <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-5)" }}>
            <Fab morphTo="textarea" placeholder="Write a note…" onSubmit={() => {}} />
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)", paddingTop: 16 }}>Multi-line text entry with cancel / submit</span>
          </div>
        </ExampleGrid>
        <ExampleGrid label="Morph to: Actions">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
            <Fab morphTo="actions" />
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Quick-action palette</span>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts — compact UI, standard, and large touch targets.">
        <ExampleGrid label="sm · md · lg">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-7)" }}>
            <div style={{ textAlign: "center" }}>
              <Fab size="sm" morphTo="input" placeholder="Add…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-mono)", letterSpacing: "0.02em" }}>sm · 40px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Fab size="md" morphTo="input" placeholder="Add…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-mono)", letterSpacing: "0.02em" }}>md · 56px</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Fab size="lg" morphTo="input" placeholder="Add…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-mono)", letterSpacing: "0.02em" }}>lg · 64px</div>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Variants" description="Color variants match the design system's button token families.">
        <ExampleGrid label="brand · secondary · danger">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-7)" }}>
            <div style={{ textAlign: "center" }}>
              <Fab variant="brand" morphTo="input" placeholder="Add…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-supreme)" }}>Brand</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Fab variant="secondary" morphTo="input" placeholder="Add…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-supreme)" }}>Secondary</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Fab variant="danger" morphTo="input" placeholder="Add…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-supreme)" }}>Danger</div>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Custom Icon" description="Pass a custom icon to replace the default + symbol for different action contexts.">
        <ExampleGrid label="Custom icons">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-7)" }}>
            <div style={{ textAlign: "center" }}>
              <Fab icon={<Pencil size={22} strokeWidth={2} />} morphTo="textarea" placeholder="Write a note…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-supreme)" }}>Compose</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Fab icon={<Send size={22} strokeWidth={2} />} variant="secondary" morphTo="input" placeholder="Quick message…" onSubmit={() => {}} />
              <div style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", marginTop: "var(--space-3)", fontFamily: "var(--font-family-supreme)" }}>Message</div>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="States" description="Disabled FAB for contexts where the action is unavailable.">
        <ExampleGrid label="Disabled">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-7)" }}>
            <Fab disabled />
            <span style={{ fontSize: "var(--text-body-sm)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Non-interactive, reduced opacity</span>
          </div>
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}