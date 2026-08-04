"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Uşaqlarını scroll zamanı yumşaq animasiya ilə göstərir.
 * İstifadəsi: <Reveal direction="left"><div>...</div></Reveal>
 * delay (ms) — ardıcıl kartlar üçün pilləli effekt.
 * direction — haradan gəlsin: up (standart), down, left, right, zoom.
 *
 * Görünmə vəziyyəti React state-də saxlanılır ki, yenidən render zamanı itməsin.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "zoom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    // Yükləndikdə artıq ekrandadırsa dərhal göstər
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const directionClass = {
    up: "",
    down: "from-down",
    left: "from-left",
    right: "from-right",
    zoom: "from-zoom",
  }[direction];

  return (
    <div
      ref={ref}
      className={`reveal ${directionClass} ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
