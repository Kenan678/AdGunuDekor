/**
 * Admin panel məntiqi: giriş, qalereya idarəetməsi (yükləmə, silmə).
 */

const categoryLabelsAdmin = {
  balon: "Balon dekoru",
  foto: "Foto zəng",
  masa: "Masa dekoru"
};

// ---------- View switching ----------

function showLoginView() {
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("adminDashboard").classList.remove("open");
}

function showDashboardView() {
  document.getElementById("adminLogin").style.display = "none";
  document.getElementById("adminDashboard").classList.add("open");
  refreshAdminGrid();
}

// ---------- Login ----------

async function handleLogin() {
  const username = document.getElementById("adminUser").value.trim();
  const password = document.getElementById("adminPass").value;
  const errorEl = document.getElementById("adminError");
  errorEl.style.display = "none";

  if (!username || !password) {
    errorEl.textContent = "İstifadəçi adı və parolu daxil edin.";
    errorEl.style.display = "block";
    return;
  }

  try {
    await Api.login(username, password);
    showDashboardView();
  } catch (err) {
    errorEl.textContent = err instanceof ApiError ? err.message : "Giriş zamanı xəta baş verdi.";
    errorEl.style.display = "block";
  }
}

function handleLogout() {
  Api.logout();
  document.getElementById("adminUser").value = "";
  document.getElementById("adminPass").value = "";
  showLoginView();
}

// ---------- Gallery management ----------

async function refreshAdminGrid() {
  const grid = document.getElementById("adminGrid");
  grid.innerHTML = `<div class="admin-empty">Yüklənir...</div>`;

  try {
    const images = await Api.getGalleryImages("all");
    renderAdminGrid(images);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      showLoginView();
      return;
    }
    grid.innerHTML = `<div class="admin-empty">Şəkillər yüklənərkən xəta baş verdi.</div>`;
  }
}

function renderAdminGrid(images) {
  const grid = document.getElementById("adminGrid");

  if (images.length === 0) {
    grid.innerHTML = `<div class="admin-empty">Hələ şəkil yüklənməyib. Yuxarıdan əlavə edin.</div>`;
    return;
  }

  grid.innerHTML = images.map(img => {
    const url = Api.resolveImageUrl(img.url);
    const label = categoryLabelsAdmin[img.category] || img.category;
    return `
      <div class="admin-item">
        <img src="${url}" alt="${img.altText || label}">
        <span class="cat-pill">${label}</span>
        <button class="del-btn" title="Sil" onclick="handleDelete(${img.id})">&times;</button>
      </div>
    `;
  }).join("");
}

async function handleDelete(id) {
  if (!confirm("Bu şəkili silmək istədiyinizə əminsiniz?")) return;

  try {
    await Api.deleteGalleryImage(id);
    refreshAdminGrid();
  } catch (err) {
    alert(err instanceof ApiError ? err.message : "Silinmə zamanı xəta baş verdi.");
  }
}

// ---------- Upload ----------

function handleFiles(files) {
  const category = document.getElementById("uploadCategory").value;

  Array.from(files).forEach(async (file) => {
    if (!file.type.startsWith("image/")) {
      alert(`"${file.name}" şəkil faylı deyil və əlavə olunmadı.`);
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      alert(`"${file.name}" çox böyükdür (4MB-dan az olmalıdır).`);
      return;
    }

    try {
      await Api.uploadGalleryImage(file, category);
      refreshAdminGrid();
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Yükləmə zamanı xəta baş verdi.");
    }
  });
}

function initUploadZone() {
  const zone = document.getElementById("uploadZone");
  const fileInput = document.getElementById("fileInput");

  zone.addEventListener("click", () => fileInput.click());

  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("dragover");
  });
  zone.addEventListener("dragleave", () => zone.classList.remove("dragover"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
    fileInput.value = "";
  });
}

// ---------- Init ----------

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginBtn").addEventListener("click", handleLogin);
  document.getElementById("logoutBtn").addEventListener("click", handleLogout);
  document.getElementById("adminPass").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });

  initUploadZone();

  if (Api.isLoggedIn()) {
    showDashboardView();
  } else {
    showLoginView();
  }
});
