"use client";

import { useEffect, useState } from "react";

interface Dot {
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: "circle" | "square" | "star";
}

const COLORS = [
  "#bd7a6e", // terakota
  "#d59a70", // apricot
  "#b8924a", // qızılı
  "#92a884", // adaçayı
  "#e6cdbf", // açıq blush
  "#c9a98a", // qum
];

const SHAPES: Dot["shape"][] = ["circle", "square", "star"];

/**
 * Hero fonunda yuxarı üzən rəngarəng konfetti.
 * Yalnız client-də yaranır (Math.random) — hydration problemi olmasın deyə.
 */
export default function Confetti() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 700 ? 16 : 32;
    const generated: Dot[] = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      size: 6 + Math.random() * 12,
      duration: 12 + Math.random() * 14,
      delay: Math.random() * -26,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));
    setDots(generated);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((dot, i) => (
        <span
          key={i}
          className="confetti-dot"
          style={{
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            background: dot.shape === "star" ? "transparent" : dot.color,
            color: dot.color,
            borderRadius: dot.shape === "circle" ? "50%" : "2px",
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`,
          }}
        >
          {dot.shape === "star" ? "★" : ""}
        </span>
      ))}
    </div>
  );
}
