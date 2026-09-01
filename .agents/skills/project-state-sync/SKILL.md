---
name: project-state-sync
description: >-
  Protokol dan panduan untuk mensinkronisasi dan mendokumentasikan status terkini
  (state & context) dari web/aplikasi/sistem ke dalam dokumen 'SYSTEM_STATE.md'.
  Gunakan skill ini saat user meminta untuk sinkronisasi dokumentasi, update status proyek,
  menyimpan konteks agar agent tidak lupa, atau merangkum progress untuk sesi berikutnya.
---

# Project State & Living Context Sync Skill

Skill ini membakukan cara agent merekam, memperbarui, dan menyinkronkan seluruh kondisi teknis sistem ke dalam dokumen konteks hidup (`SYSTEM_STATE.md`). Tujuannya adalah memastikan setiap sesi agent berikutnya memiliki **100% memori akurat (ground truth)** mengenai status fitur, database, arsitektur, dan checklist pekerjaan tanpa kehilangan konteks.

---

## 🎯 Tujuan & Manfaat
1. **Zero Context Loss**: Agent sesi baru dapat langsung membaca `SYSTEM_STATE.md` dan melanjutkan progress secara presisi.
2. **Technical Ground Truth**: Menyimpan ringkasan endpoint API, konfigurasi database, integrasi eksternal, dan struktur direktori aktif.
3. **Tracking Masalah & Solusi**: Mencatat *known bugs*, *gotchas*, dan keputusan arsitektur penting sehingga agent tidak mengulangi kesalahan masa lalu.

---

## 📋 Struktur Standar Dokumen `SYSTEM_STATE.md`

Setiap kali menjalankan sinkronisasi, pastikan dokumen `SYSTEM_STATE.md` di root proyek mencakup bagian-bagian berikut:

```markdown
# 🧭 System State & Living Context

> **Terakhir Diperbarui**: [YYYY-MM-DD HH:mm WIB]  
> **Status Build**: [Passing / Warning / Error]  
> **Environment Produksi**: [URL Live / Hosting]

---

## 1. 🏗️ Ringkasan Arsitektur & Tech Stack
- **Framework & Runtime**: (misal: Next.js 16.3.2 App Router, Node.js 20)
- **Database**: (misal: Supabase PostgreSQL + local mockDb.json fallback)
- **Integrasi Pihak Ketiga**: (misal: n8n, Puppeteer, Telegram Bot, Netlify)
- **State Management & Styling**: (misal: Tailwind CSS v4, Framer Motion)

---

## 2. 🗄️ Database & Schema Snapshot
- **Tabel / Koleksi Aktif**:
  - `projects`: Menyimpan daftar portfolio proyek, link, dan tech stack.
  - `experiences`: Menyimpan riwayat karir & timeline profesional.
  - `skills`: Menyimpan daftar keahlian, persentase, dan kategori.
  - `contacts`: Menyimpan pesan masuk dari form kontak.
  - `settings`: Menyimpan key-value konfig sistem (misal: avatarUrl).
- **Catatan Sequence / Primary Key**: (misal: PostgreSQL auto-increment sequence sync status).

---

## 3. 🌐 API Endpoints & Routes Matrix
| Method | Route | Fungsi & Keterangan | Status |
| :--- | :--- | :--- | :--- |
| `GET/POST` | `/api/projects` | Mengambil & menambah project | ✅ Active |
| `GET/PUT/DEL` | `/api/projects/[id]` | Detail, edit, & hapus project | ✅ Active |
| `GET/POST` | `/api/contact` | Mengambil & mengirim pesan kontak | ✅ Active |
| `GET` | `/api/skills` | Mengambil daftar keahlian | ✅ Active |

---

## 4. ✅ Fitur yang Sudah Selesai (Completed)
- [x] Fitur A (Keterangan singkat implementasi)
- [x] Fitur B (Keterangan singkat implementasi)

---

## 5. ⏳ Pekerjaan Berjalan & Rencana Selanjutnya (In-Progress & Next Steps)
- [ ] Task 1: ...
- [ ] Task 2: ...

---

## 6. ⚠️ Known Issues & Technical Gotchas (Penting untuk Agent)
- *Next.js 16 Dynamic Params*: Parameter `params` di dynamic route harus selalu di-`await` (`const { id } = await params;`).
- *CORS / Caching*: Tambahkan `export const dynamic = "force-dynamic"` pada GET handlers untuk mencegah stale cache browser.
- *TLS Supabase Pooler*: Jalankan dengan flag `$env:NODE_TLS_REJECT_UNAUTHORIZED=0` untuk koneksi lokal script PostgreSQL.
```

---

## 🛠️ Alur Kerja Eksekusi Sinkronisasi (3 Langkah)

1. **Audit Kondisi Aktual**:
   - Periksa file `package.json` untuk versi library.
   - Periksa rute API di `src/app/api/` atau backend server.
   - Periksa skema database aktif.
2. **Tulis / Perbarui `SYSTEM_STATE.md`**:
   - Perbarui timestamp dan checklist progress.
   - Tambahkan keputusan teknis baru yang baru saja disepakati/diimplementasikan.
3. **Commit & Simpan**:
   - Masukkan `SYSTEM_STATE.md` ke version control agar tersinkronisasi di GitHub dan riwayat commit.
