# Ad Günü Dekor — Tam Layihə

```
AdGunuDekor/
├── AdGunuDekor.sln              ← Visual Studio solution faylı
├── backend/
│   └── AdGunuDekor.Api/         ← ASP.NET Core Web API (C#, EF Core, PostgreSQL, JWT)
├── web/                         ← YENİ frontend: Next.js 15 + Tailwind CSS 4 (SEO-optimallaşdırılmış)
└── frontend/                    ← KÖHNƏ statik frontend (artıq istifadə olunmur, silə bilərsən)
```

Backend yalnız data ilə məşğuldur, frontend API-ya HTTP sorğuları göndərir.
Yeni frontend **Next.js** üzərindədir — səhifə serverdə render olunur, ona görə
Google saytın bütün məzmununu (qalereya, qiymətlər daxil) hazır HTML kimi görür.

---

## 1. Backend-i işə salmaq (ASP.NET Core Web API)

### Tələblər
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [PostgreSQL](https://www.postgresql.org/download/) (lokal, ya Docker ilə)

### Addım 1 — PostgreSQL

```bash
docker run --name adgunudekor-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=adgunudekor_dev -p 5432:5432 -d postgres:16
```

Və ya lokal PostgreSQL-də `adgunudekor_dev` adlı boş database yarat.

### Addım 2 — Migration-lar

```bash
cd backend/AdGunuDekor.Api
dotnet restore
dotnet tool install --global dotnet-ef        # yalnız ilk dəfə

# Əgər heç migration yoxdursa:
dotnet ef migrations add InitialCreate

# Əgər InitialCreate artıq varsa (qiymət paketləri YENİ əlavə olunub):
dotnet ef migrations add AddPricingPackages

dotnet ef database update
```

> Tətbiq başlayanda `DbInitializer` migration-ları avtomatik tətbiq edir,
> ilk admin istifadəçisini və 3 default qiymət paketini yaradır.

### Addım 3 — İşə sal

Visual Studio-da F5, və ya:

```bash
dotnet run
```

API: `http://localhost:5080` · Swagger: `http://localhost:5080/swagger`

**Development admin girişi** (`appsettings.Development.json`):
istifadəçi `admin`, parol `addekor2026`.
**Production-da mütləq dəyiş** (`appsettings.Production.json` + fərqli `Jwt:Secret`).

### Yeni API endpoint-lər (qiymət paketləri)

| Metod | Yol | Kim |
|---|---|---|
| GET | `/api/pricing` | hamı (yalnız aktivlər) |
| GET | `/api/pricing/all` | admin (gizlilər daxil) |
| POST | `/api/pricing` | admin |
| PUT | `/api/pricing/{id}` | admin |
| DELETE | `/api/pricing/{id}` | admin |

---

## 2. Frontend-i işə salmaq (Next.js — `web/` qovluğu)

### Tələblər
- [Node.js 20+](https://nodejs.org)

### Addımlar

```bash
cd web
npm install
npm run dev
```

Sayt: `http://localhost:3000` · Admin panel: `http://localhost:3000/admin`

`web/.env.local` faylında iki dəyişən var:

```
NEXT_PUBLIC_API_URL=http://localhost:5080     # backend ünvanı
NEXT_PUBLIC_SITE_URL=http://localhost:3000    # saytın public ünvanı (SEO üçün)
```

> Backend-in CORS siyahısına `http://localhost:3000` əlavə olunmalıdır
> (`appsettings.Development.json` → `Cors:AllowedOrigins`).

### Frontend strukturu

| Yol | Məzmun |
|---|---|
| `app/layout.tsx` | Ümumi karkas + SEO metadata (title, Open Graph, canonical) |
| `app/page.tsx` | Ana səhifə — qalereya və qiymətlər API-dan serverdə çəkilir (ISR, 2 dəq) |
| `app/admin/` | Admin panel (giriş, qalereya CRUD, qiymət CRUD) |
| `app/sitemap.ts`, `app/robots.ts` | Avtomatik sitemap.xml və robots.txt |
| `components/` | Hər bölmə ayrıca komponent (Hero, Services, Pricing və s.) |
| `lib/api.ts` | Public API çağırışları |
| `lib/adminApi.ts` | Admin API çağırışları (token idarəsi daxil) |
| `app/globals.css` | Rəng palitrası və şriftlər — dizaynı dəyişmək üçün əsas yer |

**Dizaynı dəyişmək:** rənglər `app/globals.css`-dəki `@theme` blokundadır —
bir rəngi dəyişsən, bütün sayt boyu tətbiq olunur.

---

## 3. Production-a çıxarmaq

### Variant A — Vercel (frontend) + VPS/Railway (backend) — ən asan

1. **Backend**: VPS-də və ya Railway/Render-də PostgreSQL ilə birlikdə qaldır.
   `appsettings.Production.json`-da yeni parol + `Jwt:Secret` təyin et.
2. **Frontend**: repo-nu GitHub-a püş et → [vercel.com](https://vercel.com)-da import et,
   root olaraq `web/` seç. Environment variables:
   - `NEXT_PUBLIC_API_URL` → backend-in real ünvanı (https!)
   - `NEXT_PUBLIC_SITE_URL` → saytın real domeni
3. Backend CORS-una saytın real domenini əlavə et.

### Variant B — Hər şey bir VPS-də

`next.config.ts`-də `output: "standalone"` artıq aktivdir:

```bash
cd web && npm run build
node .next/standalone/server.js   # PORT=3000
```

Nginx ilə: `/` → localhost:3000 (Next.js), `/api` və `/uploads` → localhost:5080 (.NET API).

---

## 4. Google optimizasiyası — nə hazırdır, nə etməlisən

**Hazırdır (kodda):**
- Server-side rendering — Google hazır HTML görür
- `title`, `description`, Open Graph, Twitter card, canonical
- JSON-LD structured data (`LocalBusiness` + qiymət təklifləri)
- Avtomatik `sitemap.xml` və `robots.txt` (admin panel indeksdən çıxarılıb)
- Şəkillərdə `alt` mətnləri (admin paneldən doldur — SEO üçün vacibdir!)
- Lazy loading, optimallaşdırılmış şriftlər

**Sən etməlisən (sayt canlıya çıxandan sonra):**
1. Domen al və `NEXT_PUBLIC_SITE_URL`-i yenilə
2. [Google Search Console](https://search.google.com/search-console)-da saytı təsdiqlə
3. Search Console-da `sitemap.xml`-i təqdim et
4. [Google Business Profile](https://business.google.com) yarat (lokal biznes üçün ən güclü SEO aləti)
5. Admin paneldə hər şəklə mənalı alt mətn yaz (məs. "Qırmızı-qızılı balon tağı, 1 yaş ad günü")

---

## 5. Tez-tez lazım olan işlər

| İstək | Harada dəyişmək |
|---|---|
| Qiymətləri dəyişmək | Admin panel → Qiymətlər (kod lazım deyil) |
| Şəkil əlavə etmək/silmək | Admin panel → Qalereya |
| Rəngləri dəyişmək | `web/app/globals.css` → `@theme` |
| Mətnləri dəyişmək | `web/components/` içindəki uyğun komponent |
| WhatsApp nömrəsi | `web/components/` daxilində `wa.me/...` axtar |
| Yeni kateqoriya | Backend: `Models/GalleryCategory.cs` + Frontend: `GallerySection.tsx` və `admin/page.tsx`-dəki siyahılar |
