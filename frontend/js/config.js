/**
 * Mərkəzi konfiqurasiya.
 * Production-a keçəndə yalnız API_BASE_URL-i dəyişdirmək kifayətdir —
 * digər JS fayllarına dəyməyə ehtiyac yoxdur.
 */
const CONFIG = {
  // Lokal development zamanı .NET API-nin işlədiyi ünvan (launchSettings.json-dakı "http" profili).
  // Production-da bunu real domeninizlə (məs. "https://api.adgunudekor.az") əvəz edin.
  API_BASE_URL: "http://localhost:5080",

  // JWT token-in localStorage-da saxlanacağı açar adı.
  TOKEN_STORAGE_KEY: "adGunuDekor_adminToken"
};
