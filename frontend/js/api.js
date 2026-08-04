/**
 * Backend Web API ilə əlaqə üçün mərkəzi modul.
 * Heç bir digər JS faylı birbaşa fetch() çağırmamalıdır — hamısı bu modulu istifadə edir.
 * Bu, backend-in URL strukturu dəyişəndə yalnız bu faylın yenilənməsini tələb edir.
 */
const Api = (() => {

  function getToken() {
    return localStorage.getItem(CONFIG.TOKEN_STORAGE_KEY);
  }

  function setToken(token) {
    localStorage.setItem(CONFIG.TOKEN_STORAGE_KEY, token);
  }

  function clearToken() {
    localStorage.removeItem(CONFIG.TOKEN_STORAGE_KEY);
  }

  function isLoggedIn() {
    return !!getToken();
  }

  /**
   * Daxili köməkçi: bütün sorğular bu funksiya üzərindən keçir.
   * @param {string} path - "/api/gallery" kimi nisbi yol
   * @param {object} options - fetch options (method, body, vs.)
   * @param {boolean} withAuth - true olarsa Authorization header əlavə olunur
   */
  async function request(path, options = {}, withAuth = false) {
    const headers = { ...(options.headers || {}) };

    if (withAuth) {
      const token = getToken();
      if (!token) {
        throw new ApiError("Giriş tələb olunur.", 401);
      }
      headers["Authorization"] = `Bearer ${token}`;
    }

    let response;
    try {
      response = await fetch(`${CONFIG.API_BASE_URL}${path}`, { ...options, headers });
    } catch (networkErr) {
      throw new ApiError("Serverlə əlaqə qurulmadı. İnternet bağlantınızı yoxlayın.", 0);
    }

    if (response.status === 401) {
      clearToken();
      throw new ApiError("Sessiyanız bitib. Yenidən daxil olun.", 401);
    }

    if (!response.ok) {
      let message = `Xəta baş verdi (${response.status}).`;
      try {
        const body = await response.json();
        if (body?.message) message = body.message;
      } catch { /* cavab JSON deyil — default mesaj istifadə olunur */ }
      throw new ApiError(message, response.status);
    }

    if (response.status === 204) return null; // No Content (məs. DELETE)

    const contentType = response.headers.get("content-type") || "";
    return contentType.includes("application/json") ? response.json() : null;
  }

  // ---------- Auth ----------

  async function login(username, password) {
    const result = await request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    setToken(result.token);
    return result;
  }

  function logout() {
    clearToken();
  }

  // ---------- Gallery ----------

  /** @param {string} [category] - "balon" | "foto" | "masa" | undefined (hamısı) */
  async function getGalleryImages(category) {
    const query = category && category !== "all" ? `?category=${encodeURIComponent(category)}` : "";
    return request(`/api/gallery${query}`);
  }

  /** @param {File} file, @param {string} category, @param {string} [altText] */
  async function uploadGalleryImage(file, category, altText) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    if (altText) formData.append("altText", altText);

    return request("/api/gallery", { method: "POST", body: formData }, true);
  }

  async function deleteGalleryImage(id) {
    return request(`/api/gallery/${id}`, { method: "DELETE" }, true);
  }

  async function updateGalleryImage(id, updates) {
    return request(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    }, true);
  }

  /** Şəkilin tam URL-ini qaytarır (backend nisbi yol qaytarır, buraya host əlavə olunur). */
  function resolveImageUrl(relativeUrl) {
    if (!relativeUrl) return "";
    if (relativeUrl.startsWith("http")) return relativeUrl;
    return `${CONFIG.API_BASE_URL}${relativeUrl}`;
  }

  return {
    isLoggedIn,
    login,
    logout,
    getGalleryImages,
    uploadGalleryImage,
    deleteGalleryImage,
    updateGalleryImage,
    resolveImageUrl
  };
})();

/** API sorğularından gələn xətaları normallaşdırmaq üçün xüsusi error tipi. */
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
