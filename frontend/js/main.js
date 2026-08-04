/**
 * Ümumi sayt davranışları: mobil naviqasiya, hero konfetti animasiyası, lightbox.
 * Qalereyanın data render məntiqi gallery.js-dədir.
 */

// ---------- Mobile nav ----------
(function initMobileNav() {
  const navToggle = document.getElementById("navToggle");
  const navlinks = document.getElementById("navlinks");
  if (!navToggle || !navlinks) return;

  navToggle.addEventListener("click", () => navlinks.classList.toggle("open"));
  navlinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navlinks.classList.remove("open"));
  });
})();

// ---------- Ambient confetti dots in hero ----------
(function initConfetti() {
  const container = document.getElementById("confettiHero");
  if (!container) return;

  const colors = ["#D4AF7A", "#E8A0BF", "#F5F0E8", "#C49A5F"];
  const count = window.innerWidth < 700 ? 10 : 18;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    const size = 4 + Math.random() * 7;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.bottom = "-5%";
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.animationDuration = `${14 + Math.random() * 14}s`;
    dot.style.animationDelay = `${Math.random() * -20}s`;
    container.appendChild(dot);
  }
})();

// ---------- Lightbox ----------
function openLightbox(src) {
  const img = document.getElementById("lightboxImg");
  const box = document.getElementById("lightbox");
  if (!img || !box) return;
  img.src = src;
  box.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const box = document.getElementById("lightbox");
  if (!box) return;
  box.classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
  }
});
