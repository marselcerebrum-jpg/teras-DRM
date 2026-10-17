# Spill · Check-in harian tim social media

Aplikasi DRM (Daily Review Meeting) async untuk tim social media specialist, marketplace & live, dan asisten.

- **Live:** https://teras-drm.vercel.app
- **Database & login:** Supabase project `teras-drm` (nama lama, tetap dipakai) (organisasi timmarketingcere@gmail.com)
- **Hosting:** Vercel project `teras-drm`. Setiap commit ke branch `main` otomatis ter-deploy.

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman utama |
| `app.js` | Seluruh logika aplikasi (check-in, checklist, eksperimen, riset, pesan, ringkasan tim, rekap, atur tim) |
| `style.css` | Tampilan (gaya pop brutalis, seragam dengan Live Hub) |
| `fonts/` | Font Bricolage Grotesque & Plus Jakarta Sans, dipasang langsung tanpa Google Fonts |
| `api/ping.js` | Dipanggil cron harian supaya Supabase gratis tidak dijeda |
| `favicon.svg`, `spill-icon.png`, `logo/` | Logo Spill (ikon tab browser, ikon layar HP, dan file logo untuk keperluan lain) |
| `vercel.json` | Jadwal pengingat (pagi & sore), region server Singapura, dan header keamanan |
| `api/pengingat.js`, `api/dorong.js`, `api/_kirim.js` | Server notifikasi HP (Web Push) |
| `sw.js`, `manifest.json` | Pemasangan ke layar utama HP dan penerima notifikasi |
| `package.json` | Daftar pustaka server (web-push) |

Tidak ada proses build. Cukup upload file ke GitHub, Vercel akan menyajikannya apa adanya.
