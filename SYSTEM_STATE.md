# 🧭 System State & Living Context (Fahrur Rozi Portfolio)

> **Terakhir Diperbarui**: 2026-09-01 18:56 WIB  
> **Status Build**: ✅ Passing (Next.js 16.3.2 Turbopack)  
> **Live Production**: [https://fr-portofolio.netlify.app/](https://fr-portofolio.netlify.app/)  
> **Repository**: `github.com/rfahur11/my-portofolio` (branch `main`)

---

## 1. 🏗️ Ringkasan Arsitektur & Tech Stack
- **Framework & Runtime**: Next.js 16.3.2 (App Router, Turbopack), React 19, Node.js 20.
- **Database & Storage**:
  - **Primary**: Supabase PostgreSQL (AWS `ap-southeast-1` pooler port 6543, SSL mode require).
  - **Local/Fallback**: `src/lib/mockDb.json`.
- **Design System & Styling**: Vanilla Tailwind CSS v4, Glassmorphism card system, Framer Motion animations, React Type Animation, Lucide Icons, Custom SVG icons (`XIcon`, `MediumIcon`, `WhatsappIcon`).
- **Deployment Platform**: Netlify (Automated CI/CD deployment pada push ke branch `main`).
- **Otomasi & Tooling**: n8n Workflow Automation, Puppeteer Headless Web Scraper, Telegram Bot API, Sharp Image Processing.

---

## 2. 🗄️ Database & Schema Snapshot

### Tabel PostgreSQL Supabase:
1. **`projects`**:
   - Skema: `id` (Serial PK), `title` (text), `description` (text, EN), `description_id` (text, ID), `imageUrl` (text), `link` (text), `techStack` (text[]), `category` (text).
   - *Total Proyek*: 9 record aktif (termasuk *LarisAI*, *Enterprise ERP*, *Task Management*, *Caraka ML*, *FlyTicket*, *E-Commerce Analytics*, *Stock Management*, *WebOz Website UMKM*, dan *WebOz CRM & Lead Automation*).
2. **`experiences`**:
   - Skema: `id` (PK), `title`, `organization`, `location`, `icon`, `period`, `description`, `highlights` (text[]).
   - *Total Riwayat*: 5 record aktif (PT Bharata, Bangkit Academy, SMK N 2 Purwakarta, Binar Academy, Puskesmas Bantarsari).
3. **`skills`**:
   - Skema: `id` (PK), `name` (text), `level` (int), `category` (text: Frontend / Backend / Machine Learning / Tools).
   - *Keahlian Terbaru*: `n8n (Workflow Automation)` (88%) dan `Puppeteer (Web Automation)` (82%) pada kategori *Tools & Design*.
4. **`contacts`**:
   - Skema: `id` (PK), `name`, `email`, `subject`, `message`, `read` (boolean), `createdAt` (timestamp).
5. **`settings`**:
   - Skema: `id` (PK), `key` (text, unique), `value` (text). Aktif untuk `avatarUrl`.

---

## 3. 🌐 API Endpoints & Routes Matrix
Seluruh GET handler menggunakan deklarasi `export const dynamic = "force-dynamic";` untuk mencegah stale caching.

| Method | Route | Fungsi & Keterangan | Dynamic Status | Next.js 16 Async Params |
| :--- | :--- | :--- | :--- | :--- |
| `GET/POST` | `/api/projects` | Mengambil & menambah project | `force-dynamic` | N/A |
| `GET/PUT/DEL` | `/api/projects/[id]` | Detail, update, & hapus project | `force-dynamic` | `await params` ✅ |
| `GET/POST` | `/api/experiences` | Mengambil & menambah experience | `force-dynamic` | N/A |
| `GET/PUT/DEL` | `/api/experiences/[id]` | Detail, update, & hapus experience | `force-dynamic` | `await params` ✅ |
| `GET/POST` | `/api/skills` | Mengambil & menambah skill | `force-dynamic` | N/A |
| `GET/PUT/DEL` | `/api/skills/[id]` | Detail, update, & hapus skill | `force-dynamic` | `await params` ✅ |
| `GET/POST` | `/api/contact` | Mengambil pesan admin & submit formulir | `force-dynamic` | N/A |
| `GET/PUT/DEL` | `/api/contact/[id]` | Mark as read (`read: true`) & hapus pesan | `force-dynamic` | `await params` ✅ |
| `GET/POST` | `/api/settings` | Mengambil & mengupdate setting (avatarUrl) | `force-dynamic` | N/A |
| `POST` | `/api/upload` | Upload & kompresi gambar (Sharp, max 1MB) | `force-dynamic` | N/A |
| `POST` | `/api/auth/login` | Login admin session cookie (`rfahrur6045@gmail.com`) | `force-dynamic` | N/A |
| `GET` | `/api/auth/status` | Verifikasi status login admin | `force-dynamic` | N/A |
| `POST` | `/api/auth/logout` | Menghapus token session admin | `force-dynamic` | N/A |

---

## 4. ✅ Fitur & Perbaikan yang Sudah Selesai (Completed)
- [x] **Hero Section Dynamic SSR**: `src/app/page.js` mengambil `avatarUrl` di sisi server untuk menghindari delay / flickering gambar default.
- [x] **Dukungan Bilingual (EN / ID)**: Language Context global (`LanguageContext.js`) mendukung translasi instan di Hero, About, Projects, Experience, Footer, dan tombol Download CV (`cv-en.pdf` & `cv-id.pdf`).
- [x] **Kontak & Media Sosial Lengkap**: Integrasi link resmi GitHub, LinkedIn (`/in/fahrur-rozi-k-336b04164/`), WhatsApp (`0895380146029`), X (`@FahrurR41870299`), dan Medium (`@rfahrur6045`).
- [x] **Branding & Monogram Icon**: Favicon logo FR kustom beresolusi tinggi menggantikan logo default Vercel.
- [x] **Upload & Image Compression**: Kompresi otomatis berbasis Sharp untuk form avatar, project, dan experience.
- [x] **Admin CMS Real-time Message Counter**: Anti-caching `{ cache: "no-store" }` dan perbaikan route ID string/UUID di `src/lib/db.js` sehingga counter pesan unread berkurang otomatis saat pesan dibuka.
- [x] **Proyek WebOz & CRM Automation**:
  - WebOz Landing Page (`/weboz-preview.png`).
  - n8n CRM & Lead Automation (`/n8n-crm-preview.png` dan `/crm-architecture.png`).
- [x] **Highlight n8n & Puppeteer**:
  - Terdaftar di Skills section (Tools & Design).
  - Ditambahkan ke TypeAnimation di Hero Section ("Workflow Automation (n8n)").
  - Disebutkan dalam deskripsi About Me.
- [x] **Custom Agent Skills**:
  - `auto-pr-deploy`: Alur kerja otomatis pembuatan PR, merge, dan deploy ke production.
  - `project-state-sync`: Alur kerja sinkronisasi living context sistem agar agent tidak kehilangan konteks antar sesi.

---

## 5. ⏳ Rencana & Opsi Lanjutan (Next Steps / Backlog)
- [ ] **GitHub Actions Scraper Automation**: Opsi deployment serverless cron workflow (`.github/workflows/auto_scraper.yml`) untuk scraping otomatis Google Maps setiap pagi tanpa perlu menjalankan terminal/Docker lokal.
- [ ] **Interactive Scraper Trigger Button**: Tombol on-demand di Web Admin CRM (`/admin/crm`) untuk memicu pencarian leads berdasarkan kategori dan kota via browser.

---

## 6. ⚠️ Technical Gotchas & Critical Rules (Wajib Dibaca Agent)
1. **Next.js 16 Promise Params**: Objek `params` pada dynamic route handler bersifat async. Selalu panggil `const { id } = await params;` sebelum mengakses properti.
2. **PostgreSQL Auto-Increment Sequence**: Setelah operasi seeding manual atau custom import, sinkronkan sequence ID tabel dengan query:
   ```sql
   SELECT setval(pg_get_serial_sequence('projects', 'id'), coalesce(max(id), 0) + 1, false) FROM projects;
   ```
3. **Database TLS Bypass di Node.js Lokal (Windows)**:
   Gunakan `$env:NODE_TLS_REJECT_UNAUTHORIZED=0;` sebelum menjalankan script Node.js lokal yang terhubung ke Supabase pooler.
4. **Anti-Caching pada API Next.js**:
   Selalu tambahkan `export const dynamic = "force-dynamic";` di seluruh handler route API dan sertakan `{ cache: "no-store" }` pada fetch client-side admin.
