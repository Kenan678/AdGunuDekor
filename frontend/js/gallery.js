/**
 * Public qalereya: API-dan şəkilləri çəkir, render edir, filtrləri idarə edir.
 */

const categoryLabels = {
  balon: "Balon dekoru",
  foto: "Foto zəng",
  masa: "Masa dekoru"
};

let allImages = []; // API-dan gələn cari nəticələr keş olunur ki, filtr zamanı yenidən sorğu göndərməyək

async function loadGallery(category = "all") {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  grid.innerHTML = `<div class="gallery-loading">Şəkillər yüklənir...</div>`;

  try {
    allImages = await Api.getGalleryImages(category);
    renderGallery();
  } catch (err) {
    console.error("Qalereya yüklənmədi:", err);
    grid.innerHTML = `<div class="gallery-empty">Şəkillər yüklənərkən xəta baş verdi. Bir az sonra yenidən cəhd edin.</div>`;
  }
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  if (allImages.length === 0) {
    grid.innerHTML = `<div class="gallery-empty">Bu kateqoriyada hələ şəkil yoxdur.</div>`;
    return;
  }

  grid.innerHTML = allImages.map((img, index) => {
    const url = Api.resolveImageUrl(img.url);
    const label = categoryLabels[img.category] || img.category;
    const sizeClass = index === 0 ? "big" : "";
    return `
      <div class="gallery-item ${sizeClass}" data-cat="${img.category}" onclick="openLightbox('${url}')">
        <img src="${url}" alt="${img.altText || label}" loading="lazy">
        <span class="tag">${label}</span>
      </div>
    `;
  }).join("");
}

function initGalleryFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      loadGallery(btn.getAttribute("data-filter"));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGalleryFilters();
  loadGallery("all");
});
