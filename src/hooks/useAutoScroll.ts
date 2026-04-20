"use client";

import { useCallback, useEffect, useRef } from "react";

/* ---------- Auto-scroll hook ---------- */
export function useAutoScroll(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1); // 1 = forward, -1 = backward
  const rafRef = useRef<number>(0);
  const isUserScrolling = useRef(false);
  const userScrollTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const startScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      if (!el || isUserScrolling.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      el.scrollLeft += speed * directionRef.current;

      if (el.scrollLeft >= maxScroll - 1) {
        directionRef.current = -1;
      } else if (el.scrollLeft <= 1) {
        directionRef.current = 1;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [speed]);

  useEffect(() => {
    startScroll();
    const el = ref.current;

    const onUserScroll = () => {
      isUserScrolling.current = true;
      if (userScrollTimeout.current) clearTimeout(userScrollTimeout.current);
      userScrollTimeout.current = setTimeout(() => {
        isUserScrolling.current = false;
      }, 2000);
    };

    el?.addEventListener("pointerdown", onUserScroll);
    el?.addEventListener("touchstart", onUserScroll, { passive: true });
    el?.addEventListener("wheel", onUserScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (userScrollTimeout.current) clearTimeout(userScrollTimeout.current);
      el?.removeEventListener("pointerdown", onUserScroll);
      el?.removeEventListener("touchstart", onUserScroll);
      el?.removeEventListener("wheel", onUserScroll);
    };
  }, [startScroll]);

  return ref;
}
