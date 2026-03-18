import { useEffect, useRef } from "react";

/**
 * macOS-style auto-hiding scrollbar hook.
 *
 * Hides the native scrollbar and injects a custom overlay thumb element
 * that fades in/out smoothly using real CSS opacity transitions
 * (`.hx-scrollbar-thumb` / `.visible` in theme.css).
 *
 * Usage:
 *   const scrollRef = useScrollbar<HTMLDivElement>();
 *   <div ref={scrollRef} className="overflow-y-auto">…</div>
 */
export function useScrollbar<T extends HTMLElement = HTMLElement>(
  hideDelay = 1200,
) {
  const ref = useRef<T>(null);
  const internals = useRef<{
    thumb: HTMLDivElement | null;
    hideTimer: ReturnType<typeof setTimeout> | undefined;
    rafId: number | undefined;
    dragging: boolean;
    dragStartY: number;
    dragStartScrollTop: number;
  }>({
    thumb: null,
    hideTimer: undefined,
    rafId: undefined,
    dragging: false,
    dragStartY: 0,
    dragStartScrollTop: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const state = internals.current;

    // ── Ensure positioned container ──
    const pos = getComputedStyle(el).position;
    if (pos === "static") el.style.position = "relative";

    // ── Hide native scrollbar ──
    el.classList.add("hx-scrollbar");
    el.style.scrollbarWidth = "none"; // Firefox
    // WebKit/Blink handled via the class if CSS exists, otherwise inline
    const style = document.createElement("style");
    style.textContent = `
      .hx-scrollbar::-webkit-scrollbar { display: none; }
    `;
    el.appendChild(style);

    // ── Create overlay thumb ──
    const thumb = document.createElement("div");
    thumb.className = "hx-scrollbar-thumb";
    // Apply all critical styles inline so it works without external CSS
    thumb.style.position = "absolute";
    thumb.style.top = "0";
    thumb.style.right = "2px";
    thumb.style.width = "5px";
    thumb.style.borderRadius = "9999px";
    thumb.style.backgroundColor = "var(--muted-foreground, rgba(0,0,0,0.3))";
    thumb.style.opacity = "0";
    thumb.style.pointerEvents = "none";
    thumb.style.zIndex = "50";
    thumb.style.transition = "opacity 0.2s ease";
    el.appendChild(thumb);
    state.thumb = thumb;

    // ── Core calculation ──
    function getThumbMetrics(container: HTMLElement) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const margin = 2; // top + bottom margin (px each side)
      const trackH = clientHeight - margin * 2;
      const ratio = clientHeight / scrollHeight;
      const thumbH = Math.max(ratio * trackH, 28);
      const maxScroll = scrollHeight - clientHeight;
      const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const thumbTop = margin + scrollRatio * (trackH - thumbH);
      return { thumbH, thumbTop, trackH, maxScroll, margin };
    }

    function updateThumb() {
      const t = state.thumb;
      if (!t || !el) return;
      const { scrollHeight, clientHeight, scrollTop } = el;

      if (scrollHeight <= clientHeight) {
        t.classList.remove("visible");
        return;
      }

      const { thumbH, thumbTop } = getThumbMetrics(el);

      // Key: offset by scrollTop so the thumb stays fixed in the visible viewport
      // (because the thumb is position:absolute inside the scrolling container,
      //  it would otherwise scroll away with the content)
      t.style.height = `${thumbH}px`;
      t.style.transform = `translateY(${scrollTop + thumbTop}px)`;
    }

    function show() {
      const t = state.thumb;
      if (!t || !el) return;
      if (el.scrollHeight <= el.clientHeight) return;
      updateThumb();
      t.style.opacity = "0.45";
      t.style.pointerEvents = "auto";
    }

    function scheduleHide() {
      if (state.hideTimer) clearTimeout(state.hideTimer);
      if (state.dragging) return;
      state.hideTimer = setTimeout(() => {
        if (state.thumb && !state.dragging) {
          state.thumb.style.opacity = "0";
          state.thumb.style.pointerEvents = "none";
        }
      }, hideDelay);
    }

    // ── Scroll handler ──
    function onScroll() {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      state.rafId = requestAnimationFrame(() => {
        show();
        scheduleHide();
      });
    }

    // ── Hover ──
    function onEnter() {
      if (el && el.scrollHeight > el.clientHeight) show();
    }
    function onLeave() {
      if (!state.dragging) scheduleHide();
    }

    // ── Drag ──
    function onThumbDown(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      state.dragging = true;
      state.dragStartY = e.clientY;
      state.dragStartScrollTop = el!.scrollTop;

      // Prevent text selection during drag
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      function onMove(ev: MouseEvent) {
        if (!el) return;
        const { trackH, thumbH, maxScroll } = getThumbMetrics(el);
        const usableTrack = trackH - thumbH;
        if (usableTrack <= 0) return;

        const deltaY = ev.clientY - state.dragStartY;
        const scrollDelta = (deltaY / usableTrack) * maxScroll;
        el.scrollTop = Math.max(
          0,
          Math.min(maxScroll, state.dragStartScrollTop + scrollDelta),
        );
      }

      function onUp() {
        state.dragging = false;
        document.body.style.userSelect = "";
        document.body.style.webkitUserSelect = "";
        scheduleHide();
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      }

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    }

    // ── ResizeObserver: update thumb when content or container size changes ──
    const ro = new ResizeObserver(() => {
      if (state.thumb?.classList.contains("visible")) {
        updateThumb();
      }
    });
    ro.observe(el);
    // Also observe the first child if it exists (catches content height changes)
    if (el.firstElementChild) {
      ro.observe(el.firstElementChild);
    }

    // ── Bind ──
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    thumb.addEventListener("mousedown", onThumbDown);

    // Initial position
    updateThumb();

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      thumb.removeEventListener("mousedown", onThumbDown);
      ro.disconnect();
      if (state.hideTimer) clearTimeout(state.hideTimer);
      if (state.rafId) cancelAnimationFrame(state.rafId);
      thumb.remove();
      style.remove();
      state.thumb = null;
    };
  }, [hideDelay]);

  return ref;
}