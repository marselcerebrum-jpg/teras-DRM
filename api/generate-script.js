'use strict';
// Endpoint Vercel Functions (CommonJS), sesuai aplikasi Spill vanilla JS.
// Penyedia AI (Gemini gratis atau OpenAI) diatur lewat env; lihat api/_natural-script/ai.js.
const { verifySpillUser } = require('./_natural-script/auth');
const { checkLimit } = require('./_natural-script/limit');
const { validate } = require('./_natural-script/schema');
const { buatSkrip, siap } = require('./_natural-script/ai');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Gunakan POST' }); }
  // Brief hanya teks singkat; tolak request yang terlalu besar sebelum memanggil layanan lain
  if (Number(req.headers['content-length'] || 0) > 20000) return res.status(413).json({ error: 'Brief terlalu panjang' });
  const user = await verifySpillUser(req);
  if (user.error) return res.status(user.status).json({ error: user.error });
  let brief;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    brief = validate(body);
  } catch (e) { return res.status(400).json({ error: e.message || 'Brief tidak valid' }); }
  if (!siap()) return res.status(503).json({ error: 'API AI belum dikonfigurasi' });
  let sisa;
  try {
    const limited = await checkLimit(user.id);
    if (!limited.ok) return res.status(429).json({ error: limited.message });
    sisa = { jam: limited.sisaJam, hari: limited.sisaHari };
  } catch (e) {
    console.error('Natural Script rate limit error', e.message);
    return res.status(503).json({ error: 'Pembatasan penggunaan belum siap' });
  }
  try {
    const { result, usage } = await buatSkrip(brief);
    return res.status(200).json({ ok: true, result, usage, sisa });
  } catch (error) {
    if (error && error.status) return res.status(error.status).json({ error: error.message });
    console.error('Natural Script request error:', String(error));
    return res.status(502).json({ error: 'Gagal terhubung ke AI. Coba lagi.' });
  }
};
