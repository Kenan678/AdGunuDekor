"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#xidmetler", label: "Xidmətlər" },
  { href: "#qalereya", label: "Qalereya" },
  { href: "#video", label: "Video" },
  { href: "#qiymetler", label: "Qiymətlər" },
  { href: "#elaqe", label: "Əlaqə" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-cream transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_-12px_rgba(10,10,18,0.15)]" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1536px] items-center justify-between px-4 sm:px-6">
        {/* Loqo — elegant kalliqrafik font */}
        <Link href="/" className="logo-text text-3xl text-ink sm:text-4xl">
          Ad Günü Dekor
        </Link>

        {/* Desktop menyu */}
        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-[15px] font-semibold text-ink/85 transition-colors hover:text-rose"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/994702721555"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-rose px-6 py-2.5 font-display text-sm font-semibold text-white transition-colors hover:bg-rose-dark sm:inline-block"
          >
            Sifariş ver
          </a>

          {/* Mobil menyu düyməsi */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menyu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white shadow-sm md:hidden"
          >
            <span
              className={`h-0.5 w-5 rounded bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      {open && (
        <nav className="border-t border-ink/10 bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-base font-semibold text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/994702721555"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-rose px-5 py-2.5 text-center font-display text-sm font-semibold text-white"
            >
              Sifariş ver
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
