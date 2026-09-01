# 🧭 System State & Living Context (Fahrur Rozi Portfolio)

> **Terakhir Diperbarui**: 2026-09-01 18:55 WIB  
> **Status Build**: ✅ Passing (Next.js 16.3.2 Turbopack)  
> **Live Production**: [https://fr-portofolio.netlify.app/](https://fr-portofolio.netlify.app/)  
> **Repository**: `github.com/rfahur11/my-portofolio` (branch `main`)

---

## 1. 🏗️ Ringkasan Arsitektur & Tech Stack
- **Framework & Runtime**: Next.js 16.3.2 (App Router), React 19, Node.js 20.
- **Database & Storage**:
  - Primary: Supabase PostgreSQL (AWS ap-southeast-1 pooler, pool size 10).
  - Fallback/Local: `src/lib/mockDb.json`.
- **Styling & Animasi**: Vanilla Tailwind CSS v4, Glassmorphism design system, Framer Motion, React Type Animation, Lucide Icons.
- **Deployment Platform**: Netlify (Git-Triggered Auto Deployment pada commit ke branch `main`).
- **Otomasi Terintegrasi**: n8n Workflow Automation, Puppeteer Web Scraper, Telegram Bot Notifier.

---

## 2. 🗄️ Database & Schema Snapshot

### Tabel PostgreSQL Supabase:
1. **`projects`**:
   - Kolom: `id` (Serial PK), `title` (text), `description` (text, EN), `description_id` (text, ID), `imageUrl` (text), `link` (text), `techStack` (text[]), `category` (text).
   - *Total Proyek*: 9 (termasuk LarisAI, Caraka, FlyTicket, WebOz, dan WebOz CRM & Lead Automation).
2. **`experiences`**:
   - Kolom: `id` (PK), `title`, `organization`, `location`, `icon`, `period`, `description`, `highlights` (text[]).
   - *Total Riwayat*: 5 (PT Bharata, Bangkit Academy, SMK N 2 Purwakarta, Binar Academy, Puskesmas Bantarsari).
3. **`skills`**:
   - Kolom: `id` (PK), `name` (text), `level` (int), `category` (text: Frontend / Backend / Machine Learning / Tools).
   - *Terkini*: Memiliki `n8n (Workflow Automation)` (88%) dan `Puppeteer (Web Automation)` (82%) di kategori *Tools*.
4. **`contacts`**:
   - Kolom: `id` (PK), `name`, `email`, `subject`, `message`, `read` (boolean), `createdAt` (timestamp).
5. **`settings`**:
   - Kolom: `id` (PK), `key` (text, unique), `value` (text). Digunakan untuk `avatarUrl`.

---

## 3. 🌐 API Endpoints & Routes Matrix
| Method | Route | Fungsi & Keterangan | Dynamic Status |
| :--- | :--- | :--- | :--- |
| `GET/POST` | `/api/projects` | Mengambil & menambah project | `force-dynamic` |
| `GET/PUT/DEL` | `/api/projects/[id]` | Detail, edit, hapus project (dengan `await params`) | `force-dynamic` |
| `GET/POST` | `/api/experiences` | Mengambil & menambah riwayat kerja | `force-dynamic` |
| `GET/PUT/DEL` | `/api/experiences/[id]` | Detail, edit, hapus experience | `force-dynamic` |
| `GET/POST` | `/api/skills` | Mengambil & menambah daftar keahlian | `force-dynamic` |
| `GET/PUT/DEL` | `/api/skills/[id]` | Edit & hapus skill | `force-dynamic` |
| `GET/POST` | `/api/contact` | Mengambil pesan admin & submit formulir | `force-dynamic` |
| `GET/PUT/DEL` | `/api/contact/[id]` | Mark as read (`read: true`) & hapus pesan | `force-dynamic` |
| `GET/POST` | `/api/settings` | Mengambil & mengupdate setting (avatarUrl) | `force-dynamic` |
| `POST` | `/api/upload` | Upload & kompresi gambar (Sharp, max 1MB) | `force-dynamic` |
| `POST` | `/api/auth/login` | Login admin session cookie (`rfahrur6045@gmail.com`) | `force-dynamic` |
| `GET` | `/api/auth/status` | Verifikasi status login admin | `force-dynamic` |
| `POST` | `/api/auth/logout` | Menghapus token session admin | `force-dynamic` |

---

## 4. ✅ Fitur yang Sudah Selesai (Completed)
- [x] **Hero Section Dynamic Avatar**: Gambar avatar hero tersimpan dinamis di database, di-fetch server-side di `src/app/page.js` untuk mencegah efek flickering/AI default image.
- [x] **Dukungan Bilingual (EN / ID)**: Global Language Context (`LanguageContext.js`) mendukung peralihan bahasa instan di Hero, About, Projects, Experience, Footer, dan CV Download.
- [x] **Aset Media Sosial Lengkap**: Integrasi link resmi GitHub, LinkedIn (`/in/fahrur-rozi-k-336b04164/`), WhatsApp (`0895380146029`), X (Twitter), dan Medium dengan custom SVG icons.
- [x] **Favicon & Branding Kustom**: Logo monogram FR modern menggantikan icon default Vercel.
- [x] **Upload & Image Compression**: Kompresi otomatis via Sharp sebelum penyimpanan.
- [x] **Admin CMS Realtime & Unread Counter**: Notifikasi badge pesan admin dinamis dengan anti-caching `{ cache: "no-store" }` dan API route Next.js 16 async params.
- [x] **Proyek WebOz & n8n CRM**: Ditambahkan lengkap dengan gambar preview 3D mockup dan tech stack badges.
- [x] **Skill n8n & Puppeteer**: Terdaftar di Skills section & disorot di Hero Section TypeAnimation.
- [x] **Custom Agents Skills**:
  - `auto-pr-deploy`: Protokol otomatisasi PR & deploy production.
  - `project-state-sync`: Protokol sinkronisasi dokumentasi state sistem.

---

## 5. ⚠️ Known Issues & Technical Gotchas (Wajib Dibaca Agent)
1. **Next.js 16 Dynamic Route Params**: Objek `params` adalah Promise. Harus selalu di-`await` sebelum diekstrak:
   ```javascript
   export async function PUT(req, { params }) {
     const { id } = await params;
     // ...
   }
   ```
2. **PostgreSQL Auto-Increment Sequence**: Jika melakukan seeding data atau custom query, sequence ID PostgreSQL bisa out-of-sync. Jalankan query reset sequence sebelum insert:
   ```sql
   SELECT setval(pg_get_serial_sequence('projects', 'id'), coalesce(max(id), 0) + 1, false) FROM projects;
   ```
3. **Database Client SSL di Windows**: Saat menjalankan script Node.js lokal ke pooler Supabase, set environment variable `$env:NODE_TLS_REJECT_UNAUTHORIZED=0`.
4. **Bypass Cache API Routes**: Selalu deklarasikan `export const dynamic = "force-dynamic";` pada GET handler API Next.js untuk mencegah browser/server caching.
