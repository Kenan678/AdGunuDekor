"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Görünəndə 0-dan hədəfə qədər sayan rəqəm (Hanna template-indəki kimi).
 * value: "150+", "4.9", "24 saat" kimi mətnlər — rəqəm hissəsi animasiya olunur.
 */
export default function CountUp({
  value,
  duration = 1800,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1].replace(",", "."));
    const suffix = match[2] ?? "";
    const decimals = match[1].includes(".") || match[1].includes(",") ? 1 : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out — sona doğru yavaşlayır
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay((target * eased).toFixed(decimals) + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
