# Teras · Check-in harian tim social media

Aplikasi DRM (Daily Review Meeting) async untuk tim social media specialist, marketplace & live, dan asisten.

- **Live:** https://teras-drm.vercel.app
- **Database & login:** Supabase project `teras-drm` (organisasi timmarketingcere@gmail.com)
- **Hosting:** Vercel project `teras-drm`. Setiap commit ke branch `main` otomatis ter-deploy.

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Halaman utama |
| `app.js` | Seluruh logika aplikasi (check-in, checklist, eksperimen, riset, pesan, ringkasan tim, rekap, atur tim) |
| `style.css` | Tampilan (gaya pop brutalis, seragam dengan Live Hub) |
| `fonts/` | Font Bricolage Grotesque & Plus Jakarta Sans, dipasang langsung tanpa Google Fonts |
| `api/ping.js` | Dipanggil cron harian supaya Supabase gratis tidak dijeda |
| `vercel.json` | Jadwal cron, region server Singapura, dan header keamanan |

Tidak ada proses build. Cukup upload file ke GitHub, Vercel akan menyajikannya apa adanya.
