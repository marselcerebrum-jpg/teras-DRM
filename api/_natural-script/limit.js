'use strict';
// Rate limit dijalankan di server (bukan di browser) supaya biaya API tetap terkendali.
// Mendukung nama variabel Upstash langsung (UPSTASH_REDIS_REST_*) maupun dari integrasi
// Upstash di Vercel Marketplace (KV_REST_API_*). Batas bisa diubah lewat env tanpa ubah kode.
let limiters;
function angka(nama, bawaan) { const n = parseInt(process.env[nama] || '', 10); return n > 0 && n <= 1000 ? n : bawaan; }
function getLimiters() {
  if (limiters) return limiters;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error('Redis rate limit belum dikonfigurasi');
  const { Redis } = require('@upstash/redis');
  const { Ratelimit } = require('@upstash/ratelimit');
  const redis = new Redis({ url, token });
  const perJam = angka('NSAI_LIMIT_PER_JAM', 5), perHari = angka('NSAI_LIMIT_PER_HARI', 20);
  limiters = {
    perJam, perHari,
    hourly: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(perJam, '1 h'), prefix: 'spill:natural-script:hour', timeout: 5000 }),
    daily: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(perHari, '1 d'), prefix: 'spill:natural-script:day', timeout: 5000 })
  };
  return limiters;
}
async function checkLimit(id) {
  const { hourly, daily, perJam, perHari } = getLimiters();
  const hour = await hourly.limit(id);
  if (hour.reason === 'timeout') throw new Error('Redis rate limit timeout');
  if (!hour.success) return { ok: false, message: `Batas ${perJam} generate per jam tercapai. Coba lagi nanti.` };
  const day = await daily.limit(id);
  if (day.reason === 'timeout') throw new Error('Redis rate limit timeout');
  if (!day.success) return { ok: false, message: `Batas ${perHari} generate per hari tercapai. Coba lagi besok.` };
  return { ok: true, sisaJam: hour.remaining, sisaHari: day.remaining };
}
module.exports = { checkLimit };
