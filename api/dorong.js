// Mengirim notifikasi HP ke satu anggota saat leader/admin mengirim pesan dari Spill.
// Hanya admin aktif yang boleh memanggil (diverifikasi dengan sesi login Supabase pemanggil).
const { SB_URL, SB_KEY, rpc, kirim } = require("./_kirim");

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Gunakan POST" });
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ error: "Perlu login" });
  try {
    const u = await fetch(`${SB_URL}/auth/v1/user`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${token}` } });
    if (!u.ok) return res.status(401).json({ error: "Sesi tidak valid" });
    const user = await u.json();
    const m = await fetch(`${SB_URL}/rest/v1/members?user_id=eq.${user.id}&select=id,nama,is_admin,aktif`, { headers: { apikey: SB_KEY, Authorization: `Bearer ${token}` } });
    const [saya] = await m.json();
    if (!saya || !saya.is_admin || !saya.aktif) return res.status(403).json({ error: "Hanya admin" });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    if (!body.member_id || !body.isi) return res.status(400).json({ error: "Data kurang" });
    const judul = String(body.judul || `Pesan dari ${saya.nama}`).slice(0, 80);
    const isi = String(body.isi).slice(0, 180);
    const daftar = await rpc("langganan_member", { p_token: process.env.PENGINGAT_TOKEN, p_member: body.member_id });
    let terkirim = 0;
    for (const l of daftar || []) if (await kirim(l, { title: judul, body: isi, url: body.url || "/#/hari" })) terkirim++;
    res.status(200).json({ ok: true, terkirim });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
};
