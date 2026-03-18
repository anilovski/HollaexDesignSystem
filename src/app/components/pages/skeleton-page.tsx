import { ComponentPage, Section, ExampleGrid, ExampleRow } from "../docs/component-page";
import { HxSkeleton, SkeletonCard, SkeletonListItem, SkeletonAvatar, SkeletonTable } from "../ui/hx-skeleton";
import { SkeletonCrossfade } from "../ui/hx-skeleton-crossfade";
import { useState, useEffect, type ReactNode } from "react";

export function SkeletonPage() {
  return (
    <ComponentPage name="Skeleton" description="Placeholder loading states that mimic content layout. Reduces perceived load time and prevents layout shift.">
      <Section title="Variants" description="Four base shapes for different content types.">
        <ExampleGrid label="Shape variants">
          <div className="flex flex-col" style={{ gap: "var(--space-7)" }}>
            <div>
              <Label>Text</Label>
              <div className="w-80"><HxSkeleton variant="text" height={14} /></div>
            </div>
            <div>
              <Label>Circular</Label>
              <HxSkeleton variant="circular" width={48} height={48} />
            </div>
            <div>
              <Label>Rectangular</Label>
              <div className="w-80"><HxSkeleton variant="rectangular" height={100} /></div>
            </div>
            <div>
              <Label>Rounded</Label>
              <div className="w-80"><HxSkeleton variant="rounded" height={100} /></div>
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Multi-line Text" description="Simulate paragraph text with multiple lines. The last line is automatically shorter.">
        <ExampleGrid label="Text lines">
          <div className="flex" style={{ gap: "var(--space-7)" }}>
            <div className="w-64">
              <Label>2 lines</Label>
              <HxSkeleton variant="text" lines={2} />
            </div>
            <div className="w-64">
              <Label>4 lines</Label>
              <HxSkeleton variant="text" lines={4} />
            </div>
          </div>
        </ExampleGrid>
      </Section>

      <Section title="Sizes" description="Custom width and height for any variant.">
        <ExampleRow label="Custom sizes">
          <HxSkeleton variant="circular" width={24} height={24} />
          <HxSkeleton variant="circular" width={32} height={32} />
          <HxSkeleton variant="circular" width={40} height={40} />
          <HxSkeleton variant="circular" width={56} height={56} />
          <HxSkeleton variant="rounded" width={80} height={32} />
          <HxSkeleton variant="rounded" width={120} height={32} />
        </ExampleRow>
      </Section>

      <Section title="Composed Patterns" description="Pre-built skeleton layouts for common UI patterns.">
        <ExampleGrid label="Card skeleton">
          <SkeletonCard />
        </ExampleGrid>

        <ExampleGrid label="List item skeletons">
          <div className="w-full max-w-md flex flex-col">
            <SkeletonListItem />
            <SkeletonListItem />
            <SkeletonListItem />
          </div>
        </ExampleGrid>

        <ExampleGrid label="Avatar group">
          <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
            <SkeletonAvatar size={32} />
            <SkeletonAvatar size={32} />
            <SkeletonAvatar size={32} />
            <SkeletonAvatar size={32} />
            <SkeletonAvatar size={32} />
          </div>
        </ExampleGrid>

        <ExampleGrid label="Table skeleton">
          <SkeletonTable rows={4} cols={4} />
        </ExampleGrid>
      </Section>

      <Section title="Animation" description="Skeletons pulse by default but animation can be disabled for static previews.">
        <ExampleRow label="Animated vs Static">
          <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
            <Label>Animated (default)</Label>
            <HxSkeleton variant="rounded" width={200} height={40} animated />
          </div>
          <div className="flex flex-col" style={{ gap: "var(--space-2)" }}>
            <Label>Static</Label>
            <HxSkeleton variant="rounded" width={200} height={40} animated={false} />
          </div>
        </ExampleRow>
      </Section>

      <Section title="Crossfade Transition" description="SkeletonCrossfade wraps a skeleton and its real content, applying a blur-to-sharp crossfade when loading completes. Supports custom duration, easing, and blur toggle — all driven by CSS variables.">
        <ExampleGrid label="Default crossfade (blur + decelerate)">
          <CrossfadeDemo />
        </ExampleGrid>
        <ExampleGrid label="Custom timing — slow reveal, no blur">
          <CrossfadeDemo
            duration="var(--duration-long-1)"
            easing="var(--ease-standard)"
            blur={false}
          />
        </ExampleGrid>
        <ExampleGrid label="Fast crossfade — quick entrance">
          <CrossfadeDemo
            duration="var(--duration-short-4)"
            easing="var(--ease-emphasized-decelerate)"
            blur
          />
        </ExampleGrid>
      </Section>
    </ComponentPage>
  );
}

function CrossfadeDemo({
  duration,
  easing,
  blur,
}: {
  duration?: string
  easing?: string
  blur?: boolean
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  const restart = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="flex flex-col" style={{ gap: "var(--space-4)" }}>
      <SkeletonCrossfade
        loading={loading}
        skeleton={<SkeletonCard />}
        {...(duration ? { duration } : {})}
        {...(easing ? { easing } : {})}
        {...(blur !== undefined ? { blur } : {})}
      >
        <div
          className="border rounded-lg overflow-hidden"
          style={{ borderColor: "var(--border-subtle)", width: 280 }}
        >
          <div
            style={{
              height: 140,
              background: "linear-gradient(135deg, var(--brand-subtle) 0%, var(--brand-default) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "var(--brand-fg)",
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "var(--text-h5)",
              }}
            >
              Content Loaded
            </span>
          </div>
          <div style={{ padding: "var(--space-4)" }}>
            <span
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-medium)",
                fontSize: "var(--text-base)",
                color: "var(--color-text-primary)",
                display: "block",
              }}
            >
              Card Title
            </span>
            <p
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-label)",
                color: "var(--color-text-secondary)",
                marginTop: "var(--space-2)",
                lineHeight: 1.5,
              }}
            >
              This content faded in from a skeleton placeholder using the blur-to-sharp crossfade animation.
            </p>
          </div>
        </div>
      </SkeletonCrossfade>

      <button
        type="button"
        onClick={restart}
        className="cursor-pointer"
        style={{
          fontFamily: "var(--font-family-supreme)",
          fontSize: "var(--text-label)",
          color: "var(--brand-default)",
          background: "none",
          border: "none",
          padding: 0,
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        Replay crossfade
      </button>
    </div>
  )
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span style={{
      fontSize: "var(--text-caption)",
      fontWeight: "var(--font-weight-medium)",
      color: "var(--color-text-tertiary)",
      fontFamily: "var(--font-family-supreme)",
      display: "block",
      marginBottom: "var(--space-2)",
    }}>
      {children}
    </span>
  );
}